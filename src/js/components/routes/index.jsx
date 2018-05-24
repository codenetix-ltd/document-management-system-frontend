import Loadable from 'react-loadable';
import React from 'react';

export const Home = Loadable({
  loader: () => import('Routes/home'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const UserAdd = Loadable({
  loader: () => import('Routes/users/Add'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const UserEdit = Loadable({
  loader: () => import('Routes/users/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const UsersList = Loadable({
  loader: () => import('Routes/users/List'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const RoleAdd = Loadable({
  loader: () => import('Routes/roles/Add'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const RoleEdit = Loadable({
  loader: () => import('Routes/roles/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const RolesList = Loadable({
  loader: () => import('Routes/roles/List'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const LabelAdd = Loadable({
  loader: () => import('Routes/labels/Add'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const LabelEdit = Loadable({
  loader: () => import('Routes/labels/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const LabelsList = Loadable({
  loader: () => import('Routes/labels/List'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const TemplateAdd = Loadable({
  loader: () => import('Routes/templates/Add'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const TemplateEdit = Loadable({
  loader: () => import('Routes/templates/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const TemplatesList = Loadable({
  loader: () => import('Routes/templates/List'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const AttributesAdd = Loadable({
  loader: () => import('Routes/templates/attributes/Add'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const AttributesEdit = Loadable({
  loader: () => import('Routes/templates/attributes/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const DocumentAdd = Loadable({
  loader: () => import('Routes/documents/Add'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const DocumentEdit = Loadable({
  loader: () => import('Routes/documents/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const DocumentsList = Loadable({
  loader: () => import('Routes/documents/List'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const DocumentView = Loadable({
  loader: () => import('Routes/documents/View'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const DocumentsCompare = Loadable({
  loader: () => import('Routes/documents/Compare'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const LogsList = Loadable({
  loader: () => import('Routes/logs/List'),
  loading() {
    return <div>Loading...</div>;
  }
});

export const ProfileEdit = Loadable({
  loader: () => import('Routes/profile/Edit'),
  loading() {
    return <div>Loading...</div>;
  }
});

export default {
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
