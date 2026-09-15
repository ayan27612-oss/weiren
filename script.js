const menuButton=document.querySelector('.menu-button');
const menu=document.querySelector('.menu-overlay');
const closeButton=document.querySelector('.close-menu');
const menuLinks=document.querySelectorAll('.menu-overlay a');

function openMenu(){
  menu.classList.add('open');
  menu.setAttribute('aria-hidden','false');
  menuButton.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
}
function closeMenu(){
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden','true');
  menuButton.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}
menuButton.addEventListener('click',openMenu);
closeButton.addEventListener('click',closeMenu);
menuLinks.forEach(link=>link.addEventListener('click',closeMenu));

const mobileScrollFix=document.createElement('style');
mobileScrollFix.textContent=`
.hero-shade{background:linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,.02) 52%,rgba(0,0,0,0))!important}
@media(max-width:700px){
 html,body{height:auto!important;min-height:100%;overflow-x:hidden!important;overflow-y:auto!important;touch-action:pan-y!important;overscroll-behavior-y:auto!important}
 main#top{height:auto!important;min-height:0!important;overflow:visible!important;position:relative!important}
 .site-header{position:relative!important}
 .hero,.collection-section{position:relative!important;top:auto!important;left:auto!important;width:100%!important;height:auto!important;max-height:none!important;min-height:0!important;margin:0!important;transform:none!important;transition:none!important;will-change:auto!important;overflow:hidden!important}
 .hero{height:calc(100svh - 55px)!important}
 .hero-image{inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important}
 .collection-section{padding-top:52px!important;min-height:100svh!important}
 .menu-overlay{z-index:100}
}
@media(max-width:380px){.hero{height:calc(100svh - 51px)!important}}
`;
document.head.appendChild(mobileScrollFix);
