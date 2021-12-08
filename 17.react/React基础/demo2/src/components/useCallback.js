import React, { useState, useCallback, memo } from "react";

const UseCallbackSub = memo(({value, onChange}) => {
  console.log(`子元素发生了渲染 value:`, value)
  return <input type="number" onChange={onChange} value={value} />
}, (prev, next) => prev.value === next.value)

export default function UseCallback(){
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const onClick = () => {
    setCount(count + 1)
  }
  const onChange = useCallback(e => {
    setValue(e.target.value)
    console.log(count)
  }, [count])
  return <>
    <button onClick={onClick}>count 发生变化{ count }</button>
    <UseCallbackSub onChange={onChange} value={value}></UseCallbackSub>
  </>
}

// 思路: 把每次阶乘缓存起来

// const arr = []

// function useCallback(count) {
//   if(arr[count]) {
//     return arr[count]
//   }
//   arr[count] = Fact(count) // 阶乘
//   return arr[count]
// }