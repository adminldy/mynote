class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.el
    this.compile(this.el)
  }

  compile(el) {
    let childNodes = [...el.childNodes]
    childNodes.forEach(node => {
      if(this.isTextNode) {
        this.compileText(node)
      }else if(this.isElementNode) {
        this.compileElement(node)
      }
      if(node?.childNodes?.length) {
        this.compile(node)
      }
    })
  }

  compileText(node) {
    let reg = /\{\{(.+?)\}\}/
    let val = node.textContent
    if(reg.test(val)) {
      let key = RegExp.$1.trim()
      node.textContent = val.replace(reg, this.vm[key])
    }
  }

  compileElement(node) {
    [...node.attributes].forEach(attr => {
      let attrName = attr.name
      if(this.isDirective(attrName)) {
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn(node, key, this.vm[key])
  }

  textUpdater(node, key, value) {
    node.textContent = value
  }
  
  
}