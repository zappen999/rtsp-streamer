const chai = require('chai');
const expect = chai.expect;

const RS = require('../');

describe('RTSP streamer', () => {

  describe('Constructor', () => {
    it('should set the host, port and URI', () => {
      const streamer = new RS('thehost', 1234, '/theuri');

      expect(streamer._host).to.equal('thehost');
      expect(streamer._port).to.equal(1234);
      expect(streamer._uri).to.equal('/theuri');
    });
  });

  describe('Open', () => {
    it('should not run before the client is connected', () => {
      const streamer = new RS();
      
    });
  });

  describe('Events', () => {
    describe('onConnect', () => {
      it('should set a connect callback', () => {
        const streamer = new RS();
        const cb = () => {};
        streamer.onConnect(cb);
        expect(streamer._onConnect).to.equal(cb);
      });
    });

    describe('onError', () => {
      it('should set an error callback', () => {
        const streamer = new RS();
        const cb = () => {};
        streamer.onError(cb);
        expect(streamer._onError).to.equal(cb);
      });
    });

    describe('onData', () => {
      it('should set a data callback', () => {
        const streamer = new RS();
        const cb = () => {};
        streamer.onData(cb);
        expect(streamer._onData).to.equal(cb);
      });
    });

    describe('onClose', () => {
      it('should set a close callback', () => {
        const streamer = new RS();
        const cb = () => {};
        streamer.onClose(cb);
        expect(streamer._onClose).to.equal(cb);
      });
    });
  });

});
