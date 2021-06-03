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
            color="orange"
            dark
            v-bind="attrs"
            v-on="on"
            v-if="true"
        >
          Sign In
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign In</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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
              @click="signIn"
          >
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "../api/axios";
import { mapMutations} from "vuex"


export default {
  name: "SignIn",
  props:['onSignIn'],
  data: () => ({
    dialog: false,
    email: "",
    password: "",
    ok: false,
    passwordError: "",
    emailError: "",
    authUser: ""
  }),
  methods: {
    ...mapMutations("auth", ["setToken","setUser"]),
    async signIn() {
      try {
        const success = await axios.post("/signin", {
          email: this.email,
          password: this.password
        })
        this.setToken(success.data.token)

        if (success){
          localStorage.setItem('Token', success.data.token)
          const { data } = await axios.get('/user', { headers: {"Authorization" : `Bearer ${success.data.token}`}});
           await this.setUser(data)
          this.ok = true
          this.onSignIn();
        }
      } catch (e) {
        if (!e.response.data.message) {
          this.emailError = e.response.data.error.email[0];
          this.passwordError = e.response.data.error.password[0];
        }
      }
    }

  }
}
</script>

<style scoped>

</style>