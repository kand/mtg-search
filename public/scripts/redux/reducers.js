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

      case App.actions.UPDATE_SEARCH_PARAMS:
        return Object.assign({}, state, {
          searchFilters: Object.assign({}, state.searchFilters,
            action.updatedSearchParams)
        });

      case App.actions.TOGGLE_SEARCH_PARAMS:
        var newSearchFilters = Object.assign({}, state.searchFilters);
        action.toggleSearchParams.forEach(function (key) {
          if (typeof newSearchFilters[key] === 'undefined') {
            newSearchFilters[key] = true;
          } else {
            delete newSearchFilters[key];
          }
        });

        return Object.assign({}, state, {
          searchFilters: newSearchFilters
        });

      default:
        return state;
    }
  };

})(App);
