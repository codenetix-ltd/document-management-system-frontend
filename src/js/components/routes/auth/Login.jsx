import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import pick from 'lodash/pick';

import AuthForm from 'Routes/auth/partials/Form';

@autobind
export class Login extends Component {
  static propTypes = {
    auth: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.body.classList.add('login-page');
    document.body.classList.add('hold-transition');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page');
    document.body.classList.remove('hold-transition');
  }

  onSubmit(user) {
    const { dispatch } = this.props;
    import('Store/thunks/auth').then(({ $$authFetch, $$logIn }) => {
      $$authFetch(dispatch, user, () => {
        $$logIn(dispatch);
      });
    });
  }

  validate(formFields) {
    if (formFields) {
      const pickedFields = pick(formFields, ['email', 'password']);
      return !Object.keys(pickedFields).every(key => !!formFields[key]);
    }
    return true;
  }

  render() {
    const { auth: { isAuthorized } } = this.props;
    if (isAuthorized) return <Redirect to="/" />;
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="/"><b>Foodunion</b> DMS</a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <AuthForm onSubmit={this.onSubmit} validate={this.validate} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
