/* WEIREN production auth layer powered by Supabase Auth. */
(() => {
  const supabase = window.supabase.createClient(window.WEIREN_SUPABASE_URL, window.WEIREN_SUPABASE_KEY);
  window.weirenSupabase = supabase;
  const modal = document.querySelector('#accountModal');
  const toast = document.querySelector('#toast');
  const show = msg => { if (typeof window.showToast === 'function') window.showToast(msg); else if (toast) { toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); } };
  const close = () => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); };
  const open = () => { modal?.classList.add('open'); modal?.setAttribute('aria-hidden','false'); };
  const card = () => modal?.querySelector('.modal-card');
  const loginView = () => {
    const c = card(); if (!c) return;
    c.innerHTML = `<button class="modal-close" data-action="close-account" aria-label="Close">×</button><p class="eyebrow">WEIREN ACCOUNT</p><h2>WELCOME BACK.</h2><form id="sbLoginForm"><label>Email<input type="email" id="sbLoginEmail" placeholder="you@example.com" autocomplete="email" required></label><label>Password<input type="password" id="sbLoginPassword" placeholder="••••••••" autocomplete="current-password" required></label><button class="btn btn-dark full" type="submit">SIGN IN</button></form><div class="login-divider"><span>OR</span></div><button class="btn btn-light full" data-action="google">CONTINUE WITH GOOGLE</button><div class="account-links"><button type="button" data-action="forgot">Forgot password?</button><button type="button" data-action="register">Create an account</button></div><p class="demo-note">Secure authentication by WEIREN.</p>`;
  };
  const registerView = () => {
    const c = card(); if (!c) return;
    c.innerHTML = `<button class="modal-close" data-action="close-account" aria-label="Close">×</button><p class="eyebrow">WEIREN ACCOUNT</p><h2>CREATE<br>ACCOUNT.</h2><form id="sbRegisterForm"><label>Full name<input type="text" id="sbRegisterName" placeholder="Your name" autocomplete="name" required></label><label>Email<input type="email" id="sbRegisterEmail" placeholder="you@example.com" autocomplete="email" required></label><label>Password<input type="password" id="sbRegisterPassword" placeholder="At least 6 characters" minlength="6" autocomplete="new-password" required></label><label>Confirm password<input type="password" id="sbRegisterConfirm" placeholder="Repeat password" minlength="6" autocomplete="new-password" required></label><button class="btn btn-dark full" type="submit">CREATE ACCOUNT</button></form><div class="account-links"><button type="button" data-action="back-login">Already have an account? Sign in</button></div><p class="demo-note">Your account is securely stored in WEIREN's backend.</p>`;
  };
  const forgotView = () => {
    const c = card(); if (!c) return;
    c.innerHTML = `<button class="modal-close" data-action="close-account" aria-label="Close">×</button><p class="eyebrow">WEIREN ACCOUNT</p><h2>RESET<br>PASSWORD.</h2><form id="sbForgotForm"><label>Email<input type="email" id="sbForgotEmail" placeholder="you@example.com" autocomplete="email" required></label><button class="btn btn-dark full" type="submit">SEND RESET LINK</button></form><div class="account-links"><button type="button" data-action="back-login">Back to sign in</button></div><p class="demo-note">We'll send a secure password reset link if the address is registered.</p>`;
  };
  const recoveryView = () => {
    const c = card(); if (!c) return;
    c.innerHTML = `<button class="modal-close" data-action="close-account" aria-label="Close">×</button><p class="eyebrow">WEIREN ACCOUNT</p><h2>NEW<br>PASSWORD.</h2><form id="sbRecoveryForm"><label>New password<input type="password" id="sbRecoveryPassword" placeholder="At least 6 characters" minlength="6" autocomplete="new-password" required></label><label>Confirm password<input type="password" id="sbRecoveryConfirm" placeholder="Repeat password" minlength="6" autocomplete="new-password" required></label><button class="btn btn-dark full" type="submit">UPDATE PASSWORD</button></form>`;
  };
  const accountView = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { loginView(); open(); return; }
    const name = data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'MEMBER';
    const c = card(); if (!c) return;
    c.innerHTML = `<button class="modal-close" data-action="close-account" aria-label="Close">×</button><p class="eyebrow">WEIREN ACCOUNT</p><h2>WELCOME,<br>${name.toUpperCase()}.</h2><p class="demo-note">${data.user.email || ''}</p><button class="btn btn-dark full" data-action="signout">SIGN OUT</button>`;
    open();
  };
  document.addEventListener('click', async e => {
    const a = e.target.closest('[data-action]'); if (!a) return;
    const action = a.dataset.action;
    if (!['account','register','forgot','back-login','google','signout'].includes(action)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (action === 'account') return accountView();
    if (action === 'register') { registerView(); return; }
    if (action === 'forgot') { forgotView(); return; }
    if (action === 'back-login') { loginView(); return; }
    if (action === 'google') { show('Google sign-in needs the Google provider enabled in Supabase first.'); return; }
    if (action === 'signout') { const { error } = await supabase.auth.signOut(); if (error) show(error.message); else { show('Signed out of WEIREN.'); close(); updateAccountButton(null); } }
  }, true);
  document.addEventListener('submit', async e => {
    const form = e.target;
    if (!['sbLoginForm','sbRegisterForm','sbForgotForm','sbRecoveryForm'].includes(form.id)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (form.id === 'sbLoginForm') {
      const email = document.querySelector('#sbLoginEmail').value.trim().toLowerCase();
      const password = document.querySelector('#sbLoginPassword').value;
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return show(error.message);
      show(`Welcome back, ${data.user?.user_metadata?.name || 'to WEIREN'}.`); close(); updateAccountButton(data.user);
    }
    if (form.id === 'sbRegisterForm') {
      const name = document.querySelector('#sbRegisterName').value.trim();
      const email = document.querySelector('#sbRegisterEmail').value.trim().toLowerCase();
      const password = document.querySelector('#sbRegisterPassword').value;
      const confirm = document.querySelector('#sbRegisterConfirm').value;
      if (password !== confirm) return show('Passwords do not match.');
      if (password.length < 6) return show('Password must be at least 6 characters.');
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: window.location.origin + window.location.pathname } });
      if (error) return show(error.message);
      if (data.session) { show(`Welcome to WEIREN, ${name}.`); close(); updateAccountButton(data.user); }
      else { show('Account created. Check your email to verify your account.'); loginView(); }
    }
    if (form.id === 'sbForgotForm') {
      const email = document.querySelector('#sbForgotEmail').value.trim().toLowerCase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + window.location.pathname });
      if (error) return show(error.message);
      show('If that email is registered, a reset link has been sent.'); loginView();
    }
    if (form.id === 'sbRecoveryForm') {
      const password = document.querySelector('#sbRecoveryPassword').value;
      const confirm = document.querySelector('#sbRecoveryConfirm').value;
      if (password !== confirm) return show('Passwords do not match.');
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return show(error.message);
      show('Password updated successfully.'); close();
    }
  }, true);
  function updateAccountButton(user) { const b = document.querySelector('[data-action="account"]'); if (b) b.textContent = user ? 'ACCOUNT' : 'ACCOUNT'; }
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') { recoveryView(); open(); }
    updateAccountButton(session?.user || null);
  });
})();
