class Ref {
  constructor(opts, tree) {
    let name = this.name = opts.name
    this.tree = tree
    this.refs = {}
    refs[name] = this
  }
}

// 一整颗树
let refs = {}

//初始化工厂生产实例
let init = function(opts, tree) {
  let name = opts.name
  if(!refs[name]) {
    return new Ref(opts, tree)
  }
  return refs[name]
}

// 销毁实例
let destory = function(name) {
  refs[name] && delete refs[name]
}

// 设置节点
let set = function(name, vm) {
  
}