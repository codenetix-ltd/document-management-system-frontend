import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Select from 'react-select';
import { If, Then } from 'qc-react-conditionals/lib';

import FileUpload from 'Components/common/FileUpload';
import getFileURL from 'Utils/getFileURL';

import {
  $$userFetch,
  $$userReset,
  $$userUpdate
} from 'Store/thunks/users';

import { $$templatesFetch } from 'Store/thunks/templates';
import { $$rolesFetch } from 'Store/thunks/roles';

@autobind
export class UserForm extends Component {
  static defaultProps = {
    submitButtonText: 'Create'
  };

  static propTypes = {
    user: PropTypes.any.isRequired,
    match: PropTypes.any.isRequired,
    templates: PropTypes.any.isRequired,
    roles: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    const userID = parseInt(match.params.userID, 10);
    if (Number.isFinite(userID)) {
      $$userFetch(dispatch, userID);
    }
    $$templatesFetch(dispatch, 1);
    $$rolesFetch(dispatch, 1);
  }

  componentWillUnmount() {
    $$userReset(this.props.dispatch);
  }

  /**
   * Handles submit event.
   * @param e
   */
  onSubmit(e) {
    e.preventDefault();
    const { user, onSubmit } = this.props;
    const templatesIds = this.getIds(user.templatesIds);
    const rolesIds = this.getIds(user.rolesIds);
    const formData = { ...user, templatesIds, rolesIds };
    onSubmit(formData);
  }

  getIds(list) {
    const isNumArray = list.find(i => Number.isFinite(parseInt(i, 10)));
    if (isNumArray) return list;
    return list.map(({ id }) => id);
  }

  /**
   * Universal handler for multiple input fields
   * @param event
   */
  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    const { dispatch } = this.props;
    $$userUpdate(dispatch, {
      [name]: value
    });
  }

  /**
   * Hanler for avatar upload component
   * @param fileIds
   */
  handleAvatarUpload(fileIds) {
    const { dispatch } = this.props;
    $$userUpdate(dispatch, {
      avatarId: fileIds[0]
    });
  }

  handleTemplatesSelect(value) {
    const { dispatch } = this.props;
    $$userUpdate(dispatch, {
      templatesIds: value
    });
  }

  handleRolesSelect(value) {
    const { dispatch } = this.props;
    $$userUpdate(dispatch, {
      rolesIds: value
    });
  }

  render() {
    const {
      user,
      templates,
      roles,
      submitButtonText
    } = this.props;
    return (
      <form className="form-horizontal" onSubmit={this.onSubmit}>
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="full_name" className="col-sm-2 control-label">Full name</label>
            <div className="col-sm-6">
              <input
                id="full_name"
                className="form-control"
                placeholder="Full Name"
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={this.handleChange}
                autoComplete="nope"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-6">
              <input
                id="email"
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                value={user.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">User&apos;s templates</label>
            <div className="col-sm-6">
              <Select
                multi
                name="templatesIds"
                value={user.templatesIds}
                onChange={this.handleTemplatesSelect}
                options={templates.list}
                valueKey="id"
                labelKey="name"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Roles</label>
            <div className="col-sm-6">
              <Select
                multi
                name="roles"
                value={user.rolesIds}
                onChange={this.handleRolesSelect}
                options={roles.list}
                valueKey="id"
                labelKey="name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-6">
              <input
                id="password"
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                value={user.password || ''}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password2" className="col-sm-2 control-label">Repeat password</label>
            <div className="col-sm-6">
              <input
                id="password2"
                className="form-control"
                placeholder="Repeat password"
                type="password"
                name="passwordConfirmation"
                value={user.passwordConfirmation || ''}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="file" className="col-sm-2 control-label">Avatar</label>
            <div className="col-sm-6">
              <FileUpload onSuccess={this.handleAvatarUpload} buttonText="Change avatar" />
              <If is={user.avatar.url}>
                <Then>
                  <img className="user-avatar-small" src={`${getFileURL(user.avatar.url)}`} alt="User avatar" />
                </Then>
              </If>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button className="btn btn-success" type="submit">
            {submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ user, templates, roles }) => ({ user, templates, roles });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
