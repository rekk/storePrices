(()=>{"use strict";var e=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function c(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}u((r=r.apply(e,t||[])).next())}))},t=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},n=document.getElementById("search-input"),r=document.getElementById("search-results"),o=function(){var e;try{return JSON.parse(null!==(e=window.localStorage.getItem("apiKey"))&&void 0!==e?e:"").value}catch(e){return console.warn("Could not find API key."),null}}();function i(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function a(n,r){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){return e=new Request(n,{method:"GET",headers:r,mode:"cors",cache:"default"}),[2,fetch(e).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))]}))}))}function c(){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,a("https://api.jsonbin.io/b/5ffaf3ce55b359028dbd32e3/3",{"secret-key":null!=o?o:""})];case 1:return e=t.sent(),console.log(e),[2,e]}}))}))}function u(){var n;return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:document.cookie.includes("itemEntriesLastUpdate")||window.localStorage.removeItem("itemEntries");try{return[2,JSON.parse(null!==(n=window.localStorage.getItem("itemEntries"))&&void 0!==n?n:"")]}catch(e){console.warn("Could not find cached items, trying API call...")}return[4,c()];case 1:return e=t.sent(),r=e.itemEntries,window.localStorage.setItem("itemEntries",JSON.stringify(r)),document.cookie="itemEntriesLastUpdate="+Date.now()+";max-age=86400;samesite=strict",[2,r]}}))}))}o&&""!==o||(o=prompt("Enter API key: "),window.localStorage.setItem("apiKey",JSON.stringify({value:o}))),null==n||n.addEventListener("change",(function(n){var o;return e(this,void 0,void 0,(function(){var e,a,c,l;return t(this,(function(t){switch(t.label){case 0:return r&&(null===(o=null==n?void 0:n.currentTarget)||void 0===o?void 0:o.value)&&(e=n.currentTarget.value.trim().toLowerCase())?(r.removeAttribute("hidden"),[4,u()]):[2];case 1:return a=t.sent(),(c=a.filter((function(t){return t.name.toLowerCase().includes(e)}))).length<1?(i(r),r.appendChild((s=document.createElement("div"),d=document.createElement("div"),f=document.createTextNode("No results found!"),d.appendChild(f),d.classList.add("search-entry-title"),s.appendChild(d),s.classList.add("search-entry"),s)),[2]):(l=c.map((function(e){return function(e){var t=document.createElement("div"),n=document.createElement("div"),r=document.createTextNode(e.name),o=document.createElement("div"),i=e.prices;console.log(i);var a=Object.entries(i).map((function(e){var t=e[0],n=e[1];return document.createTextNode(t.toUpperCase()+": €"+n)}));return n.appendChild(r),n.classList.add("search-entry-title"),a.forEach((function(e){o.appendChild(e),o.appendChild(document.createElement("br"))})),t.appendChild(n),t.appendChild(o),t.classList.add("search-entry"),t}(e)})),i(r),l.forEach((function(e){return r.appendChild(e)})),[2])}var s,d,f}))}))}))})();
