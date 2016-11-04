!(function (App) {

  if (typeof App.actions === 'undefined') {
    throw new Error('requirement App.actions not available for App.reducers!');
  }

  App.reducer = function (state, action) {

    switch (action.type) {

      case App.actions.REQUEST_SET:
        return Object.assign({}, state, {
          isFetching: true
        });

      case App.actions.CARDS_REQUEST_ERROR:
        return Object.assign({}, state, {
          isFetching: false
        });

      case App.actions.RECEIVE_CARDS:
        return Object.assign({}, state, {
          isFetching: false,
          cards: action.cards
        });

      default:
        return state;
    }
  };

})(App);
