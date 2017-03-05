/**
 * Browser LSC Storage API // localstorage.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import SessionClass from '../sessionstorage';
import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;

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

  Object.defineProperty(global, 'sessionStorage', { value: storageMock });

  it('expect an Error if sessionStorage isn\'t defined', () => {
    const stub = sinon.stub(global.sessionStorage, 'getItem');

    expect(() => {
      const FailSession = new SessionClass();
      FailSession.isAvailable();
    }).to.throw(Error);
    expect(() => {
      sessionStorage.getItem = '';
      const FailSession = new SessionClass();
      FailSession.isAvailable();
    }).to.throw(Error);
    stub.restore();
  });

  it('check for availability', () => {
    const Session = new SessionClass('');
    expect(Session.isAvailable()).to.be.true;
  });
  it('check for a prefix', () => {
    const Session = new SessionClass('abc');
    Session.prefix = 'qwe';
    expect(Session.prefix).to.equal('qwe');
  });
  it('check for a key', () => {
    const Session = new SessionClass('');
    expect(Session.hasKey('a-key')).to.be.false;
    expect(Session.hasKey('')).to.be.false;
  });
  it('write & read a key-value pair', () => {
    const Session = new SessionClass('');
    expect(Session.key('b-key', 'b-value')).to.be.true;
    expect(Session.hasKey('b-key')).to.be.true;
    expect(Session.key('b-key')).to.equal('b-value');
    expect(Session.key()).to.be.false;
  });
  it('delete a key', () => {
    const Session = new SessionClass('');
    expect(Session.removeKey('b-key')).to.be.true;
    expect(Session.hasKey('b-key')).to.be.false;
    expect(Session.removeKey('')).to.be.false;
  });
  it('clear Storage', () => {
    const Session = new SessionClass('');
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
