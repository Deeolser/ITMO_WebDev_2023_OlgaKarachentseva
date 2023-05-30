<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';</script>
<template>
  <div>
    <RegistrationForm />
    <router-link :to="ROUTES.SIGNUP">
      Sign Up
    </router-link>
  </div>
</template>
<script>
</script>