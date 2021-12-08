import React, {useRef, useEffect, forwardRef} from "react";

// export default function UseRef() {
//   const container = useRef(null)
//   console.log('container', container) // 第一次拿不到
//   useEffect(() => {
//     // console.log('container', container) // current 属性引用着虚拟DOM节点
//     // container.current.addEventListener('click', () => alert('ref'))
//     if(container.current) {
//       console.log(`模拟ComponentDidUpdate, 即除了初始化, 之后的更新走这里`)
//     }else{
//       container.current = true
//     }
//   })
//   return (<button>Ref 容器</button>)
// }

export default class Parent extends React.component {
  input = createRef()
  onFocus = () => {
    this.input.current.focus()
  }
  render() {
    return <>
      <Sub ref={this.input} />
      <button onClick={this.onFocus}>点击聚焦</button>
    </>
  }
}

const Sub = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})


