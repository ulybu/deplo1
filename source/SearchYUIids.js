/**
	Sampler of svg based chart. Here a pie and bar chart, both interactive with tap event. Only the bar chart handle onmouseover event
*/

enyo.kind({
	name: "enyo.chert.searchYUIids",
	kind:"enyo.Object",

	barchartMarkerPath : [
		 'getSeries',
		 '_markers',
		 'node',
		 'id',
	],
	barChartTooltipPath : [
		'_getTooltip',
		'node',
		'_node',
		'id',
	],
/*Enhanced 'typeof' function*/ 
	typeOf: function (value) {
	    var s = typeof value;
	    if (s === 'object') {
	        if (value) {
	            if (Object.prototype.toString.call(value) == '[object Array]') {
	                s = 'array';
	            }
	        } else {
	            s = 'null';
	        }
	    }
	    return s;
	},
	isTooltipOk : function (thechart) {
		var isid = 
			thechart
			&& ( this.typeOf(thechart[this.barChartTooltipPath[0]]) == 'function' )
			&& thechart[this.barChartTooltipPath[0]]()
			&& thechart[this.barChartTooltipPath[0]]() [this.barChartTooltipPath[1]]
			&& thechart[this.barChartTooltipPath[0]]() [this.barChartTooltipPath[1]] [this.barChartTooltipPath[2]]
			&& this.typeOf( thechart[this.barChartTooltipPath[0]]() [this.barChartTooltipPath[1]] [this.barChartTooltipPath[2]] [this.barChartTooltipPath[3]] ) === 'string';
		return isid;
	},
	getTooltipId : function (thechart) {
		return thechart[this.barChartTooltipPath[0]]() [this.barChartTooltipPath[1]] [this.barChartTooltipPath[2]] [this.barChartTooltipPath[3]];
	},
	getBarID : function (thechart,i,j) {
		return thechart[this.barchartMarkerPath[0]](i) [this.barchartMarkerPath[1]][j] [this.barchartMarkerPath[2]] [this.barchartMarkerPath[3]];
	},
	isBarOk : function (thechart) {
		enyo.log(thechart[this.barchartMarkerPath[0]](0));
		var  isID= 
			thechart
			&& thechart[this.barchartMarkerPath[0]]
		 	&& thechart[this.barchartMarkerPath[0]](0) 

			&& thechart[this.barchartMarkerPath[0]](0) [this.barchartMarkerPath[1]]
			&& this.typeOf (thechart[this.barchartMarkerPath[0]](0) [this.barchartMarkerPath[1]]) == 'array'
			&& thechart[this.barchartMarkerPath[0]](0) [this.barchartMarkerPath[1]].length > 0
			&& thechart[this.barchartMarkerPath[0]](0) [this.barchartMarkerPath[1]][0]

			&& thechart[this.barchartMarkerPath[0]](0) [this.barchartMarkerPath[1]][0] [this.barchartMarkerPath[2]]

			&& (this.typeOf (thechart[this.barchartMarkerPath[0]](0)  [this.barchartMarkerPath[1]][0] [this.barchartMarkerPath[2]] [this.barchartMarkerPath[3]]) == 'string' )
			;

		return isID;
	},
	
});
