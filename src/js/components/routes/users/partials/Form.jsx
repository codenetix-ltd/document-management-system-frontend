import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Async as Select } from 'react-select';

import FileUpload from 'Components/common/FileUpload';

@autobind
export default class UserForm extends Component {
  static defaultProps = {
    user: null,
    submitButtonText: 'Create',
    validate: () => false
  };

  static propTypes = {
    user: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    getTemplateOptions: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    validate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      templatesIds: [],
      // roles: [],
      password: '',
      passwordConfirmed: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ ...this.state, ...nextProps.user });
    }
  }

  /**
   * Handles submit event.
   * @param event
   */
  onSubmit(event) {
    event.preventDefault();
    const formData = {
      ...this.state,
      templatesIds: this.state.templatesIds.map(({ value }) => value)
    };
    this.props.onSubmit(formData);
  }

  /**
   * Universal handler for multiple input fields
   * @param event
   */
  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  /**
   * Hanler for avatar upload component
   * @param fileIds
   */
  handleAvatarUpload(fileIds) {
    this.setState({
      avatarId: fileIds[0]
    });
  }

  /**
   * Special handler for react-select's Async component
   * @param value
   */
  handleTemplatesSelect(value) {
    this.setState({
      templatesIds: value
    });
  }

  render() {
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
                value={this.state.fullName}
                onChange={this.handleChange}
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
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">User&apos;s templates</label>
            <div className="col-sm-6">
              <Select
                multi
                autoload
                name="templatesIds"
                value={this.state.templatesIds}
                onChange={this.handleTemplatesSelect}
                loadOptions={this.props.getTemplateOptions}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Roles</label>
            <div className="col-sm-6" />
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
                value={this.state.password}
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
                name="passwordConfirmed"
                value={this.state.passwordConfirmed}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="file" className="col-sm-2 control-label">Avatar</label>
            <div className="col-sm-6">
              <FileUpload onSuccess={this.handleAvatarUpload} />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.props.validate(this.state)}
          >
            {this.props.submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}
