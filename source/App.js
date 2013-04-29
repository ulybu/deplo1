enyo.kind({ 
	name: "App",
	kind:"enyo.Panels",
	style:"background-color:#e8e8e8;",
	handlers:{
		onNext:'nextpanel',
		onBack: 'previouspanel',
		onMarkerClick: 'markerclick'
	},
	create:function(){
		this.inherited(arguments);
		// enyo.log(this);
	},
	markerclick:function(inSender,eventData){
		this.$.popup.setContent("dev: "+eventData.dev+",\n value: "+eventData.value).show();
		// enyo.log(inSender);
		// enyo.log(yuiEvent);
	},
	components:[
		
		{components: [

			{kind:'navbar',title:'YUI'},
			{
				fit:true,
				kind: "enyo.chert.barchart",
				seriesClassNamePrefix : "expenses_",
				markerClassNamePrefix : "month_",
				id:"employeeExpenses"
			},
		]},
		{components: [
			{kind: "onyx.Popup", centered: true, floating: true,name:'popup'},
			{kind:'navbar',title:'D3js'},
			{kind :'d3test', id:'d3graph',fit:true}
		]}
	],
	nextpanel:function(inSender,inEvent){
		this.next();
	},
	previouspanel:function(){
		this.previous();
	}
});
