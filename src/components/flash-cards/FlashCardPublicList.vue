<template>
  <section class="section">
    <div class="container box">
      <div class="flash-cards">
        <header-element title="Flash Cards" :subTitle="title" color="default"></header-element>
      </div>
      <flash-messages :error="error"></flash-messages>
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <div class="column is-one-third" v-for="card in cards">
            <div class="card flash-card">
              <div class="card-content card-click" @click="toggleCard(card)">
                <p v-if="!card.showAnswer">
                  {{ card.question }}
                </p>
                <p v-else>
                  {{ card.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import moment from 'moment';
  import HeaderElement from '../elements/HeaderElement';
  import server from '../../tools/server';
  import FlashMessages from '../elements/FlashMessages';

  export default {
    components: {
      FlashMessages,
      HeaderElement },
    name: 'FlashCardPublicList',
    methods: {
      toggleCard(card) {
        this.$set(card, 'showAnswer', !card.showAnswer);
      },
    },
    mounted() {
      server.makeRequest('get', 'lists', {}).then(({ data: items }) => {
        const item = items.find(list => list.id === this.$route.params.id);
        this.cards = item.cards.filter(card => moment(card.date).diff(moment()) < 0);
        this.title = item.title;
      }).catch(() => {
        this.error = 'Impossible de récupérer vos cartes. Veuillez réessayer plus tard';
      });
    },
    data() {
      return {
        cards: [],
        error: null,
        title: '',
        nbVisibles: 0,
      };
    },
  };
</script>
