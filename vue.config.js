// vue.config.js 用于配置 Vue CLI 项目的构建和开发服务器的一些设置。
module.exports = {
  publicPath: "/crs/", // 项目的基本路径，即项目在部署时的URL路径前缀
  lintOnSave: false,
  // 开发服务器配置
  devServer: {
    host: "127.0.0.1", // 开发服务器的主机地址，即本地回环地址
    port: 3010, // 开发服务器的端口号
    open: false,
    // proxy: {
    //   '^/api': {
    //     target: 'https://erp-newdev.fuchuang.com',
    //     headers: {
    //       host: 'erp-newdev.fuchuang.com'
    //     }
    //   }
    // }
  },
}
