// WEIREN Supabase public client configuration.
// Publishable keys are designed for browser use. Never put a service-role key here.
window.WEIREN_SUPABASE_URL = 'https://ezkyznqzrijoxckqgdtd.supabase.co';
window.WEIREN_SUPABASE_KEY = 'sb_publishable_YkJAWMQhYG7B5Q18vuzpFA_Dlo_HWQM';

// Load the checkout/address layer after the page scripts are ready.
(function(){
  var s=document.createElement('script');
  s.src='weiren-checkout.js';
  s.defer=true;
  document.head.appendChild(s);
})();
