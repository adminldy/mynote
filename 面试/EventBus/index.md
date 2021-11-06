## 用过发布订阅模式 比如 vue event bus, node eventemitter3

1. 这种模式， 事件的触发和回调之间是异步的还是同步的

同步

```js
const event = new Event();

event.on(console.log);

event.emit("111"); // 1

console.log("22222"); // 2
```

2. 实现一个简单的 eventEmitter

3. 如果，我想实现设置最大监听数，怎么办
