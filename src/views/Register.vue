<template>
    <div class="register-view view">
      <h1>Hamlin Halloween</h1>
      <b-form class="login-form">
        <h4>Register Account</h4>
        <p>All fields are required</p>
        <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="name"
            type="text"
            required
            placeholder="Enter Name"
          />
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="House Nick Name"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="houseNickName"
            type="text"
            required
            placeholder="Enter House Nick Name"
          />
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Email address"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="email"
            type="email"
            required
            placeholder="Enter Email Address"
          />
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Password"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="password"
            type="password"
            required
            placeholder="Enter Password"
          />
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="Password Confirmation"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="passwordConfirmation"
            type="password"
            required
            placeholder="Confirm Password"
          />
        </b-form-group>
        <b-button
          :disabled="!buttonDisabled"
          type="button"
          variant="primary"
          @click="register()">
          Register
        </b-button>
        <div class="error" v-if="errorMessage">
          <p>Email is already being used</p>
        </div>
        <div class="error" v-if="passordMatch">
          <p>Passwords do not match</p>
        </div>
      </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

    private name = '';

    private email = '';

    private houseNickName = '';

    private password = '';

    private passwordConfirmation = '';

    private errorMessage = false;

    private get buttonDisabled(): boolean {
      return this.name.length > 0
        && this.email.length > 0
        && this.houseNickName.length > 0
        && this.password.length > 0
        && this.passwordConfirmation.length > 0
        && this.password === this.passwordConfirmation;
    }

    private get passordMatch(): boolean {
      if (this.password.length > 0
        && this.passwordConfirmation.length > 0) {
        return this.password !== this.passwordConfirmation;
      }
      return false;
    }

    private register(): void {
      this.errorMessage = false;

      const payload: {} = {
        name: this.name,
        email: this.email,
        houseNickName: this.houseNickName,
        password: this.password,
        passwordConfirm: this.passwordConfirmation,
      };

      this.$store.dispatch('register', payload)
        .then((response) => {
          if (response.status === 401 || response.status === 400) {
            this.errorMessage = true;
          }
          if (response.status === 200) {
            this.$router.push({ name: 'Profile' });
          }
        });
    }
}
</script>

<style lang="scss">
  .register-view {

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