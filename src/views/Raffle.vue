<template>
    <div class="login-view view">
      <h1>Hamlin Halloween Raffle</h1>
      <div class="login-form"><h4>Raffle Closed</h4></div>
      <!-- <b-form class="login-form">
        <h4>Sign up for the raffle</h4>
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
            placeholder="Enter Email"
          />
        </b-form-group>

      <b-form-group
          id="name"
          label-for="name"
          label="Name"
        >
          <b-form-input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="Enter Name"
          />
      </b-form-group>
      <b-form-group
          id="telephone"
          label-for="telephone"
          label="Telephone"
        >
          <b-form-input
            id="telephone"
            v-model="telephone"
            type="tel"
            required
            placeholder="Enter Telephone"
          />
      </b-form-group>
        <b-button
          :disabled="!disableButton"
          :variant="disableButton ? 'primary': 'secondary'"
          @click="sendRaffle()"
          type="button"
          >
          Send Raffle Information
      </b-button>
        <p>{{ responseMessage }}</p>
      </b-form> -->
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import Login from './Login.vue';

@Component
export default class Raffle extends Login {

    private name = '';

    private telephone = ''

    private responseMessage = '';

    private get disableButton(): boolean {
      return this.email.length > 0
        && this.name.length > 0
        && this.telephone.length > 0;
    }

    private async sendRaffle(): Promise<void> {

      const payload: {} = {
        email: this.email,
        name: this.name,
        phone_number: this.telephone
      };

      await this.$store.dispatch('sendRaffle', payload);

      this.responseMessage = 'Raffle Saved.';
      this.email = '';
      this.name = '';
      this.telephone = '';
    }
}
</script>