import './style.css'
import Icon from './images/jqm.png'

function component() {
  let element = document.createElement('div')
  element.innerHTML = 'Hello Webpack'
  element.classList.add('color_red') 
  let img = new Image(200, 200) // 使用图片
  img.src = Icon
  element.appendChild(img)
  return element
}

document.body.appendChild(component())