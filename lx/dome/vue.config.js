
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3002',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}