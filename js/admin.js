/* FarmConnect admin: add / edit / delete for farmers, retailers, products, orders and payments.
   Data is kept in the browser (localStorage) because this is a frontend demo. */
(function(){
"use strict";
var page=(location.pathname.split("/").pop()||"").replace(".html","");
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]})}
function T(s){return window.fcTr?window.fcTr(s):s}
function inr(n){return "₹"+(Number(n)||0).toLocaleString("en-IN")}
function toast(m){if(typeof showToast==="function")showToast(m)}
function load(k,seed){try{var v=JSON.parse(localStorage.getItem("fcAdmin_"+k));if(Array.isArray(v))return v}catch(e){}return JSON.parse(JSON.stringify(seed))}
function save(k,v){try{localStorage.setItem("fcAdmin_"+k,JSON.stringify(v))}catch(e){}}

var SEED={
 farmers:[{id:1,name:"Rajesh Patil",loc:"Nagpur",status:"Active"},{id:2,name:"Suresh Kumar",loc:"Wardha",status:"Active"},{id:3,name:"Amit Singh",loc:"Amravati",status:"Blocked"}],
 retailers:[{id:1,name:"Shree Kirana Store",loc:"Nagpur",status:"Active"},{id:2,name:"Fresh Mart",loc:"Pune",status:"Active"},{id:3,name:"Ganesh Wholesale",loc:"Nagpur",status:"Active"}],
 products:[{id:1,name:"Wheat",farmer:"Rajesh Patil",status:"Approved",cat:"Grains",price:25,qty:500,loc:"Nagpur"},{id:2,name:"Rice",farmer:"Suresh Kumar",status:"Approved",cat:"Grains",price:48,qty:800,loc:"Wardha"},{id:3,name:"Tomato",farmer:"Amit Singh",status:"Pending",cat:"Vegetables",price:22,qty:300,loc:"Nagpur"}],
 orders:[{id:1,no:"#FC1001",retailer:"Shree Kirana Store",amount:2500,status:"Preparing"},{id:2,no:"#FC0998",retailer:"Fresh Mart",amount:1000,status:"Delivered"},{id:3,no:"#FC0991",retailer:"Ganesh Wholesale",amount:4200,status:"Out for Delivery"}],
 payments:[{id:1,no:"FC1001",method:"UPI",amount:2500,status:"Success"},{id:2,no:"FC0998",method:"Card",amount:1000,status:"Success"},{id:3,no:"FC0991",method:"COD",amount:4200,status:"Pending"}]
};
var CATS=["Grains","Cereals","Vegetables","Pulses","Other"];
var CFG={
 farmers:{add:"Add Farmer",cols:[["name","Name"],["loc","Location"],["status","Status"]],statuses:["Active","Pending","Blocked"],
  fields:[{k:"name",l:"Name",req:1},{k:"loc",l:"Location",req:1},{k:"status",l:"Status",o:["Active","Pending","Blocked"]}]},
 retailers:{add:"Add Retailer",cols:[["name","Shop"],["loc","Location"],["status","Status"]],statuses:["Active","Pending","Blocked"],
  fields:[{k:"name",l:"Shop Name",req:1},{k:"loc",l:"Location",req:1},{k:"status",l:"Status",o:["Active","Pending","Blocked"]}]},
 products:{add:"Add Product",cols:[["name","Product"],["farmer","Farmer"],["status","Status"]],statuses:["Approved","Pending"],
  fields:[{k:"name",l:"Product",req:1},{k:"farmer",l:"Farmer",req:1,list:"farmers"},{k:"cat",l:"Category",o:CATS},{k:"price",l:"Price (₹)",t:"number",req:1},{k:"qty",l:"Quantity",t:"number",req:1},{k:"loc",l:"Location"},{k:"status",l:"Status",o:["Approved","Pending"]}]},
 orders:{add:"Add Order",cols:[["no","Order"],["retailer","Retailer"],["amount","Amount"],["status","Status"]],statuses:["Placed","Confirmed","Preparing","Out for Delivery","Delivered","Cancelled"],
  fields:[{k:"no",l:"Order",ph:"#FC1002"},{k:"retailer",l:"Retailer",req:1,list:"retailers"},{k:"amount",l:"Amount",t:"number",req:1},{k:"status",l:"Status",o:["Placed","Confirmed","Preparing","Out for Delivery","Delivered","Cancelled"]}]},
 payments:{add:"Add Payment",cols:[["no","Order"],["method","Method"],["amount","Amount"],["status","Status"]],statuses:["Success","Pending","Failed"],
  fields:[{k:"no",l:"Order",req:1,ph:"FC1002"},{k:"method",l:"Method",o:["UPI","Card","Net Banking","COD"]},{k:"amount",l:"Amount",t:"number",req:1},{k:"status",l:"Status",o:["Success","Pending","Failed"]}]}
};
var ENT={farmers:"farmers",retailers:"retailers",products:"products",orders:"orders",payments:"payments"}[page];

/* ---------- modal ---------- */
var modal;
function ensureModal(){
  if(modal)return modal;
  modal=document.createElement("div");modal.className="adm-modal";modal.hidden=true;
  modal.innerHTML='<div class="adm-box" role="dialog" aria-modal="true"></div>';
  modal.addEventListener("mousedown",function(e){if(e.target===modal)closeModal()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!modal.hidden)closeModal()});
  document.body.appendChild(modal);return modal;
}
function openModal(html){ensureModal().querySelector(".adm-box").innerHTML=html;modal.hidden=false;var f=modal.querySelector("input,select");if(f)f.focus()}
function closeModal(){if(modal)modal.hidden=true}

/* ---------- list pages ---------- */
function initList(){
  var cfg=CFG[ENT],rows=load(ENT,SEED[ENT]);
  var card=document.querySelector(".admin-main .card");if(!card)return;
  var filters=card.querySelector(".filters"),q=filters.querySelector("input"),sel=filters.querySelector("select");
  var tbody=card.querySelector("tbody");
  sel.innerHTML='<option value="">All statuses</option>'+cfg.statuses.map(function(s){return'<option value="'+esc(s)+'">'+esc(s)+"</option>"}).join("");
  var tools=document.createElement("div");tools.className="adm-tools";
  tools.innerHTML='<button type="button" class="btn btn-primary btn-small" data-a="add">➕ '+esc(cfg.add)+'</button><button type="button" class="btn btn-secondary btn-small" data-a="reset">Reset demo data</button>';
  filters.appendChild(tools);
  var empty=document.createElement("p");empty.className="muted adm-empty";empty.textContent="No records found.";empty.hidden=true;
  card.querySelector(".table-wrap").appendChild(empty);
  var thead=card.querySelector("thead tr"),acts=thead.lastElementChild;acts.className="adm-act-h";

  function cell(r,c){var v=r[c[0]];return c[0]==="amount"?inr(v):esc(v)}
  function render(){
    var term=q.value.trim().toLowerCase(),st=sel.value;
    var list=rows.filter(function(r){
      if(st&&r.status!==st)return false;
      if(!term)return true;
      var raw=cfg.cols.map(function(c){return r[c[0]]}).join(" ").toLowerCase();
      var shown=cfg.cols.map(function(c){return T(String(r[c[0]]))}).join(" ").toLowerCase();
      return raw.indexOf(term)>-1||shown.indexOf(term)>-1;
    });
    tbody.innerHTML=list.map(function(r){
      return"<tr>"+cfg.cols.map(function(c){return"<td>"+cell(r,c)+"</td>"}).join("")+
       '<td class="adm-actions"><button type="button" class="btn btn-small btn-secondary" data-a="edit" data-id="'+r.id+'">📝 Edit</button> <button type="button" class="btn btn-small btn-danger" data-a="del" data-id="'+r.id+'">🗑 Delete</button></td></tr>';
    }).join("");
    empty.hidden=list.length>0;
  }
  function persist(){save(ENT,rows);render()}
  function nextId(){return rows.reduce(function(m,r){return Math.max(m,r.id)},ENT==="products"?99:0)+1}
  function formHtml(r){
    var isNew=!r;r=r||{};
    var h='<h2>'+(isNew?esc(cfg.add):"Edit")+"</h2><form class=\"adm-form\" novalidate>";
    cfg.fields.forEach(function(f){
      var v=r[f.k];if(v==null)v=(f.o?f.o[0]:"");
      h+='<div class="field"><label>'+esc(f.l)+(f.req?" *":"")+"</label>";
      if(f.o)h+='<select name="'+f.k+'">'+f.o.map(function(o){return'<option value="'+esc(o)+'"'+(o===v?" selected":"")+">"+esc(o)+"</option>"}).join("")+"</select>";
      else{
        var dl=f.list?' list="dl_'+f.k+'"':"";
        h+='<input name="'+f.k+'" type="'+(f.t||"text")+'"'+(f.t==="number"?' min="0" step="any"':"")+dl+(f.ph?' placeholder="'+esc(f.ph)+'"':"")+' value="'+esc(v)+'">';
        if(f.list)h+='<datalist id="dl_'+f.k+'">'+load(f.list,SEED[f.list]).map(function(x){return'<option value="'+esc(x.name)+'"></option>'}).join("")+"</datalist>";
      }
      h+="</div>";
    });
    h+='<div class="adm-btns"><button type="submit" class="btn btn-primary">💾 Save</button><button type="button" class="btn btn-secondary" data-a="close">Cancel</button></div></form>';
    return h;
  }
  function openForm(r){
    openModal(formHtml(r));
    var form=modal.querySelector("form");
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var o={},bad=null;
      cfg.fields.forEach(function(f){
        var el=form.elements[f.k],v=el.value.trim();
        if(f.req&&!v){bad=bad||el;el.classList.add("adm-bad");return}
        el.classList.remove("adm-bad");
        o[f.k]=f.t==="number"?(v===""?0:Number(v)):v;
      });
      if(bad){bad.focus();toast("Please fill all required fields.");return}
      if(ENT==="orders"&&!o.no)o.no="#FC"+(1000+nextId());
      if(ENT==="orders"&&o.no.charAt(0)!=="#")o.no="#"+o.no;
      if(r){Object.assign(r,o);r.touched=true;toast("Updated successfully.")}
      else{o.id=nextId();rows.push(o);toast("Added successfully.")}
      closeModal();persist();
    });
  }
  function confirmDel(r){
    var label=r.name||r.no;
    openModal('<h2>Delete</h2><p>Are you sure you want to delete this record?</p><p><b>'+esc(label)+'</b></p><div class="adm-btns"><button type="button" class="btn btn-danger" data-a="yes">🗑 Delete</button><button type="button" class="btn btn-secondary" data-a="close">Cancel</button></div>');
    modal.querySelector('[data-a="yes"]').addEventListener("click",function(){
      rows=rows.filter(function(x){return x.id!==r.id});closeModal();persist();toast("Deleted successfully.");
    });
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-a]");if(!b)return;
    var a=b.dataset.a,r=rows.filter(function(x){return String(x.id)===b.dataset.id})[0];
    if(a==="add")openForm();
    else if(a==="edit"&&r)openForm(r);
    else if(a==="del"&&r)confirmDel(r);
    else if(a==="close")closeModal();
    else if(a==="reset"){
      openModal('<h2>Reset demo data</h2><p>Restore the original demo data? Your changes on this page will be lost.</p><div class="adm-btns"><button type="button" class="btn btn-danger" data-a="yesreset">Reset demo data</button><button type="button" class="btn btn-secondary" data-a="close">Cancel</button></div>');
    }else if(a==="yesreset"){rows=JSON.parse(JSON.stringify(SEED[ENT]));closeModal();persist();toast("Updated successfully.")}
  });
  q.addEventListener("input",render);sel.addEventListener("change",render);
  document.addEventListener("fcTranslated",render);
  render();
}

/* ---------- dashboard: keep demo totals, reflect admin changes ---------- */
function initDash(){
  var vals=document.querySelectorAll(".dashboard-card .value");
  var keys=["farmers","retailers","products","orders"];
  keys.forEach(function(k,i){
    var el=vals[i];if(!el)return;
    var base=Number(el.textContent.replace(/[^\d]/g,""))||0;
    var diff=load(k,SEED[k]).length-SEED[k].length;
    el.textContent=Math.max(0,base+diff).toLocaleString("en-IN");
  });
}
document.addEventListener("DOMContentLoaded",function(){
  if(ENT)initList();else if(page==="dashboard")initDash();
});
})();
