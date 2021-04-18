console.log("app.js loaded");

// function to update bar chart
function updateBarChart(newId) {
    console.log(`updateBarChart(${newId})`);
};

// function to update bubble chart
function updateBubbleChart(newId) {
    console.log(`updateBubbleChart(${newId})`);
};

// function to update demo info
function updateDemoInfo(newId) {
    console.log(`updateDemoInfo(${newId})`);
};

function optionChanged(id) {
    updateBarChart(id);
    updateBubbleChart(id);
    updateDemoInfo(id);
};

function init() {
    // connect to data
    d3.json("static/data/samples.json").then(data => {
        console.log(data);

        data.samples.forEach(obj => {
            d3.selectAll("#selDataset")
                .append("option")
                .property("value", obj.id)
                .text(obj.id);
        });
        

        updateBarChart(data.samples[0].id);
    
        updateBubbleChart();
        
        updateDemoInfo();
    });
    
    

};

init();
//populate dropdown
//update bargraph
//update bubble chart
//update demo info