<template>
  <div id="nav">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/mine">课程页</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/profile">个人中心</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
</style>
