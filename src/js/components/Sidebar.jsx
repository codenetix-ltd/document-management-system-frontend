import React from 'react';
import { connect } from 'react-redux';
import cln from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { DataLink } from 'Components/common/dataControls';

import MenuItem from 'Components/partials/MenuItem';

export function Sidebar({ profile, menuData, location: { pathname } }) {
  const menuItems = menuData.map((item, index) => {
    const addLink = `/${item.name.toLowerCase()}`;
    const listLink = `/${item.name.toLowerCase()}/list`;
    const iconCls = cln({ fa: true, [item.icon]: item.icon });
    const isActive = pathname === listLink || pathname === addLink;
    const addLinkActive = pathname === addLink;
    const listLinkActive = pathname === listLink;
    return (
      <MenuItem
        key={index}
        name={item.name}
        iconCls={iconCls}
        listLink={listLink}
        addLink={addLink}
        active={isActive}
        addLinkActive={addLinkActive}
        listLinkActive={listLinkActive}
      />
    );
  });

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src={require('Images/user-default.jpeg')}
              className="img-circle"
              alt="User image"
            />
          </div>
          <div className="pull-left info">
            <p>{profile.fullName}</p>
            <DataLink><i className="fa fa-circle text-success" /> Online</DataLink>
          </div>
        </div>
        <ul className="sidebar-menu">{menuItems}</ul>
      </section>
    </aside>
  );
}

Sidebar.defaultProps = {
  menuData: []
};

Sidebar.propTypes = {
  menuData: PropTypes.array,
  profile: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired
};

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
