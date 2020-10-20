<template>
  <div class="nav--bar">
    <div class="nav-view desktop">
        <div class="container">
          <ul class="header-nav">
              <li><router-link :to="{ path: '/' }">Home</router-link></li>
              <li><router-link :to="{ path: '/vote' }">Vote</router-link></li>
              <li><router-link :to="{ path: '/sponsors' }">Sponsors</router-link></li>
              <li><router-link :to="{ path: '/raffle' }">Raffle</router-link></li>
              <li><router-link :to="{ path: '/contact' }">Contact</router-link></li>
              <li v-if="!loggedIn"><router-link :to="{ path: '/register' }">Register</router-link></li>
              <li v-if="!loggedIn"><router-link :to="{ path: '/login' }">Login</router-link></li>
              <li v-if="loggedIn"><router-link :to="{ path: '/profile' }">Upload Pumpkins</router-link></li>
              <li v-if="loggedIn"><a href="#" @click="logOut()">Logout</a></li>
          </ul>
        </div>
    </div>
    <div class="nav-icon">
      <b-icon @click="navHandler()" class="border rounded p-2" icon="three-dots" aria-hidden="true" />
    </div>
    <div class="nav-view mobile" v-show="showMobileNav">
        <div class="close-icon" @click="navHandler()">
            <b-icon icon="x-circle-fill" aria-hidden="true" />
        </div>
        <div class="container">
          <ul class="header-nav">
              <li><router-link @click.native="navHandler()" :to="{ path: '/' }">Home</router-link></li>
              <li><router-link @click.native="navHandler()" :to="{ path: '/vote' }">Vote</router-link></li>
              <li><router-link @click.native="navHandler()" :to="{ path: '/sponsors' }">Sponsors</router-link></li>
              <li><router-link @click.native="navHandler()" :to="{ path: '/raffle' }">Raffle</router-link></li>
              <li><router-link @click.native="navHandler()" :to="{ path: '/contact' }">Contact</router-link></li>
              <li v-if="!loggedIn"><router-link @click.native="navHandler()" :to="{ path: '/register' }">Register</router-link></li>
              <li v-if="!loggedIn"><router-link @click.native="navHandler()" :to="{ path: '/login' }">Login</router-link></li>
              <li v-if="loggedIn"><router-link @click.native="navHandler()" :to="{ path: '/profile' }">Upload Pumpkins</router-link></li>
              <li v-if="loggedIn"><a href="#" @click="logOut();navHandler()">Logout</a></li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {

  showMobileNav = false;

  private get loggedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  private get getUserId(): boolean {
    return this.$store.getters.getUserId;
  }

  private get user() {
    return this.$store.getters.user;
  }

  private navHandler(): void {
    this.showMobileNav = !this.showMobileNav;
  }

  private async logOut(): Promise<void> {
    const payload: {} = {
      userId: this.getUserId,
    };
    localStorage.removeItem('access_token');
    await this.$store.dispatch('logout', payload);
    this.$store.commit('CLEAR_DATA');
    this.$router.push({ name: 'Login' });
  }
}
</script>

<style lang="scss">
.nav-view {
  padding: 20px 0 20px;
  border-bottom: solid 1px #fa9b03;
  background: #000;

  .header-nav {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    font-weight: bold;
    color: #fa9b03 ;
    font-size: 22px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #0056b3;
    }
  }
  a:hover {
    color: #0056b3;
    text-decoration: none;
}
}
</style>
