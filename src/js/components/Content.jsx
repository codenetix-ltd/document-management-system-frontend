import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import RouteAuth from 'Components/common/RouteAuth';

import {
  Home,
  UserAdd,
  UserEdit,
  UsersList,
  RoleAdd,
  RoleEdit,
  RolesList,
  LabelAdd,
  LabelEdit,
  LabelsList,
  TemplateAdd,
  TemplateEdit,
  TemplatesList,
  AttributesAdd as AttrAdd,
  AttributesEdit as AttrEdit,
  DocumentAdd,
  DocumentEdit,
  DocumentsList,
  DocumentView,
  DocumentsCompare,
  LogsList,
  ProfileEdit
} from 'Components/routes';

export function Content({ auth: { isAuthorized: isAuth } }) {
  return (
    <div className="content-wrapper">
      <Switch>
        <RouteAuth canAccess={isAuth} path="/" cmp={Home} exact />

        <RouteAuth canAccess={isAuth} path="/users" cmp={UserAdd} exact />
        <RouteAuth canAccess={isAuth} path="/users/list" cmp={UsersList} exact />
        <RouteAuth canAccess={isAuth} path="/users/:userID" cmp={UserEdit} exact />

        <RouteAuth canAccess={isAuth} path="/roles" cmp={RoleAdd} exact />
        <RouteAuth canAccess={isAuth} path="/roles/list" cmp={RolesList} exact />
        <RouteAuth canAccess={isAuth} path="/roles/:roleID" cmp={RoleEdit} exact />

        <RouteAuth canAccess={isAuth} path="/labels" cmp={LabelAdd} exact />
        <RouteAuth canAccess={isAuth} path="/labels/list" cmp={LabelsList} exact />
        <RouteAuth canAccess={isAuth} path="/labels/:labelID" cmp={LabelEdit} exact />

        <RouteAuth canAccess={isAuth} path="/templates" cmp={TemplateAdd} exact />
        <RouteAuth canAccess={isAuth} path="/templates/list" cmp={TemplatesList} exact />
        <RouteAuth canAccess={isAuth} path="/templates/:templateID" cmp={TemplateEdit} exact />
        <RouteAuth canAccess={isAuth} path="/templates/:templateID/attributes" cmp={AttrAdd} exact />
        <RouteAuth canAccess={isAuth} path="/templates/:templateID/attributes/:attributeID" cmp={AttrEdit} exact />

        <RouteAuth canAccess={isAuth} path="/documents" cmp={DocumentAdd} exact />
        <RouteAuth canAccess={isAuth} path="/documents/list" cmp={DocumentsList} exact />
        <RouteAuth canAccess={isAuth} path="/documents/:documentID" cmp={DocumentEdit} exact />
        <RouteAuth canAccess={isAuth} path="/documents/view/:documentID" cmp={DocumentView} exact />
        <RouteAuth canAccess={isAuth} path="/compare" cmp={DocumentsCompare} exact />

        <RouteAuth canAccess={isAuth} path="/logs/list" cmp={LogsList} exact />

        <RouteAuth canAccess={isAuth} path="/profile" cmp={ProfileEdit} exact />
      </Switch>
    </div>
  );
}

Content.propTypes = {
  auth: PropTypes.any.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export const ConnectedContent = connect(mapStateToProps, mapDispatchToProps)(Content);

export default withRouter(ConnectedContent);
