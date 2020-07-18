<template>
<div>
  <div class="text-center ma-2">
          <v-snackbar :width="60" max-height="20" v-model="snackset" :timeout="3000" top color="success">
            <span class="ml-5">{{response}}</span>
            <v-icon flat class="ml-12" small color="white" @click="snackset = false">Close</v-icon>
          </v-snackbar>
          </div>
           <v-card v-resize="onResize" dark color="dark" elevation-24 style="padding: 20px;" :width="widthval">
             <v-card-text>
               <h4 class=" text-white text-center display-2 font-weight-bold">Login</h4>
               <br>
               <v-form>
                 <v-text-field 
                   clearable
                   v-model="username"
                   label="Username"
                   prepend-icon="mdi-face"
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
              </v-form>
              <br>
               <v-btn  @click="login(username,password)" color="grey darken-2" rounded large>Enter</v-btn>
             </v-card-text>
           </v-card>
</div>
</template>
<script>
export default {
      data: ()=> ({
      username: '',
      password: '',
      response:'',
      snackset: false,
      widthval: "600px",
      winWidth:0
  }),
    methods: {
    prependClicked() {
      console.log('prepend clicked');
    },
    appendClicked() {
      console.log('append clicked', this.username);
    },
    login(username,password){
      this.$store.dispatch("login",{'username':username,'password':password})
      console.log(this.$store.state.error)
      this.$store.dispatch('toolbar',{'val' : false})
    },
    onResize(){
      this.winWidth = window.innerWidth
      console.log(this.winWidth)
    }
  },
  mounted(){
    this.onResize()
  },
  watch:{
    '$store.state.user_val': function(){
      if (this.$store.state.user_val)
      {
        this.response = "Welcome Back Dear Customer!"
        this.snackset =true
      }
    },
    '$store.state.error' : function() {
       if (this.$store.state.error == "auth/wrong-password")
      {
        this.response = "Wrong Passowrd Try Again!"
        this.snackset =true
      }
     else if(this.$store.state.error == "auth/user-not-found")
     {
        this.response = "Wrong Email If not Registered Please Register!"
        this.snackset =true
      }
    else{
      console.log("found nothing")
    }
    },
    winWidth: function(){
        console.log("inside watch func")
        if(this.winWidth < 750){
          this.widthval = "350px"
        }
        else{
            this.widthval ="600px"
        }
      }
    }
  }
</script>