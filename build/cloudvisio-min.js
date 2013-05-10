window.Cloudvisio||function(t){var o={el:"#vis",layout:"stack",container:"svg",width:"100%",height:"100%",colors:t.scale.category20c(),chart:{}};Cloudvisio=function(t){t=t||{},this.options={},this.el=t.el||o.el,t.layout=(t.layout||o.layout).toLowerCase(),t=s.extend(o,t),this.set(t),this._container()},Cloudvisio.prototype={constructor:Cloudvisio,description:function(){return"Cloudvisio running on D3"},options:{}},Cloudvisio.prototype.models=[],Cloudvisio.prototype.data=function(t,o){return o=o||{},arguments.length?(this._data=t,o.silent||(this.models=[]),this):this._data},Cloudvisio.prototype.parse=function(t){if(t=t||!1){if("undefined"!=t.length)for(var o in t)this.models.push(t[o]);else this.models.push(t);return this}},Cloudvisio.prototype.search=function(t){return RegExp(t),this},Cloudvisio.prototype.find=function(t,o){t instanceof Array&&(t=t.join("|"));var e=RegExp(t,"gi");return o.match(e)},Cloudvisio.prototype.keys=function(t){t=t||this.data();var o=[];for(var e in t){var r=Object.keys(t[e]);for(var n in r)o.indexOf(r[n])>-1||o.push(r[n])}return o},Cloudvisio.prototype.axis=function(t){if(!arguments.length)return Object.keys(this.models[0]||{});var o=this.data();for(var e in o)this.models[e]===void 0&&(this.models[e]={}),this.models[e][t]="string"==typeof o[e][t]||"number"==typeof o[e][t]?o[e][t]:"object"==typeof o[e][t]?o[e][t].value||o[e][t].name||o[e][t].title||o[e][t].id||o[e][t]:null;return this},Cloudvisio.prototype.group=function(t,o){var e=this.data();t=t.join("`").toLowerCase().split("`");for(var r in e)if(this.models[r]=this.models[r]||{},e[r][o]!==void 0){var n=""+e[r][o],i=this.find(t,n);if(i instanceof Array){var s=i.pop().toLowerCase();this.models[r]["group_"+o]=t.indexOf(s)}else this.models[r]["group_"+o]=-1}else this.models[r]["group_"+o]=-1;return this},Cloudvisio.prototype.remove=function(t){for(var o in this.models){var e=this.models[o];e[t]!==void 0&&delete this.models[o][t]}return this},Cloudvisio.prototype.type=function(t){return this.models.length&&this.models[0][t]?this._findType(t):this._findType(t,this._data)},Cloudvisio.prototype._data={},Cloudvisio.prototype.process=function(t,o){console.log(t+" : "+o)},Cloudvisio.prototype.match=function(t){return RegExp(t),this},Cloudvisio.prototype.verbalize=function(){},Cloudvisio.prototype.chart=function(t){if(!arguments.length)return this._chart;var o;if("string"==typeof t){if(o=this.charts[t]||null,null===o)return this}else if("function"==typeof t){o=t;var e=t.prototype.layout||"untitled";this.charts[e]===void 0&&(this.charts[this.options.layout]=t,this.options.layout=e)}return this._chart=new o(this),this},Cloudvisio.prototype.charts={},Cloudvisio.prototype._chart=null;var e=function(t){this.self=t,t.set(this.defaults)};e.prototype={layout:"stack",schema:{label:"string",value:"number"},defaults:{chart:{label:!1,value:!1}},constructor:e,render:function(){var o=this.self,e=1024,r=768,n=this.data(),i=t.select(o.el+" "+o.options.container).append("svg:g").attr("transform","translate(30,738)");x=t.scale.ordinal().rangeRoundBands([0,e]),y=t.scale.linear().range([0,r]);var s=t.layout.stack()(n.values);x.domain(s[0].map(function(t){return t.x})),y.domain([0,t.max(s[s.length-1],function(t){return t.y0+t.y})]);var a=i.selectAll("g.valgroup").data(s).enter().append("svg:g").attr("class","valgroup").style("fill",function(t,e){return o.color(e)}).style("stroke",function(e,r){return t.rgb(o.color(r)).darker()});a.selectAll("rect").data(function(t){return t}).enter().append("svg:rect").attr("x",function(t){return x(t.x)}).attr("y",function(t){return-y(t.y0)-y(t.y)}).attr("height",function(t){return y(t.y)}).attr("width",x.rangeBand()),i.selectAll("text").data(n.labels).enter().append("svg:text").attr("x",function(t){return x(t)+x.rangeBand()/2}).attr("y",6).attr("text-anchor","middle").attr("dy",".71em").text(function(t){return t});var u=i.selectAll("g.rule").data(y.ticks(5)).enter().append("svg:g").attr("class","rule").attr("transform",function(t){return"translate(0,"+-y(t)+")"});u.append("svg:line").attr("x2",e).style("stroke",function(t){return t?"#fff":"#000"}).style("stroke-opacity",function(t){return t?.3:null}),u.append("svg:text").attr("x",-20).attr("dy",".35em").text(t.format(",d"))},data:function(){var t=this.self,o=t.options.chart.label,e=t.options.chart.value,r=t.models.map(function(t){return t[o]}),n=t.models.map(function(t,o){return{x:o,y:t[e]}});return{labels:r,values:[n]}}},Cloudvisio.prototype.charts.stack=e;var r=t.svg.arc(),n=function(t){this.self=t,t.set(this.defaults)};n.prototype={layout:"pie",schema:{label:"string",value:"number"},defaults:{r:384,ir:0,textOffset:100,chart:{label:!1,value:!1}},constructor:n,render:function(){var o=1024,e=768,n=this.self,i=this.data(),s=t.select(n.el+" "+n.options.container).data(i).append("svg:g").attr("transform","translate("+o/2+","+e/2+")"),a=t.layout.pie().value(function(t){return t.value}).sort(function(){return null}),u=s.selectAll("g.slice").data(a).enter().append("svg:g").attr("class","slice"),l=u.append("svg:path").attr("alt",function(t){return t.data.label}).attr("d",r.innerRadius(n.options.ir).outerRadius(n.options.r)).style("fill",function(t,o){return n.color(o)});l.transition().ease("cubic").duration(2e3).attrTween("d",this.tweenPie),u.append("svg:text").style("font-size",function(t){return 15*Math.max(1,t.data.value/100)}).attr("fill","white").attr("transform",function(t){return t.innerRadius=n.options.r/2,t.outerRadius=n.options.r,"translate("+r.centroid(t)+")"}).attr("text-anchor","middle").text(function(t){return t.data.label}).style("opacity",0).transition().ease("cubic").duration(2e3).style("opacity",1)},data:function(){var t=this.self,o=[],e=t.options.chart.label,r=t.options.chart.value;return o=t.models.map(function(t){return{label:t[e],value:t[r]}}),[o]},tweenPie:function(o){o.innerRadius=0;var e=t.interpolate({startAngle:0,endAngle:0},o);return function(t){return r(e(t))}}},Cloudvisio.prototype.charts.pie=n;var i=function(t){this.self=t,t.set(this.defaults)};i.prototype={layout:"force",schema:{label:"string",value:"number",radius:"number"},defaults:{charge:-20,distance:30,ir:0,radius:5,chart:{label:!1,value:!1,radius:!1}},constructor:i,render:function(){var o=this.self,e=this,r=t.select(o.el+" "+o.options.container),n=1024,i=768,s=this.nodes=this.data(),a=t.layout.force().charge(o.options.charge).linkDistance(o.options.distance).size([n,i]).nodes(s).links([]).start();this.node=r.selectAll(".node").data(s).enter().append("circle").attr("class","node").attr("r",function(t){return t.radius}).style("fill",function(t){return o.color(t.group)}).call(a.drag),this.node.append("title").text(function(t){return t.name}),a.on("tick",function(t){e.update(t)})},data:function(){var t=this.self,o=t.models,e=t.options.chart.label,r=t.options.chart.value,n=t.options.chart.radius,i=[];for(var s in o)i.push({name:o[s][e],group:o[s][r],radius:isNaN(n)?o[s][n]:n});return i},update:function(o){var e=6*o.alpha;this.nodes.forEach(function(t){t.x+=2&t.group+2?e:-e,t.y+=1&t.group+2?e:-e});for(var r=t.geom.quadtree(this.nodes),n=0,i=this.nodes.length;i>++n;)r.visit(this.collide(this.nodes[n]));this.node.attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y})},collide:function(t){var o=t.radius+16,e=t.x-o,r=t.x+o,n=t.y-o,i=t.y+o;return function(o,s,a,u,l){if(o.point&&o.point!==t){var c=t.x-o.point.x,d=t.y-o.point.y,h=Math.sqrt(c*c+d*d),p=t.radius+o.point.radius;p>h&&(h=.5*((h-p)/h),t.x-=c*=h,t.y-=d*=h,o.point.x+=c,o.point.y+=d)}return s>r||e>u||a>i||n>l}}},Cloudvisio.prototype.charts.force=i,Cloudvisio.prototype.render=function(o){var e=this.chart();o=o||!1,o||(t.select(this.el).html(""),this._container());var r={append:o};null!==e&&this.ready()&&e.render(r)},Cloudvisio.prototype.update=function(){},Cloudvisio.prototype.ready=function(t){if(0===this.models.length)return!1;var o,e,r,n=!0;arguments.length?(e=this._chart,r=this.options.chart,this.chart(t),o=this._chart):o=this._chart;for(var i in o.schema){var s=this.options.chart[i]||!1;if(!s){var a=o.schema[i];if(s=this._findAxis(a)){this.options.chart[i]=s;continue}n=!1}}return arguments.length&&(this._chart=e,this.options.chart=r),n},Cloudvisio.prototype.set=function(t){if(!(t instanceof Object))return this;for(var o in t)if("chart"==o){var e=this.options.chart||{},r=t[o];this.options.chart={};for(var n in r)e[n]&&e[n]!==void 0&&!r[n]&&(t[o][n]=e[n])}return s.extend(this.options,t),t.layout&&this.chart(t.layout),this},Cloudvisio.prototype._container=function(){function o(){n.attr("transform","translate("+t.event.translate+")"+" scale("+t.event.scale+")")}var e=1024,r=768,n=t.select(this.el).append(this.options.container);return n.attr({width:this.options.width,height:this.options.height}).attr("viewBox","0 0 "+e+" "+r).attr("preserveAspectRatio","xMidYMid meet").attr("pointer-events","all").call(t.behavior.zoom().on("zoom",o)),n},Cloudvisio.prototype._findAxis=function(t){var o=this.keys(this.models);if(!o)return!1;var e=s.toArray(this.options.chart);for(var r in o)if(!(e.indexOf(o[r])>-1)&&t==this._findType(o[r]))return o[r];return!1},Cloudvisio.prototype._findType=function(t,o){var e=!1;o=o||this.models;for(var r in o){var n=typeof o[r][t];if(e&&e!=n)return"mixed";e=n}return e},Cloudvisio.prototype.colors=function(t){return arguments.length?(this.options.colors=t,this):this.options.colors},Cloudvisio.prototype.color=function(t){return this.options.colors instanceof Function?this.options.colors(t):this.options.colors[t]};var s={extend:function(t,o){for(var e in o)o[e]&&o[e].constructor&&o[e].constructor===Object?(t[e]=t[e]||{},arguments.callee(t[e],o[e])):t[e]=o[e];return t},toArray:function(t){var o=[];for(var e in t)o.push(t[e]);return o}}}(window.d3);