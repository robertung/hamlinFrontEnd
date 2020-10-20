<template>
  <div class="sponsors view">
    <h1>Hamlin Halloween Sponsors</h1>
    <b-container>
      <b-row v-for="(list, index) in urlList" :key="index">
        <b-col>
          <b-img
              class="image"
              fluid-grow
              :src="list.src"
            />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Sponsors extends Vue {
  
  get urlList(): [] {
    return [
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/The%20Nook.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/Cake%20Bash.jpg'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/The%20Stand.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/Farm%20Table.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/Duckyard.jpg'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/55BA262A-3259-4AEC-B8C0-A242A19C9C9C.jpeg'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/TK%20Salon.jpg'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/humblebee.jpg'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/trader%20joes.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/trader%20joes.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/Balta.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/ralphs.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/tj.png'
      },
      {
        src: 'https://hamlinhalloween.fra1.digitaloceanspaces.com/sponsors/ezgif.com-gif-maker%20%281%29.jpg'
      }
    ]
  }
}
</script>
