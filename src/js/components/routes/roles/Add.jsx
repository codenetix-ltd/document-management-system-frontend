import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Redirect } from 'react-router-dom';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import RoleForm from 'Routes/roles/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

// import { $$messageSet } from 'Store/thunks/message';

@autobind
export class RoleAdd extends Component {
  /* static propTypes = {
    dispatch: PropTypes.any.isRequired
  }; */

  constructor(props) {
    super(props);
    this.state = {
      newRoleID: false
    };
    this.breadcrumbs = [
      { pageName: 'Roles', pageLink: '/roles', iconCls: 'fa fa-plus' }
    ];
  }

  onFormSubmit(formData) {
    axios.post(API.roles, formData).then(response => {
      this.setState({
        newRoleID: response.id
      });
    }).catch(err => {
      throw err;
    });
  }

  validate(formFields) {
    if (formFields) {
      return !Object.keys(formFields).every(key => !!formFields[key]);
    }
    return true;
  }

  render() {
    const { newRoleID } = this.state;
    if (newRoleID) {
      return (<Redirect to={`/roles/${newRoleID}`} />);
    }

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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RoleAdd);
