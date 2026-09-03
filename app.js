const cfg=window.BITEFIXES_CONFIG||{};
const API=((cfg.API_BASE_URL||'').replace(/\/$/,'')+(cfg.API_PREFIX||''));
const dialog=document.getElementById('biteyDialog');
const input=document.getElementById('biteyInput');
const messages=document.getElementById('biteyMessages');
const status=document.getElementById('biteyStatus');
const availability=document.getElementById('biteyAvailability');

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
  if(!r.ok)throw new Error(`API ${r.status}`);
  return r.json();
}

async function checkBitey(){
  if(!availability)return;
  try{
    const data=await getJson('/ai/status');
    const ready=data.status==='ready'&&data.gateway==='ready';
    availability.textContent=ready?'● Bitey IA online':'● Bitey IA parcialmente disponible';
  }catch(err){
    availability.textContent='● Bitey IA indisponível no momento';
    console.warn('Bitey health check failed',err);
  }
}

document.getElementById('bitey').onclick=()=>{
  dialog.showModal();
  if(messages&&!messages.children.length)addMessage('Olá! Sou Bitey IA. Posso diagnosticar sua necessidade, orientar uma solução ou ajudar a estruturar uma automação.');
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
  const data=await postJson('/chat',{message:text,source,language:document.documentElement.lang||'pt-BR'});
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
    status.textContent='Bitey não está disponível temporariamente. Tente novamente.';
    console.error(err);
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
    console.error(err);
  }
});

document.querySelector('.menu').onclick=()=>{
  const nav=document.querySelector('.site-header nav');
  const open=nav.style.display==='flex';
  nav.style.display=open?'none':'flex';
  if(!open){nav.style.position='absolute';nav.style.top='72px';nav.style.left='0';nav.style.right='0';nav.style.padding='18px';nav.style.background='#fff';nav.style.flexDirection='column';}
};

checkBitey();