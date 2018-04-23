import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';

import { DataLink } from 'Components/common/dataControls';
import ProfileDropdown from 'Components/partials/ProfileDropdown';

@autobind
export default class Header extends Component {
  toggleSidebar() {
    const { classList } = document.body;
    if (classList.contains('sidebar-collapse')) {
      document.body.classList.remove('sidebar-collapse');
    } else {
      document.body.classList.add('sidebar-collapse');
    }
  }

  render() {
    return (
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-mini"><b>D</b>MS</span>
          <span className="logo-lg"><b>FoodUnion</b> DMS</span>
        </Link>
        <nav className="navbar navbar-static-top">
          <DataLink cls="sidebar-toggle" onClick={this.toggleSidebar}>
            <span className="sr-only">Toggle navigation</span>
          </DataLink>
          <ProfileDropdown />
        </nav>
      </header>
    );
  }
}
