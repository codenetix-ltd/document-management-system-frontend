import React from 'react';
import cln from 'classnames';
import PropTypes from 'prop-types';
import { If, Then } from 'qc-react-conditionals/lib';
import { Link, withRouter } from 'react-router-dom';

import { DataLink } from 'Components/common/dataControls';

export function MenuItem(props) {
  const {
    name,
    active,
    iconCls,
    addLink,
    listLink,
    addLinkActive,
    listLinkActive
  } = props;
  return (
    <li className={cln({ treeview: true, active })}>
      <DataLink><i className={iconCls} /> <span>{name}</span></DataLink>
      <ul className="treeview-menu">
        <li className={cln({ active: listLinkActive })}>
          <Link to={listLink}>
            <i className="fa fa-list" /> <span>List all</span>
          </Link>
        </li>
        <If is={name !== 'Logs'}>
          <Then>
            <li className={cln({ active: addLinkActive })}>
              <Link to={addLink}>
                <i className="fa fa-plus" /> <span>Add new</span>
              </Link>
            </li>
          </Then>
        </If>
      </ul>
    </li>
  );
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  iconCls: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  addLinkActive: PropTypes.bool.isRequired,
  listLinkActive: PropTypes.bool.isRequired,
  listLink: PropTypes.string.isRequired,
  addLink: PropTypes.string.isRequired
};

export function Sidebar(props) {
  const { pathname } = props.location;
  const menuItems = props.menuData.map((item, index) => {
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
            <p>Andrei Vorobyev</p>
            <a href="#"><i className="fa fa-circle text-success" /> Online</a>
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
  location: PropTypes.any.isRequired
};

export default withRouter(Sidebar);
