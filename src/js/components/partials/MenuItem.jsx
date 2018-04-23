import React from 'react';
import cln from 'classnames';
import PropTypes from 'prop-types';
import { If, Then } from 'qc-react-conditionals/lib';
import { Link } from 'react-router-dom';

import { DataLink } from 'Components/common/dataControls';

export default function MenuItem(props) {
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
