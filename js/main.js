function showToast(msg){
 const el=document.querySelector(".toast");
 if(!el)return;
 el.textContent=msg;el.style.display="block";clearTimeout(window.fcToast);
 window.fcToast=setTimeout(()=>el.style.display="none",2600);
}
function speakCurrentPage(){
 const h=document.querySelector("h1,h2");
 if(h)speak(h.textContent);
}
function setupVoiceBar(){
 if(!document.querySelector(".voice-bar")) return;
 document.querySelector(".voice-btn")?.addEventListener("click",startVoice);
 document.querySelector(".voice-status")?.addEventListener("click",()=>{});
}
function setupDemoForms(){
 document.querySelectorAll("form[data-demo]").forEach(form=>{
   form.addEventListener("submit",e=>{
     e.preventDefault();
     showToast("Demo saved successfully.");
     if(form.dataset.redirect) setTimeout(()=>location.href=form.dataset.redirect,500);
   });
 });
}
document.addEventListener("DOMContentLoaded",()=>{
 setupVoiceBar();setupDemoForms();
 document.querySelectorAll("[data-speak]").forEach(b=>b.addEventListener("click",()=>speak(b.dataset.speak)));
});
