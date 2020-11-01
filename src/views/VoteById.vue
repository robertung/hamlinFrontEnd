<template>
  <div class="vote-by-id view">
    <b-modal v-model="modalShow" ok-only>This pumpkin got a vote!</b-modal>
     <b-container>
       <div class="vote-button-container">
        <b-button :disabled="buttonDisabled" variant="primary" @click.prevent="vote()">{{ message }}</b-button>
       </div>
      <b-row v-for="(image, index) in userById" :key="index">
        <b-col class="images">
          <img style="max-width: 100%" :src="image.image_path" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Modal from './Modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class VoteById extends Vue {

  private userId = this.$route.params.id;

  private message = 'Voting closed';

  private buttonDisabled = true;

  private modalShow = false;

  private get userById(): void {
    return this.$store.getters.getImageById;
  }

  private async loadImages(): Promise<void> {
    const payload = {
      userId: this.userId,
    };

    this.$store.dispatch('imageById', payload);
  }

  private vote(): void {
    const payload = {
      userId: this.userId
    };
    this.$store.dispatch('vote', payload)
      .finally(() => {
        this.message = 'You have voted for this pumpkin';
        this.buttonDisabled = true;
        this.modalShow = true;
      });
  }

  private created(): void {
    this.loadImages();
  }

  private beforeDestroy(): void {
    this.modalShow = false;
  }
}
</script>

<style lang="scss">
.vote-by-id {
    .vote-button-container {
      text-align: center;
      margin: 20px;

      button {
        width: 150px;
        height: 150px;
        border-radius: 100%;
      }
    }
    .images {
      text-align: center;
      background: #fa9b03;
      margin: 5px;
      border-radius: 5px;
      
      img {
        margin: 5px;
      }
    }
}
</style>
