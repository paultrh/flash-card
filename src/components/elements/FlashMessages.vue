<template>
    <div>
      <article class="message is-danger" v-if="error">
        <div class="message-header">
          <p>Erreur</p>
        </div>
        <div class="message-body">
          {{ error }}
        </div>
      </article>
      <article class="message is-success" v-if="success">
        <div class="message-header">
          <p>Succès</p>
        </div>
        <div class="message-body">
          {{ success }}
        </div>
      </article>
    </div>
 </template>

 <script>
   export default {
     name: 'FlashMessages',
     props: {
       success: [String],
       error: [String],
     },
   };
 </script>
