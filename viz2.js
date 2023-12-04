d3.csv("viz2.csv").then(function(dataset) {

    var dimensions = {
        width: 1000,
        height: 600,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    };

    dataset.forEach(function(d) {
        d.Year = +d.Year;
    });
    dataset.sort((a, b) => a.Year - b.Year);

    var xScale = d3.scaleBand()
        .domain(dataset.map(d => d.Year.toString()))
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
        .padding([0.2]);

    var firstYear = dataset[0].Year;
    var lastYear = dataset[dataset.length - 1].Year;
    var xTicks = [];
    for (var year = firstYear; year <= lastYear; year += 5) {
        xTicks.push(year.toString());
    }

    var keys = dataset.columns.slice(2);

    var maxSum = d3.max(dataset, d => d3.sum(keys, key => +d[key]));

    var yScale = d3.scaleLinear()
        .domain([0, maxSum])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top]);

    var colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]);

    var stackedData = d3.stack()
        .keys(keys)
        (dataset);

    var svg = d3.select("#stackedBarChart")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", d => colorScale(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.data.Year.toString()))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth());

    svg.append("g")
        .attr("transform", `translate(0, ${dimensions.height - dimensions.margin.bottom})`)
        .call(d3.axisBottom(xScale).tickValues(xTicks))
        .append("text")
        .attr("x", dimensions.width / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Year");

    svg.append("g")
        .attr("transform", `translate(${dimensions.margin.left}, 0)`)
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -(dimensions.height / 2))
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Value");

    // Color Key
    var colorKey = d3.select("#colorKey")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", 50)
        .append("g")
        .attr("transform", "translate(10, 0)");

    var legend = colorKey.selectAll(".legend")
        .data(keys)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(" + i * 120 + ",0)";
        });

    legend.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) {
            return colorScale(d);
        });

    legend.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {
            return d;
        });

});