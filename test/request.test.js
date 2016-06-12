const chai = require('chai');
const expect = chai.expect;

const Request = require('../request');

describe('Request', () => {
  describe('Constructor', () => {

  });

  describe('Validate method', () => {
    it('should return false for invalid methods', () => {
      const req = new Request('DESCRIBE');
      expect(req._validateMethod('invalid')).to.equal(false);
    });

    it('should return true for valid methods', () => {
      const req = new Request('DESCRIBE');
      expect(req._validateMethod('DESCRIBE')).to.equal(true);
    });
  });

  describe('Headers', () => {
    it('should add a header to the list of headers', () => {
      const req = new Request('DESCRIBE');
      req.header('Content-Length', '1000');
      expect(req._headers['Content-Length']).to.equal('1000');
    });

    it('should throw error if the key contains spaces', () => {
      const req = new Request('DESCRIBE');
      expect(() => req.header('Invalid header', 'value')).to.throw(Error);
    });
  });

  describe('Get raw', () => {
    it('should construct a raw request string', () => {
      
    });
  });
});
