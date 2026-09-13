const products = [
  {id:'black', name:'Acid Washed Relaxed T-Shirt', color:'Black', price:499, image:'1000004143.png', stock:{M:10,L:10,XL:10}},
  {id:'grey', name:'Acid Washed Relaxed T-Shirt', color:'Grey', price:499, image:'1000004156.png', stock:{M:10,L:10,XL:10}},
  {id:'maroon', name:'Acid Washed Relaxed T-Shirt', color:'Maroon', price:499, image:'1000004157.png', stock:{M:10,L:10,XL:10}},
  {id:'navy', name:'Acid Washed Relaxed T-Shirt', color:'Navy', price:499, image:'1000004158.png', stock:{M:10,L:10,XL:10}},
  {id:'brown', name:'Acid Washed Relaxed T-Shirt', color:'Brown', price:499, image:'1000004159.png', stock:{M:10,L:10,XL:10}}
];
let bag = JSON.parse(localStorage.getItem('weiren-bag') || '[]');
const $ = s => document.querySelector(s);
const productGrid = $('#productGrid');
const toast = $('#toast');

function save(){ localStorage.setItem('weiren-bag', JSON.stringify(bag)); renderBag(); }
function showToast(msg){ toast.textContent=msg; toast.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>toast.classList.remove('show'),2200); }
function renderProducts(){
  productGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.color} ${p.name}" onerror="this.style.opacity=.15"></div>
      <div class="product-info"><div><div class="product-name">${p.name}</div><div class="product-color">${p.color}</div></div><div class="product-price">₹${p.price}</div></div>
      <div class="product-actions"><button class="mini-btn" data-add="${p.id}">ADD TO BAG</button><button class="mini-btn" data-buy="${p.id}">BUY NOW</button></div>
    </article>`).join('');
  productGrid.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>openProduct(b.dataset.add,false));
  productGrid.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>openProduct(b.dataset.buy,true));
}
function openProduct(id,buy){
  const p=products.find(x=>x.id===id); let size='M';
  const ok=()=>{ if(!p.stock[size]){showToast('That size is currently sold out.');return;} const existing=bag.find(x=>x.id===id&&x.size===size); if(existing) existing.qty++; else bag.push({id,size,qty:1}); save(); if(buy) openBag(); else showToast(`${p.color} / ${size} added to bag.`); };
  const sizes=Object.keys(p.stock).map(s=>`<button class="mini-btn size-pick ${s==='M'?'selected':''}" data-size="${s}">${s}${p.stock[s]===0?' · SOLD OUT':''}</button>`).join('');
  const modal=document.createElement('div'); modal.className='modal open'; modal.innerHTML=`<div class="modal-card"><button class="modal-close">×</button><p class="eyebrow">${p.color.toUpperCase()} / WEIREN 001</p><h2>${p.name}</h2><p style="font-size:14px;margin-top:-18px">₹${p.price}</p><div style="margin:28px 0"><p class="eyebrow" style="margin-bottom:10px">SELECT SIZE</p><div class="size-list" style="display:flex;gap:7px">${sizes}</div></div><button class="btn btn-dark full" id="confirmAdd">${buy?'BUY NOW':'ADD TO BAG'}</button></div>`;
  document.body.appendChild(modal); modal.querySelector('.modal-close').onclick=()=>modal.remove(); modal.onclick=e=>{if(e.target===modal)modal.remove()}; modal.querySelectorAll('.size-pick').forEach(b=>b.onclick=()=>{size=b.dataset.size;modal.querySelectorAll('.size-pick').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}); modal.querySelector('#confirmAdd').onclick=()=>{ok();modal.remove()};
}
function renderBag(){
  const count=bag.reduce((n,x)=>n+x.qty,0); $('#bagCount').textContent=count;
  const items=$('#bagItems');
  if(!bag.length){items.innerHTML='<div class="empty-bag">YOUR BAG IS EMPTY.</div>'; $('#bagTotal').textContent='₹0';return;}
  let total=0; items.innerHTML=bag.map((x,i)=>{const p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="bag-row"><img src="${p.image}" alt="${p.color}"><div><h3>${p.name}</h3><p>${p.color} / ${x.size}</p><p>₹${p.price} × ${x.qty}</p><button data-remove="${i}">REMOVE</button></div><strong>₹${p.price*x.qty}</strong></div>`}).join('');
  $('#bagTotal').textContent=`₹${total}`; items.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{bag.splice(+b.dataset.remove,1);save()});
}
function openBag(){ $('#bagDrawer').classList.add('open');$('#drawerBackdrop').classList.add('open');$('#bagDrawer').setAttribute('aria-hidden','false'); }
function closeBag(){ $('#bagDrawer').classList.remove('open');$('#drawerBackdrop').classList.remove('open');$('#bagDrawer').setAttribute('aria-hidden','true'); }
function openAccount(){ $('#accountModal').classList.add('open');$('#accountModal').setAttribute('aria-hidden','false'); }
function closeAccount(){ $('#accountModal').classList.remove('open');$('#accountModal').setAttribute('aria-hidden','true'); }

document.addEventListener('click',e=>{
  const a=e.target.closest('[data-action]'); if(!a)return; const action=a.dataset.action;
  if(action==='bag')openBag(); if(action==='close-drawer')closeBag(); if(action==='account')openAccount(); if(action==='close-account')closeAccount();
  if(action==='checkout'){ if(!bag.length)showToast('Your bag is empty.'); else showToast('Checkout will be connected to payments next.'); }
  if(action==='google'||action==='forgot'||action==='register')showToast('This account feature will be connected in the next setup step.');
  if(action==='menu')showToast('Use SHOP, ABOUT and CONTACT below on mobile.');
});
$('#drawerBackdrop').onclick=closeBag;
$('#accountModal').onclick=e=>{if(e.target.id==='accountModal')closeAccount()};
$('#loginForm').onsubmit=e=>{e.preventDefault();showToast('Sign-in will be connected to the authentication backend next.');};
renderProducts();renderBag();
