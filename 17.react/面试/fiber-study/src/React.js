import {ELEMNET_TEXT} from './constants'

function createElement(type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        if(typeof child === 'object') {
          return child
        }else {
          return createTextElement(child)
        }
      })
    }
  }
}

function createTextElement(text) {
  return {
    type: ELEMNET_TEXT,
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