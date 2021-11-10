function a() {
  function b() {
    let _this = this
    let c = () => {
      let d = () => {
        console.log(this)
      }
    }
  }
}

// 从自己这个路径向上找， 找一个不是箭头函数的函数
// js函数作用域 一个全局作用域