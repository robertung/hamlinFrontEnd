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
      <b-button v-if="!loggedIn" variant="success" class="home-register-button">
        <router-link :to="{ path: '/register' }">Register and Upload pumpkins click here</router-link>
      </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {
  showTop = false

  private get loggedIn(): boolean {
    return this.$store.getters.loggedIn;
  }
}
</script>

<style lang="scss">
.home-view {
  h4 {
    color: #fa9b03;
  }

  .home-register-button {

    a {
      text-decoration: none;
      color: #000;
    }
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
  margin-top: 100px;
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
