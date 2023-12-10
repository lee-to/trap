import{d as Ne,x as ve,H as rt,g as P,C as de,o as ot,h as ct,i as Ee,u as be,a as at,f as lt,s as ut}from"./entry.6dfe3f3c.js";import{I as ft,b as gt}from"./layout-sidebar.vue.39468dad.js";import{_ as ht}from"./_plugin-vue_export-helper.c27b6911.js";function Ae(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const i=e[t],l=typeof i;(l==="object"||l==="function")&&!Object.isFrozen(i)&&Ae(i)}),e}class _e{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function I(e,...t){const i=Object.create(null);for(const l in e)i[l]=e[l];return t.forEach(function(l){for(const p in l)i[p]=l[p]}),i}const pt="</span>",we=e=>!!e.scope,dt=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const i=e.split(".");return[`${t}${i.shift()}`,...i.map((l,p)=>`${l}${"_".repeat(p+1)}`)].join(" ")}return`${t}${e}`};class Et{constructor(t,i){this.buffer="",this.classPrefix=i.classPrefix,t.walk(this)}addText(t){this.buffer+=Te(t)}openNode(t){if(!we(t))return;const i=dt(t.scope,{prefix:this.classPrefix});this.span(i)}closeNode(t){we(t)&&(this.buffer+=pt)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const xe=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class ie{constructor(){this.rootNode=xe(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const i=xe({scope:t});this.add(i),this.stack.push(i)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,i){return typeof i=="string"?t.addText(i):i.children&&(t.openNode(i),i.children.forEach(l=>this._walk(t,l)),t.closeNode(i)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(i=>typeof i=="string")?t.children=[t.children.join("")]:t.children.forEach(i=>{ie._collapse(i)}))}}class bt extends ie{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,i){const l=t.root;i&&(l.scope=`language:${i}`),this.add(l)}toHTML(){return new Et(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function U(e){return e?typeof e=="string"?e:e.source:null}function ke(e){return L("(?=",e,")")}function _t(e){return L("(?:",e,")*")}function wt(e){return L("(?:",e,")?")}function L(...e){return e.map(i=>U(i)).join("")}function xt(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function se(...e){return"("+(xt(e).capture?"":"?:")+e.map(l=>U(l)).join("|")+")"}function Ie(e){return new RegExp(e.toString()+"|").exec("").length-1}function Mt(e,t){const i=e&&e.exec(t);return i&&i.index===0}const yt=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function re(e,{joinWith:t}){let i=0;return e.map(l=>{i+=1;const p=i;let E=U(l),o="";for(;E.length>0;){const r=yt.exec(E);if(!r){o+=E;break}o+=E.substring(0,r.index),E=E.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?o+="\\"+String(Number(r[1])+p):(o+=r[0],r[0]==="("&&i++)}return o}).map(l=>`(${l})`).join(t)}const Ot=/\b\B/,Ce="[a-zA-Z]\\w*",oe="[a-zA-Z_]\\w*",Be="\\b\\d+(\\.\\d+)?",Le="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",De="\\b(0b[01]+)",St="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Rt=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=L(t,/.*\b/,e.binary,/\b.*/)),I({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(i,l)=>{i.index!==0&&l.ignoreMatch()}},e)},$={begin:"\\\\[\\s\\S]",relevance:0},Nt={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[$]},vt={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[$]},At={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},V=function(e,t,i={}){const l=I({scope:"comment",begin:e,end:t,contains:[]},i);l.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const p=se("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return l.contains.push({begin:L(/[ ]+/,"(",p,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),l},Tt=V("//","$"),kt=V("/\\*","\\*/"),It=V("#","$"),Ct={scope:"number",begin:Be,relevance:0},Bt={scope:"number",begin:Le,relevance:0},Lt={scope:"number",begin:De,relevance:0},Dt={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[$,{begin:/\[/,end:/\]/,relevance:0,contains:[$]}]}]},Ht={scope:"title",begin:Ce,relevance:0},jt={scope:"title",begin:oe,relevance:0},Pt={begin:"\\.\\s*"+oe,relevance:0},Ut=function(e){return Object.assign(e,{"on:begin":(t,i)=>{i.data._beginMatch=t[1]},"on:end":(t,i)=>{i.data._beginMatch!==t[1]&&i.ignoreMatch()}})};var F=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Ot,IDENT_RE:Ce,UNDERSCORE_IDENT_RE:oe,NUMBER_RE:Be,C_NUMBER_RE:Le,BINARY_NUMBER_RE:De,RE_STARTERS_RE:St,SHEBANG:Rt,BACKSLASH_ESCAPE:$,APOS_STRING_MODE:Nt,QUOTE_STRING_MODE:vt,PHRASAL_WORDS_MODE:At,COMMENT:V,C_LINE_COMMENT_MODE:Tt,C_BLOCK_COMMENT_MODE:kt,HASH_COMMENT_MODE:It,NUMBER_MODE:Ct,C_NUMBER_MODE:Bt,BINARY_NUMBER_MODE:Lt,REGEXP_MODE:Dt,TITLE_MODE:Ht,UNDERSCORE_TITLE_MODE:jt,METHOD_GUARD:Pt,END_SAME_AS_BEGIN:Ut});function $t(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Gt(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Wt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=$t,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function mt(e,t){Array.isArray(e.illegal)&&(e.illegal=se(...e.illegal))}function zt(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Kt(e,t){e.relevance===void 0&&(e.relevance=1)}const Ft=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const i=Object.assign({},e);Object.keys(e).forEach(l=>{delete e[l]}),e.keywords=i.keywords,e.begin=L(i.beforeMatch,ke(i.begin)),e.starts={relevance:0,contains:[Object.assign(i,{endsParent:!0})]},e.relevance=0,delete i.beforeMatch},Xt=["of","and","for","in","not","or","if","then","parent","list","value"],Vt="keyword";function He(e,t,i=Vt){const l=Object.create(null);return typeof e=="string"?p(i,e.split(" ")):Array.isArray(e)?p(i,e):Object.keys(e).forEach(function(E){Object.assign(l,He(e[E],t,E))}),l;function p(E,o){t&&(o=o.map(r=>r.toLowerCase())),o.forEach(function(r){const u=r.split("|");l[u[0]]=[E,Yt(u[0],u[1])]})}}function Yt(e,t){return t?Number(t):Zt(e)?0:1}function Zt(e){return Xt.includes(e.toLowerCase())}const Me={},B=e=>{console.error(e)},ye=(e,...t)=>{console.log(`WARN: ${e}`,...t)},D=(e,t)=>{Me[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Me[`${e}/${t}`]=!0)},X=new Error;function je(e,t,{key:i}){let l=0;const p=e[i],E={},o={};for(let r=1;r<=t.length;r++)o[r+l]=p[r],E[r+l]=!0,l+=Ie(t[r-1]);e[i]=o,e[i]._emit=E,e[i]._multi=!0}function Jt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw B("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),X;if(typeof e.beginScope!="object"||e.beginScope===null)throw B("beginScope must be object"),X;je(e,e.begin,{key:"beginScope"}),e.begin=re(e.begin,{joinWith:""})}}function qt(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw B("skip, excludeEnd, returnEnd not compatible with endScope: {}"),X;if(typeof e.endScope!="object"||e.endScope===null)throw B("endScope must be object"),X;je(e,e.end,{key:"endScope"}),e.end=re(e.end,{joinWith:""})}}function Qt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function en(e){Qt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Jt(e),qt(e)}function tn(e){function t(o,r){return new RegExp(U(o),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,u){u.position=this.position++,this.matchIndexes[this.matchAt]=u,this.regexes.push([u,r]),this.matchAt+=Ie(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(u=>u[1]);this.matcherRe=t(re(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const u=this.matcherRe.exec(r);if(!u)return null;const M=u.findIndex((j,Y)=>Y>0&&j!==void 0),w=this.matchIndexes[M];return u.splice(0,M),Object.assign(u,w)}}class l{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const u=new i;return this.rules.slice(r).forEach(([M,w])=>u.addRule(M,w)),u.compile(),this.multiRegexes[r]=u,u}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,u){this.rules.push([r,u]),u.type==="begin"&&this.count++}exec(r){const u=this.getMatcher(this.regexIndex);u.lastIndex=this.lastIndex;let M=u.exec(r);if(this.resumingScanAtSamePosition()&&!(M&&M.index===this.lastIndex)){const w=this.getMatcher(0);w.lastIndex=this.lastIndex+1,M=w.exec(r)}return M&&(this.regexIndex+=M.position+1,this.regexIndex===this.count&&this.considerAll()),M}}function p(o){const r=new l;return o.contains.forEach(u=>r.addRule(u.begin,{rule:u,type:"begin"})),o.terminatorEnd&&r.addRule(o.terminatorEnd,{type:"end"}),o.illegal&&r.addRule(o.illegal,{type:"illegal"}),r}function E(o,r){const u=o;if(o.isCompiled)return u;[Gt,zt,en,Ft].forEach(w=>w(o,r)),e.compilerExtensions.forEach(w=>w(o,r)),o.__beforeBegin=null,[Wt,mt,Kt].forEach(w=>w(o,r)),o.isCompiled=!0;let M=null;return typeof o.keywords=="object"&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),M=o.keywords.$pattern,delete o.keywords.$pattern),M=M||/\w+/,o.keywords&&(o.keywords=He(o.keywords,e.case_insensitive)),u.keywordPatternRe=t(M,!0),r&&(o.begin||(o.begin=/\B|\b/),u.beginRe=t(u.begin),!o.end&&!o.endsWithParent&&(o.end=/\B|\b/),o.end&&(u.endRe=t(u.end)),u.terminatorEnd=U(u.end)||"",o.endsWithParent&&r.terminatorEnd&&(u.terminatorEnd+=(o.end?"|":"")+r.terminatorEnd)),o.illegal&&(u.illegalRe=t(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map(function(w){return nn(w==="self"?o:w)})),o.contains.forEach(function(w){E(w,u)}),o.starts&&E(o.starts,r),u.matcher=p(u),u}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=I(e.classNameAliases||{}),E(e)}function Pe(e){return e?e.endsWithParent||Pe(e.starts):!1}function nn(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return I(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Pe(e)?I(e,{starts:e.starts?I(e.starts):null}):Object.isFrozen(e)?I(e):e}var sn="11.8.0";class rn extends Error{constructor(t,i){super(t),this.name="HTMLInjectionError",this.html=i}}const te=Te,Oe=I,Se=Symbol("nomatch"),on=7,Ue=function(e){const t=Object.create(null),i=Object.create(null),l=[];let p=!0;const E="Could not find the language '{}', did you forget to load/include a language module?",o={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:bt};function u(n){return r.noHighlightRe.test(n)}function M(n){let a=n.className+" ";a+=n.parentNode?n.parentNode.className:"";const h=r.languageDetectRe.exec(a);if(h){const b=T(h[1]);return b||(ye(E.replace("{}",h[1])),ye("Falling back to no-highlight mode for this block.",n)),b?h[1]:"no-highlight"}return a.split(/\s+/).find(b=>u(b)||T(b))}function w(n,a,h){let b="",x="";typeof a=="object"?(b=n,h=a.ignoreIllegals,x=a.language):(D("10.7.0","highlight(lang, code, ...args) has been deprecated."),D("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),x=n,b=a),h===void 0&&(h=!0);const R={code:b,language:x};W("before:highlight",R);const k=R.result?R.result:j(R.language,R.code,h);return k.code=R.code,W("after:highlight",k),k}function j(n,a,h,b){const x=Object.create(null);function R(s,c){return s.keywords[c]}function k(){if(!f.keywords){y.addText(_);return}let s=0;f.keywordPatternRe.lastIndex=0;let c=f.keywordPatternRe.exec(_),g="";for(;c;){g+=_.substring(s,c.index);const d=v.case_insensitive?c[0].toLowerCase():c[0],O=R(f,d);if(O){const[A,it]=O;if(y.addText(g),g="",x[d]=(x[d]||0)+1,x[d]<=on&&(K+=it),A.startsWith("_"))g+=c[0];else{const st=v.classNameAliases[A]||A;N(c[0],st)}}else g+=c[0];s=f.keywordPatternRe.lastIndex,c=f.keywordPatternRe.exec(_)}g+=_.substring(s),y.addText(g)}function m(){if(_==="")return;let s=null;if(typeof f.subLanguage=="string"){if(!t[f.subLanguage]){y.addText(_);return}s=j(f.subLanguage,_,!0,pe[f.subLanguage]),pe[f.subLanguage]=s._top}else s=Z(_,f.subLanguage.length?f.subLanguage:null);f.relevance>0&&(K+=s.relevance),y.__addSublanguage(s._emitter,s.language)}function S(){f.subLanguage!=null?m():k(),_=""}function N(s,c){s!==""&&(y.startScope(c),y.addText(s),y.endScope())}function ue(s,c){let g=1;const d=c.length-1;for(;g<=d;){if(!s._emit[g]){g++;continue}const O=v.classNameAliases[s[g]]||s[g],A=c[g];O?N(A,O):(_=A,k(),_=""),g++}}function fe(s,c){return s.scope&&typeof s.scope=="string"&&y.openNode(v.classNameAliases[s.scope]||s.scope),s.beginScope&&(s.beginScope._wrap?(N(_,v.classNameAliases[s.beginScope._wrap]||s.beginScope._wrap),_=""):s.beginScope._multi&&(ue(s.beginScope,c),_="")),f=Object.create(s,{parent:{value:f}}),f}function ge(s,c,g){let d=Mt(s.endRe,g);if(d){if(s["on:end"]){const O=new _e(s);s["on:end"](c,O),O.isMatchIgnored&&(d=!1)}if(d){for(;s.endsParent&&s.parent;)s=s.parent;return s}}if(s.endsWithParent)return ge(s.parent,c,g)}function qe(s){return f.matcher.regexIndex===0?(_+=s[0],1):(ee=!0,0)}function Qe(s){const c=s[0],g=s.rule,d=new _e(g),O=[g.__beforeBegin,g["on:begin"]];for(const A of O)if(A&&(A(s,d),d.isMatchIgnored))return qe(c);return g.skip?_+=c:(g.excludeBegin&&(_+=c),S(),!g.returnBegin&&!g.excludeBegin&&(_=c)),fe(g,s),g.returnBegin?0:c.length}function et(s){const c=s[0],g=a.substring(s.index),d=ge(f,s,g);if(!d)return Se;const O=f;f.endScope&&f.endScope._wrap?(S(),N(c,f.endScope._wrap)):f.endScope&&f.endScope._multi?(S(),ue(f.endScope,s)):O.skip?_+=c:(O.returnEnd||O.excludeEnd||(_+=c),S(),O.excludeEnd&&(_=c));do f.scope&&y.closeNode(),!f.skip&&!f.subLanguage&&(K+=f.relevance),f=f.parent;while(f!==d.parent);return d.starts&&fe(d.starts,s),O.returnEnd?0:c.length}function tt(){const s=[];for(let c=f;c!==v;c=c.parent)c.scope&&s.unshift(c.scope);s.forEach(c=>y.openNode(c))}let z={};function he(s,c){const g=c&&c[0];if(_+=s,g==null)return S(),0;if(z.type==="begin"&&c.type==="end"&&z.index===c.index&&g===""){if(_+=a.slice(c.index,c.index+1),!p){const d=new Error(`0 width match regex (${n})`);throw d.languageName=n,d.badRule=z.rule,d}return 1}if(z=c,c.type==="begin")return Qe(c);if(c.type==="illegal"&&!h){const d=new Error('Illegal lexeme "'+g+'" for mode "'+(f.scope||"<unnamed>")+'"');throw d.mode=f,d}else if(c.type==="end"){const d=et(c);if(d!==Se)return d}if(c.type==="illegal"&&g==="")return 1;if(Q>1e5&&Q>c.index*3)throw new Error("potential infinite loop, way more iterations than matches");return _+=g,g.length}const v=T(n);if(!v)throw B(E.replace("{}",n)),new Error('Unknown language: "'+n+'"');const nt=tn(v);let q="",f=b||nt;const pe={},y=new r.__emitter(r);tt();let _="",K=0,C=0,Q=0,ee=!1;try{if(v.__emitTokens)v.__emitTokens(a,y);else{for(f.matcher.considerAll();;){Q++,ee?ee=!1:f.matcher.considerAll(),f.matcher.lastIndex=C;const s=f.matcher.exec(a);if(!s)break;const c=a.substring(C,s.index),g=he(c,s);C=s.index+g}he(a.substring(C))}return y.finalize(),q=y.toHTML(),{language:n,value:q,relevance:K,illegal:!1,_emitter:y,_top:f}}catch(s){if(s.message&&s.message.includes("Illegal"))return{language:n,value:te(a),illegal:!0,relevance:0,_illegalBy:{message:s.message,index:C,context:a.slice(C-100,C+100),mode:s.mode,resultSoFar:q},_emitter:y};if(p)return{language:n,value:te(a),illegal:!1,relevance:0,errorRaised:s,_emitter:y,_top:f};throw s}}function Y(n){const a={value:te(n),illegal:!1,relevance:0,_top:o,_emitter:new r.__emitter(r)};return a._emitter.addText(n),a}function Z(n,a){a=a||r.languages||Object.keys(t);const h=Y(n),b=a.filter(T).filter(le).map(S=>j(S,n,!1));b.unshift(h);const x=b.sort((S,N)=>{if(S.relevance!==N.relevance)return N.relevance-S.relevance;if(S.language&&N.language){if(T(S.language).supersetOf===N.language)return 1;if(T(N.language).supersetOf===S.language)return-1}return 0}),[R,k]=x,m=R;return m.secondBest=k,m}function $e(n,a,h){const b=a&&i[a]||h;n.classList.add("hljs"),n.classList.add(`language-${b}`)}function J(n){let a=null;const h=M(n);if(u(h))return;if(W("before:highlightElement",{el:n,language:h}),n.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(n)),r.throwUnescapedHTML))throw new rn("One of your code blocks includes unescaped HTML.",n.innerHTML);a=n;const b=a.textContent,x=h?w(b,{language:h,ignoreIllegals:!0}):Z(b);n.innerHTML=x.value,$e(n,h,x.language),n.result={language:x.language,re:x.relevance,relevance:x.relevance},x.secondBest&&(n.secondBest={language:x.secondBest.language,relevance:x.secondBest.relevance}),W("after:highlightElement",{el:n,result:x,text:b})}function Ge(n){r=Oe(r,n)}const We=()=>{G(),D("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function me(){G(),D("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let ce=!1;function G(){if(document.readyState==="loading"){ce=!0;return}document.querySelectorAll(r.cssSelector).forEach(J)}function ze(){ce&&G()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",ze,!1);function Ke(n,a){let h=null;try{h=a(e)}catch(b){if(B("Language definition for '{}' could not be registered.".replace("{}",n)),p)B(b);else throw b;h=o}h.name||(h.name=n),t[n]=h,h.rawDefinition=a.bind(null,e),h.aliases&&ae(h.aliases,{languageName:n})}function Fe(n){delete t[n];for(const a of Object.keys(i))i[a]===n&&delete i[a]}function Xe(){return Object.keys(t)}function T(n){return n=(n||"").toLowerCase(),t[n]||t[i[n]]}function ae(n,{languageName:a}){typeof n=="string"&&(n=[n]),n.forEach(h=>{i[h.toLowerCase()]=a})}function le(n){const a=T(n);return a&&!a.disableAutodetect}function Ve(n){n["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=a=>{n["before:highlightBlock"](Object.assign({block:a.el},a))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=a=>{n["after:highlightBlock"](Object.assign({block:a.el},a))})}function Ye(n){Ve(n),l.push(n)}function Ze(n){const a=l.indexOf(n);a!==-1&&l.splice(a,1)}function W(n,a){const h=n;l.forEach(function(b){b[h]&&b[h](a)})}function Je(n){return D("10.7.0","highlightBlock will be removed entirely in v12.0"),D("10.7.0","Please use highlightElement now."),J(n)}Object.assign(e,{highlight:w,highlightAuto:Z,highlightAll:G,highlightElement:J,highlightBlock:Je,configure:Ge,initHighlighting:We,initHighlightingOnLoad:me,registerLanguage:Ke,unregisterLanguage:Fe,listLanguages:Xe,getLanguage:T,registerAliases:ae,autoDetection:le,inherit:Oe,addPlugin:Ye,removePlugin:Ze}),e.debugMode=function(){p=!1},e.safeMode=function(){p=!0},e.versionString=sn,e.regex={concat:L,lookahead:ke,either:se,optional:wt,anyNumberOfTimes:_t};for(const n in F)typeof F[n]=="object"&&Ae(F[n]);return Object.assign(e,F),e},H=Ue({});H.newInstance=()=>Ue({});var cn=H;H.HighlightJS=H;H.default=H;const ne=cn;var Re=Ne({props:{code:{type:String,required:!0},language:{type:String,default:""},autodetect:{type:Boolean,default:!0},ignoreIllegals:{type:Boolean,default:!0}},setup:function(e){var t=ve(e.language);rt(function(){return e.language},function(p){t.value=p});var i=P(function(){return e.autodetect||!t.value}),l=P(function(){return!i.value&&!ne.getLanguage(t.value)});return{className:P(function(){return l.value?"":"hljs "+t.value}),highlightedCode:P(function(){var p;if(l.value)return console.warn('The language "'+t.value+'" you specified could not be found.'),e.code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");if(i.value){var E=ne.highlightAuto(e.code);return t.value=(p=E.language)!==null&&p!==void 0?p:"",E.value}return(E=ne.highlight(e.code,{language:t.value,ignoreIllegals:e.ignoreIllegals})).value})}},render:function(){return de("pre",{},[de("code",{class:this.className,innerHTML:this.highlightedCode,tabindex:"0"})])}}),an={install:function(e){e.component("highlightjs",Re)},component:Re};const ln={class:"code-snippet"},un=Ne({__name:"code-snippet",props:{code:{},language:{default:"plaintext"}},setup(e){const t=e,i=an.component,l=ve(!1),p=P(()=>gt(t.code)?t.code:JSON.stringify(t.code,null," ")),E=()=>{l.value=!0,navigator.clipboard.writeText(p.value).then(()=>{setTimeout(()=>{l.value=!1},200)}).catch(o=>{console.error(o)})};return(o,r)=>(ot(),ct("div",ln,[Ee(be(i),{language:o.language,code:p.value},null,8,["language","code"]),at("button",{type:"button",class:ut(["code-snippet__copy",{"code-snippet__copy--active":l.value}]),onClick:E},[Ee(be(ft),{name:"copy",class:"code-snippet__copy-icon"}),lt(" Copy ")],2)]))}}),pn=ht(un,[["__scopeId","data-v-3e57f895"]]);export{pn as C};
