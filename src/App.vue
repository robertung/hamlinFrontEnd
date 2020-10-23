<template>
  <div id="app" class="bg-container">
    <div class="clouds" />
      <nav-list />
      <div class="container">
        <router-view/>
      </div>
  </div>
</template>
<script>

import NavList from '@/components/Nav.vue';
import SvgGraphic from '@/components/SvgGraphic.vue';

export default {
  name: 'Home',
  components: {
    NavList,
    SvgGraphic,
  },
  computed: {
    showHouse() {
      return this.$route.name !== 'Vote';
    },
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Hamlin Street Halloween'
    }
  },
};
</script>
<style lang="scss">
.container {
  margin: 0 auto;
  width: 1024px;
  position: relative;
  z-index: 9999
}
.home-svg {
  position: absolute;
  right: 0;
  bottom: -10px;
  z-index: 0;
}
.halloween-message {

  h1,
  h2 {
    font-size: 100px;
  }
}
</style>
<style src="./assets/css/global.css"></style>