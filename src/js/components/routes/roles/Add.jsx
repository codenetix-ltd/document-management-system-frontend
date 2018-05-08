import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Redirect } from 'react-router-dom';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import RoleForm from 'Routes/roles/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

@autobind
export default class RoleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoleID: false
    };
  }

  onFormSubmit({ name }) {
    if (!name) return; // todo: check if this is really neccessary
    axios.post(API.roles, { name }).then(({ data }) => {
      this.setState({
        newRoleID: data.id
      });
    }).catch(err => {
      throw err;
    });
  }

  validate({ name }) {
    return !(name && name.length > 2);
  }

  breadcrumbs = [
    { pageName: 'Roles', pageLink: '/roles', iconCls: 'fa fa-plus' }
  ];

  render() {
    const { newRoleID } = this.state;
    if (newRoleID) return (<Redirect to={`/roles/${newRoleID}`} />);
    return (
      <div>
        <ContentHeader title="Role create" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Role</h3>
          </div>
          <div className="box-body">
            <RoleForm
              onSubmit={this.onFormSubmit}
              validate={this.validate}
            />
          </div>
        </ContentWrapper>
      </div>
    );
  }
}
