<template>
 <v-app id="inspire">
          <v-snackbar :width="60" max-height="20" v-model="snackset" :timeout="3000" top color="success">
            <span class="ml-5">Welcome Back Dear Customer!!</span>
            <v-icon flat class="ml-12" small color="white" @click="snackset = false">Close</v-icon>
          </v-snackbar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link to='/'>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Products">
          <v-list-item-action>
            <v-icon>mdi-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/Cart">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Order">
          <v-list-item-action>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$store.state.val == false" link to="/Account">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Sellco</v-toolbar-title>
       <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon v-on="on" v-show="$store.state.val" v-bind="attrs" @click="overlay = true" ><v-icon>mdi-login</v-icon></v-app-bar-nav-icon>
            </template>
            <span>Login</span>
          </v-tooltip>
            <v-app-bar-nav-icon @click="logout()" v-if="$store.state.val == false" ><v-icon>mdi-logout</v-icon></v-app-bar-nav-icon>
            <v-app-bar-nav-icon to='/Account' @click="openaccount()"  v-if="$store.state.val == false" ><v-icon>mdi-account</v-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
      <v-overlay
 :value="overlay">
      <v-card>
        <v-tabs
        v-model="tab"
        background-color="cyan darken-2"
        dark 
        slider-color="white"
        >
        <v-tab
        v-for="(item,index) in items"
        :key="index"  class="white--text">
            {{item.name}}
        </v-tab>
        <v-spacer></v-spacer>
        <v-tab @click="overlay=false"> 
        <v-icon color="white" @click="overlay=false">mdi-close</v-icon>
      </v-tab>
         <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.name"
      >
        <v-card flat>
          <component v-bind:is="item.to"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
        </v-tabs>
      </v-card>
  </v-overlay>
  </v-app>
</template>
<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
export default {
  components:{
    Login,
    Register
  },
  props: {
      source: String,
    },
  data: function () {
    return{
      drawer: null,
      overlay: false,
      tab: 'Login',
      items:[
        {'name': 'Login', 'to': Login},
        {'name': 'Register','to': Register},
      ],
    val: true,
    snackset: false,
    }
  },
  created () {
      console.log(this.$store.state.val)
      this.$vuetify.theme.dark = true
    },
  watch:{
   '$store.state.user_val': function(){
      if(this.$store.state.user_val){
        this.val = false
        this.overlay= false
        this.snackset = true
        console.log("reset value",this.val,this.overlay,this.val2)
        console.log(this.val)
      }
      else{
        console.log(this.val)
      }
   }
  },
  methods:{
    logout(){
      let newState ={
    products:[],
    cart_product:[],
    check_products:[],
    check_cart:[],
    orders:[],
    user_val:false,
    uid: null,
    error: null,
    account_details:[],
    val:true
      }
      this.$store.dispatch('logout')
      this.$store.replaceState(newState)
      sessionStorage.clear()
      this.val = true
      console.log(this.$store.state.val)
    },
  }
}
</script>>
<style lang="scss">
</style>
