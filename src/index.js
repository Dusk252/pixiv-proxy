const express = require('express');
const cors = require('cors');
//const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Configuration
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, () => {
    console.log(`starting Proxy at port ${PORT}`);
});
