


		// ... Or the most_common for each day??
		/*
		for (var i = 0; i < solNum.length; i++) {
			// ... Each compass reading within that day
			var r_arr = [];
			var theta_arr = [];
			r_arr.push(JSO[solNum[i]].WD.most_common.compass_degrees);
			theta_arr.push(JSO[solNum[i]].WD.most_common.compass_point);
			var windDataInstance = {
				r:		r_arr,
				theta: 	theta_arr,
				name: 	"Sol #" +solNum[i],
				marker: {
						color: WRColors[i]
				},
				type: 	"barpolar"
			}
			windDataSet.push(windDataInstance);
		}
		*/
		/*
		console.log(windDataSet);
		var windDataSet = [{
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
	