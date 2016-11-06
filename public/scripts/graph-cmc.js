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

    var margin = { top: 30, right: 30, bottom: 30, left: 30 };
    var height = 300 - margin.top - margin.bottom;
    var width = 300 - margin.right - margin.left;

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
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.right + margin.left);

    svg.append('text')
        .attr('fill', '#fff')
        .style('font', '11px sans-serif')
        .style('font-style', 'italic')
        .attr('dy', '1em')
        .attr('x', margin.left / 2)
        .text('Converted Mana Cost');

    var chartArea = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var bar = chartArea.selectAll('g')
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
        .attr('y', function (d) { return y(d); })
        .attr('dy', '1em')
        .style('fill', 'white')
        .style('font', '10px sans-serif')
        .style('text-anchor', 'middle')
        .text(function (d) { return d || ''; });

    var xAxisContainer = chartArea.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    xAxisContainer.select('path')
      .style('stroke', '#fff');
    xAxisContainer.selectAll('g line')
      .style('stroke', '#fff');
    xAxisContainer.selectAll('g text')
      .style('fill', '#fff');

    var yAxisContainer = chartArea.append('g')
      .call(d3.axisLeft(y));

    yAxisContainer.select('path')
      .style('stroke', '#fff');
    yAxisContainer.selectAll('g line')
      .style('stroke', '#fff');
    yAxisContainer.selectAll('g text')
      .style('fill', '#fff');
    yAxisContainer.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .style('fill', '#fff')
      .style('font-style', 'italic')
      .style('text-anchor', 'end')
      .text('Number of Cards');

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
