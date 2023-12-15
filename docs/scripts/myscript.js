// 全局变量来存储和修改数据
var allData = [];

// D3.js 创建气泡图的函数
function createBubbleMap(data) {
    var width = 960, height = 600;

    // 清空现有的 SVG 元素
    d3.select("#bubble-map").selectAll("*").remove();

    // 创建 SVG 元素
    var svg = d3.select("#bubble-map").append("svg")
        .attr("width", width)
        .attr("height", height);

    // 定义投影
    var projection = d3.geoMercator()
        .center([-106.3468, 56.1304]) // 以加拿大为中心
        .scale(300)
        .translate([width / 2, height / 2]);

    // 定义气泡大小的比例尺
    var size = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.rate)])
        .range([1, 20]);

    // 绘制气泡
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => projection([d.Longitude, d.Latitude])[0])
        .attr("cy", d => projection([d.Longitude, d.Latitude])[1])
        .attr("r", d => size(d.rate))
        .style("fill", "red")
        .attr("opacity", 0.6);
}

// 加载初始数据
d3.json("bubble_data.json").then(function(data) {
    allData = data;
    console.log(allData);
    createBubbleMap(data);
});

// 按钮点击事件处理函数
function updateData(action) {
    if (action === 'increase') {
        // 增加数据逻辑
    } else if (action === 'decrease') {
        // 减少数据逻辑
    }
    createBubbleMap(allData);
}

// 为按钮添加事件监听器
document.getElementById('increase').addEventListener('click', function() {
    updateData('increase');
});
document.getElementById('decrease').addEventListener('click', function() {
    updateData('decrease');
});
