import {reactive, onMounted, onBeforeUnmount} from 'vue'
export default function() {
  let point = reactive({
    x: 0,
    y: 0
  })
  // 实现鼠标点击获取坐标方法
  function savePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
    console.log(event.pageX, event.pageY)
  }
  // 实现鼠标点击获取坐标的方法
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })
  return point
}