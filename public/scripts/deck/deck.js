!(function (App) {

  App.Deck = {
    build: function () {
      return {
        cards: []
      };
    },
    addCard: function (deck, card) {
      var copy = JSON.parse(JSON.stringify(deck));
      copy.cards.push(card);
      return copy;
    }
  };

})(App);
