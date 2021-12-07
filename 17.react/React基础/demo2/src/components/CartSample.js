import { Component } from "react"
export default class CartSample extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      // 定义商品
      goods: [{id: 1, text: '深入浅出React'}, {id: 2, text: '算法导论'}],
      // 定义文本
      text: '',
      // 定义购物车列表
      cart: []
    }
  }
  // 文本改变
  textChange = e => {
    this.setState({ text: e.target.value })
  }
  // 添加商品
  addGood = () => {
    this.setState(prevState => {
      return {
        goods: [...prevState.goods, {
          id: prevState.goods.length + 1,
          text: prevState.text
        }]
      }
    })
  }
  // 加购函数
  addToCart = good => {
    const newCart = [...this.state.cart]
    // 看看购物车原先有没有这个商品
    const item = newCart.find(c => c.id === good.id)
    if(item) {
      // 有就让他的数量+1
      item.count = item.count + 1
    }else {
      // 没有就给这个商品加一个数量的属性 值为1
      newCart.push({...good, count: 1})
    }
    // 更新
    this.setState({cart: newCart})
  }

  // 处理数量更新
  add = good => {
    const newCart = [...this.state.cart]
    const item = newCart.find(c => c.id === good.id)
    item.count = item.count + 1
    this.setState({ cart: newCart })
  }
  
  minus = good => {
    const newCart = [...this.state.cart]
    const item = newCart.find(c => c.id === good.id)
    item.count = item.count - 1
    if(item.count < 0) {
      item.count = 0
    }
    this.setState({ cart: newCart })
  }

  render() {
    return (
      <div>
        {this.props.title && <h1>{this.props.title}</h1>}
        <div>
          <input type="text"
             value={this.state.text}
             onChange={this.textChange}
          />
          <button onClick={this.addGood}>添加商品</button>
        </div>
        <ul>
          {
            this.state.goods.map(good => (
              <li key={good.id}>
                {good.text}
                <button onClick={() => this.addToCart(good)}>添加至购物车</button>
              </li>
            ))
          }
        </ul>
        {/* 购物车 */}
        <Cart data={this.state.cart} minus={this.minus} add={this.add} />
      </div>
    )
  }
}

function Cart({data, minus, add}) {
  return (
    <table>
      <tbody>
        {data.map(d => (
          <tr key={d.id}>
            <td>{d.text}</td>
            <td>
              <button onClick={() => minus(d)}>-</button>
              <span>{d.count}</span>
              <button onClick={() => add(d)}>+</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}