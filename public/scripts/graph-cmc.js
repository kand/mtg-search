!(function (App, d3) {

  if (typeof d3 === 'undefined') {
    throw new Error('requirement d3 not available for App.GraphCMC!');
  }

  if (typeof App.store === 'undefined') {
    throw new Error('requirement App.store not available for App.GraphCMC!');
  }

  var buildGraph = function (container, cards) {

    if (typeof cards !== 'object') {
      return document.createElement('div');
    }

    var width = 420;
    var barHeight = 20;

    var data = cards
        .map(function (card) {
          return card.cmc || 0;
        })
        .reduce(function (costs, cmc) {
          costs[cmc] = costs[cmc] ? costs[cmc] + 1 : 1;
          return costs;
        }, []);

    var x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    var svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', barHeight * data.length);

    var bar = svg.selectAll('g')
          .data(data)
        .enter().append('g')
          .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')'; });

    bar.append('rect')
        .style('fill', 'steelblue')
        .attr('width', function (d) { return x(d) || 0; })
        .attr('height', barHeight - 1);

    bar.append('text')
        .attr('x', function (d) { return (x(d) || 3) - 3; })
        .attr('y', barHeight / 2)
        .attr('dy', '0.35em')
        .style('fill', 'white')
        .style('font', '10px sans-serif')
        .style('text-anchor', 'end')
        .text(function (d) { return d || 0; });

    return svg.node();
  };

  App.GraphCMC = {
    bindTo: function (containerId) {
      var container = document.getElementById(containerId);

      App.store.subscribe(function () {
        container.innerHTML = '';

        container.appendChild(buildGraph(container, App.store.getState().cards));
      });
    }
  };

})(App, d3);
