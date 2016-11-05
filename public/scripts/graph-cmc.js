!(function (App, d3) {

  if (typeof d3 === 'undefined') {
    throw new Error('requirement d3 not available for App.GraphCMC!');
  }

  if (typeof App.store === 'undefined') {
    throw new Error('requirement App.store not available for App.GraphCMC!');
  }

  var buildGraph = function (cards) {

    if (typeof cards !== 'object') {
      return document.createElement('div');
    }

    var data = cards
        .map(function (card) {
          return card.cmc || 0;
        })
        .reduce(function (costs, cmc) {
          costs[cmc] = costs[cmc] ? costs[cmc] + 1 : 1;
          return costs;
        }, []);

    var svg = d3.select(document.createElement('div'));

    svg.selectAll('div')
        .data(data)
      .enter().append('div')
        .style('width', function (cmc) { return cmc * 10 + 'px'; })
        .style('background-color', 'blue')
        .style('margin-bottom', '5px')
        .style('text-align', 'right')
        .text(function (cmc) { return cmc; });

    return svg.node();
  };

  App.GraphCMC = {
    bindTo: function (containerId) {
      var container = document.getElementById(containerId);

      App.store.subscribe(function () {
        container.innerHTML = '';

        container.appendChild(buildGraph(App.store.getState().cards));
      });
    }
  };

})(App, d3);