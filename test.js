

const host = 'freja.hiof.no';
const port = 1935;
const uri = '/rtplive/_definst_/hessdalen03.stream';

const RTSPStreamer = require('./');

const streamer = new RTSPStreamer(host, port, uri);


streamer
.onConnect(() => {
  console.log('Connected...');
})
.onError(err => {
  console.log('Error', err);
})
.onData(chunk => {
  console.log(chunk.toString('utf8'));
})
.onClose(() => {
  console.log('Connection closed');
})
.subscribe();
