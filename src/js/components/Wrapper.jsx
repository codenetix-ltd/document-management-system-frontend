import React from 'react';

import Header from 'Components/Header';
import Sidebar from 'Components/Sidebar';
import Content from 'Components/Content';
import Footer from 'Components/Footer';

const menuData = [
  {
    name: 'Documents',
    icon: 'fa-book'
  }, {
    name: 'Templates',
    icon: 'fa-file-text'
  }, {
    name: 'Users',
    icon: 'fa-user'
  }, {
    name: 'Labels',
    icon: 'fa-tags'
  }, {
    name: 'Roles',
    icon: 'fa-shield'
  }, {
    name: 'Logs',
    icon: 'fa-history'
  }
];

export default function Wrapper() {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar menuData={menuData} />
      <Content />
      <Footer />
    </div>
  );
}
