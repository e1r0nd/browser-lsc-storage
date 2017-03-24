/**
 * LocalStorage API wrapper сlass
 */

export default class BrowserLocalStorageClass {

  /**
   * LocalStorage constructor
   *
   * @param  {Sting} dbName = '' Prefix for database
   * @example import LocalStorageClass from '../localstorage';
   * @example const local = new LocalStorageClass();
   */
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
    }

    this._isOK = false;
    if (!hasLocalStorage) {
      throw new Error('Local Storage is not available.');
    }
    this._prefix = dbName;
    this._prefixDecorator = this._prefix + (this._prefix && '-');
    this._isOK = true;
    this._length = 0;
  }

  /**
   * Check localStorage for availability
   *
   * @returns {Boolean} Available or not
   */
  isAvailable() {
    return this._isOK;
  }

  get length() {
    return this._length;
  }

  clear() {
    const zeroLength = 0;

    localStorage.clear();
    this._length = localStorage.length;

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
        localStorage.setItem(`${this._prefixDecorator}${key}`, JSON.stringify(value));
        this._length = localStorage.length;

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
    if (!this._isOK || !key) {
      return false;
    }

    return Boolean(JSON.parse(localStorage.getItem(`${this._prefixDecorator}${key}`)));
  }

  removeKey(key) {
    if (!this._isOK || !key) {
      return false;
    }
    localStorage.removeItem(`${this._prefixDecorator}${key}`);

    return !this.hasKey(key);
  }
}
