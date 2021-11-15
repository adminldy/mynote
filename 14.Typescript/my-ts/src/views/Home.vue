<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="toAboutPage">about</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import {RouterHelper} from '../lib/RouterHelp'
import {RoutePath} from '../router'
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public toAboutPage() {
    console.log(RoutePath.About)
    RouterHelper.push(RoutePath.About, {testName: '123'})
  }
}
</script>
