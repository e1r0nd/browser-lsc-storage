/**
 * Browser LSC Storage API // index.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - March 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */
import chai from 'chai';
const expect = chai.expect;
const browserStorage = require('../index').default;

describe('# Storage include', () => {
  it('check Storage class for availability', () => {
    expect(browserStorage).to.be.an.instanceof(Object);
  });
  it('check Cookies class for availability', () => {
    expect(browserStorage.cookie).to.be.an.instanceof(Object);
  });
  it('check localStorage class for availability', () => {
    expect(browserStorage.local).to.be.an.instanceof(Object);
  });
  it('check sessionStorage class for availability', () => {
    expect(browserStorage.session).to.be.an.instanceof(Object);
  });
  it('check Storage class for immutability', () => {
    expect(() => {
      browserStorage.ok = 1;
    }).to.throw(Error);
  });
  it('check Storage method Cookie for immutability', () => {
    expect(() => {
      browserStorage.cookie.ok = 1;
    }).to.throw(Error);
  });
  it('check Storage method Local for immutability', () => {
    expect(() => {
      browserStorage.local.ok = 1;
    }).to.throw(Error);
  });
  it('check Storage method Session for immutability', () => {
    expect(() => {
      browserStorage.session.ok = 1;
    }).to.throw(Error);
  });
});
