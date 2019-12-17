// GET JSON FROM HTTP REQUEST
var theUrl = "https://api.nasa.gov/insight_weather/?api_key=c3RFS78h4rzwJOM0y6fSoo4CBWgiIw32DajxPtpa&feedtype=json&ver=1.0";
var xhr = new XMLHttpRequest();
xhr.open('GET', theUrl, true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);
var graphDiv;
var data;
var min;
var max;
var avg;
var layout;

/* Line Graph Colorscheme*/
var paperBgColor = "rgba(255,255,255,0)";
var paperFgColor= "rgba(223,223,223,1)";
var plotBgColor = "rgba(255,255,255,.3)";
var plotFgColor = "rgba(223,223,223,1)";
var plotTitleFont = {family: 'Courier New, monospace', size: 24, color: '#dfdfdf'};
var plotAxisFont = {family: 'Courier New, monospace', size: 16, color: '#dfdfdf'};

/* Wind Rose Diagram Colorscheme */
/* Partially generated with #aada2c @ https://mycolor.space/?hex=%23AADA2C&sub=1 */
/*
	"#d0d0d0",
	"#66AA11",
	"#c47f2c",
	"#30309b",
	"#7e40a5",
	"#3579A8",
	"#9999AA",
	"#303030",
	"#ff0090",
	"#80FF00",
	"#ffba68",
	"#5f5fee",
	"#bb88dd",
	"#4eb4fa",
	"#ffffff"
	"#aada2c",
	"#454839",
	"#a9ad9b",
	"#00d0f2",
	"#0097b9",
	"#ab2969",
	"#fcfcd4"
	*/
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


function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
		/* PARSE HTTP RESPONSE, GET TOP LEVEL JSON KEYS */
		var JSO = JSON.parse(xhr.responseText);
		var solNum = [JSO.sol_keys[0],JSO.sol_keys[1],JSO.sol_keys[2],
			JSO.sol_keys[3],JSO.sol_keys[4],JSO.sol_keys[5],JSO.sol_keys[6]]


		/* TEMPERATURE */
		{
		graphDiv = document.getElementById('temperature-plot');
		avg = {
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
				name: 'Avg',
				marker: {
					color: '#8cd5ff'
				  },
				line: {
					color: '#d1ff82',
					width: 2
				}
			};
		min = {
				x: [solNum[0], solNum[1],
					solNum[2], solNum[3],
					solNum[4],solNum[5],
					solNum[6]
				],
				y: [JSO[solNum[0]].AT.mn, JSO[solNum[1]].AT.mn,
					JSO[solNum[2]].AT.mn, JSO[solNum[1]].AT.mn,
					JSO[solNum[4]].AT.mn, JSO[solNum[1]].AT.mn,
					JSO[solNum[6]].AT.mn
				],
				type: 'scatter',
				name: 'Min',
				marker: {
					color: '#8cd5ff'
				  },
				line: {
					color: '#ff8c82',
					width: 2
				}
			};
		max = {
				x: [solNum[0], solNum[1],
					solNum[2], solNum[3],
					solNum[4],solNum[5],
					solNum[6]
				],
				y: [JSO[solNum[0]].AT.mx, JSO[solNum[1]].AT.mx,
					JSO[solNum[2]].AT.mx, JSO[solNum[1]].AT.mx,
					JSO[solNum[4]].AT.mx, JSO[solNum[1]].AT.mx,
					JSO[solNum[6]].AT.mx
				],
				type: 'scatter',
				name: 'Max',
				marker: {
					color: '#8cd5ff'
				  },
				line: {
					color: '#e4c6fa',
					width: 2
				}
			};

		data = [max, avg, min];
		layout = {
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
		Plotly.newPlot(graphDiv, data, layout);
		}



		/* WIND SPEED */
		{
		graphDiv = document.getElementById('wind-speed-plot');
		avg = {
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
			name: 'Avg',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#d1ff82',
				width: 2
			},
		};
		min = {
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].HWS.mn, JSO[solNum[1]].HWS.mn,
				JSO[solNum[2]].HWS.mn, JSO[solNum[1]].HWS.mn,
				JSO[solNum[4]].HWS.mn, JSO[solNum[1]].HWS.mn,
				JSO[solNum[6]].HWS.mn
			],

			type: 'scatter',
			name: 'Min',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#ff8c82',
				width: 2
			},
		};
		max = {
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].HWS.mx, JSO[solNum[1]].HWS.mx,
				JSO[solNum[2]].HWS.mx, JSO[solNum[1]].HWS.mx,
				JSO[solNum[4]].HWS.mx, JSO[solNum[1]].HWS.mx,
				JSO[solNum[6]].HWS.mx
			],

			type: 'scatter',
			name: 'Max',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#e4c6fa'
			},
		};
		data = [max, avg, min];

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
			paper_bgcolor: paperBgColor,
			plot_bgcolor: plotBgColor,
			paper_fgcolor: paperFgColor,
			plot_fgcolor: plotFgColor
		};
		Plotly.newPlot(graphDiv, data, layout);
		}


		/* WIND DIRECTION DATA FOR MOST RECENT DAY*/
		{
		var windRoseDataSet = [];
		var n = 0;
		for (var compass_pt_no in JSO[solNum[6]].WD) {
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
		layout = {
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
		graphDiv = document.getElementById('wind-direction-plot');
		Plotly.newPlot(graphDiv, windRoseDataSet, layout)
		}	
		/* WIND DIRECTION BAR GRAPH */
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
		var layout = {
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
		;
		Plotly.newPlot('wind-direction-bar', data, layout);
		  

		/* PRESSURE */
		{
		graphDiv = document.getElementById('pressure-plot');
		avg = {
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].PRE.av, JSO[solNum[1]].PRE.av,
				JSO[solNum[2]].PRE.av, JSO[solNum[1]].PRE.av,
				JSO[solNum[4]].PRE.av, JSO[solNum[1]].PRE.av,
				JSO[solNum[6]].PRE.av
			],

			type: 'scatter',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#d1ff82'
			},
			/*type: 'bar'*/
		};
		max = {
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].PRE.mx, JSO[solNum[1]].PRE.mx,
				JSO[solNum[2]].PRE.mx, JSO[solNum[1]].PRE.mx,
				JSO[solNum[4]].PRE.mx, JSO[solNum[1]].PRE.mx,
				JSO[solNum[6]].PRE.mx
			],

			type: 'scatter',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#e4c6fa'
			},
		};
		min = {
			x: [solNum[0], solNum[1],
				solNum[2], solNum[3],
				solNum[4],solNum[5],
				solNum[6]
			],
			y: [JSO[solNum[0]].PRE.mn, JSO[solNum[1]].PRE.mn,
				JSO[solNum[2]].PRE.mn, JSO[solNum[1]].PRE.mn,
				JSO[solNum[4]].PRE.mn, JSO[solNum[1]].PRE.mn,
				JSO[solNum[6]].PRE.mn
			],

			type: 'scatter',
			marker: {
				color: '#8cd5ff'
			},
			line: {
				color: '#ff8c82'
			},
		};
		data = [avg, min, max];
		layout = {
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
		Plotly.newPlot(graphDiv, data, layout);
		}
	}
}

/* -----------------------------------------------------*/
/* -------------------- DUMMY --------------------------*/
/* -------------------- PLOTS ---------------------------*/
/* -----------------------------------------------------*/
/* TEMPERATURE */
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
/* WIND SPEED */
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