const base=document.createElement('script');
base.src='https://raw.githubusercontent.com/ayan27612-oss/weiren/8f46ff3839381e88974c95b05169745640c877ba/script.js';
base.onload=()=>{
  const grid=document.querySelector('#productGrid');
  if(!grid||grid.querySelector('[data-product="cardholder"]'))return;
  const card=document.createElement('article');
  card.className='product-card is-coming card-holder-card';
  card.dataset.product='cardholder';
  card.innerHTML='<div class="product-image product-placeholder"><span class="placeholder-category">ACCESSORIES</span><div class="placeholder-message"><strong>PHOTO</strong><small>COMING SOON</small></div></div><div class="product-info"><div><div class="product-name">WEIREN Card Holder</div><div class="product-color">Black</div><div class="product-status">COMING SOON</div></div><div class="product-price">₹399</div></div>';
  grid.appendChild(card);
};
document.head.appendChild(base);
