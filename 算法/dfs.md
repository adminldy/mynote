#### 子序列

```js
function findSubSet(input) {
  let res = []
  let path = []
  function dfs(input, index) {
    if(path.length === input.length) {
      res.push(path.slice())
    }
    for(let i = index;i < input.length;i++) {
      path.push(input[i])
      dfs(input, index + 1)
      path.pop()
    }
  }
  dfs(input, 0)
  return res
}

```