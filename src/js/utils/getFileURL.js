import API from 'Config/API.json';

const { NODE_ENV } = process.env;
const { useSameURL, baseURL } = API;
let { host } = window.location;

if (!useSameURL) {
  host = new URL(baseURL[NODE_ENV]).host; //eslint-disable-line
}

/**
 * Replaces backend-app in file url with API server host
 * @param url
 * @returns {*}
 */
export function getFileURL(url) {
  if (url.includes('backend-app')) {
    return url.replace(/backend-app/, host);
  }
  return url;
}

export default getFileURL;
