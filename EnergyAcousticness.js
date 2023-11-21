d3.csv("condensedGenresFixed.csv").then(
    function(dataset) {

        var dimensions = {
            width: 800,
            height: 400,
            margin:{
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }

        console.log(dataset)

        var acousticAccessor = d => d.AcousticnessPercent
        var danceAccessor = d => d.DanceabilityPercent
        var valenceAccessor = d => d.ValencePercent
        var speechAccessor = d => d.SpeechinessPercent
        var liveAccessor = d => d.LivenessPercent
        var yAccessor = d => d.EnergyPercent

        var svg = d3.select("#scatterplot")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var spacer = 20
        var funcWidth = dimensions.width - (dimensions.margin.left + dimensions.margin.right)
        
        // graphNum refers to the order of the graphs (1-5)
        // endpoint refers to which endpoint of the range the value is (1=lower, 2=upper)
        function calcAxisWidth(graphNum, endpoint) {
            if (endpoint == 1)
                return ((funcWidth/5)*graphNum)+dimensions.margin.left
            else if (endpoint == 2)
                return (((funcWidth/5)*graphNum) - (spacer)) + dimensions.margin.left
        }

        function calcLabelX(graphNum) {
                return calcAxisWidth(graphNum, 1) - (funcWidth/10)
        }


        var acousticScale = d3.scaleLinear()
                       .domain([0,1])//d3.extent(dataset, acousticAccessor))  // Interval of values
                       .range([dimensions.margin.left, calcAxisWidth(1, 2)])


        var danceScale = d3.scaleLinear()
                        .domain([0,1])//d3.extent(dataset, danceAccessor))  // Interval of values
                        .range([calcAxisWidth(1, 1), calcAxisWidth(2, 2)])

        var valenceScale = d3.scaleLinear()
                        .domain([0,1])//d3.extent(dataset, valenceAccessor))  // Interval of values
                        .range([calcAxisWidth(2, 1), calcAxisWidth(3, 2)])

        var speechScale = d3.scaleLinear()
                        .domain([0,1])//d3.extent(dataset, speechAccessor))  // Interval of values
                        .range([calcAxisWidth(3, 1), calcAxisWidth(4, 2)])

        var liveScale = d3.scaleLinear()
                        .domain([0,1])//d3.extent(dataset, liveAccessor))  // Interval of values
                        .range([calcAxisWidth(4, 1), calcAxisWidth(5, 2)])


        var yScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, yAccessor))
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top]) 

        // for(graphNum) {
        //     append ...
        //     if(graphNum=1)
        // }

        let opacity = 0.15
        let radius = 3
    
        var acousticDots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => acousticScale(acousticAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", radius)
                      .attr("fill", "steelblue")
                      .attr("fill-opacity", opacity)
                      .attr("class", "acousticGraph")

        var danceDots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => danceScale(danceAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", radius)
                      .attr("fill", "orange")
                      .attr("fill-opacity", opacity)
                      .attr("class", "danceGraph")

        var valenceDots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => valenceScale(valenceAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", radius)
                      .attr("fill", "green")
                      .attr("fill-opacity", opacity)
                      .attr("class", "valenceGraph")

        var speechDots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => speechScale(speechAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", radius)
                      .attr("fill", "red")
                      .attr("fill-opacity", opacity)
                      .attr("class", "speechGraph")

        var liveDots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => liveScale(liveAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", radius)
                      .attr("fill", "purple")
                      .attr("fill-opacity", opacity)
                      .attr("class", "liveGraph")

        var xAxisGen = d3.axisBottom().scale(acousticScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                       .attr("class", "x_axis acousticGraph")
                       .attr("id", "acousticGraph")

        var danceAxisGen = d3.axisBottom().scale(danceScale)
        var xAxis2 = svg.append("g")
                       .call(danceAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                       .attr("class", "x_axis danceGraph")
                       .attr("id", "danceGraph")

        var valenceAxisGen = d3.axisBottom().scale(valenceScale)
        var xAxis3 = svg.append("g")
                    .call(valenceAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                    .attr("class", "x_axis valenceGraph")
                    .attr("id", "valenceGraph")
               
        var speechAxisGen = d3.axisBottom().scale(speechScale)
        var xAxis4 = svg.append("g")
                    .call(speechAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                    .attr("class", "x_axis speechGraph")
                    .attr("id", "speechGraph")
                           
        var liveAxisGen = d3.axisBottom().scale(liveScale)
        var xAxis5 = svg.append("g")
                    .call(liveAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                    .attr("class", "x_axis liveGraph")
                    .attr("id", "liveGraph")
                    
        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)

        svg.append("text")
            .attr("class", "xLabel acousticGraph")
            .attr("x", calcLabelX(1, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Acousticness");
        
        svg.append("text")
            .attr("class", "xLabel danceGraph")
            .attr("x", calcLabelX(2, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Danceability");

        svg.append("text")
            .attr("class", "xLabel valenceGraph")
            .attr("x", calcLabelX(3, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Valence");

        svg.append("text")
            .attr("class", "xLabel speechGraph")
            .attr("x", calcLabelX(4, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Speechiness");

        svg.append("text")
            .attr("class", "xLabel liveGraph")
            .attr("x", calcLabelX(5, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Liveness");

        
        d3.selectAll('circle').on('mouseover', (d,i) => {
            d3.select(d.srcElement).style('stroke', 'black')
                                   .style('stroke-width', 1.25)
        })
    
        d3.selectAll('circle').on('mouseout', (d,i) => {
            d3.select(d.srcElement).style('stroke-width', 0)
        })

        d3.selectAll('circle').on('click', (d, i) => {
            const clickedCircle = d3.select(d.srcElement);
            const currentOpacity = parseFloat(clickedCircle.style('fill-opacity'));
            
            if (currentOpacity < 1.0) {
                // Set all circle opacities to 0.1
                d3.selectAll('circle').style("fill-opacity", "0.1");

                // Increase clicked circle opacity
                clickedCircle.style('fill-opacity', "1.0");
                clickedCircle.style('stroke', 'black');
                clickedCircle.style('stroke-width', 2);
            } else {
                // Reset all circle opacities to their original value (e.g., 1.0)
                d3.selectAll('circle').style("fill-opacity", opacity);
                clickedCircle.style('stroke-width', 0);
            }
        });

        function hideElements(clickedLabel) {
            d3.selectAll('.xLabel').style("visibility", "hidden");
            d3.selectAll('circle').style("visibility", "hidden");

            if(clickedLabel.classed('acousticGraph')) {
                d3.selectAll('.acousticGraph').style("visibility", "visible");
                xAxis2.style("visibility", "hidden");
                xAxis3.style("visibility", "hidden");
                xAxis4.style("visibility", "hidden");
                xAxis5.style("visibility", "hidden");
            }
            else if (clickedLabel.classed('danceGraph')) {
                d3.selectAll('.danceGraph').style("visibility", "visible");
                xAxis.style("visibility", "hidden");
                xAxis3.style("visibility", "hidden");
                xAxis4.style("visibility", "hidden");
                xAxis5.style("visibility", "hidden");
            }
            else if (clickedLabel.classed('valenceGraph')) {
                d3.selectAll('.valenceGraph').style("visibility", "visible");
                xAxis.style("visibility", "hidden");
                xAxis2.style("visibility", "hidden");
                xAxis4.style("visibility", "hidden");
                xAxis5.style("visibility", "hidden");
            }
            else if (clickedLabel.classed('speechGraph')) {
                d3.selectAll('.speechGraph').style("visibility", "visible");
                xAxis.style("visibility", "hidden");
                xAxis2.style("visibility", "hidden");
                xAxis3.style("visibility", "hidden");
                xAxis5.style("visibility", "hidden");
            }
            else if (clickedLabel.classed('liveGraph')) {
                d3.selectAll('.liveGraph').style("visibility", "visible");
                xAxis.style("visibility", "hidden");
                xAxis2.style("visibility", "hidden");
                xAxis3.style("visibility", "hidden");
                xAxis4.style("visibility", "hidden");
            }
        }

        function unhideElements() {
            d3.selectAll('.xLabel').style("visibility", "visible");
            d3.selectAll('circle').style("visibility", "visible");
            xAxis.style("visibility", "visible")
            xAxis2.style("visibility", "visible");
            xAxis3.style("visibility", "visible");
            xAxis4.style("visibility", "visible");
            xAxis5.style("visibility", "visible");
        }

        let clickedState = false;

        var fullScale = d3.scaleLinear()
                          .domain([0,1])
                          .range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
        var fullXAxisGen = d3.axisBottom().scale(fullScale)

        d3.selectAll('.xLabel').on('click', (d,i) => {
            const clickedLabel = d3.select(d.srcElement);

            // Hide all elements besides selected graph
            if(!clickedState) {
                clickedState=true;
                hideElements(clickedLabel);
                //expand x-axis

                // acousticScale.range([dimensions.margin.left, dimensions.width-dimensions.margin.right])

                // d3.select(".acousticGraph").call(xAxisGen)
                //                            .transition()
                //                            .duration(1500);
                    //  .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                    //  .attr("class", "x_axis acousticGraph");

            }
            // Set everything to be visible
            else {
                clickedState=false;
                unhideElements();
            }
            
        });

    }
)
