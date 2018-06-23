
# VueJS :: Validations :: Vee-Validate



## PASSWORD CONFIRMATION

See this [CodePen](https://codepen.io/zschuessler/pen/PmwBOb) for example of how to do password confirmation.

```html
<v-form ref="formSignup" v-model="formSignupValid" @submit.prevent>
  <h1>Get Started!</h1>

  <br>

  <v-text-field
    autocomplete="username email"
    data-vv-name="email"
    label="Email"
    v-model.trim="email"
    v-validate="'required|email'"
    :error-messages="errors.collect('email')"
    type="email"
    required
  />

  <v-text-field
    autocomplete="current-password"
    data-vv-name="password"
    label="Password"
    v-model.trim="password"
    v-validate="'required|min:6|confirmed:pw_confirm'"
    :error-messages="errors.collect('password')"
    type="password"
    required
  />

  <v-text-field
    data-vv-name="password confirmation"
    data-vv-as="password"
    ref="pw_confirm"
    label="Password Confirmation"
    v-model.trim="password_confirmation"
    v-validate="'required|min:6'"
    :error-messages="errors.collect('password_confirmation')"
    type="password"
    required
  />


  <div v-if="errors">
    <pre>{{ errors}}</pre>
  </div>

  <br>
  <v-btn color="success" @click="doSignup" :disabled="errors.any()" :loading="btnLoading">Register</v-btn>
  <v-btn @click="clearFormSignup">clear</v-btn>
</v-form>

```


