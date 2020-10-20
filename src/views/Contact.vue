<template>
    <div class="login-view">
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
        <b-button type="button" variant="primary" @click="sendEmail()">Send Message</b-button>
        <p>{{ responseMessage }}</p>
      </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Contact extends Vue {
    private email = '';

    private message = '';

    private responseMessage = '';

    private async sendEmail(): void {

      const payload: {} = {
        email: this.email,
        message: this.message,
      };

      await this.$store.dispatch('sendMessage', payload);

      this.responseMessage = 'Message sent.';
    }
}
</script>

<style lang="scss">
  .login-view {
    
    h1 {
      text-align: center;
      color: #D16805;;
      font-size: 34px;
      margin-top: 30px;
    }

    .login-form {
        max-width: 400px;
        margin: 30px auto 0;
        padding: 20px;
        background: #fa9b03;
        border-radius: 5px;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.28);
        border-top: 10px solid;
        border-color:#D16805;

        .form-group {
          margin-bottom: 2rem;
        }

        input {
            font-family: 'Roboto', sans-serif;
        }

        .error {
            text-align: center;
            margin-top: 35px;
            color: red;
        }
    }
  }
</style>