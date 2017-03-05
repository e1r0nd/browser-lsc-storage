/**
 * Browser LSC Storage API // localstorage.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import LocalClass from '../localstorage';
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

  Object.defineProperty(global, 'localStorage', { value: storageMock });

  it('expect an Error if localStorage isn\'t defined', () => {
    const stub = sinon.stub(global.localStorage, 'getItem');

    expect(() => {
      const FailLocal = new LocalClass();
      FailLocal.isAvailable();
    }).to.throw(Error);
    expect(() => {
      localStorage.getItem = '';
      const FailLocal = new LocalClass();
      FailLocal.isAvailable();
    }).to.throw(Error);
    stub.restore();
  });

  it('check for availability', () => {
    const Local = new LocalClass('');
    expect(Local.isAvailable()).to.be.true;
  });
  it('check for a prefix', () => {
    const Local = new LocalClass('abc');
    Local.prefix = 'qwe';
    expect(Local.prefix).to.equal('qwe');
  });
  it('check for a key', () => {
    const Local = new LocalClass('');
    expect(Local.hasKey('a-key')).to.be.false;
    expect(Local.hasKey('')).to.be.false;
  });
  it('write & read a key-value pair', () => {
    const Local = new LocalClass('');
    expect(Local.key('b-key', 'b-value')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.true;
    expect(Local.key('b-key')).to.equal('b-value');
    expect(Local.key()).to.be.false;
  });
  it('delete a key', () => {
    const Local = new LocalClass('');
    expect(Local.removeKey('b-key')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.false;
    expect(Local.removeKey('')).to.be.false;
  });
  it('clear Storage', () => {
    const Local = new LocalClass('');
    const zeroLength = 0;
    expect(Local.key('c-key', 'c')).to.be.true;
    expect(Local.key('d-key', 'd')).to.be.true;
    expect(Local.hasKey('d-key')).to.be.true;
    expect(Local.clear()).to.be.true;
    expect(Local.hasKey('c-key')).to.be.false;
    expect(Local.hasKey('d-key')).to.be.false;
    expect(Local.length).to.equal(zeroLength);
  });
});
