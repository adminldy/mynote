/**
 * 把虚拟DOM转成真实DOM插入到容器中
 * @param {} vdom 
 * @param {*} container 
 */
import {REACT_TEXT} from './constants'

function render(vdom, container) {
  let newDOM = createDOM(vdom)
  container.append(newDOM)
}
/**
 * 把虚拟DOM转成真实DOM
 * @param {*} vdom  虚拟DOM
 */ 
function createDOM(vdom) {
  let {type, props} = vdom
  let dom // 获取真实DOM元素
  if(type === REACT_TEXT) { // 如果是一个文本元素，就创建一个文本节点
    dom = document.createTextNode(props.content)
  }else {
    dom = document.createElement(type) // 原生DOM类型
  }
  if(props) {
    updateProps(dom, {}, props) // 根据虚拟DOM属性更新真实DOM属性
    if(typeof props.children === 'object' && props.children.type) { // 它是个对象 只有一个儿子
      render(props.children, dom)
    }else if(Array.isArray(props.children)){ // 如果是一个数组
      reconcileChildren(props.children, dom)
    }
  }
  // 让虚拟DOM的dom属性指向它的真实DOM
  // vdom.dom = dom
  return dom
}

function reconcileChildren(childrenVdom, parentDOM) {
  for(let i = 0;i < childrenVdom.length;i++) {
    let childVdom = childrenVdom[i]
    render(childVdom, parentDOM)
  }
}
function updateProps(dom, oldProps, newProps) {
  for(let key in newProps) {
    if(key === 'children') {continue} // 后面会单独处理children
    if(key === 'style') {
      let styleObj = newProps[key]
      for(let attr in styleObj) {
        dom.style[attr] = styleObj[attr]
      }
    }else {
      dom[key] = newProps[key]
    }
  }
}

const ReactDOM = {
  render
}

export default ReactDOM