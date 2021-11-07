<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>{{this.timeDisplay}}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Countdown, EventsName, fillZero } from '../lib/countDown'
@Component({

})
export default class About extends Vue {
  public timeDisplay = ''
  public created() {
    let count1 = new Countdown(Date.now() + 60 * 100 * 10, 10)
    count1.on(EventsName.RUNNING, (remainTimeData) => {
      const {days, hours, minutes, seconds, millseconds} = remainTimeData
      this.timeDisplay = [days, hours, minutes, seconds, millseconds].map(fillZero).join(':')
    })
  }
}
</script>