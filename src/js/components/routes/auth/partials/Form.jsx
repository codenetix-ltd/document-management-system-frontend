import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ls from 'Services/SecureLS';

@autobind
export default class AuthForm extends Component {
  static defaultProps = {
    submitButtonText: 'Login'
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string
  };

  constructor(props) {
    super(props);
    const { email, password, remember } = ls.get('c_cache');
    this.state = {
      email: remember ? (email || '') : '',
      password: remember ? (password || '') : '',
      remember: !!remember
    };
  }

  /**
   * Handles submit event.
   * @param e
   */
  onSubmit(e) {
    e.preventDefault();
    const { email, password, remember } = this.state;
    ls.set('c_cache', { email, password, remember });
    this.props.onSubmit({ email, password });
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

  toggleCheckbox() {
    this.setState({ remember: !this.state.remember });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group has-feedback">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <span className="form-control-feedback">
            <i className="fa fa-envelope" />
          </span>
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <span className="form-control-feedback">
            <i className="fa fa-lock" />
          </span>
        </div>
        <div className="row">
          <div className="col-xs-8">
            <div className="checkbox">
              <label>
                <div className="icheckbox_square-blue">
                  <input
                    type="checkbox"
                    checked={this.state.remember}
                    onChange={this.toggleCheckbox}
                  />
                </div>
                Remember Me
              </label>
            </div>
          </div>
          <div className="col-xs-4">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-flat"
            >
              {this.props.submitButtonText}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
