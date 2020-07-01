/*function mock (app, url, data) {
  app.get(url, (request, response) => {
    response.json(data)
  })
}
const homeData = require('./src/mock/bookHome')
const shelfData = require('./src/mock/bookShelf')
const listData = require('./src/mock/bookList')
const flatListData = require('./src/mock/bookFlatList')*/

/*适配*/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  /*    devServer: {
        before(app) {
          mock(app, '/book/home', homeData)
          mock(app, '/book/shelf', shelfData)
          mock(app, '/book/list', listData)
          mock(app, '/book/flat-list', flatListData)
        }
      }*/
}
//去掉烦人的语法检测
module.exports = {
  lintOnSave: false
}

