!(function (App) {

  if (typeof App.actions === 'undefined') {
    throw new Error('requirement App.actions not available for App.Search!');
  }

  if (typeof App.store === 'undefined') {
    throw new Error('requirement App.store not available for App.Search!');
  }

  var buildSearchResultCount = function () {

    var searchResultCount = document.createElement('span');
    searchResultCount.innerHTML = '0 Results';

    return searchResultCount;
  };

  var buildSearchBar = function () {

    var searchInput = document.createElement('input');
    searchInput.placeholder = 'Search for cards...';
    searchInput.addEventListener('keyup', function () {

      var params = {};
      if (this.value) {
        params.__allText = this.value;
      }

      App.Api.getSet('KLD', params);
    });

    return searchInput;
  };

  App.Search = {
    bindTo: function (containerId) {
      var container = document.getElementById(containerId);
      container.appendChild(buildSearchBar());

      var searchResultCount = buildSearchResultCount();
      container.appendChild(searchResultCount);

      App.store.subscribe(function () {

        var cards = App.store.getState().cards;
        if (cards) {
          searchResultCount.innerHTML = cards.length + ' Results';
        }
      });
    }
  };

})(App);
