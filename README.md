# browser-lsc-storage [![Build Status](https://travis-ci.org/e1r0nd/browser-lsc-storage.svg?branch=master)](https://travis-ci.org/e1r0nd/browser-lsc-storage) [![npm version](https://badge.fury.io/js/browser-lsc-storage.svg)](https://badge.fury.io/js/browser-lsc-storage) [![Coverage Status](https://coveralls.io/repos/github/e1r0nd/browser-lsc-storage/badge.svg?branch=master)](https://coveralls.io/github/e1r0nd/browser-lsc-storage?branch=master) [![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
localStorage, Session Storage and Cookies API wrapper for browser

## TL;DR
```javascript
import browserStorage from '../index'; //import Storage API Object
browserStorage.local.prefix = 'myApp'; //use localStorage and set a prefix
browserStorage.local.key('key', 'value'); //store 'key' with 'value'
console.log(browserStorage.local.key('key')); //read 'key'

const session = require('../index').default.session;
session.key('session_id', '2017');
console.log(session.key('session_id'));
```

## localStorage/sessionStorage Class
### Initialization
```javascript
import LocalClass from '../localstorage';
const Local = new LocalClass(prefix);
import SessionClass from '../sessionstorage';
const Session = new SessionClass(prefix);
```

### Methods
**isAvailable:** check for availability.
```javascript
const hasLocalStorage = Local.isAvailable(); // returns Boolean
```

**prefix:** set or read a prefix
```javascript
Local.prefix = 'abc'; // set a prefix
const thisPrefix = Local.prefix; // read for a prefix, returns String
```

**hasKey:** check for a key
```javascript
const res = Local.hasKey(key); // returns Boolean
```

**key:** write & read a key-value pair
```javascript
Local.key(key, value); // store a Key with a defined Value, returns True if successful
const thisKey = Local.key(key); // read a key, returns String
```

**removeKey:** delete a key
```javascript
Local.removeKey(key); // returns True if successful
```
## Cookies Class
### Initialization
```javascript
import CookiesClass from '../cookiesstorage';
const Cookies = new CookiesClass();
```

### Methods
**isAvailable:** check for availability.
```javascript
const hasCookies = Cookies.isAvailable(); // returns Boolean
```

**hasKey:** check for a key
```javascript
const res = Cookies.hasKey(key); // returns Boolean
```

**key:** write & read a key-value pair
```javascript
Cookies.key(key, value, options); // store a Key with a defined Value and {Options}, returns True if successful
const thisKey = Cookies.key(key); // read a key, returns String
```

**removeKey:** delete a key
```javascript
Cookies.removeKey(key); // returns always True
```

## Copyright
coded by Anatol Marezhanyi aka e1r0nd//[CRG]

http://linkedin.com/in/merezhany/<br>
a.merezhanyi@gmail.com

## License
[MIT License](LICENSE.md) 
