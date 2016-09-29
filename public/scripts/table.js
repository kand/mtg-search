!(function (App) {

  App.Table = {
    build: function (cardDataBySet) {
      var table = document.createElement('table');
      var thead = document.createElement('thead');
      var tbody = document.createElement('tbody');

      var columns = [{
        label: 'Name',
        field: 'name'
      }];

      var theadtr = document.createElement('tr');
      columns.forEach(function (column) {
        var th = document.createElement('th');

        th.innerHTML = column.label;

        theadtr.appendChild(th);
      });
      thead.appendChild(theadtr);
      table.appendChild(thead);

      Object.keys(cardDataBySet).forEach(function (setAbbrv) {
        cardDataBySet[setAbbrv].cards.forEach(function (card) {
          var tr = document.createElement('tr');

          columns.forEach(function (column) {
            var td = document.createElement('td');
            td.innerHTML = typeof column.field === 'function' ? column.field(card) : card[column.field];
            tr.appendChild(td);
          });

          table.appendChild(tr);
        });
      });

      table.appendChild(tbody);

      return table;
    }
  };

})(App);
