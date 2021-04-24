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
            title: "Top 10 OTUs Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barArray, barLayout);
        
    });

    
};

// function to update bubble chart
function updateBubbleChart(sampleId) {
    d3.json("static/data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        //console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        };

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            title: 'Bubble Chart of OTUs Found',
            showlegend: false,
            height: 600,
            width: 1300,
        };

        Plotly.newPlot('bubble', bubbleArray, bubbleLayout);
    });
};

// function to update demo info
function updateDemoInfo(sampleId) {
    d3.json("static/data/samples.json").then(data => {
        //console.log(data);
        
        var metadata = data.metadata;
        var resultArray = metadata.filter(d => d.id == sampleId);
        var result = resultArray[0];
        //console.log(result);

        var demoInfo = d3.selectAll("#sample-metadata");

        demoInfo.html("");

        Object.entries(result).forEach(([key, value]) => {
            //console.log(`${key}: ${value}`);
            demoInfo.append("h6")
                .text(`${key}: ${value}`);
        });        
    });
};

function updateGauge(sampleId) {
    console.log(`updateGauge(${sampleId})`);

    d3.json("static/data/samples.json").then(data => {
        //console.log(data);

        var metadata = data.metadata;
        var resultArray = metadata.filter(d => d.id == sampleId);
        var result = resultArray[0];
        //console.log(result);

        var wfreq = result.wfreq;

        console.log(wfreq);

        var gaugeData = {
                value: wfreq,
                title: {
                    text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"
                },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {
                        range: [null, 9],
                        tickmode: 'linear',
                        tick0: 0,
                        dtick: 1
                    },
                    steps: [
                        {range: [0,1], color: "rgba(255, 255, 255, 0)"},
                        {range: [1,2], color: "rgba(232, 226, 202, .5)"},
                        {range: [2,3], color: "rgba(210, 206, 145, .5)"},
                        {range: [3,4], color: "rgba(202, 209, 95, .5)"},
                        {range: [4,5], color: "rgba(184, 205, 68, .5)"},
                        {range: [5,6], color: "rgba(170, 202, 42, .5)"},
                        {range: [6,7], color: "rgba(142, 178, 35 , .5)"},
                        {range: [7,8], color: "rgba(110, 154, 22, .5)"},
                        {range: [8,9], color: "rgba(50, 143, 10, 0.5)"}
                    ]
                }
            };

                        "rgba(14, 127, 0, .5)",
                        "rgba(50, 143, 10, 0.5)",
                        "rgba(110, 154, 22, .5)",
                        "rgba(142, 178, 35 , .5)",
                        "rgba(170, 202, 42, .5)",
                        "rgba(184, 205, 68, .5)",
                        "rgba(202, 209, 95, .5)",
                        "rgba(210, 206, 145, .5)",
                        "rgba(232, 226, 202, .5)",
                        "rgba(255, 255, 255, 0)"

        var gaugeArray = [gaugeData];
        
        var gaugeLayout = {
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 0 } 
        };
        
        Plotly.newPlot('gauge', gaugeArray, gaugeLayout);

    });
};

function optionChanged(newId) {
    updateBarChart(newId);
    updateBubbleChart(newId);
    updateDemoInfo(newId);
    updateGauge(newId);
};

function init() {
    // connect to data
    d3.json("static/data/samples.json").then(data => {
        //console.log(data);

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

        updateGauge(id);
    });

};

init();
//populate dropdown
//update bargraph
//update bubble chart
//update demo info