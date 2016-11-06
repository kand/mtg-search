!(function (App) {

  App.actions = {
    REQUEST_SET: 'REQUEST_SET',
    CARDS_REQUEST_ERROR: 'CARDS_REQUEST_ERROR',
    RECEIVE_CARDS: 'RECEIVE_CARDS',
    UPDATE_SEARCH_PARAMS: 'UPDATE_SEARCH_PARAMS',
    TOGGLE_SEARCH_PARAMS: 'TOGGLE_SEARCH_PARAMS',
  };

  App.actions.updateSearchParams = function (params) {
    return {
      type: App.actions.UPDATE_SEARCH_PARAMS,
      updatedSearchParams: params
    };
  };

  App.actions.toggleSearchParams = function (keys) {
    return {
      type: App.actions.TOGGLE_SEARCH_PARAMS,
      toggleSearchParams: keys
    }
  };

  App.actions.requestCards = function (setKey) {
    return {
      type: App.actions.REQUEST_SET,
      setKey: setKey
    };
  };

  App.actions.cardsRequestError = function (setKey) {
    return {
      type: App.actions.CARDS_REQUEST_ERROR,
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
