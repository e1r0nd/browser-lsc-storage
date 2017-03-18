/**
 * Browser LSC Storage API // index.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
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
