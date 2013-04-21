
// rendering the visualization (generated once)
Cloudvisio.prototype.render = function(){
	d3.select( this.el + " "+ this.options.container).data(this.models);
	var chart = this.chart();
	if( chart !== null)
		chart.call(this, arguments);
	//.transition().duration(500).call( this.chart() );
};

// updating visualization (on every tick)
Cloudvisio.prototype.update = function(){
	
};


// updating options dynamically
Cloudvisio.prototype.set = function( obj ){
	if( !(obj instanceof Object) ) return this;
	for( var i in obj){
		this.options[i] = obj[i];
	}
	// 
	return this;
};


// Internal methods
// creates the chart container
Cloudvisio.prototype._container = function(){
	d3.select( this.el )
		.append( this.options.container )
		.attr("width", this.options.width)
		.attr("height", this.options.height);
};
	