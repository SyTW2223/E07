import{k as g,o as n,j as d,w as t,d as s,l as C,m as _,n as w,p as x,t as T,q as S,C as i,R as p,b as F,a as b,s as k,f,e as v,r as A,c,I as B,g as $,h as o,F as E,i as N,A as D,T as R}from"./index.5810f008.js";import{l as G}from"./lodash.d9674e57.js";import{_ as I}from"./_plugin-vue_export-helper.cdc0426e.js";const L=["src"],j={props:["user"],emits:["remove"],data:()=>({}),methods:{}},q=g({...j,__name:"UserCardsVuetify",setup(e){return(r,a)=>(n(),d(i,{style:{width:"100%",margin:"0 auto","border-radius":"2px"},to:`/${e.user.username}`},{default:t(()=>[s(S,null,{default:t(()=>[s(C,{size:"40px"},{default:t(()=>[s(_(p),{to:`/${e.user.username}`},{default:t(()=>[w("img",{style:{"max-width":"100%","max-height":"100%"},src:e.user.pfp_url,alt:""},null,8,L)]),_:1},8,["to"])]),_:1}),s(_(p),{style:{"margin-left":"5px"},class:"username-link",to:`/${e.user.username}`},{default:t(()=>[x(T(e.user.username),1)]),_:1},8,["to"])]),_:1})]),_:1},8,["to"]))}});const h=`${v}`,z=F(),y=b(),J={name:"SignUp",components:{UserCards:q},data(){return{search:"",textAreaValue:"",errorAlertText:"undefined",errorAlertEnabled:!1,user:k(z).logged_user,users:new Array,searchDelay:1e3,delayedSearchFunc:new Function}},methods:{addUserFirst(e){this.users.push({username:e.username,pfp_url:e.pfp_url})},async delayedGetUserBySearchTerm(e){await this.delayedSearchFunc(e)},async getUserBySearchTerm(e){await f.get(`${h}/users?searchTerm=${e}`,null).then(r=>{if(r.length==0){this.users=[];return}this.users=[],r.forEach(a=>{a.pfp_url||(a.pfp_url="/E07/logo_without_letters.png");let m={username:a.username,pfp_url:a.pfp_url};this.addUserFirst(m)})}).catch(r=>{y.error(r.err)})}},async beforeMount(){this.delayedSearchFunc=G.exports.debounce(this.getUserBySearchTerm,this.searchDelay),await f.get(`${h}/users/`,null).then(e=>{e.forEach(r=>{r.pfp_url||(r.pfp_url="/E07/logo_without_letters.png");let a={username:r.username,pfp_url:r.pfp_url};this.addUserFirst(a)})}).catch(e=>{y.error(e.err)})}};function M(e,r,a,m,l,U){const V=A("UserCards");return n(),c("div",null,[s(o,null,{default:t(()=>[s(i,null,{default:t(()=>[s(S,null,{default:t(()=>[s(B),s($,{modelValue:l.search,"onUpdate:modelValue":r[0]||(r[0]=u=>l.search=u),"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":"",onInput:r[1]||(r[1]=u=>U.delayedGetUserBySearchTerm(l.search))},{default:t(()=>[x(" >")]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),s(o,null,{default:t(()=>[s(i,{title:"All users",variant:"tonal"})]),_:1}),s(R,{name:"fade"},{default:t(()=>[l.users.length>0?(n(),d(o,{key:0},{default:t(()=>[(n(!0),c(E,null,N(l.users,u=>(n(),d(V,{key:u.name,user:u,style:{"border-bottom":"1px solid grey"}},null,8,["user"]))),128))]),_:1})):D("",!0)]),_:1})])}const W=I(J,[["render",M]]),P=g({__name:"SearchUsersView",setup(e){return(r,a)=>(n(),c("main",null,[s(W)]))}});export{P as default};
