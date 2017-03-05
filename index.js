/**
 * Browser LSC Storage API // index.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */
import BrowserCookieStorageClass from './cookiesstorage.js';
import BrowserLocalStorageClass from './localstorage.js';
import BrowserSessionStorageClass from './sessionstorage.js';

console.log(BrowserLocalStorageClass);

export const browserStorage = {
  BrowserCookieStorageClass,
  BrowserLocalStorageClass,
  BrowserSessionStorageClass,
};
