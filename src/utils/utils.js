/*实现工具方法*/

/*px转化为rem*/
export function px2rem (px) {
  const ratio = 375 / 10
  return px / ratio
}

/*通过px,当前屏幕缩放比例计算真实像素*/
export function realPx (px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}
