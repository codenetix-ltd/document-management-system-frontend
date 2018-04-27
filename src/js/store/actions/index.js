import {
  AUTH_SET,
  AUTH_UPDATE,
  LOADING_STATUS_SET,
  USERS_LIST_SET,
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
  TYPES_LIST_SET,
  MESSAGE_SET,
  ERROR_SET
} from 'Store/types';

/** Authentication */
export const $setAuth = data => ({
  type: AUTH_SET,
  data
});

export const $updateAuth = data => ({
  type: AUTH_UPDATE,
  data
});

/** Loading status */
export const $loading = status => ({
  type: LOADING_STATUS_SET,
  status
});

/** Users */
export const $usersList = data => ({
  type: USERS_LIST_SET,
  data
});

/** Profile */
export const $profile = data => ({
  type: PROFILE_SET,
  data
});

export const $updateProfile = data => ({
  type: PROFILE_UPDATE,
  data
});

/** Templates */
export const $templatesList = data => ({
  type: TEMPLATES_LIST_SET,
  data
});

export const $template = data => ({
  type: TEMPLATE_SET,
  data
});

export const $updateTemplate = data => ({
  type: TEMPLATE_UPDATE,
  data
});

/** Attributes */
export const $attributesList = data => ({
  type: ATTRIBUTES_LIST_SET,
  data
});

export const $attribute = data => ({
  type: ATTRIBUTE_SET,
  data
});

export const $updateAttribute = data => ({
  type: ATTRIBUTE_UPDATE,
  data
});

/** Documents */
export const $documentsList = data => ({
  type: DOCUMENTS_LIST_SET,
  data
});

export const $documentsFilter = data => ({
  type: DOCUMENTS_FILTER_SET,
  data
});

export const $document = data => ({
  type: DOCUMENT_SET,
  data
});

export const $updateDocument = data => ({
  type: DOCUMENT_UPDATE,
  data
});

export const $setAttributeValues = data => ({
  type: DOC_ATTR_VALUES_SET,
  data: Array.isArray(data) ? data : [data]
});

export const $updateAttributeValues = data => ({
  type: DOC_ATTR_VALUES_UPDATE,
  data: Array.isArray(data) ? data : [data]
});

export const $setSelectedDocuments = data => ({
  type: SELECTED_DOCS_SET,
  data
});

export const $setComparedDocuments = data => ({
  type: COMPARED_DOCS_SET,
  data
});

/** Versions */
export const $versionsList = data => ({
  type: VERSIONS_LIST_SET,
  data
});

export const $version = data => ({
  type: VERSION_SET,
  data
});

/** Labels */
export const $labelsList = data => ({
  type: LABELS_LIST_SET,
  data
});

export const $label = data => ({
  type: LABEL_SET,
  data
});

export const $updateLabel = data => ({
  type: LABEL_UPDATE,
  data
});

/** Roles */
export const $rolesList = data => ({
  type: ROLES_LIST_SET,
  data
});

export const $role = data => ({
  type: ROLE_SET,
  data
});

export const $updateRole = data => ({
  type: ROLE_UPDATE,
  data
});

export const $permissionGroups = data => ({
  type: PERMISSION_GROUPS_SET,
  data
});

/** Types */
export const $typesList = data => ({
  type: TYPES_LIST_SET,
  data
});

/** Messages */
export const $message = data => ({
  type: MESSAGE_SET,
  data
});

/** Errors */
export const $error = data => ({
  type: ERROR_SET,
  data
});
