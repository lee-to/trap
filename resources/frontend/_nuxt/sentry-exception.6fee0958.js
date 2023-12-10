import{V as u,d as h,x as T,g as k,o as n,h as o,a,f as x,t as c,j as l,c as b,s as v,u as S,F as _,r as d,A as E}from"./entry.6dfe3f3c.js";import{I as L}from"./layout-sidebar.vue.39468dad.js";import{_ as g}from"./_plugin-vue_export-helper.c27b6911.js";const F=t=>{var s;return{id:t.uuid,type:u.SENTRY,labels:[u.SENTRY,"exception"],origin:{logger:t.payload.logger,environment:t.payload.environment},serverName:((s=t.payload)==null?void 0:s.server_name)||"",date:t.timestamp?new Date(t.timestamp*1e3):null,payload:t.payload}},K=()=>({normalizeSentryEvent:F}),H={class:"sentry-exception-frame__head-title"},M={key:0},B={key:0,class:"sentry-exception-frame__body"},N={class:"sentry-exception-frame__body-line-position"},$=["innerHTML"],V={key:1,class:"sentry-exception-frame__body-line sentry-exception-frame__body-line--selection"},C={class:"sentry-exception-frame__body-line-position"},I=["innerHTML"],O={class:"sentry-exception-frame__body-line-position"},Y=["innerHTML"],z=h({__name:"sentry-exception-frame",props:{frame:{},isOpen:{type:Boolean}},setup(t){const s=t,i=T(s.isOpen),r=k(()=>!!(s.frame.context_line||s.frame.post_context||s.frame.pre_context)),f=()=>{r.value&&(i.value=!i.value)};return(e,y)=>(n(),o("div",{class:v(["sentry-exception-frame",{"sentry-exception-frame--empty":!r.value}])},[a("div",{class:"sentry-exception-frame__head",onClick:f},[a("div",H,[x(c(e.frame.filename)+" ",1),e.frame.function?(n(),o("span",M," in "+c(e.frame.function)+" at line ",1)):l("",!0),x(" "+c(e.frame.lineno),1)]),e.frame.pre_context?(n(),b(S(L),{key:0,class:v(["sentry-exception-frame__head-title-dd",{"sentry-exception-frame__head-title-dd--visible":i.value}]),name:"dd"},null,8,["class"])):l("",!0)]),i.value&&r.value?(n(),o("div",B,[e.frame.pre_context?(n(!0),o(_,{key:0},d(e.frame.pre_context,(p,m)=>(n(),o("div",{key:p,class:"sentry-exception-frame__body-line"},[a("div",N,c(e.frame.lineno-(e.frame.pre_context.length-m))+". ",1),a("pre",{class:"sentry-exception-frame__body-line-content",innerHTML:p},null,8,$)]))),128)):l("",!0),e.frame.context_line?(n(),o("div",V,[a("div",C,c(e.frame.lineno)+". ",1),a("pre",{innerHTML:e.frame.context_line},null,8,I)])):l("",!0),e.frame.post_context?(n(!0),o(_,{key:2},d(e.frame.post_context,(p,m)=>(n(),o("div",{key:p,class:"sentry-exception-frame__body-line"},[a("div",O,c(e.frame.lineno+m+1)+". ",1),a("pre",{class:"sentry-exception-frame__body-line-content",innerHTML:p},null,8,Y)]))),128)):l("",!0)])):l("",!0)],2))}}),D=g(z,[["__scopeId","data-v-15a72013"]]),R={class:"sentry-exception"},j={class:"sentry-exception__title"},w=["innerHTML"],A={key:0,class:"sentry-exception__frames"},P=h({__name:"sentry-exception",props:{exception:{},maxFrames:{default:3}},setup(t){const s=t,i=k(()=>{const r=s.exception.stacktrace.frames||[];return s.maxFrames>0?r.reverse().slice(0,s.maxFrames):r});return(r,f)=>(n(),o("div",R,[E(r.$slots,"default",{},()=>[a("h3",j,c(r.exception.type),1),a("pre",{class:"sentry-exception__text",innerHTML:r.exception.value},null,8,w)],!0),i.value.length?(n(),o("div",A,[(n(!0),o(_,null,d(i.value,(e,y)=>(n(),b(D,{key:e.context_line,frame:e,"is-open":y===0},null,8,["frame","is-open"]))),128))])):l("",!0)]))}}),Q=g(P,[["__scopeId","data-v-99b0f226"]]);export{Q as S,K as u};
