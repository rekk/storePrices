(()=>{"use strict";var e=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function c(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}u((r=r.apply(e,t||[])).next())}))},t=function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},n=document.getElementById("search-input"),r=document.getElementById("search-results"),i=function(){var e;try{return JSON.parse(null!==(e=window.localStorage.getItem("apiKey"))&&void 0!==e?e:"").value}catch(e){return console.warn("Could not find API key."),null}}();function o(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function a(n,r){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){return e=new Request(n,{method:"GET",headers:r,mode:"cors",cache:"default"}),[2,fetch(e).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))]}))}))}function c(){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,a("https://api.jsonbin.io/b/5ffaf3ce55b359028dbd32e3",{"secret-key":null!=i?i:""})];case 1:return[2,e.sent()]}}))}))}function u(){var n;return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:document.cookie.includes("itemEntriesLastUpdate")||window.localStorage.removeItem("itemEntries");try{return[2,JSON.parse(null!==(n=window.localStorage.getItem("itemEntries"))&&void 0!==n?n:"")]}catch(e){console.warn("Could not find cached items, trying API call...")}return[4,c()];case 1:return e=t.sent(),r=e.itemEntries,window.localStorage.setItem("itemEntries",JSON.stringify(r)),document.cookie="itemEntriesLastUpdate="+Date.now()+";max-age=86400;samesite=strict",[2,r]}}))}))}i&&""!==i||(i=prompt("Enter API key: "),window.localStorage.setItem("apiKey",JSON.stringify({value:i}))),null==n||n.addEventListener("change",(function(n){var i;return e(this,void 0,void 0,(function(){var e,a,c,l;return t(this,(function(t){switch(t.label){case 0:return r&&(null===(i=null==n?void 0:n.currentTarget)||void 0===i?void 0:i.value)&&(e=n.currentTarget.value.trim().toLowerCase())?(r.removeAttribute("hidden"),[4,u()]):[2];case 1:return a=t.sent(),(c=a.filter((function(t){return t.name.toLowerCase().includes(e)}))).length<1?(o(r),r.appendChild((s=document.createElement("div"),d=document.createElement("div"),f=document.createTextNode("No results found!"),d.appendChild(f),d.classList.add("search-entry-title"),s.appendChild(d),s.classList.add("search-entry"),s)),[2]):(l=c.map((function(e){return function(e){var t=document.createElement("div"),n=document.createElement("div"),r=document.createTextNode(e.name),i=document.createElement("div"),o=e.prices.filter((function(e){return e.price})).map((function(e){return document.createTextNode(e.store.toUpperCase()+": €"+e.price)}));return n.appendChild(r),n.classList.add("search-entry-title"),o.forEach((function(e){i.appendChild(e),i.appendChild(document.createElement("br"))})),t.appendChild(n),t.appendChild(i),t.classList.add("search-entry"),t}(e)})),o(r),l.forEach((function(e){return r.appendChild(e)})),[2])}var s,d,f}))}))}))})();