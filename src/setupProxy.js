const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bitescout.space', // Backend server URL
      changeOrigin: true,
      pathRewrite: { '^/api': '' },       // Remove /api prefix
    })
  );
};
