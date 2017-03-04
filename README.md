# browser-lsc-storage
localStorage, Session Storage and Cookies API wrapper for browser

## localStorage Class
### Initialization
`import LocalClass from '../localstorage';
const Local = new LocalClass(prefix);`

### Methods
**isAvailable:** check for availability.
`const hasLocalStorage = Local.isAvailable(); // returns Boolean`

**prefix:** set or read a prefix
`Local.prefix = 'abc'; // set a prefix
const thisPrefix = Local.prefix; // read for a prefix, returns String

**hasKey:** check for a key
`const res = Local.hasKey(key); // returns Boolean`

**key:** write & read a key-value pair
`Local.key(key, value); // store a Key with a defined Value, returns True if successful
const thisKey = Local.key(key); // read a key, returns String`

**removeKey:** delete a key
`Local.removeKey(key); // returns True if successful`
