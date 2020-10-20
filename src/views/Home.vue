<template>
  <div class="home-view">
      <div class="halloween-message">
        <h1>H<span>amlin</span></h1>
        <h2>H<span>alloween</span></h2>
      </div>
      <div class="halloween-title">
        <h1>Pumpkin <br/> Contest</h1>
      </div>
      <h4>Deadline for entering is Halloween Eve</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {
  showTop = false
}
</script>

<style lang="scss">
.home-view {
  h4 {
    color: #fa9b03;
  }
}
.halloween-title {
  font-family: 'halloween-title';
  color: #fa9b03;
  font-size: 105px;
  display: block;
  display: flex;
  flex-direction: column;
  line-height: .9;
  text-shadow: 0 2px 0 #fff;
  h1,
  h2 {
    margin: 0;
    font-size: 120px;
  }
  span {
    font-size: 90px;
  }
}
.halloween-message {
  color: #fa9b03;
  margin-top: 150px;
}
.pumpkin-wrapper {
  position: fixed;
  bottom: 50px;
  .pumpkin-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 120px;
  }
}
</style>
