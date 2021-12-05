export function setProps(dom, oldProps, newProps) {
  Object.keys(newProps).filter(key => key !== 'children').forEach(item => {
    setProp(dom, item, newProps[item])
  })
}

function setProp(dom, key, value) {
  if(/^on/.test(key)) {
    dom[key.toLowerCase()] = value
  }else if(key === 'style') {
    for(let styleKey in value) {
      dom[styleKey] = value[styleKey]
    }
  }else {
    dom[key] = value
  }
}
