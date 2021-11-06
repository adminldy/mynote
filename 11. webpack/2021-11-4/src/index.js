import './index.css'
let src = require('./images/jqm.png')
console.log(src)
let img = new Image()
img.src = src
document.body.appendChild(img)