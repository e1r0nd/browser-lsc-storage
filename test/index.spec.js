/**
 * Browser LSC Storage API // index.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - March 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import { browserStorage } from '../index';
import chai from 'chai';

const expect = chai.expect;

describe('# Storage include', () => {
  it('check Storage class for availability', () => {
    expect(browserStorage).to.be.an.instanceof(Object);
  });
  it('check Cookies class for availability', () => {
    expect(browserStorage.BrowserCookieStorageClass).to.be.an.instanceof(Function);
  });
  it('check localStorage class for availability', () => {
    expect(browserStorage.BrowserLocalStorageClass).to.be.an.instanceof(Function);
  });
  it('check sessionStorage class for availability', () => {
    expect(browserStorage.BrowserSessionStorageClass).to.be.an.instanceof(Function);
  });
});
