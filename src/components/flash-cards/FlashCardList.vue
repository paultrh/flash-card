<template>
  <div class="flash-cards">
    <header-element :title="title" :subTitle="`${nbVisibles} carte(s) visible(s)`" color="default">
      <router-link :to="{ name: 'AddFlashCard', params: { id: $route.params.id } }" class="button is-info is-pulled-right">Nouvelle carte</router-link>
    </header-element>
    <br />
    <flash-messages :success="success" :error="error"></flash-messages>
    <br />
    <p class="card-link">
      Lien public: <router-link :to="{ name: 'FlashCardPublicList', params: { id: $route.params.id } }">{{ publicURL }}</router-link>
    </p>
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="card in cards">
          <div class="card flash-card">
            <header class="card-header">
              <p :class="{ 'card-header-title': true, 'has-text-success': isCardVisible(card) }">
                {{ visibleText(card) }}
              </p>
            </header>
            <div class="card-content card-click" @click="toggleCard(card)">
              <div class="content is-unselectable has-text-centered">
                <p v-if="!card.showAnswer">
                  {{ card.question }}
                </p>
                <p v-else>
                  {{ card.answer }}
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="deleteCard(card)">Supprimer</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    name: 'FlashCardList',
    methods: {
      isCardVisible(card) {
        return moment().diff(moment(card.date)) >= 0;
      },
      visibleText(card) {
        return !this.isCardVisible(card) ? `Visible dans ${moment(card.date).diff(moment(), 'days')} jour(s)` : 'Visible';
      },
      toggleCard(card) {
        this.$set(card, 'showAnswer', !card.showAnswer);
      },
      deleteCard(card) {
        server.makeRequest('delete', 'cards', {
          list_id: this.$route.params.id,
          card_id: card.id,
        }).then(() => {
          this.success = 'Votre carte a été supprimée avec succès';
          this.cards.splice(this.cards.indexOf(card), 1);
        }).catch(() => {
          this.error = 'Impossible de supprimer votre carte. Veuillez réessayer plus tard';
        });
      },
    },
    computed: {
      publicURL() {
        return window.location.href.replace('cartes', 'public');
      },
    },
    mounted() {
      server.makeRequest('get', 'lists', {}).then(({ data: items }) => {
        const item = items.find(list => list.id === this.$route.params.id);
        this.cards = item.cards.sort(card => moment(card.date).diff(moment(), 'days'));
        this.title = item.title;
        this.nbVisibles = item.cards.filter(card => this.isCardVisible(card)).length;
      }).catch(() => {
        this.error = 'Impossible de récupérer vos cartes. Veuillez réessayer plus tard';
      });
    },
    data() {
      return {
        cards: [],
        success: null,
        error: null,
        title: '',
        nbVisibles: 0,
      };
    },
  };
</script>

<style>
  .card-click {
    cursor: pointer;
  }
  .flash-card {
    margin: 10px;
  }
  .card-link {
    display: block;
    padding: 25px 25px 50px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
</style>
