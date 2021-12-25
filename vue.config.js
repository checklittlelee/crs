module.exports = {
    publicPath: '/crs/',
    devServer: {
        host: '127.0.0.1',
        port: 3002,
        open: true,
        proxy: {
          '^/api': {
            target: 'https://erp-newdev.fuchuang.com',
            headers: {
              host: 'erp-newdev.fuchuang.com'
            }
          }
        }
    },
}
