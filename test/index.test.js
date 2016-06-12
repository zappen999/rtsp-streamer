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

  describe('Events', () => {
    describe('onConnect', () => {

    });

    describe('onError', () => {

    });
  });

});
