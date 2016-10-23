!(function (App) {

  App.Table = {
    build: function (cardDataBySet) {
      var table = document.createElement('table');
      var thead = document.createElement('thead');
      var tbody = document.createElement('tbody');

      table.appendChild(thead);
      table.appendChild(tbody);

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
              console.log('would sort ' + column.sorts + ' ascending');
            } else if (currentSort === 1) {
              sorts.classList.add('fa-sort-desc');
              this.dataset.sortDirection = -1;
              console.log('would sort ' + column.sorts + ' descending');
            } else {
              sorts.classList.add('fa-sort');
              this.dataset.sortDirection = 0;
              console.log('would sort ' + column.sorts + ' off');
            }

          });
          th.appendChild(sorts);
        }

        theadtr.appendChild(th);
      });
      thead.appendChild(theadtr);

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

      return table;
    }
  };

})(App);
