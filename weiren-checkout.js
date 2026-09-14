/* WEIREN checkout/address + Cashfree payment layer. */
(function(){
  const ADDRESS_KEY='weiren-shipping-address';
  const getSaved=()=>{try{return JSON.parse(localStorage.getItem(ADDRESS_KEY)||'null')}catch{return null}};
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function loadCashfree(){return new Promise((resolve,reject)=>{if(window.Cashfree)return resolve(window.Cashfree);const s=document.createElement('script');s.src='https://sdk.cashfree.com/js/v3/cashfree.js';s.onload=()=>resolve(window.Cashfree);s.onerror=()=>reject(new Error('Cashfree SDK failed to load'));document.head.appendChild(s);});}
  async function startOnlinePayment(data, amount){
    if(!window.supabaseClient){showToast('Payment service is not ready.');return;}
    try{
      const {data:{session}}=await window.supabaseClient.auth.getSession();
      if(!session){showToast('Please sign in before paying online.');return;}
      const {data:result,error}=await window.supabaseClient.functions.invoke('create-cashfree-order',{body:{amount,customer:{id:session.user.id,name:data.name,email:session.user.email||'',phone:data.phone},returnOrigin:window.location.origin}});
      if(error||!result?.payment_session_id)throw new Error(result?.error||error?.message||'Unable to create payment');
      const Cashfree=await loadCashfree();
      const cashfree=Cashfree({mode:'sandbox'});
      closeCheckout();
      await cashfree.checkout({paymentSessionId:result.payment_session_id,redirectTarget:'_self'});
    }catch(err){console.error(err);showToast(err.message||'Payment could not be started.');}
  }
  function ensureModal(){
    let modal=document.querySelector('#checkoutModal');
    if(modal)return modal;
    modal=document.createElement('div');modal.className='modal';modal.id='checkoutModal';modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="modal-card"></div>';document.body.appendChild(modal);
    const style=document.createElement('style');style.textContent='.checkout-note{font-size:10px;color:#666;margin:-2px 0 24px}.checkout-form{display:flex;flex-direction:column;gap:16px}.checkout-form textarea{display:block;width:100%;min-height:76px;resize:vertical;border:0;border-bottom:1px solid #ccc;padding:12px 0;outline:0;font:inherit;font-size:12px}.checkout-form textarea:focus{border-color:#111}.checkout-two{display:grid;grid-template-columns:1fr 1fr;gap:16px}.checkout-payment{border-top:1px solid #eee;margin-top:4px;padding-top:18px}.checkout-payment .eyebrow{margin-bottom:12px}.payment-option{display:flex!important;align-items:flex-start;gap:10px;padding:11px 0;border-bottom:1px solid #eee;letter-spacing:0!important}.payment-option input{width:auto!important;margin:3px 0 0!important;border:0!important;padding:0!important}.payment-option span{display:flex;flex-direction:column;gap:3px}.payment-option strong{font-size:10px;font-weight:500}.payment-option small{font-size:9px;color:#777}.checkout-form>.btn{margin-top:4px}@media(max-width:800px){.checkout-two{grid-template-columns:1fr}.modal-card{padding:34px 24px}.modal-card h2{font-size:31px}}';document.head.appendChild(style);return modal;
  }
  function closeCheckout(){const modal=document.querySelector('#checkoutModal');if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}}
  function openCheckout(){
    const bag=JSON.parse(localStorage.getItem('weiren-bag')||'[]');
    if(!bag.length){if(typeof showToast==='function')showToast('Your bag is empty.');return}
    const amount=bag.reduce((sum,item)=>sum+(Number(item.price)||0)*(Number(item.quantity)||1),0);
    const modal=ensureModal(),saved=getSaved()||{},card=modal.querySelector('.modal-card');
    card.innerHTML=`<button class="modal-close" data-checkout-close aria-label="Close">×</button><p class="eyebrow">DELIVERY DETAILS</p><h2>WHERE SHOULD WE SEND IT?</h2><p class="checkout-note">Enter the address where you want your WEIREN order delivered.</p><form id="shippingForm" class="checkout-form"><label>Full name<input name="name" value="${esc(saved.name)}" autocomplete="name" placeholder="Your full name" required></label><label>Mobile number<input name="phone" value="${esc(saved.phone)}" inputmode="numeric" autocomplete="tel" pattern="[0-9]{10}" maxlength="10" placeholder="10-digit mobile number" required></label><label>Address / House, street, area<textarea name="address" autocomplete="street-address" placeholder="House no., street, area" required>${esc(saved.address)}</textarea></label><div class="checkout-two"><label>City<input name="city" value="${esc(saved.city)}" autocomplete="address-level2" placeholder="City" required></label><label>State<input name="state" value="${esc(saved.state)}" autocomplete="address-level1" placeholder="State" required></label></div><label>PIN code<input name="pincode" value="${esc(saved.pincode)}" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="postal-code" placeholder="6-digit PIN code" required></label><div class="checkout-payment"><p class="eyebrow">PAYMENT</p><label class="payment-option"><input type="radio" name="payment" value="cod" checked> <span><strong>Cash on Delivery</strong><small>Pay when your order arrives.</small></span></label><label class="payment-option"><input type="radio" name="payment" value="online"> <span><strong>UPI / Card</strong><small>Secure payment through Cashfree.</small></span></label></div><button class="btn btn-dark full" type="submit">PAY ₹${amount.toLocaleString('en-IN')}</button></form>`;
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');
    modal.querySelector('[data-checkout-close]').onclick=closeCheckout;modal.onclick=e=>{if(e.target===modal)closeCheckout()};
    modal.querySelector('#shippingForm').onsubmit=async e=>{
      e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());
      if(!/^[0-9]{10}$/.test(data.phone)){showToast('Enter a valid 10-digit mobile number.');return}
      if(!/^[0-9]{6}$/.test(data.pincode)){showToast('Enter a valid 6-digit PIN code.');return}
      localStorage.setItem(ADDRESS_KEY,JSON.stringify({name:data.name.trim(),phone:data.phone,address:data.address.trim(),city:data.city.trim(),state:data.state.trim(),pincode:data.pincode}));
      if(data.payment==='online'){await startOnlinePayment(data,amount);return}
      showToast('Address saved. COD order is ready for the next order step.');setTimeout(closeCheckout,900);
    };
  }
  document.addEventListener('click',function(e){const action=e.target.closest('[data-action]');if(action&&action.dataset.action==='checkout'){e.preventDefault();e.stopImmediatePropagation();openCheckout();}if(e.target.closest('[data-checkout-close]'))closeCheckout();},true);
  window.weirenCheckout={open:openCheckout,close:closeCheckout,getAddress:getSaved};
})();
