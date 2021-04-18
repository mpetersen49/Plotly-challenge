console.log("app.js loaded");

function updateBarChart() {
    console.log("updateBarChart");
};

function updateBubbleChart() {
    console.log("updateBubbleChart");
};

function updateDemoInfo() {
    console.log("updateDemoInfo");
};



d3.json("static/data/samples.json").then(data => {
    console.log(data);

    updateBarChart();

    updateBubbleChart();
    
    updateDemoInfo();
});

//update bargraph
//update bubble chart
//update demo info