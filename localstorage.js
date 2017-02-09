/**
 * Browser LSC Storage API // localstorage.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */
export default class BrowserLocalStorageClass {
  constructor(dbName) {
    this.isOK = false;
    if (! (window && window.localStorage)) {
      throw new Error('Local Storage is not available.');
    }
    this.name = dbName;
    // Get index
    this.index = [];
    const strIndex = localStorage.getItem(`${this.name}-words`);
    if (strIndex) {
      this.index = strIndex.split(',');
    }
    this.isOK = true;
  }

  readItem(key) {
    return this.isOK && JSON.parse(localStorage.getItem(key));
  }

  removeItem(key) {
    if (this.isOK) {
      localStorage.removeItem(key);
    }
  }

  storeItem(key, value) {
    if (this.isOK) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        if ('QUOTA_EXCEEDED_ERR' === err) {
          throw new Error('Local Storage is full');
        }

        return false;
      }

      return true;
    }

    return false;
  }

  putSettings(theSettingsObj) {
    this.storeItem(`${this.name}-words-settings`, theSettingsObj);
  }

  getSettings() {
    let settings = this.readItem(`${this.name}-words-settings`);
    if (!settings) {
      // The app runs for the first time, thus
      // Initialize the setting object neeeds to be initialized
      // With default values.

      // First is for box (or step) 1 in the Leitner box;
      //       Ask the word again after 1 day
      // Second is for box 2 ; ask the word again after 3 days
      // Third is for box 3 ; ask the word again after 7 days

      // Note: box 0 is for the Learn mode and it not set
      // As the words are accessible all the time
      console.log('initialize settings');
      settings = {
        first: 1,
        second: 3,
        third: 7,
      };
      this.storeItem(`${this.name}-settings`, settings);
      this.storeItem(`${this.name}-language`, 'en_GB');
    }

    return settings;
  }

  loadWords(theWords) {
    let index = 0;
    const arrayOfKeys = [];
    const storeEachElement = (element) => {
      element.index = `index${++index}`;
      element.step = 0;
      element.date = 0;
      this.storeItem(`${this.name}-${element.index}`, element);
      arrayOfKeys.push(element.index);
    };

    theWords.forEach(storeEachElement.bind(this));

    this.storeItem(`${this.name}-words`, arrayOfKeys.join());
    this.index = arrayOfKeys;

    console.log(`${arrayOfKeys.length} words have been loaded`);
  }

  isEmpty() {
    return this.isOK && !this.index.length;
  }

  dumpWords() {
    if (this.isOK) {
      let key = '';
      let strValue = '';
      const result = [];

      const prefixForNumber = `${this.name}-index`;

      // Go through all keys starting with the name
      // Of the database, i.e 'learnWords-index14'
      // Collect the matching objects into arr
      for (let index = 0; index < localStorage.length; index++) {
        key = localStorage.key(index);
        strValue = localStorage.getItem(key);

        if (!key.lastIndexOf(prefixForNumber)) {
          result.push(JSON.parse(strValue));
        }
      }

      // Dump the array as JSON code (for select all / copy)
      console.log(JSON.stringify(result));
    }
  }

  removeObjects(aKeyPrefix) {
    if (this.isOK) {
      let key = '';
      const keysToDelete = [];

      // Go through all keys starting with the name
      // Of the database, i.e 'learnWords-index14'
      for (let index = 0; index < localStorage.length; index++) {
        key = localStorage.key(index);

        if (!key.lastIndexOf(aKeyPrefix)) {
          keysToDelete.push(key);
        }
      }
      // Now we have all the keys which should be deleted
      // In the array keysToDelete.
      console.log(keysToDelete);
      keysToDelete.forEach((aKey) => {
        localStorage.removeItem(aKey);
      });
    }
  }

  removeWords() {
    const aKeyPrefix = `${this.name}-index`;

    this.removeObjects(aKeyPrefix);
    // Reset index
    localStorage.setItem(`${this.name}-words`, '');
    // This one triggers that memorystore is executed
    localStorage.removeItem(`${this.name}-settings`);
  }

  destroy() {
    const aKeyPrefix = this.name;

    this.removeObjects(aKeyPrefix);
  }
}
