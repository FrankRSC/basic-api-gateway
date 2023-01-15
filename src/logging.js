const morgan = require("morgan");

const setupLogging = (app) => {
    app.use(morgan('dev'));
}

exports.setupLogging = setupLogging