const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app, routes) => {
  try {
    routes.forEach(r => {
      app.use(r.url, createProxyMiddleware(r.proxy));
    })
  } catch (error) {
    console.log(error)
  }
}

exports.setupProxies = setupProxies