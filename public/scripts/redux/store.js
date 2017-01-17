!(function (App) {

  if (typeof App.reducer === 'undefined') {
    throw new Error('requirement App.reducer not available for App.store!');
  }

  var currentState = {
    searchFilters: []
  };
  var listeners = [];

  var getState = function () {
    return Object.assign({}, currentState);
  };

  App.store = {
    dispatch: function (action) {
      currentState = App.reducer(getState(), action);

      listeners.forEach(function (listener) {
        listener();
      });
    },

    getState: getState,

    subscribe: function (listener) {
      var index = listeners.push(listener);
      return function unsubscribe () {
        listeners.splice(index, 1);
      };
    }
  };

})(App);
