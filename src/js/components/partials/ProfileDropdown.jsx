import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import cln from 'classnames';
import onClickOutside from 'react-onclickoutside';

import { DataLink } from 'Components/common/dataControls';

import { $$profileFetch } from 'Store/thunks/profile';
import { $$logOut } from 'Store/thunks/auth';

@autobind
export class ProfileDropdown extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userMenuOpen: false
    };
  }

  componentDidMount() {
    $$profileFetch(this.props.dispatch);
  }

  onLogout() {
    $$logOut(this.props.dispatch);
  }

  handleClickOutside() {
    this.setState({
      userMenuOpen: false
    });
  }

  toggleProfileDropdown() {
    this.setState({
      userMenuOpen: !this.state.userMenuOpen
    });
  }

  render() {
    const userMenuCls = cln('dropdown', 'user', 'user-menu', {
      open: this.state.userMenuOpen
    });
    const { profile } = this.props;
    return (
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li className={userMenuCls}>
            <DataLink cls="dropdown-toggle" onClick={this.toggleProfileDropdown}>
              <img
                src={require('Images/user-default.jpeg')}
                className="user-image"
                alt=""
                width="25"
                height="25"
              />
              <span className="hidden-xs">{profile.fullName}</span>
            </DataLink>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img
                  src={require('Images/user-default.jpeg')}
                  className="img-circle"
                  alt="User Image"
                />
                <p>{profile.fullName}</p>
              </li>
              <li className="user-footer">
                <div className="pull-left">
                  <Link
                    to="/profile"
                    className="btn btn-default btn-flat"
                    onClick={this.handleClickOutside}
                  >
                    Edit profile
                  </Link>
                </div>
                <div className="pull-right">
                  <button
                    type="button"
                    onClick={this.onLogout}
                    className="btn btn-default btn-flat"
                  >Logout
                  </button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

const Wrapped = onClickOutside(ProfileDropdown);

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
