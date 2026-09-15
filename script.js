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

// Navigation intentionally uses normal browser scrolling.
// No swipe-to-page JavaScript is used, so small touches cannot trigger a page change.
document.documentElement.style.scrollBehavior='smooth';
