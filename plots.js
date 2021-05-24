function init() {
    // dropdown menu variable
    var selector = d3.select("#selDataset");
    // read the data and assigned to "data" argument
    d3.json("samples.json").then((data) => {
        console.log(data);
        // names array variable 
        var sampleNames = data.names;
        // for each element in the names array
        // dropdown menu option is appended
        // text of each option is the ID
        // value property is assigned the ID 
        sampleNames.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    })
}
init();

// This function is declared, not called in plots.js
// Called by onchange attribute in index.html
// this.value = newSample
// newSample is the ID number 
function optionChanged(newSample) {
    // Two functions will use the ID number
    // to create the individual's metadata information panel and charts 
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Metadata Function
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        // metadata array variable
        var metadata = data.metadata;
        // filter() metadata array for an object
        // in the array whose id matches the ID number (sample)
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // assign first item in the array to variable
        var result = resultArray[0];
        // variable to assign to html id 
        var PANEL = d3.select("#sample-metadata")
    
    // Clear contents of panel when another ID is chosen    
    PANEL.html("");
    // Append h6 heading and print location of the volunter
    PANEL.append("h6").text(result.location);
    });
};