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
                return (dimensions.width/5)*graphNum
            else if (endpoint == 2)
                return ((dimensions.width/5)*graphNum) - (spacer)
        }

        function calcLabelX(graphNum, endpoint) {
            // if (endpoint == 1)
            //     return (dimensions.width/5)*graphNum
            // else if (endpoint == 2)
                return ((funcWidth/5)*graphNum) - (funcWidth/10)

        }

        var xScale = d3.scaleLinear()
                       .domain([0,1])//d3.extent(dataset, acousticAccessor))  // Interval of values
                    //    .range([dimensions.margin.left, funcWidth/5])   // Place of value on screen?
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
        
        var interp = d3.interpolate("navy", "white")
        var color = d3.scaleSequential(interp).domain([0,1])

        var dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(acousticAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", 3)
                      .attr("fill", function(d) {return "steelblue"}) //color(d.AcousticnessPercent)
                      .attr("fill-opacity", "0.25")
                    //   .attr("stroke", function(d) {
                    //         var r = "steelblue" //color(d.AcousticnessPercent)
                    //         r = d3.hsl(r)
                    //         r.l = .75
                    //         return r
                    //     })
                    //   .attr("stroke-width", 1)

        dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => danceScale(danceAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", 3)
                      .attr("fill", "orange")
                      .attr("fill-opacity", "0.25")
                    //   .attr("stroke", function(d) {
                    //         var r = "orange" 
                    //         r = d3.hsl(r)
                    //         r.l = .40
                    //         return r
                    //     })
                    //   .attr("stroke-width", 1)

        dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => valenceScale(valenceAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", 3)
                      .attr("fill", "green")
                      .attr("fill-opacity", "0.25")
                    //   .attr("stroke", "black")
                    //   .attr("stroke", function(d) {
                    //         var r = "green" 
                    //         r = d3.hsl(r)
                    //         r.l = .35
                    //         return r
                    //     })
                    //   .attr("stroke-width", 1)

        dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => speechScale(speechAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", 3)
                      .attr("fill", "red")
                      .attr("fill-opacity", "0.25")
                    //   .attr("stroke", function(d) {
                    //         var r = "red" 
                    //         r = d3.hsl(r)
                    //         r.l = .40
                    //         return r
                    //     })
                    //   .attr("stroke-width", 1)

        dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => liveScale(liveAccessor(d)))  // each scale function will return the pixel
                      .attr("cy", d => yScale(yAccessor(d)))  // that each attribute must be printed at
                      .attr("r", 3)
                      .attr("fill", "purple")
                      .attr("fill-opacity", "0.25")
                    //   .attr("stroke", "black")
                    //   .attr("stroke", function(d) {
                    //         var r = "purple" 
                    //         r = d3.hsl(r)
                    //         r.l = .75
                    //         return r
                    //     })
                    //   .attr("stroke-width", 1)

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)

        var danceAxisGen = d3.axisBottom().scale(danceScale)
        xAxis = svg.append("g")
                       .call(danceAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)

        var valenceAxisGen = d3.axisBottom().scale(valenceScale)
        xAxis = svg.append("g")
                    .call(valenceAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
               
        var speechAxisGen = d3.axisBottom().scale(speechScale)
        xAxis = svg.append("g")
                    .call(speechAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                           
        var liveAxisGen = d3.axisBottom().scale(liveScale)
        xAxis = svg.append("g")
                    .call(liveAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                    
        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)

        svg.append("text")
            .attr("class", "x label")
            // .attr("text-anchor", "end")
            .attr("x", calcLabelX(1, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .text("Acousticness");
        
        svg.append("text")
            .attr("class", "x label")
            .attr("x", calcLabelX(2, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .text("Danceability");

        svg.append("text")
            .attr("class", "x label")
            .attr("x", calcLabelX(3, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .text("Valence");

        svg.append("text")
            .attr("class", "x label")
            .attr("x", calcLabelX(4, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .text("Speechiness");

        console.log(calcAxisWidth(5, 2))
        svg.append("text")
            .attr("class", "x label")
            .attr("x", calcLabelX(5, 2))
            .attr("y", dimensions.height-5)
            .style("fill", "black")
            .text("Liveness");

        // svg.append("text")
        //     .attr("class", "y label")
        //     // .attr("text-anchor", "end")
        //     .attr("x", 105)
        //     .attr("y", dimensions.height/2)
        //     .attr("dy", ".75em")
        //     .attr("transform", "rotate(-90)")
        //     .style("fill", "black")
        //     .text("Energy");
    }
)