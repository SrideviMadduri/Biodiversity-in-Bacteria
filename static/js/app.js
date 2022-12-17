
const sample = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
var json_data={}
d3.json(sample).then(function(data) {
  //console.log(data['names'].length);
  json_data=data;
  names_array = data['names']

  var select = document.getElementById("selDataset");
  for(index in names_array ) {
    select.options[select.options.length] = new Option(names_array [index], index);
}
optionChanged(0);

});

// let names = Object.values(data.names);
// console.log(names);

function optionChanged(x){
  //console.log(json_data['samples'][x]['sample_values']);
  var data = [{
    type: 'bar',
    x: json_data['samples'][x]['sample_values'].slice(0,10).reverse(),
    y: json_data['samples'][x]['otu_ids'].slice(0,10).map(a => 'OTU ' + a).reverse(),
    orientation: 'h'
  }];

  Plotly.newPlot('bar', data);


}

