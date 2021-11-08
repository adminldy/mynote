let p = new Promise((resolve, reject) => {
  resolve(123)
})
console.log(p)

class Person {
  constructor(props) {
    console.log(123)
  }
}

const p1 = new Person()