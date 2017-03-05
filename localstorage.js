/**
 * Browser LSC Storage API // localstorage.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

export default class BrowserLocalStorageClass {
  constructor(dbName = '') {
    let hasLocalStorage = true;

    try {
      hasLocalStorage = 'undefined' !== typeof localStorage;
      // Check Safari's private browsing mode
      localStorage.setItem('Storage-Test', '1');
      hasLocalStorage = '1' === localStorage.getItem('Storage-Test');
      localStorage.removeItem('Storage-Test');
    } catch (error) {
      throw new Error(error);
      console.log(error);
      hasLocalStorage = false;
    }

    this._isOK = false;
    if (!hasLocalStorage) {
      throw new Error('Local Storage is not available.');
    }
    this._prefix = dbName;
    this._prefixDecorator = this._prefix + (this._prefix && '-');
    this._isOK = true;
  }

  isAvailable() {
    return this._isOK;
  }

  get prefix() {
    return this._prefix;
  }

  set prefix(value = '') {
    this._prefix = value;
  }

  key(key = '', value = '') {
    if (!key || !this._isOK) {
      return false;
    }

    if (value) {
      // Set value for a key
      try {
        localStorage.setItem(`${this._prefixDecorator}${key}`, JSON.stringify(value));

        return value === this.key(key);
      } catch (err) {
        if ('QUOTA_EXCEEDED_ERR' === err) {
          throw new Error('Local Storage is full');
        }

        return false;
      }
    } else {
      // Read a key
      return this._isOK && JSON.parse(localStorage.getItem(`${this._prefixDecorator}${key}`));
    }
  }

  hasKey(key) {
    if (!this._isOK && key) {
      return false;
    }

    return Boolean(JSON.parse(localStorage.getItem(`${this._prefixDecorator}${key}`)));
  }

  removeKey(key) {
    if (this._isOK && key) {
      localStorage.removeItem(`${this._prefixDecorator}${key}`);
    }

    return !this.hasKey(key);
  }
}
