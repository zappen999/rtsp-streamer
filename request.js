/**
 * Class for constructing a request
 */

class Request {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}  method Method to use
   * @param  {string}  host   Host to request
   * @param  {integer} port   Port to request
   * @param  {string}  uri    URI to request
   * @param  {integer} cseq   Sequence number, defaults to 0
   * @return {Request}        Self
   */
  constructor(method, host, port, uri, cseq = 0) {
    if (!this._validateMethod(method)) {
      throw new Error('Invalid RTSP method');
    }

    this._method = method;
    this._host = host;
    this._port = port;
    this._uri = uri;
    this._cseq = cseq;

    // Additional headers
    this._headers = {};
  }

  /**
   * Validates methods allowed
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}  method Method to validate
   * @return {boolean}        True of method is valid, false if not
   */
  _validateMethod(method) {
    const valid = [
      'DESCRIBE',
      'ANNOUNCE',
      'GET_PARAMETER',
      'OPTIONS',
      'PAUSE',
      'PLAY',
      'RECORD',
      'REDIRECT',
      'SETUP',
      'SET_PARAMETER',
      'TEARDOWN',
    ].indexOf(method);

    return valid !== -1;
  }

  /**
   * Sets an additional header
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}  key   Header name (key)
   * @param  {string}  value Value of the header (value)
   * @return {Request}       Self
   */
  header(key, value) {
    if (key.indexOf(' ') !== -1) {
      throw new Error('Header keys cannot have spaces in them');
    }

    this._headers[key] = value;
    return this;
  }

  /**
   * Gets this request as a raw text string
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {string} The request as a string
   */
  getRaw() {
    return `${this._method} rtsp://${this._host}:${this._port}${sthis._uri} RTSP/1.0\r\n` + // eslint-disable-line
           `CSeq: ${this._cseq}\r\n` +
           `\r\n\r\n`;
  }
}

module.exports = Request;
