<template>
  <div class="home">
    <!-- 首页头部 -->
    <home-header :category="category" @setCurrentCategory="setCurrentCategory"></home-header>
    <!-- 轮播图 -->
    <home-swiper></home-swiper>
    <!-- 课程列表 -->
    <home-list></home-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core"
import { Store, useStore } from 'vuex'
import { CATEGORY_TYPES, IGlobalState } from '@/typings'
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
import * as Types from '@/store/action-types'
// 专门为修改分类使用
function useCategory(store: Store<IGlobalState>) {
     let category = computed(() => {
      return store.state.home.currentCategory // vuex中的状态
    })
    
    function setCurrentCategory(category: CATEGORY_TYPES) {
      store.commit(`home/${Types.SET_CATEGORY}`, category)
    }
    
    return {
      category,
      setCurrentCategory
    }
}

export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper
  },
  setup(props, context) {
    // 1. 需要获取vuex中的分类状态， 有个更改状态的功能
    let store = useStore<IGlobalState>()
    let { category, setCurrentCategory } = useCategory(store)
   
    return {
      category,
      setCurrentCategory
    }
  }
})
</script>