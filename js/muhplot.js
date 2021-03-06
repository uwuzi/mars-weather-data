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

var date = new Date();
var dateStr = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
var graphDiv;
var data;
var min;
var max;
var avg;
var x_data = [];
var ymax_data = [];
var yavg_data = [];
var ymin_data = [];

// Layouts
{
var temperatureLayout= {
	title: {
		text:'Temperature vs Time (avg)',
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
		text:'Wind Speed vs Time (avg)',
		font: {
		  family: 'Courier New, monospace',
		  size: 24,
		  color: '#dfdfdf'
		}
	},
  	xaxis: {
    	title: {
			text: 'Martian Sol (Day) # ',
			font : plotAxisFont
		},
		color: '#dfdfdf',
    	showgrid: true,
    	zeroline: true
  	},
  	yaxis: {
    	title: {
			text: 'Horizontal Wind Speed (m/s)',
			font : plotAxisFont
		},
		color: '#dfdfdf',
  	  	showline: false
	},
	paper_bgcolor: paperBgColor,
	plot_bgcolor: plotBgColor,
	paper_fgcolor: paperFgColor,
	plot_fgcolor: plotFgColor
};
var windDirectionRoseLayout = {
	font: plotAxisFont,
	color: '#00ffff',
	showlegend: false,
    polar: {
		color: '#00ffff',
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
		text:'Wind Direction Chart: '+ dateStr,
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
		text:'Wind vs Pressure',
		font: {
		  family: 'Courier New, monospace',
		  size: 18,
		  color: '#dfdfdf'
		}
	},
	xaxis: {
    	title: {
			text: 'Atm. Pressure (Pa)',
			font : plotAxisFont
		},
		name: 'Avg',
		color: '#dfdfdf',
    	showgrid: true,
    	zeroline: true
	  },
	yaxis: {
    	title: {
			text: 'Wind Speed (m/s)',
			font : plotAxisFont
		},
		name: 'Avg',
		color: '#dfdfdf',
    	showgrid: true,
    	zeroline: true
  	},
	paper_bgcolor: paperBgColor, 
	plot_bgcolor: plotBgColor,
	paper_fgcolor: paperFgColor,
	plot_fgcolor: plotFgColor
}

var pressureLayout = {
	title: {
		text:'Pressure vs Time (avg)',
		font: {
		  family: 'Courier New, monospace',
		  size: 24,
		  color: '#dfdfdf'
		}
	},
  	xaxis: {
    	title: {
			text: 'Martian Sol (Day) # ',
			font : plotAxisFont
		},
		color: '#dfdfdf',
    	showgrid: true,
    	zeroline: true
  	},
  	yaxis: {
    	title: {
			title: 'Pressure (Pa)',
			font : plotAxisFont
		},
		color: '#dfdfdf',
  	  	//showline: false
	},
	paper_bgcolor: paperBgColor,
	plot_bgcolor: plotBgColor,
	paper_fgcolor: paperFgColor,
	plot_fgcolor: plotFgColor
};
}


function dateFromUTCString(s) {
	s = s.split(/[-T:Z]/ig);
	return new Date(Date.UTC(s[0], --s[1], s[2], s[3], s[4], s[5]));
}


function callback(response) {
	var JSO = JSON.parse(response);
	var solNum = Object.keys(JSO);

	var firstUTC = JSO[solNum[0]].Last_UTC;
	var lastUTC = JSO[solNum[solNum.length-1]].Last_UTC;

	document.getElementById("first-data-footer").innerHTML = "First data recorded: "+ dateFromUTCString(firstUTC);
	document.getElementById("last-data-footer").innerHTML = "Last data recorded: "+ dateFromUTCString(lastUTC);

	// GET MIN && MAX INFO
	var todaysMaxTemp = JSO[solNum[solNum.length-1]].AT.mx;
	var todaysMinTemp = JSO[solNum[solNum.length-1]].AT.mn;
	var temperatureInfoHtml = "<h3>Today</h3><p><strong>Max: "+todaysMaxTemp.toFixed(3)+" F<br>Min: "+todaysMinTemp.toFixed(3)+" F</strong></p>";
	document.getElementById('temperature-info').innerHTML = temperatureInfoHtml;

	var todaysMaxWind = JSO[solNum[solNum.length-1]].HWS.mx;
	var todaysMinWind = JSO[solNum[solNum.length-1]].HWS.mn;
	var windSpeedInfoHtml = "<h3>Today</h3><p><strong>Max: "+todaysMaxWind.toFixed(3)+" m/s<br>Min: "+todaysMinWind.toFixed(3)+" m/s</strong></p>";
	document.getElementById('wind-speed-info').innerHTML = windSpeedInfoHtml;

	var todaysMaxPressure = JSO[solNum[solNum.length-1]].PRE.mx;
	var todaysMinPressure = JSO[solNum[solNum.length-1]].PRE.mn;
	var pressureInfoHtml = "<h3>Today</h3><p><strong>Max: "+todaysMaxPressure.toFixed(3)+" Pa<br>Min: "+todaysMinPressure.toFixed(3)+" Pa</strong></p>";
	document.getElementById('pressure-info').innerHTML = pressureInfoHtml;


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
			marker: {color:'#fafafa',size:10},
			line: {color:'#d1ff82',width:4}
		};
	min = {
			x: x_data,
			y: ymin_data,
			type: 'scatter',
			name: 'Min',
			marker: {color:'#fafafa',size:10},
			line: {color:'#ff8c82',width:4}
		};
	max = {
			x: x_data,
			y: ymax_data,
			type: 'scatter',
			name: 'Max',
			marker: {color:'#fafafa',size:10},
			line: {color:'#e4c6fa',width:4}
		};
	var data = [avg];
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
			marker: {color:'#fafafa',size:10},
			line: {color:'#d1ff82',width:4}
		};
	min = {
			x: x_data,
			y: ymin_data,
			type: 'scatter',
			name: 'Min',
			marker: {color:'#fafafa',size:10},
			line: {color:'#ff8c82',width:4}
		};
	max = {
			x: x_data,
			y: ymax_data,
			type: 'scatter',
			name: 'Max',
			marker: {color:'#fafafa',size:10},
			line: {color:'#e4c6fa',width:4}
		};
	data = [avg];
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


	// PRESSURE VS WIND/TEMP
	var pressureData = [];
	var windData = [];
	data = [];
	for(var i = 0; i < solNum.length; i++) {
		pressureData.push(JSO[solNum[i]].PRE.av);
		windData.push(JSO[solNum[i]].HWS.av);
	}
	var preVsWind = {
		x: pressureData,
		y: windData,
		name: 'Average',
		type: 'scatter',
		mode: 'markers',
		marker: { size: 12, color: "#d1ff82" },
		//line: {width: 4, color: "#d1ff82"}
	};
	data = [preVsWind];
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
			marker: {color:'#fafafa',size: 10},
			line: {color:'#d1ff82',width:4}
		};
	min = {
			x: x_data,
			y: ymin_data,
			type: 'scatter',
			name: 'Min',
			marker: {color:'#fafafa',size: 10},
			line: {color:'#ff8c82',width:4}
		};
	max = {
			x: x_data,
			y: ymax_data,
			type: 'scatter',
			name: 'Max',
			marker: {color:'#fafafa',size: 10},
			line: {color:'#e4c6fa',width:4}
		};
	data = [avg];
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
