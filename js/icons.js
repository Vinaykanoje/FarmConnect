/* FarmConnect icons: replaces platform-dependent emoji with consistent inline SVG icons (works for static and dynamic content). */
(function(){
var P={};
function c(x,y,r){return"M"+(x-r)+" "+y+"a"+r+" "+r+" 0 1 0 "+2*r+" 0a"+r+" "+r+" 0 1 0 "+(-2*r)+" 0"}
function rr(x,y,w,h,r){return"M"+(x+r)+" "+y+"h"+(w-2*r)+"a"+r+" "+r+" 0 0 1 "+r+" "+r+"v"+(h-2*r)+"a"+r+" "+r+" 0 0 1 "+(-r)+" "+r+"h"+(-(w-2*r))+"a"+r+" "+r+" 0 0 1 "+(-r)+" "+(-r)+"v"+(-(h-2*r))+"a"+r+" "+r+" 0 0 1 "+r+" "+(-r)+"z"}
function I(n){P[n]=[].slice.call(arguments,1).map(function(d){return'<path d="'+d+'"/>'}).join("")}
var dot=function(x,y){return'<circle cx="'+x+'" cy="'+y+'" r="1.1" fill="currentColor" stroke="none"/>'};
I("wheat","M12 22V6","M12 6c0-2-1.5-3.5-3-4 0 2 1 3.5 3 4","M12 6c0-2 1.5-3.5 3-4 0 2-1 3.5-3 4","M12 13c0-2-1.5-3.5-3-4 0 2 1 3.5 3 4","M12 13c0-2 1.5-3.5 3-4 0 2-1 3.5-3 4","M12 20c0-2-1.5-3.5-3-4 0 2 1 3.5 3 4","M12 20c0-2 1.5-3.5 3-4 0 2-1 3.5-3 4");
I("farmer",c(12,10,3.5),"M5 21c0-4 3-7 7-7s7 3 7 7","M6 7h12","M8.5 7c0-3 1.5-5 3.5-5s3.5 2 3.5 5");
I("admin",c(12,9,3),"M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6","M12 14v3l-1.5 3h3L12 17");
I("user",c(12,8,4),"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8");
I("package","M21 8l-9-5-9 5v8l9 5 9-5z","M3 8l9 5 9-5","M12 13v8");
I("mic",rr(9,2,6,12,3),"M5 11a7 7 0 0 0 14 0","M12 18v4");
I("store","M3 9l1.5-5h15L21 9","M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0","M5 12v9h14v-9","M10 21v-5h4v5");
I("search",c(11,11,7),"M21 21l-4.3-4.3");
I("volume","M11 5L6 9H2v6h4l5 4z","M15.5 8.5a5 5 0 0 1 0 7","M19 5a10 10 0 0 1 0 14");
I("home","M3 11l9-8 9 8","M5 10v10h14V10","M10 20v-6h4v6");
I("card",rr(2,5,20,14,2),"M2 10h20","M6 15h4");
I("cart",c(9,20,1.5),c(18,20,1.5),"M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6");
I("sprout","M12 21v-9","M12 12C12 8 9 6 4 6c0 4 3 6 8 6","M12 14c0-4 3-6 8-6 0 4-3 6-8 6");
I("rupee",c(12,12,9),"M8 8h8","M8 12h8","M10 8c3.5 0 3.5 5 0 5H8l6 4");
I("bank","M3 10l9-6 9 6","M5 10v8","M9 10v8","M15 10v8","M19 10v8","M3 21h18");
I("chart","M3 3v18h18","M8 17v-5","M13 17V8","M18 17v-9");
I("trend","M3 3v18h18","M7 15l4-4 3 3 5-6");
I("checkc",c(12,12,9),"M8 12l3 3 5-6");
I("check","M5 12l5 5 9-10");
I("x","M6 6l12 12","M18 6L6 18");
I("corn","M12 3c3 0 5 4 5 9s-2 9-5 9-5-4-5-9 2-9 5-9z","M12 3v18","M7.5 9h9","M7 14h10");
I("leaf","M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-3 16-9 16z","M4 21c3-6 7-10 12-13");
I("onion","M12 3c1 3 1 4 0 5","M12 8c5 0 8 4 8 8 0 3-3 5-8 5s-8-2-8-5c0-4 3-8 8-8z","M12 8c-2 3-2 9 0 13","M12 8c2 3 2 9 0 13");
I("rice","M3 12h18c0 5-4 8-9 8s-9-3-9-8z","M7 12c0-3 2-5 5-5s5 2 5 5","M8 22h8");
I("tomato",c(12,13,8),"M12 5V2","M8.5 5.5L12 8l3.5-2.5");
I("potato","M6 6c3-3 9-2 12 2 3 4 2 10-3 12-5 2-11-1-11-7 0-3 0-5 2-7z");
I("apple","M12 7c-2-2-7-1-7 5 0 5 3 9 5 9 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-4 5-9 0-6-5-7-7-5z","M12 7c0-2 1-4 3-5");
I("bean","M7 5c4-2 10 0 11 5s-3 10-8 9S3 9 7 5z","M9 9c2 0 4 2 4 4");
I("cloud","M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18z");
P.palette='<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s-.5-2 1-2H17a4 4 0 0 0 4-4c0-5-4-10-9-10z"/>'+dot(7.5,11)+dot(12,7)+dot(16.5,10);
I("phone","M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z");
I("lock",rr(4,11,16,10,2),"M8 11V7a4 4 0 0 1 8 0v4");
I("handshake","M11 17l2 2a1 1 0 0 0 3-3","M14 14l2.5 2.5a1 1 0 0 0 3-3L16 9.5","M2 12l4-4 5 .5L14 6l4 4","M4 14l3 3");
I("save","M5 3h11l3 3v15H5z","M8 3v6h7V3","M8 21v-7h8v7");
I("truck","M2 6h11v10H2z","M13 9h4l4 4v3h-8",c(6,18,2),c(17,18,2));
I("pin","M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z",c(12,10,2.5));
I("buoy",c(12,12,9),c(12,12,4),"M5.6 5.6l3.5 3.5","M14.9 14.9l3.5 3.5","M18.4 5.6l-3.5 3.5","M9.1 14.9l-3.5 3.5");
I("help",c(12,12,9),"M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7","M12 17h.01");
I("access",c(12,4,1.5),"M5 8h14","M12 8v6","M9 21l3-7 3 7");
I("clip",rr(6,4,12,17,2),"M9 4h6v3H9z","M9 12h6","M9 16h6");
I("edit","M4 20h4L19 9l-4-4L4 16z","M14 6l4 4");
I("mobile",rr(7,2,10,20,2),"M11 18h2");
I("globe",c(12,12,9),"M3 12h18","M12 3c3 3 3 15 0 18","M12 3c-3 3-3 15 0 18");
I("wave","M7 11V6a1.5 1.5 0 0 1 3 0v5","M10 10V4.5a1.5 1.5 0 0 1 3 0V10","M13 10V6a1.5 1.5 0 0 1 3 0v6","M16 11V9a1.5 1.5 0 0 1 3 0v5c0 4-3 7-7 7-3 0-5-1.5-6.5-4L4 13a1.5 1.5 0 0 1 2.5-1.5L7 12");
I("camera","M4 7h3l2-3h6l2 3h3v13H4z",c(12,13,4));
I("scale","M12 3v18","M5 21h14","M5 7h14","M5 7l-3 7a3 3 0 0 0 6 0z","M19 7l-3 7a3 3 0 0 0 6 0z");
I("moon","M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z");
P.contrast='<path d="M12 3a9 9 0 1 0 0 18z" fill="currentColor"/><path d="'+c(12,12,9)+'"/>';
I("plus","M12 5v14","M5 12h14");
I("arrow","M5 12h14","M13 6l6 6-6 6");
I("trash","M3 6h18","M8 6V4h8v2","M6 6l1 15h10l1-15","M10 11v6","M14 11v6");
I("ear","M6 8.5a6 6 0 0 1 12 0c0 4-3 4.5-3 8a3 3 0 0 1-6 0","M9 9a3 3 0 0 1 6 0");
var MAP={"👨‍🌾":"farmer","👨‍💼":"admin","🌾":"wheat","📦":"package","🎤":"mic","🏪":"store","🔎":"search","🔍":"search","🔊":"volume","🏠":"home","💳":"card","🛒":"cart","🌱":"sprout","💰":"rupee","💵":"rupee","🏦":"bank","📊":"chart","📈":"trend","✅":"checkc","✓":"check","✗":"x","✕":"x","🌽":"corn","🥬":"leaf","🌿":"leaf","🧅":"onion","🍚":"rice","🍅":"tomato","🥔":"potato","🍎":"apple","🫘":"bean","☁":"cloud","🎨":"palette","📞":"phone","🔐":"lock","🤝":"handshake","💾":"save","🚚":"truck","📍":"pin","🆘":"buoy","❓":"help","♿":"access","📋":"clip","📝":"edit","📱":"mobile","🌐":"globe","👋":"wave","📷":"camera","⚖":"scale","🌙":"moon","◐":"contrast","➕":"plus","➡":"arrow","👂":"ear","🗑":"trash","👤":"user"};
var keys=Object.keys(MAP).sort(function(a,b){return b.length-a.length});
var RE=new RegExp("("+keys.join("|")+")\\uFE0F?","g"),RT=new RegExp("("+keys.join("|")+")");
function svg(n){return'<span class="fc-ico" data-ic="'+n+'" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">'+P[n]+'</svg></span>'}
function conv(n){
  var p=n.parentNode;if(!p||p.nodeType!==1)return;
  var t=n.nodeValue;if(!RT.test(t))return;
  var tag=p.tagName;
  if(/^(SCRIPT|STYLE|TEXTAREA)$/.test(tag))return;
  if(tag==="OPTION"||tag==="TITLE"){n.nodeValue=t.replace(RE,"").replace(/^\s+/,"");return}
  var f=document.createDocumentFragment(),last=0,m,s;RE.lastIndex=0;
  while((m=RE.exec(t))){
    if(m.index>last)f.appendChild(document.createTextNode(t.slice(last,m.index)));
    s=document.createElement("span");s.innerHTML=svg(MAP[m[1]]);f.appendChild(s.firstChild);last=RE.lastIndex;
  }
  if(last<t.length)f.appendChild(document.createTextNode(t.slice(last)));
  p.replaceChild(f,n);
}
function scan(root){
  if(root.nodeType===3){conv(root);return}
  if(root.nodeType!==1)return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,a=[];
  while((n=w.nextNode()))a.push(n);
  a.forEach(conv);
}
document.title=document.title.replace(RE,"").trim();
document.addEventListener("DOMContentLoaded",function(){
  scan(document.body);
  new MutationObserver(function(ms){
    ms.forEach(function(m){
      if(m.type==="characterData")conv(m.target);
      else m.addedNodes.forEach(scan);
    });
  }).observe(document.body,{childList:true,subtree:true,characterData:true});
});
window.fcIcon=svg;
})();
