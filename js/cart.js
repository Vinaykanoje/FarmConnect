const products=[
 {id:1,name:"Wheat",farmer:"Rajesh Patil",loc:"Nagpur",price:25,unit:"kg",cat:"Grains",emoji:"🌾",qty:500},
 {id:2,name:"Rice",farmer:"Suresh Kumar",loc:"Wardha",price:48,unit:"kg",cat:"Grains",emoji:"🍚",qty:800},
 {id:3,name:"Tomato",farmer:"Amit Singh",loc:"Nagpur",price:22,unit:"kg",cat:"Vegetables",emoji:"🍅",qty:300},
 {id:4,name:"Potato",farmer:"Rajesh Patil",loc:"Bhandara",price:20,unit:"kg",cat:"Vegetables",emoji:"🥔",qty:600},
 {id:5,name:"Onion",farmer:"Suresh Kumar",loc:"Nashik",price:28,unit:"kg",cat:"Vegetables",emoji:"🧅",qty:450},
 {id:6,name:"Corn",farmer:"Amit Singh",loc:"Amravati",price:24,unit:"kg",cat:"Cereals",emoji:"🌽",qty:700},
 {id:7,name:"Soybean",farmer:"Rajesh Patil",loc:"Akola",price:52,unit:"kg",cat:"Pulses",emoji:"🌱",qty:900},
 {id:8,name:"Cotton",farmer:"Suresh Kumar",loc:"Yavatmal",price:72,unit:"kg",cat:"Other",emoji:"☁️",qty:1000}
];
/* Admin changes: deleted/unapproved products leave the marketplace, admin-added products appear */
(function(){try{var a=JSON.parse(localStorage.getItem("fcAdmin_products")||"null");if(!Array.isArray(a))return;
var E={Grains:"🌾",Vegetables:"🥬",Cereals:"🌽",Pulses:"🌱",Other:"🌱"};
for(var i=products.length-1;i>=0;i--){var p=products[i];if(p.id>3)continue;var r=a.filter(function(x){return x.id==p.id})[0];
 if(!r||(r.touched&&r.status!=="Approved")){products.splice(i,1);continue}
 if(r.touched){p.name=r.name;p.farmer=r.farmer;p.price=+r.price||p.price;p.qty=+r.qty||p.qty;p.cat=r.cat||p.cat;p.loc=r.loc||p.loc}}
a.forEach(function(x){if(x.id>=100&&x.status==="Approved")products.push({id:x.id,name:x.name,farmer:x.farmer,loc:x.loc||"Nagpur",price:+x.price||0,unit:"kg",cat:x.cat||"Other",emoji:E[x.cat]||"🌱",qty:+x.qty||0})})
}catch(e){}})();
function getCart(){return JSON.parse(localStorage.getItem("fcCart")||"[]")}
function saveCart(c){localStorage.setItem("fcCart",JSON.stringify(c))}
function addToCart(id){
 const p=products.find(x=>x.id==id);if(!p)return;
 const c=getCart();const item=c.find(x=>x.id==id);
 if(item)item.qty++;else c.push({...p,qty:1});
 saveCart(c);updateCartCount();showToast(`${p.name} added to cart.`);
}
function updateCartCount(){
 document.querySelectorAll("[data-cart-count]").forEach(e=>e.textContent=getCart().reduce((s,x)=>s+x.qty,0));
}
function cartTotal(){return getCart().reduce((s,x)=>s+x.price*x.qty,0)}
document.addEventListener("DOMContentLoaded",updateCartCount);
