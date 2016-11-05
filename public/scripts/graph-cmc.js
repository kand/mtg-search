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

    var height = 300;
    var width = 300; 

    var data = cards
        .map(function (card) {
          return card.cmc || 0;
        })
        .reduce(function (costs, cmc) {
          costs[cmc] = costs[cmc] ? costs[cmc] + 1 : 1;
          return costs;
        }, []);

    // fill in gaps in array with 0s
    data = Array.from(
        { length: data.length },
        function (_, i) { return data[i] || 0; }
    );

    var x = d3.scaleBand()
        .domain(data.map(function (d, i) { return i; }))
        .rangeRound([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    var svg = d3.select(container).append('svg')
        .attr('height', height)
        .attr('width', width);

    var bar = svg.selectAll('g')
          .data(data)
        .enter().append('g')
          .attr('transform', function (d, i) { return 'translate(' + x(i) + ', 0)'; });

    bar.append('rect')
        .style('fill', 'steelblue')
        .attr('y', function (d) { return y(d) || 0; })
        .attr('height', function (d) { return height - y(d) || 0; })
        .attr('width', x.bandwidth());

    bar.append('text')
        .attr('x', x.bandwidth() / 2)
        .attr('y', function (d) { return height; })
        .attr('dx', '-0.5em')
        .attr('dy', '-0.5em')
        .style('fill', 'white')
        .style('font', '10px sans-serif')
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
