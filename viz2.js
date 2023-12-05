d3.csv("condensedGenresFixed.csv").then(function (data) {
    const svgWidth = 700;
    const svgHeight = 500;

    const margin = { top: 25, right: 25, bottom: 50, left: 50 };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#stackedBar")
        .style("width", svgWidth)
        .style("height", svgHeight)

    var acoustic = data.map(d => +d['AcousticnessPercent']);
    var dance = data.map(d => +d['DanceabilityPercent']);
    var valence = data.map(d => +d['ValencePercent']);
    var speech = data.map(d => +d['SpeechinessPercent']);
    var live = data.map(d => +d['LivenessPercent']);
    var energy = data.map(d => +d['EnergyPercent']);

    const x = d3.scaleBand()
        .domain(data.map(function(d){return d.Year;}))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max([acoustic, dance, valence, speech, live, energy].map(d3.max))]) // Adjust to consider all categories
        .range([height, 0]);

    var bounds = svg.append("g")
        .style("transform", `translate(${margin.left}px, ${margin.top}px)`)

    const bars = bounds
        .selectAll("bar")
        .data(d => [
            { category: 'Acoustic', value: +d['AcousticnessPercent'] },
            { category: 'Dance', value: +d['DanceabilityPercent'] },
            { category: 'Valence', value: +d['ValencePercent'] },
            { category: 'Speech', value: +d['SpeechinessPercent'] },
            { category: 'Live', value: +d['LivenessPercent'] },
            { category: 'Energy', value: +d['EnergyPercent'] }
        ])
        .enter()
        .append('rect')
        .attr('x', function(d) { return x(d.year); })
        .attr('width', x.bandwidth)
        .attr('y', function(d) { return  d => y(d.value); })
        .attr('height', d => height - y(d.value))
        .attr("fill", "steelblue")

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));





});




