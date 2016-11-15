!(function (App) {

  if (typeof App.actions === 'undefined') {
    throw new Error('requirement App.actions not available for App.Search!');
  }

  if (typeof App.store === 'undefined') {
    throw new Error('requirement App.store not available for App.Search!');
  }

  if (typeof App.DynamicFilter === 'undefined') {
    throw new Error('requirement App.DynamicFilter not available for App.Search!');
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

      App.store.dispatch(App.actions.updateSearchParam('__allText', this.value));
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

      var colorFilters = document.createElement('div');
      App.DynamicFilter.bindTo(colorFilters, {
        title: 'Color',
        cardField: 'colorIdentity'
      });
      container.appendChild(colorFilters);

      App.store.subscribe(function () {

        var cards = App.store.getState().cards;
        if (cards) {
          searchResultCount.innerHTML = cards.length + ' Results';
        }
      });
    }
  };

})(App);
