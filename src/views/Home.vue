<template>
  <div class="home-view">
      <!-- <div class="halloween-message">
        <h1>H<span>amlin</span></h1>
        <h2>H<span>alloween</span></h2>
      </div> -->
      <div class="halloween-title winners-wrapper">
        <h1>The Winners!</h1>
        <ul class="winner-list">
          <li class="images">1st Place <img style="max-width: 200px;" src="https://hamlinhalloween.fra1.digitaloceanspaces.com/pumpkins/n3h8mk20201026_114949.jpg" /></li>
          <li class="images">2nd Place <img style="max-width: 200px;" src="https://hamlinhalloween.fra1.digitaloceanspaces.com/pumpkins/san9wcF1D2D1ED-1F80-4F20-9FB1-4F908162B679.jpeg" /></li>
          <li class="images">3rd Place is a tie<img style="max-width: 100px;" src="https://hamlinhalloween.fra1.digitaloceanspaces.com/pumpkins/ks013sIMG-20201030-WA0013-01.jpeg" /> <img style="max-width: 100px;" src="https://hamlinhalloween.fra1.digitaloceanspaces.com/pumpkins/ehl0zf2223CDBB-A18C-43CE-A806-48A49118097E.jpeg" /></li>
          <li class="images">Raffle Winner is Leslie H!</li>
        </ul>
        <!-- <h1>Pumpkin <br/> Contest</h1> -->
      </div>
      <!-- <h4>Deadline for entering is Halloween Eve</h4> -->
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
  // font-family: 'halloween-title';
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
  margin-top: 70px;
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

.winner-list {
   list-style: none;
   margin: 50px 0 0 0;
   padding: 0;
   li {
    font-size: 35px;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-top: 20px;
    }
   }
}

.winners-wrapper {
    background: #000;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
}
</style>