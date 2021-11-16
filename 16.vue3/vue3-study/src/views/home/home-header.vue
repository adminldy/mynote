<template>
  <div class="home-header">
    <img src="@/assets/logo.png" alt="" />
    <!--  -->
    <van-dropdown-menu>
      <van-dropdown-item :modelValue="value1" :options="options" />
    </van-dropdown-menu>
  </div>
</template>
<style lang="scss">
  .home-header {
    height: 65px;
    background: #2a2a2a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    img {
      height: 50px;
    }
  }
</style>
<script lang="ts">
import { CATEGORY_TYPES } from "@/typings";
import { defineComponent, PropType, reactive } from "@vue/runtime-core";

export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>,
    },
  },
  emits: ["setCurrentCategory"], // 为了提示作用的
  setup(props, context) {
    let state = reactive({
      options: [
        {
          text: '全部课程',
          value: CATEGORY_TYPES.ALL
        },
        {
          text: 'React课程',
          value: CATEGORY_TYPES.REACT
        },
        {
          text: 'Vue课程',
          value: CATEGORY_TYPES.VUE
        },
        {
          text: 'Node课程',
          value: CATEGORY_TYPES.NODE
        }
      ]
    })
    return {
      state
    }
  }
});
</script>