!(function (App) {

  if (typeof App.actions === 'undefined') {
    throw new Error('requirement App.actions not available for App.Search!');
  }

  if (typeof App.store === 'undefined') {
    throw new Error('requirement App.store not available for App.Search!');
  }

  var buildDynamicFilter = function (options, cards) {

    var filters = document.createElement('div');

    var title = document.createElement('div');
    title.innerHTML = options.title;
    filters.appendChild(title);

    options.selectionsKeyValuePairs.forEach(function (pair) {
      var checkboxContainer = document.createElement('label');

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = pair.value;
      checkbox.addEventListener('click', function () {

        App.store.dispatch(
          App.actions.updateSearchParam('__includes__' + option.cardField, values)
        );
        App.Api.getSet('KLD');
      });

      var text = document.createTextNode(pair.label);
      checkboxContainer.appendChild(text);

      filters.append(checkboxContainer);
    });

    return filters;
  };

  App.DynamicFilter = {
    bindTo: function (containerId, options) {
      var container = document.getElementById(containerId);

      var optionsDefaulted = Object.apply({
        title: 'Unnamed Filter',
        cardField: null
      }, options);

      if (typeof optionsDefaulted.cardField === 'undefined') {
        throw new Error('App.DynamicFilter bound to ' + containerId + ' not given required cardField!');
      }

      App.store.subscribe(function () {
        var cards = App.store.getState().cards;
        if (cards) {
          container.appendChild(buildDynamicFilter(optionsDefaulted, cards));
        }
      });
    }
  };
})(App);
