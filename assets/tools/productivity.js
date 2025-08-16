const $=s=>document.querySelector(s);
const fmt=n=>isFinite(n)?n.toLocaleString(undefined,{maximumFractionDigits:4}):'-';

// Percentage
$('#pct-of')?.addEventListener('click',()=>{
  const x=+$('#pct-x').value, y=+$('#pct-y').value;
  $('#pct-out1').textContent=(isFinite(x)&&isFinite(y))?`${x}% of ${y} = ${fmt(y*(x/100))}`:'Enter numbers.';
});
$('#pct-what')?.addEventListener('click',()=>{
  const a=+$('#pct-a').value, b=+$('#pct-b').value;
  $('#pct-out2').textContent=(b!==0)?`${a} is ${fmt((a/b)*100)}% of ${b}`:'Y cannot be 0.';
});
$('#pct-inc')?.addEventListener('click',()=>{
  const base=+$('#pct-base').value, p=+$('#pct-change').value/100;
  $('#pct-out3').textContent=`Increased: ${fmt(base*(1+p))}`;
});
$('#pct-dec')?.addEventListener('click',()=>{
  const base=+$('#pct-base').value, p=+$('#pct-change').value/100;
  $('#pct-out3').textContent=`Decreased: ${fmt(base*(1-p))}`;
});

// Unit converter
const sets={length:{units:{m:1,km:1000,cm:0.01,mm:0.001,mi:1609.344,ft:0.3048,in:0.0254}},mass:{units:{kg:1,g:0.001,lb:0.45359237,oz:0.0283495231}},temp:{units:{C:'C',F:'F',K:'K'}}};
function fill(kind){const f=$('#uc-from'),t=$('#uc-to'); f.innerHTML=''; t.innerHTML=''; Object.keys(sets[kind].units).forEach(u=>{f.insertAdjacentHTML('beforeend',`<option>${u}</option>`); t.insertAdjacentHTML('beforeend',`<option>${u}</option>`)}); t.selectedIndex=1;}
$('#uc-type')?.addEventListener('change',e=>fill(e.target.value)); fill($('#uc-type')?.value||'length');
function convert(kind,val,from,to){if(kind==='temp'){let c;if(from==='C')c=val;if(from==='F')c=(val-32)*5/9;if(from==='K')c=val-273.15;if(to==='C')return c;if(to==='F')return c*9/5+32;if(to==='K')return c+273.15;} else {const m=sets[kind].units; return val*m[from]/m[to];}}
$('#uc-go')?.addEventListener('click',()=>{const k=$('#uc-type').value, v=+$('#uc-val').value, f=$('#uc-from').value, t=$('#uc-to').value; $('#uc-out').textContent=`${v} ${f} = ${fmt(convert(k,v,f,t))} ${t}`;});

// Passwords
function pick(n,str){let o=''; for(let i=0;i<n;i++) o+=str[Math.floor(Math.random()*str.length)]; return o;}
$('#pw-make')?.addEventListener('click',()=>{const len=Math.max(6,Math.min(64,+$('#pw-len').value||16)); let pool=''; if($('#pw-l').checked) pool+='abcdefghijklmnopqrstuvwxyz'; if($('#pw-u').checked) pool+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; if($('#pw-d').checked) pool+='0123456789'; if($('#pw-s').checked) pool+='!@#$%^&*()-_=+[]{};:,./?'; if(!pool){$('#pw-out').value='(select at least one set)'; return;} $('#pw-out').value=pick(len,pool);});
$('#pw-copy')?.addEventListener('click',async()=>{const v=$('#pw-out').value||''; if(!v) return; try{await navigator.clipboard.writeText(v); $('#pw-copy').textContent='Copied!'; setTimeout(()=>$('#pw-copy').textContent='Copy',1000);}catch(e){}});
