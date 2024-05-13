(function(M,j){typeof exports=="object"&&typeof module<"u"?j(exports):typeof define=="function"&&define.amd?define(["exports"],j):(M=typeof globalThis<"u"?globalThis:M||self,j(M.arcgisScene={}))})(this,function(M){"use strict";var j=typeof window<"u";const ne={Promise:j?window.Promise:void 0};var oe="4.25",X="next";function re(t){if(t.toLowerCase()===X)return X;var n=t&&t.match(/^(\d)\.(\d+)/);return n&&{major:parseInt(n[1],10),minor:parseInt(n[2],10)}}function ae(t){return t===void 0&&(t=oe),"https://js.arcgis.com/".concat(t,"/")}function ze(t){t===void 0&&(t=oe);var n=ae(t),e=re(t);if(e!==X&&e.major===3){var s=e.minor<=10?"js/":"";return"".concat(n).concat(s,"esri/css/esri.css")}else return"".concat(n,"esri/themes/light/main.css")}function Ve(t){var n=document.createElement("link");return n.rel="stylesheet",n.href=t,n}function Te(t,n){if(n){var e=document.querySelector(n);e.parentNode.insertBefore(t,e)}else document.head.appendChild(t)}function Ne(t){return document.querySelector('link[href*="'.concat(t,'"]'))}function Me(t){return!t||re(t)?ze(t):t}function He(t,n){var e=Me(t),s=Ne(e);return s||(s=Ve(e),Te(s,n)),s}var Ie={};function $e(t){var n=document.createElement("script");return n.type="text/javascript",n.src=t,n.setAttribute("data-esri-loader","loading"),n}function se(t,n,e){var s;e&&(s=Ge(t,e));var d=function(){n(t),t.removeEventListener("load",d,!1),s&&t.removeEventListener("error",s,!1)};t.addEventListener("load",d,!1)}function Ge(t,n){var e=function(s){n(s.error||new Error("There was an error attempting to load ".concat(t.src))),t.removeEventListener("error",e,!1)};return t.addEventListener("error",e,!1),e}function ie(){return document.querySelector("script[data-esri-loader]")}function Z(){var t=window.require;return t&&t.on}function Be(t){t===void 0&&(t={});var n={};[Ie,t].forEach(function(d){for(var g in d)Object.prototype.hasOwnProperty.call(d,g)&&(n[g]=d[g])});var e=n.version,s=n.url||ae(e);return new ne.Promise(function(d,g){var h=ie();if(h){var q=h.getAttribute("src");q!==s?g(new Error("The ArcGIS API for JavaScript is already loaded (".concat(q,")."))):Z()?d(h):se(h,d,g)}else if(Z())g(new Error("The ArcGIS API for JavaScript is already loaded."));else{var H=n.css;if(H){var _=H===!0;He(_?e:H,n.insertCssBefore)}h=$e(s),se(h,function(){h.setAttribute("data-esri-loader","loaded"),d(h)},g),document.body.appendChild(h)}})}function ce(t){return new ne.Promise(function(n,e){var s=window.require.on("error",e);window.require(t,function(){for(var d=[],g=0;g<arguments.length;g++)d[g]=arguments[g];s.remove(),n(d)})})}function Pe(t,n){if(n===void 0&&(n={}),Z())return ce(t);var e=ie(),s=e&&e.getAttribute("src");return!n.url&&s&&(n.url=s),Be(n).then(function(){return ce(t)})}const Fe=(t,n)=>t.replace(/\(\?\<(.+?)\>[^)]*\)/g,(e,s)=>n[s]),k=(t,n={},e="")=>{const s=document.createElement(t);for(let d in n)s.setAttribute(d,n[d]);return s.innerHTML=e,s},Ue=(t,n)=>(document.getElementById(t)||document.getElementsByTagName("head")[0].prepend(k("STYLE",{type:"text/css"},n)),!0),Je=function(t={}){Ue("geocam-argis-map",`
      .geocam-auto-rotate-checkbox, .geocam-auto-brightness-checkbox {
        display: none;
      }

      .geocam-auto-rotate-span {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24'  viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M7.94,5.12L6.49,3.66C8.07,2.61,9.96,2,12,2c5.52,0,10,4.48,10,10c0,2.04-0.61,3.93-1.66,5.51l-1.46-1.46 C19.59,14.86,20,13.48,20,12c0-4.41-3.59-8-8-8C10.52,4,9.14,4.41,7.94,5.12z M17.66,9.53l-1.41-1.41l-2.65,2.65l1.41,1.41 L17.66,9.53z M19.78,22.61l-2.27-2.27C15.93,21.39,14.04,22,12,22C6.48,22,2,17.52,2,12c0-2.04,0.61-3.93,1.66-5.51L1.39,4.22 l1.41-1.41l18.38,18.38L19.78,22.61z M16.06,18.88l-3.88-3.88l-1.59,1.59l-4.24-4.24l1.41-1.41l2.83,2.83l0.18-0.18L5.12,7.94 C4.41,9.14,4,10.52,4,12c0,4.41,3.59,8,8,8C13.48,20,14.86,19.59,16.06,18.88z'/></svg>")
      }

      .geocam-auto-rotate-checkbox:checked +.geocam-auto-rotate-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M18.6,19.5H21v2h-6v-6h2v2.73c1.83-1.47,3-3.71,3-6.23c0-4.07-3.06-7.44-7-7.93V2.05c5.05,0.5,9,4.76,9,9.95 C22,14.99,20.68,17.67,18.6,19.5z M4,12c0-2.52,1.17-4.77,3-6.23V8.5h2v-6H3v2h2.4C3.32,6.33,2,9.01,2,12c0,5.19,3.95,9.45,9,9.95 v-2.02C7.06,19.44,4,16.07,4,12z M16.24,8.11l-5.66,5.66l-2.83-2.83l-1.41,1.41l4.24,4.24l7.07-7.07L16.24,8.11z'/></svg>")
      }

      .geocam-auto-brightness-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'  enable-background='new 0 0 24 24' viewBox='0 0 24 24'  fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
      }

      .geocam-auto-brightness-checkbox:checked +.geocam-auto-brightness-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M11 7l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L13 7h-2zm-.15 5.65L12 9l1.15 3.65h-2.3zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48z'/></svg>")
      }

     .geocam-auto-brightness-checkbox:disabled +.geocam-auto-brightness-span {
          opacity: 50%;
          cursor: auto;
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'  enable-background='new 0 0 24 24' viewBox='0 0 24 24'  fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
      }

    `);let e,s,d=[],g,h,q,H,_,ue,O,I,R,$,de,G,me,K,ge,fe,he,pe,ve,be,je,we,qe,ye=!0,Le;const{sceneView:a,prevNextPlugin:W,widgets:Ke,expands:Qe,src:ee}=t,xe=function(o,i,c,r,u){return 1/Math.sqrt(a.scale/70),{geometry:{type:"point",latitude:c,longitude:i,z:r},symbol:{type:"point-3d",symbolLayers:[{type:"object",width:8,height:4,depth:8,anchor:"top",resource:{primitive:"cone"},roll:0,tilt:u,heading:o,material:{color:"rgba(0,0,255,0.6)"}}]}}};let L=xe(0,0,0,0,90);const A=function(o,i,c,r,u){if(console.log("update fov",o,i,c,r,u),g&&(g.removeAll(),e.visible()&&o!==null))if(I()){const f=a.camera.clone();(c||c===0)&&(f.position.latitude=c),(i||i===0)&&(f.position.longitude=i),(r||r===0)&&(f.position.z=r),(o||o===0)&&(f.heading=o),(u||u===0)&&(f.tilt=90-u),f.fov=parseInt(e.fov()),console.log("camera fov",f),a.goTo(f,{animate:!1}),a.camera.fov=e.fov()}else L=xe(o||0,i||L.geometry.longitude,c||L.geometry.latitude,r||L.geometry.z,u?90-u:L.symbol.symbolLayers[0].tilt),g.add(L),(c||c===0)&&Le([i,c])},ke=function(o,i,c={}){const r=new RegExp(i,"i");let u=r.test(o.name)||r.test(o.alias);return u&&c.description&&(u=!!o.description),u},Se=function(o){if(o){var i=document.createElement("textarea");return i.innerHTML=o,i.value}else return"https://image.geocam.xyz/"},Oe=(o,i)=>{const c=o.base;if(o.filenames)return JSON.parse(i[o.filenames]).map(r=>Array.isArray(r)?r.map(u=>/^https?:\/\//i.test(u)?r:`${c}${u}`):/^https?:\/\//i.test(r)?r:`${c}${r}`);{const r=i[o.capture].split(".")[0],u=r.split("/").pop(),f=JSON.parse(i[o.lengths]),v=JSON.parse(i[o.offsets]);return f.map((b,w)=>{const z=encodeURIComponent(`https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${r}_${w}.tar`);return`${c}${u}/${w}/${i[o.shot]}.jpg?offset=${v[w]}&length=${b}&container=${z}`})}},Re=function(o){return d.findIndex(i=>i.layer==o.layer)},De=function(o){if(e.label){const{capture:i,utc_time:c,shot:r}=o,u=new Date(c);e.label(`${u.toLocaleString()}`)}};let Ee;const te=function(o,i){const c=K();console.log("shotclick with viewlock",c);const r=d[i],u=o.attributes[r.shot];Ee=u,e.shot(u),W&&(W.prev(o.attributes.prev),W.next(o.attributes.next));const f=[0,1,2].map(z=>Fe(r.calibrationBase,{camera:z,rig_id:o.attributes[r.rigId],calibration:o.attributes[r.calibration]})),v=o.attributes[r.yaw],E=o.attributes[r.rotation],b=$()&&r.brightness?o.attributes[r.brightness]:null;de=b;const w=Oe(r,o.attributes);if(c){const z=bearing(o.geometry,c);e.facing(z)}e.show(w,v,f,E,b),A(e.facing(),o.geometry.longitude,o.geometry.latitude,o.geometry.z,e.horizon()),De(o.attributes)};let Ce;const Ae=function(o,i,c,r){clearTimeout(Ce),Ce=setTimeout(()=>{const f=Math.ceil(o/500),v=a.extent,E=`${v.xmin},${v.ymin},${v.xmax},${v.ymax},${v.spatialReference.wkid}`,b=`mod(id,${f}) = 0 AND extent = ${E}`;d.forEach(w=>{w.layer.definitionExpression!==b&&(w.layer.definitionExpression=b,console.log("definition expression changed for",w.layer,b))}),me(a.zoom),I()||A(e.facing())},500)},Ye=function(o,i,c,r){we([a.center.longitude,a.center.latitude])},_e=function(o,i,c,r){ge(a.camera.position.latitude),fe(a.camera.position.longitude),pe(a.camera.position.z),ve(a.camera.tilt),he(a.camera.heading),be(a.camera.fov)};this.init=async function(o){e=o,Le=e.store("marker"),me=e.store("zoom"),we=e.store("center"),ge=e.store("camLat"),fe=e.store("camLng"),pe=e.store("camAlt"),ve=e.store("camTilt"),he=e.store("camHdg"),be=e.store("camFov"),K=e.store("viewlock"),I=e.store("autorotate"),O=k("DIV",{class:"geocam-auto-rotate"});const i=k("LABEL",{class:"geocam-auto-rotate-label"}),c=k("INPUT",{type:"checkbox",class:"geocam-auto-rotate-checkbox"}),r=k("SPAN",{class:"geocam-auto-rotate-span geocam-viewer-control-button"}," Autorotate");c.checked=I(),c.addEventListener("change",()=>{I(c.checked)}),i.appendChild(c),i.appendChild(r),O.appendChild(i),e.addControl(O,"left-top"),H=I(m=>{O.setAttribute("title",m?"turn auto-rotate off":"turn auto-rotate on"),A(e.facing(),L.geometry.longitude,L.geometry.latitude,L.geometry.z,e.horizon())}),$=e.store("autobrightness"),R=k("DIV",{class:"geocam-auto-brightness"});const u=k("LABEL",{class:"geocam-auto-brightness-label"});G=k("INPUT",{type:"checkbox",class:"geocam-auto-brightness-checkbox"});const f=k("SPAN",{class:"geocam-auto-brightness-span geocam-viewer-control-button"}," Autobrightness");G.disabled=!0,G.checked=$(),G.addEventListener("change",()=>{$(G.checked)}),u.appendChild(G),u.appendChild(f),R.appendChild(u),e.addControl(R,"left-top"),_=$(m=>{R.setAttribute("title",m?"turn auto-brightness off":"turn auto-brightness on"),e.reload($()?de:"[1,1,1]")}),ue=e.visible(m=>A(e.facing())),a.when(async()=>{a.on("clickable",l=>{ye=l}),a.on("immediate-click",l=>{if(!ye)return;const x={x:l.x,y:l.y};if(console.log("immediate-click",l,x),s){console.log("space wqas down");const p=a.toMap(x);if(K(p),lockG&&a.graphics.removeAll(),lockG=lockGraphic(p),a.graphics.add(lockG),e.visible()){const T=bearing(L.geometry,p);e.facing(T)}}else a.hitTest(x).then(p=>{if(p.results&&p.results.length>0)for(var T=0;T<p.results.length;T++){const y=p.results[T].graphic,N=Re(y);if(N>=0){Object.entries(y.attributes).length<2?y.layer.queryFeatures({objectIds:[y.attributes.id],returnGeometry:!0,outFields:"*",where:y.layer.definitionExpression}).then(Q=>{Q.features.length>0&&te(Q.features[0],N)}):te(y,N);break}}})}),h=e.facing(l=>{A(l,null,null,null,e.horizon())}),q=e.horizon(l=>{A(e.facing(),null,null,null,l)});const m=new URLSearchParams(window.location.hash.substr(1)),V=m.get("center");V&&V!=="null"&&(a.center=JSON.parse(V));const B=m.get("zoom");B&&B!=="null"&&(a.zoom=JSON.parse(B));const S=a.camera.clone(),P=m.get("camLat");P&&P!=="null"&&(S.position.latitude=JSON.parse(P));const F=m.get("camLng");F&&F!=="null"&&(S.position.longitude=JSON.parse(F));const U=m.get("camAlt");U&&U!=="null"&&(S.position.z=JSON.parse(U));const D=m.get("camHdg");D&&D!=="null"&&(S.heading=JSON.parse(D));const J=m.get("camTilt");J&&J!=="null"&&(S.tilt=JSON.parse(J));const C=m.get("camFov");C&&C!=="null"&&(S.fov=JSON.parse(C)),a.goTo(S,{animate:!1});const Y=m.get("marker");if(Y){const l=JSON.parse(Y);if(l){const[x,p]=l;A(e.facing(),x,p)}}E.watch(()=>a.scale,Ae),Ae(a.scale),E.watch(()=>a.center,Ye),E.watch(()=>a.camera.position,_e),e.shot(l=>{const x=parseInt(typeof l=="object"&&l!==null?l.id:l);x&&x!==Ee?(console.log("Got shot",l,"layers",d.length),d.forEach((p,T)=>{const y=p.layer;e.resetProgress(),console.log("Querying layer for shot",y,x),y.queryFeatures({objectIds:[x],returnGeometry:!0,outFields:"*",where:y.definitionExpression}).then(N=>{if(console.log("Got results for layer",y,N),N.features.length>0){const Q=N.features[0];te(Q,T)}})})):l||e.hide()})});const[v,E,b]=await Pe(["esri/layers/GraphicsLayer","esri/core/reactiveUtils","esri/layers/FeatureLayer"],{version:"4.26"});if(ee){const m=`${ee}/0`;console.log("shots url is",m);const V=new b({url:m,definitionExpression:"mod(id,100) = 0"});a.map.add(V),V.when(P=>{const F=P.fields,U=F.find(l=>ke(l,"filenames")),D=F.find(l=>ke(l,"calibration"));d.push({layer:V,shot:"id",filenames:"filenames",yaw:"yaw",rotation:"rotation_matrix",datetime:"utc_time",brightness:null,base:Se(U&&U.description),calibration:"calibration",rigId:null,calibrationBase:Se(D.description),capture:"capture"});const J={xmin:-.005,ymin:-.005,xmax:.005,ymax:.005},C=Object.keys(J),Y={};for(let l=0;l<C.length;l++)Y[C[l]]=parseFloat(P.fullExtent[C[l]])+J[C[l]];a.extent=Y});const B=`${ee}/1`;console.log("points features url is",B);const S=new b({url:B,popupEnabled:!0,popupTemplate:{title:"{reference}",content:[{type:"fields",fieldInfos:[{fieldName:"embed",label:"content"}]}]}});a.map.add(S)}g=new v({title:"GeoCam Field of View",geometryType:"point",spatialReference:{wkid:4326}}),a.map.layers.add(g);var w=function(m){switch(m.key,m.key){case"Escape":{K(null),mapView.graphics.removeAll();break}case" ":s=!0}},z=function(m){switch(m.key,m.key){case" ":s=!1}};document.addEventListener("keydown",w),document.addEventListener("keyup",z)},this.destroy=function(){h(),q(),H(),_(),je(),qe(),ue(),a.map.removeLayer(g),e.wrapper.removeChild(O),e.wrapper.removeChild(R)}};class le extends HTMLElement{constructor(){super(),this.plugin=null,console.log("GeocamViewerArcgisScene init")}connectedCallback(){this.link=function(n){console.log("linking to ",n);const e=this.getAttribute("src");e||console.warn("No src attribute on geocam-viewer-arcgis-scene");const s=this.parentNode;if(this.viewer=s.viewer,this.sceneView=n,this.viewer&&this.viewer.plugin){const d=document.getElementsByTagName("geocam-viewer-prev-next-control")[0],g=d&&d.plugin;this.plugin=new Je({sceneView:n,prevNextPlugin:g,src:e}),s.viewer.plugin(this.plugin)}else console.error("GeocamViewerArcgisScene must be a child of GeocamViewer")},console.log("GeocamViewerArcgisScene connected")}disconnectedCallback(){this.plugin=null,this.viewer=null,this.sceneView=null,console.log("GeocamViewerArcgisScene disconnected")}}window.customElements.define("geocam-viewer-arcgis-scene",le),M.GeocamViewerArcgisScene=le,Object.defineProperty(M,Symbol.toStringTag,{value:"Module"})});