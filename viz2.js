const svgWidth = 700;
const svgHeight = 500;

const margin = {top: 25, right: 25, bottom : 50, left : 50};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;


const svg = d3.create("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


d3.csv("/condensedGenresFixed.csv").then(function(data){

    let acoustic = data.map(d => +d['AcousticnessPercent']);
    let dance = data.map(d => +d['DanceabilityPercent']);
    let valence = data.map(d => +d['ValencePercent']);
    let speech = data.map(d => +d['SpeechinessPercent']);
    let live = data.map(d => +d['LivenessPercent']);
    let energy = data.map(d => +d['EnergyPercent']);

    var years = data.map(d => +d['Year']);
    const x = d3.scaleBand()
        .domain(years.map(String)) // Map years to strings for categorical scale
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max([acoustic, dance, valence, speech, live, energy].map(d3.max))]) // Adjust to consider all categories
        .range([height, 0]);

    const bars = svg.selectAll(".bar")
        .data(data)
        .join("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${x(String(d['Year']))},0)`);

    bars.selectAll("rect")
        .data(d => [
            { category: 'Acoustic', value: +d['AcousticnessPercent'] },
            { category: 'Dance', value: +d['DanceabilityPercent'] },
            { category: 'Valence', value: +d['ValencePercent'] },
            { category: 'Speech', value: +d['SpeechinessPercent'] },
            { category: 'Live', value: +d['LivenessPercent'] },
            { category: 'Energy', value: +d['EnergyPercent'] }
        ])
        .join("rect")
        .attr("height", d => height - y(d.value))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .style("fill", d => colorScale(d.category));

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    const colorScale = d3.scaleOrdinal()
        .domain(['Acoustic', 'Dance', 'Valence', 'Speech', 'Live', 'Energy'])
        .range(d3.schemeCategory10);

})





