module.exports = {
    outputDir:__dirname+'/dist/fridge',//项目npm run build 导出静态文件的地址
    publicPath: process.env.NODE_ENV === 'production'//设置项目publicPath
      ? '/fridge/'
      : '/'
  }