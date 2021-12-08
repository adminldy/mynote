import React, { useState, useEffect } from 'react'

function UseState() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(`mount + update: ${count}`)
  })
  useEffect(() => {
    
  })
  return (
    <button onClick={() => setCount(c => c + 1)}>+1</button>
  )
}

// 父组件state变化 子组件也会重新渲染
export default function Parent() {
  const [perCount, setPerCount] = useState(0)
  useEffect(() => {
    console.log(`parent --- mount --- update: ${perCount}`)
  })
  return (
    <>
      <UseState></UseState>
      <button onClick={() => setPerCount(c => c + 1)}>父组件点击{perCount}</button>
    </>
  )
}

// useState实现

// let arr = []
// let index = 0

// function myUseState(initVal) {
//   let stateVal = arr[index] || initVal
//   let curIndex = index
//   function disPatch(newVal) {
//     arr[curIndex] = newVal
//     render()
//   }
//   index++
//   return [stateVal, disPatch]
// }