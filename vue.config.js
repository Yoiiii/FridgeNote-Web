module.exports = {
  outputDir: __dirname + '/dist',//项目npm run build 导出静态文件的地址
  publicPath: process.env.NODE_ENV === 'production'//设置项目publicPath
    ? '/fridge/'
    : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '冰箱笔记'
        return args
      })
  }
}