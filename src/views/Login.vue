<template>
    <div class="login-view view">
      <h1>Hamlin Halloween</h1>
      <b-form class="login-form">
        <h4>Login</h4>
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
          id="password"
          label-for="password"
          label="Password"
        >
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter Password"
          />
        </b-form-group>
        <b-button
          :variant="buttonDisabled ? 'primary': 'secondary'"
          :disabled="!buttonDisabled"
          @click="login()"
          type="button"
          >
            Submit
        </b-button>
        <div class="error" v-if="errorMessage">
          <p>Email or Password is incorrect</p>
        </div>
      </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    public email = '';

    public password = '';

    public errorMessage = false;

    public get buttonDisabled(): boolean {
      return this.email.length > 0 && this.password.length > 0;
    }

    public login(): void {
      this.errorMessage = false;
      const payload: {} = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('login', payload)
        .then((response) => {
          if (response.status === 401) {
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
        margin-bottom: 20px;

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