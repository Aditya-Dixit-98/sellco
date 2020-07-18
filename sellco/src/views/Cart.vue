<template>
    <v-container fluid>
      <div class="text-center ma-2">
          <v-snackbar :width="60" max-height="20" v-model="snackset2" :timeout="3000" top color="success">
            <span class="ml-5">Hurray! Order Recieved </span>
            <v-icon flat class="ml-12" small color="white" @click="snackset2 = false">Close</v-icon>
          </v-snackbar>
          </div>
      <div class="text-center ma-2">
          <v-snackbar :width="60" max-height="20" v-model="snackset" :timeout="3000" top color="error">
            <span class="ml-5">Removed Product From Cart!</span>
            <v-icon flat class="ml-12" small color="white" @click="snackset = false">Close</v-icon>
          </v-snackbar>
          </div>
        <div class="text-center ma-2">
          <v-snackbar :width="60" max-height="20" v-model="alertval" :timeout="3000" top color="error">
            <span class="ml-5">Cannot Place Order Until Logged in!</span>
            <v-icon flat class="ml-12" small color="white" @click="alertval = false">Close</v-icon>
          </v-snackbar>
          </div>
        <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
        <v-container fluid>
                <v-row>
                  <v-col cols="12"
                  >
           <v-card
            dark
            v-for="product in this.$store.state.cart_product"
            :key="product.product_name"
            class="mt-2"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="product.product_name"
                ></v-card-title>

                <v-card-subtitle v-text="product.product_description"></v-card-subtitle>
                    <v-card-actions>
                        <v-row no-gutters>
                            <v-text-field 
                            solo
                            dense
                            v-model ="product.count"
                            v-on:click:append="(product.count > 0)?product.count+=1:product_count; update_orderval(product.cost,'+');update_count({'name': product.product_name , 'count' :product.count})"
                            v-on:click:prepend-inner="(product.count > 1)?product.count-=1:removefromcart(product.product_name); update_orderval(product.cost,'-');update_count(product_count);update_count({'name': product_name , 'count' :product_count})"
                            prepend-inner-icon="mdi-minus"
                            append-icon="mdi-plus"
                            class="shrink"
                            >
                            </v-text-field>
                            <div>
                             <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="red"
                                  rounded
                                  justify-end
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="removefromcart(product.product_name)"
                                >
                              <v-icon align-center>mdi-cart</v-icon>
                              </v-btn>
                            </template>
                            <span>Remove from Cart</span>
                            </v-tooltip>
                            </div>
                        </v-row>    
                    </v-card-actions>
              <v-text-field
              label="Total Cost"
              :value="`${product.cost*product.count}`"
              dense
              readonly
              class="ma-3"
              >
              </v-text-field>
              </div>
              <v-avatar
                class="ma-3"
                size="160"
                tile
              >
                <v-img :src="product.product_image"></v-img>
              </v-avatar>
            </div>
          </v-card> 
                  </v-col >
                </v-row>
        </v-container>
        <v-container  style="background-color: #546E7A">
          <p class="headline">Order Summary</p>
          <p class="overline">Shipping and additional costs are calculated based on values you have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Order Subtotal</td>
                <td class="text-right" style="width: 50px;">{{orderval}}</td>
              </tr>
              <tr>
                <td>Shipping Charges</td>
                <td class="text-right" style="width: 50px;">$10.00</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td class="text-right" style="width: 50px;">$5.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>{{orderval}}</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn @click="placeorder(); " class="white--text mt-5" outlined color="white">PROCEED</v-btn>
          </div>
        </v-container>      
    </v-container>
</template>
<script>
export default {
    props:['products'],
    name: 'Cart',
    data: () => ({
        count: 0,
        orderval: 0,
        snackset: false,
        snackset2: false,
        cart:{
        count: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        product_name: 'Product',
        Product: 'Description of Products',
        },
        order:[],
        alertval: false
    }),
    created () {

      this.$vuetify.theme.dark = true
    },
    computed:{
      },
    mounted(){
      this.$store.state.cart_product.forEach(product => {
          let cal = product.cost*product.count
          this.orderval =  this.orderval + cal
        })
      this.$store.state.cart_product.forEach(product => {
        console.log(product)
         this.order.push({
           ...product
         })
          console.log(this.order)
      })
    },
    methods:{
      removefromcart(pr_title)
      {
        this.$store.dispatch("removefromcart",{"pr_title" : pr_title })
        this.snackset= true
      },
      update_orderval(cost,val){
        let vcost = parseInt(cost)
        if(val == '+'){
          this.orderval += vcost
        }
        else{
            this.orderval -= vcost
        }
    },
    update_count(val){
      this.order.forEach(ord => {
        if(val.name == ord.name){
        ord.count = val.count
        }
      })
    },
    placeorder(){
      if(this.$store.state.userval){
      this.$store.dispatch("placeorder",this.order)
      this.$store.dispatch("emptycart")
      this.snackset2 = true
      }
      else{
          this.alertval= true
      }

      }
 }
    
}
</script>
<style scoped>
.v-text-field{
      width: 100px;
}
</style>
