/**
 * Browser LSC Storage API // localstorage.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import LocalClass from '../localstorage';
import assert from 'assert';
import chai from 'chai';

const expect = chai.expect;

describe('# localStorage', () => {
  it('check availability', () => {
    const Local = new LocalClass('abc');
    assert(Local.isAvailable(), true);
    expect(Local.isAvailable()).to.be.true;
  });
});

describe('localStorage', () => {
  it('check prefix', () => {
    const Local = new LocalClass('abc');
    Local.prefix = 'qwe';
    assert.equal(Local.prefix, 'qwe');
  });
});
/*
describe('localStorage: can search?', () => {
  it('check for a key', () => {
    assert.equal(Local.has('a-key'), true);
  });
});

describe('localStorage: can read?', () => {
  it('read a key', () => {
    assert.equal(Local.key('b-key'), 'b-value');
  });
});

describe('localStorage: can write?', () => {
  it('write a key', () => {
    Local.key('c-key', 'c-value');
    assert.equal(Local.key('c-key'), false);
  });
});

describe('localStorage: can delete?', () => {
  it('delete a key', () => {
    Local.key('d-key', 'd-value');
    assert.equal(Local.has('d-key'), false);
  });
});

describe('localStorage: destroy?', () => {
  it('remove all keys', () => {
    Local.key('e-key', 'e-value');
    Local.destroy();
    assert.equal(Local.has('e-key'), false);
  });
});
*/
