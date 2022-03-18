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
      v-model="fullName"
      :rules="fullNameRules"
      label="FullName"
      required
    ></v-text-field>

      <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

      </v-form>
     </v-col>
  </v-row>
</template>

<script>
export default {
  name:"SignInForm",
  data(){
    return {
        valid: true,
      email:null,
      fullName:null,
      password:null,
      fullNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 3) || 'Name must be less than 3 characters',
      ],
       passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 6) || 'Name must be less than 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods:{
     validate () {
      },
  }
}
</script>

<style>

</style>