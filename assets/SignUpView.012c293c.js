import{k as u,a as m,o as n,c as i,d as l,w as r,D as p,h as d,g as t,v as w,p as f,E as y,A as V,F as c,b as h}from"./index.f9402bec.js";const g={key:0},b={name:"SignUp",data(){return{form:!1,showForm:!1,email:"",username:"",password:"",verify_password:"",rules:{email:[s=>!!s||"Required.",s=>/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(s)||"Enter a valid email"],passwd:[s=>!!s||"Required.",s=>/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(s)||"A-z numbers and length 8"],v_passwd:(s,e)=>e==s||"Passwords are different"}}},methods:{async imageLoaded(){this.showForm=!0},async onSubmit(){if(this.password!==this.verify_password){alertStore.error("Passwords do not match");return}await h().register(this).then(()=>{this.$router.push({name:"log-in"})}).catch(e=>{alertStore.error(e.err)})}}},v=u({...b,setup(s){return m(),(e,a)=>(n(),i(c,null,[l(d,null,{default:r(()=>[l(p,{onLoad:e.imageLoaded,src:"/E07/logo.png",style:{width:"15%"},class:"mx-auto"},null,8,["onLoad"])]),_:1}),e.showForm?(n(),i("div",g,[l(y,{ref:"form",modelValue:e.form,"onUpdate:modelValue":a[4]||(a[4]=o=>e.form=o)},{default:r(()=>[l(d,{style:{width:"50%","justify-content":"center","align-items":"center"}},{default:r(()=>[l(t,{"prepend-icon":"mdi-email",label:"Email address",type:"email",rules:e.rules.email,"hide-details":"auto",modelValue:e.email,"onUpdate:modelValue":a[0]||(a[0]=o=>e.email=o),style:{width:"100%","justify-content":"center","align-items":"center"}},null,8,["rules","modelValue"]),l(t,{"prepend-icon":"mdi-account",label:"Account name (custom field)","hide-details":"auto",modelValue:e.username,"onUpdate:modelValue":a[1]||(a[1]=o=>e.username=o),style:{width:"100%","justify-content":"center","align-items":"center"}},null,8,["modelValue"]),l(t,{"prepend-icon":"mdi-lock",label:"Password",type:"password",rules:e.rules.passwd,"hide-details":"auto",modelValue:e.password,"onUpdate:modelValue":a[2]||(a[2]=o=>e.password=o),required:"",style:{width:"100%","justify-content":"center","align-items":"center"}},null,8,["rules","modelValue"]),l(t,{"prepend-icon":"mdi-lock",label:"Verify password",type:"password",rules:[e.rules.v_passwd(e.password,e.verify_password)],modelValue:e.verify_password,"onUpdate:modelValue":a[3]||(a[3]=o=>e.verify_password=o),"hide-details":"auto",style:{width:"100%","justify-content":"center","align-items":"center"}},null,8,["rules","modelValue"]),l(d,null,{default:r(()=>[l(w,{onClick:e.onSubmit,rounded:"",disabled:!e.form,elevation:"2",class:"mx-auto",style:{display:"block","background-color":"#0ebbb5",color:"white"}},{default:r(()=>[f("Sign Up")]),_:1},8,["onClick","disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])):V("",!0)],64))}}),k=u({__name:"SignUpView",setup(s){return(e,a)=>(n(),i("main",null,[l(v)]))}});export{k as default};