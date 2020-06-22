/*适配*/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}
//去掉烦人的语法检测
module.exports = {
  lintOnSave: false
}
