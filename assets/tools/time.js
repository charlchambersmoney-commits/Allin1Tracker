const $=(s,r=document)=>r.querySelector(s); const pad=n=>String(n).padStart(2,'0');

// AGE
$('#age-calc')?.addEventListener('click',()=>{
  const dob=$('#age-dob')?.value, asof=$('#age-asof')?.value||new Date().toISOString().slice(0,10), out=$('#age-out');
  if(!dob){ out.textContent='Pick a birthdate.'; return; }
  const A=new Date(asof), B=new Date(dob); if(A<B){ out.textContent='As-of date must be after birthdate.'; return; }
  let y=A.getFullYear()-B.getFullYear(), m=A.getMonth()-B.getMonth(), d=A.getDate()-B.getDate();
  if(d<0){ const pm=new Date(A.getFullYear(),A.getMonth(),0).getDate(); d+=pm; m--; }
  if(m<0){ m+=12; y--; }
  out.innerHTML=`<strong>${y}</strong> years, <strong>${m}</strong> months, <strong>${d}</strong> days`;
});

// BUSINESS DAYS
$('#bd-calc')?.addEventListener('click',()=>{
  const s=new Date($('#bd-start')?.value), e=new Date($('#bd-end')?.value), out=$('#bd-out');
  if(isNaN(+s)||isNaN(+e)||e<s){ out.textContent='Choose valid start/end.'; return; }
  const set=new Set(($('#bd-holidays')?.value||'').split(',').map(x=>x.trim()).filter(Boolean));
  let n=0, d=new Date(s);
  while(d<=e){ const dow=d.getDay(), iso=d.toISOString().slice(0,10); if(dow!==0&&dow!==6&&!set.has(iso)) n++; d.setDate(d.getDate()+1); }
  out.innerHTML=`<strong>${n}</strong> business day${n===1?'':'s'}.`;
});

// STOPWATCH
let swRunning=false, swStart=0, swElapsed=0, swTimer=null; const swDisp=$('#sw-display'), swLaps=$('#sw-laps');
function renderSW(ms){ const t=Math.floor(ms/10), cs=t%100, s=Math.floor(t/100)%60, m=Math.floor(t/6000); swDisp.textContent=`${pad(m)}:${pad(s)}.${pad(cs)}`; }
$('#sw-start')?.addEventListener('click',e=>{ if(!swRunning){ swRunning=true; e.target.textContent='Pause'; swStart=performance.now()-swElapsed; swTimer=setInterval(()=>{ swElapsed=performance.now()-swStart; renderSW(swElapsed); },16);} else { swRunning=false; e.target.textContent='Start'; clearInterval(swTimer);} });
$('#sw-lap')?.addEventListener('click',()=>{ if(!swRunning&&swElapsed===0) return; const el=document.createElement('div'); el.textContent=swDisp.textContent; swLaps.prepend(el); });
$('#sw-reset')?.addEventListener('click',()=>{ swRunning=false; clearInterval(swTimer); swElapsed=0; renderSW(0); $('#sw-start').textContent='Start'; swLaps.innerHTML=''; });
renderSW(0);

// COUNTDOWN
let cdInt=null;
$('#cd-start')?.addEventListener('click',()=>{
  const t=$('#cd-target')?.value, out=$('#cd-out'); if(!t){ out.textContent='Pick a target.'; return; }
  const target=new Date(t); clearInterval(cdInt);
  cdInt=setInterval(()=>{ const now=new Date(); let d=Math.max(0,target-now);
    const days=Math.floor(d/86400000); d%=86400000; const h=Math.floor(d/3600000); d%=3600000; const m=Math.floor(d/60000); d%=60000; const s=Math.floor(d/1000);
    out.innerHTML=`<strong>${days}</strong>d ${pad(h)}:${pad(m)}:${pad(s)}`; if(target<=now){ out.textContent='Time is up!'; clearInterval(cdInt); }
  },500);
});
