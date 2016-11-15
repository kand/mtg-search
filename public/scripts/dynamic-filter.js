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

    cards.map(options.fieldMapper).forEach(function (value) {
      var checkboxContainer = document.createElement('label');

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = value;
      checkbox.addEventListener('click', function () {
        var filterKey = '__includes__' + option.cardField;

        var currentValues = App.store.getState().searchFilters[filterKey];
        if (!Array.isArray(currentValues)) {
          currentValues = [];
        }

        if (this.checked && !currentValues.includes(this.value)) {
          currentValues.push(this.value);
        } else if (!this.checked && currentValues.includes(this.value)) {
          currentValues.splice(currentValues.indexOf(this.value), 1);
        }

        App.store.dispatch(
          App.actions.updateSearchParam('__includes__' + option.cardField, currentValues)
        );
        App.Api.getSet('KLD');
      });
      checkboxContainer.appendChild(checkbox);

      var text = document.createTextNode(value);
      checkboxContainer.appendChild(text);

      filters.append(checkboxContainer);
    });

    return filters;
  };

  App.DynamicFilter = {
    bindTo: function (containerInput, options) {

      var container;
      if (containerInput instanceof HTMLElement) {
        container = containerInput;
      } else if (typeof containerInput === 'string') {
        container = document.getElementById(containerId);
      } else {
        throw new Error('App.DynamicFilter container must be an ID string or an HTMLELement!');
      }

      var optionsDefaulted = Object.assign({
        title: 'Unnamed Filter',
        cardField: null,
        fieldMapper: function (card) {
// TODO : this is window, doesn't return proper field
// TODO : need to handle the case where this value is an array
          return card[this.cardfield];
        }
      }, options);

      if (typeof optionsDefaulted.cardField === 'undefined') {
        throw new Error('App.DynamicFilter not given required cardField!');
      }

      App.store.subscribe(function () {
        var cards = App.store.getState().cards;
        if (cards) {
          container.innerHTML = '';
          container.appendChild(buildDynamicFilter(optionsDefaulted, cards));
        }
      });
    }
  };
})(App);
