/**
 * Browser LSC Storage API // storage.spec.js
 * coded by Anatol Merezhanyi @e1r0nd_crg
 * https://www.youtube.com/c/AnatolMerezhanyi
 */

import StorageClass from '../storage';
import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;

describe('# localStorage', () => {
  const storageMock = (() => {
    const storage = {};

    return {
      clear: () => {
        for (const key in storage) {
          if ({}.propertyIsEnumerable.call(storage, key)) {
            delete storage[key];
          }
        }
      },
      getItem: (key) => (key in storage ? storage[key] : null),
      key: (index) => {
        const keys = Object.keys(storage);

        return keys[index] || null;
      },
      get length() {
        return Object.keys(storage).length;
      },
      removeItem: (key) => {
        delete storage[key];
      },
      setItem: (key, value) => {
        storage[key] = value || '';
      },
    };
  })();

  Object.defineProperty(global, 'window', { value: {} });
  Object.defineProperty(window, 'localStorage', { value: storageMock });

  it('expect an Error if localStorage isn\'t defined', () => {
    const stub = sinon.stub(global.window.localStorage, 'getItem');

    expect(() => {
      const FailLocal = new StorageClass();
      FailLocal.isAvailable();
    }).to.throw(Error);
    expect(() => {
      localStorage.getItem = '';
      const FailLocal = new StorageClass();
      FailLocal.isAvailable();
    }).to.throw(Error);
    stub.restore();
  });

  it('check for availability', () => {
    const Local = new StorageClass();
    expect(Local.isAvailable()).to.be.true;
    expect(Local.hasKey()).to.be.false;
  });
  it('check initial length', () => {
    const lengthWithPrefix = 3;
    const Local = new StorageClass();
    expect(Local.isAvailable()).to.be.true;
    expect(Local.key('x-key', 'y-value')).to.be.true;
    expect(Local.prefix = 'new').to.equal('new');
    expect(Local.key('a-key', 'a-value')).to.be.true;
    expect(Local.key('b-key', 'b-value')).to.be.true;
    expect(Local.key('c-key', 'c-value')).to.be.true;
    expect(Local.length).to.equal(lengthWithPrefix);
  });
  it('check for a prefix', () => {
    const Local = new StorageClass();
    Local.prefix = 'qwe';
    expect(Local.prefix).to.equal('qwe');
    expect(Local.hasKey('a-key')).to.be.false;
  });
  it('check for a key', () => {
    const Local = new StorageClass();
    expect(Local.hasKey('a-key')).to.be.false;
    expect(Local.hasKey('')).to.be.false;
  });
  it('write & read a key-value pair', () => {
    const Local = new StorageClass();
    expect(Local.key('b-key', 'b-value')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.true;
    expect(Local.key('b-key')).to.equal('b-value');
    expect(Local.key()).to.be.false;
  });
  it('use each method', () => {
    const Local = new StorageClass();
    expect(Local.prefix = 'test').to.equal('test');
    expect(Local.key('a-key', 'a-value')).to.be.true;
    expect(Local.key('b-key', 'b-value1')).to.be.true;
    expect(Local.key('c-key', 'c-value')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.true;
    expect(Local.key('b-key')).to.equal('b-value1');
    expect(Local.each()).to.be.an('array');
    expect(Local.each()).to.include({ 'a-key': 'a-value' });
    expect(Local.each()).to.include({ 'b-key': 'b-value1' });
    expect(Local.each()).to.include({ 'c-key': 'c-value' });
  });
  it('delete a key', () => {
    const Local = new StorageClass();
    expect(Local.removeKey('b-key')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.false;
    expect(Local.removeKey('')).to.be.false;
  });
  it('clear Storage', () => {
    const Local = new StorageClass();
    const zeroLength = 0;
    expect(Local.key('x-key', 'x-value')).to.be.true;
    expect(Local.prefix = 'asd').to.equal('asd');
    expect(Local.key('c-key', 'c')).to.be.true;
    expect(Local.key('d-key', 'd')).to.be.true;
    expect(Local.hasKey('d-key')).to.be.true;
    expect(Local.clear()).to.be.true;
    expect(Local.hasKey('c-key')).to.be.false;
    expect(Local.hasKey('d-key')).to.be.false;
    expect(Local.length).to.equal(zeroLength);
    expect(Local.prefix = '').to.equal('');
    expect(Local.hasKey('x-key')).to.be.true;
  });
});

describe('# sessionStorage', () => {
  const storageMock = (() => {
    const storage = {};

    return {
      clear: () => {
        for (const key in storage) {
          if ({}.propertyIsEnumerable.call(storage, key)) {
            delete storage[key];
          }
        }
      },
      getItem: (key) => (key in storage ? storage[key] : null),
      key: (index) => {
        const keys = Object.keys(storage);

        return keys[index] || null;
      },
      get length() {
        return Object.keys(storage).length;
      },
      removeItem: (key) => {
        delete storage[key];
      },
      setItem: (key, value) => {
        storage[key] = value || '';
      },
    };
  })();

  Object.defineProperty(window, 'sessionStorage', { value: storageMock });

  it('expect an Error if sessionStorage isn\'t defined', () => {
    const stub = sinon.stub(global.window.sessionStorage, 'getItem');

    expect(() => {
      const FailSession = new StorageClass('sessionStorage');
      FailSession.isAvailable();
    }).to.throw(Error);
    expect(() => {
      sessionStorage.getItem = '';
      const FailSession = new StorageClass('sessionStorage');
      FailSession.isAvailable();
    }).to.throw(Error);
    stub.restore();
  });

  it('check for availability', () => {
    const Session = new StorageClass('sessionStorage');
    expect(Session.isAvailable()).to.be.true;
  });
  it('check for a prefix', () => {
    const Session = new StorageClass('sessionStorage');
    Session.prefix = 'qwe';
    expect(Session.prefix).to.equal('qwe');
  });
  it('check for a key', () => {
    const Session = new StorageClass('sessionStorage');
    expect(Session.hasKey('a-key')).to.be.false;
    expect(Session.hasKey('')).to.be.false;
  });
  it('write & read a key-value pair', () => {
    const Session = new StorageClass('sessionStorage');
    expect(Session.key('b-key', 'b-value')).to.be.true;
    expect(Session.key('z-key', 'z-value')).to.be.true;
    expect(Session.hasKey('b-key')).to.be.true;
    expect(Session.hasKey('z-key')).to.be.true;
    expect(Session.key('b-key')).to.equal('b-value');
    expect(Session.key('z-key')).to.equal('z-value');
    expect(Session.key()).to.be.false;
  });
  it('use each method', () => {
    const Session = new StorageClass('sessionStorage');
    expect(Session.prefix = 'test').to.equal('test');
    expect(Session.key('a-key', 'a-value')).to.be.true;
    expect(Session.key('b-key', 'b-value1')).to.be.true;
    expect(Session.key('c-key', 'c-value')).to.be.true;
    expect(Session.hasKey('b-key')).to.be.true;
    expect(Session.key('b-key')).to.equal('b-value1');
    expect(Session.each()).to.be.an('array');
    expect(Session.each()).to.not.include({ 'z-key': 'z-value' });
    expect(Session.each()).to.include({ 'a-key': 'a-value' });
    expect(Session.each()).to.include({ 'b-key': 'b-value1' });
    expect(Session.each()).to.include({ 'c-key': 'c-value' });
  });
  it('use forEach method', () => {
    const Session = new StorageClass('sessionStorage');
    expect(Session.prefix = 'test').to.equal('test');
    expect(Session.key('x-key', 'x-value')).to.be.true;
    expect(Session.key('y-key', 'y-value')).to.be.true;
    expect(Session.key('x-key')).to.equal('x-value');
    expect(Session.key('y-key')).to.equal('y-value');
    expect(Session.forEach((key, value, index) => {
      Session.key(key, value + index);
    }));
    expect(Session.key('x-key')).to.equal('x-value3');
    expect(Session.key('y-key')).to.equal('y-value4');
  });
  it('delete a key', () => {
    const Session = new StorageClass('sessionStorage');
    expect(Session.removeKey('b-key')).to.be.true;
    expect(Session.hasKey('b-key')).to.be.false;
    expect(Session.removeKey('')).to.be.false;
  });
  it('clear Storage', () => {
    const Session = new StorageClass('sessionStorage');
    const zeroLength = 0;
    expect(Session.key('c-key', 'c')).to.be.true;
    expect(Session.key('d-key', 'd')).to.be.true;
    expect(Session.hasKey('d-key')).to.be.true;
    expect(Session.clear()).to.be.true;
    expect(Session.hasKey('c-key')).to.be.false;
    expect(Session.hasKey('d-key')).to.be.false;
    expect(Session.length).to.equal(zeroLength);
  });
});
