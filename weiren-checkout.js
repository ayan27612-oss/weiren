/* WEIREN checkout/address layer. Collects delivery details before an order is placed. */
(function(){
  const ADDRESS_KEY='weiren-shipping-address';
  const getSaved=()=>{try{return JSON.parse(localStorage.getItem(ADDRESS_KEY)||'null')}catch{return null}};
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function closeCheckout(){
    const modal=document.querySelector('#checkoutModal');
    if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
  }
  function openCheckout(){
    const bag=JSON.parse(localStorage.getItem('weiren-bag')||'[]');
    if(!bag.length){if(typeof showToast==='function')showToast('Your bag is empty.');return}
    const modal=document.querySelector('#checkoutModal');
    if(!modal)return;
    const saved=getSaved()||{};
    const card=modal.querySelector('.modal-card');
    card.innerHTML=`<button class="modal-close" data-checkout-close aria-label="Close">×</button><p class="eyebrow">DELIVERY DETAILS</p><h2>WHERE SHOULD WE SEND IT?</h2><p class="checkout-note">Enter the address where you want your WEIREN order delivered.</p><form id="shippingForm" class="checkout-form"><label>Full name<input name="name" value="${esc(saved.name)}" autocomplete="name" placeholder="Your full name" required></label><label>Mobile number<input name="phone" value="${esc(saved.phone)}" inputmode="numeric" autocomplete="tel" pattern="[0-9]{10}" maxlength="10" placeholder="10-digit mobile number" required></label><label>Address / House, street, area<textarea name="address" autocomplete="street-address" placeholder="House no., street, area" required>${esc(saved.address)}</textarea></label><div class="checkout-two"><label>City<input name="city" value="${esc(saved.city)}" autocomplete="address-level2" placeholder="City" required></label><label>State<input name="state" value="${esc(saved.state)}" autocomplete="address-level1" placeholder="State" required></label></div><label>PIN code<input name="pincode" value="${esc(saved.pincode)}" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="postal-code" placeholder="6-digit PIN code" required></label><div class="checkout-payment"><p class="eyebrow">PAYMENT</p><label class="payment-option"><input type="radio" name="payment" value="cod" checked> <span><strong>Cash on Delivery</strong><small>Pay when your order arrives.</small></span></label><label class="payment-option"><input type="radio" name="payment" value="online"> <span><strong>UPI / Card</strong><small>Online payment will be connected next.</small></span></label></div><button class="btn btn-dark full" type="submit">CONTINUE TO ORDER</button></form>`;
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');
    modal.querySelector('[data-checkout-close]').onclick=closeCheckout;
    modal.onclick=e=>{if(e.target===modal)closeCheckout()};
    modal.querySelector('#shippingForm').onsubmit=e=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(e.currentTarget).entries());
      if(!/^[0-9]{10}$/.test(data.phone)){showToast('Enter a valid 10-digit mobile number.');return}
      if(!/^[0-9]{6}$/.test(data.pincode)){showToast('Enter a valid 6-digit PIN code.');return}
      localStorage.setItem(ADDRESS_KEY,JSON.stringify({name:data.name.trim(),phone:data.phone,address:data.address.trim(),city:data.city.trim(),state:data.state.trim(),pincode:data.pincode}));
      if(data.payment==='online'){showToast('Address saved. UPI / Card payment will be connected next.');return}
      showToast('Address saved. Your COD order is ready for the next checkout step.');
      setTimeout(closeCheckout,900);
    };
  }
  document.addEventListener('click',function(e){
    const action=e.target.closest('[data-action]');
    if(action&&action.dataset.action==='checkout'){
      e.preventDefault();e.stopImmediatePropagation();openCheckout();
    }
    if(e.target.closest('[data-checkout-close]'))closeCheckout();
  },true);
  window.weirenCheckout={open:openCheckout,close:closeCheckout,getAddress:getSaved};
})();
