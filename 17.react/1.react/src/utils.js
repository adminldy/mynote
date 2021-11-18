import { REACT_TEXT } from "./constants";
/**
 * 不管原来是什么样的元素， 都转成对象的形式， 方便后续的DOM-DIFF
 * @param {*} element 
 * @returns 
 */
export function wrapToVdom(element) {
  if(typeof element === 'string' || typeof element === 'number') {
    return {type: REACT_TEXT, props: {content: element}} // 虚拟DOM.props.content 就是此文件内容
  }else{
    return element
  }
}