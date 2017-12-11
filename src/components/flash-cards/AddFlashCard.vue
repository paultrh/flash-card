<template>
  <div class="add-flash-card">
    <header-element title="Ajouter une carte" subTitle="Carte de question/réponse" color="info"></header-element>
    <br />
    <flash-messages :success="success" :error="error"></flash-messages>
    <form @submit.prevent="addCard">
      <div class="field">
        <label class="label">Date de visibilité</label>
        <flat-pickr v-model="card.date" :config="dateConfig"></flat-pickr>
      </div>
      <div class="field">
        <label class="label">Question</label>
        <div class="control">
          <textarea class="textarea" placeholder="Votre question" v-model="card.question" required></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Réponse</label>
        <div class="control">
          <textarea class="textarea" placeholder="Votre réponse" v-model="card.answer" required></textarea>
        </div>
      </div>
      <button class="button is-primary is-pulled-right">Ajouter</button>
    </form>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import { French } from 'flatpickr/dist/l10n/fr'; // eslint-disable-line
  import HeaderElement from '../elements/HeaderElement';
  import 'flatpickr/dist/flatpickr.css'; // eslint-disable-line
  import server from '../../tools/server';
  import FlashMessages from '../elements/FlashMessages';

  export default {
    name: 'AddFlashCard',
    components: { FlashMessages, HeaderElement, flatPickr },
    methods: {
      addCard() {
        server.makeRequest('post', 'cards', {
          ...this.card,
          list_id: this.$route.params.id,
        }).then(() => {
          this.$router.push({ name: 'FlashCardList', params: this.$router.params });
        }).catch(() => {
          this.error = 'Une erreur est survenue. Veuillez réessayer plus tard';
        });
      },
    },
    data() {
      return {
        card: {
          date: null,
          question: '',
          answer: '',
        },
        dateConfig: {
          wrap: true, // set wrap to true when using 'input-group'
          altFormat: 'l j F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          locale: French, // locale for this instance only
        },
        error: null,
        success: null,
      };
    },
  };
</script>
