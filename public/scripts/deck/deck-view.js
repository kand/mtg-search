!(function (App) {

  if (!App.Deck) {
    throw new Error('App.DeckView requires App.Deck, dependecy missing at load time.');
  }

  App.DeckView = {
    build: function (deck) {
      var deckElement = document.createElement('ol');

      deck.cards
        .map(function (card) {
          var cardElement = document.createElement('li');
          cardElement.innerHTML = card.name;
          return cardElement;
        })
        .forEach(function (cardElement) {
          deckElement.appendChild(cardElement);
        });

      return deckElement;
    },
    addCard: function (deck, card) {
      var deck = App.Deck.addCard(deck, card);
      var deckElement = App.DeckView.build(deck);
      return deckElement;
    }
  };
})(App);
