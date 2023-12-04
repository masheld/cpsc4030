const svgWidth = 700;
const svgHeight = 500;

const margin = {top: 25, right: 25, bottom : 50, left : 50};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;


const svg = d3.select("#stackedBar")
    .append("svg")
    .style("width", svgWidth)
    .style("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("condensedGenresFixed.csv").then(function(data){

    let acoustic = data.map(function (d) {
        return +d['AcousticnessPercent']; // Use + to convert the string to a number
    })
    let dance = data.map(function (d) {
        return +d['DanceabilityPercent'];
    })
    let valence = data.map(function (d) {
        return +d['ValencePercent'];
    })
    let speech = data.map(function (d) {
        return +d['SpeechinessPercent'];
    })
    let live = data.map(function (d) {
        return +d['LivenessPercent'];
    })
    let energy = data.map(function (d) {
        return +d['EnergyPercent'];
    })
    let years = data.map(function (d) {
        return +d['Year']; // +converts to numerical value
    })

    const x = d3.scaleBand()
        .domain(years.map(String)) // Map years to strings for categorical scale
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max([acoustic, dance, valence, speech, live, energy].map(d3.max))]) // Adjust to consider all categories
        .range([height, 0]);

    const bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", d => "translate(" + x(String(d['Year'])) + ",0)");

    bars.selectAll("rect")
        .data(function (d) {
            return [ // Use an array to provide a data array for each bar
                { category: 'Acoustic', value: +d['AcousticnessPercent'] },
                { category: 'Dance', value: +d['DanceabilityPercent'] },
                { category: 'Valence', value: +d['ValencePercent'] },
                { category: 'Speech', value: +d['SpeechinessPercent'] },
                { category: 'Live', value: +d['LivenessPercent'] },
                { category: 'Energy', value: +d['EnergyPercent'] }
            ];
        })
        .enter().append("rect")
        .attr("height", d => height - y(d.value))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .style("fill", d => colorScale(d.category));

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    const colorScale = d3.scaleOrdinal()
        .domain(['Acoustic', 'Dance', 'Valence', 'Speech', 'Live', 'Energy'])
        .range(d3.schemeCategory10);

})





