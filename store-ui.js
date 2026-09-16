/* WEIREN storefront UI: search, account/login and local shopping bag. */
(function(){
  const products=[
    {name:'T SHIRT',type:'t-shirt',description:'Everyday Essential',url:'category.html?type=t-shirt'},
    {name:'JEANS',type:'jeans',description:'Made To Move',url:'category.html?type=jeans'},
    {name:'JACKET',type:'jacket',description:'Built For More',url:'category.html?type=jacket'}
  ];
  const cartKey='weiren-cart';
  const userKey='weiren-user';
  const getCart=()=>JSON.parse(localStorage.getItem(cartKey)||'[]');
  const saveCart=cart=>localStorage.setItem(cartKey,JSON.stringify(cart));
  const overlay=document.createElement('div');
  overlay.className='store-overlay';
  overlay.innerHTML=`
    <div class="store-panel" role="dialog" aria-modal="true">
      <button class="store-close" aria-label="Close">×</button>
      <div class="store-view search-view">
        <p class="store-kicker">WEIREN SEARCH</p><h2>SEARCH</h2>
        <input class="store-search-input" type="search" placeholder="Search T shirt, jeans, jacket..." autocomplete="off">
        <div class="store-results"></div>
      </div>
      <div class="store-view account-view">
        <p class="store-kicker">WEIREN ACCOUNT</p><h2>WELCOME</h2>
        <form class="login-form">
          <input name="email" type="email" placeholder="Email address" required autocomplete="email">
          <input name="password" type="password" placeholder="Password" required autocomplete="current-password">
          <button type="submit">LOG IN <span>→</span></button>
        </form>
        <p class="login-status"></p>
        <button class="logout-button" type="button">LOG OUT</button>
      </div>
      <div class="store-view cart-view">
        <p class="store-kicker">WEIREN BAG</p><h2>SHOPPING BAG</h2>
        <div class="cart-items"></div>
        <div class="cart-total"></div>
        <button class="checkout-button" type="button">CHECKOUT</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const panel=overlay.querySelector('.store-panel');
  const views=overlay.querySelectorAll('.store-view');
  function open(view){overlay.classList.add('open');views.forEach(v=>v.style.display=v.classList.contains(view+'-view')?'block':'none');document.body.style.overflow='hidden';if(view==='search')renderSearch('');if(view==='account')renderAccount();if(view==='cart')renderCart();}
  function close(){overlay.classList.remove('open');document.body.style.overflow='';}
  overlay.querySelector('.store-close').onclick=close;
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  document.querySelectorAll('[aria-label="Search"]').forEach(b=>b.addEventListener('click',()=>open('search')));
  document.querySelectorAll('[aria-label="Account"]').forEach(b=>b.addEventListener('click',()=>open('account')));
  document.querySelectorAll('[aria-label="Shopping bag"]').forEach(b=>b.addEventListener('click',()=>open('cart')));
  function updateCount(){const n=getCart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll('.bag-count').forEach(el=>el.textContent=n);}
  function renderSearch(q){
    const results=overlay.querySelector('.store-results');
    const found=products.filter(p=>(p.name+' '+p.description).toLowerCase().includes(q.toLowerCase()));
    results.innerHTML=found.map(p=>`<a href="${p.url}" class="search-result"><span>${p.name}</span><small>${p.description}</small><b>→</b></a>`).join('')||'<p class="no-results">NO PRODUCTS FOUND</p>';
  }
  overlay.querySelector('.store-search-input').addEventListener('input',e=>renderSearch(e.target.value));
  function renderAccount(){
    const user=localStorage.getItem(userKey), form=overlay.querySelector('.login-form'), status=overlay.querySelector('.login-status'), logout=overlay.querySelector('.logout-button');
    if(user){form.style.display='none';logout.style.display='block';status.textContent='SIGNED IN AS '+user;}
    else{form.style.display='grid';logout.style.display='none';status.textContent='';}
  }
  overlay.querySelector('.login-form').addEventListener('submit',e=>{e.preventDefault();const email=new FormData(e.target).get('email');localStorage.setItem(userKey,email);renderAccount();});
  overlay.querySelector('.logout-button').addEventListener('click',()=>{localStorage.removeItem(userKey);renderAccount();});
  function renderCart(){
    const box=overlay.querySelector('.cart-items'), total=overlay.querySelector('.cart-total'), cart=getCart();
    box.innerHTML=cart.length?cart.map((i,n)=>`<div class="cart-row"><div><strong>${i.name}</strong><small>₹${i.price} × ${i.qty}</small></div><button data-remove="${n}" aria-label="Remove ${i.name}">×</button></div>`).join(''):'<p class="empty-cart">YOUR BAG IS EMPTY</p>';
    const sum=cart.reduce((s,i)=>s+i.price*i.qty,0);total.textContent=sum?'TOTAL  ₹'+sum:'TOTAL  ₹0';
    box.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);saveCart(cart);updateCount();renderCart();});
  }
  overlay.querySelector('.checkout-button').onclick=()=>{const cart=getCart();if(!cart.length){alert('Your shopping bag is empty.');return;}alert('Checkout is not connected yet. Your bag has been saved locally.');};
  window.WeirenStore={addToCart:function(item){const cart=getCart();const existing=cart.find(i=>i.name===item.name);if(existing)existing.qty++;else cart.push({...item,qty:1});saveCart(cart);updateCount();open('cart');}};
  updateCount();
})();
