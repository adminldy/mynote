##### [Vue]
```js
import {initMixin} from './init'

// Vue 构造函数
function Vue(options) {
  // 调用 Vue.prototype._init方法， 该方法是在 initMixin 中定义的
  this._init(options)
}

// 定义Vue.prototype._init 方法
initMixin(Vue)

export default Vue
```
#### [Vue.prototype._init]
```js
export function initMixin(Vue: Class<Component>) {
  // 负责Vue的初始化过程
  Vue.prototype._init = function(options?: Object) {
    // Vue实例
    const vm: Component = this
    // 每个Vue实例都有一个_uid, 并且是依次递增的
    vm._uid = uid++
    
    vm._isVue = true
    // 处理组件配置项
    if(options && options._isComponent) {
      /**
      * 每个子组件初始化时走这里， 这里做了一些优化
      * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中， 以提高代码的执行效率
      */
      initInternalComponent(vm, options)
    }else {
      /**
      * 初始化根组件时走这里， 合并 Vue的全局配置到根组件的局部配置，比如 Vue.component 注册的全局组件会合并到根实例的components选项中
      * 至于每个子组件的选项合并则发生在两个地方
      */
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    
    if(process.env.NODE_ENV !== "production")  {
      // 设置代理， 将 vm 实例上的属性代理到 vm.renderProxy
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
  
    vm._selef = vm
    // 初始化组件实例关系属性，比如$parent、 $children、 $root、 $refs等
    initLifecycle(vm)
    /**
    * 初始化自定义事件， 这里需要注意一点， 所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者不是父组件
    * 而是子组件本身， 也就是说事件的派发和监听者都是子组件本身 和父组件无关
    */
    initEvents(vm)
    // 解析组件的插槽信息， 得到vm.$slot， 处理渲染函数，得到vm.$createElment 方法， 即 h 函数
    initRender(vm)
    // 调用 beforeCreate 钩子函数
    callHook(vm, 'beforeCreate')
    // 初始化组件的inject配置项， 得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理， 并代理每个key 到 vm实例
    initInjections(vm) // resolve injections before data/props
    // 数据响应式的重点， 处理 props、 methods、 data、 computed、 watch
    initState(vm)
    // 解析组件配置项上的provide对象，将其挂载到 vm._provided 属性上
    initProvide(vm) // resolve provide after data/props
    // 调用 created 钩子函数
    callHook(vm, 'created')
    // 如果发现配置项上有el选项， 则自动调用 $mount 方法， 也就是说有了 el选项， 就不需要手动调用 $mount, 反之，没有el 则必须手动调用 $mount
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```