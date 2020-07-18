import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/fb'
import firebase from 'firebase/app'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
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
  },
  mutations: {
    productfb:state => {

      db.collection('product').onSnapshot(res => {
        const changes = res.docChanges()
        changes.forEach(change => {
          if(change.type === 'added'){
            if(state.check_products.includes(change.doc.id) === false ){
            state.products.push({
              ...change.doc.data(),
              id: change.doc.id,
              count: 1
            }) 
            state.check_products.push(change.doc.id)}
          }
        })
        })
      console.log(state)
    },
    cart_product_add(state,payload){
        state.products.forEach(product => {
          if(payload.pr_title === product.product_name)
          {
            if(state.check_cart.includes(payload.pr_title) === false){
              product.count = payload.count
              state.cart_product.push({
              ...product
            })}
            state.check_cart.push(payload.pr_title)
          }
        })
    },
    removefromcart(state,payload){
        state.cart_product.forEach(product => {
        if(payload.pr_title === product.product_name)
        {
           let ind = state.cart_product.findIndex(x => x.product_name === payload.pr_title)
           let ind2 = state.check_cart.findIndex(x => x === payload.pr_title)
           state.cart_product.splice(ind)
           state.check_cart.splice(ind2)
        }
      })

    },
    placeorder(state,payload){
      payload.forEach(pay => {
        state.orders.push( 
          pay
        )
      })
        console.log(state.orders)
          let batch = db.batch()
          let currentdate = new Date()
          let date = "Orderat" + currentdate.getDate() + "-"
          + (currentdate.getMonth()+1)+ "-" 
          + currentdate.getFullYear()+ "at"  
          + currentdate.getHours()+":"  
          + currentdate.getMinutes()+":" 
          + currentdate.getSeconds()
          state.orders.forEach(product => {
            console.log(state.uid,date)
            let ref = db.collection("UserData").doc(state.uid).collection(date).doc()
            batch.set(ref,product)
            console.log("batch set")
          })
          db.collection('UserData').doc(state.uid).update({
            Orders : firebase.firestore.FieldValue.arrayUnion(date)
          })
          console.log("order id pushed",date)
          batch.commit().catch(error =>{
            console.log(error)
          })
          console.log("trans complete")
          state.orders=[]
          
    },
    emptycart(state){
      state.cart_product=[]
      state.check_cart=[]
    },
    login(state,payload){
      console.log('inside login',payload)
       state.uid = payload.user.uid
       console.log(state.uid)
       state.user_val = true
       console.log(state.user_val)
       db.collection("UserData").where("UID","==",state.uid).get().then(querySnapshot => {
        console.log("querySnapshot",querySnapshot)
        querySnapshot.forEach(doc => {
          console.log(doc.data())
            state.account_details.push({
              ...doc.data(),
            }) 
        })
        let orders =[]
        console.log(state.account_details.toString())
        state.account_details.forEach(account =>{
          orders = account.Orders
        })
        orders.forEach(order => {
          let data1 = []
          db.collection('UserData').doc(state.uid).collection(order).get().then(querySnapshot => {
            console.log("This is query snapshot "+order,querySnapshot)
            querySnapshot.forEach(doc => {
               data1.push(doc.data())
               console.log(data1)
            })
            console.log(window.sessionStorage)
          }).catch(error =>
            {
              console.log(error)
            })
            console.log(data1)
            state.orders.push(data1)
        })
        console.log(state.orders)
        }).catch(error =>{
          console.log(error)
        })
        
     },
    login_error(state,payload){
        state.error = payload.code
        console.log(state.error)
    },
    error_reset(state){
      state.error = null
      console.log("the error reset",state.error)
    },
    get_account_details(state){
      console.log(state.uid)
    },
    toolbar(state,payload){
      state.val =payload.val
     
    }
  
  },
  actions: {
    productfb:context =>{
      context.commit('productfb')
    },
    cart_product_add(context,pr_ti){
      context.commit('cart_product_add',pr_ti)

    },
    removefromcart(context,payload){
      context.commit('removefromcart',payload)
    },
    placeorder(context,payload){
      context.commit('placeorder',payload)

    },
    emptycart(context){
      context.commit('emptycart')
    },
    login(context,payload){
      context.commit('error_reset')
      firebase.auth().signInWithEmailAndPassword(payload.username, payload.password).then(data => {
        context.commit('login',data)
      }).
      catch(error =>{
        context.commit('login_error',error)
    })
    },
    error_reset(context){
      context.commit('error_reset')
    },
  addUserLogin(context,payload){
  firebase.auth().createUserWithEmailAndPassword(payload.user_login.username, payload.user_login.password).then(data => {
      let uid = data.user.uid
      Object.assign(payload.user_details,{'UID' : uid})
      console.log(payload.user_details)
      context.dispatch("addUserDetails",payload.user_details)
    }).catch(error =>{
      console.log("the error", error.code)
      context.commit('login_error',error.code)
  })
  },
  addUserDetails(context,payload){
      db.collection('UserData').doc(payload.UID).set({
        ...payload,
        Orders : []
      }
      ).catch( 
        errors => {
          context.commit('login_error',errors)
        }
      )
  },
  get_account_details(context){
    context.commit('get_account_details')
  },
  test(context){
    context.commit("test")
  },
  logout(state){
    state.val = true
    firebase.auth().signOut().catch(error =>{
      console.log(error)
    }) 
  },
  toolbar(context,payload){
    context.commit('toolbar',payload)
  }
}, 
  modules: {

  },
plugins:[createPersistedState({
    storage: window.sessionStorage,
    path:['products',
   'cart_product',
    'check_products',
    'check_cart',
    'orders',
    'user_val',
    'uid',
    'error',
    'account_details',
    'val']
})],

})
