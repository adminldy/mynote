const vnode = {
  tag: 'DIV',
  attrs: {
    id: 'app'
  },
  children: [{
    tag: 'SPAN',
    children: [{
      tag: 'A',
      children: []
    }]
  }, {
    tag: 'SPAN',
    children: [{
      tag: 'A',
      children: []
    }, {
      tag: 'B',
      children: []
    }]
  }]
}

function render(vnode) {
  if(typeof vnode === 'number') {
    vnode = String(vnode)
  }
  
  if(typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  const element = document.createElement(vnode)

  if(vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      element.setAttribute(key, vnode.attrs[key])
    })
  }
  
  if(vnode.children) {
    vnode.children.forEach(childNode => element.appendChild(render(childNode)))
  }

  return element
}