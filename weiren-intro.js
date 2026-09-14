/* WEIREN opening experience: minimal fashion-style entrance. */
(function(){
  const intro=document.getElementById('weirenIntro');
  if(!intro)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let closed=false;
  const close=()=>{
    if(closed)return;
    closed=true;
    intro.classList.add('is-leaving');
    document.body.classList.remove('intro-open');
    sessionStorage.setItem('weiren-intro-seen','1');
    setTimeout(()=>intro.remove(),reduce?0:650);
  };
  const seen=sessionStorage.getItem('weiren-intro-seen');
  if(seen){intro.remove();return;}
  document.body.classList.add('intro-open');
  intro.querySelector('[data-enter]')?.addEventListener('click',close);
  setTimeout(close,reduce?500:1900);
})();
