/**
 * Browser LSC Storage API // cookies.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - March 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import CookiesClass from '../cookiesstorage';
import chai from 'chai';

const expect = chai.expect;

describe('# cookies', () => {
  const Cookies = new CookiesClass('abc');

  // it('check for availability', () => {
  //   expect(Cookies.isAvailable()).to.be.true;
  // });
  // it('check for a prefix', () => {
  //   Cookies.prefix = 'qwe';
  //   expect(Cookies.prefix).to.equal('qwe');
  // });
  // it('check for a key', () => {
  //   expect(Cookies.hasKey('a-key')).to.be.false;
  // });
  // it('write & read a key-value pair', () => {
  //   expect(Cookies.key('b-key', 'b-value')).to.be.true;
  //   expect(Cookies.hasKey('b-key')).to.be.true;
  //   expect(Cookies.key('b-key')).to.equal('b-value');
  // });
  // it('delete a key', () => {
  //   expect(Cookies.removeKey('b-key')).to.be.true;
  //   expect(Cookies.hasKey('b-key')).to.be.false;
  // });
});
