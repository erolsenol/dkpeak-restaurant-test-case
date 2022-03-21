<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6">
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation>

      <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

      <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      @click="login"
      :loading="loading"
    >
      Sing in
    </v-btn>

     <v-btn
      color="success"
      class="mr-4"
      @click="()=>  $router.push({ name: 'sign_up'})"
      :loading="loading"
    >
      Sing up
    </v-btn>

      </v-form>
     </v-col>
     <SnackBar v-model="snackbar.value" :text="snackbar.text"/>
  </v-row>
</template>

<script>
import SnackBar from "@/components/SnackBar.vue"
export default {
  name:"SignInForm",
  components: {
    SnackBar
  },
  data(){
    return {
      loading:false,
      snackbar: {
        value: false,
        text: "Snackbar Text"
      },
      valid:true,
      email:null,
      password:null,
      show1: false,
       passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be less than 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods:{
    async login () {
        await this.$refs.form.validate();
        if(this.valid) {
          this.loading = true;
          const requestBody = {
            email:this.email,
            password:this.password
            }
            this.$store.dispatch("Login", requestBody)
            
          // const response = await fetch('http://164.92.154.153:4001/v1/auth/local/signin', {
          //    method: 'POST',
          //    headers: {
          //      'Content-Type': 'application/json'
          //      },
          //    body: JSON.stringify(requestBody)
          // });
          // const responseData = await response.json();
          // if(responseData && responseData.access_token && responseData.refresh_token) {
          //   const accessToken = responseData.access_token;
          //   const refreshToken = responseData.refresh_token;

          //   localStorage.setItem('access_token',JSON.stringify(accessToken))
          //   localStorage.setItem('refresh_token',JSON.stringify(refreshToken))

          //   console.log("accessToken",accessToken);
          //   console.log("refreshToken",refreshToken)

          //   this.$router.push({ name: 'restaurant'})
          // } else {
          //   this.snackbar= {
          //     value: true,
          //     text: "something went wrong"
          //   }
          // }

          this.loading = false;
        }
      },
  }
}
</script>

<style>

</style>