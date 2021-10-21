#### 一、 状态管理

1. 状态管理的方式

中心化:

类似vuex redux这种集中管理数据 每个组件都可以共享数据

去中心化:

每个组件都是单独的数据

2. vuex原理

思路 

1. 根源， 存在哪
2. 对外暴露api, 使用方式
3. 和底层的视图框架结合起来， 状态变化了 -> 视图要re-reander

```ts
const store = {
  name: '',
  state: {},
  actions: {
  },
  mutations: {
    
  }
}
```