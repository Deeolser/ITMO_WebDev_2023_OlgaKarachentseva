<script lang="ts" setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import {ref} from 'vue';
import {useLazyQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import {useUserStore} from '@/store/userStore';

const isSuccess = ref(false);
const userStore = useUserStore();

const {load, onResult, onError} = useLazyQuery(gql`query GetUserWithCredentials($username: String!, $password: String!) {
  users(where: {name: {_eq: $username}, password: {_eq: $password}}) {
      name
      password
      id
    }
  }
`);

onResult((result) => {
  console.log('result', result);
  const usersData = result.data?.users;
  isSuccess.value = usersData?.length === 1;
  if (isSuccess.value) {
    userStore.setupUser(usersData[0]);
  }
});
onError((error) => {
  console.log(error);
});

const onLogin = (dto: any) => {
  load(null, dto);
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
    <div>You have been successfully logged in</div>
    <router-link :to="ROUTES.INDEX">
      Home
    </router-link>
  </div>
</template>