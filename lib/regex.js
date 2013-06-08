// Public methods

Cloudvisio.prototype.match = function( string, options ){
	//
	options = options || {};
	options.match = true;
	this._filterString( string, options );
	// allow method chaining
	return this;
};


// filter the data based on a regular expression
Cloudvisio.prototype.search = function( string, options ){
	//
	options = options || {};
	options.search = true;
	this._filterString( string, options );
	// allow method chaining
	return this;
};


// lookup a value in a field
Cloudvisio.prototype.find = function( query, options ){
	//
	options = options || {};
	if( typeof query == "boolean" ) {
		this.match( query, options );
	} else {
		// a find() always resets the axis?
		this.search( query, options );
	}
	// allow method chaining
	return this;
	/*
	options = options || {};
	// exit now if theres no selected field
	if( !this._selectedField ) return;
	var field = this._selectedField;
	// check if the query is a boolean
	if( typeof query == "boolean" ) query = (query) ? "true" : "false";
	// a find() always resets the axis?
	options.reset = true;
	this.group( [query], field, options);
	// allow method chaining
	return this;
	*/
};


// create an axis by grouping the raw data
Cloudvisio.prototype.group = function( groups, key, options){
	// fallbacks
	options = options || {};
	// variables
	var data = this.data();
	var field;
	// convert groups to lower case
	groups = groups.join("`").toLowerCase().split("`");
	// reset models if needed
	if( options.reset ){
		// create a model set equal to the length of the groups
		var length = (groups.length === 1) ? groups.length+1 : groups.length;
		this.models = new Array( length );
		field = "value";
		for( var k = 0; k < this.models.length; k++ ){
			this.models[k] = {};
			this.models[k][field] = 0;
			if( options.labels ){
				this.models[k].label = groups[k] || "not "+ groups[k-1];
			}else {
				this.models[k].label = "";
			}
		}
	} else {
		field = "group_"+key;
	}
	// lookup the right axis
	for( var i in data ){
		var model;
		if( !options.reset ){
			// create the model if this is the first axis
			this.models[i] = this.models[i] || {};
			model = this.models[i];
		}
		if( typeof data[i][key] != "undefined"){
			// convert any value to string
			var value = (data[i][key] instanceof Object) ? utils.toArray( data[i][key] ).join("|") : ""+data[i][key]+"";

			//
			var matches = this._find(groups, value);
			// process results
			//if(matches !== null);
			if(matches instanceof Array){
				// are we expecting more than one matches??
				var group = matches.pop().toLowerCase();
				if( options.reset ){
					this.models[ groups.indexOf( group ) ][field] += 1;
				} else {
					this.models[i][field] = groups.indexOf( group );
				}
			} else {
				if( options.reset ){
					this.models[groups.length][field] += 1;
				} else {
					this.models[i][field] = -1;
				}
			}
			/*
			// support types other than string
			switch(typeof value){
				case "string":

				break;
				case "boolean":
					console.log(groups);
					// in this case we do a direct comparison (sting comparisson
					this.models[i]["group_"+key] = groups.indexOf( value.toString() );
					console.log();
				break;
			}
			*/
		} else {
			//model["group_"+axis] = null;
			if( options.reset ){
				this.models[groups.length][field] += 1;
			} else {
				this.models[i][field] = -1;
			}
		}
	}
	// save latest group
	// #30 pick the right axis
	var selected  = this._lookupSchema("number", field);
	this._axis[selected] = field;

	return this;
};


// Internal methods

// Return the matches of a regular expression
Cloudvisio.prototype._find = function( query, string ){
	if( query instanceof Array) query = query.join("|");
	var regexp = new RegExp(query, "gi");
	return string.match(regexp);
};


// Applying a filter based on an regulat expression
Cloudvisio.prototype._filterString = function( string, options ){
	//
	options = options || {};
	var field = this._selectedField || options.field || false;
	var id;
	// exit now if theres no selected field
	if( !field ) return;
	// check if the query is a number
	//if(typeof string != "string") return;
	// get the data
	var data = this.data();
	if( options.filter ){
		// reset filtered data - should be part of data()?
		this._filteredData = [];
	} else {
		// create a new field for the result;
		id = "filter_"+ field + "_"+ utils.uid();
	}
	//
	for( var i in data ){
		var opt = {};
		var result;
		if( options.match ){
			result = (data[i][field] === string);
			if( options.filter ){
				if( result ) this.data( data[i]);
			} else {
				// add a new filter key
				data[i][id] = result;
				// update the existing data
				this.data( data[i], { key : i });
				// save the query
				this._queries[id] = string;
			}
		}
		if( options.search ){
			var exp = new RegExp(string);
			result = ( data[i][field].search(exp) > -1 );
			if( options.filter ){
				if( result ) this.data( data[i]);
			} else {
				// add a new filter key
				data[i][id] = result;
				// update the existing data
				this.data( data[i], { key : i });
				// save the query
				this._queries[id] = string;
			}
		}
		/*
		if( options.gt && data[i][field] > number){
			this._filteredData.push( data[i] );
		}
		*/
	}
};