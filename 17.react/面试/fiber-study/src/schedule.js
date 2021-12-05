import {ELEMNET_TEXT, TAG_ROOT, TAG_TEXT, TAG_HOST, PLACEMENT} from './constants'
import { setProps } from './utils'

let workInProgressRoot = null
let nextUnitOfWork = null

export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber
  nextUnitOfWork = workInProgressRoot
}

function workLoop(deadline) {
  while(nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  
  requestIdleCallback(workLoop, { timeout: 500 })
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if(currentFiber.child) {
    return currentFiber.child
  }
  while(currentFiber) {
    if(currentFiber.sibling) {
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return
  }
}

function beginWork(currentFiber) {
  if(currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  }else if(currentFiber.tag === TAG_TEXT){
    updateText(currentFiber)
  }else if(currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  }
}

function updateHost(currentFiber) {
  if(!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
  let children = currentFiber.props.children
  reconcileChildren(currentFiber, children)
}

function updateText(currentFiber) {
  if(!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}

function updateHostRoot(currentFiber) {
  let children = currentFiber.props.children
  reconcileChildren(currentFiber, children)
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



function reconcileChildren(returnFiber, children) {
  let prevSibling
  for(let i = 0;i < children.length;i++) {
    let newFiber = createFiber(returnFiber, children[i])
    if(newFiber) {
      if(i === 0) {
        returnFiber.child = newFiber
      }else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    }
  }
}

function createFiber(returnFiber, child) {
  let tag
  if(child.type === ELEMNET_TEXT) { // 处理文本类型
    tag = TAG_TEXT
  }else if(typeof child.type === 'string') {
    tag = TAG_HOST
  }
  return {
    tag,
    type: child.type,
    props: child.props,
    stateNode: null,
    return: returnFiber,
    effectTag: PLACEMENT
  }
}

requestIdleCallback(workLoop, { timeout: 500 })