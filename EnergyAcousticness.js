d3.csv("condensedGenresFixed.csv").then(
    function(dataset) {

        var dimensions = {
            width: 800,
            height: 800,
            margin:{
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }

        console.log(dataset)

        var xAccessor = d => d.AcousticnessPercent
        var yAccessor = d => d.EnergyPercent

        var svg = d3.select("#scatterplot")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, xAccessor))  // Interval of values
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])   // Place of value on screen?

        var yScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, yAccessor))
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top]) 

        var dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(xAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", 3)
                      .attr("fill", "black")

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)

        svg.append("text")
            .attr("class", "x label")
            // .attr("text-anchor", "end")
            .attr("x", dimensions.width/2)
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .text("Acousticness");

        svg.append("text")
            .attr("class", "y label")
            // .attr("text-anchor", "end")
            .attr("x", 5)
            .attr("y", dimensions.height/2)
            // .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Energy");
    }
)