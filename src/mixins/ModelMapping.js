import moment from 'moment';

export default {
  methods: {
    getCard(serverCard) {
      Object.assign(serverCard, {
        isVisible: moment().diff(moment(serverCard.date), 'days') >= 0,
      });
      return serverCard;
    },
  },
};
