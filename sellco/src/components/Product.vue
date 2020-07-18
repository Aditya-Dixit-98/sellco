<template>
    <div> 
          <div class="text-center ma-2">
          <v-snackbar :width="60" max-height="20" v-model="snackset" :timeout="3000" top color="success">
            <span class="ml-5">Awesome! Product added to Cart</span>
            <v-icon flat class="ml-10" small color="white" @click="snackset = false">Close</v-icon>
          </v-snackbar>
          </div>
          <v-row class="ma-2" no-gutters>
          <v-switch v-model="starproducts" class="mx-2" label="Star" v-on:change="addchip()"></v-switch>
              <v-chip v-show="stat"  close class="ma-2 mt-4" color="orange" text-color="white" @click:close= "close" close-icon="mdi-delete" ><v-icon>mdi-star</v-icon>Premium</v-chip>
          </v-row>
          
            <v-container fluid>
                <v-row>
                  <v-col cols="12"
                  align-center
                  >
                  <v-row justify="space-around" >
                    <v-card
                      v-for="product in this.$store.state.products"
                      :key="product.product_name"
                      max-width="350"
                      class="ma-3"
                    >
                          <v-img
                            class="align-end"
                            height="200px"
                            :src="product.product_image"
                          >
                              <v-card-title>{{product.product_name}}</v-card-title>
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey ligthen-5"></v-progress-circular>
                            </v-row>
                          </template>
                          </v-img>

                          <v-card-subtitle class="pb-0"> Cost {{product.cost}}</v-card-subtitle>

                          <v-card-text class="text--primary">
                          <div>{{product.product_name}}</div>

                          <div>{{product.product_description}}</div>
                          </v-card-text>

                          <v-card-actions>
                          <v-container>
                        <v-row no-gutters>
                            <v-text-field 
                            solo
                            dense
                            readonly
                            v-model ="product.count"
                            v-on:click:append="(product.count > 0)?product.count+=1:product_count"
                            v-on:click:prepend-inner= "(product.count>1)?product.count-=1:product_count"
                            prepend-inner-icon="mdi-minus"
                            append-icon="mdi-plus"
                            class="shrink"
                            >
                            </v-text-field>
                            <div>
                             <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="orange"
                                  rounded
                                  justify-end
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="addtocart(product.product_name,product.count)"
                                >
                              <v-icon align-center>mdi-cart</v-icon>
                              </v-btn>
                            </template>
                            <span>Add to Cart</span>
                            </v-tooltip>
                            </div>
                              </v-row>
                          </v-container>
                          </v-card-actions>
                          </v-card>
                </v-row>
                </v-col>
                </v-row>
              </v-container>
    </div>
</template>
<script>
export default {
    name: 'Products',
    computed:{
   },
    props:{
      source: String,
    },
    components:{
    },
    created () {
      console.log(this.$store.state.products)
      this.$store.dispatch('productfb')
      this.$vuetify.theme.dark = true
    },
    data: () => ({
    item: "Premium",
    starproducts: false,
    stat: false,
    set1: false,
    snackset: false
  }),
  watch:{

  },
  methods: {
      addchip(){
        if(this.starproducts == true){
          this.stat= true
        }
        },
      close(){
        this.starproducts = false
        this.stat= false
      },
      addtocart(pr_title,count){
      let payload = { 'pr_title': pr_title, "count" : count}
      this.$store.dispatch("cart_product_add",payload )
      this.snackset = true 
      },
  }
};
</script>
<style scoped>
.v-text-field{
      width: 100px;
}

</style>