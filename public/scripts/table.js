!(function (App) {

  var buildTableHead = function (tableElement, columns) {
    var thead = document.createElement('thead');

    var theadtr = document.createElement('tr');
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

            App.Api.getSets('http://0.0.0.0:3000/sets/KLD?__sort=' + column.sorts)
              .then(function (cardDataBySet) {
                tableElement.replaceChild(
                  buildTableBody(cardDataBySet, columns),
                  tableElement.querySelector('tbody')
                );
              });
          } else if (currentSort === 1) {
            sorts.classList.add('fa-sort-desc');
            this.dataset.sortDirection = -1;

            App.Api.getSets('http://0.0.0.0:3000/sets/KLD?__sort=-' + column.sorts)
              .then(function (cardDataBySet) {
                tableElement.replaceChild(
                  buildTableBody(cardDataBySet, columns),
                  tableElement.querySelector('tbody')
                );
              });
          } else {
            sorts.classList.add('fa-sort');
            this.dataset.sortDirection = 0;

            App.Api.getSets('http://0.0.0.0:3000/sets/KLD')
              .then(function (cardDataBySet) {
                tableElement.replaceChild(
                  buildTableBody(cardDataBySet, columns),
                  tableElement.querySelector('tbody')
                );
              });
          }

        });
        th.appendChild(sorts);
      }

      theadtr.appendChild(th);
    });

    thead.appendChild(theadtr);

    return thead;
  };

  var buildTableBody = function (cardDataBySet, columns) {
    var tbody = document.createElement('tbody');

    Object.keys(cardDataBySet).forEach(function (setAbbrv) {
      cardDataBySet[setAbbrv].cards.forEach(function (card) {
        var tr = document.createElement('tr');
        card.currentSet = setAbbrv;

        columns.forEach(function (column) {
          var td = document.createElement('td');
          td.innerHTML = typeof column.field === 'function' ? column.field(card) : card[column.field];
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });
    });

    return tbody;
  };

  App.Table = {
    build: function (cardDataBySet) {
      var table = document.createElement('table');

      var columns = [{
        label: 'Name',
        field: 'name',
        sorts: 'name'
      }, {
        label: 'Set',
        field: 'currentSet'
      }, {
        label: '#',
        field: function (card) {
          return card.number ? card.number : 'N/A';
        }
      }, {
        label: 'Mana Cost',
        field: 'manaCost'
      }];

      table.appendChild(buildTableHead(table, columns));
      table.appendChild(buildTableBody(cardDataBySet, columns));

      return table;
    }
  };

})(App);
