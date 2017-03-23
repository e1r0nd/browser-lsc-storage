/**
 * Cookies Storage API wrapper сlass
 */
export default class BrowserCookiesStorageClass {

  /**
   * Cookies Storage constructor
   *
   * @example import СookiesClass from '../cookiestorage';
   * @example const cookie = new CookiesClass();
   */
  constructor() {
    if ('undefined' == typeof document || 'undefined' == typeof document.cookie) {
      throw new Error('Cookies are not available.');
    }
    this._isOK = true;
  }

  /**
   * Check Cookies Storage for availability
   *
   * @returns {Boolean} Available or not
   */
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
      // Read a cookie
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
