Vue3 的数据响应与劫持是基于现代浏览器所支持的 Proxy 代理的

```js
const initData = { value: 1 };

const proxy = newProxy(initData, {
  get(target, key) {
    // track
    return target[key];
  },
  set(target, key, value) {
    // trigger
    target[key] = value;
  },
});
```

几个关键函数

track: 收集依赖
trigger: 触发副作用函数
effect: 副作用函数
reactive: 基于普通对象创建代理对象方法

我们先来看下普通组件的写法

```js
import { ref, reactive, com}

effect(() => {

})

effect 里面的函数如果包含响应式的值， 响应式值变换就会调用
```
