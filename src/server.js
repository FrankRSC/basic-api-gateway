const express = require('express')
const cors = require('cors');

const { ROUTES } = require('./routes/routes')

const { setupLogging } = require('./logging');
const { setupProxies } = require('./proxy');
const { setupAuth } = require('./auth');
const { setupRateLimit } = require("./ratelimit");
const { setupCreditCheck } = require('./creditCheck');

const app = express()
const port = 3000;

app.use(cors());

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupCreditCheck(app, ROUTES);
setupProxies(app, ROUTES);

app.get('/api/dynamic-route', (req, res) => {
  try {
    res.send("No query")
  } catch (error) {
    res.status(500).send(error)
  }
});

app.get('/api/dynamic-route/ATR', (req, res) => {
  try {
    res.send("ATR")
  } catch (error) {
    res.status(500).send(error)
  }
});

app.get('/api/dynamic-route/:id', (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    res.send("user: " + id)
  } catch (error) {
    res.status(500).send(error)
  }
});



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})