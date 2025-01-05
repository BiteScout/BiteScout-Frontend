import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bitescout.space',
      changeOrigin: true,
    })
  );
}
