import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://67.207.86.85:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
}
