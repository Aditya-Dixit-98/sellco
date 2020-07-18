
<template>
<div>
          <div class="text-center ma-2">
              <v-snackbar :width="60" max-height="20" v-model="snackset" :timeout="3000" top color="success">
                   <span class="ml-5">Hurray! Order Recieved </span>
                    <v-icon flat class="ml-12" small color="white" @click="snackset = false">Close</v-icon>
              </v-snackbar>
          </div>
          
<p class="display-3 font-weight-light	text-center pa-4">My Orders</p>
<v-alert type="info" elevation="2">
            Hello Customer! If you cannot view your Order Try Logout and Login again. You may also recieve a call for confirmation of your order
</v-alert>

<span v-for= "(orders,index) in this.$store.state.orders" :key="index">

            <div>
                    <v-card class="ma-1" v-resize="onResize" :width="widthval">
                    <v-row justify="space-between">
                    <v-card-title>Order Details</v-card-title>
                    <v-card-actions>
                    <v-btn
                    color="success"
                    @click="snackset = true; removeorder()"
                    rounded>
                    Order Recieved
                    </v-btn>
                    </v-card-actions>
                    </v-row>
                    <v-simple-table dark>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <td class="text-h5">{{order_details[index]}}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th class="text-left">Product Name</th>
                      <th class="text-left">Product Cost</th>
                      <th class="text-left">Quantity</th>
                      <th class="text-left">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in orders" :key="prod.product_name">
                      <td>{{ prod.product_name }}</td>
                      <td>{{ prod.cost }}</td>
                      <td>{{ prod.count }}</td>
                      <td >{{ (prod.cost*prod.count) }}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <th class="success">Total Cost</th>
                      <td class="success">{{TotalCost[index]}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
                  </v-card>
            </div>
            <!--
            <v-overlay
            :value="overlay">
            <v-card>
              
              <v-simple-table dark>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <td class="text-h5">Order {{index}}</td>
                      <td></td>
                      <td></td>
                      <td class="text-right"><v-icon dense @click="closeorder()">mdi-close</v-icon></td>
                    </tr>
                    <tr>
                      <th class="text-left">Product Name</th>
                      <th class="text-left">Product Cost</th>
                      <th class="text-left">Quantity</th>
                      <th class="text-left">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in orders" :key="prod.product_name">
                      <td>{{ prod.product_name }}</td>
                      <td>{{ prod.cost }}</td>
                      <td>{{ prod.count }}</td>
                      <td >{{ (prod.cost*prod.count) }}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <th class="success">Total Cost</th>
                      <td class="success">{{TotalCost}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              
            </v-card>
            </v-overlay>
            -->
</span>



</div>
</template>
<script>
export default {
name: 'Order',
data:() =>({
    ind: 0,
    overlay: false,
    TotalCost: [],
    snackset: false,
    val :false,
    value1: 0,
    order_details:[],
    widthval: "1000px",
    winWidth:0
}),
  mounted(){
    console.log(this.$store.state.orders)
    this.onResize()
  } ,
  watch:{
    '$store.state.userval':{
        immediate: true,
        handler(){
        this.$store.state.orders.forEach(ord => {
          this.value1 = 0
          ord.forEach(product =>{
          let cal = product.cost*product.count
          this.value1 =  this.value1 + cal
        })
        this.TotalCost.push(this.value1)
        })
          console.log(this.TotalCost)
        this.$store.state.account_details.forEach(account => {
              account.Orders.forEach(order =>{
                  this.order_details.push(order)
              })
        })
    }
    },
    winWidth: function(){
        console.log("inside watch func")
        if(this.winWidth < 750){
          this.widthval = "600px"
          console.log("this is storage",window.sessionStorage)
          console.log("this is storage",window.sessionStorage)
        }
        else{
            this.widthval ="1000px"
        }
      }
  },
  methods:{
    openorder(){
      this.overlay = true;
    },
    closeorder(){
      this.overlay = false;
    },
    updatecost(val){
        console.log(val)
        this.TotalCost = this.TotalCost + val
      },
    computecost(val){
          console.log(val)
          this.TotalCost = 0
          val.forEach(product =>{
          let cal = product.cost*product.count
          this.TotalCost =  this.TotalCost + cal
        })
    },
    onResize(){
      this.winWidth = window.innerWidth
    }
  },
   
}
</script>
<style scoped>

</style>