const $=s=>document.querySelector(s);
const fmt=d=>d.toISOString().slice(0,10);

// Ovulation estimate
$('#ov-calc')?.addEventListener('click',()=>{
  const l=$('#ov-lmp').value, cycle=Math.max(20,Math.min(40,+$('#ov-cycle').value||28)), out=$('#ov-out');
  if(!l){ out.textContent='Enter LMP date.'; return; }
  const L=new Date(l), ovu=new Date(L); ovu.setDate(ovu.getDate()+(cycle-14));
  const start=new Date(ovu); start.setDate(start.getDate()-2);
  const end=new Date(ovu); end.setDate(end.getDate()+2);
  out.innerHTML=`Fertile window: <strong>${fmt(start)}</strong>–<strong>${fmt(end)}</strong><br>Estimated ovulation: <strong>${fmt(ovu)}</strong>`;
});

// Due-date estimate
$('#edd-calc')?.addEventListener('click',()=>{
  const l=$('#edd-lmp').value, cycle=Math.max(20,Math.min(40,+$('#edd-cycle').value||28)), out=$('#edd-out');
  if(!l){ out.textContent='Enter LMP date.'; return; }
  const L=new Date(l), edd=new Date(L); edd.setDate(edd.getDate()+280+(cycle-28));
  out.innerHTML=`Estimated due date: <strong>${fmt(edd)}</strong>`;
});
