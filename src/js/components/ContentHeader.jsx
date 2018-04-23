import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ContentHeader(props) {
  const bc = [...props.breadcrumbs];
  bc.unshift({
    pageName: 'Home',
    pageLink: '/',
    iconCls: 'fa fa-home'
  });
  const bcList = bc.map(({ iconCls, pageName, pageLink }, index) => {
    if (index === bc.length - 1) {
      return (
        <li className="active" key={index}>
          <i className={iconCls} />&nbsp;
          {pageName}
        </li>
      );
    }
    return (
      <li key={index}>
        <i className={iconCls} />&nbsp;
        <Link to={pageLink}>{pageName}</Link>
      </li>
    );
  });
  return (
    <section className="content-header">
      <h1>{props.title}</h1>
      <ol className="breadcrumb">{bcList}</ol>
    </section>
  );
}

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array
};

ContentHeader.defaultProps = {
  breadcrumbs: []
};
