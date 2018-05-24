import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const getRedirect = from => <Redirect to={{ pathname: '/login', state: { from } }} />;

const RouteAuth = ({ cmp: Component, canAccess, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (canAccess ? <Component {...props} /> : getRedirect(props.location))}
    />
  );
};

RouteAuth.propTypes = {
  location: PropTypes.any,
  canAccess: PropTypes.bool,
  cmp: PropTypes.any.isRequired,
};

RouteAuth.defaultProps = {
  location: null,
  canAccess: false
};

export default RouteAuth;
