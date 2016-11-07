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

      case App.actions.UPDATE_SEARCH_PARAM:
        var updateFilters = {};
        updateFilters[action.updateKey] = action.value;

        return Object.assign({}, state, {
          searchFilters: Object.assign({}, state.searchFilters, updateFilters)
        });

      default:
        return state;
    }
  };

})(App);
