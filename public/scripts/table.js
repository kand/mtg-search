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
        field: 'name'
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
        field: 'manaCost',
      }];

      var theadtr = document.createElement('tr');
      columns.forEach(function (column) {
        var th = document.createElement('th');

        th.innerHTML = column.label;

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
