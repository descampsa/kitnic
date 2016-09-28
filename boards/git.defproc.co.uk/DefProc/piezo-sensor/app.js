!function e(t,n,a){function r(o,l){if(!n[o]){if(!t[o]){var s="function"==typeof require&&require;if(!l&&s)return s(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var m=n[o]={exports:{}};t[o][0].call(m.exports,function(e){var n=t[o][1][e];return r(n?n:e)},m,m.exports,e,t,n,a)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)r(a[o]);return r}({1:[function(e,t,n){"use strict";var a=e("react"),r=e("./gerbers"),i=e("./lazy_load"),o=e("./fade_image"),l=a.createClass({displayName:"BoardShowcase",getInitialState:function(){return{viewFrontBoard:!0}},frontBoardView:function(e){e.preventDefault(),this.setState({viewFrontBoard:!0})},backBoardView:function(e){e.preventDefault(),this.setState({viewFrontBoard:!1})},render:function(){var e="frontBoard boardDiagram ",t="backBoard boardDiagram ";return this.state.viewFrontBoard?e+=" selectedBoard":t+=" selectedBoard",a.createElement("div",{className:"boardShowcaseContainer"},a.createElement(r,null),a.createElement("div",{className:"toggleBoardView responsiveTabs"},a.createElement("button",{disabled:this.state.viewFrontBoard,className:"circuitToggleBtn circuitFrontBtn",onClick:this.frontBoardView},"Front"),a.createElement("button",{disabled:!this.state.viewFrontBoard,className:"circuitToggleBtn circuitBackBtn",onClick:this.backBoardView},"Back")),a.createElement("div",{className:"boardShowcase"},a.createElement(i,{once:!0,component:a.createElement("div",{className:"img"}),distance:300},a.createElement("div",{className:"boardContainer"},a.createElement(o,{className:e,src:"images/top.svg"}),a.createElement("div",{className:"circuitBorderContainer"},a.createElement("div",{className:"circuitBorder"})),a.createElement(o,{className:t,src:"images/bottom.svg"})))))}});t.exports=l},{"./fade_image":7,"./gerbers":8,"./lazy_load":12,react:"react"}],2:[function(e,t,n){"use strict";function a(e){var t=e.split("\n").slice(0,-1),n=t[0].split("	"),a=n.map(function(e){return u(e)});a=s([m(a)]);var r=function(e){return["Manufacturer","MPN","Description"].indexOf(n[e])<0},i=c(t.slice(1).map(function(e,t){return e=e.split("	"),m(".tr"+t%2,e.map(function(e,t){var n={};return r(t)&&""==e&&(n={backgroundColor:"pink"}),p({style:n},e)}))}));return l(".bomTable",[a,i])}var r=e("react"),i=e("react-double-scrollbar"),o=e("react-hyperscript-helpers");e("babel-polyfill");var l=o.table,s=o.thead,c=o.tbody,m=o.tr,u=o.th,p=o.td,d=r.createClass({displayName:"BOM",propTypes:{data:r.PropTypes.object.isRequired},render:function(){return 0===this.props.data.lines.length?r.createElement("div",null,"no BOM yet"):r.createElement("div",{className:"bom"},r.createElement("div",{className:"bomTableContainer"},r.createElement(i,null,a(this.props.data.tsv))))}});t.exports=d},{"babel-polyfill":"babel-polyfill",react:"react","react-double-scrollbar":"react-double-scrollbar","react-hyperscript-helpers":"react-hyperscript-helpers"}],3:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"bomInstallPrompt",propTypes:{extensionPresence:a.PropTypes.string.isRequired,bomInstallLink:a.PropTypes.func.isRequired,compatibleBrowser:a.PropTypes.bool.isRequired},render:function(){return"not_present"===this.props.extensionPresence&&this.props.compatibleBrowser?a.createElement("div",{className:"bomInstallPrompt"},"Please ",a.createElement("a",{className:"bomInstallAnchor",onClick:this.props.bomInstallLink},"install the 1-click BOM extension")," to make full use of this feature."):a.createElement("div",null)}});t.exports=r},{react:"react"}],4:[function(e,t,n){"use strict";var a=e("react"),r=e("1-click-bom"),i=e("browser-version"),o=e("./bom_install_prompt"),l=e("./extension_compatibility_prompt"),s=e("./install_extension"),c=e("./direct_stores"),m=a.createClass({displayName:"StoreButtons",propTypes:{items:a.PropTypes.any},isExtensionCompatible:function(e){return"undefined"==typeof navigator||!/Mobile/i.test(navigator.userAgent)&&(/Chrome/.test(e)||/Firefox/.test(e))},getInitialState:function(){var e=this,t={},n={},a={},o=i(),l=s,c=!0,m=!1,u=void 0;try{for(var p,d=function(){var r=p.value;t[r]=void 0;var i=e.props.items.map(function(e){return e.retailers[r]}),o=i.reduce(function(e,t){return t&&e++,e},0),l=void 0;e.props.items.length==o?(l="All parts specified",n[r]="allPartsSpecified"):0==o?(l="No parts specified",n[r]="noPartsSpecified"):(l=o+"/"+e.props.items.length+" parts specified",n[r]="somePartsSpecified"),a[r]={count:o,total:e.props.items.length,summary:l}},f=r.lineData.retailer_list[Symbol.iterator]();!(c=(p=f.next()).done);c=!0)d()}catch(e){m=!0,u=e}finally{try{!c&&f["return"]&&f["return"]()}finally{if(m)throw u}}return"undefined"!=typeof window&&setTimeout(function(){e.setState({extensionPresence:e.state.extensionWaiting?"not_present":"present"})},2e3),{compatibleBrowser:this.isExtensionCompatible(o),extensionInstallLink:l,adding:t,partsSpecified:n,parts:a,onClick:l,extensionWaiting:!0,extensionPresence:"unknown",buyMultiplier:1,buyAddPercent:10}},componentDidMount:function(){var e=this;window.addEventListener("message",function(t){if(t.source==window&&"extension"==t.data.from)switch(e.setState({extensionWaiting:!1}),t.data.message){case"register":e.setState({onClick:function(t){window.postMessage({from:"page",message:"quickAddToCart",value:{retailer:t,multiplier:e._getMultiplier()}},"*")}});break;case"updateAddingState":e.setState({adding:t.data.value})}},!1)},storeIcon:function(e,t,n){var r="/images/"+t+(n?"-grey":"")+".ico";return e?a.createElement("i",{className:"icon-spin1 animateSpin"}):a.createElement("img",{className:"storeIcons",key:t,src:r,alt:t})},storeButtons:function u(){var e=this,t=r.lineData.retailer_list,u=t.map(function(t){var n="storeButtonInner "+e.state.partsSpecified[t],r="storeButton",i="retailerIcon",o="retailerText",l="allPartsSpecified"===e.state.partsSpecified[t]||"somePartsSpecified"===e.state.partsSpecified[t],s=void 0;l&&(s=e.state.onClick.bind(null,t));var c=e.state.parts[t];return e.state.compatibleBrowser&&"present"==e.state.extensionPresence||"undefined"==typeof document||null===document.getElementById(t+"Form")||(s=function(){document.getElementById(t+"Form").submit()}),a.createElement("span",{onClick:s,title:c.summary,className:r,key:"storeButton-"+t},a.createElement("div",{className:n},a.createElement("div",{className:i},e.storeIcon(e.state.adding[t],t,!l)),a.createElement("div",{className:o},t)))});return u.unshift(),u},_getMultiplier:function(){var e=this.state.buyMultiplier,t=this.state.buyAddPercent;return e+e*(t/100)},_quantity:function(){var e=this;return a.createElement("form",{id:"quantityContainer",noValidate:!0},a.createElement("div",null,a.createElement("span",{className:"notSelectable",style:{fontWeight:"bold",marginRight:5}},"x"),a.createElement("input",{type:"number",min:1,value:this.state.buyMultiplier,onChange:function(t){var n=parseFloat(t.target.value);(isNaN(n)||1>n)&&(n=1),e.setState({buyMultiplier:n})}})),a.createElement("span",{className:"notSelectable",style:{fontSize:"2em",marginLeft:10,marginRight:10}}," + "),a.createElement("div",null,a.createElement("input",{type:"number",min:0,step:10,value:this.state.buyAddPercent,onChange:function(t){var n=parseFloat(t.target.value);(isNaN(n)||0>n)&&(n=0),e.setState({buyAddPercent:n})}}),a.createElement("span",{className:"notSelectable",style:{marginLeft:5}},"%")))},render:function(){return a.createElement("div",{className:"storeButtonContainer"},a.createElement("div",{className:"storeContainerLogo",key:"storeContainerLogo"},a.createElement("i",{className:"icon-basket-3"}),"Buy Parts"),a.createElement(o,{extensionPresence:this.state.extensionPresence,bomInstallLink:this.state.extensionInstallLink,compatibleBrowser:this.state.compatibleBrowser}),a.createElement(l,{compatibleBrowser:this.state.compatibleBrowser}),this._quantity(),a.createElement(c,{multiplier:this._getMultiplier(),items:this.props.items}),a.createElement("div",{className:"storeButtons"},this.storeButtons()))}});t.exports=m},{"./bom_install_prompt":3,"./direct_stores":5,"./extension_compatibility_prompt":6,"./install_extension":10,"1-click-bom":"1-click-bom","browser-version":"browser-version",react:"react"}],5:[function(e,t,n){"use strict";var a=e("react"),r=e("1-click-bom/lib/data/digikey.json"),i=e("1-click-bom/lib/data/farnell.json"),o=e("1-click-bom/lib/data/countries.json"),l=function(e,t,n,a){var r,i,o,l;return r=t.line,i=t.notify,o=t.timeout,null==r&&(r=null),null==i&&(i=!1),null==o&&(o=6e4),l=new XMLHttpRequest,l.line=r,l.open("GET",e,!0),l.setRequestHeader("Content-type","application/x-www-form-urlencoded"),l.url=e,l.onreadystatechange=function(e){return 4===e.target.readyState?200===e.target.status?n(e):a(e):void 0},l.timeout=o,l.ontimedout=function(e){return a(e)},l.send()},s=function(e){var t,n=[];for(var a in o)t=o[a],n.push(t);var r="https://freegeoip.kitnic.it";return l(r,{timeout:5e3},function(){return function(a){var r;return r=JSON.parse(a.target.responseText),t=r.country_code,"GB"===t&&(t="UK"),n.indexOf(t)<0&&(t="Other"),e(t)}}(this),function(){return e("Other")})},c=a.createClass({displayName:"DirectStores",propTypes:{items:a.PropTypes.any.isRequired,multiplier:a.PropTypes.number.isRequired},getInitialState:function(){var e=this;return"undefined"!=typeof window&&s(function(t){e.setState({countryCode:t})}),{countryCode:"Other"}},getParts:function(e){var t=this,n=this.props.items;return n=n.filter(function(t){return e in t.retailers&&""!=t.retailers[e]}),n=n.map(function(n){return{sku:n.retailers[e],reference:n.reference,quantity:Math.ceil(t.props.multiplier*n.quantity)}})},digikeyPartRenderer:function(e,t){return t++,a.createElement("span",{key:"digikeyRenderer"+t},a.createElement("input",{type:"hidden",name:"part"+t,value:e.sku}),a.createElement("input",{type:"hidden",name:"qty"+t,value:e.quantity}),a.createElement("input",{type:"hidden",name:"cref"+t,value:e.reference}))},digikey:function(e,t){var n=r.sites[r.lookup[e]];return a.createElement("form",{target:"_blank",key:"DigikeyForm",id:"DigikeyForm",method:"POST",action:"https"+n+"/classic/ordering/fastadd.aspx?WT.z_cid=ref_kitnic"},t.map(this.digikeyPartRenderer))},tildeDelimiter:function(e){return e.sku+"~"+e.quantity},farnell:function(e,t){var n=i.sites[i.lookup[e]],r=t.map(this.tildeDelimiter).join("~");return a.createElement("form",{target:"_blank",key:"FarnellForm",id:"FarnellForm",method:"GET",action:"https"+n+"/jsp/extlink.jsp"},a.createElement("input",{type:"hidden",name:"CMP",value:"ref_kitnic"}),a.createElement("input",{type:"hidden",name:"action",value:"buy"}),a.createElement("input",{type:"hidden",name:"product",value:r}))},newark:function(e){var t=e.map(this.tildeDelimiter).join("~");return a.createElement("form",{target:"_blank",key:"NewarkForm",id:"NewarkForm",method:"GET",action:"https://www.newark.com/jsp/extlink.jsp"},a.createElement("input",{type:"hidden",name:"CMP",value:"ref_kitnic"}),a.createElement("input",{type:"hidden",name:"action",value:"buy"}),a.createElement("input",{type:"hidden",name:"product",value:t}))},render:function(){var e=this.getParts("Digikey"),t=this.getParts("Farnell"),n=this.getParts("Newark");return a.createElement("span",null,[this.digikey(this.state.countryCode,e),this.farnell(this.state.countryCode,t),this.newark(n)])}});t.exports=c},{"1-click-bom/lib/data/countries.json":18,"1-click-bom/lib/data/digikey.json":19,"1-click-bom/lib/data/farnell.json":20,react:"react"}],6:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"ExtensionCompatibilityPrompt",propTypes:{compatibleBrowser:a.PropTypes.bool.isRequired},render:function(){return this.props.compatibleBrowser?null:a.createElement("div",{className:"extensionCompatibilityPrompt"},"Sorry, the ",a.createElement("a",{className:"bomPromptLink",href:"https://1clickbom.com/"},"1-click BOM extension")," is not yet available for your browser. Only the Digikey add-to-cart links work fully, Farnell and Newark should work but the references will not be added as line-notes.")}});t.exports=r},{react:"react"}],7:[function(e,t,n){"use strict";var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=e("react"),i=r.createClass({displayName:"FadeImage",propTypes:{style:r.PropTypes.any,speed:r.PropTypes.any,src:r.PropTypes.string.isRequired},getInitialState:function(){return{opacity:0}},fadeIn:function(){this.setState({opacity:1})},render:function(){var e=this.props.style||{};return e.transition="opacity "+(this.props.speed||1)+"s",e.opacity=this.state.opacity,r.createElement("img",a({},this.props,{style:e,src:this.props.src,onLoad:this.fadeIn}))}});t.exports=i},{react:"react"}],8:[function(e,t,n){"use strict";var a=e("react"),r=e("./zip-info.json"),i=a.createClass({displayName:"Gerbers",render:function(){return a.createElement("div",{className:"gerbersContainer"},a.createElement("a",{className:"zipPath",href:r},a.createElement("div",{className:"gerbers"},a.createElement("i",{className:"octicon octicon-circuit-board"})," ","Download Gerbers")))}});t.exports=i},{"./zip-info.json":17,react:"react"}],9:[function(e,t,n){t.exports={id:"git.defproc.co.uk/DefProc/piezo-sensor",summary:"A conditioning circuit for using a piezo as an impact sensor for foam darts",site:"http://defproc.co.uk/p/piezo",bom:{lines:[{reference:"C1",quantity:1,description:"4.7nF (any manufacturer)",partNumbers:[{part:"MCFU5472Z5",manufacturer:""}],retailers:{Digikey:"BC1076CT-ND",Mouser:"",RS:"7215287",Newark:"",Farnell:"9411844"},row:1},{reference:"D1, D2",quantity:2,description:"Shottky Rectifier diode",partNumbers:[{part:"SR1100",manufacturer:""}],retailers:{Digikey:"",Mouser:"",RS:"8050573",Newark:"",Farnell:"1861419"},row:2},{reference:"D3",quantity:1,description:"5.1V Zener Diode",partNumbers:[{part:"1N751A",manufacturer:""}],retailers:{Digikey:"1N751A CT-ND",Mouser:"",RS:"2508336060",Newark:"",Farnell:"1861484"},row:3},{reference:"P1",quantity:1,description:"",partNumbers:[],retailers:{Digikey:"",Mouser:"",RS:"",Newark:"",Farnell:""},row:4},{reference:"PZ1",quantity:1,description:"20mm uncased piezo (https://www.kitronik.co.uk/c3309-20mm-uncased-piezo.html)",partNumbers:[{part:"7BB-20-6L0",manufacturer:""}],retailers:{Digikey:"490-7712-ND",Mouser:"",RS:"",Newark:"",Farnell:"1192520"},row:5},{reference:"R1",quantity:1,description:"1M 1/4W (any manufacturer)",partNumbers:[{part:"LR0204F1M0",manufacturer:""}],retailers:{Digikey:"CF14JT1M00CT-ND",Mouser:"",RS:"4778662",Newark:"",Farnell:"2329894"},row:6}],tsv:"References	Qty	Description	Manufacturer	MPN	Digikey	Mouser	RS	Newark	Farnell\nC1	1	4.7nF (any manufacturer)		MCFU5472Z5	BC1076CT-ND		7215287		9411844\nD1, D2	2	Shottky Rectifier diode		SR1100			8050573		1861419\nD3	1	5.1V Zener Diode		1N751A	1N751A CT-ND		2508336060		1861484\nP1	1								\nPZ1	1	20mm uncased piezo (https://www.kitronik.co.uk/c3309-20mm-uncased-piezo.html)		7BB-20-6L0	490-7712-ND				1192520\nR1	1	1M 1/4W (any manufacturer)		LR0204F1M0	CF14JT1M00CT-ND		4778662		2329894\n"},repo:"https://git.defproc.co.uk/DefProc/piezo-sensor"}},{}],10:[function(e,t,n){"use strict";var a=e("browser-version"),r=function(){var e=a(),t=void 0;return t=/Chrome/.test(e)?function(){chrome.webstore.install(void 0,void 0,function(e){return console.log(e)})}:/Firefox/.test(e)?function(){window.open("//addons.mozilla.org/firefox/downloads/latest/634060/addon-634060-latest.xpi","_self")}:function(){window.open("//1clickBOM.com","_self")}};t.exports=r()},{"browser-version":"browser-version"}],11:[function(e,t,n){"use strict";t.exports=function(e,t){"number"!=typeof t&&(t=0);var n=e.getBoundingClientRect(),a={top:n.top+t,left:n.left+t,right:n.right-t,bottom:n.bottom-t},r=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth,o=a.top>=0&&a.left>=0,l=a.bottom<=r&&a.right<=i;return o&&l}},{}],12:[function(e,t,n){"use strict";var a=e("react"),r=e("react-dom"),i=e("./is_visible"),o=a.createClass({displayName:"LazyLoad",propTypes:{distance:a.PropTypes.number,component:a.PropTypes.node.isRequired,children:a.PropTypes.node.isRequired,once:a.PropTypes.bool},getDefaultProps:function(){return{distance:100,component:a.createElement("div",null),once:!1}},getInitialState:function(){return{visible:!1}},componentDidMount:function(){this._checkViewport(),this._timer=setInterval(this._checkViewport,1e3)},componentWillUnmount:function(){clearInterval(this._timer)},_checkViewport:function(){if(!this.props.once||!this.state.visible){var e=r.findDOMNode(this);this.setState({visible:i(e,this.props.distance)})}},render:function(){return this.state.visible?this.props.children:this.props.component}});t.exports=o},{"./is_visible":11,react:"react","react-dom":"react-dom"}],13:[function(e,t,n){"use strict";var a=e("react"),r=e("react-document-title"),i=e("./title_bar"),o=e("./bom"),l=e("./board_showcase"),s=e("./buy_parts"),c=e("./info.json"),m=e("./readme"),u=a.createClass({displayName:"Page",render:function(){var e,t=c.id.split("/").slice(2).join(" / "),n=c.id.split("/").slice(0,2).join(" / ");e=""==c.site?a.createElement("div",{className:"disabledSite",title:"no website info available"},a.createElement("span",{className:"octicon octicon-link"}),"website"):a.createElement("a",{href:c.site},a.createElement("span",{className:"octicon octicon-link"})," website");var u=a.createElement("a",{href:c.repo},a.createElement("span",{className:"octicon octicon-repo"})," repo");return a.createElement(r,{title:t+" - kitnic.it"},a.createElement("div",null,a.createElement("div",{className:"page"},a.createElement(i,null,a.createElement("div",{className:"titleText"},t),a.createElement("div",{className:"subtitleText"},n)),a.createElement("div",{className:"pageContainer"},a.createElement("div",{className:"infoBar"},a.createElement("div",{className:"infoBarInner"},a.createElement("div",{className:"infoBarSummary"},c.summary),a.createElement("div",{className:"infoBarLinksContainer"},a.createElement("div",{className:"infoBarLinks"},e),a.createElement("div",{className:"infoBarLinks"},u)))),a.createElement(l,null),a.createElement(s,{items:c.bom.lines?c.bom.lines:[]}),a.createElement(m,null),a.createElement(o,{data:c.bom?c.bom:[]})))))}});t.exports=u},{"./board_showcase":1,"./bom":2,"./buy_parts":4,"./info.json":9,"./readme":14,"./title_bar":16,react:"react","react-document-title":"react-document-title"}],14:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"Readme",render:function(){return a.createElement("div",{className:"readme"},a.createElement("h2",{id:"user-content-piezo-sensor",className:"deep-link"},a.createElement("a",{href:"#piezo-sensor",name:"piezo-sensor"},"Piezo-Sensor")),a.createElement("p",null,"A standalone piezo conditioning board for use as an impact sensor."),a.createElement("p",null,"The circuit takes the noisy input voltage signal from the attached piezo, rectifies it, clips it to 5V and passes through an RC pair to give a pulse-and-discharge signal."),a.createElement("p",null,"The pulse duration is approximately 10ms long, and the maximum voltage relates to the impact size on the piezo, so it's only triggered by an impact and not a slow press."),a.createElement("p",null,"By choosing a threshold voltage level on the attached device, it's possible to filter out impacts above a required size. The RC circuit is specifically sized to be useful for registering strikes from foam dart guns such as those from Nerf guns."))}});t.exports=r},{react:"react"}],15:[function(e,t,n){"use strict";var a=e("react"),r=e("react-dom"),i=e("./page");r.render(a.createElement(i,null),document.getElementById("content"))},{"./page":13,react:"react","react-dom":"react-dom"}],16:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"TitleBar",propTypes:{children:a.PropTypes.any},render:function(){return a.createElement("div",{className:"titleBar"},a.createElement("div",{className:"logoContainer"},a.createElement("a",{href:"/"},a.createElement("center",{className:"logoImgContainer"},a.createElement("img",{className:"logoImg",src:"/images/logo.svg"})))),a.createElement("div",{className:"middleContainer"},this.props.children),a.createElement("div",{className:"submitContainer"},a.createElement("a",{className:"uploadContainer",href:"https://github.com/monostable/kitnic/#submitting-your-project"},a.createElement("div",{className:"submissionButton"},a.createElement("span",null,"Register a project"))),a.createElement("a",{className:"contributeContainer",title:"Contribute to Kitnic",href:"https://github.com/monostable/kitnic/"},a.createElement("div",{className:"contributeButton"},a.createElement("span",{className:"octicon octicon-mark-github githubIcon"})))))}});t.exports=r},{react:"react"}],17:[function(e,t,n){t.exports="piezo-sensor-1ef4e9e-gerbers.zip"},{}],18:[function(e,t,n){t.exports={Argentina:"AR",Armenia:"AM",Australia:"AU",Austria:"AT",Azerbaijan:"AZ",Bahrain:"BH",Belarus:"BY",Belgium:"BE",Bolivia:"BO",Bosnia:"BA",Botswana:"BW",Brazil:"BR",Bulgaria:"BG",Burundi:"BI",Canada:"CA",Centrafrique:"CF",Chile:"CL",China:"CN",Colombia:"CO","Costa Rica":"CR",Croatia:"HR",Cyprus:"CY","Czech Republic":"CZ",Denmark:"DK","Dominican Republic":"DO",Ecuador:"EC",Egypt:"EG",Estonia:"EE",Finland:"FI",France:"FR",Germany:"DE",Ghana:"GH",Greece:"GR",Guatemala:"GT","Hong Kong":"HK",Hungary:"HU",Iceland:"IS",India:"IN",Indonesia:"ID",Ireland:"IE",Israel:"IL",Italy:"IT",Jamaica:"JM",Japan:"JP",Jordan:"JO",Kenya:"KE",Korea:"KR",Kuwait:"KW",Latvia:"LV",Lebanon:"LB",Lesotho:"LS",Liberia:"LR",Libya:"LY",Lichtenstein:"LI",Lithuania:"LT",Luxembourg:"LU",Macedonia:"MK",Madagascar:"MG",Malawi:"MW",Malaysia:"MY",Malta:"MT",Mauritius:"MU",Mexico:"MX",Moldova:"MD",Montenegro:"ME",Morocco:"MA",Mozambique:"MZ",Namibia:"NA",Netherlands:"NL","New Zealand":"NZ",Nigeria:"NG",Norway:"NO",Oman:"OM",Pakistan:"PK",Panama:"PA",Peru:"PE",Philippines:"PH",Poland:"PL",Portugal:"PT","Puerto Rico":"PR",Qatar:"QA",Romania:"RO","Russian Federation":"RU","Saudi Arabia":"SA",Senegal:"SN",Serbia:"RS",Singapore:"SG",Slovakia:"SK",Slovenia:"SI","South Africa":"ZA",Spain:"ES","Sri Lanka":"LK",Sweden:"SE",Switzerland:"CH",Taiwan:"TW",Tanzania:"TZ",Thailand:"TH",Tunisia:"TN",Turkey:"TR",Ukraine:"UA","United Arab Emirates":"AE","United Kingdom":"UK","United States":"US",Uruguay:"UY",Venezuela:"VE","Viet Nam":"VN",Zambia:"ZM",Zimbabwe:"ZW",Other:"Other"}},{}],19:[function(e,t,n){t.exports={sites:{AT:"://www.digikey.at",AU:"://www.digikey.com.au",BE:"://www.digikey.be",CA:"://www.digikey.ca",CH:"://www.digikey.ch",CN:"://www.digikey.cn",DE:"://www.digikey.de",DK:"://www.digikey.dk",ES:"://www.digikey.es",FI:"://www.digikey.fi",FR:"://www.digikey.fr",GR:"://www.digikey.gr",HK:"://www.digikey.hk",IE:"://www.digikey.ie",IL:"://www.digikey.co.il",IT:"://www.digikey.it","US/International":"://www.digikey.com",JP:"://www.digikey.jp",KR:"://www.digikey.kr",LU:"://www.digikey.lu",MX:"://www.digikey.com.mx",NL:"://www.digikey.nl",NO:"://www.digikey.no",NZ:"://www.digikey.co.nz",PT:"://www.digikey.pt",SE:"://www.digikey.se",SG:"://www.digikey.sg",TW:"://www.digikey.tw",UK:"://www.digikey.co.uk"},carts:"/classic/ordering/addpart.aspx",addlines:"/classic/ordering/addpart.aspx",addline_params:"",lookup:{AE:"US/International",AM:"US/International",AR:"US/International",AT:"AT",AU:"AU",AZ:"US/International",BA:"US/International",BE:"BE",BG:"US/International",BH:"US/International",BI:"US/International",BO:"US/International",BR:"US/International",BW:"US/International",BY:"US/International",CA:"CA",CF:"US/International",CH:"CH",CL:"US/International",CN:"CN",CO:"US/International",CR:"US/International",CY:"US/International",CZ:"US/International",DE:"DE",DK:"DK",DO:"US/International",EC:"US/International",EE:"US/International",EG:"US/International",ES:"ES",FI:"FI",FR:"FR",GH:"US/International",GR:"GR",GT:"US/International",HK:"HK",HR:"US/International",HU:"US/International",ID:"US/International",IE:"IE",IL:"IL",IN:"US/International",IS:"US/International",IT:"IT",JM:"US/International",JO:"US/International",JP:"JP",KE:"US/International",KR:"KR",KW:"US/International",LB:"US/International",LI:"US/International",LK:"US/International",LR:"US/International",LS:"US/International",LT:"US/International",LU:"LU",LV:"US/International",LY:"US/International",MA:"US/International",MD:"US/International",ME:"US/International",MG:"US/International",MK:"US/International",MT:"US/International",MU:"US/International",MW:"US/International",MX:"MX",MY:"US/International",MZ:"US/International",NA:"US/International",NG:"US/International",NL:"NL",NO:"NO",NZ:"NZ",OM:"US/International",PA:"US/International",PE:"US/International",PH:"US/International",PK:"US/International",PL:"US/International",PR:"US/International",PT:"PT",QA:"US/International",RO:"US/International",RS:"US/International",RU:"US/International",SA:"US/International",SE:"SE",SG:"SG",SI:"US/International",SK:"US/International",SN:"US/International",TH:"US/International",TN:"US/International",TR:"US/International",TW:"TW",TZ:"US/International",UA:"US/International",UK:"UK",US:"US/International",UY:"US/International",VE:"US/International",VN:"US/International",ZA:"US/International",ZM:"US/International",ZW:"US/International",Other:"US/International"}}},{}],20:[function(e,t,n){t.exports={sites:{AT:"://at.farnell.com",BE:"://be.farnell.com",BG:"://bg.farnell.com",CZ:"://cz.farnell.com",DK:"://dk.farnell.com",EE:"://ee.farnell.com",FI:"://fi.farnell.com",FR:"://fr.farnell.com",DE:"://de.farnell.com",HU:"://hu.farnell.com",IE:"://ie.farnell.com",IL:"://il.farnell.com",IT:"://it.farnell.com",LV:"://lv.farnell.com",LT:"://lt.farnell.com",NL:"://nl.farnell.com",NO:"://no.farnell.com",PL:"://pl.farnell.com",PT:"://pt.farnell.com",RO:"://ro.farnell.com",RU:"://ru.farnell.com",SK:"://sk.farnell.com",SI:"://si.farnell.com",ES:"://es.farnell.com",SE:"://se.farnell.com",CH:"://ch.farnell.com",TR:"://tr.farnell.com",UK:"://uk.farnell.com",NO:"://no.farnell.com",SE:"://se.farnell.com",AU:"://au.element14.com",CN:"://cn.element14.com",HK:"://hk.element14.com",IN:"://in.element14.com",KR:"://kr.element14.com",MY:"://my.element14.com",NZ:"://nz.element14.com",PH:"://ph.element14.com",SG:"://sg.element14.com",TW:"://tw.element14.com",TH:"://th.element14.com",International:"://export.farnell.com"},carts:"/jsp/shoppingCart/shoppingCart.jsp",addlines:"/jsp/shoppingCart/quickPaste.jsp?_DARGS=/jsp/shoppingCart/fragments/quickPaste/quickPaste.jsp.quickpaste",addline_params:"",lookup:{AE:"International",AU:"AU",AM:"International",AR:"International",AT:"AT",AZ:"International",BA:"International",BE:"BE",BG:"BG",BO:"International",BR:"International",BY:"International",CA:"International",CH:"CH",CL:"International",CN:"CN",CO:"International",CR:"International",CY:"International",CZ:"CZ",DE:"DE",DK:"DK",DO:"International",EC:"International",EE:"EE",EG:"International",ES:"ES",FI:"FI",FR:"FR",GR:"International",GT:"International",HK:"HK",HR:"International",HU:"HU",ID:"International",IE:"IE",IL:"IL",IN:"IN",IS:"International",IT:"IT",International:"International",JM:"International",JP:"International",KR:"KR",LB:"International",LK:"International",LT:"LT",LU:"International",LI:"International",LV:"LV",MA:"International",MD:"International",MK:"International",MX:"International",MY:"MY",NL:"NL",NO:"NO",NZ:"NZ",PA:"International",PE:"International",PH:"PH",PK:"International",PL:"PL",PR:"International",PT:"PT",RO:"RO",RS:"International",RU:"RU",SA:"International",SE:"SE",SG:"SG",SI:"SI",SK:"SK",TH:"TH",TN:"International",TR:"TR",TW:"TW",UA:"RU",UK:"UK",US:"International","US/International":"International",UY:"International",VE:"International",VN:"International",ZA:"International",BH:"International",BW:"International",BI:"International",CF:"International",GH:"International",JO:"International",KE:"International",KW:"International",LS:"International",LR:"International",LY:"International",MG:"International",MW:"International",MU:"International",ME:"International",MT:"International",MZ:"International",NA:"International",NG:"International",OM:"International",QA:"International",SN:"International",TZ:"International",ZM:"International",ZW:"International",Other:"International"}}},{}]},{},[15]);