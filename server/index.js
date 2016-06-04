const port = process.env.PORT || 3000;
var app;

if(process.argv.indexOf('--dev') > -1) {
    app = require('./webpack-dev-server');
} else {
    app = require('express')();
}

app.use('/api', require('./api'));

app.listen(port, function(error) {
    /* eslint-disable no-console */
    if (error) {
        console.error(error);
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
