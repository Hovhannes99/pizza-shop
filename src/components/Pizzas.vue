<template>
  <div class="containerTwo">
    <div class="nav">
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div class="text-center modal">
        <v-dialog
            transition="dialog-top-transition"
            max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mx-2"
                fab
                dark
                large
                color="red"
                v-bind="attrs"
                v-on="on"
            >
              <v-badge
                  left
                  :content="cart.length"
                  :value="cart.length"
              >
                <v-icon
                    dark>
                  mdi-cart
                </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-alert type="success" elevation="25" v-if="verifyOrder">
              {{ verifyOrder }}
            </v-alert>
            <v-card>
              <v-list>
                <div class="cart">
                  <p>Your Cart</p>
                  <v-btn
                      v-if="cart.length"
                      color="red"
                      class="white--text"
                      depressed
                      @click="removeAllInCart"
                  >
                    <v-icon left>
                      mdi-delete
                    </v-icon>
                    Remove All
                  </v-btn>
                  <v-row justify="center">
                    <v-dialog
                        v-model="orderDialog"
                        persistent
                        max-width="600px"
                        v-if="cart.length"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            class="white--text"
                            depressed
                            v-bind="attrs"
                            v-on="on"
                        >
                          <v-icon left>
                            mdi-checkbox-marked-circle
                          </v-icon>
                          Buy All
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Order</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="12"
                              >
                                <v-text-field
                                    label="Legal first name*"
                                    required
                                    v-model="order.first_name"
                                    :error="nameError !== ''"
                                    :error-messages="nameError?`${nameError}`:''"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="12"
                              >
                                <v-text-field
                                    label="Legal last name*"
                                    v-model="order.last_name"
                                    persistent-hint
                                    required
                                    :error="lastnameError !== ''"
                                    :error-messages="lastnameError?`${lastnameError}`:''"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                    label="address"
                                    v-model="order.address"
                                    required
                                    :error="addressError !== ''"
                                    :error-messages="addressError?`${addressError}`:''"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                    label="Phone Number"
                                    type="number"
                                    v-model="order.phone"
                                    required
                                    :error="phoneError !== ''"
                                    :error-messages="phoneError?`${phoneError}`:''"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="orderDialog = false">
                            Close
                          </v-btn>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="toOrder"
                          >
                            Buy
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </v-list>
              <v-card-text>
                <p v-if="!cart.length" class="noOrder">No order</p>
                <v-list-item
                    v-for="item in cart"
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
                  <v-list-item-title>{{ item.count }}</v-list-item-title>
                  <v-list-item-title>${{ item.price * item.count }}</v-list-item-title>
                  <v-btn style="z-index: 3"
                         @click="deletePizza(item.id)"
                  >
                    <v-icon
                        color="red">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-list-item>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="dialog.value = false"
                >Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>
    <div v-for="n in 8" :key="n" class="cube"></div>
    <div v-if="!loading.length" class="wrapper">
      <div class="circle" style="background-color: #009246"></div>
      <div class="circle" style="background-color: white; border: 1px solid"></div>
      <div class="circle" style="background-color: red"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <span style="color: black">Loading</span>
    </div>
    <v-row>
      <v-col
          v-for="item in pizzasAll" :key="item.id"
          class="d-flex child-flex"
          cols="4"
      >
        <v-hover v-slot="{ hover }">
          <v-card
              class="pa-2"
              outlined
              tile
              max-width="100%"
              style="background: none"
          >
            <v-img
                :aspect-ratio="16/9"
                :src="item.image">
              <v-expand-transition>
                <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-6 v-card--reveal display-3 black--text"
                    style="height: 100%;">
                  ${{ item.price }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text
                class="pt-6"
                style="position: relative;"
            >
              <v-btn
                  absolute
                  color="orange"
                  fab
                  large
                  right
                  top
                  v-if="inCart"
                  @click="addPizzaInCart(item.id)"
              >
                <v-icon
                    color="white">
                  mdi-cart
                </v-icon>
              </v-btn>
              <h3 class="display-1 font-weight-light orange--text mb-2">
                {{ item.name }}
              </h3>
              <div>
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="orange"
                    @click="pizzasCountAdd(item.id)"
                >
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
                <v-badge
                    :content="pizzasAll.find(pizza => pizza.id === item.id).count"
                    :value="pizzasAll.find(pizza => pizza.id === item.id).count"
                    color="black"
                    overlap
                >
                </v-badge>
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="orange"
                    :disabled="pizzasAll.find(pizza => pizza.id === item.id).count === 1"
                    @click="pizzasCountMinus(item.id)"
                >
                  <v-icon>
                    mdi-minus
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "../api/axios";
import '@mdi/font/css/materialdesignicons.css'

export default {
  name: "Pizzas",
  data: () => ({
    pizzasAll: {},
    loading: [],
    cart: [],
    show: false,
    inCart: true,
    orderDialog: false,
    token: "",
    order: {
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      pizzas: {}
    },
    orderIsOkay: "",
    nameError: "",
    lastnameError: "",
    addressError: "",
    phoneError: "",
    verifyOrder: "",
  }),
  async mounted() {
    try {
      const pizzas = await axios.get('/pizzas')
      this.pizzasAll = pizzas.data.map((pizza) => ({
        ...pizza,
        count: 1
      }))
      this.loading = Object.values(this.pizzasAll)
    } catch (e) {
      console.log(e)
    }
    this.token = localStorage.getItem("Token")
  },
  methods: {
    pizzasCountAdd(id) {
      const index = this.pizzasAll.findIndex((pizza) => pizza.id === id);
      this.pizzasAll[index].count++;
    },
    pizzasCountMinus(id) {
      const index = this.pizzasAll.findIndex((pizza) => pizza.id === id);
      this.pizzasAll[index].count--;
    },
    addPizzaInCart(id) {
      const addPizza = this.cart.findIndex(piz => piz.id === id)
      const pizza = this.pizzasAll.find(pizza => pizza.id === id);
      if (addPizza === -1) {
        this.cart.push(pizza)
      }
    },
    removeAllInCart() {
      this.cart = []
    },
    deletePizza(id) {
      const removePizza = this.cart.filter(pizza => pizza.id !== id)
      this.cart = removePizza
    },
    async toOrder() {
      this.token = localStorage.getItem("Token")
      try {
        let pizzas = {};
        for (let key of this.cart) {
          pizzas[key.name] = key.count
        }
        this.order = pizzas
        console.log(this.order)
        const success = await axios.post("/order", this.order, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.orderDialog = false
        this.verifyOrder = success.data.data
        setTimeout(() => {
          this.verifyOrder = ""
        }, 2000)
      } catch (e) {
        this.nameError = e.response.data.error.first_name[0];
        this.lastnameError = e.response.data.error.last_name[0];
        this.addressError = e.response.data.error.address[0];
        this.phoneError = e.response.data.error.phone[0];
      }
    }
  },
}
</script>


<style scoped lang="scss">


.containerTwo {
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(-55deg, #ff0026, #f8e2e2, #a7c49b, #2f8b00);
  animation: gradient 15s ease infinite;
}

.cart {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  p {
    font-size: 20px;
    color: #009246;
    font-weight: 700;
    text-align: center;
  }
}



.noOrder {
  font-size: 25px;
  color: black;
  text-align: center;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

.nav {
  width: 100%;
  height: 150px;
  background: linear-gradient(-55deg, #ff0026, #f8e2e2, #a7c49b, #2f8b00);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  .modal {
    position: absolute;
    right: 50px;
    top: 20px;
    z-index: 2;
  }
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}


.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #ff0000;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  -webkit-animation: cube 12s ease-in forwards infinite;
  animation: cube 12s ease-in forwards infinite;
}

.cube:nth-child(2n) {
  border-color: #ffffff;
}

.cube:nth-child(2) {
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  left: 25vw;
  top: 40vh;
}

.cube:nth-child(3) {
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
  left: 75vw;
  top: 50vh;
}

.cube:nth-child(4) {
  -webkit-animation-delay: 6s;
  animation-delay: 6s;
  left: 90vw;
  top: 10vh;
}

.cube:nth-child(5) {
  -webkit-animation-delay: 8s;
  animation-delay: 8s;
  left: 10vw;
  top: 85vh;
}

.cube:nth-child(6) {
  -webkit-animation-delay: 10s;
  animation-delay: 10s;
  left: 50vw;
  top: 10vh;
}

@-webkit-keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}

.wrapper {
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.circle {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: #808080;
  left: 15%;
  transform-origin: 50%;
  animation: circle .5s alternate infinite ease;
}

@keyframes circle {
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
}

.circle:nth-child(2) {
  left: 45%;
  animation-delay: .2s;
}

.circle:nth-child(3) {
  left: auto;
  right: 15%;
  animation-delay: .3s;
}

.shadow {
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .5);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: shadow .5s alternate infinite ease;
}

@keyframes shadow {
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: .7;
  }
  100% {
    transform: scaleX(.2);
    opacity: .4;
  }
}

.shadow:nth-child(4) {
  left: 45%;
  animation-delay: .2s
}

.shadow:nth-child(5) {
  left: auto;
  right: 15%;
  animation-delay: .3s;
}

.wrapper span {
  position: absolute;
  top: 75px;
  font-size: 20px;
  letter-spacing: 12px;
  left: 15%;
}


</style>;