// GET JSON FROM HTTP REQUEST
/*
var theUrl = "https://api.nasa.gov/insight_weather/?api_key=c3RFS78h4rzwJOM0y6fSoo4CBWgiIw32DajxPtpa&feedtype=json&ver=1.0";
var xhr = new XMLHttpRequest();
xhr.open('GET', theUrl, true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);
*/
var graphDiv;
var data;
var min;
var max;
var avg;
var x_data = [];
var ymax_data = [];
var yavg_data = [];
var ymin_data = [];

/* Line Graph Colorscheme*/
var paperBgColor = "rgba(255,255,255,0)";
var paperFgColor= "rgba(223,223,223,1)";
var plotBgColor = "rgba(255,255,255,.3)";
var plotFgColor = "rgba(223,223,223,1)";
var plotTitleFont = {family: 'Courier New, monospace', size: 24, color: '#dfdfdf'};
var plotAxisFont = {family: 'Courier New, monospace', size: 16, color: '#dfdfdf'};

/* Wind Rose Diagram Colorscheme */
/* Partially generated with #aada2c @ https://mycolor.space/?hex=%23AADA2C&sub=1 */
var WRColors = [
	"#DBF0A8",
	"#D4ED97",
	"#CDEA86",
	"#C6E774",
	"#BFE363",
	"#B8E052",
	"#B1DD40",
	"#AADA2C",
	"#A0D025",
	"#92BF22",
	"#85AD1F",
	"#789C1C",
	"#6A8B18",
	"#5D7915",
	"#506812",
	"#42570F"

];




function callback(response) {
	var JSO = JSON.parse(response);
	var solNum = Object.keys(JSO);


	// Layouts
	{
	var temperatureLayout= {
		title: {
			text:'Temperature Data: x days',
			font: plotTitleFont
		},
	  	xaxis: {
	    	title: {
				text: 'Martian Sol (Day) # ',
				font : plotAxisFont
			},
			name: 'Avg',
			color: '#dfdfdf',
	    	showgrid: true,
	    	zeroline: true
	  	},
	  	yaxis: {
	  	  	title: {
				text: 'Temp (F)',
				font: plotAxisFont
			},
			color: '#dfdfdf',
	  	  	showline: false
		},
		paper_bgcolor: paperBgColor,
		plot_bgcolor: plotBgColor,
		paper_fgcolor: paperFgColor,
		plot_fgcolor: plotFgColor
	};

	var windSpeedlayout = {
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
		paper_bgcolor: paperBgColor,
		plot_bgcolor: plotBgColor,
		paper_fgcolor: paperFgColor,
		plot_fgcolor: plotFgColor
	};
	var windDirectionRoseLayout = {
	    font: {size: 12},
		color: '#dfdfdf',
		showlegend: false,
	    polar: {
	    	barmode: "overlay",
	    	bargap: 10,
	    	radialaxis: {
				showradialaxis: false,
				ticksuffix: "%", angle: 0, dtick: 0,
				color: "#dfdfdf00"
			},
	    	angularaxis: {
				color: '#dfdfdf',
				direction: "clockwise",
			}
		},
		title: {
			text:'Wind Direction Chart: Today',
			font: {
			  family: 'Courier New, monospace',
			  size: 18,
			  color: '#dfdfdf'
			}
		},
		paper_bgcolor: paperBgColor, 
		plot_bgcolor: plotBgColor,
		paper_fgcolor: paperFgColor,
		plot_fgcolor: plotFgColor
	}

	var windDirectionBarLayout = {
		title: {
			text:'Wind Direction Chart: Today',
			font: {
			  family: 'Courier New, monospace',
			  size: 18,
			  color: '#dfdfdf'
			}
		},
		xaxis: {
	    	title: {
				text: 'Martian Sol (Day) # ',
				font : plotAxisFont
			},
			name: 'Avg',
			color: '#dfdfdf',
	    	showgrid: true,
	    	zeroline: true
		  },
		yaxis: {
	    	title: {
				text: '# ',
				font : plotAxisFont
			},
			name: 'Avg',
			color: '#dfdfdf',
	    	showgrid: true,
	    	zeroline: true
	  	},
		barmode: 'stack',
		paper_bgcolor: paperBgColor, 
		plot_bgcolor: plotBgColor,
		paper_fgcolor: paperFgColor,
		plot_fgcolor: plotFgColor
	}

	var pressureLayout = {
		title: {
			text:'Air Pressure Data: x days',
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
			title: 'Air Pressure (Pa)',
			color: '#dfdfdf',
	  	  	showline: false
		},
		paper_bgcolor: paperBgColor,
		plot_bgcolor: plotBgColor,
		paper_fgcolor: paperFgColor,
		plot_fgcolor: plotFgColor
	};
	}


	// TEMPERATURE
	for (var i = 0; i < solNum.length; i++) {
		x_data.push(solNum[i]);
		ymax_data.push(JSO[solNum[i]].AT.mx);
		yavg_data.push(JSO[solNum[i]].AT.av);
		ymin_data.push(JSO[solNum[i]].AT.mn);
	}
	avg = {
			x: x_data,
			y: yavg_data,
			type: 'scatter',
			name: 'Avg',
			marker: {color:'#8cd5ff'},
			line: {color:'#d1ff82',width:2}
		};
	min = {
			x: x_data,
			y: ymin_data,
			type: 'scatter',
			name: 'Min',
			marker: {color:'#8cd5ff'},
			line: {color:'#ff8c82',width:2}
		};
	max = {
			x: x_data,
			y: ymax_data,
			type: 'scatter',
			name: 'Max',
			marker: {color:'#8cd5ff'},
			line: {color:'#e4c6fa',width:2}
		};
	var data = [max, avg, min];
	graphDiv = document.getElementById('temperature-plot');
	Plotly.newPlot(graphDiv, data, temperatureLayout);

	// WIND SPEED
	x_data = [];
	ymax_data = []
	yavg_data = []
	ymin_data = []
	for (var i = 0; i < solNum.length; i++) {
		x_data.push(solNum[i]);
		ymax_data.push(JSO[solNum[i]].HWS.mx);
		yavg_data.push(JSO[solNum[i]].HWS.av);
		ymin_data.push(JSO[solNum[i]].HWS.mn);
	}
	avg = {
			x: x_data,
			y: yavg_data,
			type: 'scatter',
			name: 'Avg',
			marker: {color:'#8cd5ff'},
			line: {color:'#d1ff82',width:2}
		};
	min = {
			x: x_data,
			y: ymin_data,
			type: 'scatter',
			name: 'Min',
			marker: {color:'#8cd5ff'},
			line: {color:'#ff8c82',width:2}
		};
	max = {
			x: x_data,
			y: ymax_data,
			type: 'scatter',
			name: 'Max',
			marker: {color:'#8cd5ff'},
			line: {color:'#e4c6fa',width:2}
		};
	data = [max, avg, min];
	graphDiv = document.getElementById('wind-speed-plot');
	Plotly.newPlot(graphDiv, data, windSpeedlayout);



	///WIND DIRECTION DATA FOR MOST RECENT DAY
	{
	var windRoseDataSet = [];
	var n = 0;
	var lastSol = solNum[solNum.length-1];
	for (var compass_pt_no in JSO[lastSol].WD) {
		var r_arr = [];
		var theta_arr = [];
		r_arr.push(JSO[solNum[6]].WD[compass_pt_no].compass_degrees);
		theta_arr.push(JSO[solNum[6]].WD[compass_pt_no].compass_point);
		var windDataInstance = {
			r:		r_arr,
			theta: 	theta_arr,
			marker: {
					color: WRColors[n]
			},
			type: 	"barpolar"
		}
		windRoseDataSet.push(windDataInstance);
		n++;
	}
	graphDiv = document.getElementById('wind-direction-plot');
	Plotly.newPlot(graphDiv, windRoseDataSet, windDirectionRoseLayout);
	}	

	//WIND DIRECTION BAR GRAPH 
	var trace1 = {
		x: [20, 14, 23],
		y: ['giraffes', 'orangutans', 'monkeys'],
		name: 'SF Zoo',
		type: 'bar',
		orientation: 'h',
	};
	var trace2 = {
		x: [12, 18, 29],
		y: ['giraffes', 'orangutans', 'monkeys'],
		name: 'LA Zoo',
		type: 'bar',
		orientation: 'h',
	};
	data = [
		trace1, trace2
	];
	Plotly.newPlot('wind-direction-bar', data, windDirectionBarLayout);

	// PRESSURE 
	x_data = [];
	ymax_data = []
	yavg_data = []
	ymin_data = []
	for (var i = 0; i < solNum.length; i++) {
		x_data.push(solNum[i]);
		ymax_data.push(JSO[solNum[i]].PRE.mx);
		yavg_data.push(JSO[solNum[i]].PRE.av);
		ymin_data.push(JSO[solNum[i]].PRE.mn);
	}
	avg = {
			x: x_data,
			y: yavg_data,
			type: 'scatter',
			name: 'Avg',
			marker: {color:'#8cd5ff'},
			line: {color:'#d1ff82',width:2}
		};
	min = {
			x: x_data,
			y: ymin_data,
			type: 'scatter',
			name: 'Min',
			marker: {color:'#8cd5ff'},
			line: {color:'#ff8c82',width:2}
		};
	max = {
			x: x_data,
			y: ymax_data,
			type: 'scatter',
			name: 'Max',
			marker: {color:'#8cd5ff'},
			line: {color:'#e4c6fa',width:2}
		};
	data = [max, avg, min];
	graphDiv = document.getElementById('pressure-plot');
	Plotly.newPlot(graphDiv, data, pressureLayout);
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("http://www.uwuzi.com/data/data.json", callback);




/* -----------------------------------------------------*/
/* -------------------- DUMMY --------------------------*/
/* -------------------- PLOTS ---------------------------*/
/* -----------------------------------------------------*/
{
/*
// TEMPERATURE 
graphDiv = document.getElementById('temperature-plot');
data = [{
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
	paper_bgcolor: paperBgColor,
	plot_bgcolor: plotBgColor,
	paper_fgcolor: paperFgColor,
	plot_fgcolor: plotFgColor
};
Plotly.newPlot(graphDiv, data, layout);
// WIND SPEED 
graphDiv = document.getElementById('wind-speed-plot');
data = [{
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
	paper_bgcolor: paperBgColor,
	plot_bgcolor: plotBgColor,
	paper_fgcolor: paperFgColor,
	plot_fgcolor: plotFgColor
};
Plotly.newPlot(graphDiv, data, layout);
data = [{
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

	paper_bgcolor: paperBgColor,
	plot_bgcolor: plotBgColor,
	paper_fgcolor: paperFgColor,
	plot_fgcolor: plotFgColor
  }
graphDiv = document.getElementById('wind-direction-plot');
Plotly.newPlot(graphDiv, data, layout)
*/
}
