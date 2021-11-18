<script>
import refs from './refs'
let count = 0
export default {
  name: 'Item',
  data() {
    let cid = this.cid || (`item` + ++count)
    return {
      level: (this.$parent.level || 0) + 1, // 当前节点的层级
      indent: 1, // 缩进单位
      expand: false,
      checked: false,
      cid
    }
  },
  props: {
    name: String,
    option: Object
  },
  computed: {
    // ===是否有子节点
    isFolder() {
      return !!this.option['children']
    }
  },
  mounted() {
    // 初始化
    let name = this.name
    // 创建节点
    refs.set(name, this)
  },
  methods: {
    handleClickExpand() {
      this.expand = !this.expand
    },
    handleClickItem() {
      this.checked = !this.checked
    }
  },
  render() {
    return (
      <li class="tree_item">
        {/* 展开箭头 */}
        <div class={['arrow', this.expand ? 'expand' : '']} 
        style={{display: this.isFolder ? 'block' : 'none'}}
        onClick={this.handleClickExpand}
        ></div>
        {/* 展示标题 */}
        <a class={['v-tree__title']} 
        style={{paddingLeft: this.level !== 0 && (`${this.level * this.indent}px`)}}
        onClick={this.handleClickItem}
        >
         {this.option['text']}
        </a>
        {/* 子节点嵌套 */}
        {
          this.isFolder && <ul>
          {
            this.option['children'].map((itemData, index) => {
             return (
               <Item name={this.name} option={itemData} key={`${this.name}${itemData['value']}${index}`}></Item>
             )
            })
          }
          </ul>
        }
      </li>
    )
  }
}
</script>

<style>

</style>