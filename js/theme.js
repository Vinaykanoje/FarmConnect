/* FarmConnect theme switcher: Green (default), Dark, Harvest, High Contrast. Saved in localStorage. */
(function(){
  var THEMES=[["green","Green"],["dark","Dark"],["harvest","Harvest"],["contrast","High Contrast"]];
  function saved(){try{return localStorage.getItem("fcTheme")||"green"}catch(e){return "green"}}
  function apply(name){
    if(!THEMES.some(function(t){return t[0]===name}))name="green";
    document.documentElement.setAttribute("data-theme",name);
    try{localStorage.setItem("fcTheme",name)}catch(e){}
    document.querySelectorAll(".theme-select").forEach(function(s){s.value=name});
    var m=document.querySelector('meta[name="theme-color"]');
    if(m)m.content=name==="dark"||name==="contrast"?"#0e1812":"#176b3a";
  }
  window.setTheme=apply;
  window.currentTheme=saved;
  apply(saved()); // runs in <head> so there is no flash of the wrong theme
  function build(){
    var s=document.createElement("select");
    s.className="theme-select";s.setAttribute("aria-label","Change theme");s.title="Change theme";
    s.innerHTML=THEMES.map(function(t){return '<option value="'+t[0]+'">'+t[1]+'</option>'}).join("");
    s.value=saved();
    s.addEventListener("change",function(){apply(s.value)});
    return s;
  }
  function relabel(){
    var tx=window.fcTr?window.fcTr("Change theme"):"Change theme";
    document.querySelectorAll(".theme-select").forEach(function(s){
      THEMES.forEach(function(t,i){if(s.options[i])s.options[i].text=window.fcTr?window.fcTr(t[1]):t[1]});
      s.title=tx;s.setAttribute("aria-label",tx);
    });
  }
  document.addEventListener("fcTranslated",relabel);
  document.addEventListener("DOMContentLoaded",function(){
    var lang=document.querySelector(".lang-select");
    if(!lang){return}
    var wrap=document.createElement("div");wrap.className="nav-tools";
    lang.parentNode.insertBefore(wrap,lang);
    wrap.appendChild(build());wrap.appendChild(lang);
    apply(saved());
  });
})();
