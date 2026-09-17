/* Universal navigation fix for Turoy inner pages */
(function(){
  const SHOP_ICON='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l2-5h14l2 5"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>';
  const CART_ICON='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H7"/></svg>';
  function setup(){
    const pageNav=document.querySelector('.page-nav');
    if(pageNav){
      let nav=pageNav.querySelector('nav');
      if(nav){
        if(!nav.querySelector('a[href="/"]')) nav.insertAdjacentHTML('afterbegin','<a href="/">Home</a>');
        let btn=document.querySelector('#pageMenuButton');
        if(!btn){btn=document.createElement('button');btn.id='pageMenuButton';btn.className='menu-button page-menu-button';btn.type='button';btn.setAttribute('aria-label','Open navigation menu');btn.textContent='☰';pageNav.appendChild(btn)}
        btn.onclick=function(e){e.preventDefault();e.stopPropagation();nav.classList.toggle('open-mobile');btn.setAttribute('aria-expanded',nav.classList.contains('open-mobile')?'true':'false')};
        nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open-mobile')));
      }
    }
    if(!document.querySelector('#innerPageBackHome') && document.querySelector('.page-hero .wrap')){
      const bar=document.createElement('div');bar.id='innerPageBackHome';bar.className='inner-page-nav-actions';bar.innerHTML='<a href="/" class="inner-home-btn">⌂ Home</a><button type="button" class="inner-back-btn">← Back</button>';
      document.querySelector('.page-hero .wrap').prepend(bar);
      bar.querySelector('.inner-back-btn').onclick=()=>{if(history.length>1)history.back();else location.href='/'};
    }
    if(!document.querySelector('#universalBottomMenu')){
      const bottom=document.createElement('nav');bottom.className='bottom-menu';bottom.id='universalBottomMenu';bottom.setAttribute('aria-label','Mobile quick navigation');bottom.innerHTML='<a href="/"><b>⌂</b><span>Home</span></a><a href="/shop.html"><b class="nav-svg">'+SHOP_ICON+'</b><span>Shop</span></a><button type="button" id="bottomCart"><b class="nav-svg">'+CART_ICON+'</b><span id="bottomCartCount">Cart</span></button><a href="/#hire"><b>🚜</b><span>Hire</span></a><button type="button" id="bottomInstall"><b>↓</b><span>Install App</span></button>';
      document.body.appendChild(bottom);
      bottom.querySelector('#bottomCart').onclick=()=>{if(typeof openCart==='function')openCart();else location.href='/shop.html'};
      bottom.querySelector('#bottomInstall').onclick=()=>{if(typeof install==='function')install();else alert('Use your browser menu and choose “Install app” or “Add to Home Screen”.')};
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
  setTimeout(setup,100);
})();