/**
	Sampler of svg based chart. Here a pie and bar chart, 
	both interactive with tap event. Only the bar chart handle onmouseover event
*/

enyo.kind({
	name: "d3test",
	style: "background-color:#e8e8e8;",
	components: [
	{kind: "onyx.Popup", centered: true, floating: true,name:'popup'},
		],
	events:{
		onMarkerClick:'',
	},
	rendered : function () {
		this.inherited(arguments);
		this.drawChart();
	},
	drawChart : function () {

		var that = this;
		// var margin = {top: 0, right: 0, bottom: 0, left: 0},
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
	    width = 1000 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

		var x0 = d3.scale.ordinal()
		    .rangeRoundBands([0, width], 0.2);

		var x1 = d3.scale.ordinal();

		var y = d3.scale.linear()
		    .range([height, 0]);

		var color = d3.scale.ordinal()
		    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

		var xAxis = d3.svg.axis()
		    .scale(x0)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(5)
		    .tickSize(-width,0,0)
		    .tickFormat(d3.format(".2s"));

		var svg = d3.select("#"+this.hasNode().id).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		   var legends = ["april","may","june","july",];
		var datas = [[1,2,4], [4,3,2,], [1,3,2,],[4,5,6]];
		var devs = ['bob','alice','eve',];
		// 	var o= d3.map({
		// 	az: [0,2,2],
		// 	ar:{ e:5,y:6}
		// })
			// enyo.log(o.keys());
	  	x0.domain(legends);
	  	// x0.domain(data.map(function(d) { return d.State; }));
	  	x1.domain(devs).rangeRoundBands([0, x0.rangeBand()],.05);
	  	y.domain([0, d3.max(datas,function(d) { return d3.max(d)})]);
	  	// y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);
	  	// x0(0);
		// enyo.log(x0(0));
		// enyo.log(x0(1));
		enyo.log(x0.rangeBand());

	  	svg.append("g")
	      	.attr("class", "x axis")
	      	.attr("transform", "translate(0," + height + ")")
	     	.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Population");

		var month = svg.selectAll(".month")
			.data(datas)
		.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d) { return "translate(" + x0(d) + ",0)"; });


		var tooltip = d3.select("#"+this.hasNode().id)
			.append("div")
			.attr("class","tooltip")
			.style("opacity", 0);

		month.selectAll("rect")
			.data(function(d){return d;})
		.enter().append("rect")
			.attr("width", x1.rangeBand())
			.attr("x", function(d,i) { return x1(devs[i]); })
			.attr("y", function(d,i) { return y(d); })
			.attr("height", function(d,i) { return height - y(d); })
			.attr('class',function(d,i){return 'bar_all series_'+i;})
			.on("click",function(d,i){ that.doMarkerClick({value:d,dev:devs[i]});})
			.on("mouseover",function(d,i){ 
				// enyo.log(d3.mouse(d3.select("#"+that.hasNode().id)));
				tooltip.transition()        
                .duration(200)
                .style("opacity",.8)
					.text(d)
					.style("z-index",5)
					// .style("left",(d3.mouse()[0])+'px')
					// .style("top",(d3.mouse()[1])+'px');
					.style("left",(d3.event.pageX)+'px')
					.style("top", (d3.event.pageY-28)+'px');
			})
			.on("mouseout",function(d,i){ 
				tooltip
				.transition()
				.duration(500)
				.style("opacity",0);
			});

			// .style("fill", function(d) { return color(d.name); });

		var legend = svg.selectAll(".legend")
			.data(devs)
		.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		legend.append("rect")
			.attr("x", width -18 )
			.attr("width", 18)
			.attr("height", 18)
			.attr("class", function(d,i){return 'series_'+i;});

		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d; });

	// });
	},
});
