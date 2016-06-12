/**
 * Class for handling RTSP responses from a server
 */

class Response {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} data Raw RTSP response data
   * @return {Response}    Self
   */
  constructor(data) {
    this._data = data;

    this._version = null;
    this._statusCode = null;
    this._reasonPhrase = null;
  }

  /**
   * Parses the response
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Response} Self
   */
  parse() {
    const lines = this._data.trim().split('\n');

    // First line is status-line, parse and remove the line
    const statusLine = this._parseStatusLine(lines[0]);

    this._version = statusLine.version;
    this._statusCode = statusLine.statusCode;
    this._reasonPhrase = statusLine.reasonPhrase;
    lines.splice(0, 1);

    // Loop through
    for (const line of lines) {
      console.log(line);
    }

    return this;
  }

  /**
   * Parses status line
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} line Status line string from response
   * @return {object}      Object with the components of the status string
   */
  _parseStatusLine(line) {
    const params = line.trim().split(' ');
    const reasonPhrase = params.filter((param, i) => {
      return i < 2 ? false : param;
    }).join(' ');

    return {
      version: params[0],
      statusCode: parseInt(params[1], 10),
      reasonPhrase: reasonPhrase,
    };
  }

  /**
   * Returns the response version (RTSP version)
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {string} The RTSP version string
   */
  getVersion() {
    return this._version;
  }

  /**
   * Returns the response status code
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {integer} Status code
   */
  getStatusCode() {
    return this._statusCode;
  }

  /**
   * Returns the response reason phrase
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {string} Reason phrase
   */
  getReasonPhrase() {
    return this._reasonPhrase;
  }
}

module.exports = Response;
