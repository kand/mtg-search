!(function (App) {

  if (typeof App.actions === 'undefined') {
    throw new Error('requirement App.actions not available for App.Table!');
  }

  if (typeof App.store === 'undefined') {
    throw new Error('requirement App.store not available for App.Table!');
  }

  var buildTableHead = function (tableElement, columns) {
    var thead = document.createElement('thead');

    var searchRow = document.createElement('tr');

    var searchInput = document.createElement('input');
    var searchResultCount = document.createElement('span');
    searchInput.placeholder = 'Search for cards...';
    searchInput.addEventListener('keyup', function () {

      var params = {};
      if (this.value) {
        params.__allText = this.value;
      }

      App.Api.getSet('KLD', params);
    });
    searchRow.appendChild(searchInput);
    searchRow.appendChild(searchResultCount);

    thead.appendChild(searchRow);

    var columnLabels = document.createElement('tr');
    columns.forEach(function (column) {
      var th = document.createElement('th');

      th.innerHTML = column.label;

      if (column.sorts) {
        var sorts = document.createElement('button');
        sorts.classList.add('fa', 'fa-sort');
        sorts.addEventListener('click', function () {
          var currentSort = parseInt(this.dataset.sortDirection, 10);
          sorts.classList.remove('fa-sort', 'fa-sort-asc', 'fa-sort-desc');

          if (!currentSort) {
            this.dataset.sortDirection = 1;
            sorts.classList.add('fa-sort-asc');

            App.Api.getSet('KLD', { __sort: column.sorts });
          } else if (currentSort === 1) {
            sorts.classList.add('fa-sort-desc');
            this.dataset.sortDirection = -1;

            App.Api.getSet('KLD', { __sort: '-' + column.sorts });
          } else {
            sorts.classList.add('fa-sort');
            this.dataset.sortDirection = 0;

            App.Api.getSet('KLD');
          }

        });
        th.appendChild(sorts);
      }

      columnLabels.appendChild(th);
    });

    thead.appendChild(columnLabels);

    return thead;
  };

  var buildTableBody = function (cards, columns) {
    var tbody = document.createElement('tbody');

    cards.forEach(function (card) {
      var tr = document.createElement('tr');

      columns.forEach(function (column) {
        var td = document.createElement('td');
        td.innerHTML = typeof column.field === 'function' ? column.field(card) : card[column.field] || 'N/A';
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    return tbody;
  };

  var buildTable = function () {
    var table = document.createElement('table');

    var columns = [{
      label: 'Name',
      field: 'name',
      sorts: 'name'
    }, {
      label: 'Printings',
      field: function (card) {
        return card.printings.join(', ');
      }
    }, {
      label: '#',
      field: function (card) {
        return card.number ? card.number : 'N/A';
      }
    }, {
      label: 'Mana Cost',
      field: 'manaCost'
    }, {
      label: 'Text',
      field: 'text'
    }];

    table.appendChild(buildTableHead(table, columns));
    var tableBodyElement;
    App.store.subscribe(function () {

      var cards = App.store.getState().cards;
      if (cards) {
        if (tableBodyElement) {
          tableBodyElement.remove();
        }
        tableBodyElement = buildTableBody(cards, columns);
        table.appendChild(tableBodyElement);
      }
    });

    return table;
  }

  App.Table = {
    bindTo: function (containerId) {
      var container = document.getElementById(containerId);
      container.appendChild(buildTable());
    }
  };

})(App);
