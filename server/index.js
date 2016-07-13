/**
 * Created by cleuzinger on 13.07.2016.
 */
import http from 'http';

http.createServer((req, res) => {
    res.writeHead('200', {'Content-Type' : 'text/plain'});
    res.end('Hello World\n');
}).listen(3333, '127.0.0.1');

console.log('Server is running at port http://127.0.0.1:3333/');