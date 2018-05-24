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

export function Content({ auth: { isAuthorized } }) {
  return (
    <div className="content-wrapper">
      <Switch>
        <RouteAuth canAccess={isAuthorized} path="/" component={Home} exact />

        <RouteAuth canAccess={isAuthorized} path="/users" component={UserAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/users/list" component={UsersList} exact />
        <RouteAuth canAccess={isAuthorized} path="/users/:userID" component={UserEdit} exact />

        <RouteAuth canAccess={isAuthorized} path="/roles" component={RoleAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/roles/list" component={RolesList} exact />
        <RouteAuth canAccess={isAuthorized} path="/roles/:roleID" component={RoleEdit} exact />

        <RouteAuth canAccess={isAuthorized} path="/labels" component={LabelAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/labels/list" component={LabelsList} exact />
        <RouteAuth canAccess={isAuthorized} path="/labels/:labelID" component={LabelEdit} exact />

        <RouteAuth canAccess={isAuthorized} path="/templates" component={TemplateAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/list" component={TemplatesList} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/:templateID" component={TemplateEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/:templateID/attributes" component={AttrAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/:templateID/attributes/:attributeID" component={AttrEdit} exact />

        <RouteAuth canAccess={isAuthorized} path="/documents" component={DocumentAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents/list" component={DocumentsList} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents/:documentID" component={DocumentEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents/view/:documentID" component={DocumentView} exact />
        <RouteAuth canAccess={isAuthorized} path="/compare" component={DocumentsCompare} exact />

        <RouteAuth canAccess={isAuthorized} path="/logs/list" component={LogsList} exact />

        <RouteAuth canAccess={isAuthorized} path="/profile" component={ProfileEdit} exact />
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
