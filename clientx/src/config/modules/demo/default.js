const path = require('path');

module.exports = {
    shared: {
        ssr: true
    },
    client: {
        appName: 'demo',
        apiHost: 'http://localhost:7002',
    },

    server: {
        scripts : [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js'
        ],
        cssHrefs: [
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
        ],
        headStartCustomCode : '',
        www: {
            port: 7002,
            dirView: path.join(__dirname, '../../../views'),
        }
    }
}