const express = require('express');
//const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const REFERER = 'https://www.pixiv.net/';

app.get('/info', (req, res, next) => {
    res.send('Proxy service for pixiv urls.');
});

app.use(
    '/https://i.pximg.net/',
    createProxyMiddleware({
        target: 'https://i.pximg.net/',
        headers: { referer: REFERER },
        changeOrigin: true,
        pathRewrite: {
            [`^/https://i.pximg.net/`]: ''
        }
    })
);

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
