webpackJsonp([2,0],{0:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(38),a=n(i),s=r(40),o=n(s),u=r(93),d=n(u),l=r(92),c=n(l),f={errorBagName:"errors",fieldsBagName:"fields",delay:0,locale:"en",dictionary:null,strict:!0};a.default.use(c.default,f),new a.default({store:o.default,el:"#travel_time",template:"<TravelTime/>",components:{TravelTime:d.default}})},14:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return{origin:null,destination:null,isSearchInProgress:!1,isSearchCompleted:!1,travelTime:null,destinationTemperature:null,temperatureUnits:"C",searchError:null}};t.initialWeatherState=r},39:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(48),a=n(i),s=r(91),o=n(s);t.default={search:function(e,t){var r=e.commit,n=t.origin,i=t.destination;return n&&i?(r("setSearchError",null),r("setIsSearchInProgress",!0),r("setIsSearchCompleted",!1),void u(n,i).then(function(e){return d(e)}).then(function(e){var t=e.travelTime,n=e.destinationCoordinates;return r("setTravelTime",t),console.debug(t),console.debug(n),n}).then(function(e){l(e).then(function(e){r("setDestinationTemperature",c(e)),setTimeout(function(){r("setIsSearchInProgress",!1),r("setIsSearchCompleted",!0)},2e3)})}).catch(function(e){r("setIsSearchInProgress",!1),r("setSearchError",e.message),console.error(e)})):void console.error("Required parameter missing")}};var u=function(e,t){var r="https://maps.googleapis.com/maps/api/directions/json",n="AIzaSyATm1_r80KPHKGwRdFxxUnynLDadFnSJlw",i=r+"?language=en&key="+n+"&origin="+e+"&destination="+t;return console.log("fetching "+i),new a.default(function(e,t){(0,o.default)(i).then(function(r){if(r.ok)e(r.json());else{var n=new Error(r.status+" "+r.statusText);n.prefix="Server error:\n\n",n.response=r,t(n)}})})},d=function(e){if(!(e&&"routes"in e&&e.routes.length>0&&"legs"in e.routes[0]))throw new Error("Couldn't find directions between the origin and destination");var t=e.routes[0].legs[0];return{travelTime:t.duration.text,destinationCoordinates:t.end_location}},l=function(e){var t="http://api.openweathermap.org/data/2.5/weather",r="0baf41155af3452ac20cf703c24893af";return new a.default(function(n,i){e||i("coordinates are required to fetch weather");var a=t+"?lat="+e.lat+"&lon="+e.lng+"&APPID="+r;console.log("fetching "+a),(0,o.default)(a).then(function(e){if(e.ok)n(e.json());else{var t=new Error(e.status+" "+e.statusText);t.prefix="Server error:\n\n",t.response=e,i(t)}})})},c=function(e){if(!(e&&"main"in e&&"temp"in e.main))throw new Error("Couldn't find directions between the origin and destination");var t=-273.15;return e.main.temp+t}},40:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(38),a=n(i),s=r(13),o=n(s),u=r(42),d=n(u),l=r(41),c=n(l),f=r(39),h=n(f);a.default.use(o.default),t.default=new o.default.Store({state:d.default,mutations:c.default,actions:h.default})},41:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(14);t.default={reset:function(e){e.weather=(0,n.initialWeatherState)()},setOrigin:function(e,t){e.weather.origin=t,e.weather.isSearchCompleted=!1},setDestination:function(e,t){e.weather.destination=t,e.weather.isSearchCompleted=!1},setTravelTime:function(e,t){e.weather.travelTime=t},setIsSearchInProgress:function(e,t){e.weather.isSearchInProgress=t},setIsSearchCompleted:function(e,t){e.weather.isSearchCompleted=t},setDestinationTemperature:function(e,t){e.weather.destinationTemperature=t},setSearchError:function(e,t){e.weather.searchError=t}}},42:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(14);t.default={weather:(0,n.initialWeatherState)()}},43:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"RingLoader",props:{loading:{type:Boolean,default:!0},color:{type:String,default:"#5dc596"},size:{type:String,default:"60px"},margin:{type:String,default:"2px"},radius:{type:String,default:"100%"}},computed:{spinnerStyle:function(){return{height:this.size,width:this.size,border:parseFloat(this.size)/10+"px solid"+this.color,opacity:.4,borderRadius:this.radius}},spinnerBasicStyle:function(){return{height:this.size,width:this.size,position:"relative"}}}}},44:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(13),a=r(94),s=n(a),o=r(95),u=n(o);t.default={name:"TravelTime",computed:(0,i.mapState)({isShowSearchResult:function(e){return e.weather.isSearchInProgress||e.weather.isSearchCompleted}}),components:{SearchForm:s.default,SearchResult:u.default}}},45:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(24),a=n(i),s=r(13),o=r(84),u=n(o),d=r(14);t.default={name:"search-form",computed:(0,a.default)({origin:{get:function(){return this.$store.state.weather.origin},set:function(e){this.$store.commit("setOrigin",e)}},destination:{get:function(){return this.$store.state.weather.destination},set:function(e){this.$store.commit("setDestination",e)}},isSearchDisabled:function(){var e=this.$store.state.weather,t=e.origin,r=e.destination,n=e.isSearchInProgress;return!t||!r||n},isResetDisabled:function(){var e=(0,u.default)(this.$store.state.weather,(0,d.initialWeatherState)()),t=this.$store.state.weather.isSearchInProgress;return e||t}},(0,s.mapState)({searchError:function(e){return e.weather.searchError}})),methods:(0,a.default)({onReset:function(){this.errors.clear(),this.$store.commit("reset")}},(0,s.mapActions)(["search"]))}},46:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(24),a=n(i),s=r(13),o=r(96),u=n(o);t.default={name:"search-result",components:{RingLoader:u.default},computed:(0,a.default)({isTravelRecommended:function(){var e=this.$store.state.weather,t=e.travelTime,r=e.destinationTemperature;console.log(t);var n=0,i="hours",a=t.indexOf(i);if(a){var s=t.substr(0,a+i.length);n=parseFloat(s)}return n<12&&r>=15&&r<=35}},(0,s.mapState)({isShowSearchResult:function(e){return e.weather.isSearchInProgress||e.weather.isSearchCompleted},isSearchCompleted:function(e){return e.weather.isSearchCompleted},origin:function(e){return e.weather.origin},destination:function(e){return e.weather.destination},travelTime:function(e){return e.weather.travelTime},destinationTemperature:function(e){return e.weather.destinationTemperature.toFixed(0)},temperatureUnits:function(e){return e.weather.temperatureUnits}}))}},87:function(e,t){},88:function(e,t){},89:function(e,t){},90:function(e,t){},93:function(e,t,r){var n,i;r(89),n=r(44);var a=r(99);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),"undefined"==typeof i.name&&(i.name="TravelTime"),i.render=a.render,i.staticRenderFns=a.staticRenderFns,e.exports=n},94:function(e,t,r){var n,i;r(87),n=r(45);var a=r(97);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),"undefined"==typeof i.name&&(i.name="SearchForm"),i.render=a.render,i.staticRenderFns=a.staticRenderFns,i._scopeId="data-v-0f726e60",e.exports=n},95:function(e,t,r){var n,i;r(88),n=r(46);var a=r(98);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),"undefined"==typeof i.name&&(i.name="SearchResult"),i.render=a.render,i.staticRenderFns=a.staticRenderFns,i._scopeId="data-v-232022a9",e.exports=n},96:function(e,t,r){var n,i;r(90),n=r(43);var a=r(100);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),"undefined"==typeof i.name&&(i.name="RingLoader"),i.render=a.render,i.staticRenderFns=a.staticRenderFns,e.exports=n},97:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",{staticClass:"search-form",on:{submit:function(t){t.preventDefault(),e.search({origin:e.origin,destination:e.destination})}}},[r("ul",{staticClass:"fields"},[r("li",[r("label",{attrs:{for:"origin"}},[e._v("Origin:")]),e._v(" "),r("div",{class:{control:!0}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.origin,expression:"origin"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":e.errors.has("origin")},attrs:{name:"origin",id:"origin",placeholder:"Origin",type:"text","data-vv-delay":"1000"},domProps:{value:e._s(e.origin)},on:{input:function(t){t.target.composing||(e.origin=t.target.value)}}}),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("origin"),expression:"errors.has('origin')"}],staticClass:"help is-danger"},[e._v(e._s(e.errors.first("origin")))])])]),e._v(" "),r("li",[r("label",{attrs:{for:"destination"}},[e._v("Destination:")]),e._v(" "),r("div",{class:{control:!0}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.destination,expression:"destination"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":e.errors.has("destination")},attrs:{name:"destination",id:"destination",placeholder:"Destination",type:"text","data-vv-delay":"1000"},domProps:{value:e._s(e.destination)},on:{input:function(t){t.target.composing||(e.destination=t.target.value)}}}),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("destination"),expression:"errors.has('destination')"}],staticClass:"help is-danger"},[e._v(e._s(e.errors.first("destination")))])])])]),e._v(" "),r("input",{attrs:{type:"submit",value:"Search",disabled:e.isSearchDisabled}}),e._v(" "),r("input",{attrs:{type:"button",value:"Reset",disabled:e.isResetDisabled},on:{click:function(t){e.onReset()}}}),e._v(" "),r("div",{staticClass:"is-danger search-error"},[e._v(e._s(e.searchError))])])},staticRenderFns:[]}},98:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.isShowSearchResult&&!e.isSearchCompleted?r("div",[e._v("\n    Getting results..."),r("ring-loader",{attrs:{loading:!e.isSearchCompleted,color:"#0000ff",size:"20px"}})],1):e._e(),e._v(" "),e.isSearchCompleted?r("div",{staticClass:"search-result"},[r("p",[e._v("The best route from "+e._s(e.origin)+" to "+e._s(e.destination)+" takes "+e._s(e.travelTime)+".")]),e._v(" "),r("p",[e._v("The temperature in "+e._s(e.destination)+" is "+e._s(e.destinationTemperature)+"°"+e._s(e.temperatureUnits))]),e._v(" "),r("p",[e._v("Travel is "),r("span",{staticClass:"recommended"},[e.isTravelRecommended?e._e():r("span",[e._v("not")]),e._v(" recommended")])])]):e._e()])},staticRenderFns:[]}},99:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"travel-time"}},[r("h1",[e._v("Get travel time and weather")]),e._v(" "),r("SearchForm"),e._v(" "),r("SearchResult",{directives:[{name:"show",rawName:"v-show",value:e.isShowSearchResult,expression:"isShowSearchResult"}]})],1)},staticRenderFns:[]}},100:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"v-spinner"},[r("div",{staticClass:"v-ring v-ring1",style:e.spinnerBasicStyle},[r("div",{staticClass:"v-ring v-ring2",style:e.spinnerStyle}),r("div",{staticClass:"v-ring v-ring3",style:e.spinnerStyle})])])},staticRenderFns:[]}}});
//# sourceMappingURL=app.bfbe7fe24a1281eb7c60.js.map