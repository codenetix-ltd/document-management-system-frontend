import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import RoleForm from 'Routes/roles/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

import { $$roleFetch } from 'Store/thunks/roles';

@autobind
export class RoleEdit extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    role: PropTypes.any.isRequired
  };

  componentDidMount() {
    this.fetchRole();
  }

  onFormSubmit(formData) {
    const { roleID } = this.props.match.params;
    axios.put(`${API.roles}/${roleID}`, formData).catch(err => {
      throw err;
    });
  }

  fetchRole() {
    const { dispatch } = this.props;
    const { roleID } = this.props.match.params;
    $$roleFetch(dispatch, roleID);
  }

  render() {
    const breadcrumbs = [
      { pageName: 'Roles', pageLink: '/roles', iconCls: 'fa fa-tags' }
    ];
    const { role } = this.props;
    return (
      <div>
        <ContentHeader title={`Edit ${role.name || ''}`} breadcrumbs={breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Role</h3>
          </div>
          <div className="box-body">
            <RoleForm
              role={role}
              onSubmit={this.onFormSubmit}
              submitButtonText="Update"
            />
          </div>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ role }) => ({ role });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RoleEdit);
