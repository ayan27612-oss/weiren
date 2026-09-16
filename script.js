/* WEIREN page content + interactions. HTML stays intentionally small. */
(function(){
  const header=document.getElementById('header');
  const app=document.getElementById('app');
  const isCategory=location.pathname.toLowerCase().includes('category.html');

  const products={
    't-shirt':{title:'T SHIRT',eyebrow:'01 / ESSENTIAL',description:'Acid washed relaxed-fit T-shirt. French Terry, 240 GSM, drop shoulder silhouette.',price:499,meta:'M / L / XL · FIVE COLOURS',colors:[
      {id:'black',name:'BLACK',front:'1000004143.png',back:'ChatGPT Image Sep 13, 2026, 05_43_17 PM.png'},
      {id:'maroon',name:'MAROON',front:'1000004156.png',back:'ChatGPT Image Sep 13, 2026, 06_07_39 PM.png'},
      {id:'navy',name:'NAVY',front:'1000004157.png',back:'ChatGPT Image Sep 13, 2026, 06_06_23 PM.png'},
      {id:'brown',name:'BROWN',front:'1000004158.png',back:'ChatGPT Image Sep 13, 2026, 05_52_50 PM.png'},
      {id:'grey',name:'GREY',front:'1000004159.png',back:'ChatGPT Image Sep 13, 2026, 05_54_13 PM.png'}
    ]},
    jeans:{title:'JEANS',eyebrow:'02 / DENIM',description:'A clean everyday denim essential built around a timeless silhouette.',price:999,meta:'M / L / XL · DENIM',image:'file_00000000891c81faa012a266720b48fb.png'},
    jacket:{title:'JACKET',eyebrow:'03 / OUTERWEAR',description:'A structured outer layer designed for a refined modern wardrobe.',price:1499,meta:'M / L / XL · BLACK',image:'file_00000000849881fa85662703429f1d46.png'}
  };

  function makeHeader(home){
    header.innerHTML=`<button class="menu-button" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button><a class="brand" href="${home?'#top':'index.html'}">WEIREN</a><div class="top-actions"><button class="text-action" aria-label="Account">ACCOUNT</button><button class="icon-action" aria-label="Search">⌕</button><button class="bag-action" aria-label="Shopping bag">BAG <b class="bag-count">0</b></button></div>`;
  }

  function makeMenu(home){
    const nav=document.createElement('nav');nav.className='menu-overlay';nav.setAttribute('aria-hidden','true');
    nav.innerHTML=`<button class="close-menu" aria-label="Close menu">×</button><div><span>WEIREN / MENU</span><a href="${home?'#top':'index.html'}">HOME</a><a href="${home?'#shop':'index.html#shop'}">COLLECTION</a><a href="category.html?type=t-shirt">T SHIRT</a><a href="category.html?type=jeans">JEANS</a><a href="category.html?type=jacket">JACKET</a></div>`;
    app.appendChild(nav);
    const open=()=>{nav.classList.add('open');nav.setAttribute('aria-hidden','false');header.querySelector('.menu-button').setAttribute('aria-expanded','true');document.body.style.overflow='hidden'};
    const close=()=>{nav.classList.remove('open');nav.setAttribute('aria-hidden','true');header.querySelector('.menu-button').setAttribute('aria-expanded','false');document.body.style.overflow=''};
    header.querySelector('.menu-button').onclick=open;nav.querySelector('.close-menu').onclick=close;nav.querySelectorAll('a').forEach(a=>a.onclick=close);document.addEventListener('keydown',e=>e.key==='Escape'&&close());
  }

  function homePage(){
    makeHeader(true);
    app.innerHTML=`<main id="top">
      <section class="hero-new"><img src="file_00000000c280820ba2392bd508efad33.png" alt="WEIREN campaign model"><div class="hero-overlay"></div><div class="hero-meta hero-meta-left"><span>WEIREN / 01</span><span>MEN'S STUDIO</span></div><div class="hero-title"><p>THE NEW<br>EVERYDAY</p><h1>WEIREN</h1></div><div class="hero-bottom"><span>SS26 / COLLECTION</span><a href="#shop">EXPLORE <b>↓</b></a></div></section>
      <section class="manifesto section-pad"><div class="section-label">01 / THE BRAND</div><div class="manifesto-copy"><p class="display">CLOTHES<br>FOR THE<br>EVERYDAY.</p><div><p>WEIREN is a men's clothing studio built around clean silhouettes, washed textures and pieces that work together without asking for attention.</p><a href="#shop" class="line-link">ENTER THE COLLECTION <b>→</b></a></div></div></section>
      <section id="shop" class="shop-section section-pad"><div class="shop-head"><div><span class="section-label">02 / SHOP</span><h2>THE<br>COLLECTION</h2></div><p>THREE ESSENTIALS.<br>ONE WARDROBE.</p></div><div class="category-grid">
        <a class="category-tile category-large" href="category.html?type=t-shirt"><img src="file_000000001f708211a25a58398aa20b24.png" alt="WEIREN T shirt"><span class="tile-index">01</span><div><h3>T SHIRT</h3><p>ACID WASHED / 240 GSM</p><b>₹499 →</b></div></a>
        <a class="category-tile" href="category.html?type=jeans"><img src="file_00000000891c81faa012a266720b48fb.png" alt="WEIREN jeans"><span class="tile-index">02</span><div><h3>JEANS</h3><p>MADE TO MOVE</p><b>₹999 →</b></div></a>
        <a class="category-tile" href="category.html?type=jacket"><img src="file_00000000849881fa85662703429f1d46.png" alt="WEIREN jacket"><span class="tile-index">03</span><div><h3>JACKET</h3><p>BUILT FOR MORE</p><b>₹1,499 →</b></div></a>
      </div></section>
      <section class="colour-story section-pad"><div class="story-head"><span class="section-label">03 / COLOUR STUDY</span><h2>FIVE WAYS<br>TO WEAR<br>ONE IDEA.</h2><p>THE ACID WASHED RELAXED T-SHIRT<br>IN BLACK, MAROON, NAVY, BROWN & GREY.</p></div><div class="colour-wall">
        <a href="category.html?type=t-shirt#black" class="colour-card"><img src="1000004143.png" alt="Black T shirt front"><img src="ChatGPT Image Sep 13, 2026, 05_43_17 PM.png" alt="Black T shirt back"><span>01 / BLACK</span></a>
        <a href="category.html?type=t-shirt#maroon" class="colour-card"><img src="1000004156.png" alt="Maroon T shirt front"><img src="ChatGPT Image Sep 13, 2026, 06_07_39 PM.png" alt="Maroon T shirt back"><span>02 / MAROON</span></a>
        <a href="category.html?type=t-shirt#navy" class="colour-card"><img src="1000004157.png" alt="Navy T shirt front"><img src="ChatGPT Image Sep 13, 2026, 06_06_23 PM.png" alt="Navy T shirt back"><span>03 / NAVY</span></a>
        <a href="category.html?type=t-shirt#brown" class="colour-card"><img src="1000004158.png" alt="Brown T shirt front"><img src="ChatGPT Image Sep 13, 2026, 05_52_50 PM.png" alt="Brown T shirt back"><span>04 / BROWN</span></a>
        <a href="category.html?type=t-shirt#grey" class="colour-card"><img src="1000004159.png" alt="Grey T shirt front"><img src="ChatGPT Image Sep 13, 2026, 05_54_13 PM.png" alt="Grey T shirt back"><span>05 / GREY</span></a>
      </div><a class="story-cta" href="category.html?type=t-shirt">VIEW ALL COLOURS <b>→</b></a></section>
      <section class="details-section section-pad"><div class="section-label">04 / THE PIECE</div><div class="details-layout"><div class="details-big">240<br><small>GSM</small></div><div><h2>ACID WASHED<br>RELAXED T-SHIRT</h2><p>French Terry. Drop shoulder. Relaxed fit. Designed as the everyday base layer for the WEIREN wardrobe.</p><ul><li>M / L / XL</li><li>FIVE COLOURS</li><li>FREE SHIPPING INDIA</li><li>4–7 DAY ESTIMATE</li></ul><a href="category.html?type=t-shirt" class="solid-link">SHOP T SHIRT <b>→</b></a></div></div></section>
      <footer class="site-footer section-pad"><div class="footer-brand">WEIREN</div><div class="footer-grid"><div><span>EXPLORE</span><a href="#shop">COLLECTION</a><a href="category.html?type=t-shirt">T SHIRT</a><a href="category.html?type=jeans">JEANS</a><a href="category.html?type=jacket">JACKET</a></div><div><span>INFO</span><a href="#top">STUDIO</a><a href="#top">SHIPPING</a><a href="#top">CONTACT</a><a href="#top">INSTAGRAM</a></div><div><span>WEIREN</span><p>CLOTHING A BETTER TOMORROW.</p><small>© 2026 WEIREN</small></div></div></footer>
    </main>`;
    makeMenu(true);
  }

  function categoryPage(){
    const type=new URLSearchParams(location.search).get('type')||'t-shirt',item=products[type]||products['t-shirt'];makeHeader(false);
    app.innerHTML=`<main id="category-root"></main>`;
    const main=app.querySelector('main');
    if(type==='t-shirt'){
      main.innerHTML=`<section class="catalog-head section-pad"><div><span class="section-label">${item.eyebrow}</span><h1>${item.title}</h1></div><div><p>${item.description}</p><span>${item.meta}</span></div></section><div class="catalog-tools"><span>05 COLOURS</span><button id="filter-toggle">FILTER</button><button id="sort-toggle">SORT</button></div><div class="filter-strip" id="filters"><button class="active" data-filter="all">ALL</button>${item.colors.map(c=>`<button data-filter="${c.id}">${c.name}</button>`).join('')}</div><section class="catalog-grid">${item.colors.map((c,i)=>`<article class="colour-product" id="${c.id}" data-colour="${c.id}"><div class="product-pair"><figure><img src="${c.front}" alt="${c.name} T shirt front"><figcaption>FRONT</figcaption></figure><figure><img src="${c.back}" alt="${c.name} T shirt back"><figcaption>BACK</figcaption></figure></div><div class="product-info"><div><span>${String(i+1).padStart(2,'0')} / ${c.name}</span><h2>ACID WASHED RELAXED-T-SHIRT</h2><p>French Terry · 240 GSM · Drop shoulder</p></div><div class="product-buy"><strong>₹${item.price}</strong><div class="sizes"><button>M</button><button>L</button><button>XL</button></div><button class="add-button" data-name="${c.name} T SHIRT" data-price="${item.price}">ADD TO BAG <b>→</b></button></div></div></article>`).join('')}</section><section class="catalog-note section-pad"><span class="section-label">DETAILS</span><div><h2>MADE FOR<br>REPEAT WEAR.</h2><p>Free shipping across India. Estimated delivery 4–7 days depending on location. COD, UPI and card payment options are planned for the connected checkout.</p></div></section>`;
      main.querySelector('#filter-toggle').onclick=()=>main.querySelector('#filters').classList.toggle('show');main.querySelector('#sort-toggle').onclick=()=>main.querySelector('.catalog-grid').classList.toggle('reverse');
      main.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{main.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');main.querySelectorAll('.colour-product').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.filter!==b.dataset.filter)});
      main.querySelectorAll('.add-button').forEach(b=>b.onclick=()=>window.WeirenStore?.addToCart({name:b.dataset.name,price:Number(b.dataset.price)}));
    }else{
      main.innerHTML=`<section class="single-product section-pad"><div class="single-copy"><span class="section-label">${item.eyebrow}</span><h1>${item.title}</h1><p>${item.description}</p><strong>₹${item.price}</strong><span>${item.meta}</span><div class="sizes"><button>M</button><button>L</button><button>XL</button></div><button class="add-button" id="single-add">ADD TO BAG <b>→</b></button><a class="back-link" href="index.html#shop">← BACK TO COLLECTION</a></div><div class="single-image"><img src="${item.image}" alt="WEIREN ${item.title}"></div></section><section class="single-detail section-pad"><span class="section-label">WEIREN / ${item.title}</span><h2>BUILT AROUND<br>THE EVERYDAY.</h2><p>${item.description} Designed to sit inside the same wardrobe system as the WEIREN T shirt, denim and outerwear.</p></section>`;
      main.querySelector('#single-add').onclick=()=>window.WeirenStore?.addToCart({name:item.title,price:item.price});
    }
    makeMenu(false);
  }

  if(isCategory)categoryPage();else homePage();
})();
