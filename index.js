/**
 * Browser Local/Session/Cookies Storage API wrapper
 *
 * @version 0.1.0
 * @author Anatol Marezhanyi
 * @example import browserStorage from '../index'
 */
import BrowserCookieClass from './cookies.js';
import BrowserStorageClass from './storage.js';

const cookie = new BrowserCookieClass();
Object.freeze(cookie);
const local = new BrowserStorageClass();
Object.freeze(local);
const session = new BrowserStorageClass('sessionStorage');
Object.freeze(session);

const browserStorage = {
  cookie,
  local,
  session,
};
Object.freeze(browserStorage);

export default browserStorage;
