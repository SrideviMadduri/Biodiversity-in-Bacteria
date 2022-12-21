
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
    text: json_data['samples'][x]['otu_labels'],
    orientation: 'h'
  }];

  Plotly.newPlot('bar', data);


  var trace1 = {
  x: json_data['samples'][x]['otu_ids'],
  y: json_data['samples'][x]['sample_values'],
  text: json_data['samples'][x]['otu_labels'],
  mode: 'markers',
  marker: {
    color: json_data['samples'][x]['otu_ids'],
    //colorscale: [[0, 'rgb(93, 164, 214'], [1, 'rgb(255, 65, 54)']],
    colorscale: 'RdBu',
    //cmin: 50,
    //cmax: 200,
    //opacity: [0.7],
    size:  json_data['samples'][x]['sample_values'].map(x=>x/1.8),
    sizemode: 'diameter'
  
  }
};

var data1 = [trace1];

var layout = {
  // title: 'Marker Size and Color',
  showlegend: false,
  height: 600,
  width: 800
};

Plotly.newPlot('bubble', data1, layout);

demo_info = document.getElementById('sample-metadata');
if(demo_info.firstElementChild){
  demo_info.removeChild(demo_info.firstElementChild);
}
demo_div_child = document.createElement('Div');
demo_info.appendChild(demo_div_child)


const metadata = json_data['metadata'][x]
for(let key in metadata){
  demo_div_child.appendChild(document.createTextNode(key+': '+ metadata[key]));
  demo_div_child.appendChild(document.createElement('BR'));
}


}



