// WEIREN Supabase public client configuration.
// Publishable keys are designed for browser use. Never put a service-role key here.
window.WEIREN_SUPABASE_URL = 'https://ezkyznqzrijoxckqgdtd.supabase.co';
window.WEIREN_SUPABASE_KEY = 'sb_publishable_YkJAWMQhYG7B5Q18vuzpFA_Dlo_HWQM';

/* WEIREN opening experience + checkout loader. */
(function(){
  const style=document.createElement('style');
  style.textContent=`html.intro-active,html.intro-active body{overflow:hidden!important}#weirenIntro{position:fixed;inset:0;z-index:9999;background:#0b0b0b;color:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:1;visibility:visible}#weirenIntro:before{content:"";position:absolute;width:42vw;height:42vw;min-width:280px;min-height:280px;border:1px solid rgba(255,255,255,.08);border-radius:50%;transform:scale(.72);animation:weirenIntroRing 2.1s cubic-bezier(.2,.7,.2,1) forwards}#weirenIntro:after{content:"";position:absolute;width:18vw;height:18vw;min-width:120px;min-height:120px;border-radius:50%;background:radial-gradient(circle,rgba(255,122,0,.13),rgba(19,138,61,.06) 45%,transparent 70%);filter:blur(18px);animation:weirenIntroGlow 2.1s ease forwards}.weiren-intro-content{position:relative;z-index:2;text-align:center;display:flex;flex-direction:column;align-items:center;gap:13px}.weiren-intro-brand{font:600 clamp(38px,9vw,76px)/1 Inter,Arial,sans-serif;letter-spacing:.22em;margin-left:.22em}.weiren-intro-tag{font:500 8px/1 Inter,Arial,sans-serif;letter-spacing:.28em;color:rgba(255,255,255,.55);text-transform:uppercase}.weiren-intro-line{width:min(150px,38vw);height:1px;background:rgba(255,255,255,.18);margin-top:17px;overflow:hidden}.weiren-intro-line:after{content:"";display:block;width:38%;height:100%;background:linear-gradient(90deg,#ff7a00,#fff,#138a3d);animation:weirenIntroProgress 1.65s cubic-bezier(.4,0,.2,1) forwards}.weiren-intro-enter{margin-top:6px;border:0;background:none;color:rgba(255,255,255,.5);font:500 8px/1 Inter,Arial,sans-serif;letter-spacing:.2em;padding:8px 12px;cursor:pointer;text-transform:uppercase}#weirenIntro.is-leaving{animation:weirenIntroOut .65s cubic-bezier(.7,0,.2,1) forwards}@keyframes weirenIntroRing{0%{transform:scale(.55);opacity:0}35%{opacity:1}100%{transform:scale(1);opacity:.75}}@keyframes weirenIntroGlow{0%{transform:scale(.4);opacity:0}45%{opacity:1}100%{transform:scale(1.25);opacity:.55}}@keyframes weirenIntroProgress{from{transform:translateX(-110%)}to{transform:translateX(265%)}}@keyframes weirenIntroOut{to{opacity:0;visibility:hidden;transform:scale(1.015)}}@media(max-width:800px){#weirenIntro:before{width:76vw;height:76vw}.weiren-intro-brand{font-size:39px}.weiren-intro-tag{font-size:7px}.weiren-intro-line{margin-top:13px}}@media(prefers-reduced-motion:reduce){#weirenIntro *{animation-duration:.01ms!important;animation-iteration-count:1!important}#weirenIntro{transition:none}}`;
  document.head.appendChild(style);
  const seen=sessionStorage.getItem('weiren-intro-seen');
  if(!seen){
    document.documentElement.classList.add('intro-active');
    const intro=document.createElement('div');
    intro.id='weirenIntro';
    intro.setAttribute('role','dialog');
    intro.setAttribute('aria-label','WEIREN introduction');
    intro.innerHTML='<div class="weiren-intro-content"><div class="weiren-intro-brand">WEIREN</div><div class="weiren-intro-tag">EVERYDAY, REDEFINED.</div><div class="weiren-intro-line"></div><button class="weiren-intro-enter" type="button" data-enter>ENTER STORE</button></div>';
    document.body.prepend(intro);
  }
  var checkout=document.createElement('script');checkout.src='weiren-checkout.js';checkout.defer=true;document.head.appendChild(checkout);
  var introScript=document.createElement('script');introScript.src='weiren-intro.js';introScript.defer=true;document.head.appendChild(introScript);
})();
