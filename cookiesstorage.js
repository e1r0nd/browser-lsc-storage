/**
 * Browser LSC Storage API // cookiestorage.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - March 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

export default class BrowserCookiesStorageClass {
  constructor() {
    if ('undefined' == typeof document || 'undefined' == typeof document.cookie) {
      throw new Error('Cookies are not available.');
    }
    this.MAX_EXPIRE_DATE = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
    this._isOK = true;
    this._length = 0;
  }

  isAvailable() {
    return this._isOK;
  }

  key(key = '', value = '', options = {}) {
    if (!key || !this._isOK) {
      return false;
    }
    if (value || options.expires) {
      // Write cookies
      let { expires } = options;
      const TO_REMOVE = -1;
      const MSEC = 1000;

      if ('number' == typeof expires && expires && TO_REMOVE !== expires) {
        const newDate = new Date();
        newDate.setTime(newDate.getTime() + (expires * MSEC));
        options.expires = newDate;
        expires = newDate;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
      }

      value = encodeURIComponent(value);

      let updatedCookie = `${key}=${value}`;

      for (const propName in options) {
        updatedCookie += `;  ${propName}`;
        const propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += `=${propValue}`;
        }
      }
      document.cookie = updatedCookie;
    } else {
      // Read cookies
      const matches = document.cookie.match(new RegExp(
        `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
      ));
      const FIRST_ELEM = 1;

      return matches ? decodeURIComponent(matches[FIRST_ELEM]) : false;
    }

    return value === this.key(key);
  }

  hasKey(key) {
    if (!this._isOK || !key) {
      return false;
    }

    return Boolean(this.key(key));
  }

  removeKey(key) {
    if (!this._isOK || !key) {
      return false;
    }
    this.key(key, '', { expires: -1 });

    return true;
  }
}
