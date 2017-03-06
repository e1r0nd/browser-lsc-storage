/**
 * Browser LSC Storage API // cookies.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - March 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import CookiesClass from '../cookiesstorage';
import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;

describe('# Cookies', () => {
  const documentMock = { cookie: '' };
  Object.defineProperty(global, 'document', { value: documentMock });
  it('expect an Error if Cookies isn\'t defined', () => {
    sinon.stub(global.document);
    expect(() => {
      delete global.document.cookie;
      const FailCookies = new CookiesClass();
      FailCookies.isAvailable();
    }).to.throw(Error);
    sinon.restore(global.document);
  });
  const Cookies = new CookiesClass();
  it('check for availability', () => {
    expect(Cookies.isAvailable()).to.be.true;
  });
  it('write & read a key-value pair', () => {
    expect(Cookies.key('b-key', 'b-value')).to.be.true;
    expect(Cookies.hasKey('b-key')).to.be.true;
    expect(Cookies.key('b-key')).to.equal('b-value');
  });
  it('delete a key', () => {
    Cookies.removeKey('b-key');
    expect(Cookies.key('b-key')).to.equal('');
  });
  it('check for a key', () => {
    expect(Cookies.hasKey('a-key')).to.be.false;
  });
});
