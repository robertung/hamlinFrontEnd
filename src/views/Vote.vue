<template>
  <div class="vote view">
   <h1>Hamlin Halloween Vote</h1>
   <b-container>
      <b-row>
        <b-col class="images" v-for="(image, index) in gallery" :key="index">
          <router-link :to="{ path: `/vote/${image.user_id}` }">
            <img style="max-width: 200px;" :src="`${apiPath}/${image.image_name}`" />
          </router-link>
        </b-col>
      </b-row>
   </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Vote extends Vue {

  private apiPath = process.env.VUE_APP_API_DOMAIN;

  private get gallery() {
    return this.$store.getters.getGaller;
  }

  private loadImages(): void {
    this.$store.dispatch('gallery');
  }

  private mounted(): void {
    this.loadImages();
  }
}
</script>

<style lang="scss">
.vote {
  .images {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    background: #fa9b03;
    margin: 5px;
    border-radius: 5px;
  }
}

</style>
