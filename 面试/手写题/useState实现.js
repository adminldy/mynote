// 准备一个初始状态数组
let stateArr = []
// 令索引为0
let index = 0
function useState(initState) {
  // 取对应索引的值 第一次没有 所以用initState （初始状态）
  stateArr[index] = stateArr[index] || initState
  // 获取当前索引
  const currentIndex = index
  function dispatch(newState) {
      // 修改事件，改变当前索引的值对应的状态， 用了闭包
    stateArr[currentIndex] = newState
    // 重新渲染 令 index = 0
    render()
  }
  index+=1
  return [stateArr[currentIndex], dispatch]
}

function render() {
  index = 0
  //  在上述代码中有一处重点，在于我们需要在每次 set 之后将索引归零 index = 0。
  //  因为每次 render 结束后，React 都会重新执行该函数。
  ReactDOM.render(<App />, document.getElementById('root'))
}