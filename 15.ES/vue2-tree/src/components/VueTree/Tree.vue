<script>
import Item from './Item.vue'
import refs from './refs'
let count = 0
export default {
  name: 'tree',
  // 传递参数
  props: {
    value: Array,
    options: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    let name = `v_tree__` + ++count
    return {
      name
    }
  },
  // 同步实例状态
  created() {
    // TODO: 命名、初始化
    let name = this.name
    // 面向对象注册
    refs.init({
      name
    }, this)
  },
  destroy() {
    // 销毁
    refs.destroy()
  },
  components: {
    Item
  },
  // 视图层
  render(h) {
    return (
      <div class="tree">
        <ul class="vue-tree">
          {
           (this.options || []).map((itemData, index) => {
             return (
               <Item name={this.name} option={itemData} key={`${this.name}${itemData['value']}${index}`}></Item>
             )
           })
          }
        </ul>
      </div>
    )
  }
}
</script>

<style>

</style>