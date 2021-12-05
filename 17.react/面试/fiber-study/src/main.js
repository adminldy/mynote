import { TAG_ROOT, TAG_HOST, ELEMNET_TEXT, TAG_TEXT } from './constants'

let style = {color: 'green', border: '1px solid red', margin: '5px'}
// let virtualDOM = (
//   <div style={style}>
//      A
//     <div style={style}>B1</div>
//     <div style={style}>B2</div>
//   </div>
// )

let element = (
React.createElement("div", {
  style: style
}, "A",React.createElement("div", {
  style: style
}, "B1"),React.createElement("div", {
  style: style
}, "B2"))
)

// 开始我们的工作循环
// 表示一个工作单元， 表示正在处理中的fiber
let workInProgress
let nextUnitOfWork

function scheduleRoot(fiber) {  
  workInProgress = fiber
  nextUnitOfWork = fiber
}

function workLoop(deadline) {
  while(nextUnitOfWork && deadline.timeRemaining() > 1) { // 有任务就执行
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork) // 执行完成后返回下一个任务
  }
  requestIdleCallback(workLoop)
}
let root = document.getElementById('root')
// Fiber是一个普通的js对象
let rootFiber = {
  tag: TAG_ROOT, // Fiber的类型
  stateNode: root, // Fiber对应的真实DOM节点
  props: {
    children: [element]
  }
}
// 执行任务 返回下一个fiber
function performUnitOfWork(nextUnitOfWork) {
  console.log(nextUnitOfWork)
  beginWork(nextUnitOfWork)
  if(nextUnitOfWork.child) {// 创建完子fiber链表后， 如果有大儿子 
    return nextUnitOfWork.child  // 则返回太子 处理太子的儿子们
  }
  // 如果没有儿子， 自己就结束了
  while(nextUnitOfWork) {
    completeUnitOfWork()
    if(nextUnitOfWork.sibling) {
      return nextUnitOfWork.sibling
    }
    nextUnitOfWork = nextUnitOfWork.return
  }
}
// 开始工作
function beginWork(fiber) {
  let nextChildren = fiber.props.children
  // 根据父Fiber和他的所有虚拟dom儿子 构建出子fiber树 只有一层
  reconcileChildren(fiber, nextChildren)
}
// 完成工作
// 调和子节点 形成fiber树
function reconcileChildren(returnFiber, nextChildren) {
  let prevSibling
  for(let i = 0;i < nextChildren.length;i++) {
    let newFiber = createFiber(nextChildren[i])
    newFiber.return = returnFiber
    if(i === 0) {
      returnFiber.child = newFiber
    }else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  }
}

function createFiber(element) {
  let tag
  if(typeof element.type === ELEMNET_TEXT) {
    tag = TAG_TEXT
  }else if(typeof element.type === 'string') {
    tag = TAG_HOST
  }
  return {
    tag,
    type: element.type,
    props: element.props
  }
}

// 当前正在执行的工作单元

scheduleRoot(rootFiber)

workLoop()