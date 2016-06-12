const chai = require('chai');
const expect = chai.expect;

const Response = require('../response');

describe('Response', () => {
  describe('Constructor', () => {
    it('should set the response data', () => {
      const res = new Response('theresponse');
      expect(res._data).to.equal('theresponse');
    });
  });

  describe('Parse', () => {

  });

  describe('Parse status line', () => {
    it('should extract version', () => {
      const r = 'RTSP/1.0 200 OK response';
      const res = new Response();
      const rs = res._parseStatusLine(r);

      expect(rs.version).to.equal('RTSP/1.0');
      expect(rs.statusCode).to.equal(200);
      expect(rs.reasonPhrase).to.equal('OK response');
    });
  });

  describe('Get status code', () => {
    it('should return the status code', () => {
      const res = new Response();
      res._statusCode = 200;
      expect(res.getStatusCode()).to.equal(200);
    });
  });

  describe('Get version', () => {
    it('should return the version', () => {
      const res = new Response();
      res._version = 'RTSP/1.0';
      expect(res.getVersion()).to.equal('RTSP/1.0');
    });
  });

  describe('Get reason phrase', () => {
    it('should return the reason phrase', () => {
      const res = new Response();
      res._reasonPhrase = 'reason';
      expect(res.getReasonPhrase()).to.equal('reason');
    });
  });
});
