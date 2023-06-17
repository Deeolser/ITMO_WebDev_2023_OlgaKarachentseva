<script setup lang='ts'>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import { ref } from 'vue';
import {useLazyQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';

const { load, onError, onResult } = useLazyQuery (gql`query GetUserWithCredentials ($username: String, $password: String) {
  user(where: {password: {_eq: $password}, name: {_eq: $username}}) {
    id
    name
    password
  }
}`);
onResult((result) => {
  console.log(result);
});
onError((error)=>{
  console.log(error);
});
const isSuccess = ref(false);
const onLogin = (dto: any) => {
  load(null,dto);
};

</script>
<template>
  <div v-if="!isSuccess">
    <RegistrationForm @login="onLogin" />
    <router-link :to="ROUTES.SIGNUP">
      Sign Up
    </router-link>
  </div>
  <div v-else>
    <div>You have been successfully login</div>
    <router-link :to="ROUTES.INDEX">
      Home
    </router-link>
  </div>
</template>
<script>
</script>