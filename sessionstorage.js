/**
 * Browser LSC Storage API // sessionstorage.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - March 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */
export default class BrowserSessionStorageClass {
  constructor(dbName = '') {
    let hasSessionStorage = true;

    try {
      hasSessionStorage = 'undefined' !== typeof sessionStorage;
      // Check Safari's private browsing mode
      sessionStorage.setItem('Storage-Test', '1');
      hasSessionStorage = '1' === sessionStorage.getItem('Storage-Test');
      sessionStorage.removeItem('Storage-Test');
    } catch (error) {
      throw new Error(error);
    }

    this._isOK = false;
    if (!hasSessionStorage) {
      throw new Error('Local Storage is not available.');
    }
    this._prefix = dbName;
    this._prefixDecorator = this._prefix + (this._prefix && '-');
    this._isOK = true;
    this._length = 0;
  }

  isAvailable() {
    return this._isOK;
  }

  get length() {
    return this._length;
  }

  clear() {
    const zeroLength = 0;

    sessionStorage.clear();
    this._length = sessionStorage.length;

    return zeroLength === this._length;
  }

  get prefix() {
    return this._prefix;
  }

  set prefix(value) {
    this._prefix = value;
  }

  key(key = '', value = '') {
    if (!key || !this._isOK) {
      return false;
    }

    if (value) {
      // Set value for a key
      try {
        sessionStorage.setItem(`${this._prefixDecorator}${key}`, JSON.stringify(value));
        this._length = sessionStorage.length;

        return value === this.key(key);
      } catch (err) {
        if ('QUOTA_EXCEEDED_ERR' === err) {
          throw new Error('Local Storage is full');
        }

        return false;
      }
    } else {
      // Read a key
      return this._isOK && JSON.parse(sessionStorage.getItem(`${this._prefixDecorator}${key}`));
    }
  }

  hasKey(key) {
    if (!this._isOK || !key) {
      return false;
    }

    return Boolean(JSON.parse(sessionStorage.getItem(`${this._prefixDecorator}${key}`)));
  }

  removeKey(key) {
    if (!this._isOK || !key) {
      return false;
    }
    sessionStorage.removeItem(`${this._prefixDecorator}${key}`);

    return !this.hasKey(key);
  }
}
