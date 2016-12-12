const net = require('net');

const Request = require('./request');
const Response = require('./response');

/**
 * Library similar to `fetch` for RTSP calls
 */

class Rolf {

  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param   {string}  host Host to connect to
   * @param   {integer} port Port to use
   * @param   {string}  uri  URI to the rtsp resource
   * @returns {Promise} Load promise
   */
  constructor(host, port, uri) {
    this._host = host;
    this._port = port;
    this._uri = uri;

    this._client = new net.Socket();

    // Events
    this._onConnect = null;
    this._onError = null;
    this._onData = null;

    // State
    this._cseq = 0;
  }

  /**
   * Writes data to the server stream
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Request} request The request to send over the line
   * @return {Function} cb      Callback function
   */
  _sendRequest(request, cb) {
    this._client.write(request.getRaw());
  }

  /**
   * Start streaming from the host
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  _open() {
    const req = new Request(
      'OPTIONS',
      this._host,
      this._port,
      this._uri,
      this._cseq
    );

    this._sendRequest(req);

    // Increment the sequence number
    this._cseq = this._cseq + 1;
  }

  /**
   * Connects the client to the host
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  subscribe() {
    this._client.connect(this._port, this._host, err => {
      if (err) {
        return this._onError(err);
      }

      // Handle server responses
      this._client.on('data', data => {
        this._onData(data);
      });

      // Start streaming
      this._open();

      // Run the onConnect event
      this._onConnect();
    });
  }

  /**
   * Events
   */

  /**
   * Gets executed when the client has connected successfully
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Function} cb Callback
   * @return {void}
   */
  onConnect(cb) {
    this._onConnect = cb;
    return this;
  }

  /**
   * Gets executed on any error in the streamer
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Function}     cb Callback function
   * @return {RTSPStreamer}    Self
   */
  onError(cb) {
    this._onError = cb;
    return this;
  }

  /**
   * Gets executed when new data was read from the stream
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Function}     cb Callback function
   * @return {RTSPStreamer}    Self
   */
  onData(cb) {
    this._onData = cb;
    return this;
  }

  /**
   * Gets executed on any errors in the stream
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Function}     cb Callback function
   * @return {RTSPStreamer}    Self
   */
  onClose(cb) {
    this._onClose = cb;
    return this;
  }
}

module.exports = new Rolf;
