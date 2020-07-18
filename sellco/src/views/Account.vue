<template>
<div>
<p class="display-3 font-weight-light text-center pa-4">My Account</p>
<v-card class ="ma-3 rounded-lg" v-for="account in this.$store.state.account_details" :key="account.name">
    <v-text-field
              label="Name"
              v-model="account.username"
              dense
              readonly
              class=" pt-4 ma-3"
              >
              </v-text-field>
    <v-text-field
              label="E-mail"
              v-model="account.email"
              dense
              readonly
              class="ma-3"
              >
              </v-text-field>
    <v-text-field
              label="Address"
              v-model="account.address"
              dense
              readonly
              class="ma-3"
              >
              </v-text-field>
    <v-text-field
              label="Contact"
              v-model="account.phone_number"
              dense
              readonly
              class="ma-3"
              >
              </v-text-field>
    <v-text-field
              label="Registerd ID"
              v-model="account.UID"
              dense
              readonly
              class="ma-3"
              >
              </v-text-field>
    
</v-card>
<!--
-->

</div>
</template>
<script>
export default {
    data:() => ({

    }),
    methods:{
        fetch_acc(){
            this.$store.dispatch('get_account_details')
        }
    }
}
</script>