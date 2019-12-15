
/* TEMPERATURE */
var graphDiv = document.getElementById('temperature-plot');
var data = [{
	x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	y: [1, 2, 4, 8, 6, 2, 8, 2, 6, 82, 13, 32, 22, 12, 55, 23] ,
	type: 'scatter',
	marker: {
		color: '#dfdfdf'
	  },
	line: {
		color: '#dfdfdf'
	}
}];

var layout = {
	title: {
		text:'Temperature Data: x days',
		font: {
		  family: 'Courier New, monospace',
		  size: 24,
		  color: '#dfdfdf'
		}
	},
  	xaxis: {
    	title: 'Martian Sol (Day) # ',
		color: '#dfdfdf',
    	showgrid: true,
    	zeroline: true
  	},
  	yaxis: {
  	  	title: 'Temp (F)',
		color: '#dfdfdf',
  	  	showline: false
	},
	paper_bgcolor: "rgba(255,255,255,0)",
	plot_bgcolor: "rgba(255,255,255,.1)",
	paper_fgcolor: "rgba(223,223,223,1)",
	plot_fgcolor: "rgba(223,223,223,1)"
};
Plotly.newPlot(graphDiv, data, layout);
/*
var dataRetrievedLater = graphDiv.data;
var layoutRetrievedLater = graphDiv.layout;
*/
var temperatureData= graphDiv.data;
var temperatureLayout= graphDiv.layout;

/* WIND SPEED */
graphDiv = document.getElementById('wind-speed-plot');
data = [{
	x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	y: [1, 2, 4, 8, 6, 2, 8, 2, 6, 82, 13, 32, 22, 12, 55, 23] ,
	type: 'scatter',
	marker: {
		color: '#dfdfdf'
	},
	line: {
		color: '#dfdfdf'
	},
	/*type: 'bar'*/
}];

layout = {
	title: {
		text:'Wind Speed Data: x days',
		font: {
		  family: 'Courier New, monospace',
		  size: 24,
		  color: '#dfdfdf'
		}
	},
  	xaxis: {
		title: 'Martian Sol (Day) # ',
		color: '#dfdfdf',
    	showgrid: true,
    	zeroline: true
  	},
  	yaxis: {
		title: 'Temp (F)',
		color: '#dfdfdf',
  	  	showline: false
	},
	paper_bgcolor: "rgba(255,255,255,0)",
	plot_bgcolor: "rgba(255,255,255,.1)",
	paper_fgcolor: "rgba(223,223,223,1)",
	plot_fgcolor: "rgba(223,223,223,1)"
};
Plotly.newPlot(graphDiv, data, layout);