import { TAG_ROOT, TAG_HOST, ELEMNET_TEXT, TAG_TEXT, PLACEMENT } from './constants'
import { setProps } from './utils'
import React from './React'
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
let workInProgressRoot
let nextUnitOfWork

function scheduleRoot(fiber) {  
  workInProgressRoot = fiber
  nextUnitOfWork = fiber
}

function workLoop(deadline) {
  while(nextUnitOfWork && deadline.timeRemaining() > 1) { // 有任务就执行
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork) // 执行完成后返回下一个任务
  }
  if(!nextUnitOfWork && workInProgressRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect
  while(currentFiber) {
    commitWork(currentFiber)
    console.log(currentFiber, 'currentFiber')
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}
function commitWork(currentFiber) {
  if(!currentFiber) return
  let returnFiber = currentFiber.return
  let returnDOM = returnFiber.stateNode
  if(currentFiber.effectTag === PLACEMENT) {
    returnDOM.appendChild(currentFiber.stateNode)
  }
  console.log(returnDOM)
  currentFiber.effectTag = null
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
  beginWork(nextUnitOfWork)
  // 父Fiber.child = 大儿子 .sibling = 二儿子 .sibling = 三儿子
  if(nextUnitOfWork.child) {// 创建完子fiber链表后， 如果有大儿子 
    return nextUnitOfWork.child  // 则返回太子 处理太子的儿子们
  }
  // 每儿子找弟弟 没弟弟找叔叔
  while(nextUnitOfWork) {
    completeUnitOfWork(nextUnitOfWork)
    if(nextUnitOfWork.sibling) {
      return nextUnitOfWork.sibling
    }
    nextUnitOfWork = nextUnitOfWork.return
  }
}
// 在完成时候要收集有副作用的fiber， 组成effect list
/**
 *       A1
 *   /      \
 * B1        B2
 * |  \      / \
 * C1 - C2  D1 - D2
 */
function completeUnitOfWork(currentFiber) { 
  let returnFiber = currentFiber.return 
  if(returnFiber) {
    // 这一段是把自己儿子的effect链 挂到父亲身上
    if(!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if(currentFiber.lastEffect) {
      if(returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }else {
        returnFiber.lastEffect = currentFiber.lastEffect
      }
    }
    // 把自己挂到父亲身上
    const effectTag = currentFiber.effectTag;
    if(effectTag) { // 自己有副作用
      if(returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      }else {
        returnFiber.firstEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}
// 开始工作
function beginWork(fiber) {
  if(fiber.tag === TAG_ROOT) {
    updateHostRoot(fiber)
  }else if(fiber.tag === TAG_TEXT) {
    updateHostText(fiber)
  }else if(fiber.tag === TAG_HOST) {
    updateHost(fiber)
  }
}
function updateHostText(currentfiber) {
  if(!currentfiber.stateNode) {
    currentfiber.stateNode = createDOM(currentfiber)
  }
}
function updateHost(currentFiber) {
  if(!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
  const newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}
function updateHostRoot(currentFiber) {
  let nextChildren = currentFiber.props.children
  // 根据父Fiber和他的所有虚拟dom儿子 构建出子fiber树 只有一层
  reconcileChildren(currentFiber, nextChildren)
}
function createDOM(currentFiber) {
  if(currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.nodeValue)
  }else if(currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
    return stateNode
  }
}
function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps)
}
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
  if(element.type === ELEMNET_TEXT) {
    tag = TAG_TEXT
  }else if(typeof element.type === 'string') {
    tag = TAG_HOST
  }
  return {
    tag,
    type: element.type,
    props: element.props,
    stateNode: null,
    effectTag: PLACEMENT, // 副作用标识 render我们会收集副作用 增加 删除 更新
    nextEffect: null // effectList也是单链表
    // effectlist顺序 和 完成顺序一样 
  }
}

// 当前正在执行的工作单元

scheduleRoot(rootFiber)

requestIdleCallback(workLoop, { timeout: 500 })