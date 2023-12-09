d3.csv("condensedGenresFixed.csv").then(
    function(dataset) {

        var dimensions = {
            width: 1350,
            height: 300,
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
        let opacity = 0.15
        let radius = 3

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


        // Generate Scales to be used for each scatterplot
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
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top]);
    
        // Plot dots for each graph
        // Dots are assigned a class alligning to their graph and song title
        // the ____Graph class is assigned to all elements belonging to a single scatterplot
        var acousticDots = svg.append("g")
                      .attr('id', "acoustic")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => acousticScale(acousticAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", radius)
                      .attr("fill", "steelblue")
                      .attr("fill-opacity", opacity)
                      .attr("class", d => "acousticGraph acousticDots " + 
                            d.Title.replace(/\s+/g, '-').replace(/[,.'\/&\(\)]+/g, '') + 
                            " " + d.TopGenre.replace(/\s+/g, '-').replace(/[\/&]+/g, '') + 
                            " " + d.Year) // Replace or remove non alphanumeric characters 

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
                      .attr("class", d => "danceGraph danceDots " + 
                            d.Title.replace(/\s+/g, '-').replace(/[,.'\/&\(\)]+/g, '') + 
                            " " + d.TopGenre.replace(/\s+/g, '-').replace(/[\/&]+/g, '')) // Replace or remove non alphanumeric characters 

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
                      .attr("class", d => "valenceGraph valenceDots " + 
                            d.Title.replace(/\s+/g, '-').replace(/[,.'\/&\(\)]+/g, '') + 
                            " " + d.TopGenre.replace(/\s+/g, '-').replace(/[\/&]+/g, '')) // Replace or remove non alphanumeric characters 

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
                      .attr("class", d => "speechGraph speechDots " + 
                            d.Title.replace(/\s+/g, '-').replace(/[,.'\/&\(\)]+/g, '') + 
                            " " + d.TopGenre.replace(/\s+/g, '-').replace(/[\/&]+/g, '')) // Replace or remove non alphanumeric characters 

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
                      .attr("class", d => "liveGraph liveDots " + 
                            d.Title.replace(/\s+/g, '-').replace(/[,.'\/&\(\)]+/g, '') + 
                            " " + d.TopGenre.replace(/\s+/g, '-').replace(/[\/&]+/g, '')) // Replace or remove non alphanumeric characters 
                    

        // Generate axes 
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
                       .style("transform", `translateX(${dimensions.margin.left}px)`);

        // Append axis labels on each graph
        // the ____Graph class is assigned to all elements belonging to a single scatterplot
        svg.append("text")
            .attr("class", "xLabel acousticGraph")
            .attr("x", calcLabelX(1, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Acousticness")
            .attr("id", "acousticLabel")
        
        svg.append("text")
            .attr("class", "xLabel danceGraph")
            .attr("x", calcLabelX(2, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Danceability")
            .attr("id", "danceLabel")

        svg.append("text")
            .attr("class", "xLabel valenceGraph")
            .attr("x", calcLabelX(3, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Valence")
            .attr("id", "valenceLabel")

        svg.append("text")
            .attr("class", "xLabel speechGraph")
            .attr("x", calcLabelX(4, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Speechiness")
            .attr("id", "speechLabel")

        svg.append("text")
            .attr("class", "xLabel liveGraph")
            .attr("x", calcLabelX(5, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .text("Liveness")
            .attr("id", "liveLabel")

        // Highlight on mouseover effect
        d3.selectAll('circle').on('mouseover', (event,d) => {
            d3.select(event.srcElement).style('stroke', 'black')
                                   .style('stroke-width', 1.25)
        })
    
        // Remove highlight on mouseover effect
        d3.selectAll('circle').on('mouseout', (event,d) => {
            let mouseoutCircle = event.currentTarget;

            let tempList = mouseoutCircle.className.baseVal.split(' ');
            tempList = tempList.map(className => "." + className);
            
            // For if the user hasn't clicked a circle yet (meaning classList is null)
            if (!classList) {
                d3.select(event.srcElement).style('stroke-width', 0);
            }
            // For after the user has clicked a circle
            else if (tempList[2] != classList[2]){
                d3.select(event.srcElement).style('stroke-width', 0);
            }
        })

        let currentTarget = null;
        let previousTarget = null;
        let classList = null;

        // Highlight all circles associated to the same song on click
        d3.selectAll('circle').on('click', (event, d) => {
            currentTarget = event.currentTarget;
            classList = currentTarget.className.baseVal.split(' ');
            classList = classList.map(className => "." + className);  

            // Click on a new song
            if (previousTarget != currentTarget) {

                // Remove any previous selection
                d3.selectAll('circle').style('stroke-width', 0) 
                                      .style('fill-opacity', opacity);
        
                // Select new song
                d3.selectAll(classList[2]).style('stroke', 'black')
                                          .style('stroke-width', 1.25)
                                          .style('fill-opacity', '1,0');
                previousTarget = currentTarget;
            }
            // Remove previous selection
            else {
                d3.selectAll('circle').style('stroke-width', 0) 
                                      .style('fill-opacity', opacity);
                previousTarget = null;
            }
        });

        // Used to hide all other scatterplots when user selects an x-axis label
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

        // Used to show all other scatterplots when user reselects an x-axis label
        function unhideElements() {
            d3.selectAll('.xLabel').style("visibility", "visible");
            d3.selectAll('circle').style("visibility", "visible");
            xAxis.style("visibility", "visible")
            xAxis2.style("visibility", "visible");
            xAxis3.style("visibility", "visible");
            xAxis4.style("visibility", "visible");
            xAxis5.style("visibility", "visible");
        }

        // Expands the x axis associated with the clicked x-axis label to 
        // occupy the full graph area
        function expandAxis(clickedLabel) {
            if(clickedLabel.classed("acousticGraph")) {
                acousticScale.range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
                xAxisGen.ticks(20);
                d3.select("#acousticGraph").call(xAxisGen)

                // ***************************************
                // Add additional ticks
                const minorTickValues = d3.range(0, 1.01, 0.01).filter(d => d % 0.1 !== 0); // Values for minor ticks, excluding major tick values

                d3.select("#acousticGraph").selectAll(".minor-tick")
                .data(minorTickValues)
                .enter().append("line")
                    .attr("class", "minor-tick")
                    .attr("y1", 0)
                    .attr("y2", 3)
                    .attr("x1", d => acousticScale(d))
                    .attr("x2", d => acousticScale(d)+1)
                    .style("stroke", "black") // Style as needed
                    .style("stroke-width", 1);
                    
                d3.selectAll(".minor-tick").style("display", null);
                // ***************************************
                d3.selectAll(".acousticDots").attr("cx", d => acousticScale(acousticAccessor(d)))
                d3.select("#acousticLabel").attr("x", dimensions.width/2)
            }
            else if(clickedLabel.classed("danceGraph")) {
                danceScale.range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
                danceAxisGen.ticks(20)
                d3.select("#danceGraph").call(danceAxisGen)

                // Add additional ticks
                const minorTickValues = d3.range(0, 1.01, 0.01).filter(d => d % 0.1 !== 0); // Values for minor ticks, excluding major tick values

                d3.select("#danceGraph").selectAll(".minor-tick")
                .data(minorTickValues)
                .enter().append("line")
                    .attr("class", "minor-tick")
                    .attr("y1", 0)
                    .attr("y2", 3)
                    .attr("x1", d => danceScale(d))
                    .attr("x2", d => danceScale(d)+1)
                    .style("stroke", "black") // Style as needed
                    .style("stroke-width", 1);
                    
                d3.selectAll(".minor-tick").style("display", null);
                d3.selectAll(".danceDots").attr("cx", d => danceScale(danceAccessor(d))) 
                d3.select("#danceLabel").attr("x", dimensions.width/2)
            }
            else if(clickedLabel.classed("valenceGraph")) {
                valenceScale.range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
                valenceAxisGen.ticks(20)
                d3.select("#valenceGraph").call(valenceAxisGen)
                // Add additional ticks
                const minorTickValues = d3.range(0, 1.01, 0.01).filter(d => d % 0.1 !== 0); // Values for minor ticks, excluding major tick values

                d3.select("#valenceGraph").selectAll(".minor-tick")
                .data(minorTickValues)
                .enter().append("line")
                    .attr("class", "minor-tick")
                    .attr("y1", 0)
                    .attr("y2", 3)
                    .attr("x1", d => valenceScale(d))
                    .attr("x2", d => valenceScale(d)+1)
                    .style("stroke", "black") // Style as needed
                    .style("stroke-width", 1);
                    
                d3.selectAll(".minor-tick").style("display", null);
                d3.selectAll(".valenceDots").attr("cx", d => valenceScale(valenceAccessor(d))) 
                d3.select("#valenceLabel").attr("x", dimensions.width/2)
            }
            else if(clickedLabel.classed("speechGraph")) {
                speechScale.range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
                speechAxisGen.ticks(20)
                d3.select("#speechGraph").call(speechAxisGen)

                // Add additional ticks
                const minorTickValues = d3.range(0, 1.01, 0.01).filter(d => d % 0.1 !== 0); // Values for minor ticks, excluding major tick values

                d3.select("#speechGraph").selectAll(".minor-tick")
                .data(minorTickValues)
                .enter().append("line")
                    .attr("class", "minor-tick")
                    .attr("y1", 0)
                    .attr("y2", 3)
                    .attr("x1", d => speechScale(d))
                    .attr("x2", d => speechScale(d)+1)
                    .style("stroke", "black") // Style as needed
                    .style("stroke-width", 1);
                    
                d3.selectAll(".minor-tick").style("display", null);
                d3.selectAll(".speechDots").attr("cx", d => speechScale(speechAccessor(d))) 
                d3.select("#speechLabel").attr("x", dimensions.width/2)
            }
            else if(clickedLabel.classed("liveGraph")) {
                liveScale.range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
                liveAxisGen.ticks(20)
                d3.select("#liveGraph").call(liveAxisGen)

                // Add additional ticks
                const minorTickValues = d3.range(0, 1.01, 0.01).filter(d => d % 0.1 !== 0); // Values for minor ticks, excluding major tick values

                d3.select("#liveGraph").selectAll(".minor-tick")
                .data(minorTickValues)
                .enter().append("line")
                    .attr("class", "minor-tick")
                    .attr("y1", 0)
                    .attr("y2", 3)
                    .attr("x1", d => liveScale(d))
                    .attr("x2", d => liveScale(d)+1)
                    .style("stroke", "black") // Style as needed
                    .style("stroke-width", 1);
                    
                d3.selectAll(".minor-tick").style("display", null);
                d3.selectAll(".liveDots").attr("cx", d => liveScale(liveAccessor(d))) 
                d3.select("#liveLabel").attr("x", dimensions.width/2)
            }
        }

        // Returns x-axes their original state
        function collapseAxis(clickedLabel) {
            if(clickedLabel.classed("acousticGraph")) {
                acousticScale.range([dimensions.margin.left, calcAxisWidth(1, 2)])
                xAxisGen.ticks(10);
                d3.select("#acousticGraph").call(xAxisGen)
                                            .transition()
                                            .duration(1500);
                d3.selectAll(".minor-tick").style("display", "none")
                d3.selectAll(".acousticDots").attr("cx", d => acousticScale(acousticAccessor(d))) 
                d3.select("#acousticLabel").attr("x", calcLabelX(1, 2))
            }
            else if(clickedLabel.classed("danceGraph")) {
                danceScale.range([calcAxisWidth(1, 1), calcAxisWidth(2, 2)])
                danceAxisGen.ticks(10);
                d3.select("#danceGraph").call(danceAxisGen)
                d3.selectAll(".minor-tick").style("display", "none")
                d3.selectAll(".danceDots").attr("cx", d => danceScale(danceAccessor(d))) 
                d3.select("#danceLabel").attr("x", calcLabelX(2, 2))
            }
            else if(clickedLabel.classed("valenceGraph")) {
                valenceScale.range([calcAxisWidth(2, 1), calcAxisWidth(3, 2)])
                valenceAxisGen.ticks(10)
                d3.select("#valenceGraph").call(valenceAxisGen)
                d3.selectAll(".minor-tick").style("display", "none")
                d3.selectAll(".valenceDots").attr("cx", d => valenceScale(valenceAccessor(d))) 
                d3.select("#valenceLabel").attr("x", calcLabelX(3, 2))
            }
            else if(clickedLabel.classed("speechGraph")) {
                speechScale.range([calcAxisWidth(3, 1), calcAxisWidth(4, 2)])
                speechAxisGen.ticks(10)
                d3.select("#speechGraph").call(speechAxisGen)
                d3.selectAll(".minor-tick").style("display", "none")
                d3.selectAll(".speechDots").attr("cx", d => speechScale(speechAccessor(d))) 
                d3.select("#speechLabel").attr("x", calcLabelX(4, 2))
            }
            else if(clickedLabel.classed("liveGraph")) {
                liveScale.range([calcAxisWidth(4, 1), calcAxisWidth(5, 2)])
                liveAxisGen.ticks(10)
                d3.select("#liveGraph").call(liveAxisGen)
                d3.selectAll(".minor-tick").style("display", "none")
                d3.selectAll(".liveDots").attr("cx", d => liveScale(liveAccessor(d))) 
                d3.select("#liveLabel").attr("x", calcLabelX(5, 2))
            }
        }

        let clickedState = false;


        d3.selectAll('.xLabel').on('click', (event,d) => {
            const clickedLabel = d3.select(event.srcElement);

            // Hide other graphs and expand selected graph
            if(!clickedState) {
                clickedState=true;
                hideElements(clickedLabel);
                expandAxis(clickedLabel);
            }
            // Return to original state
            else {
                clickedState=false;
                unhideElements();
                collapseAxis(clickedLabel);
            }
        })
    }
)
