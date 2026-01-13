import{$ as go,A as no,C as _,D as Sn,E as ro,F as A,G as I,H as oo,I as io,J as Bt,K as k,L as Ee,M as Qn,N as so,O as lo,P as ao,Q as Dt,R as co,S as uo,T as Pt,U as fo,V as nn,W as kn,X as En,Y as Yn,_ as Mn,a as jn,b as Wn,c as z,d as Qr,e as N,f as B,g as M,h as Yr,i as It,j as et,k as xt,l as U,m as Xr,n as Zr,o as be,p as xe,q as m,r as j,s as J,u as Le,v as Jr,w as eo,x as R,y as to,z as Cn}from"./chunk-BKZ3ODRH.js";import{a as X,b as me,c as tn,e as Re,f as Wr}from"./chunk-46AQF2XH.js";var Us=!Ee,Gs=Us&&!!no,ho=()=>{},Vs=e=>e!=null,Hs=e=>e.filter(Vs);function js(e){return(...n)=>{for(let t of e)t&&t(...n)}}var E=e=>typeof e=="function"&&!e.length?e():e,nr=e=>Array.isArray(e)?e:e?[e]:[];function Ws(e,...n){return typeof e=="function"?e(...n):e}var Qs=Gs?e=>Xr()?U(e):e:U;function Ys(e,n,t,r){let o=e.length,s=n.length,l=0;if(!s){for(;l<o;l++)t(e[l]);return}if(!o){for(;l<s;l++)r(n[l]);return}for(;l<s&&n[l]===e[l];l++);let a,i;n=n.slice(l),e=e.slice(l);for(a of n)e.includes(a)||r(a);for(i of e)n.includes(i)||t(i)}function Xs(e){let[n,t]=z(),r=e?.throw?(g,f)=>{throw t(g instanceof Error?g:new Error(f)),g}:(g,f)=>{t(g instanceof Error?g:new Error(f))},o=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),s=e?.prefix?`${e.prefix}.`:"",l=new Map,a=new Proxy({},{get(g,f){let h=l.get(f);h||(h=z(void 0,{equals:!1}),l.set(f,h)),h[0]();let p=o.reduce((y,v)=>{if(y!==null||!v)return y;try{return v.getItem(`${s}${f}`)}catch(b){return r(b,`Error reading ${s}${f} from ${v.name}`),null}},null);return p!==null&&e?.deserializer?e.deserializer(p,f,e.options):p}}),i=(g,f,h)=>{let p=e?.serializer?e.serializer(f,g,h??e.options):f,y=`${s}${g}`;o.forEach(b=>{try{b.getItem(y)!==p&&b.setItem(y,p)}catch(x){r(x,`Error setting ${s}${g} to ${p} in ${b.name}`)}});let v=l.get(g);v&&v[1]()},c=g=>o.forEach(f=>{try{f.removeItem(`${s}${g}`)}catch(h){r(h,`Error removing ${s}${g} from ${f.name}`)}}),u=()=>o.forEach(g=>{try{g.clear()}catch(f){r(f,`Error clearing ${g.name}`)}}),d=()=>{let g={},f=(h,p)=>{if(!g.hasOwnProperty(h)){let y=p&&e?.deserializer?e.deserializer(p,h,e.options):p;y&&(g[h]=y)}};return o.forEach(h=>{if(typeof h.getAll=="function"){let p;try{p=h.getAll()}catch(y){r(y,`Error getting all values from in ${h.name}`)}for(let y of p)f(y,p[y])}else{let p=0,y;try{for(;y=h.key(p++);)g.hasOwnProperty(y)||f(y,h.getItem(y))}catch(v){r(v,`Error getting all values from ${h.name}`)}}}),g};return e?.sync!==!1&&xt(()=>{let g=f=>{let h=!1;o.forEach(p=>{try{p!==f.storageArea&&f.key&&f.newValue!==p.getItem(f.key)&&(f.newValue?p.setItem(f.key,f.newValue):p.removeItem(f.key),h=!0)}catch(y){r(y,`Error synching api ${p.name} from storage event (${f.key}=${f.newValue})`)}}),h&&f.key&&l.get(f.key)?.[1]()};"addEventListener"in globalThis?(globalThis.addEventListener("storage",g),U(()=>globalThis.removeEventListener("storage",g))):(o.forEach(f=>f.addEventListener?.("storage",g)),U(()=>o.forEach(f=>f.removeEventListener?.("storage",g))))}),[a,i,{clear:u,error:n,remove:c,toJSON:d}]}var df=Xs,Zs=e=>(typeof e.clear=="function"||(e.clear=()=>{let n;for(;n=e.key(0);)e.removeItem(n)}),e),po=e=>{if(!e)return"";let n="";for(let t in e){if(!e.hasOwnProperty(t))continue;let r=e[t];n+=r instanceof Date?`; ${t}=${r.toUTCString()}`:typeof r=="boolean"?`; ${t}`:`; ${t}=${r}`}return n},Ke=Zs({_cookies:[globalThis.document,"cookie"],getItem:e=>Ke._cookies[0][Ke._cookies[1]].match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)")?.pop()??null,setItem:(e,n,t)=>{let r=Ke.getItem(e);Ke._cookies[0][Ke._cookies[1]]=`${e}=${n}${po(t)}`;let o=Object.assign(new Event("storage"),{key:e,oldValue:r,newValue:n,url:globalThis.document.URL,storageArea:Ke});window.dispatchEvent(o)},removeItem:e=>{Ke._cookies[0][Ke._cookies[1]]=`${e}=deleted${po({expires:new Date(0)})}`},key:e=>{let n=null,t=0;return Ke._cookies[0][Ke._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,o)=>(!n&&o&&t++===e&&(n=o),"")),n},get length(){let e=0;return Ke._cookies[0][Ke._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,n=>(e+=n?1:0,"")),e}}),Js=1024,Ot=796,gr=700,el="bottom-right",rr="bottom",ff="system",tl=!1,ui=500,nl=500,di=500,rl=Object.keys(kn)[0],mo=1,ol=Object.keys(En)[0],il=be({client:void 0,onlineManager:void 0,queryFlavor:"",version:"",shadowDOMTarget:void 0});function K(){return xe(il)}var fi=be(void 0),gf=e=>{let[n,t]=z(null),r=()=>{let l=n();l!=null&&(l.close(),t(null))},o=(l,a)=>{if(n()!=null)return;let i=window.open("","TSQD-Devtools-Panel",`width=${l},height=${a},popup`);if(!i)throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");i.document.head.innerHTML="",i.document.body.innerHTML="",ro(i.document),i.document.title="TanStack Query Devtools",i.document.body.style.margin="0",i.addEventListener("pagehide",()=>{e.setLocalStore("pip_open","false"),t(null)}),[...(K().shadowDOMTarget||document).styleSheets].forEach(c=>{try{let u=[...c.cssRules].map(h=>h.cssText).join(""),d=document.createElement("style"),g=c.ownerNode,f="";g&&"id"in g&&(f=g.id),f&&d.setAttribute("id",f),d.textContent=u,i.document.head.appendChild(d)}catch{let d=document.createElement("link");if(c.href==null)return;d.rel="stylesheet",d.type=c.type,d.media=c.media.toString(),d.href=c.href,i.document.head.appendChild(d)}}),Sn(["focusin","focusout","pointermove","keydown","pointerdown","pointerup","click","mousedown","input"],i.document),e.setLocalStore("pip_open","true"),t(i)};B(()=>{(e.localStore.pip_open??"false")==="true"&&!e.disabled&&o(Number(window.innerWidth),Number(e.localStore.height||nl))}),B(()=>{let l=(K().shadowDOMTarget||document).querySelector("#_goober"),a=n();if(l&&a){let i=new MutationObserver(()=>{let c=(K().shadowDOMTarget||a.document).querySelector("#_goober");c&&(c.textContent=l.textContent)});i.observe(l,{childList:!0,subtree:!0,characterDataOldValue:!0}),U(()=>{i.disconnect()})}});let s=M(()=>({pipWindow:n(),requestPipWindow:o,closePipWindow:r,disabled:e.disabled??!1}));return m(fi.Provider,{value:s,get children(){return e.children}})},hr=()=>M(()=>{let n=xe(fi);if(!n)throw new Error("usePiPWindow must be used within a PiPProvider");return n()}),sl=be(()=>"dark");function $e(){return xe(sl)}var gi={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u1EA4:"A",\u1EAE:"A",\u1EB2:"A",\u1EB4:"A",\u1EB6:"A",\u00C6:"AE",\u1EA6:"A",\u1EB0:"A",\u0202:"A",\u00C7:"C",\u1E08:"C",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u1EBE:"E",\u1E16:"E",\u1EC0:"E",\u1E14:"E",\u1E1C:"E",\u0206:"E",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u1E2E:"I",\u020A:"I",\u00D0:"D",\u00D1:"N",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u1ED0:"O",\u1E4C:"O",\u1E52:"O",\u020E:"O",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00DD:"Y",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u1EA5:"a",\u1EAF:"a",\u1EB3:"a",\u1EB5:"a",\u1EB7:"a",\u00E6:"ae",\u1EA7:"a",\u1EB1:"a",\u0203:"a",\u00E7:"c",\u1E09:"c",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u1EBF:"e",\u1E17:"e",\u1EC1:"e",\u1E15:"e",\u1E1D:"e",\u0207:"e",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u1E2F:"i",\u020B:"i",\u00F0:"d",\u00F1:"n",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u1ED1:"o",\u1E4D:"o",\u1E53:"o",\u020F:"o",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00FD:"y",\u00FF:"y",\u0100:"A",\u0101:"a",\u0102:"A",\u0103:"a",\u0104:"A",\u0105:"a",\u0106:"C",\u0107:"c",\u0108:"C",\u0109:"c",\u010A:"C",\u010B:"c",\u010C:"C",\u010D:"c",C\u0306:"C",c\u0306:"c",\u010E:"D",\u010F:"d",\u0110:"D",\u0111:"d",\u0112:"E",\u0113:"e",\u0114:"E",\u0115:"e",\u0116:"E",\u0117:"e",\u0118:"E",\u0119:"e",\u011A:"E",\u011B:"e",\u011C:"G",\u01F4:"G",\u011D:"g",\u01F5:"g",\u011E:"G",\u011F:"g",\u0120:"G",\u0121:"g",\u0122:"G",\u0123:"g",\u0124:"H",\u0125:"h",\u0126:"H",\u0127:"h",\u1E2A:"H",\u1E2B:"h",\u0128:"I",\u0129:"i",\u012A:"I",\u012B:"i",\u012C:"I",\u012D:"i",\u012E:"I",\u012F:"i",\u0130:"I",\u0131:"i",\u0132:"IJ",\u0133:"ij",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u1E30:"K",\u1E31:"k",K\u0306:"K",k\u0306:"k",\u0139:"L",\u013A:"l",\u013B:"L",\u013C:"l",\u013D:"L",\u013E:"l",\u013F:"L",\u0140:"l",\u0141:"l",\u0142:"l",\u1E3E:"M",\u1E3F:"m",M\u0306:"M",m\u0306:"m",\u0143:"N",\u0144:"n",\u0145:"N",\u0146:"n",\u0147:"N",\u0148:"n",\u0149:"n",N\u0306:"N",n\u0306:"n",\u014C:"O",\u014D:"o",\u014E:"O",\u014F:"o",\u0150:"O",\u0151:"o",\u0152:"OE",\u0153:"oe",P\u0306:"P",p\u0306:"p",\u0154:"R",\u0155:"r",\u0156:"R",\u0157:"r",\u0158:"R",\u0159:"r",R\u0306:"R",r\u0306:"r",\u0212:"R",\u0213:"r",\u015A:"S",\u015B:"s",\u015C:"S",\u015D:"s",\u015E:"S",\u0218:"S",\u0219:"s",\u015F:"s",\u0160:"S",\u0161:"s",\u0162:"T",\u0163:"t",\u021B:"t",\u021A:"T",\u0164:"T",\u0165:"t",\u0166:"T",\u0167:"t",T\u0306:"T",t\u0306:"t",\u0168:"U",\u0169:"u",\u016A:"U",\u016B:"u",\u016C:"U",\u016D:"u",\u016E:"U",\u016F:"u",\u0170:"U",\u0171:"u",\u0172:"U",\u0173:"u",\u0216:"U",\u0217:"u",V\u0306:"V",v\u0306:"v",\u0174:"W",\u0175:"w",\u1E82:"W",\u1E83:"w",X\u0306:"X",x\u0306:"x",\u0176:"Y",\u0177:"y",\u0178:"Y",Y\u0306:"Y",y\u0306:"y",\u0179:"Z",\u017A:"z",\u017B:"Z",\u017C:"z",\u017D:"Z",\u017E:"z",\u017F:"s",\u0192:"f",\u01A0:"O",\u01A1:"o",\u01AF:"U",\u01B0:"u",\u01CD:"A",\u01CE:"a",\u01CF:"I",\u01D0:"i",\u01D1:"O",\u01D2:"o",\u01D3:"U",\u01D4:"u",\u01D5:"U",\u01D6:"u",\u01D7:"U",\u01D8:"u",\u01D9:"U",\u01DA:"u",\u01DB:"U",\u01DC:"u",\u1EE8:"U",\u1EE9:"u",\u1E78:"U",\u1E79:"u",\u01FA:"A",\u01FB:"a",\u01FC:"AE",\u01FD:"ae",\u01FE:"O",\u01FF:"o",\u00DE:"TH",\u00FE:"th",\u1E54:"P",\u1E55:"p",\u1E64:"S",\u1E65:"s",X\u0301:"X",x\u0301:"x",\u0403:"\u0413",\u0453:"\u0433",\u040C:"\u041A",\u045C:"\u043A",A\u030B:"A",a\u030B:"a",E\u030B:"E",e\u030B:"e",I\u030B:"I",i\u030B:"i",\u01F8:"N",\u01F9:"n",\u1ED2:"O",\u1ED3:"o",\u1E50:"O",\u1E51:"o",\u1EEA:"U",\u1EEB:"u",\u1E80:"W",\u1E81:"w",\u1EF2:"Y",\u1EF3:"y",\u0200:"A",\u0201:"a",\u0204:"E",\u0205:"e",\u0208:"I",\u0209:"i",\u020C:"O",\u020D:"o",\u0210:"R",\u0211:"r",\u0214:"U",\u0215:"u",B\u030C:"B",b\u030C:"b",\u010C\u0323:"C",\u010D\u0323:"c",\u00CA\u030C:"E",\u00EA\u030C:"e",F\u030C:"F",f\u030C:"f",\u01E6:"G",\u01E7:"g",\u021E:"H",\u021F:"h",J\u030C:"J",\u01F0:"j",\u01E8:"K",\u01E9:"k",M\u030C:"M",m\u030C:"m",P\u030C:"P",p\u030C:"p",Q\u030C:"Q",q\u030C:"q",\u0158\u0329:"R",\u0159\u0329:"r",\u1E66:"S",\u1E67:"s",V\u030C:"V",v\u030C:"v",W\u030C:"W",w\u030C:"w",X\u030C:"X",x\u030C:"x",Y\u030C:"Y",y\u030C:"y",A\u0327:"A",a\u0327:"a",B\u0327:"B",b\u0327:"b",\u1E10:"D",\u1E11:"d",\u0228:"E",\u0229:"e",\u0190\u0327:"E",\u025B\u0327:"e",\u1E28:"H",\u1E29:"h",I\u0327:"I",i\u0327:"i",\u0197\u0327:"I",\u0268\u0327:"i",M\u0327:"M",m\u0327:"m",O\u0327:"O",o\u0327:"o",Q\u0327:"Q",q\u0327:"q",U\u0327:"U",u\u0327:"u",X\u0327:"X",x\u0327:"x",Z\u0327:"Z",z\u0327:"z"},ll=Object.keys(gi).join("|"),al=new RegExp(ll,"g");function cl(e){return e.replace(al,n=>gi[n])}var Pe={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function yo(e,n,t){var r;if(t=t||{},t.threshold=(r=t.threshold)!=null?r:Pe.MATCHES,!t.accessors){let l=vo(e,n,t);return{rankedValue:e,rank:l,accessorIndex:-1,accessorThreshold:t.threshold,passed:l>=t.threshold}}let o=gl(e,t.accessors),s={rankedValue:e,rank:Pe.NO_MATCH,accessorIndex:-1,accessorThreshold:t.threshold,passed:!1};for(let l=0;l<o.length;l++){let a=o[l],i=vo(a.itemValue,n,t),{minRanking:c,maxRanking:u,threshold:d=t.threshold}=a.attributes;i<c&&i>=Pe.MATCHES?i=c:i>u&&(i=u),i=Math.min(i,u),i>=d&&i>s.rank&&(s.rank=i,s.passed=!0,s.accessorIndex=l,s.accessorThreshold=d,s.rankedValue=a.itemValue)}return s}function vo(e,n,t){return e=bo(e,t),n=bo(n,t),n.length>e.length?Pe.NO_MATCH:e===n?Pe.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),n=n.toLowerCase(),e===n?Pe.EQUAL:e.startsWith(n)?Pe.STARTS_WITH:e.includes(` ${n}`)?Pe.WORD_STARTS_WITH:e.includes(n)?Pe.CONTAINS:n.length===1?Pe.NO_MATCH:ul(e).includes(n)?Pe.ACRONYM:dl(e,n))}function ul(e){let n="";return e.split(" ").forEach(r=>{r.split("-").forEach(s=>{n+=s.substr(0,1)})}),n}function dl(e,n){let t=0,r=0;function o(i,c,u){for(let d=u,g=c.length;d<g;d++)if(c[d]===i)return t+=1,d+1;return-1}function s(i){let c=1/i,u=t/n.length;return Pe.MATCHES+u*c}let l=o(n[0],e,0);if(l<0)return Pe.NO_MATCH;r=l;for(let i=1,c=n.length;i<c;i++){let u=n[i];if(r=o(u,e,r),!(r>-1))return Pe.NO_MATCH}let a=r-l;return s(a)}function bo(e,n){let{keepDiacritics:t}=n;return e=`${e}`,t||(e=cl(e)),e}function fl(e,n){let t=n;typeof n=="object"&&(t=n.accessor);let r=t(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function gl(e,n){let t=[];for(let r=0,o=n.length;r<o;r++){let s=n[r],l=hl(s),a=fl(e,s);for(let i=0,c=a.length;i<c;i++)t.push({itemValue:a[i],attributes:l})}return t}var xo={maxRanking:1/0,minRanking:-1/0};function hl(e){return typeof e=="function"?xo:X(X({},xo),e)}var pl={data:""},ml=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||pl,yl=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,vl=/\/\*[^]*?\*\/|  +/g,wo=/\n+/g,Lt=(e,n)=>{let t="",r="",o="";for(let s in e){let l=e[s];s[0]=="@"?s[1]=="i"?t=s+" "+l+";":r+=s[1]=="f"?Lt(l,s):s+"{"+Lt(l,s[1]=="k"?"":n)+"}":typeof l=="object"?r+=Lt(l,n?n.replace(/([^,])+/g,a=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,a):a?a+" "+i:i)):s):l!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=Lt.p?Lt.p(s,l):s+":"+l+";")}return t+(n&&o?n+"{"+o+"}":o)+r},dt={},hi=e=>{if(typeof e=="object"){let n="";for(let t in e)n+=t+hi(e[t]);return n}return e},bl=(e,n,t,r,o)=>{let s=hi(e),l=dt[s]||(dt[s]=(i=>{let c=0,u=11;for(;c<i.length;)u=101*u+i.charCodeAt(c++)>>>0;return"go"+u})(s));if(!dt[l]){let i=s!==e?e:(c=>{let u,d,g=[{}];for(;u=yl.exec(c.replace(vl,""));)u[4]?g.shift():u[3]?(d=u[3].replace(wo," ").trim(),g.unshift(g[0][d]=g[0][d]||{})):g[0][u[1]]=u[2].replace(wo," ").trim();return g[0]})(e);dt[l]=Lt(o?{["@keyframes "+l]:i}:i,t?"":"."+l)}let a=t&&dt.g?dt.g:null;return t&&(dt.g=dt[l]),((i,c,u,d)=>{d?c.data=c.data.replace(d,i):c.data.indexOf(i)===-1&&(c.data=u?i+c.data:c.data+i)})(dt[l],n,r,a),l},xl=(e,n,t)=>e.reduce((r,o,s)=>{let l=n[s];if(l&&l.call){let a=l(t),i=a&&a.props&&a.props.className||/^go/.test(a)&&a;l=i?"."+i:a&&typeof a=="object"?a.props?"":Lt(a,""):a===!1?"":a}return r+o+(l??"")},"");function W(e){let n=this||{},t=e.call?e(n.p):e;return bl(t.unshift?t.raw?xl(t,[].slice.call(arguments,1),n.p):t.reduce((r,o)=>Object.assign(r,o&&o.call?o(n.p):o),{}):t,ml(n.target),n.g,n.o,n.k)}W.bind({g:1});W.bind({k:1});function pi(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=pi(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function O(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=pi(e))&&(r&&(r+=" "),r+=n);return r}var $o=()=>{};function wl(e,n){let t=It(e);if(Ee){let d=t.slice();return()=>d}let{onChange:r}=n,o=new Set(n.appear?void 0:t),s=new WeakSet,[l,a]=z([],{equals:!1}),[i]=Zr(),c=n.exitMethod==="remove"?$o:d=>{a(g=>(g.push.apply(g,d),g));for(let g of d)s.delete(g)},u=n.exitMethod==="remove"?$o:n.exitMethod==="keep-index"?(d,g,f)=>d.splice(f,0,g):(d,g)=>d.push(g);return M(d=>{let g=l(),f=e();if(f[jn],It(i))return i(),d;if(g.length){let h=d.filter(p=>!g.includes(p));return g.length=0,r({list:h,added:[],removed:[],unchanged:h,finishRemoved:c}),h}return It(()=>{let h=new Set(f),p=f.slice(),y=[],v=[],b=[];for(let w of f)(o.has(w)?b:y).push(w);let x=!y.length;for(let w=0;w<d.length;w++){let $=d[w];h.has($)||(s.has($)||(v.push($),s.add($)),u(p,$,w)),x&&$!==p[w]&&(x=!1)}return!v.length&&x?d:(r({list:p,added:y,removed:v,unchanged:b,finishRemoved:c}),o=h,p)})},n.appear?[]:t.slice())}function De(...e){return js(e)}var Co=Ee?e=>e!=null&&typeof e=="object"&&"t"in e:e=>e instanceof Element;function or(e,n){if(n(e))return e;if(typeof e=="function"&&!e.length)return or(e(),n);if(Array.isArray(e)){let t=[];for(let r of e){let o=or(r,n);o&&(Array.isArray(o)?t.push.apply(t,o):t.push(o))}return t.length?t:null}return null}function $l(e,n=Co,t=Co){let r=M(e),o=M(()=>or(r(),Ee?t:n));return o.toArray=()=>{let s=o();return Array.isArray(s)?s:s?[s]:[]},o}function Cl(e){return M(()=>{let n=e.name||"s";return{enterActive:(e.enterActiveClass||n+"-enter-active").split(" "),enter:(e.enterClass||n+"-enter").split(" "),enterTo:(e.enterToClass||n+"-enter-to").split(" "),exitActive:(e.exitActiveClass||n+"-exit-active").split(" "),exit:(e.exitClass||n+"-exit").split(" "),exitTo:(e.exitToClass||n+"-exit-to").split(" "),move:(e.moveClass||n+"-move").split(" ")}})}function mi(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function Sl(e,n,t,r){let{onBeforeEnter:o,onEnter:s,onAfterEnter:l}=n;o?.(t),t.classList.add(...e.enter),t.classList.add(...e.enterActive),queueMicrotask(()=>{if(!t.parentNode)return r?.();s?.(t,()=>a())}),mi(()=>{t.classList.remove(...e.enter),t.classList.add(...e.enterTo),(!s||s.length<2)&&(t.addEventListener("transitionend",a),t.addEventListener("animationend",a))});function a(i){(!i||i.target===t)&&(t.removeEventListener("transitionend",a),t.removeEventListener("animationend",a),t.classList.remove(...e.enterActive),t.classList.remove(...e.enterTo),l?.(t))}}function kl(e,n,t,r){let{onBeforeExit:o,onExit:s,onAfterExit:l}=n;if(!t.parentNode)return r?.();o?.(t),t.classList.add(...e.exit),t.classList.add(...e.exitActive),s?.(t,()=>a()),mi(()=>{t.classList.remove(...e.exit),t.classList.add(...e.exitTo),(!s||s.length<2)&&(t.addEventListener("transitionend",a),t.addEventListener("animationend",a))});function a(i){(!i||i.target===t)&&(r?.(),t.removeEventListener("transitionend",a),t.removeEventListener("animationend",a),t.classList.remove(...e.exitActive),t.classList.remove(...e.exitTo),l?.(t))}}var So=e=>{let n=Cl(e);return wl($l(()=>e.children).toArray,{appear:e.appear,exitMethod:"keep-index",onChange({added:t,removed:r,finishRemoved:o,list:s}){let l=n();for(let i of t)Sl(l,e,i);let a=[];for(let i of s)i.isConnected&&(i instanceof HTMLElement||i instanceof SVGElement)&&a.push({el:i,rect:i.getBoundingClientRect()});queueMicrotask(()=>{let i=[];for(let{el:c,rect:u}of a)if(c.isConnected){let d=c.getBoundingClientRect(),g=u.left-d.left,f=u.top-d.top;(g||f)&&(c.style.transform=`translate(${g}px, ${f}px)`,c.style.transitionDuration="0s",i.push(c))}document.body.offsetHeight;for(let c of i){let u=function(d){(d.target===c||/transform$/.test(d.propertyName))&&(c.removeEventListener("transitionend",u),c.classList.remove(...l.move))};c.classList.add(...l.move),c.style.transform=c.style.transitionDuration="",c.addEventListener("transitionend",u)}});for(let i of r)kl(l,e,i,()=>o([i]))}})},Xn=Symbol("fallback");function ko(e){for(let n of e)n.dispose()}function El(e,n,t,r={}){if(Ee){let l=e(),a=[];if(l&&l.length)for(let i=0,c=l.length;i<c;i++)a.push(t(()=>l[i],()=>i));else r.fallback&&(a=[r.fallback()]);return()=>a}let o=new Map;return U(()=>ko(o.values())),()=>{let l=e()||[];return l[jn],It(()=>{if(!l.length)return ko(o.values()),o.clear(),r.fallback?[Wn(d=>(o.set(Xn,{dispose:d}),r.fallback()))]:[];let a=new Array(l.length),i=o.get(Xn);if(!o.size||i){i?.dispose(),o.delete(Xn);for(let u=0;u<l.length;u++){let d=l[u],g=n(d,u);s(a,d,u,g)}return a}let c=new Set(o.keys());for(let u=0;u<l.length;u++){let d=l[u],g=n(d,u);c.delete(g);let f=o.get(g);f?(a[u]=f.mapped,f.setIndex?.(u),f.setItem(()=>d)):s(a,d,u,g)}for(let u of c)o.get(u)?.dispose(),o.delete(u);return a})};function s(l,a,i,c){Wn(u=>{let[d,g]=z(a),f={setItem:g,dispose:u};if(t.length>1){let[h,p]=z(i);f.setIndex=p,f.mapped=t(d,h)}else f.mapped=t(d);o.set(c,f),l[i]=f.mapped})}}function Dn(e){let{by:n}=e;return M(El(()=>e.each,typeof n=="function"?n:t=>t[n],e.children,"fallback"in e?{fallback:()=>e.fallback}:void 0))}function Ml(e,n,t,r){return e.addEventListener(n,t,r),Qs(e.removeEventListener.bind(e,n,t,r))}function Tl(e,n,t,r){if(Ee)return;let o=()=>{nr(E(e)).forEach(s=>{s&&nr(E(n)).forEach(l=>Ml(s,l,t,r))})};typeof e=="function"?B(o):N(o)}function Al(e,n){if(Ee)return{observe:ho,unobserve:ho};let t=new ResizeObserver(e);return U(t.disconnect.bind(t)),{observe:r=>t.observe(r,n),unobserve:t.unobserve.bind(t)}}function yi(e,n,t){if(Ee)return;let r=new WeakMap,{observe:o,unobserve:s}=Al(l=>{for(let a of l){let{contentRect:i,target:c}=a,u=Math.round(i.width),d=Math.round(i.height),g=r.get(c);(!g||g.width!==u||g.height!==d)&&(n(i,c,a),r.set(c,{width:u,height:d}))}},t);B(l=>{let a=Hs(nr(E(e)));return Ys(a,l,o,s),a},[])}var Il=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function Eo(e){let n={},t;for(;t=Il.exec(e);)n[t[1]]=t[2];return n}function zn(e,n){if(typeof e=="string"){if(typeof n=="string")return`${e};${n}`;e=Eo(e)}else typeof n=="string"&&(n=Eo(n));return X(X({},e),n)}function Dl(e,n,t=-1){return t in e?[...e.slice(0,t),n,...e.slice(t)]:[...e,n]}function ir(e,n){let t=[...e],r=t.indexOf(n);return r!==-1&&t.splice(r,1),t}function Pl(e){return typeof e=="number"}function Ut(e){return Object.prototype.toString.call(e)==="[object String]"}function Ll(e){return typeof e=="function"}function hn(e){return n=>`${e()}-${n}`}function Ue(e,n){return e?e===n||e.contains(n):!1}function ln(e,n=!1){let{activeElement:t}=nt(e);if(!t?.nodeName)return null;if(vi(t)&&t.contentDocument)return ln(t.contentDocument.body,n);if(n){let r=t.getAttribute("aria-activedescendant");if(r){let o=nt(t).getElementById(r);if(o)return o}}return t}function Ol(e){return nt(e).defaultView||window}function nt(e){return e?e.ownerDocument||e:document}function vi(e){return e.tagName==="IFRAME"}var pr=(e=>(e.Escape="Escape",e.Enter="Enter",e.Tab="Tab",e.Space=" ",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.End="End",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e))(pr||{});function mr(e){return typeof window<"u"&&window.navigator!=null?e.test(window.navigator.userAgentData?.platform||window.navigator.platform):!1}function Rn(){return mr(/^Mac/i)}function ql(){return mr(/^iPhone/i)}function Fl(){return mr(/^iPad/i)||Rn()&&navigator.maxTouchPoints>1}function _l(){return ql()||Fl()}function zl(){return Rn()||_l()}function ce(e,n){return n&&(Ll(n)?n(e):n[0](n[1],e)),e?.defaultPrevented}function we(e){return n=>{for(let t of e)ce(n,t)}}function Rl(e){return Rn()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function Te(e){if(e)if(Kl())e.focus({preventScroll:!0});else{let n=Bl(e);e.focus(),Nl(n)}}var Tn=null;function Kl(){if(Tn==null){Tn=!1;try{document.createElement("div").focus({get preventScroll(){return Tn=!0,!0}})}catch{}}return Tn}function Bl(e){let n=e.parentNode,t=[],r=document.scrollingElement||document.documentElement;for(;n instanceof HTMLElement&&n!==r;)(n.offsetHeight<n.scrollHeight||n.offsetWidth<n.scrollWidth)&&t.push({element:n,scrollTop:n.scrollTop,scrollLeft:n.scrollLeft}),n=n.parentNode;return r instanceof HTMLElement&&t.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),t}function Nl(e){for(let{element:n,scrollTop:t,scrollLeft:r}of e)n.scrollTop=t,n.scrollLeft=r}var bi=["input:not([type='hidden']):not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","a[href]","area[href]","[tabindex]","iframe","object","embed","audio[controls]","video[controls]","[contenteditable]:not([contenteditable='false'])"],Ul=[...bi,'[tabindex]:not([tabindex="-1"]):not([disabled])'],yr=bi.join(":not([hidden]),")+",[tabindex]:not([disabled]):not([hidden])",Gl=Ul.join(':not([hidden]):not([tabindex="-1"]),');function xi(e,n){let r=Array.from(e.querySelectorAll(yr)).filter(Mo);return n&&Mo(e)&&r.unshift(e),r.forEach((o,s)=>{if(vi(o)&&o.contentDocument){let l=o.contentDocument.body,a=xi(l,!1);r.splice(s,1,...a)}}),r}function Mo(e){return wi(e)&&!Vl(e)}function wi(e){return e.matches(yr)&&vr(e)}function Vl(e){return parseInt(e.getAttribute("tabindex")||"0",10)<0}function vr(e,n){return e.nodeName!=="#comment"&&Hl(e)&&jl(e,n)&&(!e.parentElement||vr(e.parentElement,e))}function Hl(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:n,visibility:t}=e.style,r=n!=="none"&&t!=="hidden"&&t!=="collapse";if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:o}=e.ownerDocument.defaultView,{display:s,visibility:l}=o(e);r=s!=="none"&&l!=="hidden"&&l!=="collapse"}return r}function jl(e,n){return!e.hasAttribute("hidden")&&(e.nodeName==="DETAILS"&&n&&n.nodeName!=="SUMMARY"?e.hasAttribute("open"):!0)}function Wl(e,n,t){let r=n?.tabbable?Gl:yr,o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(s){return n?.from?.contains(s)?NodeFilter.FILTER_REJECT:s.matches(r)&&vr(s)&&(!n?.accept||n.accept(s))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return n?.from&&(o.currentNode=n.from),o}function To(e){for(;e&&!Ql(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}function Ql(e){let n=window.getComputedStyle(e);return/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY)}function Yl(){}function Xl(e,n){let[t,r]=e,o=!1,s=n.length;for(let l=s,a=0,i=l-1;a<l;i=a++){let[c,u]=n[a],[d,g]=n[i],[,f]=n[i===0?l-1:i-1]||[0,0],h=(u-g)*(t-c)-(c-d)*(r-u);if(g<u){if(r>=g&&r<u){if(h===0)return!0;h>0&&(r===g?r>f&&(o=!o):o=!o)}}else if(u<g){if(r>u&&r<=g){if(h===0)return!0;h<0&&(r===g?r<f&&(o=!o):o=!o)}}else if(r==u&&(t>=d&&t<=c||t>=c&&t<=d))return!0}return o}function Q(e,n){return j(e,n)}var rn=new Map,Ao=new Set;function Io(){if(typeof window>"u")return;let e=t=>{if(!t.target)return;let r=rn.get(t.target);r||(r=new Set,rn.set(t.target,r),t.target.addEventListener("transitioncancel",n)),r.add(t.propertyName)},n=t=>{if(!t.target)return;let r=rn.get(t.target);if(r&&(r.delete(t.propertyName),r.size===0&&(t.target.removeEventListener("transitioncancel",n),rn.delete(t.target)),rn.size===0)){for(let o of Ao)o();Ao.clear()}};document.body.addEventListener("transitionrun",e),document.body.addEventListener("transitionend",n)}typeof document<"u"&&(document.readyState!=="loading"?Io():document.addEventListener("DOMContentLoaded",Io));function sr(e,n){let t=Do(e,n,"left"),r=Do(e,n,"top"),o=n.offsetWidth,s=n.offsetHeight,l=e.scrollLeft,a=e.scrollTop,i=l+e.offsetWidth,c=a+e.offsetHeight;t<=l?l=t:t+o>i&&(l+=t+o-i),r<=a?a=r:r+s>c&&(a+=r+s-c),e.scrollLeft=l,e.scrollTop=a}function Do(e,n,t){let r=t==="left"?"offsetLeft":"offsetTop",o=0;for(;n.offsetParent&&(o+=n[r],n.offsetParent!==e);){if(n.offsetParent.contains(e)){o-=e[r];break}n=n.offsetParent}return o}function Zl(e,n){if(document.contains(e)){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow==="hidden"){let o=To(e);for(;e&&o&&e!==t&&o!==t;)sr(o,e),e=o,o=To(e)}else{let{left:o,top:s}=e.getBoundingClientRect();e?.scrollIntoView?.({block:"nearest"});let{left:l,top:a}=e.getBoundingClientRect();(Math.abs(o-l)>1||Math.abs(s-a)>1)&&e.scrollIntoView?.({block:"nearest"})}}}var $i={border:"0",clip:"rect(0 0 0 0)","clip-path":"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:"0",position:"absolute",width:"1px","white-space":"nowrap"};function Ge(e){return n=>(e(n),()=>e(void 0))}function Kn(e,n){let[t,r]=z(Po(n?.()));return B(()=>{r(e()?.tagName.toLowerCase()||Po(n?.()))}),t}function Po(e){return Ut(e)?e:void 0}function ue(e){let[n,t]=J(e,["as"]);if(!n.as)throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");return m(so,j(t,{get component(){return n.as}}))}var Jl=["id","name","validationState","required","disabled","readOnly"];function ea(e){let n=`form-control-${Le()}`,t=Q({id:n},e),[r,o]=z(),[s,l]=z(),[a,i]=z(),[c,u]=z(),d=(p,y,v)=>{let b=v!=null||r()!=null;return[v,r(),b&&y!=null?p:void 0].filter(Boolean).join(" ")||void 0},g=p=>[a(),c(),p].filter(Boolean).join(" ")||void 0,f=M(()=>({"data-valid":E(t.validationState)==="valid"?"":void 0,"data-invalid":E(t.validationState)==="invalid"?"":void 0,"data-required":E(t.required)?"":void 0,"data-disabled":E(t.disabled)?"":void 0,"data-readonly":E(t.readOnly)?"":void 0}));return{formControlContext:{name:()=>E(t.name)??E(t.id),dataset:f,validationState:()=>E(t.validationState),isRequired:()=>E(t.required),isDisabled:()=>E(t.disabled),isReadOnly:()=>E(t.readOnly),labelId:r,fieldId:s,descriptionId:a,errorMessageId:c,getAriaLabelledBy:d,getAriaDescribedBy:g,generateId:hn(()=>E(t.id)),registerLabel:Ge(o),registerField:Ge(l),registerDescription:Ge(i),registerErrorMessage:Ge(u)}}}var Ci=be();function pn(){let e=xe(Ci);if(e===void 0)throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function Si(e){let n=pn(),t=Q({id:n.generateId("description")},e);return B(()=>U(n.registerDescription(t.id))),m(ue,j({as:"div"},()=>n.dataset(),t))}function ki(e){let n=pn(),t=Q({id:n.generateId("error-message")},e),[r,o]=J(t,["forceMount"]),s=()=>n.validationState()==="invalid";return B(()=>{s()&&U(n.registerErrorMessage(o.id))}),m(R,{get when(){return r.forceMount||s()},get children(){return m(ue,j({as:"div"},()=>n.dataset(),o))}})}function ta(e){let n,t=pn(),r=Q({id:t.generateId("label")},e),[o,s]=J(r,["ref"]),l=Kn(()=>n,()=>"label");return B(()=>U(t.registerLabel(s.id))),m(ue,j({as:"label",ref(a){let i=De(c=>n=c,o.ref);typeof i=="function"&&i(a)},get for(){return M(()=>l()==="label")()?t.fieldId():void 0}},()=>t.dataset(),s))}function na(e,n){B(et(e,t=>{if(t==null)return;let r=ra(t);r!=null&&(r.addEventListener("reset",n,{passive:!0}),U(()=>{r.removeEventListener("reset",n)}))}))}function ra(e){return oa(e)?e.form:e.closest("form")}function oa(e){return e.matches("textarea, input, select, button")}function mn(e){let[n,t]=z(e.defaultValue?.()),r=M(()=>e.value?.()!==void 0),o=M(()=>r()?e.value?.():n());return[o,l=>{It(()=>{let a=Ws(l,o());return Object.is(a,o())||(r()||t(a),e.onChange?.(a)),a})}]}function Ei(e){let[n,t]=mn(e);return[()=>n()??!1,t]}function ia(e){let[n,t]=mn(e);return[()=>n()??[],t]}function sa(e={}){let[n,t]=Ei({value:()=>E(e.isSelected),defaultValue:()=>!!E(e.defaultIsSelected),onChange:s=>e.onSelectedChange?.(s)});return{isSelected:n,setIsSelected:s=>{!E(e.isReadOnly)&&!E(e.isDisabled)&&t(s)},toggle:()=>{!E(e.isReadOnly)&&!E(e.isDisabled)&&t(!n())}}}var la=Object.defineProperty,Bn=(e,n)=>{for(var t in n)la(e,t,{get:n[t],enumerable:!0})},Mi=be();function Ti(){return xe(Mi)}function aa(){let e=Ti();if(e===void 0)throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function Ai(e,n){return!!(n.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function ca(e,n){let t=n.ref();if(!t)return-1;let r=e.length;if(!r)return-1;for(;r--;){let o=e[r]?.ref();if(o&&Ai(o,t))return r+1}return 0}function ua(e){let n=e.map((r,o)=>[o,r]),t=!1;return n.sort(([r,o],[s,l])=>{let a=o.ref(),i=l.ref();return a===i||!a||!i?0:Ai(a,i)?(r>s&&(t=!0),-1):(r<s&&(t=!0),1)}),t?n.map(([r,o])=>o):e}function Ii(e,n){let t=ua(e);e!==t&&n(t)}function da(e){let n=e[0],t=e[e.length-1]?.ref(),r=n?.ref()?.parentElement;for(;r;){if(t&&r.contains(t))return r;r=r.parentElement}return nt(r).body}function fa(e,n){B(()=>{let t=setTimeout(()=>{Ii(e(),n)});U(()=>clearTimeout(t))})}function ga(e,n){if(typeof IntersectionObserver!="function"){fa(e,n);return}let t=[];B(()=>{let r=()=>{let l=!!t.length;t=e(),l&&Ii(e(),n)},o=da(e()),s=new IntersectionObserver(r,{root:o});for(let l of e()){let a=l.ref();a&&s.observe(a)}U(()=>s.disconnect())})}function ha(e={}){let[n,t]=ia({value:()=>E(e.items),onChange:s=>e.onItemsChange?.(s)});ga(n,t);let r=s=>(t(l=>{let a=ca(l,s);return Dl(l,s,a)}),()=>{t(l=>{let a=l.filter(i=>i.ref()!==s.ref());return l.length===a.length?l:a})});return{DomCollectionProvider:s=>m(Mi.Provider,{value:{registerItem:r},get children(){return s.children}})}}function pa(e){let n=aa(),t=Q({shouldRegisterItem:!0},e);B(()=>{if(!t.shouldRegisterItem)return;let r=n.registerItem(t.getItem());U(r)})}function Di(e){let n=e.startIndex??0,t=e.startLevel??0,r=[],o=i=>{if(i==null)return"";let c=e.getKey??"key",u=Ut(c)?i[c]:c(i);return u!=null?String(u):""},s=i=>{if(i==null)return"";let c=e.getTextValue??"textValue",u=Ut(c)?i[c]:c(i);return u!=null?String(u):""},l=i=>{if(i==null)return!1;let c=e.getDisabled??"disabled";return(Ut(c)?i[c]:c(i))??!1},a=i=>{if(i!=null)return Ut(e.getSectionChildren)?i[e.getSectionChildren]:e.getSectionChildren?.(i)};for(let i of e.dataSource){if(Ut(i)||Pl(i)){r.push({type:"item",rawValue:i,key:String(i),textValue:String(i),disabled:l(i),level:t,index:n}),n++;continue}if(a(i)!=null){r.push({type:"section",rawValue:i,key:"",textValue:"",disabled:!1,level:t,index:n}),n++;let c=a(i)??[];if(c.length>0){let u=Di({dataSource:c,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:n,startLevel:t+1});r.push(...u),n+=u.length}}else r.push({type:"item",rawValue:i,key:o(i),textValue:s(i),disabled:l(i),level:t,index:n}),n++}return r}function ma(e,n=[]){return M(()=>{let t=Di({dataSource:E(e.dataSource),getKey:E(e.getKey),getTextValue:E(e.getTextValue),getDisabled:E(e.getDisabled),getSectionChildren:E(e.getSectionChildren)});for(let r=0;r<n.length;r++)n[r]();return e.factory(t)})}var ya=new Set(["Avst","Arab","Armi","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),va=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function ba(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??"";return ya.has(t)}let n=e.split("-")[0];return va.has(n)}function xa(e){return ba(e)?"rtl":"ltr"}function Pi(){let e=typeof navigator<"u"&&(navigator.language||navigator.userLanguage)||"en-US";return{locale:e,direction:xa(e)}}var lr=Pi(),an=new Set;function Lo(){lr=Pi();for(let e of an)e(lr)}function wa(){let e={locale:"en-US",direction:"ltr"},[n,t]=z(lr),r=M(()=>Ee?e:n());return xt(()=>{an.size===0&&window.addEventListener("languagechange",Lo),an.add(t),U(()=>{an.delete(t),an.size===0&&window.removeEventListener("languagechange",Lo)})}),{locale:()=>r().locale,direction:()=>r().direction}}var $a=be();function Et(){let e=wa();return xe($a)||e}var Zn=new Map;function Ca(e){let{locale:n}=Et(),t=M(()=>n()+Object.entries(e).sort((r,o)=>r[0]<o[0]?-1:1).join());return M(()=>{let r=t(),o;return Zn.has(r)&&(o=Zn.get(r)),o||(o=new Intl.Collator(n(),e),Zn.set(r,o)),o})}var ft=class Li extends Set{anchorKey;currentKey;constructor(n,t,r){super(n),n instanceof Li?(this.anchorKey=t||n.anchorKey,this.currentKey=r||n.currentKey):(this.anchorKey=t,this.currentKey=r)}};function Sa(e){let[n,t]=mn(e);return[()=>n()??new ft,t]}function Oi(e){return zl()?e.altKey:e.ctrlKey}function Gt(e){return Rn()?e.metaKey:e.ctrlKey}function Oo(e){return new ft(e)}function ka(e,n){if(e.size!==n.size)return!1;for(let t of e)if(!n.has(t))return!1;return!0}function Ea(e){let n=Q({selectionMode:"none",selectionBehavior:"toggle"},e),[t,r]=z(!1),[o,s]=z(),l=M(()=>{let p=E(n.selectedKeys);return p!=null?Oo(p):p}),a=M(()=>{let p=E(n.defaultSelectedKeys);return p!=null?Oo(p):new ft}),[i,c]=Sa({value:l,defaultValue:a,onChange:p=>n.onSelectionChange?.(p)}),[u,d]=z(E(n.selectionBehavior)),g=()=>E(n.selectionMode),f=()=>E(n.disallowEmptySelection)??!1,h=p=>{(E(n.allowDuplicateSelectionEvents)||!ka(p,i()))&&c(p)};return B(()=>{let p=i();E(n.selectionBehavior)==="replace"&&u()==="toggle"&&typeof p=="object"&&p.size===0&&d("replace")}),B(()=>{d(E(n.selectionBehavior)??"toggle")}),{selectionMode:g,disallowEmptySelection:f,selectionBehavior:u,setSelectionBehavior:d,isFocused:t,setFocused:r,focusedKey:o,setFocusedKey:s,selectedKeys:i,setSelectedKeys:h}}function Ma(e){let[n,t]=z(""),[r,o]=z(-1);return{typeSelectHandlers:{onKeyDown:l=>{if(E(e.isDisabled))return;let a=E(e.keyboardDelegate),i=E(e.selectionManager);if(!a.getKeyForSearch)return;let c=Ta(l.key);if(!c||l.ctrlKey||l.metaKey)return;c===" "&&n().trim().length>0&&(l.preventDefault(),l.stopPropagation());let u=t(g=>g+c),d=a.getKeyForSearch(u,i.focusedKey())??a.getKeyForSearch(u);d==null&&Aa(u)&&(u=u[0],d=a.getKeyForSearch(u,i.focusedKey())??a.getKeyForSearch(u)),d!=null&&(i.setFocusedKey(d),e.onTypeSelect?.(d)),clearTimeout(r()),o(window.setTimeout(()=>t(""),500))}}}}function Ta(e){return e.length===1||!/^[A-Z]/i.test(e)?e:""}function Aa(e){return e.split("").every(n=>n===e[0])}function Ia(e,n,t){let o=j({selectOnFocus:()=>E(e.selectionManager).selectionBehavior()==="replace"},e),s=()=>n(),{direction:l}=Et(),a={top:0,left:0};Tl(()=>E(o.isVirtualized)?void 0:s(),"scroll",()=>{let y=s();y&&(a={top:y.scrollTop,left:y.scrollLeft})});let{typeSelectHandlers:i}=Ma({isDisabled:()=>E(o.disallowTypeAhead),keyboardDelegate:()=>E(o.keyboardDelegate),selectionManager:()=>E(o.selectionManager)}),c=()=>E(o.orientation)??"vertical",u=y=>{ce(y,i.onKeyDown),y.altKey&&y.key==="Tab"&&y.preventDefault();let v=n();if(!v?.contains(y.target))return;let b=E(o.selectionManager),x=E(o.selectOnFocus),w=P=>{P!=null&&(b.setFocusedKey(P),y.shiftKey&&b.selectionMode()==="multiple"?b.extendSelection(P):x&&!Oi(y)&&b.replaceSelection(P))},$=E(o.keyboardDelegate),q=E(o.shouldFocusWrap),D=b.focusedKey();switch(y.key){case(c()==="vertical"?"ArrowDown":"ArrowRight"):{if($.getKeyBelow){y.preventDefault();let P;D!=null?P=$.getKeyBelow(D):P=$.getFirstKey?.(),P==null&&q&&(P=$.getFirstKey?.(D)),w(P)}break}case(c()==="vertical"?"ArrowUp":"ArrowLeft"):{if($.getKeyAbove){y.preventDefault();let P;D!=null?P=$.getKeyAbove(D):P=$.getLastKey?.(),P==null&&q&&(P=$.getLastKey?.(D)),w(P)}break}case(c()==="vertical"?"ArrowLeft":"ArrowUp"):{if($.getKeyLeftOf){y.preventDefault();let P=l()==="rtl",S;D!=null?S=$.getKeyLeftOf(D):S=P?$.getFirstKey?.():$.getLastKey?.(),w(S)}break}case(c()==="vertical"?"ArrowRight":"ArrowDown"):{if($.getKeyRightOf){y.preventDefault();let P=l()==="rtl",S;D!=null?S=$.getKeyRightOf(D):S=P?$.getLastKey?.():$.getFirstKey?.(),w(S)}break}case"Home":if($.getFirstKey){y.preventDefault();let P=$.getFirstKey(D,Gt(y));P!=null&&(b.setFocusedKey(P),Gt(y)&&y.shiftKey&&b.selectionMode()==="multiple"?b.extendSelection(P):x&&b.replaceSelection(P))}break;case"End":if($.getLastKey){y.preventDefault();let P=$.getLastKey(D,Gt(y));P!=null&&(b.setFocusedKey(P),Gt(y)&&y.shiftKey&&b.selectionMode()==="multiple"?b.extendSelection(P):x&&b.replaceSelection(P))}break;case"PageDown":if($.getKeyPageBelow&&D!=null){y.preventDefault();let P=$.getKeyPageBelow(D);w(P)}break;case"PageUp":if($.getKeyPageAbove&&D!=null){y.preventDefault();let P=$.getKeyPageAbove(D);w(P)}break;case"a":Gt(y)&&b.selectionMode()==="multiple"&&E(o.disallowSelectAll)!==!0&&(y.preventDefault(),b.selectAll());break;case"Escape":y.defaultPrevented||(y.preventDefault(),E(o.disallowEmptySelection)||b.clearSelection());break;case"Tab":if(!E(o.allowsTabNavigation)){if(y.shiftKey)v.focus();else{let P=Wl(v,{tabbable:!0}),S,F;do F=P.lastChild(),F&&(S=F);while(F);S&&!S.contains(document.activeElement)&&Te(S)}break}}},d=y=>{let v=E(o.selectionManager),b=E(o.keyboardDelegate),x=E(o.selectOnFocus);if(v.isFocused()){y.currentTarget.contains(y.target)||v.setFocused(!1);return}if(y.currentTarget.contains(y.target)){if(v.setFocused(!0),v.focusedKey()==null){let w=q=>{q!=null&&(v.setFocusedKey(q),x&&v.replaceSelection(q))},$=y.relatedTarget;$&&y.currentTarget.compareDocumentPosition($)&Node.DOCUMENT_POSITION_FOLLOWING?w(v.lastSelectedKey()??b.getLastKey?.()):w(v.firstSelectedKey()??b.getFirstKey?.())}else if(!E(o.isVirtualized)){let w=s();if(w){w.scrollTop=a.top,w.scrollLeft=a.left;let $=w.querySelector(`[data-key="${v.focusedKey()}"]`);$&&(Te($),sr(w,$))}}}},g=y=>{let v=E(o.selectionManager);y.currentTarget.contains(y.relatedTarget)||v.setFocused(!1)},f=y=>{s()===y.target&&y.preventDefault()},h=()=>{let y=E(o.autoFocus);if(!y)return;let v=E(o.selectionManager),b=E(o.keyboardDelegate),x;y==="first"&&(x=b.getFirstKey?.()),y==="last"&&(x=b.getLastKey?.());let w=v.selectedKeys();w.size&&(x=w.values().next().value),v.setFocused(!0),v.setFocusedKey(x);let $=n();$&&x==null&&!E(o.shouldUseVirtualFocus)&&Te($)};return xt(()=>{o.deferAutoFocus?setTimeout(h,0):h()}),B(et([s,()=>E(o.isVirtualized),()=>E(o.selectionManager).focusedKey()],y=>{let[v,b,x]=y;if(b)x&&o.scrollToKey?.(x);else if(x&&v){let w=v.querySelector(`[data-key="${x}"]`);w&&sr(v,w)}})),{tabIndex:M(()=>{if(!E(o.shouldUseVirtualFocus))return E(o.selectionManager).focusedKey()==null?0:-1}),onKeyDown:u,onMouseDown:f,onFocusIn:d,onFocusOut:g}}function qi(e,n){let t=()=>E(e.selectionManager),r=()=>E(e.key),o=()=>E(e.shouldUseVirtualFocus),s=b=>{t().selectionMode()!=="none"&&(t().selectionMode()==="single"?t().isSelected(r())&&!t().disallowEmptySelection()?t().toggleSelection(r()):t().replaceSelection(r()):b?.shiftKey?t().extendSelection(r()):t().selectionBehavior()==="toggle"||Gt(b)||"pointerType"in b&&b.pointerType==="touch"?t().toggleSelection(r()):t().replaceSelection(r()))},l=()=>t().isSelected(r()),a=()=>E(e.disabled)||t().isDisabled(r()),i=()=>!a()&&t().canSelectItem(r()),c=null,u=b=>{i()&&(c=b.pointerType,b.pointerType==="mouse"&&b.button===0&&!E(e.shouldSelectOnPressUp)&&s(b))},d=b=>{i()&&b.pointerType==="mouse"&&b.button===0&&E(e.shouldSelectOnPressUp)&&E(e.allowsDifferentPressOrigin)&&s(b)},g=b=>{i()&&(E(e.shouldSelectOnPressUp)&&!E(e.allowsDifferentPressOrigin)||c!=="mouse")&&s(b)},f=b=>{!i()||!["Enter"," "].includes(b.key)||(Oi(b)?t().toggleSelection(r()):s(b))},h=b=>{a()&&b.preventDefault()},p=b=>{let x=n();o()||a()||!x||b.target===x&&t().setFocusedKey(r())},y=M(()=>{if(!(o()||a()))return r()===t().focusedKey()?0:-1}),v=M(()=>E(e.virtualized)?void 0:r());return B(et([n,r,o,()=>t().focusedKey(),()=>t().isFocused()],([b,x,w,$,q])=>{b&&x===$&&q&&!w&&document.activeElement!==b&&(e.focus?e.focus():Te(b))})),{isSelected:l,isDisabled:a,allowsSelection:i,tabIndex:y,dataKey:v,onPointerDown:u,onPointerUp:d,onClick:g,onKeyDown:f,onMouseDown:h,onFocus:p}}var Da=class{collection;state;constructor(e,n){this.collection=e,this.state=n}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()==="none")return!1;let n=this.getKey(e);return n==null?!1:this.state.selectedKeys().has(n)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(n=>e.has(n))}firstSelectedKey(){let e;for(let n of this.state.selectedKeys()){let t=this.collection().getItem(n),r=t?.index!=null&&e?.index!=null&&t.index<e.index;(!e||r)&&(e=t)}return e?.key}lastSelectedKey(){let e;for(let n of this.state.selectedKeys()){let t=this.collection().getItem(n),r=t?.index!=null&&e?.index!=null&&t.index>e.index;(!e||r)&&(e=t)}return e?.key}extendSelection(e){if(this.selectionMode()==="none")return;if(this.selectionMode()==="single"){this.replaceSelection(e);return}let n=this.getKey(e);if(n==null)return;let t=this.state.selectedKeys(),r=t.anchorKey||n,o=new ft(t,r,n);for(let s of this.getKeyRange(r,t.currentKey||n))o.delete(s);for(let s of this.getKeyRange(n,r))this.canSelectItem(s)&&o.add(s);this.state.setSelectedKeys(o)}getKeyRange(e,n){let t=this.collection().getItem(e),r=this.collection().getItem(n);return t&&r?t.index!=null&&r.index!=null&&t.index<=r.index?this.getKeyRangeInternal(e,n):this.getKeyRangeInternal(n,e):[]}getKeyRangeInternal(e,n){let t=[],r=e;for(;r!=null;){let o=this.collection().getItem(r);if(o&&o.type==="item"&&t.push(r),r===n)return t;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let n=this.collection().getItem(e);return n?!n||n.type!=="item"?null:n.key:e}toggleSelection(e){if(this.selectionMode()==="none")return;if(this.selectionMode()==="single"&&!this.isSelected(e)){this.replaceSelection(e);return}let n=this.getKey(e);if(n==null)return;let t=new ft(this.state.selectedKeys());t.has(n)?t.delete(n):this.canSelectItem(n)&&(t.add(n),t.anchorKey=n,t.currentKey=n),!(this.disallowEmptySelection()&&t.size===0)&&this.state.setSelectedKeys(t)}replaceSelection(e){if(this.selectionMode()==="none")return;let n=this.getKey(e);if(n==null)return;let t=this.canSelectItem(n)?new ft([n],n,n):new ft;this.state.setSelectedKeys(t)}setSelectedKeys(e){if(this.selectionMode()==="none")return;let n=new ft;for(let t of e){let r=this.getKey(t);if(r!=null&&(n.add(r),this.selectionMode()==="single"))break}this.state.setSelectedKeys(n)}selectAll(){this.selectionMode()==="multiple"&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new ft)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,n){this.selectionMode()!=="none"&&(this.selectionMode()==="single"?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()==="toggle"||n&&n.pointerType==="touch"?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let n=this.selectedKeys();if(e.size!==n.size)return!1;for(let t of e)if(!n.has(t))return!1;for(let t of n)if(!e.has(t))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()==="none")return!1;let n=this.collection().getItem(e);return n!=null&&!n.disabled}isDisabled(e){let n=this.collection().getItem(e);return!n||n.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let r=this.collection().getItem(t);if(!r)continue;r.type==="item"&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},qo=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let r of e)this.keyMap.set(r.key,r);if(this.keyMap.size===0)return;let n,t=0;for(let[r,o]of this.keyMap)n?(n.nextKey=r,o.prevKey=n.key):(this.firstKey=r,o.prevKey=void 0),o.type==="item"&&(o.index=t++),n=o,n.nextKey=void 0;this.lastKey=n.key}*[Symbol.iterator](){yield*Wr(this.iterable)}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let n=[...this.getKeys()];return this.getItem(n[e])}};function Pa(e){let n=Ea(e),r=ma({dataSource:()=>E(e.dataSource),getKey:()=>E(e.getKey),getTextValue:()=>E(e.getTextValue),getDisabled:()=>E(e.getDisabled),getSectionChildren:()=>E(e.getSectionChildren),factory:s=>e.filter?new qo(e.filter(s)):new qo(s)},[()=>e.filter]),o=new Da(r,n);return Qr(()=>{let s=n.focusedKey();s!=null&&!r().getItem(s)&&n.setFocusedKey(void 0)}),{collection:r,selectionManager:()=>o}}var Me=e=>typeof e=="function"?e():e,La=e=>{let n=M(()=>{let l=Me(e.element);if(l)return getComputedStyle(l)}),t=()=>n()?.animationName??"none",[r,o]=z(Me(e.show)?"present":"hidden"),s="none";return B(l=>{let a=Me(e.show);return It(()=>{if(l===a)return a;let i=s,c=t();a?o("present"):c==="none"||n()?.display==="none"?o("hidden"):o(l===!0&&i!==c?"hiding":"hidden")}),a}),B(()=>{let l=Me(e.element);if(!l)return;let a=c=>{c.target===l&&(s=t())},i=c=>{let d=t().includes(c.animationName);c.target===l&&d&&r()==="hiding"&&o("hidden")};l.addEventListener("animationstart",a),l.addEventListener("animationcancel",i),l.addEventListener("animationend",i),U(()=>{l.removeEventListener("animationstart",a),l.removeEventListener("animationcancel",i),l.removeEventListener("animationend",i)})}),{present:()=>r()==="present"||r()==="hiding",state:r}},Oa=La,Fi=Oa,Pn="data-kb-top-layer",_i,ar=!1,ht=[];function un(e){return ht.findIndex(n=>n.node===e)}function qa(e){return ht[un(e)]}function Fa(e){return ht[ht.length-1].node===e}function zi(){return ht.filter(e=>e.isPointerBlocking)}function _a(){return[...zi()].slice(-1)[0]}function br(){return zi().length>0}function Ri(e){let n=un(_a()?.node);return un(e)<n}function za(e){ht.push(e)}function Ra(e){let n=un(e);n<0||ht.splice(n,1)}function Ka(){for(let{node:e}of ht)e.style.pointerEvents=Ri(e)?"none":"auto"}function Ba(e){if(br()&&!ar){let n=nt(e);_i=document.body.style.pointerEvents,n.body.style.pointerEvents="none",ar=!0}}function Na(e){if(br())return;let n=nt(e);n.body.style.pointerEvents=_i,n.body.style.length===0&&n.body.removeAttribute("style"),ar=!1}var Oe={layers:ht,isTopMostLayer:Fa,hasPointerBlockingLayer:br,isBelowPointerBlockingLayer:Ri,addLayer:za,removeLayer:Ra,indexOf:un,find:qa,assignPointerEventToLayers:Ka,disableBodyPointerEvents:Ba,restoreBodyPointerEvents:Na},Ua={};Bn(Ua,{Button:()=>Ha,Root:()=>xr});var Ga=["button","color","file","image","reset","submit"];function Va(e){let n=e.tagName.toLowerCase();return n==="button"?!0:n==="input"&&e.type?Ga.indexOf(e.type)!==-1:!1}function xr(e){let n,t=Q({type:"button"},e),[r,o]=J(t,["ref","type","disabled"]),s=Kn(()=>n,()=>"button"),l=M(()=>{let c=s();return c==null?!1:Va({tagName:c,type:r.type})}),a=M(()=>s()==="input"),i=M(()=>s()==="a"&&n?.getAttribute("href")!=null);return m(ue,j({as:"button",ref(c){let u=De(d=>n=d,r.ref);typeof u=="function"&&u(c)},get type(){return l()||a()?r.type:void 0},get role(){return!l()&&!i()?"button":void 0},get tabIndex(){return!l()&&!i()&&!r.disabled?0:void 0},get disabled(){return l()||a()?r.disabled:void 0},get"aria-disabled"(){return!l()&&!a()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?"":void 0}},o))}var Ha=xr,ja=["top","right","bottom","left"],tt=Math.min,Fe=Math.max,Ln=Math.round,An=Math.floor,Ct=e=>({x:e,y:e}),Wa={left:"right",right:"left",bottom:"top",top:"bottom"},Qa={start:"end",end:"start"};function cr(e,n,t){return Fe(e,tt(n,t))}function _t(e,n){return typeof e=="function"?e(n):e}function St(e){return e.split("-")[0]}function jt(e){return e.split("-")[1]}function Ki(e){return e==="x"?"y":"x"}function wr(e){return e==="y"?"height":"width"}function qt(e){return["top","bottom"].includes(St(e))?"y":"x"}function $r(e){return Ki(qt(e))}function Ya(e,n,t){t===void 0&&(t=!1);let r=jt(e),o=$r(e),s=wr(o),l=o==="x"?r===(t?"end":"start")?"right":"left":r==="start"?"bottom":"top";return n.reference[s]>n.floating[s]&&(l=On(l)),[l,On(l)]}function Xa(e){let n=On(e);return[ur(e),n,ur(n)]}function ur(e){return e.replace(/start|end/g,n=>Qa[n])}function Za(e,n,t){let r=["left","right"],o=["right","left"],s=["top","bottom"],l=["bottom","top"];switch(e){case"top":case"bottom":return t?n?o:r:n?r:o;case"left":case"right":return n?s:l;default:return[]}}function Ja(e,n,t,r){let o=jt(e),s=Za(St(e),t==="start",r);return o&&(s=s.map(l=>l+"-"+o),n&&(s=s.concat(s.map(ur)))),s}function On(e){return e.replace(/left|right|bottom|top/g,n=>Wa[n])}function ec(e){return X({top:0,right:0,bottom:0,left:0},e)}function Bi(e){return typeof e!="number"?ec(e):{top:e,right:e,bottom:e,left:e}}function qn(e){let{x:n,y:t,width:r,height:o}=e;return{width:r,height:o,top:t,left:n,right:n+r,bottom:t+o,x:n,y:t}}function Fo(e,n,t){let{reference:r,floating:o}=e,s=qt(n),l=$r(n),a=wr(l),i=St(n),c=s==="y",u=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,g=r[a]/2-o[a]/2,f;switch(i){case"top":f={x:u,y:r.y-o.height};break;case"bottom":f={x:u,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:d};break;case"left":f={x:r.x-o.width,y:d};break;default:f={x:r.x,y:r.y}}switch(jt(n)){case"start":f[l]-=g*(t&&c?-1:1);break;case"end":f[l]+=g*(t&&c?-1:1);break}return f}var tc=(e,n,t)=>Re(null,null,function*(){let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:l}=t,a=s.filter(Boolean),i=yield l.isRTL==null?void 0:l.isRTL(n),c=yield l.getElementRects({reference:e,floating:n,strategy:o}),{x:u,y:d}=Fo(c,r,i),g=r,f={},h=0;for(let p=0;p<a.length;p++){let{name:y,fn:v}=a[p],{x:b,y:x,data:w,reset:$}=yield v({x:u,y:d,initialPlacement:r,placement:g,strategy:o,middlewareData:f,rects:c,platform:l,elements:{reference:e,floating:n}});u=b??u,d=x??d,f=me(X({},f),{[y]:X(X({},f[y]),w)}),$&&h<=50&&(h++,typeof $=="object"&&($.placement&&(g=$.placement),$.rects&&(c=$.rects===!0?yield l.getElementRects({reference:e,floating:n,strategy:o}):$.rects),{x:u,y:d}=Fo(c,g,i)),p=-1)}return{x:u,y:d,placement:g,strategy:o,middlewareData:f}});function dn(e,n){return Re(this,null,function*(){var t;n===void 0&&(n={});let{x:r,y:o,platform:s,rects:l,elements:a,strategy:i}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:g=!1,padding:f=0}=_t(n,e),h=Bi(f),y=a[g?d==="floating"?"reference":"floating":d],v=qn(yield s.getClippingRect({element:(t=yield s.isElement==null?void 0:s.isElement(y))==null||t?y:y.contextElement||(yield s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:c,rootBoundary:u,strategy:i})),b=d==="floating"?{x:r,y:o,width:l.floating.width,height:l.floating.height}:l.reference,x=yield s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating),w=(yield s.isElement==null?void 0:s.isElement(x))?(yield s.getScale==null?void 0:s.getScale(x))||{x:1,y:1}:{x:1,y:1},$=qn(s.convertOffsetParentRelativeRectToViewportRelativeRect?yield s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:b,offsetParent:x,strategy:i}):b);return{top:(v.top-$.top+h.top)/w.y,bottom:($.bottom-v.bottom+h.bottom)/w.y,left:(v.left-$.left+h.left)/w.x,right:($.right-v.right+h.right)/w.x}})}var nc=e=>({name:"arrow",options:e,fn(t){return Re(this,null,function*(){let{x:r,y:o,placement:s,rects:l,platform:a,elements:i,middlewareData:c}=t,{element:u,padding:d=0}=_t(e,t)||{};if(u==null)return{};let g=Bi(d),f={x:r,y:o},h=$r(s),p=wr(h),y=yield a.getDimensions(u),v=h==="y",b=v?"top":"left",x=v?"bottom":"right",w=v?"clientHeight":"clientWidth",$=l.reference[p]+l.reference[h]-f[h]-l.floating[p],q=f[h]-l.reference[h],D=yield a.getOffsetParent==null?void 0:a.getOffsetParent(u),P=D?D[w]:0;(!P||!(yield a.isElement==null?void 0:a.isElement(D)))&&(P=i.floating[w]||l.floating[p]);let S=$/2-q/2,F=P/2-y[p]/2-1,V=tt(g[b],F),G=tt(g[x],F),Y=V,Ce=P-y[p]-G,te=P/2-y[p]/2+S,ne=cr(Y,te,Ce),ge=!c.arrow&&jt(s)!=null&&te!==ne&&l.reference[p]/2-(te<Y?V:G)-y[p]/2<0,oe=ge?te<Y?te-Y:te-Ce:0;return{[h]:f[h]+oe,data:X({[h]:ne,centerOffset:te-ne-oe},ge&&{alignmentOffset:oe}),reset:ge}})}}),rc=function(e){return e===void 0&&(e={}),{name:"flip",options:e,fn(t){return Re(this,null,function*(){var r,o;let{placement:s,middlewareData:l,rects:a,initialPlacement:i,platform:c,elements:u}=t,te=_t(e,t),{mainAxis:d=!0,crossAxis:g=!0,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:p="none",flipAlignment:y=!0}=te,v=tn(te,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","fallbackAxisSideDirection","flipAlignment"]);if((r=l.arrow)!=null&&r.alignmentOffset)return{};let b=St(s),x=qt(i),w=St(i)===i,$=yield c.isRTL==null?void 0:c.isRTL(u.floating),q=f||(w||!y?[On(i)]:Xa(i)),D=p!=="none";!f&&D&&q.push(...Ja(i,y,p,$));let P=[i,...q],S=yield dn(t,v),F=[],V=((o=l.flip)==null?void 0:o.overflows)||[];if(d&&F.push(S[b]),g){let ne=Ya(s,a,$);F.push(S[ne[0]],S[ne[1]])}if(V=[...V,{placement:s,overflows:F}],!F.every(ne=>ne<=0)){var G,Y;let ne=(((G=l.flip)==null?void 0:G.index)||0)+1,ge=P[ne];if(ge)return{data:{index:ne,overflows:V},reset:{placement:ge}};let oe=(Y=V.filter(he=>he.overflows[0]<=0).sort((he,ie)=>he.overflows[1]-ie.overflows[1])[0])==null?void 0:Y.placement;if(!oe)switch(h){case"bestFit":{var Ce;let he=(Ce=V.filter(ie=>{if(D){let de=qt(ie.placement);return de===x||de==="y"}return!0}).map(ie=>[ie.placement,ie.overflows.filter(de=>de>0).reduce((de,fe)=>de+fe,0)]).sort((ie,de)=>ie[1]-de[1])[0])==null?void 0:Ce[0];he&&(oe=he);break}case"initialPlacement":oe=i;break}if(s!==oe)return{reset:{placement:oe}}}return{}})}}};function _o(e,n){return{top:e.top-n.height,right:e.right-n.width,bottom:e.bottom-n.height,left:e.left-n.width}}function zo(e){return ja.some(n=>e[n]>=0)}var oc=function(e){return e===void 0&&(e={}),{name:"hide",options:e,fn(t){return Re(this,null,function*(){let{rects:r}=t,l=_t(e,t),{strategy:o="referenceHidden"}=l,s=tn(l,["strategy"]);switch(o){case"referenceHidden":{let a=yield dn(t,me(X({},s),{elementContext:"reference"})),i=_o(a,r.reference);return{data:{referenceHiddenOffsets:i,referenceHidden:zo(i)}}}case"escaped":{let a=yield dn(t,me(X({},s),{altBoundary:!0})),i=_o(a,r.floating);return{data:{escapedOffsets:i,escaped:zo(i)}}}default:return{}}})}}};function ic(e,n){return Re(this,null,function*(){let{placement:t,platform:r,elements:o}=e,s=yield r.isRTL==null?void 0:r.isRTL(o.floating),l=St(t),a=jt(t),i=qt(t)==="y",c=["left","top"].includes(l)?-1:1,u=s&&i?-1:1,d=_t(n,e),{mainAxis:g,crossAxis:f,alignmentAxis:h}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:X({mainAxis:0,crossAxis:0,alignmentAxis:null},d);return a&&typeof h=="number"&&(f=a==="end"?h*-1:h),i?{x:f*u,y:g*c}:{x:g*c,y:f*u}})}var sc=function(e){return e===void 0&&(e=0),{name:"offset",options:e,fn(t){return Re(this,null,function*(){var r,o;let{x:s,y:l,placement:a,middlewareData:i}=t,c=yield ic(t,e);return a===((r=i.offset)==null?void 0:r.placement)&&(o=i.arrow)!=null&&o.alignmentOffset?{}:{x:s+c.x,y:l+c.y,data:me(X({},c),{placement:a})}})}}},lc=function(e){return e===void 0&&(e={}),{name:"shift",options:e,fn(t){return Re(this,null,function*(){let{x:r,y:o,placement:s}=t,v=_t(e,t),{mainAxis:l=!0,crossAxis:a=!1,limiter:i={fn:b=>{let{x,y:w}=b;return{x,y:w}}}}=v,c=tn(v,["mainAxis","crossAxis","limiter"]),u={x:r,y:o},d=yield dn(t,c),g=qt(St(s)),f=Ki(g),h=u[f],p=u[g];if(l){let b=f==="y"?"top":"left",x=f==="y"?"bottom":"right",w=h+d[b],$=h-d[x];h=cr(w,h,$)}if(a){let b=g==="y"?"top":"left",x=g==="y"?"bottom":"right",w=p+d[b],$=p-d[x];p=cr(w,p,$)}let y=i.fn(me(X({},t),{[f]:h,[g]:p}));return me(X({},y),{data:{x:y.x-r,y:y.y-o}})})}}},ac=function(e){return e===void 0&&(e={}),{name:"size",options:e,fn(t){return Re(this,null,function*(){let{placement:r,rects:o,platform:s,elements:l}=t,S=_t(e,t),{apply:a=()=>{}}=S,i=tn(S,["apply"]),c=yield dn(t,i),u=St(r),d=jt(r),g=qt(r)==="y",{width:f,height:h}=o.floating,p,y;u==="top"||u==="bottom"?(p=u,y=d===((yield s.isRTL==null?void 0:s.isRTL(l.floating))?"start":"end")?"left":"right"):(y=u,p=d==="end"?"top":"bottom");let v=h-c.top-c.bottom,b=f-c.left-c.right,x=tt(h-c[p],v),w=tt(f-c[y],b),$=!t.middlewareData.shift,q=x,D=w;if(g?D=d||$?tt(w,b):b:q=d||$?tt(x,v):v,$&&!d){let F=Fe(c.left,0),V=Fe(c.right,0),G=Fe(c.top,0),Y=Fe(c.bottom,0);g?D=f-2*(F!==0||V!==0?F+V:Fe(c.left,c.right)):q=h-2*(G!==0||Y!==0?G+Y:Fe(c.top,c.bottom))}yield a(me(X({},t),{availableWidth:D,availableHeight:q}));let P=yield s.getDimensions(l.floating);return f!==P.width||h!==P.height?{reset:{rects:!0}}:{}})}}};function Wt(e){return Ni(e)?(e.nodeName||"").toLowerCase():"#document"}function _e(e){var n;return(e==null||(n=e.ownerDocument)==null?void 0:n.defaultView)||window}function pt(e){var n;return(n=(Ni(e)?e.ownerDocument:e.document)||window.document)==null?void 0:n.documentElement}function Ni(e){return e instanceof Node||e instanceof _e(e).Node}function Xe(e){return e instanceof Element||e instanceof _e(e).Element}function rt(e){return e instanceof HTMLElement||e instanceof _e(e).HTMLElement}function Ro(e){return typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof _e(e).ShadowRoot}function yn(e){let{overflow:n,overflowX:t,overflowY:r,display:o}=Ze(e);return/auto|scroll|overlay|hidden|clip/.test(n+r+t)&&!["inline","contents"].includes(o)}function cc(e){return["table","td","th"].includes(Wt(e))}function Nn(e){return[":popover-open",":modal"].some(n=>{try{return e.matches(n)}catch{return!1}})}function Cr(e){let n=Sr(),t=Xe(e)?Ze(e):e;return t.transform!=="none"||t.perspective!=="none"||(t.containerType?t.containerType!=="normal":!1)||!n&&(t.backdropFilter?t.backdropFilter!=="none":!1)||!n&&(t.filter?t.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(t.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(t.contain||"").includes(r))}function uc(e){let n=kt(e);for(;rt(n)&&!Ht(n);){if(Cr(n))return n;if(Nn(n))return null;n=kt(n)}return null}function Sr(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Ht(e){return["html","body","#document"].includes(Wt(e))}function Ze(e){return _e(e).getComputedStyle(e)}function Un(e){return Xe(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function kt(e){if(Wt(e)==="html")return e;let n=e.assignedSlot||e.parentNode||Ro(e)&&e.host||pt(e);return Ro(n)?n.host:n}function Ui(e){let n=kt(e);return Ht(n)?e.ownerDocument?e.ownerDocument.body:e.body:rt(n)&&yn(n)?n:Ui(n)}function fn(e,n,t){var r;n===void 0&&(n=[]),t===void 0&&(t=!0);let o=Ui(e),s=o===((r=e.ownerDocument)==null?void 0:r.body),l=_e(o);return s?n.concat(l,l.visualViewport||[],yn(o)?o:[],l.frameElement&&t?fn(l.frameElement):[]):n.concat(o,fn(o,[],t))}function Gi(e){let n=Ze(e),t=parseFloat(n.width)||0,r=parseFloat(n.height)||0,o=rt(e),s=o?e.offsetWidth:t,l=o?e.offsetHeight:r,a=Ln(t)!==s||Ln(r)!==l;return a&&(t=s,r=l),{width:t,height:r,$:a}}function kr(e){return Xe(e)?e:e.contextElement}function Vt(e){let n=kr(e);if(!rt(n))return Ct(1);let t=n.getBoundingClientRect(),{width:r,height:o,$:s}=Gi(n),l=(s?Ln(t.width):t.width)/r,a=(s?Ln(t.height):t.height)/o;return(!l||!Number.isFinite(l))&&(l=1),(!a||!Number.isFinite(a))&&(a=1),{x:l,y:a}}var dc=Ct(0);function Vi(e){let n=_e(e);return!Sr()||!n.visualViewport?dc:{x:n.visualViewport.offsetLeft,y:n.visualViewport.offsetTop}}function fc(e,n,t){return n===void 0&&(n=!1),!t||n&&t!==_e(e)?!1:n}function Ft(e,n,t,r){n===void 0&&(n=!1),t===void 0&&(t=!1);let o=e.getBoundingClientRect(),s=kr(e),l=Ct(1);n&&(r?Xe(r)&&(l=Vt(r)):l=Vt(e));let a=fc(s,t,r)?Vi(s):Ct(0),i=(o.left+a.x)/l.x,c=(o.top+a.y)/l.y,u=o.width/l.x,d=o.height/l.y;if(s){let g=_e(s),f=r&&Xe(r)?_e(r):r,h=g,p=h.frameElement;for(;p&&r&&f!==h;){let y=Vt(p),v=p.getBoundingClientRect(),b=Ze(p),x=v.left+(p.clientLeft+parseFloat(b.paddingLeft))*y.x,w=v.top+(p.clientTop+parseFloat(b.paddingTop))*y.y;i*=y.x,c*=y.y,u*=y.x,d*=y.y,i+=x,c+=w,h=_e(p),p=h.frameElement}}return qn({width:u,height:d,x:i,y:c})}function gc(e){let{elements:n,rect:t,offsetParent:r,strategy:o}=e,s=o==="fixed",l=pt(r),a=n?Nn(n.floating):!1;if(r===l||a&&s)return t;let i={scrollLeft:0,scrollTop:0},c=Ct(1),u=Ct(0),d=rt(r);if((d||!d&&!s)&&((Wt(r)!=="body"||yn(l))&&(i=Un(r)),rt(r))){let g=Ft(r);c=Vt(r),u.x=g.x+r.clientLeft,u.y=g.y+r.clientTop}return{width:t.width*c.x,height:t.height*c.y,x:t.x*c.x-i.scrollLeft*c.x+u.x,y:t.y*c.y-i.scrollTop*c.y+u.y}}function hc(e){return Array.from(e.getClientRects())}function Hi(e){return Ft(pt(e)).left+Un(e).scrollLeft}function pc(e){let n=pt(e),t=Un(e),r=e.ownerDocument.body,o=Fe(n.scrollWidth,n.clientWidth,r.scrollWidth,r.clientWidth),s=Fe(n.scrollHeight,n.clientHeight,r.scrollHeight,r.clientHeight),l=-t.scrollLeft+Hi(e),a=-t.scrollTop;return Ze(r).direction==="rtl"&&(l+=Fe(n.clientWidth,r.clientWidth)-o),{width:o,height:s,x:l,y:a}}function mc(e,n){let t=_e(e),r=pt(e),o=t.visualViewport,s=r.clientWidth,l=r.clientHeight,a=0,i=0;if(o){s=o.width,l=o.height;let c=Sr();(!c||c&&n==="fixed")&&(a=o.offsetLeft,i=o.offsetTop)}return{width:s,height:l,x:a,y:i}}function yc(e,n){let t=Ft(e,!0,n==="fixed"),r=t.top+e.clientTop,o=t.left+e.clientLeft,s=rt(e)?Vt(e):Ct(1),l=e.clientWidth*s.x,a=e.clientHeight*s.y,i=o*s.x,c=r*s.y;return{width:l,height:a,x:i,y:c}}function Ko(e,n,t){let r;if(n==="viewport")r=mc(e,t);else if(n==="document")r=pc(pt(e));else if(Xe(n))r=yc(n,t);else{let o=Vi(e);r=me(X({},n),{x:n.x-o.x,y:n.y-o.y})}return qn(r)}function ji(e,n){let t=kt(e);return t===n||!Xe(t)||Ht(t)?!1:Ze(t).position==="fixed"||ji(t,n)}function vc(e,n){let t=n.get(e);if(t)return t;let r=fn(e,[],!1).filter(a=>Xe(a)&&Wt(a)!=="body"),o=null,s=Ze(e).position==="fixed",l=s?kt(e):e;for(;Xe(l)&&!Ht(l);){let a=Ze(l),i=Cr(l);!i&&a.position==="fixed"&&(o=null),(s?!i&&!o:!i&&a.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||yn(l)&&!i&&ji(e,l))?r=r.filter(u=>u!==l):o=a,l=kt(l)}return n.set(e,r),r}function bc(e){let{element:n,boundary:t,rootBoundary:r,strategy:o}=e,l=[...t==="clippingAncestors"?Nn(n)?[]:vc(n,this._c):[].concat(t),r],a=l[0],i=l.reduce((c,u)=>{let d=Ko(n,u,o);return c.top=Fe(d.top,c.top),c.right=tt(d.right,c.right),c.bottom=tt(d.bottom,c.bottom),c.left=Fe(d.left,c.left),c},Ko(n,a,o));return{width:i.right-i.left,height:i.bottom-i.top,x:i.left,y:i.top}}function xc(e){let{width:n,height:t}=Gi(e);return{width:n,height:t}}function wc(e,n,t){let r=rt(n),o=pt(n),s=t==="fixed",l=Ft(e,!0,s,n),a={scrollLeft:0,scrollTop:0},i=Ct(0);if(r||!r&&!s)if((Wt(n)!=="body"||yn(o))&&(a=Un(n)),r){let d=Ft(n,!0,s,n);i.x=d.x+n.clientLeft,i.y=d.y+n.clientTop}else o&&(i.x=Hi(o));let c=l.left+a.scrollLeft-i.x,u=l.top+a.scrollTop-i.y;return{x:c,y:u,width:l.width,height:l.height}}function Jn(e){return Ze(e).position==="static"}function Bo(e,n){return!rt(e)||Ze(e).position==="fixed"?null:n?n(e):e.offsetParent}function Wi(e,n){let t=_e(e);if(Nn(e))return t;if(!rt(e)){let o=kt(e);for(;o&&!Ht(o);){if(Xe(o)&&!Jn(o))return o;o=kt(o)}return t}let r=Bo(e,n);for(;r&&cc(r)&&Jn(r);)r=Bo(r,n);return r&&Ht(r)&&Jn(r)&&!Cr(r)?t:r||uc(e)||t}var $c=function(e){return Re(this,null,function*(){let n=this.getOffsetParent||Wi,t=this.getDimensions,r=yield t(e.floating);return{reference:wc(e.reference,yield n(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}})};function Cc(e){return Ze(e).direction==="rtl"}var Qi={convertOffsetParentRelativeRectToViewportRelativeRect:gc,getDocumentElement:pt,getClippingRect:bc,getOffsetParent:Wi,getElementRects:$c,getClientRects:hc,getDimensions:xc,getScale:Vt,isElement:Xe,isRTL:Cc};function Sc(e,n){let t=null,r,o=pt(e);function s(){var a;clearTimeout(r),(a=t)==null||a.disconnect(),t=null}function l(a,i){a===void 0&&(a=!1),i===void 0&&(i=1),s();let{left:c,top:u,width:d,height:g}=e.getBoundingClientRect();if(a||n(),!d||!g)return;let f=An(u),h=An(o.clientWidth-(c+d)),p=An(o.clientHeight-(u+g)),y=An(c),b={rootMargin:-f+"px "+-h+"px "+-p+"px "+-y+"px",threshold:Fe(0,tt(1,i))||1},x=!0;function w($){let q=$[0].intersectionRatio;if(q!==i){if(!x)return l();q?l(!1,q):r=setTimeout(()=>{l(!1,1e-7)},1e3)}x=!1}try{t=new IntersectionObserver(w,me(X({},b),{root:o.ownerDocument}))}catch{t=new IntersectionObserver(w,b)}t.observe(e)}return l(!0),s}function kc(e,n,t,r){r===void 0&&(r={});let{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:i=!1}=r,c=kr(e),u=o||s?[...c?fn(c):[],...fn(n)]:[];u.forEach(v=>{o&&v.addEventListener("scroll",t,{passive:!0}),s&&v.addEventListener("resize",t)});let d=c&&a?Sc(c,t):null,g=-1,f=null;l&&(f=new ResizeObserver(v=>{let[b]=v;b&&b.target===c&&f&&(f.unobserve(n),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var x;(x=f)==null||x.observe(n)})),t()}),c&&!i&&f.observe(c),f.observe(n));let h,p=i?Ft(e):null;i&&y();function y(){let v=Ft(e);p&&(v.x!==p.x||v.y!==p.y||v.width!==p.width||v.height!==p.height)&&t(),p=v,h=requestAnimationFrame(y)}return t(),()=>{var v;u.forEach(b=>{o&&b.removeEventListener("scroll",t),s&&b.removeEventListener("resize",t)}),d?.(),(v=f)==null||v.disconnect(),f=null,i&&cancelAnimationFrame(h)}}var Ec=sc,Mc=lc,Tc=rc,Ac=ac,Ic=oc,Dc=nc,Pc=(e,n,t)=>{let r=new Map,o=X({platform:Qi},t),s=me(X({},o.platform),{_c:r});return tc(e,n,me(X({},o),{platform:s}))},Er=be();function Mr(){let e=xe(Er);if(e===void 0)throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Lc=_('<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">'),dr=30,No=dr/2,Oc={top:180,right:-90,bottom:0,left:90};function Tr(e){let n=Mr(),t=Q({size:dr},e),[r,o]=J(t,["ref","style","size"]),s=()=>n.currentPlacement().split("-")[0],l=qc(n.contentRef),a=()=>l()?.getPropertyValue("background-color")||"none",i=()=>l()?.getPropertyValue(`border-${s()}-color`)||"none",c=()=>l()?.getPropertyValue(`border-${s()}-width`)||"0px",u=()=>Number.parseInt(c())*2*(dr/r.size),d=()=>`rotate(${Oc[s()]} ${No} ${No}) translate(0 2)`;return m(ue,j({as:"div",ref(g){let f=De(n.setArrowRef,r.ref);typeof f=="function"&&f(g)},"aria-hidden":"true",get style(){return zn({position:"absolute","font-size":`${r.size}px`,width:"1em",height:"1em","pointer-events":"none",fill:a(),stroke:i(),"stroke-width":u()},r.style)}},o,{get children(){let g=Lc(),f=g.firstChild;return N(()=>A(f,"transform",d())),g}}))}function qc(e){let[n,t]=z();return B(()=>{let r=e();r&&t(Ol(r).getComputedStyle(r))}),n}function Fc(e){let n=Mr(),[t,r]=J(e,["ref","style"]);return m(ue,j({as:"div",ref(o){let s=De(n.setPositionerRef,t.ref);typeof s=="function"&&s(o)},"data-popper-positioner":"",get style(){return zn({position:"absolute",top:0,left:0,"min-width":"max-content"},t.style)}},r))}function Uo(e){let{x:n=0,y:t=0,width:r=0,height:o=0}=e??{};if(typeof DOMRect=="function")return new DOMRect(n,t,r,o);let s={x:n,y:t,width:r,height:o,top:t,right:n+r,bottom:t+o,left:n};return me(X({},s),{toJSON:()=>s})}function _c(e,n){return{contextElement:e,getBoundingClientRect:()=>{let r=n(e);return r?Uo(r):e?e.getBoundingClientRect():Uo()}}}function zc(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Rc={top:"bottom",right:"left",bottom:"top",left:"right"};function Kc(e,n){let[t,r]=e.split("-"),o=Rc[t];return r?t==="left"||t==="right"?`${o} ${r==="start"?"top":"bottom"}`:r==="start"?`${o} ${n==="rtl"?"right":"left"}`:`${o} ${n==="rtl"?"left":"right"}`:`${o} center`}function Bc(e){let n=Q({getAnchorRect:g=>g?.getBoundingClientRect(),placement:"bottom",gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[t,r]=z(),[o,s]=z(),[l,a]=z(n.placement),i=()=>_c(n.anchorRef?.(),n.getAnchorRect),{direction:c}=Et();function u(){return Re(this,null,function*(){let g=i(),f=t(),h=o();if(!g||!f)return;let p=(h?.clientHeight||0)/2,y=typeof n.gutter=="number"?n.gutter+p:n.gutter??p;f.style.setProperty("--kb-popper-content-overflow-padding",`${n.overflowPadding}px`),g.getBoundingClientRect();let v=[Ec(({placement:q})=>{let D=!!q.split("-")[1];return{mainAxis:y,crossAxis:D?void 0:n.shift,alignmentAxis:n.shift}})];if(n.flip!==!1){let q=typeof n.flip=="string"?n.flip.split(" "):void 0;if(q!==void 0&&!q.every(zc))throw new Error("`flip` expects a spaced-delimited list of placements");v.push(Tc({padding:n.overflowPadding,fallbackPlacements:q}))}(n.slide||n.overlap)&&v.push(Mc({mainAxis:n.slide,crossAxis:n.overlap,padding:n.overflowPadding})),v.push(Ac({padding:n.overflowPadding,apply({availableWidth:q,availableHeight:D,rects:P}){let S=Math.round(P.reference.width);q=Math.floor(q),D=Math.floor(D),f.style.setProperty("--kb-popper-anchor-width",`${S}px`),f.style.setProperty("--kb-popper-content-available-width",`${q}px`),f.style.setProperty("--kb-popper-content-available-height",`${D}px`),n.sameWidth&&(f.style.width=`${S}px`),n.fitViewport&&(f.style.maxWidth=`${q}px`,f.style.maxHeight=`${D}px`)}})),n.hideWhenDetached&&v.push(Ic({padding:n.detachedPadding})),h&&v.push(Dc({element:h,padding:n.arrowPadding}));let b=yield Pc(g,f,{placement:n.placement,strategy:"absolute",middleware:v,platform:me(X({},Qi),{isRTL:()=>c()==="rtl"})});if(a(b.placement),n.onCurrentPlacementChange?.(b.placement),!f)return;f.style.setProperty("--kb-popper-content-transform-origin",Kc(b.placement,c()));let x=Math.round(b.x),w=Math.round(b.y),$;if(n.hideWhenDetached&&($=b.middlewareData.hide?.referenceHidden?"hidden":"visible"),Object.assign(f.style,{top:"0",left:"0",transform:`translate3d(${x}px, ${w}px, 0)`,visibility:$}),h&&b.middlewareData.arrow){let{x:q,y:D}=b.middlewareData.arrow,P=b.placement.split("-")[0];Object.assign(h.style,{left:q!=null?`${q}px`:"",top:D!=null?`${D}px`:"",[P]:"100%"})}})}B(()=>{let g=i(),f=t();if(!g||!f)return;let h=kc(g,f,u,{elementResize:typeof ResizeObserver=="function"});U(h)}),B(()=>{let g=t(),f=n.contentRef?.();!g||!f||queueMicrotask(()=>{g.style.zIndex=getComputedStyle(f).zIndex})});let d={currentPlacement:l,contentRef:()=>n.contentRef?.(),setPositionerRef:r,setArrowRef:s};return m(Er.Provider,{value:d,get children(){return n.children}})}var Yi=Object.assign(Bc,{Arrow:Tr,Context:Er,usePopperContext:Mr,Positioner:Fc});function Nc(e){let n=t=>{t.key===pr.Escape&&e.onEscapeKeyDown?.(t)};B(()=>{if(Ee||E(e.isDisabled))return;let t=e.ownerDocument?.()??nt();t.addEventListener("keydown",n),U(()=>{t.removeEventListener("keydown",n)})})}var Go="interactOutside.pointerDownOutside",Vo="interactOutside.focusOutside";function Uc(e,n){let t,r=Yl,o=()=>nt(n()),s=d=>e.onPointerDownOutside?.(d),l=d=>e.onFocusOutside?.(d),a=d=>e.onInteractOutside?.(d),i=d=>{let g=d.target;return!(g instanceof HTMLElement)||g.closest(`[${Pn}]`)||!Ue(o(),g)||Ue(n(),g)?!1:!e.shouldExcludeElement?.(g)},c=d=>{function g(){let f=n(),h=d.target;if(!f||!h||!i(d))return;let p=we([s,a]);h.addEventListener(Go,p,{once:!0});let y=new CustomEvent(Go,{bubbles:!1,cancelable:!0,detail:{originalEvent:d,isContextMenu:d.button===2||Rl(d)&&d.button===0}});h.dispatchEvent(y)}d.pointerType==="touch"?(o().removeEventListener("click",g),r=g,o().addEventListener("click",g,{once:!0})):g()},u=d=>{let g=n(),f=d.target;if(!g||!f||!i(d))return;let h=we([l,a]);f.addEventListener(Vo,h,{once:!0});let p=new CustomEvent(Vo,{bubbles:!1,cancelable:!0,detail:{originalEvent:d,isContextMenu:!1}});f.dispatchEvent(p)};B(()=>{Ee||E(e.isDisabled)||(t=window.setTimeout(()=>{o().addEventListener("pointerdown",c,!0)},0),o().addEventListener("focusin",u,!0),U(()=>{window.clearTimeout(t),o().removeEventListener("click",r),o().removeEventListener("pointerdown",c,!0),o().removeEventListener("focusin",u,!0)}))})}var Xi=be();function Gc(){return xe(Xi)}function Vc(e){let n,t=Gc(),[r,o]=J(e,["ref","disableOutsidePointerEvents","excludedElements","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","bypassTopMostLayerCheck"]),s=new Set([]),l=d=>{s.add(d);let g=t?.registerNestedLayer(d);return()=>{s.delete(d),g?.()}};Uc({shouldExcludeElement:d=>n?r.excludedElements?.some(g=>Ue(g(),d))||[...s].some(g=>Ue(g,d)):!1,onPointerDownOutside:d=>{!n||Oe.isBelowPointerBlockingLayer(n)||!r.bypassTopMostLayerCheck&&!Oe.isTopMostLayer(n)||(r.onPointerDownOutside?.(d),r.onInteractOutside?.(d),d.defaultPrevented||r.onDismiss?.())},onFocusOutside:d=>{r.onFocusOutside?.(d),r.onInteractOutside?.(d),d.defaultPrevented||r.onDismiss?.()}},()=>n),Nc({ownerDocument:()=>nt(n),onEscapeKeyDown:d=>{!n||!Oe.isTopMostLayer(n)||(r.onEscapeKeyDown?.(d),!d.defaultPrevented&&r.onDismiss&&(d.preventDefault(),r.onDismiss()))}}),xt(()=>{if(!n)return;Oe.addLayer({node:n,isPointerBlocking:r.disableOutsidePointerEvents,dismiss:r.onDismiss});let d=t?.registerNestedLayer(n);Oe.assignPointerEventToLayers(),Oe.disableBodyPointerEvents(n),U(()=>{n&&(Oe.removeLayer(n),d?.(),Oe.assignPointerEventToLayers(),Oe.restoreBodyPointerEvents(n))})}),B(et([()=>n,()=>r.disableOutsidePointerEvents],([d,g])=>{if(!d)return;let f=Oe.find(d);f&&f.isPointerBlocking!==g&&(f.isPointerBlocking=g,Oe.assignPointerEventToLayers()),g&&Oe.disableBodyPointerEvents(d),U(()=>{Oe.restoreBodyPointerEvents(d)})},{defer:!0}));let u={registerNestedLayer:l};return m(Xi.Provider,{value:u,get children(){return m(ue,j({as:"div",ref(d){let g=De(f=>n=f,r.ref);typeof g=="function"&&g(d)}},o))}})}function Zi(e={}){let[n,t]=Ei({value:()=>E(e.open),defaultValue:()=>!!E(e.defaultOpen),onChange:l=>e.onOpenChange?.(l)}),r=()=>{t(!0)},o=()=>{t(!1)};return{isOpen:n,setIsOpen:t,open:r,close:o,toggle:()=>{n()?o():r()}}}var Ne={};Bn(Ne,{Description:()=>Si,ErrorMessage:()=>ki,Item:()=>ns,ItemControl:()=>rs,ItemDescription:()=>os,ItemIndicator:()=>is,ItemInput:()=>ss,ItemLabel:()=>ls,Label:()=>as,RadioGroup:()=>Hc,Root:()=>cs});var Ji=be();function es(){let e=xe(Ji);if(e===void 0)throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var ts=be();function vn(){let e=xe(ts);if(e===void 0)throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function ns(e){let n=pn(),t=es(),r=`${n.generateId("item")}-${Le()}`,o=Q({id:r},e),[s,l]=J(o,["value","disabled","onPointerDown"]),[a,i]=z(),[c,u]=z(),[d,g]=z(),[f,h]=z(),[p,y]=z(!1),v=M(()=>t.isSelectedValue(s.value)),b=M(()=>s.disabled||n.isDisabled()||!1),x=q=>{ce(q,s.onPointerDown),p()&&q.preventDefault()},w=M(()=>me(X({},n.dataset()),{"data-disabled":b()?"":void 0,"data-checked":v()?"":void 0})),$={value:()=>s.value,dataset:w,isSelected:v,isDisabled:b,inputId:a,labelId:c,descriptionId:d,inputRef:f,select:()=>t.setSelectedValue(s.value),generateId:hn(()=>l.id),registerInput:Ge(i),registerLabel:Ge(u),registerDescription:Ge(g),setIsFocused:y,setInputRef:h};return m(ts.Provider,{value:$,get children(){return m(ue,j({as:"div",role:"group",onPointerDown:x},w,l))}})}function rs(e){let n=vn(),t=Q({id:n.generateId("control")},e),[r,o]=J(t,["onClick","onKeyDown"]);return m(ue,j({as:"div",onClick:a=>{ce(a,r.onClick),n.select(),n.inputRef()?.focus()},onKeyDown:a=>{ce(a,r.onKeyDown),a.key===pr.Space&&(n.select(),n.inputRef()?.focus())}},()=>n.dataset(),o))}function os(e){let n=vn(),t=Q({id:n.generateId("description")},e);return B(()=>U(n.registerDescription(t.id))),m(ue,j({as:"div"},()=>n.dataset(),t))}function is(e){let n=vn(),t=Q({id:n.generateId("indicator")},e),[r,o]=J(t,["ref","forceMount"]),[s,l]=z(),{present:a}=Fi({show:()=>r.forceMount||n.isSelected(),element:()=>s()??null});return m(R,{get when(){return a()},get children(){return m(ue,j({as:"div",ref(i){let c=De(l,r.ref);typeof c=="function"&&c(i)}},()=>n.dataset(),o))}})}function ss(e){let n=pn(),t=es(),r=vn(),o=Q({id:r.generateId("input")},e),[s,l]=J(o,["ref","style","aria-labelledby","aria-describedby","onChange","onFocus","onBlur"]),a=()=>[s["aria-labelledby"],r.labelId(),s["aria-labelledby"]!=null&&l["aria-label"]!=null?l.id:void 0].filter(Boolean).join(" ")||void 0,i=()=>[s["aria-describedby"],r.descriptionId(),t.ariaDescribedBy()].filter(Boolean).join(" ")||void 0,[c,u]=z(!1),d=h=>{if(ce(h,s.onChange),h.stopPropagation(),!c()){t.setSelectedValue(r.value());let p=h.target;p.checked=r.isSelected()}u(!1)},g=h=>{ce(h,s.onFocus),r.setIsFocused(!0)},f=h=>{ce(h,s.onBlur),r.setIsFocused(!1)};return B(et([()=>r.isSelected(),()=>r.value()],h=>{if(!h[0]&&h[1]===r.value())return;u(!0);let p=r.inputRef();p?.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),p?.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))},{defer:!0})),B(()=>U(r.registerInput(l.id))),m(ue,j({as:"input",ref(h){let p=De(r.setInputRef,s.ref);typeof p=="function"&&p(h)},type:"radio",get name(){return n.name()},get value(){return r.value()},get checked(){return r.isSelected()},get required(){return n.isRequired()},get disabled(){return r.isDisabled()},get readonly(){return n.isReadOnly()},get style(){return zn(X({},$i),s.style)},get"aria-labelledby"(){return a()},get"aria-describedby"(){return i()},onChange:d,onFocus:g,onBlur:f},()=>r.dataset(),l))}function ls(e){let n=vn(),t=Q({id:n.generateId("label")},e);return B(()=>U(n.registerLabel(t.id))),m(ue,j({as:"label",get for(){return n.inputId()}},()=>n.dataset(),t))}function as(e){return m(ta,j({as:"span"},e))}function cs(e){let n,t=`radiogroup-${Le()}`,r=Q({id:t,orientation:"vertical"},e),[o,s,l]=J(r,["ref","value","defaultValue","onChange","orientation","aria-labelledby","aria-describedby"],Jl),[a,i]=mn({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:h=>o.onChange?.(h)}),{formControlContext:c}=ea(s);na(()=>n,()=>i(o.defaultValue??""));let u=()=>c.getAriaLabelledBy(E(s.id),l["aria-label"],o["aria-labelledby"]),d=()=>c.getAriaDescribedBy(o["aria-describedby"]),g=h=>h===a(),f={ariaDescribedBy:d,isSelectedValue:g,setSelectedValue:h=>{if(!(c.isReadOnly()||c.isDisabled())&&(i(h),n))for(let p of n.querySelectorAll("[type='radio']")){let y=p;y.checked=g(y.value)}}};return m(Ci.Provider,{value:c,get children(){return m(Ji.Provider,{value:f,get children(){return m(ue,j({as:"div",ref(h){let p=De(y=>n=y,o.ref);typeof p=="function"&&p(h)},role:"radiogroup",get id(){return E(s.id)},get"aria-invalid"(){return c.validationState()==="invalid"||void 0},get"aria-required"(){return c.isRequired()||void 0},get"aria-disabled"(){return c.isDisabled()||void 0},get"aria-readonly"(){return c.isReadOnly()||void 0},get"aria-orientation"(){return o.orientation},get"aria-labelledby"(){return u()},get"aria-describedby"(){return d()}},()=>c.dataset(),l))}})}})}var Hc=Object.assign(cs,{Description:Si,ErrorMessage:ki,Item:ns,ItemControl:rs,ItemDescription:os,ItemIndicator:is,ItemInput:ss,ItemLabel:ls,Label:as}),jc=class{collection;ref;collator;constructor(e,n,t){this.collection=e,this.ref=n,this.collator=t}getKeyBelow(e){let n=this.collection().getKeyAfter(e);for(;n!=null;){let t=this.collection().getItem(n);if(t&&t.type==="item"&&!t.disabled)return n;n=this.collection().getKeyAfter(n)}}getKeyAbove(e){let n=this.collection().getKeyBefore(e);for(;n!=null;){let t=this.collection().getItem(n);if(t&&t.type==="item"&&!t.disabled)return n;n=this.collection().getKeyBefore(n)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let n=this.collection().getItem(e);if(n&&n.type==="item"&&!n.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let n=this.collection().getItem(e);if(n&&n.type==="item"&&!n.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let n=this.ref?.(),t=this.getItem(e);if(!n||!t)return;let r=Math.max(0,t.offsetTop+t.offsetHeight-n.offsetHeight),o=e;for(;o&&t&&t.offsetTop>r;)o=this.getKeyAbove(o),t=o!=null?this.getItem(o):null;return o}getKeyPageBelow(e){let n=this.ref?.(),t=this.getItem(e);if(!n||!t)return;let r=Math.min(n.scrollHeight,t.offsetTop-t.offsetHeight+n.offsetHeight),o=e;for(;o&&t&&t.offsetTop<r;)o=this.getKeyBelow(o),t=o!=null?this.getItem(o):null;return o}getKeyForSearch(e,n){let t=this.collator?.();if(!t)return;let r=n!=null?this.getKeyBelow(n):this.getFirstKey();for(;r!=null;){let o=this.collection().getItem(r);if(o){let s=o.textValue.slice(0,e.length);if(o.textValue&&t.compare(s,e)===0)return r}r=this.getKeyBelow(r)}}};function Wc(e,n,t){let r=Ca({usage:"search",sensitivity:"base"}),o=M(()=>{let s=E(e.keyboardDelegate);return s||new jc(e.collection,n,r)});return Ia({selectionManager:()=>E(e.selectionManager),keyboardDelegate:o,autoFocus:()=>E(e.autoFocus),deferAutoFocus:()=>E(e.deferAutoFocus),shouldFocusWrap:()=>E(e.shouldFocusWrap),disallowEmptySelection:()=>E(e.disallowEmptySelection),selectOnFocus:()=>E(e.selectOnFocus),disallowTypeAhead:()=>E(e.disallowTypeAhead),shouldUseVirtualFocus:()=>E(e.shouldUseVirtualFocus),allowsTabNavigation:()=>E(e.allowsTabNavigation),isVirtualized:()=>E(e.isVirtualized),scrollToKey:s=>E(e.scrollToKey)?.(s),orientation:()=>E(e.orientation)},n)}var er="focusScope.autoFocusOnMount",tr="focusScope.autoFocusOnUnmount",Ho={bubbles:!1,cancelable:!0},jo={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=ir(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=ir(this.stack,e),this.active()?.resume()}};function Qc(e,n){let[t,r]=z(!1),o={pause(){r(!0)},resume(){r(!1)}},s=null,l=h=>e.onMountAutoFocus?.(h),a=h=>e.onUnmountAutoFocus?.(h),i=()=>nt(n()),c=()=>{let h=i().createElement("span");return h.setAttribute("data-focus-trap",""),h.tabIndex=0,Object.assign(h.style,$i),h},u=()=>{let h=n();return h?xi(h,!0).filter(p=>!p.hasAttribute("data-focus-trap")):[]},d=()=>{let h=u();return h.length>0?h[0]:null},g=()=>{let h=u();return h.length>0?h[h.length-1]:null},f=()=>{let h=n();if(!h)return!1;let p=ln(h);return!p||Ue(h,p)?!1:wi(p)};B(()=>{if(Ee)return;let h=n();if(!h)return;jo.add(o);let p=ln(h);if(!Ue(h,p)){let v=new CustomEvent(er,Ho);h.addEventListener(er,l),h.dispatchEvent(v),v.defaultPrevented||setTimeout(()=>{Te(d()),ln(h)===p&&Te(h)},0)}U(()=>{h.removeEventListener(er,l),setTimeout(()=>{let v=new CustomEvent(tr,Ho);f()&&v.preventDefault(),h.addEventListener(tr,a),h.dispatchEvent(v),v.defaultPrevented||Te(p??i().body),h.removeEventListener(tr,a),jo.remove(o)},0)})}),B(()=>{if(Ee)return;let h=n();if(!h||!E(e.trapFocus)||t())return;let p=v=>{let b=v.target;b?.closest(`[${Pn}]`)||(Ue(h,b)?s=b:Te(s))},y=v=>{let x=v.relatedTarget??ln(h);x?.closest(`[${Pn}]`)||Ue(h,x)||Te(s)};i().addEventListener("focusin",p),i().addEventListener("focusout",y),U(()=>{i().removeEventListener("focusin",p),i().removeEventListener("focusout",y)})}),B(()=>{if(Ee)return;let h=n();if(!h||!E(e.trapFocus)||t())return;let p=c();h.insertAdjacentElement("afterbegin",p);let y=c();h.insertAdjacentElement("beforeend",y);function v(x){let w=d(),$=g();x.relatedTarget===w?Te($):Te(w)}p.addEventListener("focusin",v),y.addEventListener("focusin",v);let b=new MutationObserver(x=>{for(let w of x)w.previousSibling===y&&(y.remove(),h.insertAdjacentElement("beforeend",y)),w.nextSibling===p&&(p.remove(),h.insertAdjacentElement("afterbegin",p))});b.observe(h,{childList:!0,subtree:!1}),U(()=>{p.removeEventListener("focusin",v),y.removeEventListener("focusin",v),p.remove(),y.remove(),b.disconnect()})})}var Yc="data-live-announcer";function Xc(e){B(()=>{E(e.isDisabled)||U(Zc(E(e.targets),E(e.root)))})}var on=new WeakMap,Be=[];function Zc(e,n=document.body){let t=new Set(e),r=new Set,o=i=>{for(let g of i.querySelectorAll(`[${Yc}], [${Pn}]`))t.add(g);let c=g=>{if(t.has(g)||g.parentElement&&r.has(g.parentElement)&&g.parentElement.getAttribute("role")!=="row")return NodeFilter.FILTER_REJECT;for(let f of t)if(g.contains(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},u=document.createTreeWalker(i,NodeFilter.SHOW_ELEMENT,{acceptNode:c}),d=c(i);if(d===NodeFilter.FILTER_ACCEPT&&s(i),d!==NodeFilter.FILTER_REJECT){let g=u.nextNode();for(;g!=null;)s(g),g=u.nextNode()}},s=i=>{let c=on.get(i)??0;i.getAttribute("aria-hidden")==="true"&&c===0||(c===0&&i.setAttribute("aria-hidden","true"),r.add(i),on.set(i,c+1))};Be.length&&Be[Be.length-1].disconnect(),o(n);let l=new MutationObserver(i=>{for(let c of i)if(!(c.type!=="childList"||c.addedNodes.length===0)&&![...t,...r].some(u=>u.contains(c.target))){for(let u of c.removedNodes)u instanceof Element&&(t.delete(u),r.delete(u));for(let u of c.addedNodes)(u instanceof HTMLElement||u instanceof SVGElement)&&(u.dataset.liveAnnouncer==="true"||u.dataset.reactAriaTopLayer==="true")?t.add(u):u instanceof Element&&o(u)}});l.observe(n,{childList:!0,subtree:!0});let a={observe(){l.observe(n,{childList:!0,subtree:!0})},disconnect(){l.disconnect()}};return Be.push(a),()=>{l.disconnect();for(let i of r){let c=on.get(i);if(c==null)return;c===1?(i.removeAttribute("aria-hidden"),on.delete(i)):on.set(i,c-1)}a===Be[Be.length-1]?(Be.pop(),Be.length&&Be[Be.length-1].observe()):Be.splice(Be.indexOf(a),1)}}var In=new Map,Jc=e=>{B(()=>{let n=Me(e.style)??{},t=Me(e.properties)??[],r={};for(let s in n)r[s]=e.element.style[s];let o=In.get(e.key);o?o.activeCount++:In.set(e.key,{activeCount:1,originalStyles:r,properties:t.map(s=>s.key)}),Object.assign(e.element.style,e.style);for(let s of t)e.element.style.setProperty(s.key,s.value);U(()=>{let s=In.get(e.key);if(s){if(s.activeCount!==1){s.activeCount--;return}In.delete(e.key);for(let[l,a]of Object.entries(s.originalStyles))e.element.style[l]=a;for(let l of s.properties)e.element.style.removeProperty(l);e.element.style.length===0&&e.element.removeAttribute("style"),e.cleanup?.()}})})},Wo=Jc,eu=(e,n)=>{switch(n){case"x":return[e.clientWidth,e.scrollLeft,e.scrollWidth];case"y":return[e.clientHeight,e.scrollTop,e.scrollHeight]}},tu=(e,n)=>{let t=getComputedStyle(e),r=n==="x"?t.overflowX:t.overflowY;return r==="auto"||r==="scroll"||e.tagName==="HTML"&&r==="visible"},nu=(e,n,t)=>{let r=n==="x"&&window.getComputedStyle(e).direction==="rtl"?-1:1,o=e,s=0,l=0,a=!1;do{let[i,c,u]=eu(o,n),d=u-i-r*c;(c!==0||d!==0)&&tu(o,n)&&(s+=d,l+=c),o===(t??document.documentElement)?a=!0:o=o._$host??o.parentElement}while(o&&!a);return[s,l]},[Qo,Yo]=z([]),ru=e=>Qo().indexOf(e)===Qo().length-1,ou=e=>{let n=j({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:"padding",restoreScrollPosition:!0,allowPinchZoom:!1},e),t=Le(),r=[0,0],o=null,s=null;B(()=>{Me(n.enabled)&&(Yo(c=>[...c,t]),U(()=>{Yo(c=>c.filter(u=>u!==t))}))}),B(()=>{if(!Me(n.enabled)||!Me(n.hideScrollbar))return;let{body:c}=document,u=window.innerWidth-c.offsetWidth;if(Me(n.preventScrollbarShift)){let d={overflow:"hidden"},g=[];u>0&&(Me(n.preventScrollbarShiftMode)==="padding"?d.paddingRight=`calc(${window.getComputedStyle(c).paddingRight} + ${u}px)`:d.marginRight=`calc(${window.getComputedStyle(c).marginRight} + ${u}px)`,g.push({key:"--scrollbar-width",value:`${u}px`}));let f=window.scrollY,h=window.scrollX;Wo({key:"prevent-scroll",element:c,style:d,properties:g,cleanup:()=>{Me(n.restoreScrollPosition)&&u>0&&window.scrollTo(h,f)}})}else Wo({key:"prevent-scroll",element:c,style:{overflow:"hidden"}})}),B(()=>{!ru(t)||!Me(n.enabled)||(document.addEventListener("wheel",a,{passive:!1}),document.addEventListener("touchstart",l,{passive:!1}),document.addEventListener("touchmove",i,{passive:!1}),U(()=>{document.removeEventListener("wheel",a),document.removeEventListener("touchstart",l),document.removeEventListener("touchmove",i)}))});let l=c=>{r=Xo(c),o=null,s=null},a=c=>{let u=c.target,d=Me(n.element),g=iu(c),f=Math.abs(g[0])>Math.abs(g[1])?"x":"y",h=f==="x"?g[0]:g[1],p=Zo(u,f,h,d),y;d&&fr(d,u)?y=!p:y=!0,y&&c.cancelable&&c.preventDefault()},i=c=>{let u=Me(n.element),d=c.target,g;if(c.touches.length===2)g=!Me(n.allowPinchZoom);else{if(o==null||s===null){let f=Xo(c).map((p,y)=>r[y]-p),h=Math.abs(f[0])>Math.abs(f[1])?"x":"y";o=h,s=h==="x"?f[0]:f[1]}if(d.type==="range")g=!1;else{let f=Zo(d,o,s,u);u&&fr(u,d)?g=!f:g=!0}}g&&c.cancelable&&c.preventDefault()}},iu=e=>[e.deltaX,e.deltaY],Xo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Zo=(e,n,t,r)=>{let o=r!==null&&fr(r,e),[s,l]=nu(e,n,o?r:void 0);return!(t>0&&Math.abs(s)<=1||t<0&&Math.abs(l)<1)},fr=(e,n)=>{if(e.contains(n))return!0;let t=n;for(;t;){if(t===e)return!0;t=t._$host??t.parentElement}return!1},su=ou,lu=su,us=be();function ds(){return xe(us)}function mt(){let e=ds();if(e===void 0)throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var fs=be();function Ar(){let e=xe(fs);if(e===void 0)throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var gs=be();function ot(){let e=xe(gs);if(e===void 0)throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function Ir(e){let n,t=ot(),r=mt(),o=Q({id:t.generateId(`item-${Le()}`)},e),[s,l]=J(o,["ref","textValue","disabled","closeOnSelect","checked","indeterminate","onSelect","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]),[a,i]=z(),[c,u]=z(),[d,g]=z(),f=()=>r.listState().selectionManager(),h=()=>l.id,p=()=>f().focusedKey()===h(),y=()=>{s.onSelect?.(),s.closeOnSelect&&setTimeout(()=>{r.close(!0)})};pa({getItem:()=>({ref:()=>n,type:"item",key:h(),textValue:s.textValue??d()?.textContent??n?.textContent??"",disabled:s.disabled??!1})});let v=qi({key:h,selectionManager:f,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>s.disabled},()=>n),b=S=>{ce(S,s.onPointerMove),S.pointerType==="mouse"&&(s.disabled?r.onItemLeave(S):(r.onItemEnter(S),S.defaultPrevented||(Te(S.currentTarget),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(h()))))},x=S=>{ce(S,s.onPointerLeave),S.pointerType==="mouse"&&r.onItemLeave(S)},w=S=>{ce(S,s.onPointerUp),!s.disabled&&S.button===0&&y()},$=S=>{if(ce(S,s.onKeyDown),!S.repeat&&!s.disabled)switch(S.key){case"Enter":case" ":y();break}},q=M(()=>{if(s.indeterminate)return"mixed";if(s.checked!=null)return s.checked}),D=M(()=>({"data-indeterminate":s.indeterminate?"":void 0,"data-checked":s.checked&&!s.indeterminate?"":void 0,"data-disabled":s.disabled?"":void 0,"data-highlighted":p()?"":void 0})),P={isChecked:()=>s.checked,dataset:D,setLabelRef:g,generateId:hn(()=>l.id),registerLabel:Ge(i),registerDescription:Ge(u)};return m(fs.Provider,{value:P,get children(){return m(ue,j({as:"div",ref(S){let F=De(V=>n=V,s.ref);typeof F=="function"&&F(S)},get tabIndex(){return v.tabIndex()},get"aria-checked"(){return q()},get"aria-disabled"(){return s.disabled},get"aria-labelledby"(){return a()},get"aria-describedby"(){return c()},get"data-key"(){return v.dataKey()},get onPointerDown(){return we([s.onPointerDown,v.onPointerDown])},get onPointerUp(){return we([w,v.onPointerUp])},get onClick(){return we([s.onClick,v.onClick])},get onKeyDown(){return we([$,v.onKeyDown])},get onMouseDown(){return we([s.onMouseDown,v.onMouseDown])},get onFocus(){return we([s.onFocus,v.onFocus])},onPointerMove:b,onPointerLeave:x},D,l))}})}function hs(e){let n=Q({closeOnSelect:!1},e),[t,r]=J(n,["checked","defaultChecked","onChange","onSelect"]),o=sa({isSelected:()=>t.checked,defaultIsSelected:()=>t.defaultChecked,onSelectedChange:l=>t.onChange?.(l),isDisabled:()=>r.disabled});return m(Ir,j({role:"menuitemcheckbox",get checked(){return o.isSelected()},onSelect:()=>{t.onSelect?.(),o.toggle()}},r))}var au=be();function Gn(){return xe(au)}var gn={next:(e,n)=>e==="ltr"?n==="horizontal"?"ArrowRight":"ArrowDown":n==="horizontal"?"ArrowLeft":"ArrowUp",previous:(e,n)=>gn.next(e==="ltr"?"rtl":"ltr",n)},Jo={first:e=>e==="horizontal"?"ArrowDown":"ArrowRight",last:e=>e==="horizontal"?"ArrowUp":"ArrowLeft"};function ps(e){let n=ot(),t=mt(),r=Gn(),{direction:o}=Et(),s=Q({id:n.generateId("trigger")},e),[l,a]=J(s,["ref","id","disabled","onPointerDown","onClick","onKeyDown","onMouseOver","onFocus"]),i=()=>n.value();r!==void 0&&(i=()=>n.value()??l.id,r.lastValue()===void 0&&r.setLastValue(i));let c=Kn(()=>t.triggerRef(),()=>"button"),u=M(()=>c()==="a"&&t.triggerRef()?.getAttribute("href")!=null);B(et(()=>r?.value(),v=>{u()&&v===i()&&t.triggerRef()?.focus()}));let d=()=>{r!==void 0?t.isOpen()?r.value()===i()&&r.closeMenu():(r.autoFocusMenu()||r.setAutoFocusMenu(!0),t.open(!1)):t.toggle(!0)},g=v=>{ce(v,l.onPointerDown),v.currentTarget.dataset.pointerType=v.pointerType,!l.disabled&&v.pointerType!=="touch"&&v.button===0&&d()},f=v=>{ce(v,l.onClick),l.disabled||v.currentTarget.dataset.pointerType==="touch"&&d()},h=v=>{if(ce(v,l.onKeyDown),!l.disabled){if(u())switch(v.key){case"Enter":case" ":return}switch(v.key){case"Enter":case" ":case Jo.first(n.orientation()):v.stopPropagation(),v.preventDefault(),Zl(v.currentTarget),t.open("first"),r?.setAutoFocusMenu(!0),r?.setValue(i);break;case Jo.last(n.orientation()):v.stopPropagation(),v.preventDefault(),t.open("last");break;case gn.next(o(),n.orientation()):if(r===void 0)break;v.stopPropagation(),v.preventDefault(),r.nextMenu();break;case gn.previous(o(),n.orientation()):if(r===void 0)break;v.stopPropagation(),v.preventDefault(),r.previousMenu();break}}},p=v=>{ce(v,l.onMouseOver),t.triggerRef()?.dataset.pointerType!=="touch"&&!l.disabled&&r!==void 0&&r.value()!==void 0&&r.setValue(i)},y=v=>{ce(v,l.onFocus),r!==void 0&&v.currentTarget.dataset.pointerType!=="touch"&&r.setValue(i)};return B(()=>U(t.registerTriggerId(l.id))),m(xr,j({ref(v){let b=De(t.setTriggerRef,l.ref);typeof b=="function"&&b(v)},get"data-kb-menu-value-trigger"(){return n.value()},get id(){return l.id},get disabled(){return l.disabled},"aria-haspopup":"true",get"aria-expanded"(){return t.isOpen()},get"aria-controls"(){return M(()=>!!t.isOpen())()?t.contentId():void 0},get"data-highlighted"(){return i()!==void 0&&r?.value()===i()?!0:void 0},get tabIndex(){return r!==void 0?r.value()===i()||r.lastValue()===i()?0:-1:void 0},onPointerDown:g,onMouseOver:p,onClick:f,onKeyDown:h,onFocus:y,role:r!==void 0?"menuitem":void 0},()=>t.dataset(),a))}var cu=be();function ms(){return xe(cu)}function ys(e){let n,t=ot(),r=mt(),o=Gn(),s=ms(),{direction:l}=Et(),a=Q({id:t.generateId(`content-${Le()}`)},e),[i,c]=J(a,["ref","id","style","onOpenAutoFocus","onCloseAutoFocus","onEscapeKeyDown","onFocusOutside","onPointerEnter","onPointerMove","onKeyDown","onMouseDown","onFocusIn","onFocusOut"]),u=0,d=()=>r.parentMenuContext()==null&&o===void 0&&t.isModal(),g=Wc({selectionManager:r.listState().selectionManager,collection:r.listState().collection,autoFocus:r.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!r.listState().selectionManager().isFocused(),orientation:()=>t.orientation()==="horizontal"?"vertical":"horizontal"},()=>n);Qc({trapFocus:()=>d()&&r.isOpen(),onMountAutoFocus:x=>{o===void 0&&i.onOpenAutoFocus?.(x)},onUnmountAutoFocus:i.onCloseAutoFocus},()=>n);let f=x=>{if(Ue(x.currentTarget,x.target)&&(x.key==="Tab"&&r.isOpen()&&x.preventDefault(),o!==void 0&&x.currentTarget.getAttribute("aria-haspopup")!=="true"))switch(x.key){case gn.next(l(),t.orientation()):x.stopPropagation(),x.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case gn.previous(l(),t.orientation()):if(x.currentTarget.hasAttribute("data-closed"))break;x.stopPropagation(),x.preventDefault(),r.close(!0),o.setAutoFocusMenu(!0),o.previousMenu();break}},h=x=>{i.onEscapeKeyDown?.(x),o?.setAutoFocusMenu(!1),r.close(!0)},p=x=>{i.onFocusOutside?.(x),t.isModal()&&x.preventDefault()},y=x=>{ce(x,i.onPointerEnter),r.isOpen()&&(r.parentMenuContext()?.listState().selectionManager().setFocused(!1),r.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},v=x=>{if(ce(x,i.onPointerMove),x.pointerType!=="mouse")return;let w=x.target,$=u!==x.clientX;Ue(x.currentTarget,w)&&$&&(r.setPointerDir(x.clientX>u?"right":"left"),u=x.clientX)};B(()=>U(r.registerContentId(i.id)));let b={ref:De(x=>{r.setContentRef(x),n=x},i.ref),role:"menu",get id(){return i.id},get tabIndex(){return g.tabIndex()},get"aria-labelledby"(){return r.triggerId()},onKeyDown:we([i.onKeyDown,g.onKeyDown,f]),onMouseDown:we([i.onMouseDown,g.onMouseDown]),onFocusIn:we([i.onFocusIn,g.onFocusIn]),onFocusOut:we([i.onFocusOut,g.onFocusOut]),onPointerEnter:y,onPointerMove:v,get"data-orientation"(){return t.orientation()}};return m(R,{get when(){return r.contentPresent()},get children(){return m(R,{get when(){return s===void 0||r.parentMenuContext()!=null},get fallback(){return m(ue,j({as:"div"},()=>r.dataset(),b,c))},get children(){return m(Yi.Positioner,{get children(){return m(Vc,j({get disableOutsidePointerEvents(){return M(()=>!!d())()&&r.isOpen()},get excludedElements(){return[r.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return zn({"--kb-menu-content-transform-origin":"var(--kb-popper-content-transform-origin)",position:"relative"},i.style)},onEscapeKeyDown:h,onFocusOutside:p,get onDismiss(){return r.close}},()=>r.dataset(),b,c))}})}})}})}function uu(e){let n,t=ot(),r=mt(),[o,s]=J(e,["ref"]);return lu({element:()=>n??null,enabled:()=>r.contentPresent()&&t.preventScroll()}),m(ys,j({ref(l){let a=De(i=>{n=i},o.ref);typeof a=="function"&&a(l)}},s))}var vs=be();function du(){let e=xe(vs);if(e===void 0)throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function Dr(e){let n=ot(),t=Q({id:n.generateId(`group-${Le()}`)},e),[r,o]=z(),s={generateId:hn(()=>t.id),registerLabelId:Ge(o)};return m(vs.Provider,{value:s,get children(){return m(ue,j({as:"div",role:"group",get"aria-labelledby"(){return r()}},t))}})}function bs(e){let n=du(),t=Q({id:n.generateId("label")},e),[r,o]=J(t,["id"]);return B(()=>U(n.registerLabelId(r.id))),m(ue,j({as:"span",get id(){return r.id},"aria-hidden":"true"},o))}function xs(e){let n=mt(),t=Q({children:"\u25BC"},e);return m(ue,j({as:"span","aria-hidden":"true"},()=>n.dataset(),t))}function ws(e){return m(Ir,j({role:"menuitem",closeOnSelect:!0},e))}function $s(e){let n=Ar(),t=Q({id:n.generateId("description")},e),[r,o]=J(t,["id"]);return B(()=>U(n.registerDescription(r.id))),m(ue,j({as:"div",get id(){return r.id}},()=>n.dataset(),o))}function Cs(e){let n=Ar(),t=Q({id:n.generateId("indicator")},e),[r,o]=J(t,["forceMount"]);return m(R,{get when(){return r.forceMount||n.isChecked()},get children(){return m(ue,j({as:"div"},()=>n.dataset(),o))}})}function Ss(e){let n=Ar(),t=Q({id:n.generateId("label")},e),[r,o]=J(t,["ref","id"]);return B(()=>U(n.registerLabel(r.id))),m(ue,j({as:"div",ref(s){let l=De(n.setLabelRef,r.ref);typeof l=="function"&&l(s)},get id(){return r.id}},()=>n.dataset(),o))}function ks(e){let n=mt();return m(R,{get when(){return n.contentPresent()},get children(){return m(Qn,e)}})}var Es=be();function fu(){let e=xe(Es);if(e===void 0)throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function Ms(e){let t=ot().generateId(`radiogroup-${Le()}`),r=Q({id:t},e),[o,s]=J(r,["value","defaultValue","onChange","disabled"]),[l,a]=mn({value:()=>o.value,defaultValue:()=>o.defaultValue,onChange:c=>o.onChange?.(c)}),i={isDisabled:()=>o.disabled,isSelectedValue:c=>c===l(),setSelectedValue:a};return m(Es.Provider,{value:i,get children(){return m(Dr,s)}})}function Ts(e){let n=fu(),t=Q({closeOnSelect:!1},e),[r,o]=J(t,["value","onSelect"]);return m(Ir,j({role:"menuitemradio",get checked(){return n.isSelectedValue(r.value)},onSelect:()=>{r.onSelect?.(),n.setSelectedValue(r.value)}},o))}function gu(e,n,t){let r=e.split("-")[0],o=t.getBoundingClientRect(),s=[],l=n.clientX,a=n.clientY;switch(r){case"top":s.push([l,a+5]),s.push([o.left,o.bottom]),s.push([o.left,o.top]),s.push([o.right,o.top]),s.push([o.right,o.bottom]);break;case"right":s.push([l-5,a]),s.push([o.left,o.top]),s.push([o.right,o.top]),s.push([o.right,o.bottom]),s.push([o.left,o.bottom]);break;case"bottom":s.push([l,a-5]),s.push([o.right,o.top]),s.push([o.right,o.bottom]),s.push([o.left,o.bottom]),s.push([o.left,o.top]);break;case"left":s.push([l+5,a]),s.push([o.right,o.bottom]),s.push([o.left,o.bottom]),s.push([o.left,o.top]),s.push([o.right,o.top]);break}return s}function hu(e,n){return n?Xl([e.clientX,e.clientY],n):!1}function As(e){let n=ot(),t=Ti(),r=ds(),o=Gn(),s=ms(),l=Q({placement:n.orientation()==="horizontal"?"bottom-start":"right-start"},e),[a,i]=J(l,["open","defaultOpen","onOpenChange"]),c=0,u=null,d="right",[g,f]=z(),[h,p]=z(),[y,v]=z(),[b,x]=z(),[w,$]=z(!0),[q,D]=z(i.placement),[P,S]=z([]),[F,V]=z([]),{DomCollectionProvider:G}=ha({items:F,onItemsChange:V}),Y=Zi({open:()=>a.open,defaultOpen:()=>a.defaultOpen,onOpenChange:H=>a.onOpenChange?.(H)}),{present:Ce}=Fi({show:()=>n.forceMount()||Y.isOpen(),element:()=>b()??null}),te=Pa({selectionMode:"none",dataSource:F}),ne=H=>{$(H),Y.open()},ge=(H=!1)=>{Y.close(),H&&r&&r.close(!0)},oe=H=>{$(H),Y.toggle()},he=()=>{let H=b();H&&(Te(H),te.selectionManager().setFocused(!0),te.selectionManager().setFocusedKey(void 0))},ie=()=>{s!=null?setTimeout(()=>he()):he()},de=H=>{S(ke=>[...ke,H]);let je=r?.registerNestedMenu(H);return()=>{S(ke=>ir(ke,H)),je?.()}},fe=H=>d===u?.side&&hu(H,u?.area),Ae=H=>{fe(H)&&H.preventDefault()},T=H=>{fe(H)||ie()},pe=H=>{fe(H)&&H.preventDefault()};Xc({isDisabled:()=>!(r==null&&Y.isOpen()&&n.isModal()),targets:()=>[b(),...P()].filter(Boolean)}),B(()=>{let H=b();if(!H||!r)return;let je=r.registerNestedMenu(H);U(()=>{je()})}),B(()=>{r===void 0&&o?.registerMenu(n.value(),[b(),...P()])}),B(()=>{r!==void 0||o===void 0||(o.value()===n.value()?(y()?.focus(),o.autoFocusMenu()&&ne(!0)):ge())}),B(()=>{r!==void 0||o===void 0||Y.isOpen()&&o.setValue(n.value())}),U(()=>{r===void 0&&o?.unregisterMenu(n.value())});let yt={dataset:M(()=>({"data-expanded":Y.isOpen()?"":void 0,"data-closed":Y.isOpen()?void 0:""})),isOpen:Y.isOpen,contentPresent:Ce,nestedMenus:P,currentPlacement:q,pointerGraceTimeoutId:()=>c,autoFocus:w,listState:()=>te,parentMenuContext:()=>r,triggerRef:y,contentRef:b,triggerId:g,contentId:h,setTriggerRef:v,setContentRef:x,open:ne,close:ge,toggle:oe,focusContent:ie,onItemEnter:Ae,onItemLeave:T,onTriggerLeave:pe,setPointerDir:H=>d=H,setPointerGraceTimeoutId:H=>c=H,setPointerGraceIntent:H=>u=H,registerNestedMenu:de,registerItemToParentDomCollection:t?.registerItem,registerTriggerId:Ge(f),registerContentId:Ge(p)};return m(G,{get children(){return m(us.Provider,{value:yt,get children(){return m(R,{when:s===void 0,get fallback(){return i.children},get children(){return m(Yi,j({anchorRef:y,contentRef:b,onCurrentPlacementChange:D},i))}})}})}})}function Is(e){let{direction:n}=Et();return m(As,j({get placement(){return n()==="rtl"?"left-start":"right-start"},flip:!0},e))}var pu={close:(e,n)=>e==="ltr"?[n==="horizontal"?"ArrowLeft":"ArrowUp"]:[n==="horizontal"?"ArrowRight":"ArrowDown"]};function Ds(e){let n=mt(),t=ot(),[r,o]=J(e,["onFocusOutside","onKeyDown"]),{direction:s}=Et();return m(ys,j({onOpenAutoFocus:u=>{u.preventDefault()},onCloseAutoFocus:u=>{u.preventDefault()},onFocusOutside:u=>{r.onFocusOutside?.(u);let d=u.target;Ue(n.triggerRef(),d)||n.close()},onKeyDown:u=>{ce(u,r.onKeyDown);let d=Ue(u.currentTarget,u.target),g=pu.close(s(),t.orientation()).includes(u.key),f=n.parentMenuContext()!=null;d&&g&&f&&(n.close(),Te(n.triggerRef()))}},o))}var ei=["Enter"," "],mu={open:(e,n)=>e==="ltr"?[...ei,n==="horizontal"?"ArrowRight":"ArrowDown"]:[...ei,n==="horizontal"?"ArrowLeft":"ArrowUp"]};function Ps(e){let n,t=ot(),r=mt(),o=Q({id:t.generateId(`sub-trigger-${Le()}`)},e),[s,l]=J(o,["ref","id","textValue","disabled","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]),a=null,i=()=>{Ee||(a&&window.clearTimeout(a),a=null)},{direction:c}=Et(),u=()=>s.id,d=()=>{let x=r.parentMenuContext();if(x==null)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return x.listState().selectionManager()},g=()=>r.listState().collection(),f=()=>d().focusedKey()===u(),h=qi({key:u,selectionManager:d,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>s.disabled},()=>n),p=x=>{ce(x,s.onClick),!r.isOpen()&&!s.disabled&&r.open(!0)},y=x=>{if(ce(x,s.onPointerMove),x.pointerType!=="mouse")return;let w=r.parentMenuContext();if(w?.onItemEnter(x),!x.defaultPrevented){if(s.disabled){w?.onItemLeave(x);return}!r.isOpen()&&!a&&(r.parentMenuContext()?.setPointerGraceIntent(null),a=window.setTimeout(()=>{r.open(!1),i()},100)),w?.onItemEnter(x),x.defaultPrevented||(r.listState().selectionManager().isFocused()&&(r.listState().selectionManager().setFocused(!1),r.listState().selectionManager().setFocusedKey(void 0)),Te(x.currentTarget),w?.listState().selectionManager().setFocused(!0),w?.listState().selectionManager().setFocusedKey(u()))}},v=x=>{if(ce(x,s.onPointerLeave),x.pointerType!=="mouse")return;i();let w=r.parentMenuContext(),$=r.contentRef();if($){w?.setPointerGraceIntent({area:gu(r.currentPlacement(),x,$),side:r.currentPlacement().split("-")[0]}),window.clearTimeout(w?.pointerGraceTimeoutId());let q=window.setTimeout(()=>{w?.setPointerGraceIntent(null)},300);w?.setPointerGraceTimeoutId(q)}else{if(w?.onTriggerLeave(x),x.defaultPrevented)return;w?.setPointerGraceIntent(null)}w?.onItemLeave(x)},b=x=>{ce(x,s.onKeyDown),!x.repeat&&(s.disabled||mu.open(c(),t.orientation()).includes(x.key)&&(x.stopPropagation(),x.preventDefault(),d().setFocused(!1),d().setFocusedKey(void 0),r.isOpen()||r.open("first"),r.focusContent(),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(g().getFirstKey())))};return B(()=>{if(r.registerItemToParentDomCollection==null)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");let x=r.registerItemToParentDomCollection({ref:()=>n,type:"item",key:u(),textValue:s.textValue??n?.textContent??"",disabled:s.disabled??!1});U(x)}),B(et(()=>r.parentMenuContext()?.pointerGraceTimeoutId(),x=>{U(()=>{window.clearTimeout(x),r.parentMenuContext()?.setPointerGraceIntent(null)})})),B(()=>U(r.registerTriggerId(s.id))),U(()=>{i()}),m(ue,j({as:"div",ref(x){let w=De($=>{r.setTriggerRef($),n=$},s.ref);typeof w=="function"&&w(x)},get id(){return s.id},role:"menuitem",get tabIndex(){return h.tabIndex()},"aria-haspopup":"true",get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return M(()=>!!r.isOpen())()?r.contentId():void 0},get"aria-disabled"(){return s.disabled},get"data-key"(){return h.dataKey()},get"data-highlighted"(){return f()?"":void 0},get"data-disabled"(){return s.disabled?"":void 0},get onPointerDown(){return we([s.onPointerDown,h.onPointerDown])},get onPointerUp(){return we([s.onPointerUp,h.onPointerUp])},get onClick(){return we([p,h.onClick])},get onKeyDown(){return we([b,h.onKeyDown])},get onMouseDown(){return we([s.onMouseDown,h.onMouseDown])},get onFocus(){return we([s.onFocus,h.onFocus])},onPointerMove:y,onPointerLeave:v},()=>r.dataset(),l))}function yu(e){let n=Gn(),t=`menu-${Le()}`,r=Q({id:t,modal:!0},e),[o,s]=J(r,["id","modal","preventScroll","forceMount","open","defaultOpen","onOpenChange","value","orientation"]),l=Zi({open:()=>o.open,defaultOpen:()=>o.defaultOpen,onOpenChange:i=>o.onOpenChange?.(i)}),a={isModal:()=>o.modal??!0,preventScroll:()=>o.preventScroll??a.isModal(),forceMount:()=>o.forceMount??!1,generateId:hn(()=>o.id),value:()=>o.value,orientation:()=>o.orientation??n?.orientation()??"horizontal"};return m(gs.Provider,{value:a,get children(){return m(As,j({get open(){return l.isOpen()},get onOpenChange(){return l.setIsOpen}},s))}})}var vu={};Bn(vu,{Root:()=>Vn,Separator:()=>bu});function Vn(e){let n,t=Q({orientation:"horizontal"},e),[r,o]=J(t,["ref","orientation"]),s=Kn(()=>n,()=>"hr");return m(ue,j({as:"hr",ref(l){let a=De(i=>n=i,r.ref);typeof a=="function"&&a(l)},get role(){return s()!=="hr"?"separator":void 0},get"aria-orientation"(){return r.orientation==="vertical"?"vertical":void 0},get"data-orientation"(){return r.orientation}},o))}var bu=Vn,ye={};Bn(ye,{Arrow:()=>Tr,CheckboxItem:()=>hs,Content:()=>Ls,DropdownMenu:()=>xu,Group:()=>Dr,GroupLabel:()=>bs,Icon:()=>xs,Item:()=>ws,ItemDescription:()=>$s,ItemIndicator:()=>Cs,ItemLabel:()=>Ss,Portal:()=>ks,RadioGroup:()=>Ms,RadioItem:()=>Ts,Root:()=>Os,Separator:()=>Vn,Sub:()=>Is,SubContent:()=>Ds,SubTrigger:()=>Ps,Trigger:()=>ps});function Ls(e){let n=ot(),t=mt(),[r,o]=J(e,["onCloseAutoFocus","onInteractOutside"]),s=!1;return m(uu,j({onCloseAutoFocus:i=>{r.onCloseAutoFocus?.(i),s||Te(t.triggerRef()),s=!1,i.preventDefault()},onInteractOutside:i=>{r.onInteractOutside?.(i),(!n.isModal()||i.detail.isContextMenu)&&(s=!0)}},o))}function Os(e){let n=`dropdownmenu-${Le()}`,t=Q({id:n},e);return m(yu,t)}var xu=Object.assign(Os,{Arrow:Tr,CheckboxItem:hs,Content:Ls,Group:Dr,GroupLabel:bs,Icon:xs,Item:ws,ItemDescription:$s,ItemIndicator:Cs,ItemLabel:Ss,Portal:ks,RadioGroup:Ms,RadioItem:Ts,Separator:Vn,Sub:Is,SubContent:Ds,SubTrigger:Ps,Trigger:ps}),C={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{100:"ff",90:"e5",80:"cc",70:"b3",60:"99",50:"80",40:"66",30:"4d",20:"33",10:"1a",0:"00"},font:{size:{"2xs":"calc(var(--tsqd-font-size) * 0.625)",xs:"calc(var(--tsqd-font-size) * 0.75)",sm:"calc(var(--tsqd-font-size) * 0.875)",md:"var(--tsqd-font-size)",lg:"calc(var(--tsqd-font-size) * 1.125)",xl:"calc(var(--tsqd-font-size) * 1.25)","2xl":"calc(var(--tsqd-font-size) * 1.5)","3xl":"calc(var(--tsqd-font-size) * 1.875)","4xl":"calc(var(--tsqd-font-size) * 2.25)","5xl":"calc(var(--tsqd-font-size) * 3)","6xl":"calc(var(--tsqd-font-size) * 3.75)","7xl":"calc(var(--tsqd-font-size) * 4.5)","8xl":"calc(var(--tsqd-font-size) * 6)","9xl":"calc(var(--tsqd-font-size) * 8)"},lineHeight:{xs:"calc(var(--tsqd-font-size) * 1)",sm:"calc(var(--tsqd-font-size) * 1.25)",md:"calc(var(--tsqd-font-size) * 1.5)",lg:"calc(var(--tsqd-font-size) * 1.75)",xl:"calc(var(--tsqd-font-size) * 2)","2xl":"calc(var(--tsqd-font-size) * 2.25)","3xl":"calc(var(--tsqd-font-size) * 2.5)","4xl":"calc(var(--tsqd-font-size) * 2.75)","5xl":"calc(var(--tsqd-font-size) * 3)","6xl":"calc(var(--tsqd-font-size) * 3.25)","7xl":"calc(var(--tsqd-font-size) * 3.5)","8xl":"calc(var(--tsqd-font-size) * 3.75)","9xl":"calc(var(--tsqd-font-size) * 4)"},weight:{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"}},breakpoints:{xs:"320px",sm:"640px",md:"768px",lg:"1024px",xl:"1280px","2xl":"1536px"},border:{radius:{none:"0px",xs:"calc(var(--tsqd-font-size) * 0.125)",sm:"calc(var(--tsqd-font-size) * 0.25)",md:"calc(var(--tsqd-font-size) * 0.375)",lg:"calc(var(--tsqd-font-size) * 0.5)",xl:"calc(var(--tsqd-font-size) * 0.75)","2xl":"calc(var(--tsqd-font-size) * 1)","3xl":"calc(var(--tsqd-font-size) * 1.5)",full:"9999px"}},size:{0:"0px",.25:"calc(var(--tsqd-font-size) * 0.0625)",.5:"calc(var(--tsqd-font-size) * 0.125)",1:"calc(var(--tsqd-font-size) * 0.25)",1.5:"calc(var(--tsqd-font-size) * 0.375)",2:"calc(var(--tsqd-font-size) * 0.5)",2.5:"calc(var(--tsqd-font-size) * 0.625)",3:"calc(var(--tsqd-font-size) * 0.75)",3.5:"calc(var(--tsqd-font-size) * 0.875)",4:"calc(var(--tsqd-font-size) * 1)",4.5:"calc(var(--tsqd-font-size) * 1.125)",5:"calc(var(--tsqd-font-size) * 1.25)",5.5:"calc(var(--tsqd-font-size) * 1.375)",6:"calc(var(--tsqd-font-size) * 1.5)",6.5:"calc(var(--tsqd-font-size) * 1.625)",7:"calc(var(--tsqd-font-size) * 1.75)",8:"calc(var(--tsqd-font-size) * 2)",9:"calc(var(--tsqd-font-size) * 2.25)",10:"calc(var(--tsqd-font-size) * 2.5)",11:"calc(var(--tsqd-font-size) * 2.75)",12:"calc(var(--tsqd-font-size) * 3)",14:"calc(var(--tsqd-font-size) * 3.5)",16:"calc(var(--tsqd-font-size) * 4)",20:"calc(var(--tsqd-font-size) * 5)",24:"calc(var(--tsqd-font-size) * 6)",28:"calc(var(--tsqd-font-size) * 7)",32:"calc(var(--tsqd-font-size) * 8)",36:"calc(var(--tsqd-font-size) * 9)",40:"calc(var(--tsqd-font-size) * 10)",44:"calc(var(--tsqd-font-size) * 11)",48:"calc(var(--tsqd-font-size) * 12)",52:"calc(var(--tsqd-font-size) * 13)",56:"calc(var(--tsqd-font-size) * 14)",60:"calc(var(--tsqd-font-size) * 15)",64:"calc(var(--tsqd-font-size) * 16)",72:"calc(var(--tsqd-font-size) * 18)",80:"calc(var(--tsqd-font-size) * 20)",96:"calc(var(--tsqd-font-size) * 24)"},shadow:{xs:(e="rgb(0 0 0 / 0.1)")=>"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:(e="rgb(0 0 0 / 0.1)")=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e="rgb(0 0 0 / 0.1)")=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e="rgb(0 0 0 / 0.1)")=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e="rgb(0 0 0 / 0.1)")=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e="rgb(0 0 0 / 0.25)")=>`0 25px 50px -12px ${e}`,inner:(e="rgb(0 0 0 / 0.05)")=>`inset 0 2px 4px 0 ${e}`,none:()=>"none"},zIndices:{hide:-1,auto:"auto",base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},wu=_('<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),$u=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Cu=_('<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Su=_('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Pr=_('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),ku=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Eu=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Mu=_('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Tu=_('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">'),Au=_('<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">'),Iu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Du=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Pu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>'),Lu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),qs=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ou=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),qu=_('<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>'),Fu=_('<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),_u=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),zu=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>'),Ru=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ku=_('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Bu=_('<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>');function Nu(){return wu()}function Fs(){return $u()}function cn(){return Cu()}function ti(){return Su()}function ni(){return Pr()}function Uu(){return(()=>{var e=Pr();return e.style.setProperty("transform","rotate(90deg)"),e})()}function Gu(){return(()=>{var e=Pr();return e.style.setProperty("transform","rotate(-90deg)"),e})()}function Vu(){return ku()}function Hu(){return Eu()}function ju(){return Mu()}function Wu(){return Tu()}function Qu(){return Au()}function Yu(){return Iu()}function Xu(){return Du()}function Zu(){return Pu()}function Ju(){return Lu()}function ed(e){return(()=>{var n=qs(),t=n.firstChild;return N(()=>A(t,"stroke",e.theme==="dark"?"#12B76A":"#027A48")),n})()}function td(){return Ou()}function nd(){return qu()}function rd(e){return[m(R,{get when(){return e.checked},get children(){var n=qs(),t=n.firstChild;return N(()=>A(t,"stroke",e.theme==="dark"?"#9B8AFB":"#6938EF")),n}}),m(R,{get when(){return!e.checked},get children(){var n=Fu(),t=n.firstChild;return N(()=>A(t,"stroke",e.theme==="dark"?"#9B8AFB":"#6938EF")),n}})]}function od(){return _u()}function id(){return zu()}function sd(){return Ru()}function ld(){return Ku()}function ri(){let e=Le();return(()=>{var n=Bu(),t=n.firstChild,r=t.nextSibling,o=r.nextSibling,s=o.firstChild,l=o.nextSibling,a=l.firstChild,i=l.nextSibling,c=i.nextSibling,u=c.firstChild,d=c.nextSibling,g=d.firstChild,f=d.nextSibling,h=f.nextSibling,p=h.firstChild,y=h.nextSibling,v=y.firstChild,b=y.nextSibling,x=b.nextSibling,w=x.firstChild,$=x.nextSibling,q=$.firstChild,D=$.nextSibling,P=D.nextSibling,S=P.firstChild,F=P.nextSibling,V=F.firstChild,G=F.nextSibling,Y=G.nextSibling,Ce=Y.firstChild,te=Y.nextSibling,ne=te.firstChild,ge=te.nextSibling,oe=ge.nextSibling,he=oe.firstChild,ie=oe.nextSibling,de=ie.firstChild,fe=ie.nextSibling,Ae=fe.firstChild,T=Ae.nextSibling,pe=T.nextSibling,Z=pe.nextSibling,yt=Z.nextSibling,H=fe.nextSibling,je=H.firstChild,ke=H.nextSibling,zt=ke.firstChild,ze=ke.nextSibling,vt=ze.firstChild,Mt=vt.nextSibling,it=Mt.nextSibling,Je=it.firstChild,st=Je.nextSibling,L=st.nextSibling,se=L.nextSibling,Ie=se.nextSibling,le=Ie.nextSibling,re=le.nextSibling,ae=re.nextSibling,ve=ae.nextSibling,ee=ve.nextSibling,lt=ee.nextSibling,at=lt.nextSibling,We=ze.nextSibling,Tt=We.firstChild,ct=We.nextSibling,At=ct.firstChild,ut=ct.nextSibling,bt=ut.firstChild,xn=bt.nextSibling,Xt=ut.nextSibling,wn=Xt.firstChild,Rt=Xt.nextSibling,$n=Rt.firstChild,Zt=Rt.nextSibling,Jt=Zt.firstChild,en=Jt.nextSibling,Kt=en.nextSibling,Or=Kt.nextSibling,qr=Or.nextSibling,Fr=qr.nextSibling,_r=Fr.nextSibling,zr=_r.nextSibling,Rr=zr.nextSibling,Kr=Rr.nextSibling,Br=Kr.nextSibling,Nr=Br.nextSibling,Ur=Nr.nextSibling,Gr=Ur.nextSibling,Vr=Gr.nextSibling,Hr=Vr.nextSibling,jr=Hr.nextSibling,Ns=jr.nextSibling;return A(t,"id",`a-${e}`),A(r,"fill",`url(#a-${e})`),A(s,"id",`am-${e}`),A(l,"id",`b-${e}`),A(a,"filter",`url(#am-${e})`),A(i,"mask",`url(#b-${e})`),A(u,"id",`ah-${e}`),A(d,"id",`k-${e}`),A(g,"filter",`url(#ah-${e})`),A(f,"mask",`url(#k-${e})`),A(p,"id",`ae-${e}`),A(y,"id",`j-${e}`),A(v,"filter",`url(#ae-${e})`),A(b,"mask",`url(#j-${e})`),A(w,"id",`ai-${e}`),A($,"id",`i-${e}`),A(q,"filter",`url(#ai-${e})`),A(D,"mask",`url(#i-${e})`),A(S,"id",`aj-${e}`),A(F,"id",`h-${e}`),A(V,"filter",`url(#aj-${e})`),A(G,"mask",`url(#h-${e})`),A(Ce,"id",`ag-${e}`),A(te,"id",`g-${e}`),A(ne,"filter",`url(#ag-${e})`),A(ge,"mask",`url(#g-${e})`),A(he,"id",`af-${e}`),A(ie,"id",`f-${e}`),A(de,"filter",`url(#af-${e})`),A(fe,"mask",`url(#f-${e})`),A(Z,"id",`m-${e}`),A(yt,"fill",`url(#m-${e})`),A(je,"id",`ak-${e}`),A(ke,"id",`e-${e}`),A(zt,"filter",`url(#ak-${e})`),A(ze,"mask",`url(#e-${e})`),A(vt,"id",`n-${e}`),A(Mt,"fill",`url(#n-${e})`),A(Je,"id",`r-${e}`),A(st,"fill",`url(#r-${e})`),A(L,"id",`s-${e}`),A(se,"fill",`url(#s-${e})`),A(Ie,"id",`q-${e}`),A(le,"fill",`url(#q-${e})`),A(re,"id",`p-${e}`),A(ae,"fill",`url(#p-${e})`),A(ve,"id",`o-${e}`),A(ee,"fill",`url(#o-${e})`),A(lt,"id",`l-${e}`),A(at,"fill",`url(#l-${e})`),A(Tt,"id",`al-${e}`),A(ct,"id",`d-${e}`),A(At,"filter",`url(#al-${e})`),A(ut,"mask",`url(#d-${e})`),A(bt,"id",`u-${e}`),A(xn,"fill",`url(#u-${e})`),A(wn,"id",`ad-${e}`),A(Rt,"id",`c-${e}`),A($n,"filter",`url(#ad-${e})`),A(Zt,"mask",`url(#c-${e})`),A(Jt,"id",`t-${e}`),A(en,"fill",`url(#t-${e})`),A(Kt,"id",`v-${e}`),A(Or,"stroke",`url(#v-${e})`),A(qr,"id",`aa-${e}`),A(Fr,"stroke",`url(#aa-${e})`),A(_r,"id",`w-${e}`),A(zr,"stroke",`url(#w-${e})`),A(Rr,"id",`ac-${e}`),A(Kr,"stroke",`url(#ac-${e})`),A(Br,"id",`ab-${e}`),A(Nr,"stroke",`url(#ab-${e})`),A(Ur,"id",`y-${e}`),A(Gr,"stroke",`url(#y-${e})`),A(Vr,"id",`x-${e}`),A(Hr,"stroke",`url(#x-${e})`),A(jr,"id",`z-${e}`),A(Ns,"stroke",`url(#z-${e})`),n})()}var ad=_('<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),cd=_('<button title="Copy object to clipboard">'),ud=_('<button title="Remove all items"aria-label="Remove all items">'),dd=_('<button title="Delete item"aria-label="Delete item">'),fd=_('<button title="Toggle value"aria-label="Toggle value">'),gd=_('<button title="Bulk Edit Data"aria-label="Bulk Edit Data">'),sn=_("<div>"),hd=_("<div><button> <span></span> <span> "),pd=_("<input>"),oi=_("<span>"),md=_("<div><span>:"),yd=_("<div><div><button> [<!>...<!>]");function vd(e,n){let t=0,r=[];for(;t<e.length;)r.push(e.slice(t,t+n)),t=t+n;return r}var ii=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?Yt(t):Qt(t));return(()=>{var o=ad();return N(()=>I(o,O(r().expander,t`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&t`
            & svg {
              top: -1px;
            }
          `))),o})()},bd=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?Yt(t):Qt(t)),[o,s]=z("NoCopy");return(()=>{var l=cd();return oo(l,"click",o()==="NoCopy"?()=>{navigator.clipboard.writeText(ao(e.value)).then(()=>{s("SuccessCopy"),setTimeout(()=>{s("NoCopy")},1500)},a=>{s("ErrorCopy"),setTimeout(()=>{s("NoCopy")},1500)})}:void 0,!0),k(l,m(to,{get children(){return[m(Cn,{get when(){return o()==="NoCopy"},get children(){return m(Zu,{})}}),m(Cn,{get when(){return o()==="SuccessCopy"},get children(){return m(ed,{get theme(){return n()}})}}),m(Cn,{get when(){return o()==="ErrorCopy"},get children(){return m(td,{})}})]}})),N(a=>{var i=r().actionButton,c=`${o()==="NoCopy"?"Copy object to clipboard":o()==="SuccessCopy"?"Object copied to clipboard":"Error copying object to clipboard"}`;return i!==a.e&&I(l,a.e=i),c!==a.t&&A(l,"aria-label",a.t=c),a},{e:void 0,t:void 0}),l})()},xd=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?Yt(t):Qt(t)),o=K().client;return(()=>{var s=ud();return s.$$click=()=>{let l=e.activeQuery.state.data,a=Mn(l,e.dataPath,[]);o.setQueryData(e.activeQuery.queryKey,a)},k(s,m(nd,{})),N(()=>I(s,r().actionButton)),s})()},si=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?Yt(t):Qt(t)),o=K().client;return(()=>{var s=dd();return s.$$click=()=>{let l=e.activeQuery.state.data,a=go(l,e.dataPath);o.setQueryData(e.activeQuery.queryKey,a)},k(s,m(Fs,{})),N(()=>I(s,O(r().actionButton))),s})()},wd=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?Yt(t):Qt(t)),o=K().client;return(()=>{var s=fd();return s.$$click=()=>{let l=e.activeQuery.state.data,a=Mn(l,e.dataPath,!e.value);o.setQueryData(e.activeQuery.queryKey,a)},k(s,m(rd,{get theme(){return n()},get checked(){return e.value}})),N(()=>I(s,O(r().actionButton,t`
          width: ${C.size[3.5]};
          height: ${C.size[3.5]};
        `))),s})()};function li(e){return Symbol.iterator in e}function wt(e){let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?Yt(t):Qt(t)),o=K().client,[s,l]=z((e.defaultExpanded||[]).includes(e.label)),a=()=>l(h=>!h),[i,c]=z([]),u=M(()=>Array.isArray(e.value)?e.value.map((h,p)=>({label:p.toString(),value:h})):e.value!==null&&typeof e.value=="object"&&li(e.value)&&typeof e.value[Symbol.iterator]=="function"?e.value instanceof Map?Array.from(e.value,([h,p])=>({label:h,value:p})):Array.from(e.value,(h,p)=>({label:p.toString(),value:h})):typeof e.value=="object"&&e.value!==null?Object.entries(e.value).map(([h,p])=>({label:h,value:p})):[]),d=M(()=>Array.isArray(e.value)?"array":e.value!==null&&typeof e.value=="object"&&li(e.value)&&typeof e.value[Symbol.iterator]=="function"?"Iterable":typeof e.value=="object"&&e.value!==null?"object":typeof e.value),g=M(()=>vd(u(),100)),f=e.dataPath??[];return(()=>{var h=sn();return k(h,m(R,{get when(){return g().length},get children(){return[(()=>{var p=hd(),y=p.firstChild,v=y.firstChild,b=v.nextSibling,x=b.nextSibling,w=x.nextSibling,$=w.firstChild;return y.$$click=()=>a(),k(y,m(ii,{get expanded(){return s()}}),v),k(b,()=>e.label),k(w,()=>String(d()).toLowerCase()==="iterable"?"(Iterable) ":"",$),k(w,()=>u().length,$),k(w,()=>u().length>1?"items":"item",null),k(p,m(R,{get when(){return e.editable},get children(){var q=sn();return k(q,m(bd,{get value(){return e.value}}),null),k(q,m(R,{get when(){return e.itemsDeletable&&e.activeQuery!==void 0},get children(){return m(si,{get activeQuery(){return e.activeQuery},dataPath:f})}}),null),k(q,m(R,{get when(){return d()==="array"&&e.activeQuery!==void 0},get children(){return m(xd,{get activeQuery(){return e.activeQuery},dataPath:f})}}),null),k(q,m(R,{get when(){return M(()=>!!e.onEdit)()&&!lo(e.value).meta},get children(){var D=gd();return D.$$click=()=>{e.onEdit?.()},k(D,m(Ju,{})),N(()=>I(D,r().actionButton)),D}}),null),N(()=>I(q,r().actions)),q}}),null),N(q=>{var D=r().expanderButtonContainer,P=r().expanderButton,S=r().info;return D!==q.e&&I(p,q.e=D),P!==q.t&&I(y,q.t=P),S!==q.a&&I(w,q.a=S),q},{e:void 0,t:void 0,a:void 0}),p})(),m(R,{get when(){return s()},get children(){return[m(R,{get when(){return g().length===1},get children(){var p=sn();return k(p,m(Dn,{get each(){return u()},by:y=>y.label,children:y=>m(wt,{get defaultExpanded(){return e.defaultExpanded},get label(){return y().label},get value(){return y().value},get editable(){return e.editable},get dataPath(){return[...f,y().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return d()==="array"||d()==="Iterable"||d()==="object"}})})),N(()=>I(p,r().subEntry)),p}}),m(R,{get when(){return g().length>1},get children(){var p=sn();return k(p,m(eo,{get each(){return g()},children:(y,v)=>(()=>{var b=yd(),x=b.firstChild,w=x.firstChild,$=w.firstChild,q=$.nextSibling,D=q.nextSibling,P=D.nextSibling;return P.nextSibling,w.$$click=()=>c(S=>S.includes(v)?S.filter(F=>F!==v):[...S,v]),k(w,m(ii,{get expanded(){return i().includes(v)}}),$),k(w,v*100,q),k(w,v*100+100-1,P),k(x,m(R,{get when(){return i().includes(v)},get children(){var S=sn();return k(S,m(Dn,{get each(){return y()},by:F=>F.label,children:F=>m(wt,{get defaultExpanded(){return e.defaultExpanded},get label(){return F().label},get value(){return F().value},get editable(){return e.editable},get dataPath(){return[...f,F().label]},get activeQuery(){return e.activeQuery}})})),N(()=>I(S,r().subEntry)),S}}),null),N(S=>{var F=r().entry,V=r().expanderButton;return F!==S.e&&I(x,S.e=F),V!==S.t&&I(w,S.t=V),S},{e:void 0,t:void 0}),b})()})),N(()=>I(p,r().subEntry)),p}})]}})]}}),null),k(h,m(R,{get when(){return g().length===0},get children(){var p=md(),y=p.firstChild,v=y.firstChild;return k(y,()=>e.label,v),k(p,m(R,{get when(){return M(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(d()==="string"||d()==="number"||d()==="boolean")},get fallback(){return(()=>{var b=oi();return k(b,()=>nn(e.value)),N(()=>I(b,r().value)),b})()},get children(){return[m(R,{get when(){return M(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(d()==="string"||d()==="number")},get children(){var b=pd();return b.addEventListener("change",x=>{let w=e.activeQuery.state.data,$=Mn(w,f,d()==="number"?x.target.valueAsNumber:x.target.value);o.setQueryData(e.activeQuery.queryKey,$)}),N(x=>{var w=d()==="number"?"number":"text",$=O(r().value,r().editableInput);return w!==x.e&&A(b,"type",x.e=w),$!==x.t&&I(b,x.t=$),x},{e:void 0,t:void 0}),N(()=>b.value=e.value),b}}),m(R,{get when(){return d()==="boolean"},get children(){var b=oi();return k(b,m(wd,{get activeQuery(){return e.activeQuery},dataPath:f,get value(){return e.value}}),null),k(b,()=>nn(e.value),null),N(()=>I(b,O(r().value,r().actions,r().editableInput))),b}})]}}),null),k(p,m(R,{get when(){return e.editable&&e.itemsDeletable&&e.activeQuery!==void 0},get children(){return m(si,{get activeQuery(){return e.activeQuery},dataPath:f})}}),null),N(b=>{var x=r().row,w=r().label;return x!==b.e&&I(p,b.e=x),w!==b.t&&I(y,b.t=w),b},{e:void 0,t:void 0}),p}}),null),N(()=>I(h,r().entry)),h})()}var _s=(e,n)=>{let{colors:t,font:r,size:o,border:s}=C,l=(a,i)=>e==="light"?a:i;return{entry:n`
      & * {
        font-size: ${r.size.xs};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:n`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${l(t.gray[300],t.darkGray[400])};
      /* outline: 1px solid ${t.teal[400]}; */
    `,expander:n`
      & path {
        stroke: ${t.gray[400]};
      }
      & svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${t.blue[400]}; */
    `,expanderButtonContainer:n`
      display: flex;
      align-items: center;
      line-height: ${o[4]};
      min-height: ${o[4]};
      gap: ${o[2]};
    `,expanderButton:n`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${o[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${o[1]};
      position: relative;
      /* outline: 1px solid ${t.green[400]}; */

      &:focus-visible {
        border-radius: ${s.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:n`
      color: ${l(t.gray[500],t.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${o[1]};
      /* outline: 1px solid ${t.yellow[400]}; */
    `,label:n`
      color: ${l(t.gray[700],t.gray[300])};
      white-space: nowrap;
    `,value:n`
      color: ${l(t.purple[600],t.purple[400])};
      flex-grow: 1;
    `,actions:n`
      display: inline-flex;
      gap: ${o[2]};
      align-items: center;
    `,row:n`
      display: inline-flex;
      gap: ${o[2]};
      width: 100%;
      margin: ${o[.25]} 0px;
      line-height: ${o[4.5]};
      align-items: center;
    `,editableInput:n`
      border: none;
      padding: ${o[.5]} ${o[1]} ${o[.5]} ${o[1.5]};
      flex-grow: 1;
      border-radius: ${s.radius.xs};
      background-color: ${l(t.gray[200],t.darkGray[500])};

      &:hover {
        background-color: ${l(t.gray[300],t.darkGray[600])};
      }
    `,actionButton:n`
      background-color: transparent;
      color: ${l(t.gray[500],t.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${o[3]};
      height: ${o[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${l(t.gray[600],t.gray[400])};
      }

      &:focus-visible {
        border-radius: ${s.radius.xs};
        outline: 2px solid ${t.blue[800]};
        outline-offset: 2px;
      }
    `}},Qt=e=>_s("light",e),Yt=e=>_s("dark",e);Sn(["click"]);var $d=_('<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>'),bn=_("<div>"),Cd=_('<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">'),Sd=_("<select name=tsqd-queries-filter-sort>"),kd=_("<select name=tsqd-mutations-filter-sort>"),Ed=_("<span>Asc"),Md=_("<span>Desc"),Td=_('<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">'),Ad=_("<div>Settings"),Id=_("<span>Position"),Dd=_("<span>Top"),Pd=_("<span>Bottom"),Ld=_("<span>Left"),Od=_("<span>Right"),qd=_("<span>Theme"),Fd=_("<span>Light"),_d=_("<span>Dark"),zd=_("<span>System"),Rd=_("<div><div class=tsqd-queries-container>"),Kd=_("<div><div class=tsqd-mutations-container>"),Bd=_('<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>'),ai=_("<option>Sort by "),Nd=_("<div class=tsqd-query-disabled-indicator>disabled"),zs=_("<button><div></div><code class=tsqd-query-hash>"),Ud=_("<div role=tooltip id=tsqd-status-tooltip>"),Gd=_("<span>"),Vd=_("<button><span></span><span>"),Hd=_("<button><span></span> Error"),jd=_('<div><span></span>Trigger Error<select><option value=""disabled selected>'),Wd=_('<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">'),Qd=_("<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save"),Yd=_('<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),Xd=_("<option>"),Zd=_('<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),[qe,Hn]=z(null),[$t,Rs]=z(null),[Ye,Lr]=z(0),[Nt,ci]=z(!1),hf=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?He(t):Ve(t)),o=hr(),s=M(()=>K().buttonPosition||el),l=M(()=>e.localStore.open==="true"?!0:e.localStore.open==="false"?!1:K().initialIsOpen||tl),a=M(()=>e.localStore.position||K().position||rr),i;B(()=>{let u=i.parentElement,d=e.localStore.height||ui,g=e.localStore.width||di,f=a();u.style.setProperty("--tsqd-panel-height",`${f==="top"?"-":""}${d}px`),u.style.setProperty("--tsqd-panel-width",`${f==="left"?"-":""}${g}px`)}),xt(()=>{let u=()=>{let d=i.parentElement,g=getComputedStyle(d).fontSize;d.style.setProperty("--tsqd-font-size",g)};u(),window.addEventListener("focus",u),U(()=>{window.removeEventListener("focus",u)})});let c=M(()=>e.localStore.pip_open??"false");return[m(R,{get when(){return M(()=>!!o().pipWindow)()&&c()=="true"},get children(){return m(Qn,{get mount(){return o().pipWindow?.document.body},get children(){return m(Jd,{get children(){return m(Ks,e)}})}})}}),(()=>{var u=bn(),d=i;return typeof d=="function"?Bt(d,u):i=u,k(u,m(So,{name:"tsqd-panel-transition",get children(){return m(R,{get when(){return M(()=>!!(l()&&!o().pipWindow))()&&c()=="false"},get children(){return m(ef,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),k(u,m(So,{name:"tsqd-button-transition",get children(){return m(R,{get when(){return!l()},get children(){var g=$d(),f=g.firstChild,h=f.nextSibling;return k(f,m(ri,{})),h.$$click=()=>e.setLocalStore("open","true"),k(h,m(ri,{})),N(()=>I(g,O(r().devtoolsBtn,r()[`devtoolsBtn-position-${s()}`],"tsqd-open-btn-container"))),g}})}}),null),N(()=>I(u,O(t`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${a()==="top"||a()==="bottom"?"transform: translateY(var(--tsqd-panel-height));":"transform: translateX(var(--tsqd-panel-width));"}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${s()==="relative"?"none;":s()==="top-left"?"translateX(-72px);":s()==="top-right"?"translateX(72px);":"translateY(72px);"};
              opacity: 0;
            }
          `,"tsqd-transitions-container"))),u})()]},Jd=e=>{let n=hr(),t=$e(),r=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,o=M(()=>t()==="dark"?He(r):Ve(r)),s=()=>{let{colors:l}=C,a=(i,c)=>t()==="dark"?c:i;return Ye()<Ot?r`
        flex-direction: column;
        background-color: ${a(l.gray[300],l.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${a(l.gray[200],l.darkGray[900])};
    `};return B(()=>{let l=n().pipWindow,a=()=>{l&&Lr(l.innerWidth)};l&&(l.addEventListener("resize",a),a()),U(()=>{l&&l.removeEventListener("resize",a)})}),(()=>{var l=bn();return l.style.setProperty("--tsqd-font-size","16px"),l.style.setProperty("max-height","100vh"),l.style.setProperty("height","100vh"),l.style.setProperty("width","100vw"),k(l,()=>e.children),N(()=>I(l,O(o().panel,s(),{[r`
            min-width: min-content;
          `]:Ye()<gr},"tsqd-main-panel"))),l})()},pf=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?He(t):Ve(t)),o;xt(()=>{yi(o,({width:l},a)=>{a===o&&Lr(l)})});let s=()=>{let{colors:l}=C,a=(i,c)=>n()==="dark"?c:i;return Ye()<Ot?t`
        flex-direction: column;
        background-color: ${a(l.gray[300],l.gray[600])};
      `:t`
      flex-direction: row;
      background-color: ${a(l.gray[200],l.darkGray[900])};
    `};return(()=>{var l=bn(),a=o;return typeof a=="function"?Bt(a,l):o=l,l.style.setProperty("--tsqd-font-size","16px"),k(l,()=>e.children),N(()=>I(l,O(r().parentPanel,s(),{[t`
            min-width: min-content;
          `]:Ye()<gr},"tsqd-main-panel"))),l})()},ef=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?He(t):Ve(t)),[o,s]=z(!1),l=M(()=>e.localStore.position||K().position||rr),a=u=>{let d=u.currentTarget.parentElement;if(!d)return;s(!0);let{height:g,width:f}=d.getBoundingClientRect(),h=u.clientX,p=u.clientY,y=0,v=Yn(3.5),b=Yn(12),x=$=>{if($.preventDefault(),l()==="left"||l()==="right"){let q=l()==="right"?h-$.clientX:$.clientX-h;y=Math.round(f+q),y<b&&(y=b),e.setLocalStore("width",String(Math.round(y)));let D=d.getBoundingClientRect().width;Number(e.localStore.width)<D&&e.setLocalStore("width",String(D))}else{let q=l()==="bottom"?p-$.clientY:$.clientY-p;y=Math.round(g+q),y<v&&(y=v,Hn(null)),e.setLocalStore("height",String(Math.round(y)))}},w=()=>{o()&&s(!1),document.removeEventListener("mousemove",x,!1),document.removeEventListener("mouseUp",w,!1)};document.addEventListener("mousemove",x,!1),document.addEventListener("mouseup",w,!1)},i;xt(()=>{yi(i,({width:u},d)=>{d===i&&Lr(u)})}),B(()=>{let u=i.parentElement?.parentElement?.parentElement;if(!u)return;let d=e.localStore.position||rr,g=co("padding",d),f=e.localStore.position==="left"||e.localStore.position==="right",h=(({padding:p,paddingTop:y,paddingBottom:v,paddingLeft:b,paddingRight:x})=>({padding:p,paddingTop:y,paddingBottom:v,paddingLeft:b,paddingRight:x}))(u.style);u.style[g]=`${f?e.localStore.width:e.localStore.height}px`,U(()=>{Object.entries(h).forEach(([p,y])=>{u.style[p]=y})})});let c=()=>{let{colors:u}=C,d=(g,f)=>n()==="dark"?f:g;return Ye()<Ot?t`
        flex-direction: column;
        background-color: ${d(u.gray[300],u.gray[600])};
      `:t`
      flex-direction: row;
      background-color: ${d(u.gray[200],u.darkGray[900])};
    `};return(()=>{var u=Cd(),d=u.firstChild,g=d.nextSibling,f=i;return typeof f=="function"?Bt(f,u):i=u,d.$$mousedown=a,g.$$click=()=>e.setLocalStore("open","false"),k(g,m(cn,{})),k(u,m(Ks,e),null),N(h=>{var p=O(r().panel,r()[`panel-position-${l()}`],c(),{[t`
            min-width: min-content;
          `]:Ye()<gr&&(l()==="right"||l()==="left")},"tsqd-main-panel"),y=l()==="bottom"||l()==="top"?`${e.localStore.height||ui}px`:"auto",v=l()==="right"||l()==="left"?`${e.localStore.width||di}px`:"auto",b=O(r().dragHandle,r()[`dragHandle-position-${l()}`],"tsqd-drag-handle"),x=O(r().closeBtn,r()[`closeBtn-position-${l()}`],"tsqd-minimize-btn");return p!==h.e&&I(u,h.e=p),y!==h.t&&((h.t=y)!=null?u.style.setProperty("height",y):u.style.removeProperty("height")),v!==h.a&&((h.a=v)!=null?u.style.setProperty("width",v):u.style.removeProperty("width")),b!==h.o&&I(d,h.o=b),x!==h.i&&I(g,h.i=x),h},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),u})()},Ks=e=>{af(),cf();let n,t=$e(),r=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,o=M(()=>t()==="dark"?He(r):Ve(r)),s=hr(),[l,a]=z("queries"),i=M(()=>e.localStore.sort||rl),c=M(()=>Number(e.localStore.sortOrder)||mo),u=M(()=>e.localStore.mutationSort||ol),d=M(()=>Number(e.localStore.mutationSortOrder)||mo),g=M(()=>kn[i()]),f=M(()=>En[u()]),h=M(()=>K().onlineManager),p=M(()=>K().client.getQueryCache()),y=M(()=>K().client.getMutationCache()),v=Se(D=>D().getAll().length,!1),b=M(et(()=>[v(),e.localStore.filter,i(),c()],()=>{let D=p().getAll(),P=e.localStore.filter?D.filter(F=>yo(F.queryHash,e.localStore.filter||"").passed):[...D];return g()?P.sort((F,V)=>g()(F,V)*c()):P})),x=Qe(D=>D().getAll().length,!1),w=M(et(()=>[x(),e.localStore.mutationFilter,u(),d()],()=>{let D=y().getAll(),P=e.localStore.mutationFilter?D.filter(F=>{let V=`${F.options.mutationKey?JSON.stringify(F.options.mutationKey)+" - ":""}${new Date(F.state.submittedAt).toLocaleString()}`;return yo(V,e.localStore.mutationFilter||"").passed}):[...D];return f()?P.sort((F,V)=>f()(F,V)*d()):P})),$=D=>{e.setLocalStore("position",D)},q=D=>{let S=getComputedStyle(n).getPropertyValue("--tsqd-font-size");D.style.setProperty("--tsqd-font-size",S)};return[(()=>{var D=Bd(),P=D.firstChild,S=P.firstChild,F=S.firstChild,V=F.firstChild,G=V.nextSibling,Y=G.firstChild,Ce=P.nextSibling,te=Ce.firstChild,ne=te.firstChild,ge=ne.firstChild,oe=ne.nextSibling,he=oe.nextSibling,ie=te.nextSibling,de=ie.firstChild,fe=de.nextSibling,Ae=n;return typeof Ae=="function"?Bt(Ae,D):n=D,F.$$click=()=>{if(!s().pipWindow&&!e.showPanelViewOnly){e.setLocalStore("open","false");return}e.onClose&&e.onClose()},k(G,()=>K().queryFlavor,Y),k(G,()=>K().version,null),k(S,m(Ne.Root,{get class(){return O(o().viewToggle)},get value(){return l()},onChange:T=>{a(T),Hn(null),Rs(null)},get children(){return[m(Ne.Item,{value:"queries",class:"tsqd-radio-toggle",get children(){return[m(Ne.ItemInput,{}),m(Ne.ItemControl,{get children(){return m(Ne.ItemIndicator,{})}}),m(Ne.ItemLabel,{title:"Toggle Queries View",children:"Queries"})]}}),m(Ne.Item,{value:"mutations",class:"tsqd-radio-toggle",get children(){return[m(Ne.ItemInput,{}),m(Ne.ItemControl,{get children(){return m(Ne.ItemIndicator,{})}}),m(Ne.ItemLabel,{title:"Toggle Mutations View",children:"Mutations"})]}})]}}),null),k(P,m(R,{get when(){return l()==="queries"},get children(){return m(rf,{})}}),null),k(P,m(R,{get when(){return l()==="mutations"},get children(){return m(of,{})}}),null),k(ne,m(Nu,{}),ge),ge.$$input=T=>{l()==="queries"?e.setLocalStore("filter",T.currentTarget.value):e.setLocalStore("mutationFilter",T.currentTarget.value)},k(oe,m(R,{get when(){return l()==="queries"},get children(){var T=Sd();return T.addEventListener("change",pe=>{e.setLocalStore("sort",pe.currentTarget.value)}),k(T,()=>Object.keys(kn).map(pe=>(()=>{var Z=ai();return Z.firstChild,Z.value=pe,k(Z,pe,null),Z})())),N(()=>T.value=i()),T}}),null),k(oe,m(R,{get when(){return l()==="mutations"},get children(){var T=kd();return T.addEventListener("change",pe=>{e.setLocalStore("mutationSort",pe.currentTarget.value)}),k(T,()=>Object.keys(En).map(pe=>(()=>{var Z=ai();return Z.firstChild,Z.value=pe,k(Z,pe,null),Z})())),N(()=>T.value=u()),T}}),null),k(oe,m(cn,{}),null),he.$$click=()=>{l()==="queries"?e.setLocalStore("sortOrder",String(c()*-1)):e.setLocalStore("mutationSortOrder",String(d()*-1))},k(he,m(R,{get when(){return(l()==="queries"?c():d())===1},get children(){return[Ed(),m(ti,{})]}}),null),k(he,m(R,{get when(){return(l()==="queries"?c():d())===-1},get children(){return[Md(),m(ni,{})]}}),null),de.$$click=()=>{l()==="queries"?p().clear():y().clear()},k(de,m(Fs,{})),fe.$$click=()=>{Nt()?(h().setOnline(!0),ci(!1)):(h().setOnline(!1),ci(!0))},k(fe,(()=>{var T=M(()=>!!Nt());return()=>T()?m(Qu,{}):m(Wu,{})})()),k(ie,m(R,{get when(){return M(()=>!s().pipWindow)()&&!s().disabled},get children(){var T=Td();return T.$$click=()=>{s().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},k(T,m(Xu,{})),N(()=>I(T,O(o().actionsBtn,"tsqd-actions-btn","tsqd-action-open-pip"))),T}}),null),k(ie,m(ye.Root,{gutter:4,get children(){return[m(ye.Trigger,{get class(){return O(o().actionsBtn,"tsqd-actions-btn","tsqd-action-settings")},get children(){return m(Yu,{})}}),m(ye.Portal,{ref:T=>q(T),get mount(){return M(()=>!!s().pipWindow)()?s().pipWindow.document.body:document.body},get children(){return m(ye.Content,{get class(){return O(o().settingsMenu,"tsqd-settings-menu")},get children(){return[(()=>{var T=Ad();return N(()=>I(T,O(o().settingsMenuHeader,"tsqd-settings-menu-header"))),T})(),m(R,{get when(){return!e.showPanelViewOnly},get children(){return m(ye.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[m(ye.SubTrigger,{get class(){return O(o().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[Id(),m(cn,{})]}}),m(ye.Portal,{ref:T=>q(T),get mount(){return M(()=>!!s().pipWindow)()?s().pipWindow.document.body:document.body},get children(){return m(ye.SubContent,{get class(){return O(o().settingsMenu,"tsqd-settings-submenu")},get children(){return[m(ye.Item,{onSelect:()=>{$("top")},as:"button",get class(){return O(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Dd(),m(ti,{})]}}),m(ye.Item,{onSelect:()=>{$("bottom")},as:"button",get class(){return O(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[Pd(),m(ni,{})]}}),m(ye.Item,{onSelect:()=>{$("left")},as:"button",get class(){return O(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[Ld(),m(Uu,{})]}}),m(ye.Item,{onSelect:()=>{$("right")},as:"button",get class(){return O(o().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-right")},get children(){return[Od(),m(Gu,{})]}})]}})}})]}})}}),m(ye.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[m(ye.SubTrigger,{get class(){return O(o().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[qd(),m(cn,{})]}}),m(ye.Portal,{ref:T=>q(T),get mount(){return M(()=>!!s().pipWindow)()?s().pipWindow.document.body:document.body},get children(){return m(ye.SubContent,{get class(){return O(o().settingsMenu,"tsqd-settings-submenu")},get children(){return[m(ye.Item,{onSelect:()=>{e.setLocalStore("theme_preference","light")},as:"button",get class(){return O(o().settingsSubButton,e.localStore.theme_preference==="light"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[Fd(),m(Vu,{})]}}),m(ye.Item,{onSelect:()=>{e.setLocalStore("theme_preference","dark")},as:"button",get class(){return O(o().settingsSubButton,e.localStore.theme_preference==="dark"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[_d(),m(Hu,{})]}}),m(ye.Item,{onSelect:()=>{e.setLocalStore("theme_preference","system")},as:"button",get class(){return O(o().settingsSubButton,e.localStore.theme_preference==="system"&&o().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[zd(),m(ju,{})]}})]}})}})]}})]}})}})]}}),null),k(D,m(R,{get when(){return l()==="queries"},get children(){var T=Rd(),pe=T.firstChild;return k(pe,m(Dn,{by:Z=>Z.queryHash,get each(){return b()},children:Z=>m(tf,{get query(){return Z()}})})),N(()=>I(T,O(o().overflowQueryContainer,"tsqd-queries-overflow-container"))),T}}),null),k(D,m(R,{get when(){return l()==="mutations"},get children(){var T=Kd(),pe=T.firstChild;return k(pe,m(Dn,{by:Z=>Z.mutationId,get each(){return w()},children:Z=>m(nf,{get mutation(){return Z()}})})),N(()=>I(T,O(o().overflowQueryContainer,"tsqd-mutations-overflow-container"))),T}}),null),N(T=>{var pe=O(o().queriesContainer,Ye()<Ot&&(qe()||$t())&&r`
              height: 50%;
              max-height: 50%;
            `,Ye()<Ot&&!(qe()||$t())&&r`
              height: 100%;
              max-height: 100%;
            `,"tsqd-queries-container"),Z=O(o().row,"tsqd-header"),yt=o().logoAndToggleContainer,H=O(o().logo,"tsqd-text-logo-container"),je=O(o().tanstackLogo,"tsqd-text-logo-tanstack"),ke=O(o().queryFlavorLogo,"tsqd-text-logo-query-flavor"),zt=O(o().row,"tsqd-filters-actions-container"),ze=O(o().filtersContainer,"tsqd-filters-container"),vt=O(o().filterInput,"tsqd-query-filter-textfield-container"),Mt=O("tsqd-query-filter-textfield"),it=O(o().filterSelect,"tsqd-query-filter-sort-container"),Je=`Sort order ${(l()==="queries"?c():d())===-1?"descending":"ascending"}`,st=(l()==="queries"?c():d())===-1,L=O(o().actionsContainer,"tsqd-actions-container"),se=O(o().actionsBtn,"tsqd-actions-btn","tsqd-action-clear-cache"),Ie=`Clear ${l()} cache`,le=O(o().actionsBtn,Nt()&&o().actionsBtnOffline,"tsqd-actions-btn","tsqd-action-mock-offline-behavior"),re=`${Nt()?"Unset offline mocking behavior":"Mock offline behavior"}`,ae=Nt(),ve=`${Nt()?"Unset offline mocking behavior":"Mock offline behavior"}`;return pe!==T.e&&I(D,T.e=pe),Z!==T.t&&I(P,T.t=Z),yt!==T.a&&I(S,T.a=yt),H!==T.o&&I(F,T.o=H),je!==T.i&&I(V,T.i=je),ke!==T.n&&I(G,T.n=ke),zt!==T.s&&I(Ce,T.s=zt),ze!==T.h&&I(te,T.h=ze),vt!==T.r&&I(ne,T.r=vt),Mt!==T.d&&I(ge,T.d=Mt),it!==T.l&&I(oe,T.l=it),Je!==T.u&&A(he,"aria-label",T.u=Je),st!==T.c&&A(he,"aria-pressed",T.c=st),L!==T.w&&I(ie,T.w=L),se!==T.m&&I(de,T.m=se),Ie!==T.f&&A(de,"title",T.f=Ie),le!==T.y&&I(fe,T.y=le),re!==T.g&&A(fe,"aria-label",T.g=re),ae!==T.p&&A(fe,"aria-pressed",T.p=ae),ve!==T.b&&A(fe,"title",T.b=ve),T},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),N(()=>ge.value=l()==="queries"?e.localStore.filter||"":e.localStore.mutationFilter||""),D})(),m(R,{get when(){return M(()=>l()==="queries")()&&qe()},get children(){return m(sf,{})}}),m(R,{get when(){return M(()=>l()==="mutations")()&&$t()},get children(){return m(lf,{})}})]},tf=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?He(t):Ve(t)),{colors:o,alpha:s}=C,l=(f,h)=>n()==="dark"?h:f,a=Se(f=>f().find({queryKey:e.query.queryKey})?.state,!0,f=>f.query.queryHash===e.query.queryHash),i=Se(f=>f().find({queryKey:e.query.queryKey})?.isDisabled()??!1,!0,f=>f.query.queryHash===e.query.queryHash),c=Se(f=>f().find({queryKey:e.query.queryKey})?.isStale()??!1,!0,f=>f.query.queryHash===e.query.queryHash),u=Se(f=>f().find({queryKey:e.query.queryKey})?.getObserversCount()??0,!0,f=>f.query.queryHash===e.query.queryHash),d=M(()=>uo({queryState:a(),observerCount:u(),isStale:c()})),g=()=>d()==="gray"?t`
        background-color: ${l(o[d()][200],o[d()][700])};
        color: ${l(o[d()][700],o[d()][300])};
      `:t`
      background-color: ${l(o[d()][200]+s[80],o[d()][900])};
      color: ${l(o[d()][800],o[d()][300])};
    `;return m(R,{get when(){return a()},get children(){var f=zs(),h=f.firstChild,p=h.nextSibling;return f.$$click=()=>Hn(e.query.queryHash===qe()?null:e.query.queryHash),k(h,u),k(p,()=>e.query.queryHash),k(f,m(R,{get when(){return i()},get children(){return Nd()}}),null),N(y=>{var v=O(r().queryRow,qe()===e.query.queryHash&&r().selectedQueryRow,"tsqd-query-row"),b=`Query key ${e.query.queryHash}`,x=O(g(),"tsqd-query-observer-count");return v!==y.e&&I(f,y.e=v),b!==y.t&&A(f,"aria-label",y.t=b),x!==y.a&&I(h,y.a=x),y},{e:void 0,t:void 0,a:void 0}),f}})},nf=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?He(t):Ve(t)),{colors:o,alpha:s}=C,l=(g,f)=>n()==="dark"?f:g,a=Qe(g=>g().getAll().find(p=>p.mutationId===e.mutation.mutationId)?.state),i=Qe(g=>{let h=g().getAll().find(p=>p.mutationId===e.mutation.mutationId);return h?h.state.isPaused:!1}),c=Qe(g=>{let h=g().getAll().find(p=>p.mutationId===e.mutation.mutationId);return h?h.state.status:"idle"}),u=M(()=>Pt({isPaused:i(),status:c()})),d=()=>u()==="gray"?t`
        background-color: ${l(o[u()][200],o[u()][700])};
        color: ${l(o[u()][700],o[u()][300])};
      `:t`
      background-color: ${l(o[u()][200]+s[80],o[u()][900])};
      color: ${l(o[u()][800],o[u()][300])};
    `;return m(R,{get when(){return a()},get children(){var g=zs(),f=g.firstChild,h=f.nextSibling;return g.$$click=()=>{Rs(e.mutation.mutationId===$t()?null:e.mutation.mutationId)},k(f,m(R,{get when(){return u()==="purple"},get children(){return m(ld,{})}}),null),k(f,m(R,{get when(){return u()==="green"},get children(){return m(od,{})}}),null),k(f,m(R,{get when(){return u()==="red"},get children(){return m(sd,{})}}),null),k(f,m(R,{get when(){return u()==="yellow"},get children(){return m(id,{})}}),null),k(h,m(R,{get when(){return e.mutation.options.mutationKey},get children(){return[M(()=>JSON.stringify(e.mutation.options.mutationKey))," -"," "]}}),null),k(h,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),N(p=>{var y=O(r().queryRow,$t()===e.mutation.mutationId&&r().selectedQueryRow,"tsqd-query-row"),v=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,b=O(d(),"tsqd-query-observer-count");return y!==p.e&&I(g,p.e=y),v!==p.t&&A(g,"aria-label",p.t=v),b!==p.a&&I(f,p.a=b),p},{e:void 0,t:void 0,a:void 0}),g}})},rf=()=>{let e=Se(i=>i().getAll().filter(c=>Dt(c)==="stale").length),n=Se(i=>i().getAll().filter(c=>Dt(c)==="fresh").length),t=Se(i=>i().getAll().filter(c=>Dt(c)==="fetching").length),r=Se(i=>i().getAll().filter(c=>Dt(c)==="paused").length),o=Se(i=>i().getAll().filter(c=>Dt(c)==="inactive").length),s=$e(),l=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,a=M(()=>s()==="dark"?He(l):Ve(l));return(()=>{var i=bn();return k(i,m(gt,{label:"Fresh",color:"green",get count(){return n()}}),null),k(i,m(gt,{label:"Fetching",color:"blue",get count(){return t()}}),null),k(i,m(gt,{label:"Paused",color:"purple",get count(){return r()}}),null),k(i,m(gt,{label:"Stale",color:"yellow",get count(){return e()}}),null),k(i,m(gt,{label:"Inactive",color:"gray",get count(){return o()}}),null),N(()=>I(i,O(a().queryStatusContainer,"tsqd-query-status-container"))),i})()},of=()=>{let e=Qe(a=>a().getAll().filter(i=>Pt({isPaused:i.state.isPaused,status:i.state.status})==="green").length),n=Qe(a=>a().getAll().filter(i=>Pt({isPaused:i.state.isPaused,status:i.state.status})==="yellow").length),t=Qe(a=>a().getAll().filter(i=>Pt({isPaused:i.state.isPaused,status:i.state.status})==="purple").length),r=Qe(a=>a().getAll().filter(i=>Pt({isPaused:i.state.isPaused,status:i.state.status})==="red").length),o=$e(),s=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,l=M(()=>o()==="dark"?He(s):Ve(s));return(()=>{var a=bn();return k(a,m(gt,{label:"Paused",color:"purple",get count(){return t()}}),null),k(a,m(gt,{label:"Pending",color:"yellow",get count(){return n()}}),null),k(a,m(gt,{label:"Success",color:"green",get count(){return e()}}),null),k(a,m(gt,{label:"Error",color:"red",get count(){return r()}}),null),N(()=>I(a,O(l().queryStatusContainer,"tsqd-query-status-container"))),a})()},gt=e=>{let n=$e(),t=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,r=M(()=>n()==="dark"?He(t):Ve(t)),{colors:o,alpha:s}=C,l=(f,h)=>n()==="dark"?h:f,a,[i,c]=z(!1),[u,d]=z(!1),g=M(()=>!(qe()&&Ye()<Js&&Ye()>Ot||Ye()<Ot));return(()=>{var f=Vd(),h=f.firstChild,p=h.nextSibling,y=a;return typeof y=="function"?Bt(y,f):a=f,f.addEventListener("mouseleave",()=>{c(!1),d(!1)}),f.addEventListener("mouseenter",()=>c(!0)),f.addEventListener("blur",()=>d(!1)),f.addEventListener("focus",()=>d(!0)),io(f,j({get disabled(){return g()},get class(){return O(r().queryStatusTag,!g()&&t`
            cursor: pointer;
            &:hover {
              background: ${l(o.gray[200],o.darkGray[400])}${s[80]};
            }
          `,"tsqd-query-status-tag",`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>i()||u()?{"aria-describedby":"tsqd-status-tooltip"}:{}),!1,!0),k(f,m(R,{get when(){return M(()=>!g())()&&(i()||u())},get children(){var v=Ud();return k(v,()=>e.label),N(()=>I(v,O(r().statusTooltip,"tsqd-query-status-tooltip"))),v}}),h),k(f,m(R,{get when(){return g()},get children(){var v=Gd();return k(v,()=>e.label),N(()=>I(v,O(r().queryStatusTagLabel,"tsqd-query-status-tag-label"))),v}}),p),k(p,()=>e.count),N(v=>{var b=O(t`
            width: ${C.size[1.5]};
            height: ${C.size[1.5]};
            border-radius: ${C.border.radius.full};
            background-color: ${C.colors[e.color][500]};
          `,"tsqd-query-status-tag-dot"),x=O(r().queryStatusCount,e.count>0&&e.color!=="gray"&&t`
              background-color: ${l(o[e.color][100],o[e.color][900])};
              color: ${l(o[e.color][700],o[e.color][300])};
            `,"tsqd-query-status-tag-count");return b!==v.e&&I(h,v.e=b),x!==v.t&&I(p,v.t=x),v},{e:void 0,t:void 0}),f})()},sf=()=>{let e=$e(),n=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,t=M(()=>e()==="dark"?He(n):Ve(n)),{colors:r}=C,o=(S,F)=>e()==="dark"?F:S,s=K().client,[l,a]=z(!1),[i,c]=z("view"),[u,d]=z(!1),g=M(()=>K().errorTypes||[]),f=Se(S=>S().getAll().find(F=>F.queryHash===qe()),!1),h=Se(S=>S().getAll().find(F=>F.queryHash===qe()),!1),p=Se(S=>S().getAll().find(F=>F.queryHash===qe())?.state,!1),y=Se(S=>S().getAll().find(F=>F.queryHash===qe())?.state.data,!1),v=Se(S=>{let F=S().getAll().find(V=>V.queryHash===qe());return F?Dt(F):"inactive"}),b=Se(S=>{let F=S().getAll().find(V=>V.queryHash===qe());return F?F.state.status:"pending"}),x=Se(S=>S().getAll().find(F=>F.queryHash===qe())?.getObserversCount()??0),w=M(()=>fo(v())),$=()=>{f()?.fetch()?.catch(()=>{})},q=S=>{let F=S?.initializer(f())??new Error("Unknown error from devtools"),V=f().options;f().setState({status:"error",error:F,fetchMeta:me(X({},f().state.fetchMeta),{__previousQueryOptions:V})})},D=()=>{let S=f(),F=S.state,V=S.state.fetchMeta?S.state.fetchMeta.__previousQueryOptions:null;S.cancel({silent:!0}),S.setState(me(X({},F),{fetchStatus:"idle",fetchMeta:null})),V&&S.fetch(V)};B(()=>{v()!=="fetching"&&a(!1)});let P=()=>w()==="gray"?n`
        background-color: ${o(r[w()][200],r[w()][700])};
        color: ${o(r[w()][700],r[w()][300])};
        border-color: ${o(r[w()][400],r[w()][600])};
      `:n`
      background-color: ${o(r[w()][100],r[w()][900])};
      color: ${o(r[w()][700],r[w()][300])};
      border-color: ${o(r[w()][400],r[w()][600])};
    `;return m(R,{get when(){return M(()=>!!f())()&&p()},get children(){var S=Yd(),F=S.firstChild,V=F.nextSibling,G=V.firstChild,Y=G.firstChild,Ce=Y.firstChild,te=Y.nextSibling,ne=G.nextSibling,ge=ne.firstChild,oe=ge.nextSibling,he=ne.nextSibling,ie=he.firstChild,de=ie.nextSibling,fe=V.nextSibling,Ae=fe.nextSibling,T=Ae.firstChild,pe=T.firstChild,Z=T.nextSibling,yt=Z.firstChild,H=Z.nextSibling,je=H.firstChild,ke=H.nextSibling,zt=ke.firstChild,ze=ke.nextSibling,vt=ze.firstChild,Mt=vt.nextSibling,it=Ae.nextSibling;it.firstChild;var Je=it.nextSibling,st=Je.nextSibling;return k(Ce,()=>nn(f().queryKey,!0)),k(te,v),k(oe,x),k(de,()=>new Date(p().dataUpdatedAt).toLocaleTimeString()),T.$$click=$,Z.$$click=()=>s.invalidateQueries(f()),H.$$click=()=>s.resetQueries(f()),ke.$$click=()=>{s.removeQueries(f()),Hn(null)},ze.$$click=()=>{if(f()?.state.data===void 0)a(!0),D();else{let L=f();if(!L)return;let se=L.options;L.fetch(me(X({},se),{queryFn:()=>new Promise(()=>{}),gcTime:-1})),L.setState({data:void 0,status:"pending",fetchMeta:me(X({},L.state.fetchMeta),{__previousQueryOptions:se})})}},k(ze,()=>b()==="pending"?"Restore":"Trigger",Mt),k(Ae,m(R,{get when(){return g().length===0||b()==="error"},get children(){var L=Hd(),se=L.firstChild,Ie=se.nextSibling;return L.$$click=()=>{f().state.error?s.resetQueries(f()):q()},k(L,()=>b()==="error"?"Restore":"Trigger",Ie),N(le=>{var re=O(n`
                  color: ${o(r.red[500],r.red[400])};
                `,"tsqd-query-details-actions-btn","tsqd-query-details-action-error"),ae=b()==="pending",ve=n`
                  background-color: ${o(r.red[500],r.red[400])};
                `;return re!==le.e&&I(L,le.e=re),ae!==le.t&&(L.disabled=le.t=ae),ve!==le.a&&I(se,le.a=ve),le},{e:void 0,t:void 0,a:void 0}),L}}),null),k(Ae,m(R,{get when(){return!(g().length===0||b()==="error")},get children(){var L=jd(),se=L.firstChild,Ie=se.nextSibling,le=Ie.nextSibling;return le.firstChild,le.addEventListener("change",re=>{let ae=g().find(ve=>ve.name===re.currentTarget.value);q(ae)}),k(le,m(Jr,{get each(){return g()},children:re=>(()=>{var ae=Xd();return k(ae,()=>re.name),N(()=>ae.value=re.name),ae})()}),null),k(L,m(cn,{}),null),N(re=>{var ae=O(t().actionsSelect,"tsqd-query-details-actions-btn","tsqd-query-details-action-error-multiple"),ve=n`
                  background-color: ${C.colors.red[400]};
                `,ee=b()==="pending";return ae!==re.e&&I(L,re.e=ae),ve!==re.t&&I(se,re.t=ve),ee!==re.a&&(le.disabled=re.a=ee),re},{e:void 0,t:void 0,a:void 0}),L}}),null),k(it,()=>i()==="view"?"Explorer":"Editor",null),k(S,m(R,{get when(){return i()==="view"},get children(){var L=Wd();return k(L,m(wt,{label:"Data",defaultExpanded:["Data"],get value(){return y()},editable:!0,onEdit:()=>c("edit"),get activeQuery(){return f()}})),N(se=>(se=C.size[2])!=null?L.style.setProperty("padding",se):L.style.removeProperty("padding")),L}}),Je),k(S,m(R,{get when(){return i()==="edit"},get children(){var L=Qd(),se=L.firstChild,Ie=se.nextSibling,le=Ie.firstChild,re=le.nextSibling,ae=re.firstChild,ve=ae.nextSibling;return L.addEventListener("submit",ee=>{ee.preventDefault();let at=new FormData(ee.currentTarget).get("data");try{let We=JSON.parse(at);f().setState(me(X({},f().state),{data:We})),c("view")}catch{d(!0)}}),se.addEventListener("focus",()=>d(!1)),k(le,()=>u()?"Invalid Value":""),ae.$$click=()=>c("view"),N(ee=>{var lt=O(t().devtoolsEditForm,"tsqd-query-details-data-editor"),at=t().devtoolsEditTextarea,We=u(),Tt=t().devtoolsEditFormActions,ct=t().devtoolsEditFormError,At=t().devtoolsEditFormActionContainer,ut=O(t().devtoolsEditFormAction,n`
                      color: ${o(r.gray[600],r.gray[300])};
                    `),bt=O(t().devtoolsEditFormAction,n`
                      color: ${o(r.blue[600],r.blue[400])};
                    `);return lt!==ee.e&&I(L,ee.e=lt),at!==ee.t&&I(se,ee.t=at),We!==ee.a&&A(se,"data-error",ee.a=We),Tt!==ee.o&&I(Ie,ee.o=Tt),ct!==ee.i&&I(le,ee.i=ct),At!==ee.n&&I(re,ee.n=At),ut!==ee.s&&I(ae,ee.s=ut),bt!==ee.h&&I(ve,ee.h=bt),ee},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),N(()=>se.value=JSON.stringify(y(),null,2)),L}}),Je),k(st,m(wt,{label:"Query",defaultExpanded:["Query","queryKey"],get value(){return h()}})),N(L=>{var se=O(t().detailsContainer,"tsqd-query-details-container"),Ie=O(t().detailsHeader,"tsqd-query-details-header"),le=O(t().detailsBody,"tsqd-query-details-summary-container"),re=O(t().queryDetailsStatus,P()),ae=O(t().detailsHeader,"tsqd-query-details-header"),ve=O(t().actionsBody,"tsqd-query-details-actions-container"),ee=O(n`
                color: ${o(r.blue[600],r.blue[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-refetch"),lt=v()==="fetching",at=n`
                background-color: ${o(r.blue[600],r.blue[400])};
              `,We=O(n`
                color: ${o(r.yellow[600],r.yellow[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-invalidate"),Tt=b()==="pending",ct=n`
                background-color: ${o(r.yellow[600],r.yellow[400])};
              `,At=O(n`
                color: ${o(r.gray[600],r.gray[300])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-reset"),ut=b()==="pending",bt=n`
                background-color: ${o(r.gray[600],r.gray[400])};
              `,xn=O(n`
                color: ${o(r.pink[500],r.pink[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-remove"),Xt=v()==="fetching",wn=n`
                background-color: ${o(r.pink[500],r.pink[400])};
              `,Rt=O(n`
                color: ${o(r.cyan[500],r.cyan[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-loading"),$n=l(),Zt=n`
                background-color: ${o(r.cyan[500],r.cyan[400])};
              `,Jt=O(t().detailsHeader,"tsqd-query-details-header"),en=O(t().detailsHeader,"tsqd-query-details-header"),Kt=C.size[2];return se!==L.e&&I(S,L.e=se),Ie!==L.t&&I(F,L.t=Ie),le!==L.a&&I(V,L.a=le),re!==L.o&&I(te,L.o=re),ae!==L.i&&I(fe,L.i=ae),ve!==L.n&&I(Ae,L.n=ve),ee!==L.s&&I(T,L.s=ee),lt!==L.h&&(T.disabled=L.h=lt),at!==L.r&&I(pe,L.r=at),We!==L.d&&I(Z,L.d=We),Tt!==L.l&&(Z.disabled=L.l=Tt),ct!==L.u&&I(yt,L.u=ct),At!==L.c&&I(H,L.c=At),ut!==L.w&&(H.disabled=L.w=ut),bt!==L.m&&I(je,L.m=bt),xn!==L.f&&I(ke,L.f=xn),Xt!==L.y&&(ke.disabled=L.y=Xt),wn!==L.g&&I(zt,L.g=wn),Rt!==L.p&&I(ze,L.p=Rt),$n!==L.b&&(ze.disabled=L.b=$n),Zt!==L.T&&I(vt,L.T=Zt),Jt!==L.A&&I(it,L.A=Jt),en!==L.O&&I(Je,L.O=en),Kt!==L.I&&((L.I=Kt)!=null?st.style.setProperty("padding",Kt):st.style.removeProperty("padding")),L},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),S}})},lf=()=>{let e=$e(),n=K().shadowDOMTarget?W.bind({target:K().shadowDOMTarget}):W,t=M(()=>e()==="dark"?He(n):Ve(n)),{colors:r}=C,o=(u,d)=>e()==="dark"?d:u,s=Qe(u=>{let g=u().getAll().find(f=>f.mutationId===$t());return g?g.state.isPaused:!1}),l=Qe(u=>{let g=u().getAll().find(f=>f.mutationId===$t());return g?g.state.status:"idle"}),a=M(()=>Pt({isPaused:s(),status:l()})),i=Qe(u=>u().getAll().find(d=>d.mutationId===$t()),!1),c=()=>a()==="gray"?n`
        background-color: ${o(r[a()][200],r[a()][700])};
        color: ${o(r[a()][700],r[a()][300])};
        border-color: ${o(r[a()][400],r[a()][600])};
      `:n`
      background-color: ${o(r[a()][100],r[a()][900])};
      color: ${o(r[a()][700],r[a()][300])};
      border-color: ${o(r[a()][400],r[a()][600])};
    `;return m(R,{get when(){return i()},get children(){var u=Zd(),d=u.firstChild,g=d.nextSibling,f=g.firstChild,h=f.firstChild,p=h.firstChild,y=h.nextSibling,v=f.nextSibling,b=v.firstChild,x=b.nextSibling,w=g.nextSibling,$=w.nextSibling,q=$.nextSibling,D=q.nextSibling,P=D.nextSibling,S=P.nextSibling,F=S.nextSibling,V=F.nextSibling;return k(p,m(R,{get when(){return i().options.mutationKey},fallback:"No mutationKey found",get children(){return nn(i().options.mutationKey,!0)}})),k(y,m(R,{get when(){return a()==="purple"},children:"pending"}),null),k(y,m(R,{get when(){return a()!=="purple"},get children(){return l()}}),null),k(x,()=>new Date(i().state.submittedAt).toLocaleTimeString()),k($,m(wt,{label:"Variables",defaultExpanded:["Variables"],get value(){return i().state.variables}})),k(D,m(wt,{label:"Context",defaultExpanded:["Context"],get value(){return i().state.context}})),k(S,m(wt,{label:"Data",defaultExpanded:["Data"],get value(){return i().state.data}})),k(V,m(wt,{label:"Mutation",defaultExpanded:["Mutation"],get value(){return i()}})),N(G=>{var Y=O(t().detailsContainer,"tsqd-query-details-container"),Ce=O(t().detailsHeader,"tsqd-query-details-header"),te=O(t().detailsBody,"tsqd-query-details-summary-container"),ne=O(t().queryDetailsStatus,c()),ge=O(t().detailsHeader,"tsqd-query-details-header"),oe=C.size[2],he=O(t().detailsHeader,"tsqd-query-details-header"),ie=C.size[2],de=O(t().detailsHeader,"tsqd-query-details-header"),fe=C.size[2],Ae=O(t().detailsHeader,"tsqd-query-details-header"),T=C.size[2];return Y!==G.e&&I(u,G.e=Y),Ce!==G.t&&I(d,G.t=Ce),te!==G.a&&I(g,G.a=te),ne!==G.o&&I(y,G.o=ne),ge!==G.i&&I(w,G.i=ge),oe!==G.n&&((G.n=oe)!=null?$.style.setProperty("padding",oe):$.style.removeProperty("padding")),he!==G.s&&I(q,G.s=he),ie!==G.h&&((G.h=ie)!=null?D.style.setProperty("padding",ie):D.style.removeProperty("padding")),de!==G.r&&I(P,G.r=de),fe!==G.d&&((G.d=fe)!=null?S.style.setProperty("padding",fe):S.style.removeProperty("padding")),Ae!==G.l&&I(F,G.l=Ae),T!==G.u&&((G.u=T)!=null?V.style.setProperty("padding",T):V.style.removeProperty("padding")),G},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),u}})},Fn=new Map,af=()=>{let e=M(()=>K().client.getQueryCache()),n=e().subscribe(t=>{Yr(()=>{for(let[r,o]of Fn.entries())o.shouldUpdate(t)&&o.setter(r(e))})});return U(()=>{Fn.clear(),n()}),n},Se=(e,n=!0,t=()=>!0)=>{let r=M(()=>K().client.getQueryCache()),[o,s]=z(e(r),n?void 0:{equals:!1});return B(()=>{s(e(r))}),Fn.set(e,{setter:s,shouldUpdate:t}),U(()=>{Fn.delete(e)}),o},_n=new Map,cf=()=>{let e=M(()=>K().client.getMutationCache()),n=e().subscribe(()=>{for(let[t,r]of _n.entries())queueMicrotask(()=>{r(t(e))})});return U(()=>{_n.clear(),n()}),n},Qe=(e,n=!0)=>{let t=M(()=>K().client.getMutationCache()),[r,o]=z(e(t),n?void 0:{equals:!1});return B(()=>{o(e(t))}),_n.set(e,o),U(()=>{_n.delete(e)}),r},Bs=(e,n)=>{let{colors:t,font:r,size:o,alpha:s,shadow:l,border:a}=C,i=(c,u)=>e==="light"?c:u;return{devtoolsBtn:n`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${l.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${t.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:n`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${C.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${i(t.gray[300],t.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${i(t.gray[400],t.darkGray[300])};
      }
    `,parentPanel:n`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${C.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${i(t.gray[300],t.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${i(t.gray[400],t.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":n`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":n`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":n`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":n`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":n`
      position: relative;
    `,"panel-position-top":n`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-bottom: ${i(t.gray[400],t.darkGray[300])} 1px solid;
    `,"panel-position-bottom":n`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-top: ${i(t.gray[400],t.darkGray[300])} 1px solid;
    `,"panel-position-right":n`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":n`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:n`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${i(t.gray[50],t.darkGray[700])};
      &:hover {
        background-color: ${i(t.gray[200],t.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${t.blue[600]};
      }
      & svg {
        color: ${i(t.gray[600],t.gray[400])};
        width: ${o[2]};
        height: ${o[2]};
      }
    `,"closeBtn-position-top":n`
      bottom: 0;
      right: ${o[2]};
      transform: translate(0, 100%);
      border-right: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-left: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${a.radius.sm} ${a.radius.sm};
      padding: ${o[.5]} ${o[1.5]} ${o[1]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":n`
      top: 0;
      right: ${o[2]};
      transform: translate(0, -100%);
      border-right: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-left: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-top: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${a.radius.sm} ${a.radius.sm} 0px 0px;
      padding: ${o[1]} ${o[1.5]} ${o[.5]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }
    `,"closeBtn-position-right":n`
      bottom: ${o[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-top: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-bottom: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-radius: ${a.radius.sm} 0px 0px ${a.radius.sm};
      padding: ${o[1.5]} ${o[.5]} ${o[1.5]} ${o[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":n`
      bottom: ${o[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-top: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-bottom: ${i(t.gray[400],t.darkGray[300])} 1px solid;
      border-radius: 0px ${a.radius.sm} ${a.radius.sm} 0px;
      padding: ${o[1.5]} ${o[1]} ${o[1.5]} ${o[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:n`
      flex: 1 1 700px;
      background-color: ${i(t.gray[50],t.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:n`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${t.purple[400]}${i("",s[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":n`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":n`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":n`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":n`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:n`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${C.size[2]} ${C.size[2.5]};
      gap: ${C.size[2.5]};
      border-bottom: ${i(t.gray[300],t.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${o[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:n`
      display: flex;
      gap: ${C.size[3]};
      align-items: center;
    `,logo:n`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${C.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
    `,tanstackLogo:n`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${i(t.gray[600],t.gray[300])};
    `,queryFlavorLogo:n`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${i("#ea4037, #ff9b11","#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:n`
      display: flex;
      gap: ${C.size[2]};
      height: min-content;
    `,queryStatusTag:n`
      display: flex;
      gap: ${C.size[1.5]};
      box-sizing: border-box;
      height: ${C.size[6.5]};
      background: ${i(t.gray[50],t.darkGray[500])};
      color: ${i(t.gray[700],t.gray[300])};
      border-radius: ${C.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${C.size[1]};
      padding-left: ${C.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${i("1px solid "+t.gray[300],"1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${t.blue[800]};
      }
    `,queryStatusTagLabel:n`
      font-size: ${r.size.xs};
    `,queryStatusCount:n`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${i(t.gray[500],t.gray[400])};
      background-color: ${i(t.gray[200],t.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${C.size[4.5]};
    `,statusTooltip:n`
      position: absolute;
      z-index: 1;
      background-color: ${i(t.gray[50],t.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${C.size[2]}));
      padding: ${C.size[.5]} ${C.size[2]};
      border-radius: ${C.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${i(t.gray[400],t.gray[600])};
      color: ${i(t.gray[600],t.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${i(t.gray[400],t.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${i(t.gray[100],t.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:n`
      display: flex;
      gap: ${C.size[2]};
      & > button {
        cursor: pointer;
        padding: ${C.size[.5]} ${C.size[1.5]} ${C.size[.5]}
          ${C.size[2]};
        border-radius: ${C.border.radius.sm};
        background-color: ${i(t.gray[100],t.darkGray[400])};
        border: 1px solid ${i(t.gray[300],t.darkGray[200])};
        color: ${i(t.gray[700],t.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${C.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${t.blue[800]};
        }
        & svg {
          width: ${C.size[3]};
          height: ${C.size[3]};
          color: ${i(t.gray[500],t.gray[400])};
        }
      }
    `,filterInput:n`
      padding: ${o[.5]} ${o[2]};
      border-radius: ${C.border.radius.sm};
      background-color: ${i(t.gray[100],t.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${C.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${i(t.gray[300],t.darkGray[200])};
      height: min-content;
      color: ${i(t.gray[600],t.gray[400])};
      & > svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${i(t.gray[100],t.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${i(t.gray[700],t.gray[300])};
        &::placeholder {
          color: ${i(t.gray[700],t.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
    `,filterSelect:n`
      padding: ${C.size[.5]} ${C.size[2]};
      border-radius: ${C.border.radius.sm};
      background-color: ${i(t.gray[100],t.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${C.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${i(t.gray[300],t.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${i(t.gray[600],t.gray[400])};
        width: ${C.size[2]};
        height: ${C.size[2]};
      }
      & > select {
        appearance: none;
        color: ${i(t.gray[700],t.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${i(t.gray[100],t.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
    `,actionsContainer:n`
      display: flex;
      gap: ${C.size[2]};
    `,actionsBtn:n`
      border-radius: ${C.border.radius.sm};
      background-color: ${i(t.gray[100],t.darkGray[400])};
      border: 1px solid ${i(t.gray[300],t.darkGray[200])};
      width: ${C.size[6.5]};
      height: ${C.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${C.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${i(t.gray[200],t.darkGray[500])};
      }
      & svg {
        color: ${i(t.gray[700],t.gray[300])};
        width: ${C.size[3]};
        height: ${C.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
    `,actionsBtnOffline:n`
      & svg {
        stroke: ${i(t.yellow[700],t.yellow[500])};
        fill: ${i(t.yellow[700],t.yellow[500])};
      }
    `,overflowQueryContainer:n`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:n`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${i(t.gray[700],t.gray[300])};
      background-color: ${i(t.gray[50],t.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${i(t.gray[200],t.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${C.size[1]};
        user-select: none;
        min-width: ${C.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${i(t.gray[300],t.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${C.size[6]};
        flex: 1;
        padding: ${C.size[1]} ${C.size[2]};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${i(t.gray[300],t.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${C.size[2]};
        color: ${i(t.gray[800],t.gray[300])};
        background-color: ${i(t.gray[300],t.darkGray[600])};
        border-bottom: 1px solid ${i(t.gray[300],t.darkGray[400])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:n`
      background-color: ${i(t.gray[200],t.darkGray[500])};
    `,detailsContainer:n`
      flex: 1 1 700px;
      background-color: ${i(t.gray[50],t.darkGray[700])};
      color: ${i(t.gray[700],t.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:n`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${i(t.gray[200],t.darkGray[600])};
      padding: ${C.size[1.5]} ${C.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:n`
      margin: ${C.size[1.5]} 0px ${C.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${C.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${C.size[1.5]};
      }

      & code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:n`
      border: 1px solid ${t.darkGray[200]};
      border-radius: ${C.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${C.size[1]} ${C.size[2.5]};
    `,actionsBody:n`
      flex-wrap: wrap;
      margin: ${C.size[2]} 0px ${C.size[2]} 0px;
      display: flex;
      gap: ${C.size[2]};
      padding: 0px ${C.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${C.size[1]} ${C.size[2]};
        display: flex;
        border-radius: ${C.border.radius.sm};
        background-color: ${i(t.gray[100],t.darkGray[600])};
        border: 1px solid ${i(t.gray[300],t.darkGray[400])};
        align-items: center;
        gap: ${C.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${t.blue[800]};
        }
        &:hover {
          background-color: ${i(t.gray[200],t.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${o[1.5]};
          height: ${o[1.5]};
          border-radius: ${C.border.radius.full};
        }
      }
    `,actionsSelect:n`
      font-size: ${r.size.xs};
      padding: ${C.size[.5]} ${C.size[2]};
      display: flex;
      border-radius: ${C.border.radius.sm};
      overflow: hidden;
      background-color: ${i(t.gray[100],t.darkGray[600])};
      border: 1px solid ${i(t.gray[300],t.darkGray[400])};
      align-items: center;
      gap: ${C.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${i(t.red[500],t.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${i(t.gray[200],t.darkGray[500])};
      }
      & > span {
        width: ${o[1.5]};
        height: ${o[1.5]};
        border-radius: ${C.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${C.colors.red[400]};
      }
      & svg {
        width: ${C.size[2]};
        height: ${C.size[2]};
      }
    `,settingsMenu:n`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${o[.5]};
      border-radius: ${C.border.radius.sm};
      border: 1px solid ${i(t.gray[300],t.gray[700])};
      background-color: ${i(t.gray[50],t.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${i(t.gray[700],t.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${o[.5]};
    `,settingsSubTrigger:n`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${C.border.radius.xs};
      padding: ${C.size[1]} ${C.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${i(t.gray[700],t.gray[300])};
      & svg {
        color: ${i(t.gray[600],t.gray[400])};
        transform: rotate(-90deg);
        width: ${C.size[2]};
        height: ${C.size[2]};
      }
      &:hover {
        background-color: ${i(t.gray[200],t.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${t.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:n`
      padding: ${C.size[1]} ${C.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${i(t.gray[300],t.darkGray[400])};
      color: ${i(t.gray[500],t.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:n`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${i(t.gray[700],t.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${C.border.radius.xs};
      padding: ${C.size[1]} ${C.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${i(t.gray[600],t.gray[400])};
      }
      &:hover {
        background-color: ${i(t.gray[200],t.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${t.blue[800]};
      }
    `,themeSelectedButton:n`
      background-color: ${i(t.purple[100],t.purple[900])};
      color: ${i(t.purple[700],t.purple[300])};
      & svg {
        color: ${i(t.purple[700],t.purple[300])};
      }
      &:hover {
        background-color: ${i(t.purple[100],t.purple[900])};
      }
    `,viewToggle:n`
      border-radius: ${C.border.radius.sm};
      background-color: ${i(t.gray[200],t.darkGray[600])};
      border: 1px solid ${i(t.gray[300],t.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${i(t.gray[700],t.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${t.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${i(t.gray[100],t.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${i(t.gray[100],t.darkGray[400])};
        & label:hover {
          background-color: ${i(t.gray[100],t.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${C.size[1.5]} 0 ${C.size[2]};
        }
        border-right: 1px solid ${i(t.gray[300],t.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${C.size[2]} 0 ${C.size[1.5]};
        }
      }
    `,devtoolsEditForm:n`
      padding: ${o[2]};
      & > [data-error='true'] {
        outline: 2px solid ${i(t.red[200],t.red[800])};
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
      }
    `,devtoolsEditTextarea:n`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${a.radius.sm};
      field-sizing: content;
      padding: ${o[2]};
      background-color: ${i(t.gray[100],t.darkGray[800])};
      color: ${i(t.gray[900],t.gray[100])};
      border: 1px solid ${i(t.gray[200],t.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${i(t.blue[200],t.blue[800])};
      }
    `,devtoolsEditFormActions:n`
      display: flex;
      justify-content: space-between;
      gap: ${o[2]};
      align-items: center;
      padding-top: ${o[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:n`
      color: ${i(t.red[700],t.red[500])};
    `,devtoolsEditFormActionContainer:n`
      display: flex;
      gap: ${o[2]};
    `,devtoolsEditFormAction:n`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${o[1]} ${C.size[2]};
      display: flex;
      border-radius: ${a.radius.sm};
      background-color: ${i(t.gray[100],t.darkGray[600])};
      border: 1px solid ${i(t.gray[300],t.darkGray[400])};
      align-items: center;
      gap: ${o[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
      &:hover {
        background-color: ${i(t.gray[200],t.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},Ve=e=>Bs("light",e),He=e=>Bs("dark",e);Sn(["click","mousedown","input"]);export{df as a,ff as b,il as c,gf as d,sl as e,hf as f,pf as g,Ks as h};
