import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import ProfileForm from 'Routes/profile/partials/Form';

import { API } from 'Config';

import { $$profileFetch } from 'Store/thunks/profile';

@autobind
export class ProfileEdit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.breadcrumbs = [
      { pageName: 'My profile', pageLink: '/profile', iconCls: '' }
    ];
  }

  componentDidMount() {
    $$profileFetch(this.props.dispatch);
  }

  onFormSubmit() {
    const formData = this.props.profile;
    axios.put(`${API.profile}`, formData).catch(err => {
      throw err;
    });
  }

  render() {
    return (
      <div>
        <ContentHeader title="My profile" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Profile data</h3>
          </div>
          <ProfileForm onSubmit={this.onFormSubmit} />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
