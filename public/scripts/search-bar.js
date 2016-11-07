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

  var buildColorFilters = function () {

    var filters = document.createElement('div');

    var colors = ['W', 'U', 'B', 'R', 'G'];
    colors.forEach(function (color) {
      var colorCheckboxContainer = document.createElement('label');

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = color;
      checkbox.addEventListener('click', function () {
        var colors = Array.from(filters.getElementsByTagName('input'))
          .reduce(function (include, ele) {
            if (ele.checked) {
              include.push(ele.value);
            }
            return include;
          }, []);

        App.store.dispatch(
          App.actions.updateSearchParam('__includes__colorIdentity', colors)
        );
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

      container.appendChild(buildColorFilters());

      App.store.subscribe(function () {

        var cards = App.store.getState().cards;
        if (cards) {
          searchResultCount.innerHTML = cards.length + ' Results';
        }
      });
    }
  };

})(App);
