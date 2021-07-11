const http = require('http')
// const fs = require('fs')
const unzipper = require('unzipper')

http.createServer(function(req, res) {
    // let outFile = fs.createWriteStream('../public/tmp.zip');
    // req.pipe(outFile);
    req.pipe(unzipper.Extract({ path: '../public'}))
}).listen(8080)