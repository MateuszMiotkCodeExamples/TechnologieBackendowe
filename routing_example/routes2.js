const main = require('./handlers/main');

module.exports = function(app) {
    app.get('/', main.home);
    app.get('/about', main.about);
};
