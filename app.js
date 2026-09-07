const cfg=window.BITEFIXES_CONFIG||{};
const API=((cfg.API_BASE_URL||'').replace(/\/$/,'')+(cfg.API_PREFIX||''));
const dialog=document.getElementById('biteyDialog');
const input=document.getElementById('biteyInput');
const messages=document.getElementById('biteyMessages');
const status=document.getElementById('biteyStatus');
const availability=document.getElementById('biteyAvailability');
const CHAT_ENDPOINT='/chat/business';
const SESSION_KEY='bitefixes_bitey_business_session_v1';

function getBusinessSessionId(){
  try{
    let id=localStorage.getItem(SESSION_KEY);
    if(!id){
      id=(crypto?.randomUUID?.()||`bf-${Date.now()}-${Math.random().toString(36).slice(2,10)}`);
      localStorage.setItem(SESSION_KEY,id);
    }
    return id;
  }catch(_err){return `bf-${Date.now()}`;}
}

function getLanguage(){
  const lang=(document.documentElement.lang||navigator.language||'pt-BR').toLowerCase();
  if(lang.startsWith('es'))return'es';
  if(lang.startsWith('en'))return'en';
  return'pt-BR';
}

function addMessage(text,role='bitey'){
  if(!messages)return;
  const el=document.createElement('div');
  el.className=`bitey-message ${role}`;
  el.textContent=text;
  messages.appendChild(el);
  messages.scrollTop=messages.scrollHeight;
}

async function getJson(path){
  const r=await fetch(API+path,{headers:{Accept:'application/json'}});
  if(!r.ok)throw new Error(`API ${r.status}`);
  return r.json();
}

async function postJson(path,payload){
  const r=await fetch(API+path,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
  let data=null;
  try{data=await r.json();}catch(_err){}
  if(!r.ok){
    const detail=data?.detail||data?.message||data?.response;
    throw new Error(detail||`API ${r.status}`);
  }
  return data||{};
}

async function checkBitey(){
  if(!availability)return;
  try{
    const data=await getJson('/ai/status');
    const ready=data.status==='ready'&&data.gateway==='ready';
    availability.textContent=ready?'● Bitey IA Empresarial online':'● Bitey IA Empresarial parcialmente disponible';
  }catch(err){
    availability.textContent='● Bitey IA Empresarial indisponível no momento';
    console.warn('Bitey business health check failed',err);
  }
}

document.getElementById('bitey').onclick=()=>{
  dialog.showModal();
  if(messages&&!messages.children.length)addMessage('Olá! Sou Bitey IA Empresarial da BiteFixes. Posso ajudar com serviços, reparos, diagnóstico e atendimento da BiteFixes.');
  input?.focus();
};
document.getElementById('close').onclick=()=>dialog.close();

document.querySelectorAll('.quick button').forEach(button=>button.addEventListener('click',()=>{
  input.value=`${button.textContent.trim()} — `;
  input.focus();
}));

document.querySelectorAll('[data-bitey-prompt]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  dialog.showModal();
  input.value=link.dataset.biteyPrompt+' — ';
  input.focus();
}));

async function sendToBitey(text,source='bitefixes-web'){
  const data=await postJson(CHAT_ENDPOINT,{
    message:text,
    company_id:Number(cfg.COMPANY_ID||1),
    channel:'website',
    product:'bitey-enterprise',
    context_scope:'bitefixes',
    conversation_id:getBusinessSessionId(),
    language_preference:getLanguage(),
    source
  });
  return data.response||data.message||'Bitey recebeu sua solicitação.';
}

document.getElementById('biteySend').onclick=async()=>{
  const text=input.value.trim();
  if(!text)return;
  addMessage(text,'user');
  input.value='';
  status.textContent='Bitey está analisando...';
  try{
    const answer=await sendToBitey(text);
    addMessage(answer,'bitey');
    status.textContent='';
  }catch(err){
    status.textContent=err.message||'Bitey não está disponível temporariamente. Tente novamente.';
    console.error('Bitey business chat error',err);
  }
};

input?.addEventListener('keydown',event=>{
  if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();document.getElementById('biteySend').click();}
});

document.getElementById('quoteForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget;
  const formStatus=document.getElementById('formStatus');
  const data=Object.fromEntries(new FormData(form).entries());
  formStatus.textContent='Bitey está preparando sua solicitação...';
  const prompt=`Solicitação de orçamento BiteFixes. Nome: ${data.name}. WhatsApp: ${data.phone}. E-mail: ${data.email||'não informado'}. Necessidade: ${data.message}. Analise a necessidade, identifique a intenção/categoria e oriente o próximo passo do atendimento.`;
  try{
    const answer=await sendToBitey(prompt,'bitefixes-quote-form');
    formStatus.textContent=answer;
    form.reset();
  }catch(err){
    formStatus.textContent='Não foi possível conectar ao atendimento de IA agora. Tente novamente ou use o WhatsApp.';
    console.error('Bitey quote error',err);
  }
});

document.querySelector('.menu').onclick=()=>{
  const nav=document.querySelector('.site-header nav');
  const open=nav.style.display==='flex';
  nav.style.display=open?'none':'flex';
  if(!open){nav.style.position='absolute';nav.style.top='72px';nav.style.left='0';nav.style.right='0';nav.style.padding='18px';nav.style.background='#fff';nav.style.flexDirection='column';}
};

checkBitey();
