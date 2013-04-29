enyo.kind({ 
	name: "navbar",
	kind:"onyx.Toolbar",
	layoutKind: "FittableColumnsLayout",
	// style:"background-color:#e8e8e8;",
	published:{
		title:''
	},
	events:{
		onNext:'',
		onBack:''
	},
	create:function(){
		this.inherited(arguments);
		this.$.title.setContent(this.title);
	},
	onTitleChanged: function(){
		this.$.title.setContent(this.title);
	},
	components:[
	
		{kind:'onyx.Button', content: 'Back', ontap:'doBack'},
		{name:'title',fit:true},
		{kind:'onyx.Button', content: 'Next', ontap:'doNext'},
	]
});
