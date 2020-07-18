<template>
    <div>
        <Product/>  
    </div>
</template>
<script>
import Product from '@/components/Product'
export default {
  components:{
    Product
  },
 data:() => ({

 }),
 created(){
   this.$vuetify.theme.dark = true
 },
 computed:{
   
 }
}
</script>

<style scoped>
.v-text-field{
      width: 100px;
}

</style>