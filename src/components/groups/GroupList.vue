<template>
  <div class="groups">
    <header-element title="Mes classes" subTitle="Gestion des classes">
    </header-element>
    <div class="content">
      <flash-messages :error="error" :success="success"></flash-messages>
      <table class="table is-striped">
        <thead>
        <tr>
          <th>Nom</th>
          <th>Nombre de cartes</th>
          <th>Visibles</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
          <td v-if="currentItemModification === item">
            <input type="text" class="input" placeholder="Nom de votre classe" v-model="item.title"/>
          </td>
          <td v-else>
            <router-link :to="{ name: 'FlashCardList', params: { id: item.id } }">{{ item.title }}</router-link>
          </td>
          <td>{{ item.cards.length }}</td>
          <td>{{ getNbVisibles(item) }}</td>
          <td v-if="currentItemModification === item">
            <p>
              <button class="button is-primary" @click="applyItemModification">Modifier</button>
              <button class="button" @click="cancelItemModification">Annuler</button>
            </p>
          </td>
          <td v-else>
            <router-link class="icon has-text-primary" :to="{ name: 'AddFlashCard', params: { id: item.id } }"><i class="fa fa-plus"></i></router-link>
            <span class="icon has-text-info" @click="editItem(item)"><i class="fa fa-pencil"></i></span>
            <span class="icon has-text-danger" @click="deleteItem(item)"><i class="fa fa-times"></i></span>
          </td>
        </tr>
        </tbody>
        <tfoot v-if="showAddGroupForm">
        <tr>
          <td><input type="text" class="input" placeholder="Nom de votre classe" v-model="newGroupName"/></td>
          <td></td>
          <td></td>
          <td>
            <p>
              <button class="button is-primary" @click="addGroup">Ajouter</button>
              <button class="button" @click="showFooterForm(false)">Annuler</button>
            </p>
          </td>
        </tr>
        </tfoot>
      </table>
      <button class="button is-info is-pulled-right" v-if="!showAddGroupForm" @click="showFooterForm(true)">Ajouter</button>
    </div>
  </div>
</template>

<script>
  import HeaderElement from '../elements/HeaderElement';
  import server from '../../tools/server';
  import FlashMessages from '../elements/FlashMessages';
  import ModelMapping from '../../mixins/ModelMapping';

  export default {
    components: { FlashMessages, HeaderElement },
    title: 'GroupList',
    mixins: [ModelMapping],
    methods: {
      showFooterForm(isShowed) {
        this.newGroupName = '';
        this.showAddGroupForm = isShowed;
      },
      addGroup() {
        if (this.newGroupName.length > 0) {
          server.makeRequest('post', 'lists', { title: this.newGroupName }).then(({ data: item }) => {
            this.items.push({
              id: item.id,
              title: this.newGroupName,
              cards: [],
            });
          }).catch(() => {
            this.error = 'Impossible d\'ajouter une classe. Veuillez réessayer plus tard.';
          }).then(() => {
            this.showFooterForm(false);
          });
        }
      },
      deleteItem(item) {
        server.makeRequest('delete', 'lists', { id: item.id }).then(() => {
          this.items.splice(this.items.indexOf(item), 1);
          this.success = 'Classe supprimée avec succès';
        }).catch(() => {
          this.error = 'Impossible de supprimer la classe. Veuillez réessayer plus tard.';
        });
      },
      editItem(item) {
        this.currentItemModification = item;
      },
      applyItemModification() {
        const { id, title } = this.currentItemModification;
        server.makeRequest('patch', 'lists', { id, title }).then(() => {
          this.success = 'Classe modifiée avec succès';
        }).catch(() => {
          this.error = 'Impossible de modifier votre classe. Veuillez réessayer plus tard.';
        }).then(() => {
          this.currentItemModification = null;
        });
      },
      cancelItemModification() {
        this.currentItemModification = null;
      },
      getNbVisibles(item) {
        return item.cards.filter(card => card.isVisible).length;
      },
    },
    mounted() {
      server.makeRequest('get', 'lists').then(({ data: items }) => {
        items.forEach(item => Object.assign(item, {
          cards: item.cards.map(card => this.getCard(card)),
        }));
        this.items = items;
      }).catch(() => {
        this.error = 'Impossible de récupérer vos classes. Veuillez réessayer plus tard.';
      });
    },
    data() {
      return {
        showAddGroupForm: false,
        newGroupName: '',
        currentItemModification: null,
        items: [],
        error: null,
        success: null,
      };
    },
  };
</script>
