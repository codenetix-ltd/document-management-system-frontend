import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Redirect } from 'react-router-dom';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import UserForm from 'Routes/users/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

import { $$messageSet } from 'Store/thunks/message';

@autobind
export class UserAdd extends Component {
  static propTypes = {
    dispatch: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  onFormSubmit(formData) {
    axios.post(API.users, formData).then(() => {
      this.setState({
        submitted: true
      });
    }).catch(err => {
      throw err;
    });
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

  fetchTemplates() {
    return axios.get(API.templates);
  }

  validate(formFields) {
    if (formFields) {
      return !Object.keys(formFields).every(key => !!formFields[key]);
    }
    return true;
  }

  breadcrumbs = [
    { pageName: 'Users', pageLink: '/users', iconCls: 'fa fa-users' }
  ];

  render() {
    if (this.state.submitted) {
      $$messageSet(this.props.dispatch, {
        type: 'success',
        text: 'The user was successfully created.'
      });
      return <Redirect to="/users/list" />;
    }

    return (
      <div>
        <ContentHeader title="User create" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Profile data</h3>
          </div>
          <UserForm
            onSubmit={this.onFormSubmit}
            getTemplateOptions={this.getTemplateOptions}
            validate={this.validate}
          />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
