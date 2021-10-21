#### 子序列

```js
function findSubSet(input, index, solution) {
  // 代表走到了最后的位置
  if(index === input.length) {
    res.push(solution.slice())
    return
  }
  // +a
  solution.push(input[index])
  findSubSet(input, index + 1, solution)
  solution.pop()
  // 不+a
  findSubSet(input, index + 1, solution)
}

findSubSet(['a', 'b', 'c'], 0, arr)

```
#### 有效括号()

```ts
function validBracket(num) {
  let res = []
  let path = []
  function dfs(n, l, r) {
    if(l + r === 2 * n) {
      res.push(path.slice())
      return
    }
    if(l < n) {
      path.push('(')
      dfs(n, l + 1, r, path)
      path.pop()
    }
   
    if(r < l) {
      path.push(')')
      dfs(n, l, r + 1, path)
      path.pop()
    }
  }
  dfs(num, 0, 0)
  return res
}

```

```ts

```