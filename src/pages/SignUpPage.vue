<script setup lang='ts'>
import { inject, ref } from 'vue';

import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';
import RegistrationForm from '@/components/RegistrationForm.vue';
import { useRouter } from 'vue-router';

const pb = inject(PROVIDE.PB);

const errors = ref([]);
const router = useRouter();
const onRegister = (dto) => {
  console.log('> SignUp Page - onRegister', dto);
  errors.value = [];
  if (!dto.password || dto.password.length === 0) {
    errors.value = ['Password required'];
  } else {
    pb.collection('users').create({
      username: dto.username,
      password: dto.password,
      passwordConfirm: dto.password,
    }).then((record) => {
      pb.authStore.save(record.id, record);
      console.log(' > SignUp Page - onRegister result =', record);
      if (window.confirm(`User created with ID: ${record.id}`)) {
        router.replace({ path: ROUTES.INDEX });
      }
    })
      .catch((error) => {
        const errorData = error.data.data;
        console.log('> SignUpPage -> onRegister: error = ');
        if (errorData) {
          for (const item in errorData) {
            const data = errorData[item];
            console.log('> item', item, data);
            errors.value.push(data.message);
          }
        } else {
          errors.value.push(error.message);
        }
      });
  }
};
</script>
<template>
  <div>
    <RegistrationForm
      :errors="errors"
      :registration="true"
      @register="onRegister"
    >
      <router-link :to="ROUTES.SIGNIN">
        Sign In
      </router-link>
    </registrationform>
  </div>
</template>
<script>
</script>