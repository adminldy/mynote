<template>
  <div class="home">
    <h1>当前姓名： {{name}}</h1>
    <h1>当前年龄:  {{age}}</h1>
    <h1>当前薪水： {{salary}}K</h1>
    <button @click="names.name+='!'">点击加!</button>
    <button @click="names.ages++">点击加1</button>
    <button @click="names.job.salary++">点击薪水加1</button>
  </div>
</template>

<script>
import useMousePosition from '../hooks/index'
import {reactive, toRef} from 'vue'
export default {
  name: '',
  setup() {
    // let point = useMousePosition()
    const names = reactive({
      name: '老谭',
      age: 23,
      job: {
        salary: 10
      }
    })
    return {
      name: toRef(names, 'name'),
      age: toRef(names, 'age'),
      salary: toRef(names.job, 'salary')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
