d3.csv("viz2.csv").then(function(dataset) {
    function resetChart() {
        d3.select("#chartSvg").remove();

    }
    var dimensions = {
        width: 1000,
        height: 600,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 100
        }
    };


    dataset.forEach(function (d) {
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
    for (var year = firstYear; year <= lastYear; year += 1) {
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

    originalChart();


    function originalChart() {
        var stackedData = d3.stack()
            .keys(keys)
            (dataset);
        // Create a new SVG
        var svg = d3.select("#stackedBarChart")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
            .attr("id", "chartSvg");

        var bars = svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", d => colorScale(d.key));

        bars.selectAll("rect")
            .data(d => d)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.data.Year.toString()))
            .attr("y", d => yScale(d[1]))
            .attr("height", d => yScale(d[0]) - yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .on('mouseover', function (event, d) {
                // Select the entire portion of the bar
                d3.select(d.Year)
                    .style('stroke', 'black')
                    .style('stroke-width', 2);


            })
            .on('mouseout', function (event, d) {
                // Revert styles on mouseout
                d3.selectAll('rect')
                    .style('stroke-width', 0);
            })

        const xAxis = svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${dimensions.height - dimensions.margin.bottom})`)
            .call(d3.axisBottom(xScale).tickValues(xTicks))
            .selectAll(".tick text")
            .attr("class", "x-label")
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-65)")
            .text(d => d)// Set the text content
            .on("click", function (event, d) {
                // Handle X-axis label click
                console.log("Clicked X-axis label:", d);

                // Filter the data based on the clicked Year
                const selectedYear = +d;

                // Filter the dataset for the selected year
                const filteredData = dataset.filter(item => item.Year === selectedYear);
                console.log(filteredData);
                updateChart(filteredData);
            })
            .selectAll("text")
            .append("text")
            .attr("class", "x-label")
            .attr("x", dimensions.width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .text("Year");


        const yAxis = svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${dimensions.margin.left}, 0)`)
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("class", "y-label")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -(dimensions.height / 2))
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .text("Value");

    }
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
        .attr("transform", function (d, i) {
            return "translate(" + i * 120 + ",0)";
        });

    legend.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) {
            return colorScale(d);
        });

    legend.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d) {
            return d;
        });
    function updateChart(filteredData) {


        var keys = dataset.columns.slice(2);

        var x0 = d3.scaleBand()
            .domain(filteredData.map(d => d.Year.toString()))
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])


        var x1 = d3.scaleBand()
            .domain(keys)
            .range([0, x0.bandwidth()])

        var maxSum = d3.max(filteredData, d => d3.sum(keys, key => +d[key]));

        var yScale = d3.scaleLinear()
            .domain([0, maxSum])
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top]);
        resetChart();
        var svg = d3.select("#stackedBarChart")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
            .attr("id", "chartSvg");

        var svg = d3.select("#chartSvg");

        var bars = svg.selectAll(".bar")
            .data(filteredData);

        var text = svg.append('text')
            .attr("id", 'topbartext')
            .attr("x", dimensions.margin.left)
            .attr("y", 10)
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-family", "sans-serif")
            .text("Value of Highlighted Variable: 0")

        var newBars = bars.enter().append("g")
            .attr("class", "bar")
            .attr("transform", d => `translate(${x0(d.Year.toString())},0)`);

        keys.forEach(function (key) {
            newBars.append("rect")
                .attr("x", d => x1(key))
                .attr("y", d => yScale(d[key]))
                .attr("width", x1.bandwidth())
                .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(+d[key]))
                .attr("fill", colorScale(key))
                .on('mouseover', function (event, d) {
                    d3.select(this)
                        .style('stroke', 'black')
                        .style('stroke-width', 2);
                        text.text("Value of Highlighted Variable: " + d[key]);
                })
                .on('mouseout', function (event, d) {
                    d3.selectAll('rect')
                        .style('stroke-width', 0)
                    text.text("Value of Highlighted Variable: 0");
                });
        });

        newBars.merge(bars)
            .transition()
            .duration(500)
            .attr("transform", d => `translate(${x0(d.Year.toString())},0)`);

// Update X and Y axes
        const xAxis = svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.height - dimensions.margin.bottom})`)
            .call(d3.axisBottom(x1))
            .selectAll(".tick text")
            .attr("class", "x-label")
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .on("click", function (event, d) {
                resetChart()
                originalChart();
            });


        const yAxis = svg.append("g")
            .attr("transform", `translate(${dimensions.margin.left}, 0)`)
            .call(d3.axisLeft(yScale))
            .selectAll(".tick text")
            .attr("class", "x-label")
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .text(d => d);


    }


});