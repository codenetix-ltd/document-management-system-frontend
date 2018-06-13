import mergeByKey from 'array-merge-by-key';

import ls from 'Services/SecureLS';

import {
  AUTH_SET,
  AUTH_UPDATE,
  LOADING_STATUS_SET,
  USERS_LIST_SET,
  USER_SET,
  USER_UPDATE,
  PROFILE_SET,
  PROFILE_UPDATE,
  TEMPLATES_LIST_SET,
  TEMPLATE_SET,
  TEMPLATE_UPDATE,
  ATTRIBUTES_LIST_SET,
  ATTRIBUTE_SET,
  ATTRIBUTE_UPDATE,
  DOCUMENTS_LIST_SET,
  DOCUMENTS_FILTER_SET,
  DOCUMENT_SET,
  DOCUMENT_UPDATE,
  DOC_ATTR_VALUES_SET,
  DOC_ATTR_VALUES_UPDATE,
  SUBSTITUTE_DOCUMENT_SET,
  SELECTED_DOCS_SET,
  COMPARED_DOCS_SET,
  VERSIONS_LIST_SET,
  VERSION_SET,
  LABELS_LIST_SET,
  LABEL_SET,
  LABEL_UPDATE,
  ROLES_LIST_SET,
  ROLE_SET,
  ROLE_UPDATE,
  PERMISSION_GROUPS_SET,
  LOGS_LIST_SET,
  LOGS_FILTER_SET,
  TYPES_LIST_SET,
  MESSAGE_SET,
  ERROR_SET,
  ERRORS_SET,
  ERRORS_UPDATE
} from 'Store/types';

import initialState from './initialState.json';

let auth;
try {
  auth = ls.get('auth');
} catch (e) {
  console.trace(e);
}

initialState.auth = auth || initialState.auth;

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SET:
      return {
        ...state,
        auth: action.data
      };
    case AUTH_UPDATE:
      return {
        ...state,
        auth: {
          ...state.auth,
          ...action.data
        }
      };
    case LOADING_STATUS_SET:
      return {
        ...state,
        loading: action.status
      };
    case USERS_LIST_SET:
      return {
        ...state,
        users: {
          ...state.users,
          list: action.data.list,
          lastPage: action.data.lastPage
        }
      };
    case USER_SET:
      return {
        ...state,
        user: action.data
      };
    case USER_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data
        }
      };
    case PROFILE_SET:
      return {
        ...state,
        profile: action.data
      };
    case PROFILE_UPDATE:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.data
        }
      };
    case TEMPLATES_LIST_SET:
      return {
        ...state,
        templates: {
          ...state.templates,
          list: action.data.list,
          lastPage: action.data.lastPage
        }
      };
    case TEMPLATE_SET:
      return {
        ...state,
        template: action.data
      };
    case TEMPLATE_UPDATE:
      return {
        ...state,
        template: {
          ...state.template,
          ...action.data
        }
      };
    case ATTRIBUTES_LIST_SET:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          list: action.data.list
        }
      };
    case ATTRIBUTE_SET:
      return {
        ...state,
        attribute: action.data
      };
    case ATTRIBUTE_UPDATE:
      return {
        ...state,
        attribute: {
          ...state.attribute,
          ...action.data
        }
      };
    case DOCUMENTS_LIST_SET:
      return {
        ...state,
        documents: {
          ...state.documents,
          ...action.data
        }
      };
    case DOCUMENTS_FILTER_SET:
      return {
        ...state,
        documents: {
          ...state.documents,
          filterSet: {
            ...state.documents.filterSet,
            ...action.data
          }
        }
      };
    case DOCUMENT_SET:
      return {
        ...state,
        document: action.data
      };
    case DOCUMENT_UPDATE:
      return {
        ...state,
        document: {
          ...state.document,
          actualVersion: {
            ...state.document.actualVersion,
            ...action.data
          }
        }
      };
    case DOC_ATTR_VALUES_SET:
      return {
        ...state,
        document: {
          ...state.document,
          actualVersion: {
            ...state.document.actualVersion,
            attributeValues: action.data
          }
        }
      };
    case DOC_ATTR_VALUES_UPDATE:
      return {
        ...state,
        document: {
          ...state.document,
          actualVersion: {
            ...state.document.actualVersion,
            attributeValues: mergeByKey(
              'id',
              state.document.actualVersion.attributeValues,
              action.data
            )
          }
        }
      };
    case SUBSTITUTE_DOCUMENT_SET:
      return {
        ...state,
        substituteDocument: action.data
      };
    case SELECTED_DOCS_SET:
      return {
        ...state,
        selectedDocuments: action.data
      };
    case COMPARED_DOCS_SET:
      return {
        ...state,
        comparedDocuments: action.data
      };
    case VERSIONS_LIST_SET:
      return {
        ...state,
        versions: {
          ...state.versions,
          list: action.data.list
        }
      };
    case VERSION_SET:
      return {
        ...state,
        version: action.data
      };
    case LABELS_LIST_SET:
      return {
        ...state,
        labels: {
          ...state.labels,
          list: action.data.list,
          lastPage: action.data.lastPage
        }
      };
    case LABEL_SET:
      return {
        ...state,
        label: action.data
      };
    case LABEL_UPDATE:
      return {
        ...state,
        label: {
          ...state.label,
          ...action.data
        }
      };
    case ROLES_LIST_SET:
      return {
        ...state,
        roles: {
          ...state.roles,
          list: action.data.list,
          lastPage: action.data.lastPage
        }
      };
    case ROLE_SET:
      return {
        ...state,
        role: action.data
      };
    case ROLE_UPDATE:
      return {
        ...state,
        role: {
          ...state.role,
          ...action.data
        }
      };
    case PERMISSION_GROUPS_SET:
      return {
        ...state,
        permissionGroups: action.data
      };
    case LOGS_LIST_SET:
      return {
        ...state,
        logs: {
          ...state.logs,
          ...action.data
        }
      };
    case LOGS_FILTER_SET:
      return {
        ...state,
        logs: {
          ...state.logs,
          filterSet: {
            ...state.logs.filterSet,
            ...action.data
          }
        }
      };
    case TYPES_LIST_SET:
      return {
        ...state,
        types: action.data
      };
    case MESSAGE_SET:
      return {
        ...state,
        message: {
          ...action.data
        }
      };
    case ERROR_SET:
      return {
        ...state,
        error: {
          ...action.data
        }
      };
    case ERRORS_SET:
      return {
        ...state,
        errors: {
          ...action.data
        }
      };
    case ERRORS_UPDATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.data
        }
      };
    default:
      return state;
  }
}
