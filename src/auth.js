const Keycloak = require('keycloak-connect');
const session = require('express-session');

const setupAuth = (app, routes) => {
    var memoryStore = new session.MemoryStore();
    var keycloak = new Keycloak({ store: memoryStore });

    app.use(session({
        secret:'a@s80.7u*asms9!',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    }));
    

    app.use(keycloak.middleware());

    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, keycloak.protect(), function (req, res, next) {
                next();
            });
        }
    });
}

exports.setupAuth = setupAuth