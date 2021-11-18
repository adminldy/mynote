import { wrapToVdom } from "./utils"
import {REACT_TEXT} from './constants'
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
     children: children.map(child => {
       return typeof child === 'object' ? child : createTextDom(child)
     }) 
    }
  }
}

function createTextDom(text) {
  return {
    type: REACT_TEXT, 
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const React = {
  createElement
}

export default React