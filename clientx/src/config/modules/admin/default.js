const path = require('path');

module.exports = {
    shared: {
        ssr: true
    },
    client: {
        appName: 'sa',
        apiHost: 'http://localhost:9002'
    },

    server: {
        scripts : [],
        cssHrefs: [],
        headStartCustomCode : '',
        www: {
            port: 9002,
            dirView: path.join(__dirname, '../../../views'),
        }
    }

}