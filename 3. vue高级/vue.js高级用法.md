#### 1. transtion

概述: Vue 在插入、更新或者移出DOM时，提供多种不同方式的应用过渡效果

用法:
```js
<transition name="fade">
  <p v-if="show">Hello</p>
</transition>
```

过渡类名

1. v-enter: 定义进入过渡的开始状态, 在元素被插入之前生效

2. v-enter-active: 定义进入过渡生效的状态, 在整个进入过渡的阶段中应用

3. v-enter-to: 定义进入过渡的结束状态

4. v-leave: 定义离开过渡的开始状态

5. v-leave-active: 定义离开过渡生效时的状态。

6. v-leave-to: 定义离开过渡的结束状态

#### 2. slot

父元素可以通过指定模板替换子元素的插槽

用法:

```vue
1. 具名插槽
// 子元素:
 <slot name="head">
  <div>默认模板</div>
 </slot>
// 父元素:
  <template v-slot:head>
    <router-link to="about">/about</router-link>
  </template>
2. 作用域插槽
// 子元素:
  <slot name="middle" :count="count">
    
  </slot>
// 父元素:
  <template v-slot:middle="slotScopes">
    {{ slotScopes.count }}
  </template>
```

#### 3. Mixin

本质是一个js对象， 包含组件中任意功能选项， 如data、 components、 methods、 created、 computed等等

我们只需要将公用的功能以对象的方式传入mixins选项中，当组件使用mixins对象时所有mixins对象的选项都将被混入该组件本身的选项中来

在Vue中我们可以 局部混入和全局混入， 全局混入常用于编写插件

Tips:

* 当组件存在与mixin对象相同的数据的时候，进行递归合并的时候组件的数据会覆盖mixin的数据
* 如果相同数据为生命周期钩子的时候， 会合并成一个数组， 先执行mixin的钩子， 再执行组件的钩子

1. mixin 使用

在mixins indexts里面 定义混入的对象

```js
export class CommonMixin extends Vue {
    mixinName: string = 'lubai';
    enterTime: number = 0;

    copyText(msg: string) {
        this.$copyText(msg).then(() => {
            alert('复制成功');
        });
    }

    mounted() {
        console.log(`Mixin - Mounted - ${this.mixinName}`);
        this.enterTime = Date.now();
    }

    beforeDestroy() {
        console.log(`页面浏览 ${Date.now() - this.enterTime}ms`);
    }
}

```

然后在组件中使用即可

2. mixin 实现原理

(parent): mixin对象 (child): 使用mixin的组件

其实主要的逻辑就是合并mixin和当前组件的各种数据, 细分为四种策略：

* 替换型策略 - 同名的props、methods、inject、computed会被后来者代替

```js
strats.props = 
strats.methods =
strats.inject =
strats.computed = function(
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
) {
  if(!parentVal) return childVal
  const ret = Object.create(null)
  extend(ret, parentVal) // 把parentVal合并到ret中
  if(childVal) extend(ret, childVal) // 如果有childVal进行替换
  return ret
}
```

* 合并型策略 - data, 通过set方法进行合并和重新赋值

```js
strats.data = function(parentVal, childVal, vm) { // parentVal 混入对象函数 childVal 组件data对象函数
  return mergeDataOrFn(parentVal, childVal, vm)
}

function mergeDataOrFn(parentVal, childVal, vm) {
  return function mergedInstanceDataFn() {
    let childData = childVal.call(vm, vm)
    let parentData = parentVal.call(vm, vm)
    if(childData) {
      return mergeData(childData, parentData)
    }else {
      return childData
    }
  }
}

function mergeData(to, from) { // childData, parentData
  if(!from) return to
  let key, toVal, fromVal
  let keys = Object.keys(from) // 获取所有parentData的key值
  for(let i = 0;i < keys.length;i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    // 如果组件没有混入的key值 那么set重新赋值
    if(!to.hasOwnProperty(key)) {
      set(to, key, fromVal)
    }
    // 如果toVal与fromVal都是对象， 那么继续合并这两个对象
    else if (typeof toVal === 'object' && typeof fromVal === 'object'){
      mergeData(toVal, fromVal)
    }
  }
  return to
}
```

* 队列型策略 - 生命周期函数和watch， 原理是将函数存入一个数组， 然后正序遍历执行

```js
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  return childVal 
  ? parentVal 
  ? parentVal.concat(childVal)
  : Array.isArray(childVal)
  ? childVal : [childVal]
  : parentVal
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
```

* 叠加型策略 - component、directives、filters，通过原型链进行层层的叠加

```js
strats.components=
strats.directives=

strats.filters = function mergeAssets(
  parentVal, childVal, vm, key
) {
  let res = Object.create(parentVal)
  if(childVal) {
    for(let key in childVal){
      res[key] = childVal[key]
    }
  }
  return res
}
```

# 插件 plugins

使用方法: Vue.use(plugin)

实现：

步骤: 
     1. 获取已安装插件的数组
     2. 如果插件安装了, 那么直接return this
     3. 把arguments转为伪数组
     4. 在args这个真数组中第一个位置插入this(Vue)
     5. 判断plugin是否是函数， 如果是直接apply调用， 不是则调用其install方法 
     6. return this
```js
export function initUse(plugin) {
  Vue.use = function(plugin) {
    if(!this.installedPlugins) {
      this.installedPlugins = []
    }
    let installedPlugins = this.installedPlugins // 获取已经安装的插件
    if(installedPlugins.indexOf(plugin) > -1) {
      return this // 如果已安装插件数组中存在了plugin 就直接return
    } 
    const args = Array.from(arguments) // 把参数的伪数组转为真数组
    args.unshift(this) // 把Vue插入args的第一个位置
    if(typeof plugin === 'function') {
        plugin.apply(null, args)
    } else {
        plugin.install.apply(plugin, args) 
    }
    return this
  }
}
```