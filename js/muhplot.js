// GET JSON FROM HTTP REQUEST
var theUrl = "https://api.nasa.gov/insight_weather/?api_key=c3RFS78h4rzwJOM0y6fSoo4CBWgiIw32DajxPtpa&feedtype=json&ver=1.0";
var xhr = new XMLHttpRequest();
xhr.open('GET', theUrl, true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);
var graphDiv;
var data;
var layout;

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
		var JSO = JSON.parse(xhr.responseText);
		var solNum = [JSO.sol_keys[0],JSO.sol_keys[1],JSO.sol_keys[2],
			JSO.sol_keys[3],JSO.sol_keys[4],JSO.sol_keys[5],JSO.sol_keys[6]]
		
		/* TEMPERATURE */
		graphDiv = document.getElementById('temperature-plot');
		data = [{
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].AT.av, JSO[solNum[1]].AT.av,
				JSO[solNum[2]].AT.av, JSO[solNum[1]].AT.av,
				JSO[solNum[4]].AT.av, JSO[solNum[1]].AT.av,
				JSO[solNum[6]].AT.av
			],
			type: 'scatter',
			marker: {
				color: '#8cd5ff'
			  },
			line: {
				color: '#d1ff82'
			}
		}];

		layout = {
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

		/* WIND SPEED */
		graphDiv = document.getElementById('wind-speed-plot');
		data = [{
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].HWS.av, JSO[solNum[1]].HWS.av,
				JSO[solNum[2]].HWS.av, JSO[solNum[1]].HWS.av,
				JSO[solNum[4]].HWS.av, JSO[solNum[1]].HWS.av,
				JSO[solNum[6]].HWS.av
			],

			type: 'scatter',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#d1ff82'
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
				title: 'Horizontal Wind Speed (m/s)',
				color: '#dfdfdf',
		  	  	showline: false
			},
			paper_bgcolor: "rgba(255,255,255,0)",
			plot_bgcolor: "rgba(255,255,255,.1)",
			paper_fgcolor: "rgba(223,223,223,1)",
			plot_fgcolor: "rgba(223,223,223,1)"
		};
		Plotly.newPlot(graphDiv, data, layout);


		for (var i = 0; i < 7; i++) {
			console.log(JSO[solNum[i]].WD);
		}
		data = [{
		    r: [JSO[solNum[0]].WD.most_common.compass_degrees],
		    theta: [JSO[solNum[0]].WD.most_common.compass_point],
		    name: "Sol #"+solNum[0],
		    marker: {color: "rgb(106,81,163)"},
		    type: "barpolar"
		  }, {
		    r: [JSO[solNum[1]].WD.most_common.compass_degrees],
		    theta: [JSO[solNum[1]].WD.most_common.compass_point],
		    name: "Sol #"+solNum[1],
		    marker: {color: "rgb(158,154,200)"},
		    type: "barpolar"
		  }, {
		    r: [40.0, 30.0, 30.0, 35.0, 7.5, 7.5, 32.5, 40.0],
		    theta: ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"],
		    name: "5-8 m/s",
		    marker: {color: "rgb(203,201,226)"},
		    type: "barpolar"
		  }, {
		    r: [20.0, 7.5, 15.0, 22.5, 2.5, 2.5, 12.5, 22.5],
		    theta: ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"],
		    name: "< 5 m/s",
		    marker: {color: "rgb(242,240,247)"},
		    type: "barpolar"
		  }]
		layout = {
		    font: {size: 16},
			legend: {font: {size: 16}},
			color: '#dfdfdf',
		    polar: {
		      barmode: "overlay",
		      bargap: 0,
		      radialaxis: {ticksuffix: "%", angle: 45, dtick: 20},
		      angularaxis: {direction: "clockwise"}
			},
			title: {
				text:'Wind Direction [Wind Rose Chart]: x days',
				font: {
				  family: 'Courier New, monospace',
				  size: 24,
				  color: '#dfdfdf'
				}
			},
		
			paper_bgcolor: "rgba(255,255,255,0)",
			plot_bgcolor: "rgba(255,255,255,.1)",
			paper_fgcolor: "rgba(223,223,223,1)",
			plot_fgcolor: "rgba(223,223,223,1)"
		  }
	  
		graphDiv = document.getElementById('wind-direction-plot');
		Plotly.newPlot(graphDiv, data, layout)

		/* PRESSURE */
		graphDiv = document.getElementById('pressure-plot');
		data = [{
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].HWS.av, JSO[solNum[1]].HWS.av,
				JSO[solNum[2]].HWS.av, JSO[solNum[1]].HWS.av,
				JSO[solNum[4]].HWS.av, JSO[solNum[1]].HWS.av,
				JSO[solNum[6]].HWS.av
			],

			type: 'scatter',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#d1ff82'
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
				title: 'Horizontal Wind Speed (m/s)',
				color: '#dfdfdf',
		  	  	showline: false
			},
			paper_bgcolor: "rgba(255,255,255,0)",
			plot_bgcolor: "rgba(255,255,255,.1)",
			paper_fgcolor: "rgba(223,223,223,1)",
			plot_fgcolor: "rgba(223,223,223,1)"
		};
		Plotly.newPlot(graphDiv, data, layout);



    }
}


/* TEMPERATURE */
graphDiv = document.getElementById('temperature-plot');
data = [{
	x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	y: [1, 2, 4, 8, 6, 2, 8, 2, 6, 82, 13, 32, 22, 12, 55, 23] ,
	type: 'scatter',
	marker: {
		color: '#8cd5ff'
	  },
	line: {
		color: '#d1ff82'
	}
}];

layout = {
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
		color: '#8cd5ff'
	},
	line: {
		color: '#d1ff82'
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


data = [{
    r: [77.5, 72.5, 70.0, 45.0, 22.5, 42.5, 40.0, 62.5],
    theta: ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"],
    name: "11-14 m/s",
    marker: {color: "rgb(106,81,163)"},
    type: "barpolar"
  }, {
    r: [57.5, 50.0, 45.0, 35.0, 20.0, 22.5, 37.5, 55.0],
    theta: ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"],
    name: "8-11 m/s",
    marker: {color: "rgb(158,154,200)"},
    type: "barpolar"
  }, {
    r: [40.0, 30.0, 30.0, 35.0, 7.5, 7.5, 32.5, 40.0],
    theta: ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"],
    name: "5-8 m/s",
    marker: {color: "rgb(203,201,226)"},
    type: "barpolar"
  }, {
    r: [20.0, 7.5, 15.0, 22.5, 2.5, 2.5, 12.5, 22.5],
    theta: ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"],
    name: "< 5 m/s",
    marker: {color: "rgb(242,240,247)"},
    type: "barpolar"
  }]
layout = {
    font: {size: 16},
	legend: {font: {size: 16}},
	color: '#dfdfdf',
    polar: {
      barmode: "overlay",
      bargap: 0,
      radialaxis: {ticksuffix: "%", angle: 45, dtick: 20},
      angularaxis: {direction: "clockwise"}
	},
	title: {
		text:'Wind Direction [Wind Rose Chart]: x days',
		font: {
		  family: 'Courier New, monospace',
		  size: 24,
		  color: '#dfdfdf'
		}
	},

	paper_bgcolor: "rgba(255,255,255,0)",
	plot_bgcolor: "rgba(255,255,255,.1)",
	paper_fgcolor: "rgba(223,223,223,1)",
	plot_fgcolor: "rgba(223,223,223,1)"
  }

graphDiv = document.getElementById('wind-direction-plot');
Plotly.newPlot(graphDiv, data, layout)






