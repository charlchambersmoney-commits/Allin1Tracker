const $ = s => document.querySelector(s);
const fmt = n => isFinite(n) ? n.toLocaleString(undefined,{maximumFractionDigits:2}) : '-';

// EMI
$('#emi-calc')?.addEventListener('click', ()=>{
  const P=+$('#emi-amt').value, r=+$('#emi-rate').value/100/12, n=+$('#emi-months').value;
  const out=$('#emi-out');
  if(P<=0||r<0||n<=0){ out.textContent='Enter amount, rate, months.'; return; }
  const M = r===0? P/n : (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const total=M*n, interest=total-P;
  out.innerHTML=`Monthly: <strong>${fmt(M)}</strong><br>Total interest: <strong>${fmt(interest)}</strong><br>Total paid: <strong>${fmt(total)}</strong>`;
});

// Savings (monthly compounding + monthly deposit at period end)
$('#sav-calc')?.addEventListener('click', ()=>{
  const pv=+$('#sav-pv').value, pmt=+$('#sav-pmt').value, R=+$('#sav-rate').value/100, yrs=+$('#sav-years').value;
  const out=$('#sav-out'); if(yrs<=0){ out.textContent='Years > 0.'; return; }
  const r=R/12, n=Math.round(yrs*12);
  const fv_lump = pv*Math.pow(1+r,n);
  const fv_pmt = pmt * ((Math.pow(1+r,n)-1)/r);
  const fv = (isFinite(fv_pmt)? fv_lump+fv_pmt : fv_lump + pmt*n);
  const contrib = pv + pmt*n, interest = fv - contrib;
  out.innerHTML=`Future value: <strong>${fmt(fv)}</strong><br>Contributions: <strong>${fmt(contrib)}</strong><br>Growth: <strong>${fmt(interest)}</strong>`;
});

// VAT
function vatAdd(amount, rate){ const tax=amount*rate; return {base:amount, tax, total:amount+tax}; }
function vatRemove(total, rate){ const base=total/(1+rate); return {base, tax:total-base, total}; }
$('#vat-add')?.addEventListener('click', ()=>{
  const a=+$('#vat-amt').value, r=(+$('#vat-rate').value||0)/100, out=$('#vat-out');
  if(a<=0){ out.textContent='Enter amount.'; return; }
  const {base,tax,total}=vatAdd(a,r);
  out.innerHTML=`Base: <strong>${fmt(base)}</strong> · VAT: <strong>${fmt(tax)}</strong> · Total: <strong>${fmt(total)}</strong>`;
});
$('#vat-rem')?.addEventListener('click', ()=>{
  const a=+$('#vat-amt').value, r=(+$('#vat-rate').value||0)/100, out=$('#vat-out');
  if(a<=0){ out.textContent='Enter total incl. VAT.'; return; }
  const {base,tax,total}=vatRemove(a,r);
  out.innerHTML=`Base: <strong>${fmt(base)}</strong> · VAT: <strong>${fmt(tax)}</strong> · Total: <strong>${fmt(total)}</strong>`;
});

// Bill split
$('#bs-calc')?.addEventListener('click', ()=>{
  const sub=+$('#bs-sub').value, tip=+$('#bs-tip').value/100, tax=+$('#bs-tax').value/100, ppl=Math.max(1, Math.floor(+$('#bs-people').value||1));
  const out=$('#bs-out'); if(sub<0){ out.textContent='Enter subtotal.'; return; }
  const tipAmt=sub*tip, taxAmt=sub*tax, total=sub+tipAmt+taxAmt;
  const each=total/ppl;
  out.innerHTML=`Total: <strong>${fmt(total)}</strong> · Each of ${ppl}: <strong>${fmt(each)}</strong>`;
});
