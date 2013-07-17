// @name cloudvisio - 0.6.0 (Wed, 17 Jul 2013 06:18:25 GMT)
// @url https://github.com/makesites/cloudvisio
// @license Apache License, Version 2.0
window.Cloudvisio||function(t){Cloudvisio=function(t){return t=t||{},this.options={},this.el=t.el||e.el,t.layout=(t.layout||e.layout).toLowerCase(),t=a.extend(e,t),this.set(t),this},Cloudvisio.prototype={constructor:Cloudvisio,description:function(){return"Cloudvisio running on D3"},options:{}};var e={el:"#vis",layout:"stack",container:"svg",width:"100%",height:"100%",colors:t.scale.category20c(),renderErrors:!1};Cloudvisio.prototype.set=function(t){return t instanceof Object?(a.extend(this.options,t),t.layout&&this.chart(t.layout),this):this},Cloudvisio.prototype.get=function(t){return this.options[t]||!1},Cloudvisio.prototype.models=[],Cloudvisio.prototype.data=function(t,e){if(e=e||{},!arguments.length||null===t)return e.raw?this._data:this._filteredData();var i=this._data;if(t instanceof Array)i=e.reset?t:i.concat(t);else{if(!(t instanceof Object))return this;e.silent=!0,e.key?i[e.key]=t:i.push(t)}return e.silent||(this.models=[]),this._data=i,this},Cloudvisio.prototype._filteredData=function(){var t=[];for(var e in this._data)(this._data[e].__filter===void 0||this._data[e].__filter)&&t.push(this._data[e]);return t},Cloudvisio.prototype.parse=function(t){if(t=t||!1){if("undefined"!=t.length)for(var e in t)this.models.push(t[e]);else this.models.push(t);return this.ready(),this}},Cloudvisio.prototype.keys=function(t){t=t||this.data();var e=[];for(var i in t){var r=Object.keys(t[i]);for(var s in r)e.indexOf(r[s])>-1||r[s].search(/__query/gi)>-1||e.push(r[s])}return e},Cloudvisio.prototype.axis=function(t,e){if(!arguments.length)return this._axis;if(t instanceof Object)for(var i in t)this.axis(i,t[i]);var r=this.data();for(var s in r)this.models[s]===void 0&&(this.models[s]={}),this.models[s][t]=e!==void 0?e:"string"==typeof r[s][t]||"number"==typeof r[s][t]?r[s][t]:"object"==typeof r[s][t]?r[s][t].value||r[s][t].name||r[s][t].title||r[s][t].id||r[s][t]:null;return e!==void 0&&(this._axis[t]=e),this},Cloudvisio.prototype.select=function(t){var e=this.keys();return this._selectedField=e.indexOf(t)>-1?t:!1,this},Cloudvisio.prototype.amount=function(t){t=t||{};var e=this.data(),i=this.queries();t.reset&&(this.models=[]);var r=0;for(var s in i)if("filter"!=i[s].sort&&"exclude"!=i[s].sort){var o={label:"",value:0};for(var n in e)o.value+=e[n][s],e[n][s]===!0&&r++;t.labels&&(o.label=""+i[s].query),this.models.push(o)}return e.length>r&&this.models.push({label:"other",value:e.length-r}),this._axis.label="label",this._axis.value="value",this},Cloudvisio.prototype.remove=function(t,e){e=e||{},e.type=e.type||!1;var i=!1,r=!1;if(e.type||(i=a.inArray(t,this._axis),r=Object.keys(this._queries).indexOf(t),r>-1&&(e.type="query"),i>-1&&(e.type="axis")),!e.type)return this;if("query"==e.type){var s=this._queries[t];delete this._queries[t];for(var o in this._data)delete this._data[o][t],"filter"!=s.sort&&"exclude"!=s.sort&&this._queries.length||delete this._data[o].__filter}if("axis"==e.type){this._axis[t]=!1;for(var n in this.models){var l=this.models[n];l[t]!==void 0&&delete this.models[n][t]}}return this},Cloudvisio.prototype.type=function(t){return this.models.length&&this.models[0][t]?this._findType(t):this._findType(t,this._data)},Cloudvisio.prototype._data=[],Cloudvisio.prototype._axis={},Cloudvisio.prototype._selectedField=!1,Cloudvisio.prototype._axisSchema=function(t){this._axis={};for(var e in t)this._axis[e]=!1},Cloudvisio.prototype.queries=function(t,e){if(!arguments.length)return this._queries;if(t=t||!1,e=e||{},!t)return this;if("string"==typeof t)return this._queries[t];var i,r=t instanceof Array?t:[t];for(var s in r)i=r[s].id?r[s].id:this._queryId(),r[s].sort===void 0&&(r[s].sort=e.exclude?"exclude":e.filter?"filter":"group"),this._queries[i]={field:r[s].field,type:r[s].type,query:r[s].query,sort:r[s].sort};return t instanceof Array?this:i},Cloudvisio.prototype.refresh=function(){var t=this.queries;for(var e in t)this.queries(t[e])},Cloudvisio.prototype._queries={},Cloudvisio.prototype._queryId=function(){var t,e="__query_",i=Object.keys(this._queries);do t=a.uid();while(i.indexOf(e+t)>-1);return e+t},Cloudvisio.prototype.process=function(t,e){console.log(t+" : "+e)},Cloudvisio.prototype.eq=function(t,e){return e=e||{},e.eq=!0,this._filterNumber(t,e),this},Cloudvisio.prototype.gt=function(t,e){return e=e||{},e.gt=!0,this._filterNumber(t,e),this},Cloudvisio.prototype.lt=function(t,e){return e=e||{},e.lt=!0,this._filterNumber(t,e),this},Cloudvisio.prototype._filterNumber=function(t,e){e=e||{};var i=this._selectedField||e.field||!1;if(i&&!isNaN(t)){t=parseFloat(t);var r=this.data(null,{raw:!0}),s=null;e.eq&&(s="eq"),e.lt&&(s="lt"),e.gt&&(s="gt");var o=this.queries({field:i,type:s,query:t},e);for(var n in r){var a,l={silent:!0,filter:e.filter};e.eq&&(a=r[n][i]===t),e.lt&&(a=t>r[n][i]),e.gt&&(a=r[n][i]>t),e.exclude&&r[n].__filter!==!1?r[n].__filter=!a:e.filter&&r[n].__filter!==!1&&(r[n].__filter=a),r[n][o]=a,l.key=n,this.data(r[n],l)}}},Cloudvisio.prototype.match=function(t,e){return e=e||{},e.match=!0,this._filterString(t,e),this},Cloudvisio.prototype.search=function(t,e){return e=e||{},e.search=!0,this._filterString(t,e),this},Cloudvisio.prototype.find=function(t,e){return e=e||{},"boolean"==typeof t?this.match(t,e):this.search(t,e),this},Cloudvisio.prototype.group=function(){if(!arguments.length)return this;var t,e,i,r;switch(arguments.length){case 1:t=arguments[0];break;case 2:t=arguments[0],arguments[1]instanceof Array?e=arguments[1]:i=arguments[1];break;default:t=arguments[0],e=arguments[1],i=arguments[2]}i=i||{};var s=this.data();if(e&&(e=e.join("`").toLowerCase().split("`")),i.reset){var o=1===e.length?e.length+1:e.length;this.models=Array(o),r="value";for(var n=0;this.models.length>n;n++)this.models[n]={},this.models[n][r]=0,this.models[n].label=i.labels?e[n]||"not "+e[n-1]:""}else r="group_"+t;for(var l in s){var u;if(i.reset||(this.models[l]=this.models[l]||{},u=this.models[l]),s[l][t]!==void 0){var h=s[l][t]instanceof Object?a.toArray(s[l][t]).join("|"):""+s[l][t],d=this._find(e,h);if(d instanceof Array){var c=d.pop().toLowerCase();i.reset?this.models[e.indexOf(c)][r]+=1:this.models[l][r]=e.indexOf(c)}else i.reset?this.models[e.length][r]+=1:this.models[l][r]=-1}else i.reset?this.models[e.length][r]+=1:this.models[l][r]=-1}var f=this._lookupSchema("number",r);return this._axis[f]=r,this},Cloudvisio.prototype.reverse=function(){return this._reverseQuery=!0,this},Cloudvisio.prototype.inQueries=function(t){var e=!1;for(var i in this._queries)this._queries[i].field==t.field&&this._queries[i].type==t.type&&this._queries[i].query==t.query&&(e=i);return e},Cloudvisio.prototype._reverseQuery=!1,Cloudvisio.prototype._find=function(t,e){t instanceof Array&&(t=t.join("|"));var i=RegExp(t,"gi");return e.match(i)},Cloudvisio.prototype._filterString=function(t,e){e=e||{};var i=this._selectedField||e.field||!1;if(i){var r,s=this.data(null,{raw:!0});e.match&&(r="match"),e.search&&(r="search");var o=this.queries({field:i,type:r,query:t},e);for(var n in s){var a,l={silent:!0,filter:e.filter};if(e.match&&(a=s[n][i]===t),e.search){var u=RegExp(t,"gi");a=s[n][i].search(u)>-1}e.exclude&&s[n].__filter!==!1?s[n].__filter=!a:e.filter&&s[n].__filter!==!1&&(s[n].__filter=a),s[n][o]=a,l.key=n,this.data(s[n],l)}}},Cloudvisio.prototype.verbalize=function(t){t=t.replace(/\+/gi," and "),t=t.replace(/>/gi," greater than "),t=t.replace(/</gi," less than "),t=t.replace(/  /gi," ")},Cloudvisio.prototype.status=function(e){var r={},s=this.chart();e=e||!1,0===this._data.length&&(r[101]=i[101]),0===this.models.length&&(r[102]=i[102]);for(var o in this._axis){var n=this._axis[o];if(!n){var a=s.schema[o];switch(a){case"string":r[103]=i[103].replace(/_field_/gi,o);break;case"number":r[104]=i[104].replace(/_field_/gi,o)}}}if(0===Object.keys(r).length&&(r[200]=i[200]),e){var l=t.select(this.el),u='<div class="error">';u+="<p>There were the following errors:</p>",u+="<ul>";for(var h in r)u+="<li>"+r[h]+"</li>";u+="</ul>",u+="</div>",l.html(u)}return r};var i={101:"Missing source data",102:"No axis created",103:"Missing string: _field_",104:"Missing number: _field_",105:"Missing group: _field_",200:"OK"};Cloudvisio.prototype.chart=function(t){if(!arguments.length)return this._chart;var e;if("string"==typeof t){if(e=this.charts[t]||null,null===e)return this}else if("function"==typeof t){e=t;var i=t.prototype.layout||"untitled";this.charts[i]===void 0&&(this.charts[this.options.layout]=t,this.options.layout=i)}return this._chart=new e(this),this},Cloudvisio.prototype.charts={},Cloudvisio.prototype._lookupSchema=function(t,e){if(t=t||!1,e=e||!1,!t)return!1;var i=Object.keys(this._axis);if(!i)return!1;var r=this.chart().schema;if(e&&i[e]&&r[e]==t)return console.log("preferred",e),e;for(var s in r)if(r[s]==t)return s;return!1},Cloudvisio.prototype._chart=null;var r=function(t){this.self=t,t.set(this.defaults),t._axisSchema(this.schema)};r.prototype={layout:"stack",schema:{label:"string",value:"number"},defaults:{},constructor:r,render:function(){var e=this.self,i=1024,r=768,s=this.data(),o=t.select(e.el+" "+e.options.container).append("svg:g").attr("transform","translate(30,738)");x=t.scale.ordinal().rangeRoundBands([0,i]),y=t.scale.linear().range([0,r]);var n=t.layout.stack()(s.values);x.domain(n[0].map(function(t){return t.x})),y.domain([0,t.max(n[n.length-1],function(t){return t.y0+t.y})]);var a=o.selectAll("g.valgroup").data(n).enter().append("svg:g").attr("class","valgroup").style("fill",function(t,i){return e.color(i)}).style("stroke",function(i,r){return t.rgb(e.color(r)).darker()});a.selectAll("rect").data(function(t){return t}).enter().append("svg:rect").attr("x",function(t){return x(t.x)}).attr("y",function(t){return-y(t.y0)-y(t.y)}).attr("height",function(t){return y(t.y)}).attr("width",x.rangeBand()),o.selectAll("text").data(s.labels).enter().append("svg:text").attr("x",function(t){return x(t)+x.rangeBand()/2}).attr("y",6).attr("text-anchor","middle").attr("dy",".71em").text(function(t){return t});var l=o.selectAll("g.rule").data(y.ticks(5)).enter().append("svg:g").attr("class","rule").attr("transform",function(t){return"translate(0,"+-y(t)+")"});l.append("svg:line").attr("x2",i).style("stroke",function(t){return t?"#fff":"#000"}).style("stroke-opacity",function(t){return t?.3:null}),l.append("svg:text").attr("x",-20).attr("dy",".35em").text(t.format(",d"))},data:function(){var t=this.self,e=t._axis.label,i=t._axis.value,r=t.models.map(function(t){return t[e]}),s=t.models.map(function(t,e){return{x:e,y:t[i]}});return{labels:r,values:[s]}}},Cloudvisio.prototype.charts.stack=r;var s=t.svg.arc(),o=function(t){this.self=t,t.set(this.defaults),t._axisSchema(this.schema)};o.prototype={layout:"pie",schema:{label:"string",value:"number"},defaults:{r:384,ir:0,textOffset:100},constructor:o,render:function(){var e=1024,i=768,r=this.self,o=this.data(),n=t.select(r.el+" "+r.options.container).data(o).append("svg:g").attr("transform","translate("+e/2+","+i/2+")"),a=t.layout.pie().value(function(t){return t.value}).sort(function(){return null}),l=n.selectAll("g.slice").data(a).enter().append("svg:g").attr("class","slice"),u=l.append("svg:path").attr("alt",function(t){return t.data.label}).attr("d",s.innerRadius(r.options.ir).outerRadius(r.options.r)).style("fill",function(t,e){return r.color(e)});u.transition().ease("cubic").duration(2e3).attrTween("d",this.tweenPie),l.append("svg:text").style("font-size",function(t){return 15*Math.max(1,t.data.value/100)}).attr("fill","white").attr("transform",function(t){return t.innerRadius=r.options.r/2,t.outerRadius=r.options.r,"translate("+s.centroid(t)+")"}).attr("text-anchor","middle").text(function(t){return t.data.label}).style("opacity",0).transition().ease("cubic").duration(2e3).style("opacity",1)},data:function(){var t=this.self,e=[],i=t._axis.label,r=t._axis.value;return e=t.models.map(function(t){return{label:t[i],value:t[r]}}),[e]},tweenPie:function(e){e.innerRadius=0;var i=t.interpolate({startAngle:0,endAngle:0},e);return function(t){return s(i(t))}}},Cloudvisio.prototype.charts.pie=o;var n=function(t){this.self=t,t.set(this.defaults),t._axisSchema(this.schema)};n.prototype={layout:"force",schema:{label:"string",group:"number",radius:"number"},defaults:{charge:-20,distance:30,ir:0,radius:5},constructor:n,render:function(){var e=this.self,i=this,r=t.select(e.el+" "+e.options.container),s=1024,o=768,n=this.nodes=this.data(),a=t.layout.force().charge(e.options.charge).linkDistance(e.options.distance).size([s,o]).nodes(n).links([]).start();this.node=r.selectAll(".node").data(n).enter().append("circle").attr("class","node").attr("r",function(t){return t.radius}).style("fill",function(t){return e.color(t.group)}).call(a.drag),this.node.append("title").text(function(t){return t.name}),a.on("tick",function(t){i.update(t)})},data:function(){var t=this.self,e=t.models,i=t._axis.label,r=t._axis.group,s=t._axis.radius,o=[];for(var n in e)o.push({name:e[n][i],group:e[n][r],radius:isNaN(s)?e[n][s]:s});return o},update:function(e){var i=6*e.alpha;this.nodes.forEach(function(t){t.x+=2&t.group+2?i:-i,t.y+=1&t.group+2?i:-i});for(var r=t.geom.quadtree(this.nodes),s=0,o=this.nodes.length;o>++s;)r.visit(this.collide(this.nodes[s]));this.node.attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y})},collide:function(t){var e=t.radius+16,i=t.x-e,r=t.x+e,s=t.y-e,o=t.y+e;return function(e,n,a,l,u){if(e.point&&e.point!==t){var h=t.x-e.point.x,d=t.y-e.point.y,c=Math.sqrt(h*h+d*d),f=t.radius+e.point.radius;f>c&&(c=.5*((c-f)/c),t.x-=h*=c,t.y-=d*=c,e.point.x+=h,e.point.y+=d)}return n>r||i>l||a>o||s>u}}},Cloudvisio.prototype.charts.force=n,Cloudvisio.prototype.render=function(t){t=t||!1;var e=this.chart();if(null!==e){var i={append:t};return this.ready()?(t||this._container(),e.render(i),this.status()):this.options.renderErrors?this.status("string"):this.status()}},Cloudvisio.prototype.update=function(){},Cloudvisio.prototype.ready=function(t){if(0===this.models.length)return!1;var e,i,r,s=!0;arguments.length?(i=this._chart,r=this._axis,this.chart(t),e=this._chart):e=this._chart;for(var o in e.schema){var n=this._axis[o]||!1;if(!n){var a=e.schema[o];if(n=this._findAxis(a)){this._axis[o]=n;continue}s=!1}}return arguments.length&&(this._chart=i,this._axis=r),s},Cloudvisio.prototype.reset=function(t){t=t||!1,t&&this.data(t,{reset:!0}),this.options=e},Cloudvisio.prototype._container=function(){function e(){s.attr("transform","translate("+t.event.translate+")"+" scale("+t.event.scale+")")}var i=1024,r=768,s=t.select(this.el).html("").append(this.options.container);return s.attr({width:this.options.width,height:this.options.height}).attr("viewBox","0 0 "+i+" "+r).attr("preserveAspectRatio","xMidYMid meet").attr("pointer-events","all").call(t.behavior.zoom().on("zoom",e)),s},Cloudvisio.prototype._findAxis=function(t){var e=this.keys(this.models);if(!e)return!1;var i=a.toArray(this._axis);for(var r in e)if(!(i.indexOf(e[r])>-1)&&t==this._findType(e[r]))return e[r];return!1},Cloudvisio.prototype._findType=function(t,e){var i=!1;e=e||this.models;for(var r in e){var s=e[r][t];isNaN(parseFloat(s))||(s=parseFloat(s));var o=typeof s;if(i&&i!=o)return"mixed";i=o}return i},Cloudvisio.prototype.colors=function(t){return arguments.length?(this.options.colors=t,this):this.options.colors},Cloudvisio.prototype.color=function(t){return this.options.colors instanceof Function?this.options.colors(t):this.options.colors[t]};var a={extend:function(t,e){for(var i in e)e[i]&&e[i].constructor&&e[i].constructor===Object?(t[i]=t[i]||{},arguments.callee(t[i],e[i])):t[i]=e[i];return t},toArray:function(t){var e=[];for(var i in t)e.push(t[i]);return e},inArray:function(t,e){for(var i=0;e.length>i;i++)if(e[i]===t)return i;return-1},uid:function(){var t=0;return function(){return 0===arguments[0]&&(t=0),t++}}(),safeString:function(t){return t.replace(/[^a-zA-Z0-9]/g,"")}}}(window.d3);