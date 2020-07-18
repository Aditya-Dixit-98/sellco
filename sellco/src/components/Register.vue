<template>
<div :width="$vuetify.breakpoint.mobile">
  <div class="text-center ma-2">
          <v-snackbar :width="60" max-height="20" v-model="snackset" :timeout="3000" top color="success">
            <span class="ml-5">{{response}}</span>
            <v-icon flat class="ml-12" small color="white" @click="snackset = false">Close</v-icon>
          </v-snackbar>
          </div>
           <v-card v-resize="onResize" dark color="dark" elevation-24 style="padding: 20px;" :width="widthval" >
             <v-card-text>
               <h4 class=" text-white text-center display-2 font-weight-bold">Register</h4>
               <br>
               <v-form>
                 <v-text-field 
                   clearable
                   v-model="username"
                   label="Email"
                   prepend-icon="mdi-gmail"
                   type="text"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                   counter="30"
                 >
                 </v-text-field>
                 <v-text-field 
                   clearable
                   v-model="password"
                   label="Password"
                   prepend-icon="mdi-lock"
                   type="password"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                 >
                 </v-text-field>
                 <v-text-field 
                   clearable
                   v-model="customer_name"
                   label="Customer Name"
                   prepend-icon="mdi-account-edit"
                   type="text"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                 ></v-text-field>
                  <v-text-field 
                   clearable
                   v-model="customer_address"
                   label="Customer Address"
                   prepend-icon="mdi-home"
                   type="text"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                 ></v-text-field>
                 <v-text-field 
                   clearable
                   v-model="phone"
                   label="Phone"
                   prepend-icon="mdi-phone"
                   type="text"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                 >
                 </v-text-field>
              </v-form>
              <br>
               <v-btn  @click="registerUser(username,password,phone,customer_address,customer_name)" color="grey darken-2" rounded large>Enter</v-btn>
             </v-card-text>
           </v-card>
</div>
</template>
<script>
export default {
      data: ()=> ({
      username: '',
      password: '',
      response:'Hurray! Now Try Log in',
      snackset: false,
      customer_address:'',
      customer_name:'',
      phone:'',
      widthval: "600px",
      winWidth: 0

  }),
  watch: {
    winWidth: function(){
        console.log("inside watch func",this.winWidth,this.widthval)
        if(this.winWidth < 750){
          console.log("if",this.winWidth)
          this.widthval = "350px"
        }
        else{
            this.widthval ="600px"
        }
    }
    },
  mounted(){
    this.onResize()
  },
  methods:  {
    prependClicked() {
      console.log('prepend clicked')
    },
    appendClicked() {
      console.log('append clicked', this.username)
    },
    registerUser()
    {
        let user_login = {'username':this.username,'password':this.password}
        let user_details = {
            'address':this.customer_address,
            'username':this.customer_name,
            'phone_number': parseInt(this.phone),
            'email': this.username
    }
    console.log({user_login,user_details})
    this.$store.dispatch('addUserLogin',{ user_login, user_details} )
    if(this.$store.error == null){
    this.snackset = true
    }
    else{
      this.response = this.$store.error
      this.snackset= true
    }
  },
  onResize(){
      this.winWidth = window.innerWidth
      console.log(this.winWidth)
    }
  }
}
</script>