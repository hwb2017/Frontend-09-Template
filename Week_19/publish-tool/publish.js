const http = require('http')

const archiver = require('archiver')

let request = http.request({
    hostname: 'localhost',
    port: 8080,
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, response => {
    console.log(response);
});

const archive = archiver('zip', {
    zlib: { level: 9 }
});
archive.directory('./sample', false);

archive.finalize();

archive.pipe(request);