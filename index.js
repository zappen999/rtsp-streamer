const net = require('net');

class RTSPStreamer {

  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}  host Host to connect to
   * @param  {integer} port Port to use
   * @param  {string}  uri  URI to the rtsp resource
   */
  constructor(host, port, uri) {
    this._host = host;
    this._port = port;
    this._uri = uri;

    this._client = new net.Socket();

    // Events
    this._onConnect = null;

    this._cseq = 0;
  }

  /**
   * Writes data to the server stream
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Request} request The request to send over the line
   * @return {Functin} cb      Callback function
   */
  _sendRequest(request) {
    this._client.write(request.getRaw());
  }

  /**
   * Connects the client to the host
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  connect() {
    this._client.connect(this._port, this._host, err => {
      if (err) {
        return this._onError(err);
      }

      // Run the onConnect event
      return this._onConnect();
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

  onData() {
    return this;
  }

  onClose() {
    return this;
  }

}

module.exports = RTSPStreamer;
