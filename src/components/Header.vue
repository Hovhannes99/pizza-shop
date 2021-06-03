<template>
  <div class="header">
    <div class="order">

    <v-row justify="center" v-if="answer && success">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mx-2"
              fab
              large
              color="pink"
              dark
              @click.stop="dialogOrder = true"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon
                dark>
              mdi-message-text
            </v-icon>
          </v-btn>
        </template>
        <span>My Orders</span>
      </v-tooltip>
      <v-dialog
          v-model="dialogOrder"
          max-width="500">
        <v-card>
          <v-card-tidialogOrdertle class="text-h5">
            My Orders
          </v-card-tidialogOrdertle>
          <v-list-item
              v-for="item of inOrderInfo"
              :key="item.id"
              @click="sheet = false"
          >
            <v-list-item-avatar>
              <v-avatar
                  size="32px"
                  tile>
                <img :src="item.image"/>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-title>${{ item.price }}</v-list-item-title>
            <v-list-item-title>{{ item.pivot.count }}</v-list-item-title>
            <v-list-item-title> {{item.created_at}}</v-list-item-title>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialogOrder = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    </div>
    <div class="avatar" v-if="success">
      <v-avatar
          color="green"
          size="76"
      ><span class="white--text headline">{{ person.first_name[0] }}{{ person.last_name[0] }}</span></v-avatar>
    </div>
    <router-link to="/"><img src="../Third.jpg"></router-link>
    <div class="register">
      <SignUp v-if="!answer && !success" :onSignIn="signUp"/>
      <SignIn v-if="!answer&& !success" :onSignIn="signUp"/>
      <Logout v-if="answer && success" @onLogout="logout"/>
    </div>
  </div>
</template>
<script>

import SignUp from "../components/SignIn";
import SignIn from "../components/SignUp";
import {mapGetters} from "vuex";
import Logout from "../components/Logout";
import axios from "../api/axios";


export default {
  name: 'Header',
  data: () => ({
    answer: "",
    person: {},
    success: false,
    dialogOrder: false,
    myOrders: {},
    globalOrder: {},
    inOrderInfo: {},
  }),
  components: {
    Logout,
    SignUp,
    SignIn
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  methods: {
    logout() {
      this.answer = localStorage.getItem('Token');
      this.success = false;
    },
    signUp() {
      this.answer = localStorage.getItem('Token')
      this.success = true
    },
    async authUser() {
      try {
        this.person = await axios.get('/user', {headers: {"Authorization": `Bearer ${this.answer}`}})
        this.person = this.person.data
        if (!Object.keys(this.person).length) {
          this.success = false
        } else {
          this.success = true
        }
        this.person = Object.values(this.person.data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    this.answer = localStorage.getItem('Token')
    this.authUser()
    try {
      const order = await axios.get("/orders", {
        headers: {
          Authorization: `Bearer ${this.answer}`
        }
      });
      this.myOrders = order.data.data
    } catch (e) {
      console.log(e)
    }
    if (this.myOrders.length) {
      for (let key of this.myOrders) {
        this.globalOrder = {
          key
        }
      }
      this.inOrderInfo = {
        ...this.globalOrder.key.pizzas,
      }
    }
  },
  watch: {
    token() {
      this.answer = localStorage.getItem('Token')
    }
    ,
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  position: absolute;
  display: flex;
  justify-content: space-around;
  z-index: 2;

  img {
    width: 300px;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    left: 40%;
    right: 45%;
  }

  .register {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .avatar {
    width: 300px;
    height: 100%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

  }
}
.order {
  position: absolute;
  left: 50px;
  top: 35px;
  z-index: 2;

}

</style>
