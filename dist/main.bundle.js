!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=[{id:"r3",artist:"BLUETRAIN aka STEVE O'SULLIVAN",title:"Sapphire Dubs Vol 1",image:"images/records/Bluetrain.jpg",tracks:[{trackId:"Bluetrain-01",trackTitle:"Midnight Creeper",audio:"audio/Bluetrain-01.mp3"},{trackId:"Bluetrain-02",trackTitle:"Where's Burt?",audio:"audio/Bluetrain-02.mp3"}]},{id:"r1",artist:"APHEX TWIN",title:"Selected Ambient Works 85-92",image:"images/records/AphexTwin.jpg",tracks:[{trackId:"AphexTwin-01",trackTitle:"Ptolemy",audio:"audio/AphexTwin-01.mp3"},{trackId:"AphexTwin-02",trackTitle:"Heliosphan",audio:"audio/AphexTwin-02.mp3"},{trackId:"AphexTwin-03",trackTitle:"We Are The Music Makers",audio:"audio/AphexTwin-03.mp3"}]},{id:"r2",artist:"Tony ALLEN / JEFF MILLS",title:"Tomorrow Comes The Harvest",image:"images/records/TonyAllen.jpg",tracks:[{trackId:"TonyAllen-01",trackTitle:"Locked & Loaded",audio:"audio/TonyAllen-01.mp3"},{trackId:"TonyAllen-02",trackTitle:"On The Run",audio:"audio/TonyAllen-02.mp3"}]}],a=document.querySelector("#audio"),c=document.querySelector(".record"),o=document.querySelector(".arm"),l=document.querySelector(".play-pause"),u=document.querySelector(".play-pause-icon"),d=document.querySelector(".slider"),s=document.querySelector(".playlist"),p=document.querySelector(".reset-pitch"),m=(document.querySelector(".playall"),document.querySelector(".volume"),document.querySelector(".progress-bar")),f=[],y={},v=function(){s.innerHTML="",f.map((function(e){var t=document.createElement("li");t.innerText=e.title,console.log("item.id === nowPlaying.id",e.id===y.id),e.id===y.id&&t.classList.add("blue"),s.appendChild(t)}))},b=function(e,t,n,r){f.push({cover:e,track:t,title:n,id:r})},T=function(){f.length=0,s.innerHTML=""},g=function(){return a.currentTime>0&&!a.paused&&!a.ended&&a.readyState>2},k=function(){g()?S():L()},L=function(){f.length&&(y=function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(Object(i),!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},f[0]),c.src=y.cover,a.src=y.track,c.classList.add("rotate"),u.classList.add("playing"),o.classList.contains("move-arm")?a.play():(o.classList.add("move-arm"),setTimeout((function(){a.play()}),1400)),o.classList.add("move-arm"))},h=function(){m.value=g()?a.currentTime/a.duration:0},S=function(){O(),a.pause()},O=function(){c.classList.remove("rotate"),u.classList.remove("playing"),o.classList.remove("move-arm")},j=function(e){var t=e.target.value;a.playbackRate=(1+t/100).toFixed(1)},E=function(){d.value=0,a.playbackRate=1},A=function(e){var t=e.offsetX/e.srcElement.clientWidth;a.currentTime=t*a.duration,m.value=t/100},P=function(){var e;m.value=0,e=y,f=f.filter((function(t){return t.id!==e.id})),O(),f.length&&L(),v()};m.addEventListener("click",A),l.addEventListener("click",k),d.addEventListener("change",j),d.addEventListener("resetPitchEvent",j),p.addEventListener("click",E),a.addEventListener("ended",P),a.addEventListener("timeupdate",h),E(),i.map((function(e){var t=e.tracks,n=document.createDocumentFragment();t.map((function(t,r){var i=document.createElement("li");i.innerHTML="".concat(t.trackTitle,'<button class="play">&#9654;</button>'),n.appendChild(i),n.querySelectorAll(".play")[r].addEventListener("click",(function(){T(),b("".concat(e.image),"".concat(t.audio),t.trackTitle),L(),v()}))}));var r=document.createElement("li");r.classList.add("records-item"),r.classList.add("".concat(e.id)),r.innerHTML='<div class="cover">\n    <img\n      src='.concat(e.image,"\n      alt=").concat(e.title,'\n      class="cover-img"\n    />\n  </div>\n  <div class="description">\n    <div class="artist">').concat(e.artist,'</div>\n    <div class="blue">').concat(e.title,'</div>\n    <ol class="tracklist">\n    </ol>\n    <button class="playall">\n      Play All\n    </button>\n  </div>'),document.querySelector(".records-list").appendChild(r),document.querySelector(".".concat(e.id," .tracklist")).appendChild(n),r.querySelector(".playall").addEventListener("click",(function(){T(),e.tracks.map((function(t){b(e.image,t.audio,t.trackTitle,t.trackId)})),L(),v()}))}))}]);