import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import UserForm from 'Routes/users/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

@autobind
export class UserEdit extends Component {
  static propTypes = {
    user: PropTypes.any.isRequired,
    match: PropTypes.any.isRequired
  };

  onFormSubmit(formData) {
    const { match: { params: { userID } } } = this.props;
    axios.put(`${API.users}/${userID}`, formData);
  }

  breadcrumbs = [
    { pageName: 'Users', pageLink: '/users', iconCls: 'fa fa-users' }
  ];

  render() {
    const { user } = this.props;
    return (
      <div>
        <ContentHeader title={`Edit ${user.fullName}`} breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Profile data</h3>
          </div>
          <UserForm
            match={this.props.match}
            onSubmit={this.onFormSubmit}
            submitButtonText="Update"
          />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
