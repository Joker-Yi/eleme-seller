const path = require('path')
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve(dir){
  //项目目录拼上 要调用的目录
  return path.join(__dirname,dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer:{
    before(app){
      app.get('/api/seller',function (req,res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods',function (req,res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings',function (req,res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  //配置路径别名,方便操作书写
  chainWebpack(config){
    config.resolve.alias
      .set('components',resolve('src/components'))
      .set('common',resolve('src/common'))
      .set('api',resolve('src/api'))
  }
}
