/**
 * LocalStorage API wrapper сlass
 */

export default class BrowserLocalStorageClass {

  /**
   * LocalStorage constructor
   *
   * @param  {Sting} dbName = '' Prefix for database
   * @example import LocalStorageClass from '../localstorage';
   * @example const Local = new LocalStorageClass();
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

    /** @private */
    this._isOK = false;
    if (!hasLocalStorage) {
      throw new Error('Local Storage is not available.');
    }

    /** @private */
    this._prefix = dbName;

    /** @private */
    this._prefixDecorator = this._prefix + (this._prefix && '-');

    /** @private */
    this._isOK = true;

    /** @private
     * @todo should calculate all keys with prefix #2
     */
    this._length = 0;
  }

  /**
   * Check localStorage for availability
   *
   * @returns {Boolean} Available or not
   * @example const ok = Local.isAvailable;
   */
  isAvailable() {
    return this._isOK;
  }

  /**
   * Get quantity of keys in DB
   *
   * @returns {Number}  A number of keys
   * @example let keysNumber = Local.length;
   */
  get length() {
    return this._length;
  }

  /**
   * Clear DB
   *
   * @returns {Boolean}  Cleared or not
   * @example let res = Local.clear();
   */
  clear() {
    const zeroLength = 0;

    /** @todo should clear keys only with prefix #3 */
    localStorage.clear();

    /** @todo should check real num of keys #4 */
    this._length = 0;

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
        this._length++;

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

  /**
   * Check a key for availability
   *
   * @param  {String} key A key's name
   * @returns {Boolean}   Present or not
   * @example const res = Local.hasKey(key);
   */
  hasKey(key) {
    if (!this._isOK || !key) {
      return false;
    }

    return Boolean(JSON.parse(localStorage.getItem(`${this._prefixDecorator}${key}`)));
  }

  /**
   * Delete a key
   *
   * @param  {String} key A key's name
   * @returns {Boolean}   Returns True if successful
   * @example Local.removeKey(key);
   */
  removeKey(key) {
    if (!this._isOK || !key) {
      return false;
    }
    localStorage.removeItem(`${this._prefixDecorator}${key}`);
    this._length--;

    return !this.hasKey(key);
  }
}
