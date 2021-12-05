import {FIBER_ROOT} from './constants'
let workInprogressRoot = null
let nextUnitOfWork = null
function render(vDom, container) {
  let rootFiber = {
    tag: FIBER_ROOT, 
    dom: container,
    props: { children: [vDom]}
  }
  scheduleRoot(rootFiber)
}

function scheduleRoot(fiber) {
  workInprogressRoot = fiber
  nextUnitOfWork = fiber
}

function workLoop(deadline) {
  while(nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  requestIdleCallback(workLoop, { timeout: 500 })
}

function performUnitOfWork(fiber) {
  beginWork(fiber)
}

function beginWork(fiber) {
  
}

requestIdleCallback(workLoop, { timeout: 500 }) 

const ReactDOM = {
  render
}

export default ReactDOM