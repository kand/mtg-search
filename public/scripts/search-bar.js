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

  var buildFilters = function () {

    var filters = document.createElement('div');

    var colors = ['W', 'U', 'B', 'R', 'G'];
    colors.forEach(function (color) {
      var colorCheckboxContainer = document.createElement('label');

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('click', function () {
        App.store.dispatch(App.actions.updateSearchParams({
          __includes__colorIdentity: color
        }));
        App.Api.getSet('KLD');
      });
      colorCheckboxContainer.appendChild(checkbox);

      var text = document.createTextNode(color);
      colorCheckboxContainer.appendChild(text);

      filters.appendChild(colorCheckboxContainer);
    });

    return filters;
  };

  var buildSearchBar = function () {

    var searchInput = document.createElement('input');
    searchInput.placeholder = 'Search for cards...';
    searchInput.addEventListener('keyup', function () {

      App.store.dispatch(App.actions.updateSearchParams({
        __allText: this.value
      }));
      App.Api.getSet('KLD');
    });

    return searchInput;
  };

  App.Search = {
    bindTo: function (containerId) {
      var container = document.getElementById(containerId);
      container.appendChild(buildSearchBar());

      var searchResultCount = buildSearchResultCount();
      container.appendChild(searchResultCount);

      container.appendChild(buildFilters());

      App.store.subscribe(function () {

        var cards = App.store.getState().cards;
        if (cards) {
          searchResultCount.innerHTML = cards.length + ' Results';
        }
      });
    }
  };

})(App);
