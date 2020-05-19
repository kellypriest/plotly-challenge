
var sampleData;
function getData() { 
    d3.json("data/samples.json").then((data) => {
        
        sampleData = data
        var sample = sampleData.samples
        var id = sample.map(data => data.id)
        var sampleVal = sample.map(data => data.sample_values)
        var otu_ids = sample.map(data => data.otu_ids)
        //mID, ethnicity, gender, age, location, bbtype, and wfreq \\
        var meta = sampleData.metadata;
        var mID = meta.map(item => item.id);
        var ethnicity = meta.map(item => item.ethnicity);
        var gender = meta.map(item => item.gender);
        var age = meta.map(item => item.age);
        var location = meta.map(item => item.location);
        var bbtype = meta.map(item => item.bbtype);
        var wfreq = meta.map(item => item.wfreq);
        
        //initialize the metadata table
        init(id, sampleVal, otu_ids, mID, ethnicity, gender, age, location, bbtype, wfreq);
    });
};

function init(id, sampleVal, otu_ids, mID, ethnicity, gender, age, location, bbtype, wfreq) {
    //create table
    var tbod = d3.select('#sample-metadata');
    tbod.append('tr').text(`ID : ${mID[0]}`);
    tbod.append('tr').text(`Ethnicity : ${ethnicity[0]}`);
    tbod.append('tr').text(`Gender : ${gender[0]}`);
    tbod.append('tr').text(`Age : ${age[0]}`);
    tbod.append('tr').text(`Location: ${location[0]}`);
    tbod.append('tr').text(`BBtype : ${bbtype[0]}`);
    tbod.append('tr').text(`W-frequency : ${wfreq[0]}`);

 
    for (var i = 0; i < id.length; i++) {
        d3.select('select').append('option').property('value', `${id[i]}`).text(`${id[i]}`)
    }

    //Graphs

    //bar
    var trace1 = {
        y: otu_ids[0].slice(0,10),
        x: sampleVal[0].slice(0,10),
        type: 'bar',
        orientation: 'h'
    };

    var layout = {
        title: `Subject ${id[0]}`,
        xaxis: {
            title: 'Sample Value'
        },
        yaxis: { 
            title: 'Sample Number',
            type: 'category',
            autorange: 'reversed'}
    };
    
    var data = [trace1]

    Plotly.newPlot('bar', data, layout);

    //bubble
    var trace2 = {
        x: otu_ids[0],
        y: sampleVal[0],
        mode: 'markers',
        marker: {
            color: otu_ids[0],
            size: sampleVal[0]
            }      
        };
    var layout = {
        title: `Bubble Chart for Subject ${id[0]} Samples`
    };
    var data = [trace2];

    Plotly.newPlot('bubble', data, layout);
};

getData();


