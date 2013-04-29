/*
Early version of a BarChart widget using YUI library
Datas are hard-coded until the data providing structure is built
*/

enyo.kind({
	name : "enyo.chert.barchart",
	published : {
		library:'yui',
		allSeriesClassName:'',
		seriesClassNamePrefix:"",
		markerClassNamePrefix:"",
		tooltipClassNamePrefix: '',
		classesNameIndexOffset:0,
	},

	rendered:function(){
		this.inherited(arguments);
		this.drawChart();
	},
	/*
	Test the structure of YUI instances and retreive IDs
	*/
	idTools: new enyo.chert.searchYUIids,

	addClassMarkers : function (Y,thechart) {
		var offset = this.classesNameZeroIndexed || 0,
			allSeriesLabel = this.allSeriesClassName || "series_all",
			seriesLabel = this.seriesClassNamePrefix || "series_",
			markersLabel = this.markerClassNamePrefix || "marker_";
			
		for (var i = 0, serie=null;  serie=thechart.getSeries(i); i++) {
			for (var j = 0; j < serie._markers.length; j++) {
				var nodee = Y.one('#'+this.idTools.getBarID(thechart,i,j)),
				// var nodee = Y.one('#'+serie._markers[j].node.id),
					value = nodee.getAttribute('class') 
						+ ' ' + seriesLabel 
						+ ( i + offset ) 
						+ ' ' 
						+ markersLabel 
						+ ( j + offset ) 
						+ ' ' + allSeriesLabel;
				nodee.setAttribute('class', value);
			};
		};

	},
	addClassTooltip : function (Y,thechart) {
		var tooltipLabel = this.tooltipClassNamePrefix || 'tooltip';
		var node = Y.one('#'+this.idTools.getTooltipId(thechart));
		node.setAttribute('class', node.getAttribute('class')+ ' ' + tooltipLabel)
	},
	drawChart:function(){
		var id= this.hasNode().id;
		var that = this;

		YUI().use('charts-legend','node','anim', function (Y) {

			var myDataValues = [
				{Month:"March", 'bob':193, 'mark':193, 'douglas':30}, 
				{Month:"April", 'bob':150, 'mark':130, 'douglas':60}, 
				{Month:"May", 'bob':110, 'mark':120, 'douglas':140}, 
				{Month:"June", 'bob':70, 'mark':110, 'douglas':170}, 
			];
			// Instantiate and render the chart
			var mychart = new Y.Chart({
				legend: {
					position: "bottom",
					hAlign: "center",
				},
				interactionType : 'marker',
				type:'column',
				categoryKey:'Month',
				dataProvider: myDataValues,
				render:'#'+id,
			});
		 
			/*
			Workaround for the following bug:
			http://yuilibrary.com/forum/viewtopic.php?p=33766
			*/
			mychart.get("legend")._drawLegend();

			/*
			Test of the structure of YUI instance for retreive markers IDs, 
			in case of success we add classes to the markers 
			*/
			if (that.idTools.isBarOk(mychart)) {
				enyo.bind(that, 'addClassMarkers')(Y,mychart);
			} else {
				//alternative solution here
				enyo.log('Error : '," markers id couldn't be retreived..");
			}
			if (that.idTools.isTooltipOk(mychart)) {
				enyo.bind(that,'addClassTooltip')(Y,mychart);	
			} else{
				//alternative solution here
				enyo.log('Error : '," tooltip id couldn't be retreived..");
			};
			
		});
	}
});