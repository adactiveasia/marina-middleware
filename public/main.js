(()=>{var t={344:(t,e,s)=>{const o=s(376),a="https://marinasquare.ascentis.com.sg/gateway";e.getAllDeals=async(t,e,s)=>{const n=await o.get(`${a}/api/Cms/GetAllDeals`);e.status(200).send(n.data)},e.GetAllEvents=async(t,e,s)=>{const n=await o.get(`${a}/api/Cms/GetAllEvents`);e.status(200).send(n.data)},e.GetContentList=async(t,e,s)=>{const n=t.query.ContentId,r=await o.get(`${a}/api/Cms/GetContentList?ContentId=${n}`);e.status(200).send(r.data)}},837:(t,e,s)=>{const o=s(127).Router(),a=s(344);o.get("/GetAllDeals",a.getAllDeals),o.get("/GetAllEvents",a.GetAllEvents),o.get("/GetContentList",a.GetContentList),t.exports=o},376:t=>{"use strict";t.exports=require("axios")},479:t=>{"use strict";t.exports=require("cors")},334:t=>{"use strict";t.exports=require("dotenv")},127:t=>{"use strict";t.exports=require("express")}},e={};function s(o){var a=e[o];if(void 0!==a)return a.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,s),n.exports}(()=>{s(334).config();const t=s(127),e=s(479),o=s(837),a=t();a.use(e()),a.use(((t,e,s)=>{e.setHeader("Access-Control-Allow-Origin","*"),e.setHeader("Access-Control-Allow-Methods","GET"),s()})),a.use("/api/Cms",o),console.log("test"),a.use(((t,e,s,o)=>{console.log(t);const a=t.statusCode||500,{message:n,data:r}=t;return s.status(a).json({message:n,data:r})})),a.listen("5000",(()=>console.log("App ready")))})()})();