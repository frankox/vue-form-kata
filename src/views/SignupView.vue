<script lang="ts" setup>
  import { ref } from 'vue'

  const name = ref('')
  const email = ref('')
  const birthDate = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')
  const isUserCreated = ref(false)
  const errors = ref<Array<string>>([])

  const submit = () => {
    errors.value = []

    /** todo: implement validation
     ** name cannot be blank
     ** email cannot be blank
     ** email must be a valid format
     ** birthday cannot be blank
     ** birthday must be older than 18
     ** password must have 8 digits
     ** password Must have at least one uppercase letter, one lowercase letter, one number and one special character
     ** password and password confirmation must match
     */

    if (errors.value.length === 0) {
      // todo persist user

      const subject = 'Please validate your email'
      const url = `https://tinderella.com/validate?email=${email.value}`
      const body = `Click here to validate your email: <a href="${url}">validate</a>`
      sendEmail({
        from: 'no-reply@tinderella.com',
        to: email.value,
        subject: subject,
        body: body,
      })

      isUserCreated.value = true
    }
  }

  const sendEmail = ({
    from,
    to,
    subject,
    body,
  }: {
    from: string
    to: string
    subject: string
    body: string
  }): void => {
    console.log('Sending email')
    console.log('- From: ', from)
    console.log('- To: ', to)
    console.log('- Subject: ', subject)
    console.log('- Body: ', body)
    console.log('Email sent')
  }
</script>

<template>
  <h2>Sign up</h2>
  <template v-if="isUserCreated">
    <p>We sent you an email to {{ email }} to complete the registration process.</p>
    <button @click="isUserCreated = false">Restart</button>
  </template>
  <template v-else>
    <p>We promise you'll find the love of you life here.</p>
    <div v-if="errors.length" class="errors">
      <p>Oooops! Check these errors:</p>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <form @submit.prevent="submit">
      <label>
        Name
        <input v-model="name" data-test="name" type="text" />
      </label>
      <label>
        Email
        <input v-model="email" data-test="email" type="email" />
      </label>
      <label>
        Birthdate
        <input v-model="birthDate" data-test="birthday" type="date" />
      </label>
      <label>
        Password
        <input v-model="password" data-test="password" type="password" />
      </label>
      <label>
        Password confirmation
        <input v-model="passwordConfirmation" data-test="passwordConfirmation" type="password" />
      </label>
      <button data-test="submit" type="submit">💖 Sign up 💖</button>
    </form>
  </template>
</template>

<style scoped>
  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    display: block;
  }

  button {
    margin-top: 10px;
    font-size: 18px;
    padding: 8px 10px;
  }

  .errors {
    color: red;
  }
</style>
