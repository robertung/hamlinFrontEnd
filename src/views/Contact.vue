<template>
    <div class="login-view view">
      <h1>Hamlin Halloween</h1>
      <b-form class="login-form">
        <h4>Contact Us</h4>
        <b-form-group
          id="email"
          label="Email Address"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          />
        </b-form-group>

      <b-form-group
          id="message"
          label-for="message"
          label="Message"
        >
          <b-form-input
            id="message"
            v-model="message"
            type="text"
            required
            placeholder="Enter Message"
          />
        </b-form-group>
        <b-button
          v-if="!uploading"
          :disabled="!disableButton"
          :variant="disableButton ? 'primary': 'secondary'"
          @click="sendEmail()"
          type="button"
          >Send Message</b-button>
        <b-spinner
          v-if="uploading"
          class="upload-button"
          style="width: 3rem; height: 3rem;"
          label="Large Spinner"
        />
        <p>{{ responseMessage }}</p>
      </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from './Login.vue';

@Component
export default class Contact extends Login {

    private message = '';

    private responseMessage = '';

    private uploading = false;

    private get disableButton(): boolean {
      return this.email.length > 0
        && this.message.length > 0;
    }

    private async sendEmail(): Promise<void> {
      this.uploading = true;
      const payload: {} = {
        email: this.email,
        message: this.message,
      };

      await this.$store.dispatch('sendMessage', payload);
      this.uploading = false;
      this.responseMessage = 'Message sent.';
    }
}
</script>
