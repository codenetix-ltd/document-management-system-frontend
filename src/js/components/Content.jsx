import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import RouteAuth from 'Components/common/RouteAuth';

import UserAdd from 'Routes/users/Add';
import UserEdit from 'Routes/users/Edit';
import UsersList from 'Routes/users/List';
import RoleAdd from 'Routes/roles/Add';
import RoleEdit from 'Routes/roles/Edit';
import RolesList from 'Routes/roles/List';
import LabelAdd from 'Routes/labels/Add';
import LabelEdit from 'Routes/labels/Edit';
import LabelsList from 'Routes/labels/List';
import ProfileEdit from 'Routes/profile/Edit';
import TemplateAdd from 'Routes/templates/Add';
import TemplateEdit from 'Routes/templates/Edit';
import TemplatesList from 'Routes/templates/List';
import DocumentAdd from 'Routes/documents/Add';
import DocumentEdit from 'Routes/documents/Edit';
import DocumentsList from 'Routes/documents/List';
import DocumentsView from 'Routes/documents/View';
import DocumentsCompare from 'Routes/documents/Compare';
import AttrAdd from 'Routes/templates/attributes/Add';
import AttrEdit from 'Routes/templates/attributes/Edit';

export function Content({ auth: { isAuthorized } }) {
  return (
    <div className="content-wrapper">
      <Switch>
        <RouteAuth canAccess={isAuthorized} path="/" component={DocumentsList} exact />
        <RouteAuth canAccess={isAuthorized} path="/profile" component={ProfileEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/users" component={UserAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/users/list" component={UsersList} exact />
        <RouteAuth canAccess={isAuthorized} path="/users/:userID" component={UserEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/roles" component={RoleAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/roles/list" component={RolesList} exact />
        <RouteAuth canAccess={isAuthorized} path="/roles/:roleID" component={RoleEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/labels" component={LabelAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/labels/list" component={LabelsList} exact />
        <RouteAuth canAccess={isAuthorized} path="/labels/:labelID" component={LabelEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents" component={DocumentAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents/list" component={DocumentsList} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents/:documentID" component={DocumentEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/documents/view/:documentID" component={DocumentsView} exact />
        <RouteAuth canAccess={isAuthorized} path="/compare" component={DocumentsCompare} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates" component={TemplateAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/list" component={TemplatesList} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/:templateID" component={TemplateEdit} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/:templateID/attributes" component={AttrAdd} exact />
        <RouteAuth canAccess={isAuthorized} path="/templates/:templateID/attributes/:attributeID" component={AttrEdit} exact />
      </Switch>
    </div>
  );
}

Content.propTypes = {
  auth: PropTypes.any.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export const ContentConnected = connect(mapStateToProps, mapDispatchToProps)(Content);

export default withRouter(ContentConnected);
