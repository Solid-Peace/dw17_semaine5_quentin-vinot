const http = require('http');
const app  = require('./app');

app.set('port', 1616);
const server = http.createServer(app);

server.listen(1616);