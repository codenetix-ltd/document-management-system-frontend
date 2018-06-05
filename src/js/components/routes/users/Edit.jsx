import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import UserForm from 'Routes/users/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

@autobind
export default class UserEdit extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  onFormSubmit(formData) {
    const { userID } = this.props.match.params;
    axios.put(`${API.users}/${userID}`, formData).catch(console.trace);
  }

  getTemplateOptions(input, callback) {
    this.fetchTemplates().then(({ data }) => {
      const list = data.data.map(({ id, name }) => ({ label: name, value: id }));
      callback(null, {
        options: list,
        complete: true
      });
    }).catch(callback);
  }

  getRoleOptions(input, callback) {
    this.fetchRoles().then(({ data }) => {
      const list = data.data.map(({ id, name }) => ({ label: name, value: id }));
      callback(null, {
        options: list,
        complete: true
      });
    }).catch(callback);
  }

  fetchTemplates() {
    return axios.get(API.templates);
  }

  fetchRoles() {
    return axios.get(API.roles);
  }

  // todo: move this to a thunk
  fetchUser() {
    const { userID } = this.props.match.params;
    axios.get(`${API.users}/${userID}`).then(({ data }) => {
      const {
        fullName,
        email,
        templatesIds,
        ...rest
      } = data;
      this.fetchTemplates().then(res => {
        const options = res.data.data.map(({ id, name }) => ({ label: name, value: id }));
        const selected = options.filter(option => templatesIds.includes(option.value));
        this.setState({
          user: {
            fullName,
            email,
            ...rest,
            templatesIds: selected
          }
        });
      });
    }).catch(err => {
      throw err;
    });
  }

  breadcrumbs = [
    { pageName: 'Users', pageLink: '/users', iconCls: 'fa fa-users' }
  ];

  render() {
    return (
      <div>
        <ContentHeader title={`Edit ${this.state.user.fullName || ''}`} breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Profile data</h3>
          </div>
          <UserForm
            user={this.state.user}
            onSubmit={this.onFormSubmit}
            getTemplateOptions={this.getTemplateOptions}
            getRoleOptions={this.getRoleOptions}
            submitButtonText="Update"
          />
        </ContentWrapper>
      </div>
    );
  }
}
