const KEY="finance-v1";
let state={accounts:["نقد"],tx:[],sel:null};
try{const s=localStorage.getItem(KEY);if(s){state=JSON.parse(s)}}catch(e){}
state.info=state.info||{};state.nums=state.nums||{};state.init=state.init||{};state.sheba=state.sheba||{};state.cards=state.cards||{};state.exp=state.exp||{};state.cvv=state.cvv||{};state.notes=state.notes||[];
function migrate(){if(!state.v){state.tx.forEach(x=>x.amount*=10);Object.keys(state.init).forEach(k=>state.init[k]*=10);state.v=2;persist()}}
let lang="fa",skin="classic";
try{const st=JSON.parse(localStorage.getItem("finance-set")||"{}");if(st.lang==="en")lang="en";if(["gold","pink","white"].indexOf(st.skin)>-1)skin=st.skin}catch(e){}
const LOC=()=>lang==="en"?"en-US":"fa-IR";
const fa=n=>Math.abs(n).toLocaleString(LOC());
const $=id=>document.getElementById(id);
const nsh=v=>{v=v.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/\s+/g,"").toUpperCase();return /^\d{24}$/.test(v)?"IR"+v:(v==="IR"?"":v)};
const nexp=v=>{const d=v.replace(/[۰-۹]/g,x=>"۰۱۲۳۴۵۶۷۸۹".indexOf(x)).replace(/\D/g,"").slice(0,4);return d.length>2?d.slice(0,2)+"/"+d.slice(2):d};
const ncvv=v=>v.replace(/[۰-۹]/g,x=>"۰۱۲۳۴۵۶۷۸۹".indexOf(x)).replace(/\D/g,"").slice(0,4);
const ncard=v=>v.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[\s-]/g,"");
const fcard=v=>v.replace(/(\d{4})(?=\d)/g,"$1 ");
const BANKS=[["بلو جونیور","#ff6a00"],["بلو","#2f7de1"],["ملی","#1d5fa8"],["ملت","#c8202f"],["صادرات","#1f4f9a"],["سپه","#e07b1a"],["تجارت","#17376b"],["رفاه","#2a7fc1"],["پاسارگاد","#8a6d1d"],["سامان","#1b8fd0"],["پارسیان","#8e1f5a"],["کشاورزی","#2e8b3d"],["مسکن","#d9651e"],["شهر","#c4382b"],["آینده","#3a9a6e"],["سینا","#3d5aa8"],["دی","#2b6f77"],["اقتصاد نوین","#6b3fa0"],["پست بانک","#2a9d4a"],["رسالت","#a0522d"],["مهر ایران","#d0a21c"],["توسعه تعاون","#5a7d2a"],["صنعت و معدن","#555f6b"],["توسعه صادرات","#2d5f8b"],["کارآفرین","#b5472e"],["گردشگری","#1f8a8a"],["ایران زمین","#7a4a9b"],["سرمایه","#2c6e91"],["قوامین","#6d7f2e"]];
// LOGOS (لوگوی بانک‌ها) در فایل logos.js تعریف شده است
const BENG={"ملی":"Melli","ملت":"Mellat","صادرات":"Saderat","سپه":"Sepah","تجارت":"Tejarat","رفاه":"Refah","پاسارگاد":"Pasargad","سامان":"Saman","پارسیان":"Parsian","کشاورزی":"Keshavarzi","مسکن":"Maskan","شهر":"Shahr","آینده":"Ayandeh","سینا":"Sina","دی":"Day","اقتصاد نوین":"Eghtesad Novin","پست بانک":"Post Bank","رسالت":"Resalat","مهر ایران":"Mehr Iran","توسعه تعاون":"Tosee Taavon","صنعت و معدن":"Sanat o Madan","توسعه صادرات":"Export Development","کارآفرین":"Karafarin","گردشگری":"Tourism","ایران زمین":"Iran Zamin","سرمایه":"Sarmayeh","قوامین":"Ghavamin","بلو":"Blu","بلو جونیور":"Blu Junior"};
const BALIAS={};
const bstrip=e=>e.replace(/^bank\s+/,"").replace(/\s+bank$/,"").trim();
Object.keys(BENG).forEach(k=>{const l=BENG[k].toLowerCase();BALIAS[l]=k;BALIAS[bstrip(l)]=k});
const norm=s=>{s=s.replace(/\u064a/g,"\u06cc").replace(/\u0643/g,"\u06a9").replace(/^بانک\s+/,"").replace(/^مهریران/,"مهر ایران").trim();const e=s.toLowerCase();return BALIAS[e]||BALIAS[bstrip(e)]||s};
function badge(name){const n=norm(name);const b=BANKS.find(k=>n===k[0]||n.startsWith(k[0]+" "));if(!b)return null;if(LOGOS[b[0]]){const i=document.createElement("img");i.src=LOGOS[b[0]];i.alt="";i.className="logoimg";return i}const s=document.createElement("span");s.className="logo";s.style.background=b[1];s.textContent=b[0][0];s.setAttribute("aria-hidden","true");return s}
function fillBanks(){const dl=$("banks");dl.innerHTML="";BANKS.forEach(k=>{const o=document.createElement("option");o.value=lang==="en"?(k[0]==="پست بانک"?BENG[k[0]]:BENG[k[0]]+" Bank"):(k[0]==="پست بانک"||k[0]==="بلو جونیور"?k[0]:k[0]==="بلو"?"بلو بانک":"بانک "+k[0]);dl.append(o)})}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function sum(txs,t){return txs.filter(x=>x.type===t).reduce((a,x)=>a+x.amount,0)}
function dropDefault(){const n="حساب بانکی";if(state.accounts.length>1&&state.accounts.includes(n)&&!state.tx.some(x=>x.acc===n)&&!(state.notes||[]).some(x=>x.acc===n)&&!state.init[n]){state.accounts=state.accounts.filter(a=>a!==n);if(state.sel===n)state.sel=null;["nums","cards","exp","cvv","sheba"].forEach(k=>{if(state[k])delete state[k][n]});persist()}}
function render(){migrate();dropDefault();
  const txs=state.sel===null?state.tx:state.tx.filter(x=>x.acc===state.sel);
  const base=state.sel===null?Object.values(state.init).reduce((a,v)=>a+v,0):(state.init[state.sel]||0);
  const inc=sum(txs.filter(x=>!x.tr),"in"),exp=sum(txs.filter(x=>!x.tr),"out"),bal=base+sum(txs,"in")-sum(txs,"out");
  $("bal").textContent=(bal<0?"−":"")+fa(bal);$("baltoman").textContent=(bal<0?"−":"")+fa(bal/10)+" تومان";
  $("inc").textContent=fa(inc)+" ریال";$("exp").textContent=fa(exp)+" ریال";
  const nm=((state.info.first||"")+" "+(state.info.last||"")).trim();$("hello").textContent=nm?"سلام، "+nm:"";
  $("scope").textContent=state.sel===null?"موجودی همه حساب‌ها":"موجودی "+state.sel;
  const dts=$("dots");dts.innerHTML="";if(state.accounts.length>1){[null].concat(state.accounts).forEach(a=>{const d=document.createElement("i");if(a===state.sel)d.className="on";dts.append(d)})}
  $("hero").style.cursor=state.accounts.length>1?"grab":"default";
  $("editnum").style.display=state.sel===null?"none":"flex";
  if(state.sel!==null&&document.activeElement!==$("curnum")){$("curnum").value=state.nums[state.sel]||"";$("cursheba").value=state.sheba[state.sel]||"";$("curcard").value=state.cards[state.sel]?fcard(state.cards[state.sel]):"";$("curexp").value=state.exp[state.sel]||"";$("curcvv").value=state.cvv[state.sel]||"";$("curcvv").type="password";$("togcvv").textContent="نمایش CVV2";$("curinit").value=state.init[state.sel]||"";$("curnum").placeholder="شماره حساب "+state.sel}
  const a=$("accs");a.innerHTML="";
  const mk=(name,val,sel)=>{const b=document.createElement("button");b.className="acc";b.type="button";
    b.setAttribute("aria-pressed",String(state.sel===sel));
    const n=document.createElement("b");n.textContent=name;const v=document.createElement("span");v.textContent=(val<0?"−":"")+fa(val)+" ریال";const tv=document.createElement("small");tv.style.display="block";tv.style.color="var(--muted)";tv.textContent=(val<0?"−":"")+fa(val/10)+" تومان";
    const lg=badge(name);if(lg)n.prepend(lg);b.append(n,v,tv);const num=state.nums&&state.nums[name];if(num){const z=document.createElement("small");z.style.display="block";z.style.color="var(--muted)";z.dir="ltr";z.textContent=num;b.append(z)}const crd=state.cards&&state.cards[name];if(crd){const z=document.createElement("small");z.style.display="block";z.style.color="var(--muted)";z.dir="ltr";z.textContent=fcard(crd)+(state.exp&&state.exp[name]?"  •  "+state.exp[name]:"");b.append(z)}const shb=state.sheba&&state.sheba[name];if(shb){const z=document.createElement("small");z.style.display="block";z.style.color="var(--muted)";z.style.fontSize="12px";z.dir="ltr";z.textContent=shb;b.append(z)}b.onclick=()=>{state.sel=sel;persist();if(sel!==null)$("txacc").value=sel;render()};a.append(b)};
  mk("همه",Object.values(state.init).reduce((a,v)=>a+v,0)+sum(state.tx,"in")-sum(state.tx,"out"),null);
  state.accounts.forEach(n=>{const t=state.tx.filter(x=>x.acc===n);mk(n,(state.init[n]||0)+sum(t,"in")-sum(t,"out"),n)});
  const ta=$("txacc"),curacc=ta.value;ta.innerHTML="";state.accounts.forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n;ta.append(o)});ta.value=state.accounts.includes(curacc)?curacc:(state.sel||state.accounts[0]);
  ["trfrom","trto"].forEach((id,i)=>{const s=$(id),c=s.value;s.innerHTML="";state.accounts.forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n;s.append(o)});s.value=state.accounts.includes(c)?c:(state.accounts[i]||state.accounts[0])});
  renderNotes();
  const exps={};txs.filter(x=>x.type==="out"&&!x.tr).forEach(x=>{const c=x.cat||"سایر";exps[c]=(exps[c]||0)+x.amount});
  const ch=$("chart");ch.innerHTML="";const mx=Math.max(0,...Object.values(exps));
  if(!mx)ch.innerHTML='<div class="empty">با ثبت هزینه، نمودار اینجا نمایش داده می‌شود.</div>';
  Object.entries(exps).sort((a,b)=>b[1]-a[1]).forEach(([c,v])=>{const r=document.createElement("div");r.className="bar";const n=document.createElement("span");n.textContent=c;const tr=document.createElement("i");const f=document.createElement("em");f.style.width=(v/mx*100)+"%";tr.append(f);const m=document.createElement("span");m.textContent=fa(v);r.append(n,tr,m);ch.append(r)});
  const q=$("q").value.trim();
  const shown=q?txs.filter(x=>((x.desc||"")+" "+(x.cat||"")).includes(q)):txs;
  const l=$("list");l.innerHTML="";
  if(!shown.length){l.innerHTML='<li class="empty">هنوز تراکنشی ثبت نشده. از بخش بالا اولین تراکنش را اضافه کنید.</li>';return}
  shown.slice().reverse().forEach(x=>{
    const li=document.createElement("li");
    const t=document.createElement("div");t.className="t";
    t.textContent=x.desc||(x.type==="in"?"درآمد":"هزینه");if(!x.tr){t.style.cursor="pointer";t.onclick=()=>startEdit(x)}
    const s=document.createElement("small");s.textContent=x.acc+" • "+(x.cat||"سایر")+" • "+new Date(x.date).toLocaleDateString(lang==="en"?"en-US-u-ca-persian-nu-latn":"fa-IR");t.append(s);
    const m=document.createElement("b");m.className=x.type;m.textContent=(x.type==="in"?"+":"−")+fa(x.amount);
    const d=document.createElement("button");d.type="button";d.textContent="×";d.setAttribute("aria-label","حذف");
    d.onclick=()=>{state.tx=state.tx.filter(y=>x.tid?y.tid!==x.tid:y.id!==x.id);persist();render()};
    const lg=badge(x.acc);if(lg)li.append(lg);li.append(t,m,d);l.append(li)});
}
const NMAP={"خوراکی":"خوراک"};
function renderNotes(){
  const s=$("nacc"),c=s.value;s.innerHTML="";state.accounts.forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n;s.append(o)});s.value=state.accounts.includes(c)?c:state.accounts[0];
  const box=$("notes");box.innerHTML="";
  if(!state.notes.length){box.innerHTML='<div class="empty">هنوز یادداشتی نداری. چیزهایی که می‌خوای بخری رو اینجا بنویس.</div>';return}
  const groups={};state.notes.forEach(n=>{(groups[n.cat]=groups[n.cat]||[]).push(n)});
  Object.keys(groups).forEach(cat=>{
    const h=document.createElement("div");h.className="ncat";h.textContent=cat;box.append(h);
    groups[cat].forEach(n=>{
      const row=document.createElement("div");row.className="note";
      const lg=badge(n.acc);if(lg)row.append(lg);
      const t=document.createElement("div");t.className="t";t.textContent=n.title;
      const sm=document.createElement("small");
      const t2=state.tx.filter(x=>x.acc===n.acc);const bl=(state.init[n.acc]||0)+sum(t2,"in")-sum(t2,"out");
      sm.textContent="با "+n.acc+(n.amount?" • "+fa(n.amount)+" ریال":"");
      if(n.amount&&n.amount>bl){sm.textContent+=" • موجودی کافی نیست";sm.style.color="var(--out)"}
      t.append(sm);
      const ok=document.createElement("button");ok.type="button";ok.className="nbtn";ok.textContent="خریدم";ok.onclick=()=>buyNote(n);
      const del=document.createElement("button");del.type="button";del.textContent="×";del.setAttribute("aria-label","حذف یادداشت");del.onclick=()=>{state.notes=state.notes.filter(x=>x.id!==n.id);persist();render()};
      row.append(t,ok,del);box.append(row)});
  });
}
function buyNote(n){pendNote=n.id;editId=null;$("type").value="out";$("amount").value=n.amount||"";$("desc").value=n.title;$("cat").value=NMAP[n.cat]||n.cat;$("txacc").value=n.acc;$("save").textContent="ثبت خرید";$("cancel").style.display="block";$("addbox").scrollIntoView({behavior:"smooth"});$("amount").focus()}
let editId=null,pendNote=null;
function resetForm(){editId=null;pendNote=null;$("amount").value="";$("desc").value="";$("save").textContent="ثبت تراکنش";$("cancel").style.display="none"}
function startEdit(x){pendNote=null;editId=x.id;$("type").value=x.type;$("amount").value=x.amount;$("desc").value=x.desc||"";$("cat").value=x.cat||"سایر";$("txacc").value=x.acc;$("save").textContent="ذخیره تغییرات";$("cancel").style.display="block";$("addbox").scrollIntoView({behavior:"smooth"});$("amount").focus()}
$("cancel").onclick=resetForm;
$("q").oninput=render;
$("save").onclick=()=>{
  const amount=parseFloat($("amount").value);
  if(!amount||amount<=0){$("amount").focus();return}
  const acc=$("txacc").value||state.accounts[0];
  const rec={type:$("type").value,amount,desc:$("desc").value.trim(),cat:$("cat").value,acc};
  if(editId){const x=state.tx.find(y=>y.id===editId);if(x)Object.assign(x,rec)}else state.tx.push({id:Date.now(),acc,date:Date.now(),...rec});if(pendNote)state.notes=state.notes.filter(n=>n.id!==pendNote);
  resetForm();persist();render();
};
$("addacc").onclick=()=>{
  const n=$("newname").value.trim();
  if(!n||state.accounts.includes(n))return;
  state.accounts.push(n);state.sel=n;const nu=$("newnum").value.trim();if(nu)state.nums[n]=nu;const sh=nsh($("newsheba").value);if(sh)state.sheba[n]=sh;const cd=ncard($("newcard").value);if(cd)state.cards[n]=cd;const ex=nexp($("newexp").value);if(ex)state.exp[n]=ex;const cv=ncvv($("newcvv").value);if(cv)state.cvv[n]=cv;const iv=parseFloat($("newinit").value);if(iv)state.init[n]=iv;$("newname").value="";$("newnum").value="";$("newsheba").value="";$("newcard").value="";$("newexp").value="";$("newcvv").value="";$("newinit").value="";persist();render();
};
$("fn").value=state.info.first||"";$("ln").value=state.info.last||"";$("bd").value=state.info.birth||"";
$("saveinfo").onclick=()=>{state.info={first:$("fn").value.trim(),last:$("ln").value.trim(),birth:$("bd").value.trim()};persist();render();$("infomsg").textContent="اطلاعات ذخیره شد."};
$("savenum").onclick=()=>{if(state.sel===null)return;const v=$("curnum").value.trim();if(v)state.nums[state.sel]=v;else delete state.nums[state.sel];const sh=nsh($("cursheba").value);if(sh)state.sheba[state.sel]=sh;else delete state.sheba[state.sel];const cd=ncard($("curcard").value);if(cd)state.cards[state.sel]=cd;else delete state.cards[state.sel];const ex=nexp($("curexp").value);if(ex)state.exp[state.sel]=ex;else delete state.exp[state.sel];const cv=ncvv($("curcvv").value);if(cv)state.cvv[state.sel]=cv;else delete state.cvv[state.sel];if(ex&&!/^(0[1-9]|1[0-2])\/\d{2}$/.test(ex))$("delmsg").textContent="فرمت تاریخ انقضا باید ماه/سال باشد (مثل ۰۵/۰۴)؛ بررسی کنید.";if(cv&&cv.length<3)$("delmsg").textContent="CVV2 معمولاً ۳ یا ۴ رقم است؛ بررسی کنید.";if(cd&&!/^\d{16}$/.test(cd))$("delmsg").textContent="شماره کارت معمولاً ۱۶ رقم است؛ ذخیره شد اما یک‌بار بررسی کنید.";if(sh&&!/^IR\d{24}$/.test(sh))$("delmsg").textContent="فرمت شبا معمولاً IR و ۲۴ رقم است؛ ذخیره شد اما یک‌بار بررسی کنید.";const iv=parseFloat($("curinit").value);if(iv)state.init[state.sel]=iv;else delete state.init[state.sel];persist();render()};
let delArm=null;
$("delacc").onclick=()=>{
  const n=state.sel;if(n===null)return;
  const m=$("delmsg");
  if(state.accounts.length<=1){m.textContent="آخرین حساب را نمی‌شود حذف کرد.";return}
  if(delArm!==n){delArm=n;$("delacc").textContent="مطمئنی؟ دوباره بزن";m.textContent="با حذف حساب، همه‌ی تراکنش‌های آن هم پاک می‌شود.";setTimeout(()=>{if(delArm===n){delArm=null;$("delacc").textContent="حذف حساب";m.textContent=""}},5000);return}
  state.accounts=state.accounts.filter(a=>a!==n);
  state.tx=state.tx.filter(x=>x.acc!==n);state.notes=state.notes.filter(x=>x.acc!==n);
  delete state.nums[n];delete state.exp[n];delete state.cvv[n];delete state.cards[n];delete state.sheba[n];delete state.init[n];
  state.sel=null;delArm=null;$("delacc").textContent="حذف حساب";m.textContent="";
  resetForm();persist();render();
};
$("trsave").onclick=()=>{
  const f=$("trfrom").value,t=$("trto").value,a=parseFloat($("tramount").value),m=$("trmsg");
  if(!a||a<=0){m.textContent="مبلغ را وارد کنید.";return}
  if(f===t){m.textContent="حساب مبدأ و مقصد نباید یکی باشد.";return}
  const id=Date.now();
  state.tx.push({id:id,tid:id,tr:true,type:"out",amount:a,desc:"انتقال به "+t,cat:"انتقال",acc:f,date:id});
  state.tx.push({id:id+1,tid:id,tr:true,type:"in",amount:a,desc:"انتقال از "+f,cat:"انتقال",acc:t,date:id});
  $("tramount").value="";m.textContent="انتقال ثبت شد.";persist();render();
};
$("togcvv").onclick=()=>{const i=$("curcvv"),h=i.type=="password";i.type=h?"text":"password";$("togcvv").textContent=h?"پنهان کردن CVV2":"نمایش CVV2"};
$("copycard").onclick=()=>{const v=ncard($("curcard").value),m=$("delmsg");if(!v){m.textContent="کارتی ثبت نشده.";return}$("curcard").select();try{navigator.clipboard.writeText(v).then(()=>{m.textContent="شماره کارت کپی شد."},()=>{m.textContent="شماره انتخاب شد؛ آن را کپی کنید."})}catch(e){m.textContent="شماره انتخاب شد؛ آن را کپی کنید."}};
const shIn=el=>{el.addEventListener("focus",()=>{if(!el.value)el.value="IR"});el.addEventListener("blur",()=>{if(el.value==="IR")el.value=""});el.addEventListener("input",()=>{const d=el.value.replace(/[۰-۹]/g,x=>"۰۱۲۳۴۵۶۷۸۹".indexOf(x)).replace(/\D/g,"").slice(0,24);el.value="IR"+d})};
shIn($("newsheba"));shIn($("cursheba"));
$("copysheba").onclick=()=>{const v=nsh($("cursheba").value),m=$("delmsg");if(!v){m.textContent="شبایی ثبت نشده.";return}$("cursheba").select();try{navigator.clipboard.writeText(v).then(()=>{m.textContent="شماره شبا کپی شد."},()=>{m.textContent="شماره انتخاب شد؛ آن را کپی کنید."})}catch(e){m.textContent="شماره انتخاب شد؛ آن را کپی کنید."}};
$("copynum").onclick=()=>{const v=$("curnum").value.trim(),m=$("delmsg");if(!v){m.textContent="شماره‌ای ثبت نشده.";return}$("curnum").select();try{navigator.clipboard.writeText(v).then(()=>{m.textContent="شماره کپی شد."},()=>{m.textContent="شماره انتخاب شد؛ آن را کپی کنید."})}catch(e){m.textContent="شماره انتخاب شد؛ آن را کپی کنید."}};
$("nadd").onclick=()=>{const t=$("ntitle").value.trim();if(!t){$("ntitle").focus();return}
  const a=parseFloat($("namount").value);
  state.notes.push({id:Date.now(),title:t,cat:$("ncat").value,amount:a>0?a:0,acc:$("nacc").value||state.accounts[0]});
  $("ntitle").value="";$("namount").value="";persist();render()};
$("bkout").onclick=()=>{
  const t=JSON.stringify({accounts:state.accounts,tx:state.tx,info:state.info,nums:state.nums,init:state.init,notes:state.notes,sheba:state.sheba,cards:state.cards,exp:state.exp,v:state.v});
  $("bk").value=t;$("bk").select();
  let ok=false;try{navigator.clipboard.writeText(t).then(()=>{$("bkmsg").textContent="پشتیبان کپی شد. آن را در یک یادداشت نگه دارید."},()=>{})}catch(e){}
  $("bkmsg").textContent="متن پشتیبان آماده است. آن را کپی کنید و در یک یادداشت نگه دارید.";
};
$("bkin").onclick=()=>{
  try{
    const d=JSON.parse($("bk").value);
    if(!Array.isArray(d.accounts)||!Array.isArray(d.tx))throw 0;
    state={accounts:d.accounts,tx:d.tx,sel:null,info:d.info||{},nums:d.nums||{},init:d.init||{},notes:d.notes||[],sheba:d.sheba||{},cards:d.cards||{},exp:d.exp||{},cvv:state.cvv||{},v:d.v};$("fn").value=state.info.first||"";$("ln").value=state.info.last||"";$("bd").value=state.info.birth||"";persist();render();
    $("bkmsg").textContent="اطلاعات بازیابی شد.";
  }catch(e){$("bkmsg").textContent="متن پشتیبان معتبر نیست. دوباره آن را کامل جای‌گذاری کنید."}
};
document.querySelectorAll("option:not([value])").forEach(o=>{o.value=o.textContent});
const EN={
"مدیریت زنو بانک":"Zeno Bank Management","تنظیمات":"Settings","تم":"Theme","روشن آبی":"Light blue","مشکی طلایی":"Black & gold","زبان":"Language","مشکی صورتی":"Black & pink","سفید":"White","درباره ما":"About us",
"موجودی همه حساب‌ها":"Balance, all accounts","ریال":"Rial","تومان":"Toman","کل درآمد":"Total income","کل هزینه":"Total expenses",
"حساب‌ها":"Accounts","همه":"All","حساب بانکی":"Bank account","نقد":"Cash",
"نام بانک (مثلاً ملت)":"Bank name (e.g. Mellat)","نام بانک":"Bank name",
"شماره حساب (اختیاری)":"Account number (optional)","شماره کارت (اختیاری)":"Card number (optional)","تاریخ انقضا (ماه/سال)":"Expiry (MM/YY)","CVV2 (اختیاری)":"CVV2 (optional)","شماره شبا (اختیاری)":"IBAN / Sheba (optional)","موجودی اولیه (ریال)":"Opening balance (Rial)",
"شماره حساب":"Account number","شماره کارت":"Card number","تاریخ انقضا":"Expiry","شماره شبا":"IBAN / Sheba","موجودی اولیه":"Opening balance","ویرایش شماره حساب":"Edit account number",
"افزودن بانک":"Add bank","ذخیره اطلاعات حساب":"Save account info","حذف حساب":"Delete account","نمایش CVV2":"Show CVV2","پنهان کردن CVV2":"Hide CVV2",
"کپی شماره حساب":"Copy account number","کپی شماره کارت":"Copy card number","کپی شبا":"Copy IBAN",
"مطمئنی؟ دوباره بزن":"Sure? Tap again","با حذف حساب، همه‌ی تراکنش‌های آن هم پاک می‌شود.":"Deleting the account also deletes all its transactions.","آخرین حساب را نمی‌شود حذف کرد.":"You can't delete the last account.",
"شماره‌ای ثبت نشده.":"No number saved.","شماره کپی شد.":"Number copied.","شماره انتخاب شد؛ آن را کپی کنید.":"Number selected; copy it manually.","شبایی ثبت نشده.":"No IBAN saved.","شماره شبا کپی شد.":"IBAN copied.","کارتی ثبت نشده.":"No card saved.","شماره کارت کپی شد.":"Card number copied.",
"فرمت شبا معمولاً IR و ۲۴ رقم است؛ ذخیره شد اما یک‌بار بررسی کنید.":"IBANs are usually IR plus 24 digits; saved, but please double-check.",
"شماره کارت معمولاً ۱۶ رقم است؛ ذخیره شد اما یک‌بار بررسی کنید.":"Card numbers are usually 16 digits; saved, but please double-check.",
"فرمت تاریخ انقضا باید ماه/سال باشد (مثل ۰۵/۰۴)؛ بررسی کنید.":"Expiry must be MM/YY (e.g. 05/04); please check.",
"CVV2 معمولاً ۳ یا ۴ رقم است؛ بررسی کنید.":"CVV2 is usually 3 or 4 digits; please check.",
"اطلاعات من":"My info","نام":"First name","نام خانوادگی":"Last name","تاریخ تولد (مثلاً ۱۳۷۰/۰۵/۱۲)":"Date of birth (e.g. 1991/07/03)","تاریخ تولد":"Date of birth","ذخیره اطلاعات":"Save info","اطلاعات ذخیره شد.":"Info saved.",
"ثبت تراکنش":"Add transaction","ثبت خرید":"Record purchase","ذخیره تغییرات":"Save changes","لغو ویرایش":"Cancel edit",
"درآمد (واریز)":"Income (deposit)","هزینه (برداشت)":"Expense (withdrawal)","نوع":"Type","مبلغ":"Amount","توضیح":"Description","حساب":"Account","دسته‌بندی":"Category",
"مبلغ (ریال)":"Amount (Rial)","توضیح (مثلاً حقوق، خرید)":"Description (e.g. salary, shopping)",
"خوراک":"Food","قبض":"Bills","حمل‌ونقل":"Transport","خرید":"Shopping","پوشاک":"Clothing","خانه":"Home","سلامت":"Health","آموزش":"Education","تفریح":"Leisure","حقوق":"Salary","سایر":"Other","خوراکی":"Groceries","درآمد":"Income","هزینه":"Expense",
"یادداشت خرید":"Shopping notes","چی می‌خوای بخری؟ (مثلاً نان و شیر)":"What do you want to buy? (e.g. bread and milk)","یادداشت":"Note","دسته":"Category","با کدوم حساب می‌خوای بخری؟":"Which account will you pay with?",
"مبلغ تقریبی (ریال، اختیاری)":"Estimated amount (Rial, optional)","مبلغ تقریبی":"Estimated amount","افزودن یادداشت":"Add note",
"هنوز یادداشتی نداری. چیزهایی که می‌خوای بخری رو اینجا بنویس.":"No notes yet. Write what you want to buy here.","خریدم":"Bought","حذف یادداشت":"Delete note","موجودی کافی نیست":"Insufficient balance",
"انتقال بین حساب‌ها":"Transfer between accounts","از حساب":"From account","به حساب":"To account","مبلغ انتقال (ریال)":"Transfer amount (Rial)","مبلغ انتقال":"Transfer amount","ثبت انتقال":"Record transfer",
"مبلغ را وارد کنید.":"Enter an amount.","حساب مبدأ و مقصد نباید یکی باشد.":"Source and destination must differ.","انتقال ثبت شد.":"Transfer recorded.","انتقال":"Transfer",
"هزینه‌ها بر اساس دسته":"Expenses by category","با ثبت هزینه، نمودار اینجا نمایش داده می‌شود.":"Record an expense and the chart will appear here.",
"تراکنش‌ها":"Transactions","(برای ویرایش، روی توضیح بزنید)":"(tap the description to edit)","جستجو در توضیح یا دسته":"Search description or category","جستجو":"Search",
"هنوز تراکنشی ثبت نشده. از بخش بالا اولین تراکنش را اضافه کنید.":"No transactions yet. Add your first one above.","حذف":"Delete",
"پشتیبان‌گیری":"Backup","متن پشتیبان اینجا نمایش داده می‌شود. برای بازیابی، متن را اینجا جای‌گذاری کنید.":"Backup text appears here. To restore, paste it here.","متن پشتیبان":"Backup text",
"تهیه پشتیبان":"Create backup","بازیابی از متن":"Restore from text","پشتیبان کپی شد. آن را در یک یادداشت نگه دارید.":"Backup copied. Keep it in a note.",
"متن پشتیبان آماده است. آن را کپی کنید و در یک یادداشت نگه دارید.":"Backup text is ready. Copy it and keep it in a note.","اطلاعات بازیابی شد.":"Data restored.",
"متن پشتیبان معتبر نیست. دوباره آن را کامل جای‌گذاری کنید.":"Backup text is invalid. Paste it again in full."
};
const HINT_EN="To add an account, enter the bank name. Account number, card number, IBAN (Sheba) and opening balance are optional and can be changed later. Never enter your card PIN. CVV2 is stored only in this browser and is not included in the backup.";
const nz=s=>s.replace(/\u200c/g,"").replace(/\u064a/g,"\u06cc").replace(/\u0643/g,"\u06a9").replace(/\s+/g," ").trim();
const ENN={};Object.keys(EN).forEach(k=>{ENN[nz(k)]=EN[k]});
const hasFa=s=>/[\u0600-\u06FF]/.test(s);
function trs(s){
  if(!hasFa(s))return s;
  const t=nz(s);
  if(ENN[t]!==undefined)return ENN[t];
  if(t.indexOf("برای افزودن حساب")===0)return HINT_EN;
  if(t.indexOf(" • ")>-1)return t.split(" • ").map(trs).join(" • ");
  let m;
  if(m=t.match(/^موجودی (.+)$/))return "Balance: "+trs(m[1]);
  if(m=t.match(/^سلام، (.+)$/))return "Hello, "+m[1];
  if(m=t.match(/^با (.+)$/))return "With "+trs(m[1]);
  if(m=t.match(/^انتقال به (.+)$/))return "Transfer to "+trs(m[1]);
  if(m=t.match(/^انتقال از (.+)$/))return "Transfer from "+trs(m[1]);
  if(m=t.match(/^شماره حساب (.+)$/))return "Account number "+trs(m[1]);
  if(m=t.match(/^(.+) ریال$/))return m[1]+" Rial";
  if(m=t.match(/^(.+) تومان$/))return m[1]+" Toman";
  return s;
}
function trAttrs(n){["placeholder","aria-label","title"].forEach(a=>{const v=n.getAttribute(a);if(v&&hasFa(v)){const r=trs(v);if(r!==v){(n.__faAttr=n.__faAttr||{})[a]=v;n.setAttribute(a,r)}}})}
function trNode(n){
  if(n.nodeType===3){const v=n.nodeValue;if(hasFa(v)){const r=trs(v);if(r!==v){n.__fa=v;n.nodeValue=v.match(/^\s*/)[0]+r+v.match(/\s*$/)[0]}}return}
  if(n.nodeType!==1||n.tagName==="SCRIPT"||n.tagName==="STYLE")return;
  trAttrs(n);n.childNodes.forEach(trNode);
}
function restoreNode(n){
  if(n.nodeType===3){if(n.__fa!==undefined){if(n.nodeValue.trim()===trs(n.__fa).trim())n.nodeValue=n.__fa;delete n.__fa}return}
  if(n.nodeType!==1||n.tagName==="SCRIPT"||n.tagName==="STYLE")return;
  if(n.__faAttr){Object.keys(n.__faAttr).forEach(a=>{const o=n.__faAttr[a];if(n.getAttribute(a)===trs(o))n.setAttribute(a,o)});delete n.__faAttr}
  n.childNodes.forEach(restoreNode);
}
const mo=new MutationObserver(ms=>{if(lang!=="en")return;ms.forEach(m=>{if(m.type==="childList")m.addedNodes.forEach(trNode);else if(m.type==="characterData")trNode(m.target);else if(m.type==="attributes")trAttrs(m.target)})});
mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","title"]});
function saveSet(){try{localStorage.setItem("finance-set",JSON.stringify({lang:lang,skin:skin}))}catch(e){}}
function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==="en"?"ltr":"rtl";
  document.documentElement.setAttribute("data-skin",skin);
  document.title=lang==="en"?"Zeno Bank Management":"مدیریت زنو بانک";
  fillBanks();
  if(lang==="en")trNode(document.body);else restoreNode(document.body);
  [["lang-fa",lang==="fa"],["lang-en",lang==="en"],["skin-classic",skin==="classic"],["skin-gold",skin==="gold"],["skin-pink",skin==="pink"],["skin-white",skin==="white"]].forEach(a=>$(a[0]).setAttribute("aria-pressed",String(a[1])));
}
const hero=$("hero");
let hx=0,hy=0,hdx=0,hdrag=false,hlock=false;
const HT=dx=>"perspective(900px) translateX("+dx*0.55+"px) rotateY("+Math.max(-16,Math.min(16,dx/9))+"deg)";
function heroSwap(dx){
  const sgn=dx<0?-1:1,w=hero.offsetWidth,o=[null].concat(state.accounts);
  const dir=(dx<0?1:-1)*(lang==="en"?1:-1);
  hero.style.transition="transform .16s ease-in,opacity .16s";
  hero.style.transform="perspective(900px) translateX("+sgn*w*0.9+"px) rotateY("+sgn*22+"deg)";hero.style.opacity="0";
  setTimeout(()=>{
    const i=o.indexOf(state.sel);state.sel=o[(i+dir+o.length)%o.length];
    if(state.sel!==null)$("txacc").value=state.sel;
    persist();render();
    hero.style.transition="none";hero.style.transform="perspective(900px) translateX("+(-sgn*w*0.9)+"px) rotateY("+(-sgn*22)+"deg)";
    void hero.offsetWidth;
    hero.style.transition="transform .24s ease-out,opacity .24s";hero.style.transform="";hero.style.opacity="1";
    setTimeout(()=>{hero.style.transition="";hero.style.opacity=""},260);
  },170);
}
hero.addEventListener("pointerdown",e=>{if(state.accounts.length<2)return;hx=e.clientX;hy=e.clientY;hdx=0;hdrag=true;hlock=false;hero.style.transition="none"});
hero.addEventListener("pointermove",e=>{if(!hdrag)return;const mx=e.clientX-hx,my=e.clientY-hy;if(!hlock){if(Math.abs(mx)>8&&Math.abs(mx)>Math.abs(my)){hlock=true;try{hero.setPointerCapture(e.pointerId)}catch(x){}}else if(Math.abs(my)>10){hdrag=false;hero.style.transition="";return}}if(hlock){hdx=mx;hero.style.transform=HT(mx)}});
const hend=()=>{if(!hdrag)return;hdrag=false;if(hlock&&Math.abs(hdx)>55)heroSwap(hdx);else{hero.style.transition="";hero.style.transform=""}hlock=false};
hero.addEventListener("pointerup",hend);hero.addEventListener("pointercancel",hend);
$("skin-pink").onclick=()=>{skin="pink";saveSet();applyLang()};
$("skin-white").onclick=()=>{skin="white";saveSet();applyLang()};
$("gear").onclick=()=>{const o=$("settings").classList.toggle("open");$("gear").setAttribute("aria-expanded",String(o))};
$("lang-fa").onclick=()=>{lang="fa";saveSet();applyLang();render()};
$("lang-en").onclick=()=>{lang="en";saveSet();applyLang();render()};
$("skin-classic").onclick=()=>{skin="classic";saveSet();applyLang()};
$("skin-gold").onclick=()=>{skin="gold";saveSet();applyLang()};
applyLang();
render();