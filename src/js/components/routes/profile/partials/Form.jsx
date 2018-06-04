import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import FileUpload from 'Components/common/FileUpload';

import { $$profileUpdate } from 'Store/thunks/profile';

@autobind
export class ProfileForm extends Component {
  static propTypes = {
    profile: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  /**
   * Handles submit event.
   * @param e - Event
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  /**
   * Universal handler for multiple input fields
   * @param event
   */
  handleChange({ target: { value, name } }) {
    $$profileUpdate(this.props.dispatch, {
      [name]: value
    });
  }

  /**
   * Handler for file upload component
   * @param fileIds
   */
  handleAvatarUpload(fileIds) {
    $$profileUpdate(this.props.dispatch, {
      avatarId: fileIds[0]
    });
  }

  render() {
    const { profile } = this.props;
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
                value={profile.fullName}
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
                value={profile.email}
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
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
