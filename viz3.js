// dimensions
const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 90
};

const width = 1400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
    .select('#heatmap')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// loading data
d3.csv('v3.csv').then((data) => {
    data.forEach(d => {
        d.Year = String(d.Year);
    });

    const genres = Array.from(new Set(data.map((d) => d.Genre)));
    const years = Array.from(new Set(data.map((d) => d.Year)));

    // sort years
    years.sort((a, b) => a - b);

    const xScale = d3.scaleBand().domain(years).range([0, width]);
    const yScale = d3.scaleBand().domain(genres).range([0, height]);

    // colors
    const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, d3.max(data, (d) => +d.Stream)]);

    const rectGroup = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('g');

    rectGroup
        .append('rect')
        .attr('x', (d) => xScale(d.Year))
        .attr('y', (d) => yScale(d.Genre))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .style('fill', (d) => colorScale(+d.Stream))
        .attr('genre', (d) => d.Genre)
        .attr('year', (d) => d.Year);

    // Add hover effect
    let isGenreClicked = false;
    let isYearSelected = false;

    rectGroup
        .on('mouseover', function(event, d) {
            const currentGenre = d3.select(this).select('rect').attr('genre');
            const currentYear = d3.select(this).select('rect').attr('year');
            console.log("Genre Selected: " + currentGenre);
            console.log("Year Selected: " + currentYear);

            if (!isGenreClicked && !isYearSelected && selectedYears.length <= 1) {
                svg.selectAll('rect')
                    .style('filter', (d) => (d.Genre === currentGenre) ? 'none' : 'grayscale(1)')
            }
        })
        .on('mouseout', function(event, d) {
            if (!isGenreClicked && !isYearSelected && selectedYears.length <= 1) {
                svg.selectAll('rect')
                    .style('filter', 'none')
            }
        })
        .on('click', function(event, d) {
            if (selectedYears.length > 1) {
                return;
            }

            if (isYearSelected) {
                return;
            }

            const currentGenre = d3.select(this).select('rect').attr('genre');
            isGenreClicked = !isGenreClicked;

            if (isGenreClicked) {
                svg.selectAll('rect')
                    .style('filter', (d) => (d.Genre === currentGenre) ? 'none' : 'grayscale(1)')
            } else {
                svg.selectAll('rect')
                    .style('filter', 'none')
            }
        });

    // x axis label
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top)
        .style('text-anchor', 'middle')
        .text('Year');

    const yAxis = svg.append('g').call(d3.axisLeft(yScale));
    yAxis.selectAll('text')
        .attr('x', -margin.left)
        .style('text-anchor', 'start')
        .text((d) => d);

    // y axis label
    svg.append('text')
        .attr('x', 0)
        .attr('y', -margin.top / 2)
        .style('text-anchor', 'middle')
        .text('Genre');

    // Create the y-axis with ticks for every 5 years
    const tickValues = years.filter((year) => year % 5 === 0);
    const xAxis = svg.append('g').call(d3.axisBottom(xScale).tickValues(tickValues))
        .attr('transform', `translate(0, ${height})`);


    xAxis.selectAll('.tick text').on('click', function(event, d) {
        const selectedYear = this.textContent;

        console.log(selectedYear);

        const isSelected = selectedYears.includes(selectedYear);

        if (isSelected) {
            const index = selectedYears.indexOf(selectedYear);
            selectedYears.splice(index, 1);
        } else {
            selectedYears.push(selectedYear);
        }

        rectGroup.selectAll('rect')
            .transition()
            .duration(500)
            .style('opacity', (d) => {
                return (selectedYears.length === 0 || selectedYears.includes(d.Year)) ? 1 : 0;
            });

        // Update the highlighted class
        xAxis.selectAll('.tick text')
            .classed('highlighted', (d) => selectedYears.includes(d));

        isGenreClicked = false;
        isYearSelected = !isYearSelected;
    });

    let selectedYears = [];
});