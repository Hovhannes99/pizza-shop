<template>

      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            v-if="!ok"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="red"
                dark
                v-bind="attrs"
                v-on="on"
                v-if="true"
            >
              Sign Up
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Sign Up</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                  >
                  </v-col>
                  <v-col
                      cols="12">
                    <v-text-field
                        v-model="firstName"
                        label="Firs Name"
                        hint="example of helper text only on focus"
                        :error="nameError !== ''"
                        :error-messages="nameError?`${nameError}`:''"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"  >
                    <v-text-field
                        v-model="lastName"
                        label="Last Name*"
                        hint="example of persistent helper text"
                        persistent-hint
                        required
                        :error="lastNameError !== ''"
                        :error-messages="lastNameError?`${lastNameError}`:''"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="email"
                        label="Email*"
                        required
                        :error="emailError !== ''"
                        :error-messages="emailError?`${emailError}`:''"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="password"
                        label="Password*"
                        type="password"
                        required
                        :error="passwordError !== ''"
                        :error-messages="passwordError?`${passwordError}`:''"
                    ></v-text-field>
                    <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        required
                        :error="confirmPasswordError !== ''"
                        :error-messages="confirmPasswordError?`${confirmPasswordError}`:''"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="signUp"
              >
                SignUp
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
</template>

<script>

import axios from "../api/axios";
import {mapGetters} from "vuex"

export default {
  name: "SignUp",
  data: () => ({
    dialog: false,
    firstName :"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    nameError:"",
    lastNameError:"",
    emailError:"",
    passwordError:"",
    confirmPasswordError:"",
    ok: false
  }),
  computed:{
    ...mapGetters('auth', ["user"])
  },
  methods:{
    async signUp(){
      try {
        const response = await axios.post('/signup',{
          first_name:  this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword
        });
        if (response){
          this.ok = true
          this.$emit("onSignUp")
        }
      } catch (e) {
        this.emailError =  e.response.data.error.email[0];
        this.passwordError = e.response.data.error.password[0];
        this.nameError = e.response.data.error.first_name[0];
        this.lastNameError = e.response.data.error.last_name[0];
        this.confirmPasswordError = e.response.data.error.confirm_password[0];
      }
    }
  },
}
</script>

<style scoped>

</style>