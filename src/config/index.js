import { format } from 'util';
import APIConfig from './API.json';

const { NODE_ENV } = process.env;

/**
 * Get list of endpoints as object with fields as endpoint names
 * @param version
 * @returns {{
 *    token: String,
 *    logout: String,
 *    resetEmail: String,
 *    resetPassword: String,
 *    permissionGroups: String,
 *    users: String,
 *    profile: String,
 *    types: String,
 *    templates: String,
 *    attributes: String,
 *    documents: String,
 *    labels: String,
 *    roles: String,
 *    logs: String,
 *    files: String
 * }}
 */
export function getAPI(version = 'v1') {
  const result = {};
  const endpoints = Object.keys(APIConfig[version]).map(name => {
    let url = APIConfig.baseURL[NODE_ENV] + APIConfig[version][name];
    if (APIConfig.useSameURL) {
      url = location.host + APIConfig[version][name]; // eslint-disable-line
    }
    return { name, url };
  });
  endpoints.forEach(endpoint => {
    result[endpoint.name] = endpoint.url;
  });
  return result;
}

/**
 * Get a specific endpoint url by its name
 * @param endpointName
 * @param parameter
 * @returns {string}
 */
export function getURL(endpointName, parameter) {
  if (!endpointName) throw new Error('No endpoint name specified.');
  const api = getAPI();
  const url = api[endpointName];
  if (url.includes('%s')) {
    if (!parameter) throw new Error('Parameterized url needs parameter.');
    return format(url, parameter);
  }
  return url;
}

/**
 * @type {{
 *    token: String,
 *    logout: String,
 *    resetEmail: String,
 *    resetPassword: String,
 *    permissionGroups: String,
 *    users: String,
 *    profile: String,
 *    types: String,
 *    templates: String,
 *    attributes: String,
 *    documents: String,
 *    labels: String,
 *    roles: String,
 *    logs: String,
 *    files: String
 * }}
 */
export const API = getAPI();

export default {
  API,
  getAPI,
  getURL
};
