import Loadable from 'react-loadable';
import React from 'react';

import SplashScreen from 'Components/common/SplashScreen';

export const Login = Loadable({
  loader: () => import('Routes/auth/Login'),
  loading() {
    return <SplashScreen />;
  }
});

export const Home = Loadable({
  loader: () => import('Routes/home'),
  loading() {
    return <SplashScreen />;
  }
});

export const UserAdd = Loadable({
  loader: () => import('Routes/users/Add'),
  loading() {
    return <SplashScreen />;
  }
});

export const UserEdit = Loadable({
  loader: () => import('Routes/users/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export const UsersList = Loadable({
  loader: () => import('Routes/users/List'),
  loading() {
    return <SplashScreen />;
  }
});

export const RoleAdd = Loadable({
  loader: () => import('Routes/roles/Add'),
  loading() {
    return <SplashScreen />;
  }
});

export const RoleEdit = Loadable({
  loader: () => import('Routes/roles/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export const RolesList = Loadable({
  loader: () => import('Routes/roles/List'),
  loading() {
    return <SplashScreen />;
  }
});

export const LabelAdd = Loadable({
  loader: () => import('Routes/labels/Add'),
  loading() {
    return <SplashScreen />;
  }
});

export const LabelEdit = Loadable({
  loader: () => import('Routes/labels/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export const LabelsList = Loadable({
  loader: () => import('Routes/labels/List'),
  loading() {
    return <SplashScreen />;
  }
});

export const TemplateAdd = Loadable({
  loader: () => import('Routes/templates/Add'),
  loading() {
    return <SplashScreen />;
  }
});

export const TemplateEdit = Loadable({
  loader: () => import('Routes/templates/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export const TemplatesList = Loadable({
  loader: () => import('Routes/templates/List'),
  loading() {
    return <SplashScreen />;
  }
});

export const AttributesAdd = Loadable({
  loader: () => import('Routes/templates/attributes/Add'),
  loading() {
    return <SplashScreen />;
  }
});

export const AttributesEdit = Loadable({
  loader: () => import('Routes/templates/attributes/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export const DocumentAdd = Loadable({
  loader: () => import('Routes/documents/Add'),
  loading() {
    return <SplashScreen />;
  }
});

export const DocumentEdit = Loadable({
  loader: () => import('Routes/documents/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export const DocumentsList = Loadable({
  loader: () => import('Routes/documents/List'),
  loading() {
    return <SplashScreen />;
  }
});

export const DocumentView = Loadable({
  loader: () => import('Routes/documents/View'),
  loading() {
    return <SplashScreen />;
  }
});

export const DocumentsCompare = Loadable({
  loader: () => import('Routes/documents/Compare'),
  loading() {
    return <SplashScreen />;
  }
});

export const LogsList = Loadable({
  loader: () => import('Routes/logs/List'),
  loading() {
    return <SplashScreen />;
  }
});

export const ProfileEdit = Loadable({
  loader: () => import('Routes/profile/Edit'),
  loading() {
    return <SplashScreen />;
  }
});

export default {
  Login,
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
  AttributesAdd,
  AttributesEdit,
  DocumentAdd,
  DocumentEdit,
  DocumentsList,
  DocumentView,
  DocumentsCompare,
  LogsList,
  ProfileEdit
};
