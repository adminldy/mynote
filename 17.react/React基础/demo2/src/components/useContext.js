import React, { useState, createContext, useContext } from "react";

const Context = createContext()

export default function Parent() {
  const [count, changeCount] = useState(0)
  const store = {
    count, changeCount
  }
  return (
    <Context.Provider value={store}>
      <button onClick={() => changeCount(count + 1)}>+1 {count}</button>
      <Sub1 />
    </Context.Provider>
  )
}

function Sub1() {
  const ctx = useContext(Context)
  return <>
    <button onClick={() => ctx.changeCount(c => c + 1)}>
      Sub1 能通过 Context 访问数据源 { ctx.count }
    </button>
    <Sub2 />
  </>
}

function Sub2() {
  const ctx = useContext(Context)
  return <span>后代组件， 拿到的 Parent数据 { ctx.count }</span>
}