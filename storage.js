/**
 * LocalStorage and SessionStorage API wrapper сlass
 */

export default class BrowserStorageClass {

  /**
   * LocalStorage constructor
   *
   * @param {String} storageType = '' Sesison or Local Storage
   * @example import LocalStorageClass from '../localstorage';
   * @example const Local = new LocalStorageClass();
   */
  constructor(storageType = 'localStorage') {
    let hasLocalStorage = true;

    try {
      hasLocalStorage = 'undefined' !== typeof window[storageType];
      // Check Safari's private browsing mode
      window[storageType].setItem('Storage-Test', '1');
      hasLocalStorage = '1' === window[storageType].getItem('Storage-Test');
      window[storageType].removeItem('Storage-Test');
    } catch (error) {
      throw new Error(error);
    }

    /** @private */
    this._isOK = false;
    if (!hasLocalStorage) {
      throw new Error('Local Storage is not available.');
    }

    /** @private */
    this._storageType = window[storageType];

    /** @private */
    this._isOK = true;

    /** @private */
    this._props = {
      length: 0,
      prefix: '',
      prefixDecorator: '',
    };
  }

  /**
   * Check window[storageType] for availability
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
    return this._props.length;
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
    this._storageType.clear();

    /** @todo should check real num of keys #4 */
    this._props.length = 0;

    return zeroLength === this._props.length;
  }

  get prefix() {
    return this._props.prefix;
  }

  set prefix(value) {
    this._props.prefix = value;
    this._props.prefixDecorator = this._props.prefix + (this._props.prefix && '-');
  }

  key(key = '', value = '') {
    if (!key || !this._isOK) {
      return false;
    }

    if (value) {
      // Set value for a key
      try {
        this._storageType.setItem(`${this._props.prefixDecorator}${key}`, JSON.stringify(value));
        this._props.length++;

        return value === this.key(key);
      } catch (err) {
        if ('QUOTA_EXCEEDED_ERR' === err) {
          throw new Error('Local Storage is full');
        }

        return false;
      }
    } else {
      // Read a key
      return this._isOK && JSON.parse(this._storageType.getItem(`${this._props.prefixDecorator}${key}`));
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

    return Boolean(JSON.parse(this._storageType.getItem(`${this._props.prefixDecorator}${key}`)));
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
    this._storageType.removeItem(`${this._props.prefixDecorator}${key}`);
    this._props.length--;

    return !this.hasKey(key);
  }
}
