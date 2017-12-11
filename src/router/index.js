import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/dashboard/Dashboard';
import GroupList from '@/components/groups/GroupList';
import AddFlashCard from '@/components/flash-cards/AddFlashCard';
import FlashCardList from '@/components/flash-cards/FlashCardList';
import FlashCardPublicList from '@/components/flash-cards/FlashCardPublicList';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '/',
          name: 'GroupList',
          component: GroupList,
        },
        {
          path: '/:id/carte/ajouter',
          name: 'AddFlashCard',
          component: AddFlashCard,
        },
        {
          path: '/cartes/:id',
          name: 'FlashCardList',
          component: FlashCardList,
        },
      ],
    },
    {
      path: '/public/:id',
      name: 'FlashCardPublicList',
      component: FlashCardPublicList,
    },
  ],
});
