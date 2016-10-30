!(function (App) {

  App.actions = {
    REQUEST_CARDS: 'REQUEST_CARDS',
    RECEIVE_CARDS: 'RECEIVE_CARDS'
  };


  App.actions.requestCards = function (setKey) {
    return {
      type: App.actions.REQUEST_CARDS,
      setKey: setKey
    };
  };

  App.actions.receiveCards = function (setKey, json) {
    return {
      type: App.actions.RECEIVE_CARDS,
      setKey: setKey,
      cards: json[setKey].cards
    };
  };

})(App);
