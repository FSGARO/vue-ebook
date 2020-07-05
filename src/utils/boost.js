/*push不重复*/
Array.prototype.pushWithoutDuplicate = function () {
  /*arguments参数列表*/
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (this.indexOf(arg) === -1) {
      this.push(arg)
    }
  }
}
