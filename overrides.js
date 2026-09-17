/* Turoy client-supplied imagery + mobile assistant refinements */
const TUROY_IMAGE_MAP={
  roof:'https://images.pexels.com/photos/30496227/pexels-photo-30496227.jpeg?auto=compress&cs=tinysrgb&w=1400',
  pump:'https://images.pexels.com/photos/32489252/pexels-photo-32489252.jpeg?auto=compress&cs=tinysrgb&w=1400',
  boots:'https://images.pexels.com/photos/30229920/pexels-photo-30229920.jpeg?auto=compress&cs=tinysrgb&w=1400',
  generator:'https://images.pexels.com/photos/38303960/pexels-photo-38303960.jpeg?auto=compress&cs=tinysrgb&w=1400',
  rig:'https://images.pexels.com/photos/7910062/pexels-photo-7910062.jpeg?auto=compress&cs=tinysrgb&w=1400',
  grader:'https://images.pexels.com/photos/37701411/pexels-photo-37701411.jpeg?auto=compress&cs=tinysrgb&w=1400',
  tlb:'https://images.pexels.com/photos/3998410/pexels-photo-3998410.jpeg?auto=compress&cs=tinysrgb&w=1400'
};

function applyTuroyImageMappings(){
  if(typeof products!=='undefined'&&Array.isArray(products)){
    products.forEach(p=>{if(TUROY_IMAGE_MAP[p.id])p.image=TUROY_IMAGE_MAP[p.id]});
    if(typeof renderProducts==='function')renderProducts(document.querySelector('#productSearch')?.value||'');
    if(typeof renderCart==='function')renderCart();
  }
  const hire=[
    ['TLB / Backhoe',TUROY_IMAGE_MAP.tlb],
    ['Motor Grader',TUROY_IMAGE_MAP.grader],
    ['Drill Rig',TUROY_IMAGE_MAP.rig]
  ];
  document.querySelectorAll('.hire-grid article').forEach(card=>{
    const title=card.querySelector('h3')?.textContent.trim();
    const match=hire.find(x=>x[0]===title);
    if(match){const img=card.querySelector('img');if(img)img.src=match[1]}
  });
}

function refineTuroyChat(){
  const panel=document.querySelector('#turoyChat');
  if(!panel)return;
  const launcher=document.querySelector('#turoyChatLauncher');
  const oldStep=document.querySelector('#chatStep');
  if(oldStep)oldStep.innerHTML='';
  const oldConversation=document.querySelector('#chatConversation');
  if(oldConversation)oldConversation.innerHTML='';
  panel.dataset.started='';
  const fresh=launcher?.cloneNode(true);
  if(launcher&&fresh){launcher.parentNode.replaceChild(fresh,launcher)}
  const close=document.querySelector('#chatClose');
  if(close)close.onclick=()=>panel.classList.remove('open');
  let started=false;
  function bubble(text){
    const log=document.querySelector('#chatConversation');if(!log)return;
    const div=document.createElement('div');div.className='chat-bubble bot';div.textContent=text;log.appendChild(div);
  }
  function begin(){
    if(started)return;started=true;
    bubble("Hello, welcome! I'm your Turoy Assistant. How can I help you today?");
    bubble("When you're ready, tap below and enter your name.");
    const step=document.querySelector('#chatStep');
    if(step)step.innerHTML='<button class="chat-wide-next chat-start-button" id="chatBeginForm">Start Enquiry</button>';
    document.querySelector('#chatBeginForm')?.addEventListener('click',()=>{
      panel.dataset.started='';
      panel.remove();fresh?.remove();
      if(typeof ensureChat==='function')ensureChat();
      const p=document.querySelector('#turoyChat');
      if(p){p.classList.add('open');const l=document.querySelector('#turoyChatLauncher');l?.click();l?.click()}
    });
  }
  if(fresh)fresh.onclick=()=>{panel.classList.toggle('open');if(panel.classList.contains('open'))begin()};
}

const fixStyle=document.createElement('style');
fixStyle.textContent=`
@media(max-width:700px){
 .chat-panel{left:12px!important;right:12px!important;bottom:150px!important;width:auto!important;max-width:none!important;max-height:calc(100dvh - 175px)!important;border-radius:16px!important;overflow:hidden!important}
 .chat-conversation{height:auto!important;max-height:34dvh!important;min-height:125px!important;overflow:auto!important}
 .chat-step{padding:12px!important}
 .chat-step input,.chat-step select,.chat-step textarea{font-size:16px!important}
 .chat-launcher{right:15px!important;bottom:82px!important}
 .chat-start-button{margin:0!important;min-height:46px!important}
 body.chat-open{overflow:hidden}
}`;
document.head.appendChild(fixStyle);

document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{applyTuroyImageMappings();refineTuroyChat()},0)});
if(document.readyState!=='loading')setTimeout(()=>{applyTuroyImageMappings();refineTuroyChat()},0);
