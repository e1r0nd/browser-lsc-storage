/**
 * Browser Local/Session/Cookies Storage API wrapper
 *
 * @version 0.1.0
 * @author Anatol Marezhanyi
 * @example import browserStorage from '../index'
 */
import BrowserCookieStorageClass from './cookiesstorage.js';
import BrowserLocalStorageClass from './localstorage.js';
import BrowserSessionStorageClass from './sessionstorage.js';

const cookie = new BrowserCookieStorageClass();
Object.freeze(cookie);
const local = new BrowserLocalStorageClass();
Object.freeze(local);
const session = new BrowserSessionStorageClass();
Object.freeze(session);

const browserStorage = {
  cookie,
  local,
  session,
};
Object.freeze(browserStorage);

export default browserStorage;
