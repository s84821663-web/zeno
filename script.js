const KEY="finance-v1";
let state={accounts:["نقد"],tx:[],sel:null};
try{const s=localStorage.getItem(KEY);if(s){state=JSON.parse(s)}}catch(e){}
state.info=state.info||{};state.nums=state.nums||{};state.init=state.init||{};state.sheba=state.sheba||{};state.cards=state.cards||{};state.exp=state.exp||{};state.cvv=state.cvv||{};state.notes=state.notes||[];state.debts=state.debts||[];state.goals=state.goals||[];state.dues=state.dues||[];state.cats=state.cats||[];state.assets=state.assets||[];state.rec=state.rec||[];
function migrate(){if(!state.v){state.tx.forEach(x=>x.amount*=10);Object.keys(state.init).forEach(k=>state.init[k]*=10);state.v=2;persist()}}
const SKINS=["classic","gold","pink","white","emerald","neon","ocean","sunset","red","petrol","copper","navygold","yellow","orange","cyber","forest","amoled","silver","cream","pastel","mint","ice","purplegold","tealsilver","icenight","pinkteal","greengold","chocolate","sky","lemon","sport","rainbow","paper","matrix","auto","custom"];
const CURS={USD:1,EUR:1,GBP:1,AED:1,TRY:1,CNY:1,JPY:1,RUB:1,KRW:1,SAR:1,CAD:1,CHF:1,INR:1};
let lang="fa",skin="classic",ccol="#e11d48",curCode="",curRates={};
try{const st=JSON.parse(localStorage.getItem("finance-set")||"{}");if(["fa","en","ar","es","fr","ru","tr","ja","ko","zh","it"].indexOf(st.lang)>-1)lang=st.lang;if(SKINS.indexOf(st.skin)>-1)skin=st.skin;if(/^#[0-9a-fA-F]{6}$/.test(st.color||""))ccol=st.color;if(CURS[st.cur])curCode=st.cur;if(st.rates&&typeof st.rates==="object")curRates=st.rates}catch(e){}
const LOCS={fa:"fa-IR",en:"en-US",ar:"ar-u-nu-latn",es:"es-ES",fr:"fr-FR",ru:"ru-RU",tr:"tr-TR",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",it:"it-IT"};
const LOC=()=>LOCS[lang]||"en-US";
const fa=n=>Math.abs(n).toLocaleString(LOC());
const $=id=>document.getElementById(id);
const nsh=v=>{v=v.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/\s+/g,"").toUpperCase();return /^\d{24}$/.test(v)?"IR"+v:(v==="IR"?"":v)};
const nexp=v=>{const d=v.replace(/[۰-۹]/g,x=>"۰۱۲۳۴۵۶۷۸۹".indexOf(x)).replace(/\D/g,"").slice(0,4);return d.length>2?d.slice(0,2)+"/"+d.slice(2):d};
const ncvv=v=>v.replace(/[۰-۹]/g,x=>"۰۱۲۳۴۵۶۷۸۹".indexOf(x)).replace(/\D/g,"").slice(0,4);
const ncard=v=>v.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[\s-]/g,"");
const fcard=v=>v.replace(/(\d{4})(?=\d)/g,"$1 ");
const BANKS=[["بلو جونیور","#ff6a00"],["بلو","#2f7de1"],["ملی","#1d5fa8"],["ملت","#c8202f"],["صادرات","#1f4f9a"],["سپه","#e07b1a"],["تجارت","#17376b"],["رفاه","#2a7fc1"],["پاسارگاد","#8a6d1d"],["سامان","#1b8fd0"],["پارسیان","#8e1f5a"],["کشاورزی","#2e8b3d"],["مسکن","#d9651e"],["شهر","#c4382b"],["آینده","#3a9a6e"],["سینا","#3d5aa8"],["دی","#2b6f77"],["اقتصاد نوین","#6b3fa0"],["پست بانک","#2a9d4a"],["رسالت","#a0522d"],["مهر ایران","#d0a21c"],["توسعه تعاون","#5a7d2a"],["صنعت و معدن","#555f6b"],["توسعه صادرات","#2d5f8b"],["کارآفرین","#b5472e"],["گردشگری","#1f8a8a"],["ایران زمین","#7a4a9b"],["سرمایه","#2c6e91"],["قوامین","#6d7f2e"],["JPMorgan Chase","#117aca"],["Bank of America","#e31837"],["Deutsche Bank","#0018a8"],["BNP Paribas","#00915a"],["HSBC","#db0011"],["Barclays","#00aeef"],["Emirates NBD","#c8102e"],["First Abu Dhabi Bank","#1f2a6b"],["Ziraat Bankası","#e30613"],["İş Bankası","#1f3a93"],["ICBC","#c7000b"],["Bank of China","#b01e2e"],["MUFG","#d4001a"],["Mizuho","#0a3a8e"],["Sberbank","#21a038"],["VTB","#0a2896"],["KB Kookmin","#ffbc00"],["Shinhan","#0046ff"],["Al Rajhi Bank","#005baa"],["Saudi National Bank","#1a6b3a"],["RBC","#005daa"],["TD Bank","#2c9a3c"],["UBS","#e60000"],["Zürcher Kantonalbank","#1f4e9a"],["State Bank of India","#22409a"],["HDFC Bank","#004c8f"]];
// LOGOS (لوگوی بانک‌ها) در فایل logos.js تعریف شده است
const BENG={"ملی":"Melli","ملت":"Mellat","صادرات":"Saderat","سپه":"Sepah","تجارت":"Tejarat","رفاه":"Refah","پاسارگاد":"Pasargad","سامان":"Saman","پارسیان":"Parsian","کشاورزی":"Keshavarzi","مسکن":"Maskan","شهر":"Shahr","آینده":"Ayandeh","سینا":"Sina","دی":"Day","اقتصاد نوین":"Eghtesad Novin","پست بانک":"Post Bank","رسالت":"Resalat","مهر ایران":"Mehr Iran","توسعه تعاون":"Tosee Taavon","صنعت و معدن":"Sanat o Madan","توسعه صادرات":"Export Development","کارآفرین":"Karafarin","گردشگری":"Tourism","ایران زمین":"Iran Zamin","سرمایه":"Sarmayeh","قوامین":"Ghavamin","بلو":"Blu","بلو جونیور":"Blu Junior"};
const BALIAS={};
const bstrip=e=>e.replace(/^bank\s+/,"").replace(/\s+bank$/,"").trim();
Object.keys(BENG).forEach(k=>{const l=BENG[k].toLowerCase();BALIAS[l]=k;BALIAS[bstrip(l)]=k});
const norm=s=>{s=s.replace(/\u064a/g,"\u06cc").replace(/\u0643/g,"\u06a9").replace(/^بانک\s+/,"").replace(/^مهریران/,"مهر ایران").trim();const e=s.toLowerCase();return BALIAS[e]||BALIAS[bstrip(e)]||s};
function badge(name){const n=norm(name);const b=BANKS.find(k=>{const a=k[0].toLowerCase(),nl=n.toLowerCase();return nl===a||nl.startsWith(a+" ")});if(!b)return null;if(LOGOS[b[0]]){const i=document.createElement("img");i.src=LOGOS[b[0]];i.alt="";i.className="logoimg";return i}const s=document.createElement("span");s.className="logo";s.style.background=b[1];s.textContent=b[0][0];s.setAttribute("aria-hidden","true");return s}
function fillBanks(){const dl=$("banks");dl.innerHTML="";BANKS.forEach(k=>{const o=document.createElement("option");o.value=!BENG[k[0]]?k[0]:lang!=="fa"?(k[0]==="پست بانک"?BENG[k[0]]:BENG[k[0]]+" Bank"):(k[0]==="پست بانک"||k[0]==="بلو جونیور"?k[0]:k[0]==="بلو"?"بلو بانک":"بانک "+k[0]);dl.append(o)})}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function sum(txs,t){return txs.filter(x=>x.type===t).reduce((a,x)=>a+x.amount,0)}
function dropDefault(){const n="حساب بانکی";if(state.accounts.length>1&&state.accounts.includes(n)&&!state.tx.some(x=>x.acc===n)&&!(state.notes||[]).some(x=>x.acc===n)&&!state.init[n]){state.accounts=state.accounts.filter(a=>a!==n);if(state.sel===n)state.sel=null;["nums","cards","exp","cvv","sheba"].forEach(k=>{if(state[k])delete state[k][n]});persist()}}
function render(){migrate();dropDefault();runRec();
  const txs=state.sel===null?state.tx:state.tx.filter(x=>x.acc===state.sel);
  const base=state.sel===null?Object.values(state.init).reduce((a,v)=>a+v,0):(state.init[state.sel]||0);
  const inc=sum(txs.filter(x=>!x.tr),"in"),exp=sum(txs.filter(x=>!x.tr),"out"),bal=base+sum(txs,"in")-sum(txs,"out");
  const CA=curActive();
  if(CA){$("bal").textContent=curNum(bal);$("balunit").textContent=curCode;$("baltoman").textContent=(bal<0?"−":"")+fa(bal)+" ریال • "+(bal<0?"−":"")+fa(bal/10)+" تومان"}
  else{$("bal").textContent=(bal<0?"−":"")+fa(bal);$("balunit").textContent="ریال";$("baltoman").textContent=(bal<0?"−":"")+fa(bal/10)+" تومان"}
  $("inc").textContent=CA?curStr(inc):fa(inc)+" ریال";$("exp").textContent=CA?curStr(exp):fa(exp)+" ریال";
  const nm=((state.info.first||"")+" "+(state.info.last||"")).trim();$("hello").textContent=nm?"سلام، "+nm:"";
  $("scope").textContent=state.sel===null?"موجودی همه حساب‌ها":"موجودی "+state.sel;
  const dts=$("dots");dts.innerHTML="";if(state.accounts.length>1){[null].concat(state.accounts).forEach(a=>{const d=document.createElement("i");if(a===state.sel)d.className="on";dts.append(d)})}
  $("hero").style.cursor=state.accounts.length>1?"grab":"default";
  $("editnum").style.display=state.sel===null?"none":"flex";
  if(state.sel!==null&&document.activeElement!==$("curnum")){$("curnum").value=state.nums[state.sel]||"";$("cursheba").value=state.sheba[state.sel]||"";$("curcard").value=state.cards[state.sel]?fcard(state.cards[state.sel]):"";$("curexp").value=state.exp[state.sel]||"";$("curcvv").value=state.cvv[state.sel]||"";$("curcvv").type="password";$("togcvv").textContent="نمایش CVV2";$("curinit").value=state.init[state.sel]||"";$("curnum").placeholder="شماره حساب "+state.sel}
  const a=$("accs");a.innerHTML="";
  const mk=(name,val,sel)=>{const b=document.createElement("button");b.className="acc";b.type="button";
    b.setAttribute("aria-pressed",String(state.sel===sel));
    const n=document.createElement("b");n.textContent=(state.main===name?"★ ":"")+name;const v=document.createElement("span");v.textContent=curActive()?curStr(val):(val<0?"−":"")+fa(val)+" ریال";const tv=document.createElement("small");tv.style.display="block";tv.style.color="var(--muted)";tv.textContent=curActive()?(val<0?"−":"")+fa(val)+" ریال • "+(val<0?"−":"")+fa(val/10)+" تومان":(val<0?"−":"")+fa(val/10)+" تومان";
    const lg=badge(name);if(lg)n.prepend(lg);b.append(n,v,tv);const num=state.nums&&state.nums[name];if(num){const z=document.createElement("small");z.style.display="block";z.style.color="var(--muted)";z.dir="ltr";z.textContent=num;b.append(z)}const crd=state.cards&&state.cards[name];if(crd){const z=document.createElement("small");z.style.display="block";z.style.color="var(--muted)";z.dir="ltr";z.textContent=fcard(crd)+(state.exp&&state.exp[name]?"  •  "+state.exp[name]:"");b.append(z)}const shb=state.sheba&&state.sheba[name];if(shb){const z=document.createElement("small");z.style.display="block";z.style.color="var(--muted)";z.style.fontSize="12px";z.dir="ltr";z.textContent=shb;b.append(z)}b.onclick=()=>{state.sel=sel;persist();if(sel!==null)$("txacc").value=sel;render()};a.append(b)};
  mk("همه",Object.values(state.init).reduce((a,v)=>a+v,0)+sum(state.tx,"in")-sum(state.tx,"out"),null);
  state.accounts.forEach(n=>{const t=state.tx.filter(x=>x.acc===n);mk(n,(state.init[n]||0)+sum(t,"in")-sum(t,"out"),n)});
  const ta=$("txacc"),curacc=ta.value;ta.innerHTML="";state.accounts.forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n;ta.append(o)});ta.value=state.accounts.includes(curacc)?curacc:(state.sel||state.main||state.accounts[0]);
  ["trfrom","trto"].forEach((id,i)=>{const s=$(id),c=s.value;s.innerHTML="";state.accounts.forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n;s.append(o)});s.value=state.accounts.includes(c)?c:(state.accounts[i]||state.accounts[0])});
  renderNotes();renderExtras();renderMore();
  const exps={};txs.filter(x=>x.type==="out"&&!x.tr).forEach(x=>{const c=x.cat||"سایر";exps[c]=(exps[c]||0)+x.amount});
  const ch=$("chart");ch.innerHTML="";const mx=Math.max(0,...Object.values(exps));
  if(!mx)ch.innerHTML='<div class="empty">با ثبت هزینه، نمودار اینجا نمایش داده می‌شود.</div>';
  Object.entries(exps).sort((a,b)=>b[1]-a[1]).forEach(([c,v])=>{const r=document.createElement("div");r.className="bar";const n=document.createElement("span");n.textContent=c;const tr=document.createElement("i");const f=document.createElement("em");f.style.width=(v/mx*100)+"%";tr.append(f);const m=document.createElement("span");m.textContent=fa(v);r.append(n,tr,m);ch.append(r)});
  const q=$("q").value.trim();
  const ft=$("ftype").value,fc=$("fcat").value,ff=$("ffrom").value,fo=$("fto").value,fm=parseFloat($("fmin").value),fM=parseFloat($("fmax").value);
  const shown=txs.filter(x=>(!q||((x.desc||"")+" "+(x.cat||"")).includes(q))&&(!ft||x.type===ft)&&(!fc||(x.cat||"سایر")===fc)&&(!ff||x.date>=new Date(ff+"T00:00:00").getTime())&&(!fo||x.date<=new Date(fo+"T23:59:59").getTime())&&(!(fm>0)||x.amount>=fm)&&(!(fM>0)||x.amount<=fM));
  const l=$("list");l.innerHTML="";
  if(!shown.length){l.innerHTML='<li class="empty">هنوز تراکنشی ثبت نشده. از بخش بالا اولین تراکنش را اضافه کنید.</li>';return}
  shown.slice().reverse().forEach(x=>{
    const li=document.createElement("li");
    const t=document.createElement("div");t.className="t";
    t.textContent=x.desc||(x.type==="in"?"درآمد":"هزینه");if(!x.tr){t.style.cursor="pointer";t.onclick=()=>startEdit(x)}
    const s=document.createElement("small");s.textContent=x.acc+" • "+(x.cat||"سایر")+" • "+new Date(x.date).toLocaleDateString(lang==="en"?"en-US-u-ca-persian-nu-latn":lang==="fa"?"fa-IR":LOC());t.append(s);
    const m=document.createElement("b");m.className=x.type;m.textContent=(x.type==="in"?"+":"−")+(curActive()?curStr(x.amount):fa(x.amount));
    const d=document.createElement("button");d.type="button";d.textContent="×";d.setAttribute("aria-label","حذف");
    d.onclick=()=>{state.tx=state.tx.filter(y=>x.tid?y.tid!==x.tid:y.id!==x.id);persist();render()};
    const lg=badge(x.acc);if(lg)li.append(lg);li.append(t,m,d);if(x.img){const im=mkEl("img","thumb");im.src=x.img;im.alt="";im.onclick=()=>{$("imgview").src=x.img;$("imgov").classList.add("open")};li.insertBefore(im,d)}l.append(li)});
}
const JF=new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn",{year:"numeric",month:"2-digit",day:"2-digit"});
function jnow(){const P={};JF.formatToParts(new Date()).forEach(p=>{P[p.type]=p.value});return{key:P.year+"/"+P.month,day:parseInt(P.day,10)}}
let recMsg=[];
function runRec(){const n=jnow();let ch=false;state.rec.forEach(r=>{if(r.last!==n.key&&n.day>=r.day&&state.accounts.includes(r.acc)){state.tx.push({id:Date.now()+Math.floor(Math.random()*1000),type:r.kind,amount:r.amount,desc:r.title,cat:"سایر",acc:r.acc,date:Date.now()});r.last=n.key;recMsg.push(r.title);ch=true}});if(ch)persist()}
function dueDays(d){return Math.ceil((new Date(d.date+"T00:00:00")-new Date().setHours(0,0,0,0))/864e5)}
function renderMore(){
  const fcs=$("fcat"),cv=fcs.value;fcs.innerHTML="";const o0=mkEl("option","","همه دسته‌ها");o0.value="";fcs.append(o0);
  ["خوراک","قبض","حمل‌ونقل","خرید","پوشاک","خانه","سلامت","آموزش","تفریح","حقوق","سایر","انتقال"].concat(state.cats).forEach(n=>{const o=mkEl("option","",n);o.value=n;fcs.append(o)});fcs.value=cv;
  const ra=$("racc"),rc=ra.value;ra.innerHTML="";state.accounts.forEach(n=>{const o=mkEl("option","",n);o.value=n;ra.append(o)});ra.value=state.accounts.includes(rc)?rc:state.accounts[0];
  const rl=$("recs");rl.innerHTML="";
  if(!state.rec.length)rl.append(mkEl("div","empty","موردی ثبت نشده."));
  state.rec.forEach(r=>{const row=mkEl("div","note");const t=mkEl("div","t",r.title);t.append(mkEl("small","",(r.kind==="in"?"درآمد":"هزینه")+" • "+fa(r.amount)+" ریال • هر ماه، روز "+fa(r.day)+" • "+r.acc));const del=mkEl("button","","×");del.type="button";del.setAttribute("aria-label","حذف");del.onclick=()=>{state.rec=state.rec.filter(x=>x.id!==r.id);persist();render()};row.append(t,del);rl.append(row)});
  const al=$("assets");al.innerHTML="";let tot=0;
  if(!state.assets.length)al.append(mkEl("div","empty","موردی ثبت نشده."));
  state.assets.forEach(a=>{const v=a.qty*a.price;tot+=v;const row=mkEl("div","note");const t=mkEl("div","t",a.name);t.append(mkEl("small","",fa(a.qty)+" × "+fa(a.price)+" ریال • "+fa(v)+" ریال"));const inp=mkEl("input");inp.type="number";inp.placeholder="قیمت هر واحد";inp.setAttribute("aria-label","قیمت هر واحد");const up=mkEl("button","nbtn","بروزرسانی");up.type="button";up.onclick=()=>{const q=parseFloat(inp.value);if(q>0){a.price=q;persist();render()}};const del=mkEl("button","","×");del.type="button";del.setAttribute("aria-label","حذف");del.onclick=()=>{state.assets=state.assets.filter(x=>x.id!==a.id);persist();render()};row.append(t,inp,up,del);al.append(row)});
  if(state.assets.length)al.append(mkEl("div","ncat","ارزش کل: "+fa(tot)+" ریال"));
  const ab=$("alerts");ab.innerHTML="";
  const soon=state.dues.filter(d=>dueDays(d)<=3);
  if(soon.length){const b=mkEl("div","alert");b.append(mkEl("b","","سررسید نزدیک"));soon.forEach(d=>{const k=dueDays(d);b.append(mkEl("div","",d.title+" • "+(k<0?"گذشته: "+fa(-k)+" روز":k===0?"امروز":fa(k)+" روز مانده")+" • "+fa(d.amount)+" ریال"))});ab.append(b);
    if(!window.__nt&&typeof Notification!=="undefined"&&Notification.permission==="granted"){window.__nt=1;try{new Notification("سررسید نزدیک",{body:soon.map(d=>d.title).join("، ")})}catch(e){}}}
  if(recMsg.length){const b=mkEl("div","alert");b.append(mkEl("b","","تراکنش تکراری ثبت شد"));recMsg.forEach(x=>b.append(mkEl("div","",x)));ab.append(b);recMsg=[]}
}
function mkEl(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function renderExtras(){
  ["cat","ncat"].forEach(id=>{const sl=$(id),c=sl.value;Array.from(sl.querySelectorAll("option[data-x]")).forEach(o=>o.remove());state.cats.forEach(n=>{const o=mkEl("option","",n);o.value=n;o.dataset.x=1;sl.append(o)});if(Array.from(sl.options).some(o=>o.value===c))sl.value=c});
  const cl=$("catlist");cl.innerHTML="";state.cats.forEach(n=>{const c=mkEl("span","chip",n);const b=mkEl("button","","×");b.type="button";b.setAttribute("aria-label","حذف");b.onclick=()=>{state.cats=state.cats.filter(x=>x!==n);persist();render()};c.append(b);cl.append(c)});
  const dl=$("debts");dl.innerHTML="";
  if(!state.debts.length)dl.append(mkEl("div","empty","موردی ثبت نشده."));
  state.debts.forEach(d=>{const r=mkEl("div","note");const t=mkEl("div","t",(d.kind==="owe"?"بدهکارم به ":"طلبکارم از ")+d.who);t.append(mkEl("small","",fa(d.amount)+" ریال"+(d.note?" • "+d.note:"")));const ok=mkEl("button","nbtn","تسویه شد");ok.type="button";ok.onclick=()=>{state.debts=state.debts.filter(x=>x.id!==d.id);persist();render()};r.append(t,ok);dl.append(r)});
  const gl=$("goals");gl.innerHTML="";
  if(!state.goals.length)gl.append(mkEl("div","empty","موردی ثبت نشده."));
  state.goals.forEach(g=>{const r=mkEl("div","note");const pct=Math.min(100,g.saved/g.target*100);const t=mkEl("div","t",g.title);t.append(mkEl("small","",fa(g.saved)+" / "+fa(g.target)+" ریال • "+fa(Math.round(pct))+"%"));const bar=mkEl("div","gbar");const f=mkEl("i");f.style.width=pct+"%";bar.append(f);t.append(bar);
    const inp=mkEl("input");inp.type="number";inp.placeholder="مبلغ (ریال)";inp.setAttribute("aria-label","مبلغ");
    const add=mkEl("button","nbtn","+ پس‌انداز");add.type="button";add.onclick=()=>{const v=parseFloat(inp.value);if(v>0){g.saved+=v;persist();render()}};
    const del=mkEl("button","","×");del.type="button";del.setAttribute("aria-label","حذف");del.onclick=()=>{state.goals=state.goals.filter(x=>x.id!==g.id);persist();render()};
    r.append(t,inp,add,del);gl.append(r)});
  const ul=$("dues");ul.innerHTML="";
  if(!state.dues.length)ul.append(mkEl("div","empty","موردی ثبت نشده."));
  const t0=new Date().setHours(0,0,0,0);
  state.dues.slice().sort((a,b)=>a.date.localeCompare(b.date)).forEach(d=>{const days=Math.ceil((new Date(d.date+"T00:00:00")-t0)/864e5);
    const r=mkEl("div","note");const t=mkEl("div","t",d.title);
    const txt=days<0?"گذشته: "+fa(-days)+" روز":days===0?"امروز":fa(days)+" روز مانده";
    const sm=mkEl("small","",fa(d.amount)+" ریال • "+txt+" • "+d.date);if(days<=3)sm.style.color="var(--out)";t.append(sm);
    const ok=mkEl("button","nbtn","پرداخت شد");ok.type="button";ok.onclick=()=>{state.dues=state.dues.filter(x=>x.id!==d.id);persist();render()};r.append(t,ok);ul.append(r)});
  const mons={};const fmt=new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn",{year:"numeric",month:"2-digit"});
  state.tx.filter(x=>!x.tr).forEach(x=>{const P={};fmt.formatToParts(new Date(x.date)).forEach(p=>{P[p.type]=p.value});const k=P.year+"/"+P.month;const m=mons[k]=mons[k]||{i:0,o:0};if(x.type==="in")m.i+=x.amount;else m.o+=x.amount});
  const keys=Object.keys(mons).sort().slice(-6);const tr=$("trend");tr.innerHTML="";
  if(!keys.length)tr.append(mkEl("div","empty","با ثبت تراکنش، روند ماهانه اینجا نمایش داده می‌شود."));
  const mxm=Math.max(1,...keys.map(k=>Math.max(mons[k].i,mons[k].o)));
  keys.forEach(k=>{const m=mons[k];const r=mkEl("div","bar");r.append(mkEl("span","",lang!=="fa"?k:k.replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d])));const w=mkEl("div","tb");const a=mkEl("i","a");a.style.width=(m.i/mxm*100)+"%";const b=mkEl("i","b");b.style.width=(m.o/mxm*100)+"%";w.append(a,b);r.append(w);const net=m.i-m.o;r.append(mkEl("span","",(net<0?"−":"+")+fa(net)));tr.append(r)});
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
function buyNote(n){pendNote=n.id;editId=null;$("type").value="out";$("amount").value=n.amount||"";$("desc").value=n.title;$("cat").value=NMAP[n.cat]||n.cat;$("txacc").value=n.acc;$("save").textContent="ثبت خرید";$("cancel").style.display="block";openMg("addtx");$("amount").focus()}
let editId=null,pendNote=null,pendImg=null;
function resetForm(){editId=null;pendNote=null;pendImg=null;$("rcpt").value="";$("amount").value="";$("desc").value="";$("save").textContent="ثبت تراکنش";$("cancel").style.display="none"}
function startEdit(x){pendNote=null;editId=x.id;$("type").value=x.type;$("amount").value=x.amount;$("desc").value=x.desc||"";$("cat").value=x.cat||"سایر";$("txacc").value=x.acc;$("save").textContent="ذخیره تغییرات";$("cancel").style.display="block";openMg("addtx");$("amount").focus()}
$("cancel").onclick=resetForm;
$("q").oninput=render;
$("save").onclick=()=>{
  const amount=parseFloat($("amount").value);
  if(!amount||amount<=0){$("amount").focus();return}
  const acc=$("txacc").value||state.accounts[0];
  const rec={type:$("type").value,amount,desc:$("desc").value.trim(),cat:$("cat").value,acc};if(pendImg)rec.img=pendImg;
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
  if(state.main===n)delete state.main;delete state.nums[n];delete state.exp[n];delete state.cvv[n];delete state.cards[n];delete state.sheba[n];delete state.init[n];
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
  const t=JSON.stringify({accounts:state.accounts,tx:state.tx.map(x=>{const y=Object.assign({},x);delete y.img;return y}),info:state.info,nums:state.nums,init:state.init,notes:state.notes,sheba:state.sheba,cards:state.cards,exp:state.exp,debts:state.debts,goals:state.goals,dues:state.dues,cats:state.cats,main:state.main,assets:state.assets,rec:state.rec,v:state.v});
  $("bk").value=t;$("bk").select();
  let ok=false;try{navigator.clipboard.writeText(t).then(()=>{$("bkmsg").textContent="پشتیبان کپی شد. آن را در یک یادداشت نگه دارید."},()=>{})}catch(e){}
  $("bkmsg").textContent="متن پشتیبان آماده است. آن را کپی کنید و در یک یادداشت نگه دارید.";
};
$("bkin").onclick=()=>{
  try{
    const d=JSON.parse($("bk").value);
    if(!Array.isArray(d.accounts)||!Array.isArray(d.tx))throw 0;
    state={accounts:d.accounts,tx:d.tx,sel:null,info:d.info||{},nums:d.nums||{},init:d.init||{},notes:d.notes||[],sheba:d.sheba||{},cards:d.cards||{},exp:d.exp||{},cvv:state.cvv||{},debts:d.debts||[],goals:d.goals||[],dues:d.dues||[],cats:d.cats||[],main:d.main,assets:d.assets||[],rec:d.rec||[],v:d.v};$("fn").value=state.info.first||"";$("ln").value=state.info.last||"";$("bd").value=state.info.birth||"";persist();render();
    $("bkmsg").textContent="اطلاعات بازیابی شد.";
  }catch(e){$("bkmsg").textContent="متن پشتیبان معتبر نیست. دوباره آن را کامل جای‌گذاری کنید."}
};
$("dadd").onclick=()=>{const w=$("dwho").value.trim(),a=parseFloat($("damt").value);if(!w||!(a>0))return;state.debts.push({id:Date.now(),kind:$("dkind").value,who:w,amount:a});$("dwho").value="";$("damt").value="";persist();render()};
$("gadd").onclick=()=>{const t=$("gtitle").value.trim(),a=parseFloat($("gtarget").value);if(!t||!(a>0))return;state.goals.push({id:Date.now(),title:t,target:a,saved:0});$("gtitle").value="";$("gtarget").value="";persist();render()};
$("uadd").onclick=()=>{const t=$("utitle").value.trim(),a=parseFloat($("uamt").value),d=$("udate").value;if(!t||!(a>0)||!d)return;state.dues.push({id:Date.now(),title:t,amount:a,date:d});$("utitle").value="";$("uamt").value="";$("udate").value="";persist();render()};
$("addcat").onclick=()=>{const n=$("newcat").value.trim();if(!n||state.cats.includes(n)||Array.from($("cat").options).some(o=>o.value===n))return;state.cats.push(n);$("newcat").value="";persist();render()};
$("csv").onclick=()=>{const rows=[["date","account","type","category","description","amount_rial"]];state.tx.forEach(x=>rows.push([new Date(x.date).toISOString().slice(0,10),x.acc,x.type==="in"?"income":"expense",x.cat||"",x.desc||"",x.amount]));const t="\ufeff"+rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(",")).join("\n");$("bk").value=t;$("bk").select();try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"text/csv"}));a.download="transactions.csv";a.click()}catch(e){}try{navigator.clipboard.writeText(t)}catch(e){}$("bkmsg").textContent="CSV آماده است. متن کپی شد؛ اگه فایل دانلود نشد، آن را در یک فایل .csv بچسبانید."};
$("radd").onclick=()=>{const t=$("rtitle").value.trim(),a=parseFloat($("ramt").value),d=parseInt($("rday").value,10);if(!t||!(a>0)||!(d>=1&&d<=31))return;const n=jnow();state.rec.push({id:Date.now(),kind:$("rkind").value,title:t,amount:a,day:d,acc:$("racc").value||state.accounts[0],last:d<n.day?n.key:""});$("rtitle").value="";$("ramt").value="";$("rday").value="";persist();render()};
$("aadd").onclick=()=>{const n=$("aname").value.trim(),q=parseFloat($("aqty").value),pr=parseFloat($("aprice").value);if(!n||!(q>0)||!(pr>0))return;state.assets.push({id:Date.now(),name:n,qty:q,price:pr});$("aname").value="";$("aqty").value="";$("aprice").value="";persist();render()};
$("sadd").onclick=()=>{const t=$("stitle").value.trim()||"تقسیم هزینه",tot=parseFloat($("stotal").value),paid=$("spaid").value.trim();const ppl=$("sppl").value.split(/[,،]/).map(x=>x.trim()).filter(Boolean);if(paid&&!ppl.includes(paid))ppl.push(paid);if(!(tot>0)||!ppl.length)return;const share=Math.round(tot/(ppl.length+1)),id=Date.now();if(paid)state.debts.push({id:id,kind:"owe",who:paid,amount:share,note:t});else ppl.forEach((p,i)=>state.debts.push({id:id+i,kind:"owed",who:p,amount:share,note:t}));$("stitle").value="";$("stotal").value="";$("spaid").value="";$("sppl").value="";persist();render()};
$("notif").onclick=()=>{try{Notification.requestPermission().then(p=>{$("notif").textContent=p==="granted"?"اعلان فعال شد":"اجازه داده نشد"})}catch(e){$("notif").textContent="مرورگر پشتیبانی نمی‌کند"}};
function mv(d){const a=state.accounts,i=a.indexOf(state.sel),j=i+d;if(i<0||j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];persist();render()}
$("mvup").onclick=()=>mv(-1);$("mvdn").onclick=()=>mv(1);
$("setmain").onclick=()=>{if(state.sel===null)return;state.main=state.sel;state.accounts=[state.sel].concat(state.accounts.filter(x=>x!==state.sel));persist();render()};
$("rcpt").onchange=e=>{const f=e.target.files[0];if(!f){pendImg=null;return}const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const sc=Math.min(1,700/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);c.getContext("2d").drawImage(im,0,0,c.width,c.height);pendImg=c.toDataURL("image/jpeg",0.55)};im.src=rd.result};rd.readAsDataURL(f)};
$("imgov").onclick=()=>$("imgov").classList.remove("open");
["ftype","fcat","ffrom","fto","fmin","fmax"].forEach(id=>$(id).addEventListener("input",render));
const mgmt=$("mgmt");
function openMg(t){showView(null);document.querySelector("main").classList.add("mgopen");mgShow(t);window.scrollTo(0,0)}
$("quickadd").onclick=()=>openMg("addtx");
function mgShow(t){mgmt.classList.toggle("sec",!!t);document.querySelectorAll(".mg").forEach(e=>e.classList.toggle("open",e.id==="mg-"+t))}
$("mgbtn").onclick=()=>{const m=document.querySelector("main"),was=m.classList.contains("mgopen");showView(null);if(!was){m.classList.add("mgopen");mgShow(null)}$("mgbtn").setAttribute("aria-expanded",String(!was));window.scrollTo(0,0)};
document.querySelectorAll(".mgbtn").forEach(b=>{b.onclick=()=>{mgShow(b.dataset.t);window.scrollTo(0,0)}});
document.querySelectorAll(".mgback").forEach(b=>{b.onclick=()=>mgShow(null)});
document.querySelectorAll("option:not([value])").forEach(o=>{o.value=o.textContent});
const EN={
"مدیریت زنو بانک":"Zeno Bank Management","تنظیمات":"Settings","تم":"Theme","روشن آبی":"Light blue","مشکی طلایی":"Black & gold","زبان":"Language","بنفش و طلایی":"Purple and gold","فیروزه‌ای و نقره‌ای":"Teal and silver","آبی یخی و سفید":"Ice night","صورتی و فیروزه‌ای":"Pink and teal","سبز و طلایی":"Green and gold","قهوه‌ای شکلاتی":"Chocolate","آسمانی":"Sky","لیمویی":"Lemon","اسپرت":"Sport","رنگین‌کمانی":"Rainbow","کاغذی":"Paper","سبز شب":"Matrix green","تایید":"Confirm","جستجو و فیلتر تراکنش‌ها":"Search and filter transactions","ارز":"Currency","بدون ارز":"None","نرخ: هر ۱ واحد این ارز، چند ریال؟":"Rate: how many Rial per 1 unit of this currency?","دلار آمریکا (USD)":"US dollar (USD)","یورو (EUR)":"Euro (EUR)","پوند انگلیس (GBP)":"British pound (GBP)","درهم امارات (AED)":"UAE dirham (AED)","لیر ترکیه (TRY)":"Turkish lira (TRY)","یوان چین (CNY)":"Chinese yuan (CNY)","ین ژاپن (JPY)":"Japanese yen (JPY)","روبل روسیه (RUB)":"Russian ruble (RUB)","وون کره (KRW)":"Korean won (KRW)","ریال عربستان (SAR)":"Saudi riyal (SAR)","دلار کانادا (CAD)":"Canadian dollar (CAD)","فرانک سوئیس (CHF)":"Swiss franc (CHF)","روپیه هند (INR)":"Indian rupee (INR)","قهوه‌ای و مس":"Brown and copper","سرمه‌ای و طلایی":"Navy and gold","زرد و مشکی":"Yellow and black","نارنجی و مشکی":"Orange and black","سایبرپانک":"Cyberpunk","سبز جنگلی":"Forest green","مشکی خالص":"Pure black (AMOLED)","صورتی پاستلی":"Pastel pink","سبز نعنایی":"Mint green","یخی":"Ice","تم‌ها":"Themes","سبز زمردی":"Emerald green","بنفش نئونی":"Neon purple","اقیانوسی":"Ocean","غروب":"Sunset","نقره‌ای":"Silver","سرخابی و کرم":"Rose and cream","خودکار":"Auto","تم دلخواه":"Custom","قرمز مشکی":"Red and black","آبی نفتی":"Petrol blue","رنگ اصلی":"Main color","مدیریت":"Management","بازگشت":"Back","تراکنش‌های تکراری":"Recurring transactions","روز ماه (۱ تا ۳۱)":"Day of month (1-31)","روز ماه":"Day of month","عنوان (مثلاً اجاره)":"Title (e.g. rent)","دارایی‌ها (ارز و طلا)":"Assets (currency and gold)","نام (مثلاً دلار، سکه)":"Name (e.g. dollar, coin)","نام دارایی":"Asset name","مقدار":"Quantity","قیمت هر واحد (ریال)":"Price per unit (Rial)","قیمت هر واحد":"Price per unit","افزودن دارایی":"Add asset","بروزرسانی":"Update","تقسیم هزینه":"Split expense","عنوان (مثلاً شام)":"Title (e.g. dinner)","مبلغ کل (ریال)":"Total amount (Rial)","مبلغ کل":"Total amount","چه کسی پرداخت کرد؟ (خالی = خودم)":"Who paid? (empty = me)","پرداخت‌کننده":"Payer","نام بقیه، با ویرگول جدا کن (مثلاً علی، سارا)":"Names of the others, comma-separated (e.g. Ali, Sara)","افراد":"People","تقسیم و ثبت در بدهی و طلب":"Split and add to debts","عکس رسید (اختیاری)":"Receipt photo (optional)","همه نوع‌ها":"All types","همه دسته‌ها":"All categories","از تاریخ":"From date","تا تاریخ":"To date","حداقل مبلغ":"Min amount","حداکثر مبلغ":"Max amount","سررسید نزدیک":"Due soon","تراکنش تکراری ثبت شد":"Recurring transaction posted","یادآوری":"Reminders","فعال‌سازی اعلان سررسید":"Enable due-date notifications","اعلان فعال شد":"Notifications enabled","اجازه داده نشد":"Permission denied","مرورگر پشتیبانی نمی‌کند":"Not supported by this browser","بالا":"Up","پایین":"Down","حساب اصلی":"Main account","بدهی و طلب":"Debts and receivables","بدهکارم":"I owe","طلبکارم":"Owed to me","نام شخص":"Person's name","افزودن":"Add","تسویه شد":"Settled","موردی ثبت نشده.":"Nothing yet.","هدف پس‌انداز":"Savings goals","هدف (مثلاً خرید گوشی)":"Goal (e.g. buy a phone)","هدف":"Goal","مبلغ هدف (ریال)":"Target amount (Rial)","مبلغ هدف":"Target amount","افزودن هدف":"Add goal","+ پس‌انداز":"+ Save","اقساط و چک‌ها":"Installments and checks","عنوان (مثلاً قسط وام)":"Title (e.g. loan installment)","عنوان":"Title","تاریخ سررسید":"Due date","پرداخت شد":"Paid","امروز":"Today","روند ماهانه":"Monthly trend","با ثبت تراکنش، روند ماهانه اینجا نمایش داده می‌شود.":"Record transactions and the monthly trend will appear here.","خروجی اکسل (CSV)":"Export to Excel (CSV)","دسته‌های من":"My categories","نام دسته جدید":"New category name","دسته جدید":"New category","CSV آماده است. متن کپی شد؛ اگه فایل دانلود نشد، آن را در یک فایل .csv بچسبانید.":"CSV is ready and copied. If no file downloaded, paste it into a .csv file.","مشکی صورتی":"Black & pink","سفید":"White","درباره ما":"About us",
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
const LANGKEYS=["fa","en","ar","es","fr","ru","tr","ja","ko","zh","it"];
const RTL=()=>lang==="fa"||lang==="ar";
const LT=[["Zeno Bank Management","إدارة زينو بنك","Gestión Zeno Bank","Gestion Zeno Bank","Управление Zeno Bank","Zeno Bank Yönetimi","Zeno Bank 管理","Zeno Bank 관리","Zeno Bank 管理","Gestione Zeno Bank"],["Settings","الإعدادات","Ajustes","Paramètres","Настройки","Ayarlar","設定","설정","设置","Impostazioni"],["Theme","السمة","Tema","Thème","Тема","Tema","テーマ","테마","主题","Tema"],["Themes","السمات","Temas","Thèmes","Темы","Temalar","テーマ","테마","主题","Temi"],["Language","اللغة","Idioma","Langue","Язык","Dil","言語","언어","语言","Lingua"],["About us","من نحن","Acerca de","À propos","О нас","Hakkımızda","私たちについて","소개","关于我们","Chi siamo"],["Management","الإدارة","Gestión","Gestion","Управление","Yönetim","管理","관리","管理","Gestione"],["Back","رجوع","Volver","Retour","Назад","Geri","戻る","뒤로","返回","Indietro"],["Balance, all accounts","الرصيد، كل الحسابات","Saldo, todas las cuentas","Solde, tous les comptes","Баланс, все счета","Bakiye, tüm hesaplar","残高(全口座)","잔액 (전체 계좌)","余额(所有账户)","Saldo, tutti i conti"],["Rial","ريال","rial","rial","риал","riyal","リアル","리알","里亚尔","rial"],["Toman","تومان","tomán","toman","туман","toman","トマン","토만","土曼","toman"],["Total income","إجمالي الدخل","Ingresos totales","Revenus totaux","Всего доходов","Toplam gelir","総収入","총 수입","总收入","Entrate totali"],["Total expenses","إجمالي المصروفات","Gastos totales","Dépenses totales","Всего расходов","Toplam gider","総支出","총 지출","总支出","Spese totali"],["Accounts","الحسابات","Cuentas","Comptes","Счета","Hesaplar","口座","계좌","账户","Conti"],["All","الكل","Todas","Tous","Все","Tümü","すべて","전체","全部","Tutti"],["Cash","نقدًا","Efectivo","Espèces","Наличные","Nakit","現金","현금","现金","Contanti"],["Bank account","حساب بنكي","Cuenta bancaria","Compte bancaire","Банковский счёт","Banka hesabı","銀行口座","은행 계좌","银行账户","Conto bancario"],["Bank name","اسم البنك","Nombre del banco","Nom de la banque","Название банка","Banka adı","銀行名","은행 이름","银行名称","Nome della banca"],["Bank name (e.g. Mellat)","اسم البنك (مثل ملت)","Nombre del banco (p. ej. Mellat)","Nom de la banque (ex. Mellat)","Название банка (напр. Mellat)","Banka adı (örn. Mellat)","銀行名(例: Mellat)","은행 이름 (예: Mellat)","银行名称(如 Mellat)","Nome della banca (es. Mellat)"],["Account number","رقم الحساب","Número de cuenta","Numéro de compte","Номер счёта","Hesap numarası","口座番号","계좌번호","账号","Numero di conto"],["Account number (optional)","رقم الحساب (اختياري)","Número de cuenta (opcional)","Numéro de compte (facultatif)","Номер счёта (необязательно)","Hesap numarası (isteğe bağlı)","口座番号(任意)","계좌번호 (선택)","账号(可选)","Numero di conto (facoltativo)"],["Card number","رقم البطاقة","Número de tarjeta","Numéro de carte","Номер карты","Kart numarası","カード番号","카드번호","卡号","Numero della carta"],["Card number (optional)","رقم البطاقة (اختياري)","Número de tarjeta (opcional)","Numéro de carte (facultatif)","Номер карты (необязательно)","Kart numarası (isteğe bağlı)","カード番号(任意)","카드번호 (선택)","卡号(可选)","Numero della carta (facoltativo)"],["Expiry (MM/YY)","تاريخ الانتهاء (شهر/سنة)","Caducidad (MM/AA)","Expiration (MM/AA)","Срок действия (ММ/ГГ)","Son kullanma (AA/YY)","有効期限(MM/YY)","유효기간 (MM/YY)","有效期(月/年)","Scadenza (MM/AA)"],["Expiry","تاريخ الانتهاء","Caducidad","Expiration","Срок действия","Son kullanma","有効期限","유효기간","有效期","Scadenza"],["IBAN / Sheba","IBAN / شبا","IBAN / Sheba","IBAN / Sheba","IBAN / Шеба","IBAN / Sheba","IBAN / シェバ","IBAN / 셰바","IBAN / Sheba","IBAN / Sheba"],["IBAN / Sheba (optional)","IBAN / شبا (اختياري)","IBAN / Sheba (opcional)","IBAN / Sheba (facultatif)","IBAN / Шеба (необязательно)","IBAN / Sheba (isteğe bağlı)","IBAN / シェバ(任意)","IBAN / 셰바 (선택)","IBAN / Sheba(可选)","IBAN / Sheba (facoltativo)"],["Opening balance","الرصيد الافتتاحي","Saldo inicial","Solde initial","Начальный баланс","Açılış bakiyesi","初期残高","초기 잔액","初始余额","Saldo iniziale"],["Opening balance (Rial)","الرصيد الافتتاحي (ريال)","Saldo inicial (rial)","Solde initial (rial)","Начальный баланс (риал)","Açılış bakiyesi (riyal)","初期残高(リアル)","초기 잔액 (리알)","初始余额(里亚尔)","Saldo iniziale (rial)"],["Add bank","إضافة بنك","Añadir banco","Ajouter une banque","Добавить банк","Banka ekle","銀行を追加","은행 추가","添加银行","Aggiungi banca"],["Save account info","حفظ بيانات الحساب","Guardar datos de la cuenta","Enregistrer le compte","Сохранить данные счёта","Hesap bilgilerini kaydet","口座情報を保存","계좌 정보 저장","保存账户信息","Salva dati conto"],["Delete account","حذف الحساب","Eliminar cuenta","Supprimer le compte","Удалить счёт","Hesabı sil","口座を削除","계좌 삭제","删除账户","Elimina conto"],["Show CVV2","إظهار CVV2","Mostrar CVV2","Afficher CVV2","Показать CVV2","CVV2 göster","CVV2を表示","CVV2 표시","显示 CVV2","Mostra CVV2"],["Hide CVV2","إخفاء CVV2","Ocultar CVV2","Masquer CVV2","Скрыть CVV2","CVV2 gizle","CVV2を隠す","CVV2 숨기기","隐藏 CVV2","Nascondi CVV2"],["Copy account number","نسخ رقم الحساب","Copiar nº de cuenta","Copier le n° de compte","Копировать номер счёта","Hesap no kopyala","口座番号をコピー","계좌번호 복사","复制账号","Copia n. conto"],["Copy card number","نسخ رقم البطاقة","Copiar nº de tarjeta","Copier le n° de carte","Копировать номер карты","Kart no kopyala","カード番号をコピー","카드번호 복사","复制卡号","Copia n. carta"],["Copy IBAN","نسخ IBAN","Copiar IBAN","Copier l'IBAN","Копировать IBAN","IBAN kopyala","IBANをコピー","IBAN 복사","复制 IBAN","Copia IBAN"],["Sure? Tap again","متأكد؟ اضغط مرة أخرى","¿Seguro? Pulsa otra vez","Sûr ? Appuyez encore","Уверены? Нажмите ещё раз","Emin misin? Tekrar dokun","本当に?もう一度タップ","확실한가요? 다시 누르세요","确定吗?再点一次","Sicuro? Tocca di nuovo"],["My info","معلوماتي","Mis datos","Mes infos","Мои данные","Bilgilerim","マイ情報","내 정보","我的信息","I miei dati"],["First name","الاسم الأول","Nombre","Prénom","Имя","Ad","名","이름","名","Nome"],["Last name","اسم العائلة","Apellido","Nom","Фамилия","Soyad","姓","성","姓","Cognome"],["Date of birth","تاريخ الميلاد","Fecha de nacimiento","Date de naissance","Дата рождения","Doğum tarihi","生年月日","생년월일","出生日期","Data di nascita"],["Save info","حفظ المعلومات","Guardar datos","Enregistrer","Сохранить","Bilgileri kaydet","情報を保存","정보 저장","保存信息","Salva dati"],["Add transaction","إضافة معاملة","Añadir transacción","Ajouter une transaction","Добавить операцию","İşlem ekle","取引を追加","거래 추가","添加交易","Aggiungi transazione"],["Record purchase","تسجيل الشراء","Registrar compra","Enregistrer l'achat","Записать покупку","Alışverişi kaydet","購入を記録","구매 기록","记录购买","Registra acquisto"],["Save changes","حفظ التغييرات","Guardar cambios","Enregistrer les modifications","Сохранить изменения","Değişiklikleri kaydet","変更を保存","변경 저장","保存更改","Salva modifiche"],["Cancel edit","إلغاء التعديل","Cancelar edición","Annuler la modification","Отменить правку","Düzenlemeyi iptal et","編集をキャンセル","수정 취소","取消编辑","Annulla modifica"],["Income (deposit)","دخل (إيداع)","Ingreso (depósito)","Revenu (dépôt)","Доход (пополнение)","Gelir (yatırma)","収入(入金)","수입 (입금)","收入(存入)","Entrata (deposito)"],["Expense (withdrawal)","مصروف (سحب)","Gasto (retirada)","Dépense (retrait)","Расход (снятие)","Gider (çekme)","支出(出金)","지출 (출금)","支出(取出)","Spesa (prelievo)"],["Type","النوع","Tipo","Type","Тип","Tür","種類","유형","类型","Tipo"],["Amount","المبلغ","Importe","Montant","Сумма","Tutar","金額","금액","金额","Importo"],["Description","الوصف","Descripción","Description","Описание","Açıklama","説明","설명","说明","Descrizione"],["Account","الحساب","Cuenta","Compte","Счёт","Hesap","口座","계좌","账户","Conto"],["Category","الفئة","Categoría","Catégorie","Категория","Kategori","カテゴリ","카테고리","类别","Categoria"],["Amount (Rial)","المبلغ (ريال)","Importe (rial)","Montant (rial)","Сумма (риал)","Tutar (riyal)","金額(リアル)","금액 (리알)","金额(里亚尔)","Importo (rial)"],["Description (e.g. salary, shopping)","الوصف (مثل راتب، تسوق)","Descripción (p. ej. sueldo, compras)","Description (ex. salaire, courses)","Описание (напр. зарплата, покупки)","Açıklama (örn. maaş, alışveriş)","説明(例: 給料、買い物)","설명 (예: 급여, 쇼핑)","说明(如工资、购物)","Descrizione (es. stipendio, spesa)"],["Food","طعام","Comida","Alimentation","Еда","Yemek","食費","식비","餐饮","Cibo"],["Bills","فواتير","Facturas","Factures","Счета","Faturalar","公共料金","공과금","账单","Bollette"],["Transport","مواصلات","Transporte","Transport","Транспорт","Ulaşım","交通","교통","交通","Trasporti"],["Shopping","تسوق","Compras","Shopping","Покупки","Alışveriş","買い物","쇼핑","购物","Shopping"],["Clothing","ملابس","Ropa","Vêtements","Одежда","Giyim","衣服","의류","服装","Abbigliamento"],["Home","المنزل","Hogar","Maison","Дом","Ev","住居","주거","家居","Casa"],["Health","الصحة","Salud","Santé","Здоровье","Sağlık","健康","건강","健康","Salute"],["Education","التعليم","Educación","Éducation","Образование","Eğitim","教育","교육","教育","Istruzione"],["Leisure","ترفيه","Ocio","Loisirs","Досуг","Eğlence","娯楽","여가","娱乐","Tempo libero"],["Salary","راتب","Sueldo","Salaire","Зарплата","Maaş","給料","급여","工资","Stipendio"],["Other","أخرى","Otros","Autre","Другое","Diğer","その他","기타","其他","Altro"],["Groceries","بقالة","Supermercado","Courses","Продукты","Market","食料品","식료품","食品杂货","Alimentari"],["Income","دخل","Ingreso","Revenu","Доход","Gelir","収入","수입","收入","Entrata"],["Expense","مصروف","Gasto","Dépense","Расход","Gider","支出","지출","支出","Spesa"],["Shopping notes","ملاحظات التسوق","Notas de compras","Notes d'achats","Заметки о покупках","Alışveriş notları","買い物メモ","쇼핑 메모","购物备忘","Note di acquisto"],["Note","ملاحظة","Nota","Note","Заметка","Not","メモ","메모","备忘","Nota"],["What do you want to buy? (e.g. bread and milk)","ماذا تريد أن تشتري؟ (مثل خبز وحليب)","¿Qué quieres comprar? (p. ej. pan y leche)","Que voulez-vous acheter ? (ex. pain et lait)","Что хотите купить? (напр. хлеб и молоко)","Ne almak istiyorsun? (örn. ekmek ve süt)","何を買いますか?(例: パンと牛乳)","무엇을 사고 싶나요? (예: 빵과 우유)","想买什么?(如面包和牛奶)","Cosa vuoi comprare? (es. pane e latte)"],["Which account will you pay with?","بأي حساب ستدفع؟","¿Con qué cuenta pagarás?","Avec quel compte paierez-vous ?","С какого счёта заплатите?","Hangi hesapla ödeyeceksin?","どの口座で支払いますか?","어느 계좌로 결제하시나요?","用哪个账户支付?","Con quale conto pagherai?"],["Estimated amount (Rial, optional)","المبلغ التقديري (ريال، اختياري)","Importe estimado (rial, opcional)","Montant estimé (rial, facultatif)","Примерная сумма (риал, необязательно)","Tahmini tutar (riyal, isteğe bağlı)","概算金額(リアル、任意)","예상 금액 (리알, 선택)","预估金额(里亚尔,可选)","Importo stimato (rial, facoltativo)"],["Add note","إضافة ملاحظة","Añadir nota","Ajouter une note","Добавить заметку","Not ekle","メモを追加","메모 추가","添加备忘","Aggiungi nota"],["Bought","تم الشراء","Comprado","Acheté","Куплено","Satın alındı","購入済み","구매함","已购买","Acquistato"],["Insufficient balance","الرصيد غير كافٍ","Saldo insuficiente","Solde insuffisant","Недостаточно средств","Yetersiz bakiye","残高不足","잔액 부족","余额不足","Saldo insufficiente"],["Transfer between accounts","تحويل بين الحسابات","Transferencia entre cuentas","Virement entre comptes","Перевод между счетами","Hesaplar arası transfer","口座間送金","계좌 간 이체","账户间转账","Trasferimento tra conti"],["From account","من حساب","Desde la cuenta","Du compte","Со счёта","Gönderen hesap","送金元口座","출금 계좌","转出账户","Dal conto"],["To account","إلى حساب","A la cuenta","Vers le compte","На счёт","Alıcı hesap","送金先口座","입금 계좌","转入账户","Al conto"],["Transfer amount (Rial)","مبلغ التحويل (ريال)","Importe a transferir (rial)","Montant du virement (rial)","Сумма перевода (риал)","Transfer tutarı (riyal)","送金額(リアル)","이체 금액 (리알)","转账金额(里亚尔)","Importo del trasferimento (rial)"],["Record transfer","تسجيل التحويل","Registrar transferencia","Enregistrer le virement","Записать перевод","Transferi kaydet","送金を記録","이체 기록","记录转账","Registra trasferimento"],["Transfer","تحويل","Transferencia","Virement","Перевод","Transfer","送金","이체","转账","Trasferimento"],["Expenses by category","المصروفات حسب الفئة","Gastos por categoría","Dépenses par catégorie","Расходы по категориям","Kategoriye göre giderler","カテゴリ別支出","카테고리별 지출","按类别支出","Spese per categoria"],["Transactions","المعاملات","Transacciones","Transactions","Операции","İşlemler","取引","거래 내역","交易","Transazioni"],["(tap the description to edit)","(اضغط على الوصف للتعديل)","(toca la descripción para editar)","(touchez la description pour modifier)","(нажмите на описание, чтобы изменить)","(düzenlemek için açıklamaya dokun)","(説明をタップして編集)","(설명을 눌러 수정)","(点按说明即可编辑)","(tocca la descrizione per modificare)"],["Search description or category","ابحث في الوصف أو الفئة","Buscar descripción o categoría","Rechercher description ou catégorie","Поиск по описанию или категории","Açıklama veya kategori ara","説明またはカテゴリを検索","설명 또는 카테고리 검색","搜索说明或类别","Cerca descrizione o categoria"],["Search","بحث","Buscar","Rechercher","Поиск","Ara","検索","검색","搜索","Cerca"],["Delete","حذف","Eliminar","Supprimer","Удалить","Sil","削除","삭제","删除","Elimina"],["Backup","النسخ الاحتياطي","Copia de seguridad","Sauvegarde","Резервная копия","Yedekleme","バックアップ","백업","备份","Backup"],["Create backup","إنشاء نسخة احتياطية","Crear copia","Créer une sauvegarde","Создать копию","Yedek oluştur","バックアップを作成","백업 만들기","创建备份","Crea backup"],["Restore from text","استعادة من النص","Restaurar desde texto","Restaurer depuis le texte","Восстановить из текста","Metinden geri yükle","テキストから復元","텍스트에서 복원","从文本恢复","Ripristina dal testo"],["Export to Excel (CSV)","تصدير إلى Excel (CSV)","Exportar a Excel (CSV)","Exporter vers Excel (CSV)","Экспорт в Excel (CSV)","Excel'e aktar (CSV)","Excelにエクスポート(CSV)","Excel로 내보내기 (CSV)","导出到 Excel(CSV)","Esporta in Excel (CSV)"],["Debts and receivables","الديون والمستحقات","Deudas y cobros","Dettes et créances","Долги и займы","Borçlar ve alacaklar","借金と貸金","빚과 받을 돈","债务与应收款","Debiti e crediti"],["I owe","أنا مدين","Debo","Je dois","Я должен","Borçluyum","借りている","내가 빚짐","我欠","Devo"],["Owed to me","مدين لي","Me deben","On me doit","Мне должны","Bana borçlu","貸している","받을 돈","欠我","Mi devono"],["Person's name","اسم الشخص","Nombre de la persona","Nom de la personne","Имя человека","Kişinin adı","相手の名前","상대 이름","对方姓名","Nome della persona"],["Add","إضافة","Añadir","Ajouter","Добавить","Ekle","追加","추가","添加","Aggiungi"],["Settled","تمت التسوية","Saldado","Réglé","Погашено","Kapatıldı","精算済み","정산됨","已结清","Saldato"],["Nothing yet.","لا شيء بعد.","Nada todavía.","Rien pour l'instant.","Пока ничего.","Henüz yok.","まだありません。","아직 없습니다.","暂无内容。","Ancora niente."],["Savings goals","أهداف الادخار","Metas de ahorro","Objectifs d'épargne","Цели накоплений","Birikim hedefleri","貯蓄目標","저축 목표","储蓄目标","Obiettivi di risparmio"],["Goal (e.g. buy a phone)","الهدف (مثل شراء هاتف)","Meta (p. ej. comprar un móvil)","Objectif (ex. acheter un téléphone)","Цель (напр. купить телефон)","Hedef (örn. telefon almak)","目標(例: スマホ購入)","목표 (예: 휴대폰 구입)","目标(如买手机)","Obiettivo (es. comprare un telefono)"],["Goal","الهدف","Meta","Objectif","Цель","Hedef","目標","목표","目标","Obiettivo"],["Target amount (Rial)","المبلغ المستهدف (ريال)","Importe objetivo (rial)","Montant cible (rial)","Целевая сумма (риал)","Hedef tutar (riyal)","目標額(リアル)","목표 금액 (리알)","目标金额(里亚尔)","Importo obiettivo (rial)"],["Target amount","المبلغ المستهدف","Importe objetivo","Montant cible","Целевая сумма","Hedef tutar","目標額","목표 금액","目标金额","Importo obiettivo"],["Add goal","إضافة هدف","Añadir meta","Ajouter un objectif","Добавить цель","Hedef ekle","目標を追加","목표 추가","添加目标","Aggiungi obiettivo"],["+ Save","+ ادخار","+ Ahorrar","+ Épargner","+ Отложить","+ Biriktir","+ 貯める","+ 저축","+ 存入","+ Risparmia"],["Installments and checks","الأقساط والشيكات","Cuotas y cheques","Échéances et chèques","Платежи и чеки","Taksitler ve çekler","分割払いと小切手","할부와 수표","分期与支票","Rate e assegni"],["Title (e.g. loan installment)","العنوان (مثل قسط القرض)","Título (p. ej. cuota del préstamo)","Titre (ex. échéance du prêt)","Название (напр. платёж по кредиту)","Başlık (örn. kredi taksiti)","タイトル(例: ローン返済)","제목 (예: 대출 상환)","标题(如贷款分期)","Titolo (es. rata del prestito)"],["Title","العنوان","Título","Titre","Название","Başlık","タイトル","제목","标题","Titolo"],["Due date","تاريخ الاستحقاق","Fecha de vencimiento","Date d'échéance","Срок платежа","Vade tarihi","支払期日","만기일","到期日","Scadenza"],["Paid","تم الدفع","Pagado","Payé","Оплачено","Ödendi","支払い済み","납부함","已支付","Pagato"],["Today","اليوم","Hoy","Aujourd'hui","Сегодня","Bugün","今日","오늘","今天","Oggi"],["Recurring transactions","المعاملات المتكررة","Transacciones recurrentes","Transactions récurrentes","Регулярные операции","Yinelenen işlemler","定期取引","반복 거래","定期交易","Transazioni ricorrenti"],["Day of month (1-31)","يوم الشهر (1-31)","Día del mes (1-31)","Jour du mois (1-31)","День месяца (1-31)","Ayın günü (1-31)","日付(1~31)","날짜 (1-31)","每月几号(1-31)","Giorno del mese (1-31)"],["Day of month","يوم الشهر","Día del mes","Jour du mois","День месяца","Ayın günü","日付","날짜","每月几号","Giorno del mese"],["Title (e.g. rent)","العنوان (مثل الإيجار)","Título (p. ej. alquiler)","Titre (ex. loyer)","Название (напр. аренда)","Başlık (örn. kira)","タイトル(例: 家賃)","제목 (예: 월세)","标题(如房租)","Titolo (es. affitto)"],["Assets (currency and gold)","الأصول (عملات وذهب)","Activos (divisas y oro)","Actifs (devises et or)","Активы (валюта и золото)","Varlıklar (döviz ve altın)","資産(通貨・金)","자산 (통화와 금)","资产(货币与黄金)","Beni (valuta e oro)"],["Name (e.g. dollar, coin)","الاسم (مثل دولار، عملة ذهبية)","Nombre (p. ej. dólar, moneda)","Nom (ex. dollar, pièce)","Название (напр. доллар, монета)","Ad (örn. dolar, sikke)","名前(例: ドル、金貨)","이름 (예: 달러, 금화)","名称(如美元、金币)","Nome (es. dollaro, moneta)"],["Asset name","اسم الأصل","Nombre del activo","Nom de l'actif","Название актива","Varlık adı","資産名","자산 이름","资产名称","Nome del bene"],["Quantity","الكمية","Cantidad","Quantité","Количество","Miktar","数量","수량","数量","Quantità"],["Price per unit (Rial)","سعر الوحدة (ريال)","Precio por unidad (rial)","Prix unitaire (rial)","Цена за единицу (риал)","Birim fiyat (riyal)","単価(リアル)","단가 (리알)","单价(里亚尔)","Prezzo unitario (rial)"],["Price per unit","سعر الوحدة","Precio por unidad","Prix unitaire","Цена за единицу","Birim fiyat","単価","단가","单价","Prezzo unitario"],["Add asset","إضافة أصل","Añadir activo","Ajouter un actif","Добавить актив","Varlık ekle","資産を追加","자산 추가","添加资产","Aggiungi bene"],["Update","تحديث","Actualizar","Mettre à jour","Обновить","Güncelle","更新","업데이트","更新","Aggiorna"],["Split expense","تقسيم المصروف","Dividir gasto","Partager une dépense","Разделить расход","Gideri böl","費用を分割","비용 나누기","分摊费用","Dividi la spesa"],["Title (e.g. dinner)","العنوان (مثل عشاء)","Título (p. ej. cena)","Titre (ex. dîner)","Название (напр. ужин)","Başlık (örn. akşam yemeği)","タイトル(例: 夕食)","제목 (예: 저녁 식사)","标题(如晚餐)","Titolo (es. cena)"],["Total amount (Rial)","المبلغ الإجمالي (ريال)","Importe total (rial)","Montant total (rial)","Общая сумма (риал)","Toplam tutar (riyal)","合計金額(リアル)","총 금액 (리알)","总金额(里亚尔)","Importo totale (rial)"],["Total amount","المبلغ الإجمالي","Importe total","Montant total","Общая сумма","Toplam tutar","合計金額","총 금액","总金额","Importo totale"],["Who paid? (empty = me)","من دفع؟ (فارغ = أنا)","¿Quién pagó? (vacío = yo)","Qui a payé ? (vide = moi)","Кто платил? (пусто = я)","Kim ödedi? (boş = ben)","誰が支払った?(空欄=自分)","누가 냈나요? (비우면 나)","谁付的?(留空=我)","Chi ha pagato? (vuoto = io)"],["Payer","الدافع","Pagador","Payeur","Плательщик","Ödeyen","支払者","결제자","付款人","Pagante"],["Split and add to debts","قسّم وأضف إلى الديون","Dividir y añadir a deudas","Partager et ajouter aux dettes","Разделить и добавить в долги","Böl ve borçlara ekle","分割して借金に追加","나누고 빚에 추가","分摊并加入债务","Dividi e aggiungi ai debiti"],["Receipt photo (optional)","صورة الإيصال (اختياري)","Foto del recibo (opcional)","Photo du reçu (facultatif)","Фото чека (необязательно)","Fiş fotoğrafı (isteğe bağlı)","レシート写真(任意)","영수증 사진 (선택)","收据照片(可选)","Foto della ricevuta (facoltativo)"],["All types","كل الأنواع","Todos los tipos","Tous les types","Все типы","Tüm türler","すべての種類","모든 유형","所有类型","Tutti i tipi"],["All categories","كل الفئات","Todas las categorías","Toutes les catégories","Все категории","Tüm kategoriler","すべてのカテゴリ","모든 카테고리","所有类别","Tutte le categorie"],["From date","من تاريخ","Desde la fecha","À partir du","С даты","Başlangıç tarihi","開始日","시작일","起始日期","Dalla data"],["To date","إلى تاريخ","Hasta la fecha","Jusqu'au","По дату","Bitiş tarihi","終了日","종료일","截止日期","Alla data"],["Min amount","الحد الأدنى للمبلغ","Importe mínimo","Montant minimum","Мин. сумма","Min. tutar","最小金額","최소 금액","最低金额","Importo minimo"],["Max amount","الحد الأقصى للمبلغ","Importe máximo","Montant maximum","Макс. сумма","Maks. tutar","最大金額","최대 금액","最高金额","Importo massimo"],["Due soon","استحقاق قريب","Vence pronto","Échéance proche","Скоро срок","Yakında vadesi doluyor","まもなく期日","곧 만기","即将到期","In scadenza"],["Recurring transaction posted","تم تسجيل معاملة متكررة","Transacción recurrente registrada","Transaction récurrente enregistrée","Регулярная операция проведена","Yinelenen işlem kaydedildi","定期取引を記録しました","반복 거래가 기록되었습니다","已记录定期交易","Transazione ricorrente registrata"],["Monthly trend","الاتجاه الشهري","Tendencia mensual","Tendance mensuelle","Динамика по месяцам","Aylık eğilim","月別推移","월별 추이","月度趋势","Andamento mensile"],["Reminders","التذكيرات","Recordatorios","Rappels","Напоминания","Hatırlatmalar","リマインダー","알림","提醒","Promemoria"],["Enable due-date notifications","تفعيل إشعارات الاستحقاق","Activar avisos de vencimiento","Activer les notifications d'échéance","Включить уведомления о сроках","Vade bildirimlerini aç","期日の通知を有効にする","만기 알림 켜기","开启到期通知","Attiva notifiche di scadenza"],["My categories","فئاتي","Mis categorías","Mes catégories","Мои категории","Kategorilerim","マイカテゴリ","내 카테고리","我的类别","Le mie categorie"],["New category name","اسم الفئة الجديدة","Nombre de la nueva categoría","Nom de la nouvelle catégorie","Название новой категории","Yeni kategori adı","新しいカテゴリ名","새 카테고리 이름","新类别名称","Nome della nuova categoria"],["New category","فئة جديدة","Nueva categoría","Nouvelle catégorie","Новая категория","Yeni kategori","新しいカテゴリ","새 카테고리","新类别","Nuova categoria"],["Main account","الحساب الرئيسي","Cuenta principal","Compte principal","Основной счёт","Ana hesap","メイン口座","주 계좌","主账户","Conto principale"],["Up","أعلى","Arriba","Haut","Вверх","Yukarı","上へ","위로","上移","Su"],["Down","أسفل","Abajo","Bas","Вниз","Aşağı","下へ","아래로","下移","Giù"],["Main color","اللون الرئيسي","Color principal","Couleur principale","Основной цвет","Ana renk","メインカラー","메인 색상","主色","Colore principale"],["Add account","إضافة حساب","Añadir cuenta","Ajouter un compte","Добавить счёт","Hesap ekle","口座を追加","계좌 추가","添加账户","Aggiungi conto"]];
const PAT={"en":{"bal":"Balance: {0}","hello":"Hello, {0}","with":"With {0}","tto":"Transfer to {0}","tfrom":"Transfer from {0}","acct":"Account number {0}","owe":"I owe {0}","owed":"Owed by {0}","left":"{0} days left","over":"Overdue: {0} days","total":"Total value: {0} Rial","monthly":"Monthly, day {0}","rial":"{0} Rial","toman":"{0} Toman"},"ar":{"bal":"الرصيد: {0}","hello":"مرحبًا، {0}","with":"بواسطة {0}","tto":"تحويل إلى {0}","tfrom":"تحويل من {0}","acct":"رقم الحساب {0}","owe":"أنا مدين لـ {0}","owed":"{0} مدين لي","left":"متبقي {0} يومًا","over":"متأخر: {0} يومًا","total":"القيمة الإجمالية: {0} ريال","monthly":"شهريًا، اليوم {0}","rial":"{0} ريال","toman":"{0} تومان"},"es":{"bal":"Saldo: {0}","hello":"Hola, {0}","with":"Con {0}","tto":"Transferencia a {0}","tfrom":"Transferencia de {0}","acct":"Cuenta n.º {0}","owe":"Debo a {0}","owed":"Me debe {0}","left":"Faltan {0} días","over":"Vencido: {0} días","total":"Valor total: {0} rial","monthly":"Mensual, día {0}","rial":"{0} rial","toman":"{0} tomán"},"fr":{"bal":"Solde : {0}","hello":"Bonjour, {0}","with":"Avec {0}","tto":"Virement vers {0}","tfrom":"Virement de {0}","acct":"Compte n° {0}","owe":"Je dois à {0}","owed":"{0} me doit","left":"Encore {0} jours","over":"En retard : {0} jours","total":"Valeur totale : {0} rial","monthly":"Mensuel, jour {0}","rial":"{0} rial","toman":"{0} toman"},"ru":{"bal":"Баланс: {0}","hello":"Здравствуйте, {0}","with":"Через {0}","tto":"Перевод на {0}","tfrom":"Перевод от {0}","acct":"Номер счёта {0}","owe":"Я должен {0}","owed":"Должен мне: {0}","left":"Осталось дней: {0}","over":"Просрочено: {0} дн.","total":"Общая стоимость: {0} риал","monthly":"Ежемесячно, день {0}","rial":"{0} риал","toman":"{0} туман"},"tr":{"bal":"Bakiye: {0}","hello":"Merhaba, {0}","with":"{0} ile","tto":"{0} hesabına transfer","tfrom":"{0} hesabından transfer","acct":"Hesap no {0}","owe":"{0} kişisine borcum var","owed":"{0} bana borçlu","left":"{0} gün kaldı","over":"Gecikmiş: {0} gün","total":"Toplam değer: {0} riyal","monthly":"Aylık, ayın {0}. günü","rial":"{0} riyal","toman":"{0} toman"},"ja":{"bal":"残高: {0}","hello":"こんにちは、{0}さん","with":"{0}で","tto":"{0}へ送金","tfrom":"{0}から送金","acct":"口座番号 {0}","owe":"{0}に借り","owed":"{0}から貸し","left":"残り{0}日","over":"期限超過: {0}日","total":"合計価値: {0} リアル","monthly":"毎月 {0}日","rial":"{0} リアル","toman":"{0} トマン"},"ko":{"bal":"잔액: {0}","hello":"안녕하세요, {0}님","with":"{0}(으)로","tto":"{0}(으)로 이체","tfrom":"{0}에서 이체","acct":"계좌번호 {0}","owe":"{0}에게 빚짐","owed":"{0}에게 받을 돈","left":"{0}일 남음","over":"기한 초과: {0}일","total":"총 가치: {0} 리알","monthly":"매월 {0}일","rial":"{0} 리알","toman":"{0} 토만"},"zh":{"bal":"余额:{0}","hello":"你好,{0}","with":"通过 {0}","tto":"转账给 {0}","tfrom":"来自 {0} 的转账","acct":"账号 {0}","owe":"我欠 {0}","owed":"{0} 欠我","left":"还剩 {0} 天","over":"已逾期:{0} 天","total":"总价值:{0} 里亚尔","monthly":"每月 {0} 日","rial":"{0} 里亚尔","toman":"{0} 土曼"},"it":{"bal":"Saldo: {0}","hello":"Ciao, {0}","with":"Con {0}","tto":"Bonifico a {0}","tfrom":"Bonifico da {0}","acct":"Conto n. {0}","owe":"Devo a {0}","owed":"{0} mi deve","left":"Mancano {0} giorni","over":"Scaduto: {0} giorni","total":"Valore totale: {0} rial","monthly":"Mensile, giorno {0}","rial":"{0} rial","toman":"{0} toman"}};
LT.push(...[["Currency","العملة","Moneda","Devise","Валюта","Para birimi","通貨","통화","货币","Valuta"],["None","بدون","Ninguna","Aucune","Нет","Yok","なし","없음","无","Nessuna"]]);
LT.push(...[["Search and filter transactions","البحث وتصفية المعاملات","Buscar y filtrar transacciones","Rechercher et filtrer les transactions","Поиск и фильтр операций","İşlemleri ara ve filtrele","取引の検索とフィルター","거래 검색 및 필터","搜索和筛选交易","Cerca e filtra transazioni"]]);
LT.push(...[["Confirm","تأكيد","Confirmar","Confirmer","Подтвердить","Onayla","確定","확인","确认","Conferma"]]);
const LI={ar:1,es:2,fr:3,ru:4,tr:5,ja:6,ko:7,zh:8,it:9};
const LTM={};LT.forEach(r=>{LTM[r[0]]=r});
const DICT={};Object.keys(LI).forEach(L=>{DICT[L]={};Object.keys(EN).forEach(k=>{const r=LTM[EN[k]];if(r)DICT[L][nz(k)]=r[LI[L]]})});
const pf=(k,x)=>((PAT[lang]||PAT.en)[k]||PAT.en[k]).replace("{0}",x);
const hasFa=s=>/[\u0600-\u06FF]/.test(s);
function trs(s){
  if(lang==="fa"||!hasFa(s))return s;
  const t=nz(s);
  const D=DICT[lang];
  if(D&&D[t]!==undefined)return D[t];
  if(ENN[t]!==undefined)return ENN[t];
  if(t.indexOf("برای افزودن حساب")===0)return HINT_EN;
  if(t.indexOf(" • ")>-1)return t.split(" • ").map(trs).join(" • ");
  let m;
  if(m=t.match(/^موجودی (.+)$/))return pf("bal",trs(m[1]));
  if(m=t.match(/^سلام، (.+)$/))return pf("hello",m[1]);
  if(m=t.match(/^با (.+)$/))return pf("with",trs(m[1]));
  if(m=t.match(/^انتقال به (.+)$/))return pf("tto",trs(m[1]));
  if(m=t.match(/^انتقال از (.+)$/))return pf("tfrom",trs(m[1]));
  if(m=t.match(/^شماره حساب (.+)$/))return pf("acct",trs(m[1]));
  if(m=t.match(/^بدهکارم به (.+)$/))return pf("owe",m[1]);
  if(m=t.match(/^طلبکارم از (.+)$/))return pf("owed",m[1]);
  if(m=t.match(/^(.+) روز مانده$/))return pf("left",m[1]);
  if(m=t.match(/^گذشته: (.+) روز$/))return pf("over",m[1]);
  if(m=t.match(/^ارزش کل: (.+) ریال$/))return pf("total",m[1]);
  if(m=t.match(/^هر ماه، روز (.+)$/))return pf("monthly",m[1]);
  if(m=t.match(/^(.+) ریال$/))return pf("rial",m[1]);
  if(m=t.match(/^(.+) تومان$/))return pf("toman",m[1]);
  return s;
}
function trAttrs(n){["placeholder","aria-label","title"].forEach(a=>{const v=n.getAttribute(a);if(v&&hasFa(v)){const r=trs(v);if(r!==v){(n.__faAttr=n.__faAttr||{})[a]=[v,r];n.setAttribute(a,r)}}})}
function trNode(n){
  if(n.nodeType===3){const v=n.nodeValue;if(hasFa(v)){const r=trs(v);if(r!==v){const o=v.match(/^\s*/)[0]+r+v.match(/\s*$/)[0];n.__fa=[v,o];n.nodeValue=o}}return}
  if(n.nodeType!==1||n.tagName==="SCRIPT"||n.tagName==="STYLE")return;
  trAttrs(n);n.childNodes.forEach(trNode);
}
function restoreNode(n){
  if(n.nodeType===3){if(n.__fa){if(n.nodeValue===n.__fa[1])n.nodeValue=n.__fa[0];delete n.__fa}return}
  if(n.nodeType!==1||n.tagName==="SCRIPT"||n.tagName==="STYLE")return;
  if(n.__faAttr){Object.keys(n.__faAttr).forEach(a=>{const o=n.__faAttr[a];if(n.getAttribute(a)===o[1])n.setAttribute(a,o[0])});delete n.__faAttr}
  n.childNodes.forEach(restoreNode);
}
const mo=new MutationObserver(ms=>{if(lang==="fa")return;ms.forEach(m=>{if(m.type==="childList")m.addedNodes.forEach(trNode);else if(m.type==="characterData")trNode(m.target);else if(m.type==="attributes")trAttrs(m.target)})});
mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","title"]});
function effSkin(){if(skin!=="auto")return skin;const h=new Date().getHours();return h>=6&&h<18?"classic":"ocean"}
function hx2(h){return[1,3,5].map(i=>parseInt(h.slice(i,i+2),16))}
function mixc(a,b,t){const x=hx2(a),y=hx2(b);return"#"+x.map((v,i)=>Math.round(v*(1-t)+y[i]*t).toString(16).padStart(2,"0")).join("")}
function applySkin(){
  const e=effSkin(),r=document.documentElement;
  r.setAttribute("data-skin",e);
  if(skin==="auto"&&e==="classic")r.setAttribute("data-theme","light");else r.removeAttribute("data-theme");
  ["--bg","--surface","--ink","--muted","--line","--accent","--onaccent","--hero1","--hero2","--soft","--glow"].forEach(k=>r.style.removeProperty(k));
  if(e==="custom"){const a=ccol,d="#0a0a0f",c=hx2(a),lum=(0.299*c[0]+0.587*c[1]+0.114*c[2])/255;
    const v={"--bg":mixc(d,a,.06),"--surface":mixc(d,a,.12),"--line":mixc(d,a,.24),"--soft":mixc(d,a,.2),"--ink":mixc("#ffffff",a,.08),"--muted":mixc("#9ca3af",a,.3),"--accent":a,"--onaccent":lum>0.55?"#111111":"#ffffff","--hero1":mixc("#000000",a,.55),"--hero2":a,"--glow":"rgba("+c.join(",")+",.45)"};
    Object.keys(v).forEach(k=>r.style.setProperty(k,v[k]))}
}
function saveSet(){try{localStorage.setItem("finance-set",JSON.stringify({lang:lang,skin:skin,color:ccol,cur:curCode,rates:curRates}))}catch(e){}}
const curActive=()=>!!(curCode&&curRates[curCode]>0);
function curNum(val){return(val<0?"−":"")+Math.abs(val/curRates[curCode]).toLocaleString(LOC(),{maximumFractionDigits:2})}
function curStr(val){if(!curCode||!(curRates[curCode]>0))return"";const x=Math.abs(val/curRates[curCode]);return(val<0?"−":"")+x.toLocaleString(LOC(),{maximumFractionDigits:2})+" "+curCode}
function applyCur(){$("curval").textContent=curCode||"بدون ارز";$("cursel").value=curCode;$("ratebox").style.display=curCode?"flex":"none";$("currate").value=curCode&&curRates[curCode]?curRates[curCode]:""}
$("cursel").onchange=()=>{curCode=$("cursel").value;saveSet();applyCur();render()};
$("currate").oninput=()=>{const v=parseFloat($("currate").value);if(curCode)curRates[curCode]=v>0?v:0;saveSet();render()};
function applyLang(){
  applyCur();
  document.documentElement.lang=lang;document.documentElement.dir=RTL()?"rtl":"ltr";
  applySkin();
  fillBanks();
  restoreNode(document.body);
  if(lang!=="fa")trNode(document.body);
  document.title=trs("مدیریت زنو بانک");
  LANGKEYS.forEach(k=>$("lang-"+k).setAttribute("aria-pressed",String(lang===k)));
  $("langname").textContent=$("lang-"+lang).querySelector(".tname").textContent;$("langflag").textContent=$("lang-"+lang).querySelector(".flag").textContent;
  SKINS.forEach(k=>$("skin-"+k).setAttribute("aria-pressed",String(skin===k)));$("custrow").style.display=skin==="custom"?"block":"none";const cb=$("skin-"+skin);$("curdot").style.background=cb.querySelector(".tprev").style.background;$("curname").textContent=cb.querySelector(".tname").textContent;
}
const hero=$("hero");
let hx=0,hy=0,hdx=0,hdrag=false,hlock=false;
const HT=dx=>"perspective(900px) translateX("+dx*0.55+"px) rotateY("+Math.max(-16,Math.min(16,dx/9))+"deg)";
function heroSwap(dx){
  const sgn=dx<0?-1:1,w=hero.offsetWidth,o=[null].concat(state.accounts);
  const dir=(dx<0?1:-1)*(RTL()?-1:1);
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
$("gear").onclick=()=>{showView(null);const o=$("settings").classList.toggle("open");$("gear").setAttribute("aria-expanded",String(o))};
LANGKEYS.forEach(k=>{$("lang-"+k).onclick=()=>{lang=k;saveSet();applyLang();render()}});
$("langbtn").onclick=()=>{const m=document.querySelector("main");m.classList.remove("mgopen","themeopen");m.classList.add("langopen");window.scrollTo(0,0)};
$("langback").onclick=()=>{document.querySelector("main").classList.remove("langopen");window.scrollTo(0,0)};
$("skin-classic").onclick=()=>{skin="classic";saveSet();applyLang()};
$("skin-gold").onclick=()=>{skin="gold";saveSet();applyLang()};
let SNAP=null;
function showView(v){const m=document.querySelector("main");m.classList.remove("themeopen","langopen","pgopen","mgopen");document.querySelectorAll(".pg.open").forEach(e=>e.classList.remove("open"));
  if(v==="theme")m.classList.add("themeopen");else if(v==="lang")m.classList.add("langopen");else if(v){m.classList.add("pgopen");$("pg-"+v).classList.add("open")}
  window.scrollTo(0,0)}
function openPage(v){SNAP=JSON.stringify({lang:lang,skin:skin,ccol:ccol,curCode:curCode,curRates:curRates});showView(v)}
function backPage(){if(SNAP){const o=JSON.parse(SNAP);lang=o.lang;skin=o.skin;ccol=o.ccol;curCode=o.curCode;curRates=o.curRates;saveSet();applyLang();render()}SNAP=null;showView(null)}
function okPage(){SNAP=null;showView(null);$("settings").classList.remove("open");$("gear").setAttribute("aria-expanded","false")}
$("themebtn").onclick=()=>openPage("theme");
$("themeback").onclick=backPage;
$("langbtn").onclick=()=>openPage("lang");
$("langback").onclick=backPage;
$("curbtn").onclick=()=>openPage("cur");
$("notifbtn").onclick=()=>openPage("notif");
$("catsbtn").onclick=()=>openPage("cats");
document.querySelectorAll(".pgback").forEach(b=>{b.onclick=backPage});
document.querySelectorAll(".pgok").forEach(b=>{b.onclick=okPage});
SKINS.forEach(k=>{$("skin-"+k).onclick=()=>{skin=k;saveSet();applyLang()}});
$("custcolor").value=ccol;
$("custcolor").oninput=e=>{ccol=e.target.value;saveSet();applySkin()};
setInterval(()=>{if(skin==="auto")applySkin()},600000);
applyLang();
render();
