import{h as _}from"./layout-sidebar.vue.39468dad.js";import{d,g as c,o as m,h as l,a as t,t as a,p as h,e as u,V as n}from"./entry.6dfe3f3c.js";import{_ as b}from"./_plugin-vue_export-helper.c27b6911.js";const e=s=>(h("data-v-fea4ba8d"),s=s(),u(),s),I={class:"inspector-stat-board"},S={class:"inspector-stat-board__item"},f=e(()=>t("h4",{class:"inspector-stat-board__item-name"},"Timestamp",-1)),v={class:"inspector-stat-board__item-value"},E={class:"inspector-stat-board__item"},g=e(()=>t("h4",{class:"inspector-stat-board__item-name"},"Duration",-1)),y={class:"inspector-stat-board__item-value"},N={class:"inspector-stat-board__item"},T=e(()=>t("h4",{class:"inspector-stat-board__item-name"},"Result",-1)),B={class:"inspector-stat-board__item-value"},C=d({__name:"inspector-stat-board",props:{transaction:{}},setup(s){const o=s,r=c(()=>_(o.transaction.timestamp).toLocaleString()),i=c(()=>(o.transaction.result||"success").toUpperCase());return(p,R)=>(m(),l("section",I,[t("div",S,[f,t("strong",v,a(r.value),1)]),t("div",E,[g,t("strong",y,a(p.transaction.duration)+" ms ",1)]),t("div",N,[T,t("span",B,a(i.value),1)])]))}}),w=b(C,[["__scopeId","data-v-fea4ba8d"]]),D=s=>{const o=s.payload[0];return{id:s.uuid,type:n.INSPECTOR,labels:[n.INSPECTOR],origin:{name:o.host.hostname,ip:o.host.ip,os:o.host.os},serverName:o.host.hostname,date:s.timestamp?new Date(s.timestamp*1e3):null,payload:s.payload}},x=()=>({normalizeInspectorEvent:D});export{w as I,x as u};
