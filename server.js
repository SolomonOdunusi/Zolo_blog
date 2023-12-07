const http = require('http');
const fs = require('fs');
const _ = require('lodash')

const server = http.createServer((request, response) => {

    // lodash
    const num = _.random(0, 20);
    console.log(num)
    response.setHeader('content-type', 'text/html')

    let path = './front/';

    switch (request.url) {
        case '/':
            path += 'index.html';
            response.statusCode = 200
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200
            break;
        case '/About':
            response.statusCode = 301
            response.setHeader('Location', '/about');
            break;
        default:
            path += '404.html';
            response.statusCode = 404
            break;
    }


    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            response.end()
        } else {
            response.end(data)
        }

    })
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000')
})