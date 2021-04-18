// portions of this code are taken directly from the instructor's office hours tutorial
console.log("app.js loaded");

// function to update bar chart
function updateBarChart(sampleId) {
    
    d3.json("static/data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        //console.log(resultArray);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuid => `OTU ${otuid}`);

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks.reverse(),
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        var barArray = [barData];

        var barLayout = {
            title: "xxx"
        };

        Plotly.newPlot("bar", barArray, barLayout);
        
    });

    
};

// function to update bubble chart
function updateBubbleChart(sampleId) {
    console.log(`updateBubbleChart(${sampleId})`);
};

// function to update demo info
function updateDemoInfo(sampleId) {
    console.log(`updateDemoInfo(${sampleId})`);
};

function optionChanged(newId) {
    updateBarChart(newId);
    updateBubbleChart(newId);
    updateDemoInfo(newId);
};

function init() {
    // connect to data
    d3.json("static/data/samples.json").then(data => {
        console.log(data);

        data.names.forEach(sampleId => {
            d3.selectAll("#selDataset")
                .append("option")
                .property("value", sampleId)
                .text(sampleId);
        });
        
        var id = data.names[0]

        updateBarChart(id);
    
        updateBubbleChart(id);
        
        updateDemoInfo(id);
    });

};

init();
//populate dropdown
//update bargraph
//update bubble chart
//update demo info