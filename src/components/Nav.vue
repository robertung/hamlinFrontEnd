<template>
    <div class="nav-view">
        <div class="container">
          <ul class="header-nav">
              <li><router-link :to="{ path: '/' }">Home</router-link></li>
              <li><router-link :to="{ path: '/vote' }">Vote</router-link></li>
              <li><router-link :to="{ path: '/sponsors' }">Sponsors</router-link></li>
              <li><router-link :to="{ path: '/contact' }">Contact</router-link></li>
              <li v-if="!loggedIn"><router-link :to="{ path: '/register' }">Register</router-link></li>
              <li v-if="!loggedIn"><router-link :to="{ path: '/login' }">Login</router-link></li>
              <li v-if="loggedIn"><router-link :to="{ path: '/profile' }">Upload Pumpkins</router-link></li>
              <li v-if="loggedIn"><a href="#" @click="logOut()">Logout</a></li>
          </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {

  private get loggedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  private get getUserId(): boolean {
    return this.$store.getters.getUserId;
  }

  private get user() {
    return this.$store.getters.user;
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
  padding: 20px 0;
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
    font-size: 24px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #D16805;
    }
  }
}
</style>
