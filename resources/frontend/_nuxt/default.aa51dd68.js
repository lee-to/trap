import{I as o,_ as h}from"./layout-sidebar.vue.39468dad.js";import{d as k,Y as g,G as S,g as y,o as u,h as p,a as m,i as e,w as i,u as a,t as v,j as b,m as f,n as $,A as C}from"./entry.6dfe3f3c.js";import{_ as V}from"./_plugin-vue_export-helper.c27b6911.js";import{u as I}from"./settings.6fe2f6cd.js";const N={class:"layout-sidebar"},A={class:"layout-sidebar__nav"},L={class:"layout-sidebar__versions"},T=["title"],w=["title"],B=k({__name:"layout-sidebar",props:{apiVersion:{},clientVersion:{}},setup(l){const c=g(),{isConnectedWS:_}=S(c),n=y(()=>_.value?"connected":"disconnected"),d=y(()=>`WS connection is ${n.value}`);return(t,r)=>{const s=h;return u(),p("aside",N,[m("nav",A,[e(s,{to:"/",title:"Events",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"events"})]),_:1}),e(s,{to:"/sentry",title:"Sentry logs",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"sentry"})]),_:1}),e(s,{to:"/profiler",title:"Profiler",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"profiler"})]),_:1}),e(s,{to:"/smtp",title:"SMTP mails",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"smtp"})]),_:1}),e(s,{to:"/http-dumps",title:"Http dumps",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"http-dumps"})]),_:1}),e(s,{to:"/inspector",title:"Inspector logs",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"inspector"})]),_:1}),e(s,{to:"/settings",title:"Settings",class:"layout-sidebar__link"},{default:i(()=>[e(a(o),{class:"layout-sidebar__link-icon",name:"settings"})]),_:1})]),m("div",L,[e(a(o),{class:"layout-sidebar__connection-icon",name:n.value,title:d.value},null,8,["name","title"]),t.apiVersion?(u(),p("div",{key:0,class:"layout-sidebar__nav-version",title:`Api version: ${t.apiVersion}`},v(t.apiVersion),9,T)):b("",!0),t.clientVersion?(u(),p("div",{key:1,class:"layout-sidebar__nav-version",title:`Client version: ${t.clientVersion}`},v(t.clientVersion),9,w)):b("",!0)])])}}}),x=V(B,[["__scopeId","data-v-472a9b20"]]),E=k({components:{LayoutSidebar:x},async setup(){var r;const l=I(),{themeType:c,isFixedHeader:_}=S(l),{$config:n,$api:d}=f(),t=await d.getVersion();{const{$events:s}=f();return(r=s==null?void 0:s.items)!=null&&r.length||s.getAll(),{themeType:c,isFixedHeader:_,apiVersion:String(t).match(/^[0-9.]+.*$/)?`v${t}`:`@${t}`,clientVersion:!(n!=null&&n.version)||n.version==="0.0.1"?"@dev":`v${n.version}`}}}});const H={class:"main-layout"},P={class:"main-layout__content"};function W(l,c,_,n,d,t){const r=$("LayoutSidebar");return u(),p("div",H,[e(r,{class:"main-layout__sidebar","api-version":l.apiVersion,"client-version":l.clientVersion},null,8,["api-version","client-version"]),m("div",P,[C(l.$slots,"default",{},void 0,!0)])])}const M=V(E,[["render",W],["__scopeId","data-v-673d5eea"]]);export{M as default};
