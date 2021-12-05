const add = (a,b,c) => a + b + c

function currying(fn) {
  console.log(fn.length)
}

currying(add)