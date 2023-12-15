// Global variable to store and modify data
var allData = [];
var currentDataCount = 20;

// Function to create a bar chart
function createBarChart(data) {
    var width = 960, height = 500;
    var margin = { top: 20, right: 20, bottom: 30, left: 200 };

    // Clear any existing SVG elements
    d3.select("#bar-chart").selectAll("*").remove();

    // Create SVG element
    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    var x = d3.scaleLinear()
        .range([0, width - margin.left - margin.right])
        .domain([0, d3.max(data, d => d["Total emissions"])]);

    var y = d3.scaleBand()
        .range([height - margin.top - margin.bottom, 0])
        .domain(data.map(d => d["Facility name"]))
        .padding(0.1);

    // Draw bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d["Facility name"]))
        .attr("width", d => x(d["Total emissions"]))
        .attr("height", y.bandwidth())
        .attr("fill", "steelblue");

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(y));
}

// Load initial data
d3.json("C:/Users/haoya/OneDrive/桌面\Facility-Greenhouse-Gas/data/top_facilities.json").then(function(data) {
    allData = data;
    createBarChart(allData.slice(0, currentDataCount));
});

// Function to update data
function updateData(action) {
    if (action === 'increase' && currentDataCount < allData.length) {
        currentDataCount++;
    } else if (action === 'decrease' && currentDataCount > 1) {
        currentDataCount--;
    }
    createBarChart(allData.slice(0, currentDataCount));
}

// Add event listeners to buttons
document.getElementById('increase').addEventListener('click', function() {
    updateData('increase');
});
document.getElementById('decrease').addEventListener('click', function() {
    updateData('decrease');
});
