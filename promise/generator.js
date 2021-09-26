function longTimeFn(time) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve(time);
      }, time);
  })
};
function* test() {
  let data = yield longTimeFn(1000);
  console.log(data);
  data = yield longTimeFn(2000);
  console.log(data);
  return data;
}
const iterator = test() //迭代器
const r1 = iterator.next()
console.log(r1)
const r2 = iterator.next()
console.log(r2)
