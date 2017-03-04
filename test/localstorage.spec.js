/**
 * Browser LSC Storage API // localstorage.spec.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - February 2017
 * http://linkedin.com/in/merezhany/ a.merezhany@gmail.com
 * Placed in public domain.
 */

import LocalClass from '../localstorage';
import chai from 'chai';

const expect = chai.expect;

describe('# localStorage', () => {
  const Local = new LocalClass('abc');

  it('check for availability', () => {
    expect(Local.isAvailable()).to.be.true;
  });
  it('check for a prefix', () => {
    Local.prefix = 'qwe';
    expect(Local.prefix).to.equal('qwe');
  });
  it('check for a key', () => {
    expect(Local.hasKey('a-key')).to.be.false;
  });
  it('write & read a key-value pair', () => {
    expect(Local.key('b-key', 'b-value')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.true;
    expect(Local.key('b-key')).to.equal('b-value');
  });
  it('delete a key', () => {
    expect(Local.removeKey('b-key')).to.be.true;
    expect(Local.hasKey('b-key')).to.be.false;
  });
});
