import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ls from 'Services/SecureLS';

@autobind
export default class AuthForm extends Component {
  static defaultProps = {
    submitButtonText: 'Login',
    validate: () => false
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    validate: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { email, password } = ls.get('c_cache');
    this.state = {
      email: email || '',
      password: password || '',
      remember: false
    };
  }

  /**
   * Handles submit event.
   * @param e
   */
  onSubmit(e) {
    e.preventDefault();
    const { email, password, remember } = this.state;
    if (remember) ls.set('c_cache', { email, password });
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
              disabled={this.props.validate(this.state)}
            >
              {this.props.submitButtonText}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
