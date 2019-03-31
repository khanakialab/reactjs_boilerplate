const path = require('path');

module.exports = {
    client: {
        appName: 'member',
        apiHost: 'http://localhost:9003',
        copyright: 'Copyright © 2018 UXM',
        logoUrl: '/images/logo.png'
    },

    server: {
        scripts : [],
        cssHrefs: [],
        headStartCustomCode : '',
        bodyClass: 'member',
        www: {
            port: 9003,
            dirView: path.join(__dirname, '../../../views'),
        }
    }

}