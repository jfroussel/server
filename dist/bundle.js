!function(e){var n={};function t(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(o,s,function(n){return e[n]}.bind(null,s));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=7)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("lodash")},function(e,n,t){var o=t(0),s=o.Schema,r=t(15),i=new s({email:{type:String,lowercase:!0},password:String,username:String});i.pre("save",function(e){var n=this;console.log(this),r.genSalt(10,function(t,o){if(t)return e(t);r.hash(n.password,o,null,function(t,o){if(t)return e(t);n.password=o,e()})})}),i.methods.isPasswordEqualTo=function(e,n){r.compare(e,this.password,function(e,t){if(e)return n(e);n(null,t)})};var u=o.model("user",i);e.exports=u},function(e,n){e.exports={secret:"jgt54!!457ù%%5874JFRtnjsjade98èè'-"}},function(e,n){e.exports=require("axios")},function(e,n){e.exports=require("passport")},function(e,n){e.exports=require("passport-jwt")},function(e,n,t){var o=t(8),s=t(9),r=t(10),i=t(11),u=t(12),a=o(),d=t(13),c=t(23),p=t(0),l=t(24),m=t(25);p.connect("mongodb://51.15.190.152:27017/server",{useCreateIndex:!0,useNewUrlParser:!0}),p.connection.once("open",function(){return console.log("connected to Reactsound Mlab")}).on("error",function(e){return console.log("connection error",e)}),a.set("json spaces",2),a.use(u("combined")),a.use(i.json({type:"*/*"})),a.use(l()),a.use(m()),a.use("/api-docs",s.serve,s.setup(r,{customCss:".swagger-ui .topbar { display: none }"}));var f=c.createServer(a);d(a),f.listen(3050,function(){console.log("welcome node server reactsound !  on port:",3050)})},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("swagger-ui-express")},function(e){e.exports={info:{title:"API REST Documentation for reactsound",version:"1.0.0",license:{name:"Licence MIT"},description:"Reactsound Server Api Documentation"},basePath:"/api-docs",host:"localhost:3050",tags:[{name:"users",description:"Users http request"},{name:"sounds",description:"sounds http request"},{name:"accounts",description:"accounts http request"},{name:"auth",description:"auth http request"}],paths:{"/signup":{post:{tags:["auth"],summary:"/signup",consumes:["application/json"],parameters:[]}},"/signin":{post:{tags:["auth"],summary:"/signin",consumes:["application/json"],parameters:[]}},"/accounts":{get:{tags:["accounts"],summary:"/accounts",consumes:["application/json"],parameters:[]}},"/account/{id}":{get:{tags:["accounts"],summary:"/account/{id}",consumes:["application/json"],parameters:[{name:"id",in:"path",required:!0}]}},"/users":{get:{tags:["users"],summary:"/users",consumes:["application/json"],parameters:[]}},"/sound":{post:{tags:["sounds"],summary:"/sound",consumes:["application/json"],parameters:[{name:"title",in:"body",required:!0},{name:"description",in:"body",required:!0},{name:"soundUrl",in:"body",required:!0},{name:"author",in:"body",required:!0},{name:"uid",in:"body",required:!0},{name:"bpm",in:"body"},{name:"tone",in:"body"},{name:"genres",in:"body"},{name:"moods",in:"body"},{name:"loops",in:"body"},{name:"lenght",in:"body"},{name:"instruments",in:"body"}]}},"/sounds/{id}":{get:{tags:["sounds"],summary:"/sounds/{id}",consumes:["application/json"],parameters:[{name:"id",in:"params",required:!0}]}},"/sound/{id}":{get:{tags:["sounds"],summary:"/sound/{id}",consumes:["application/json"],parameters:[{name:"id",in:"path",required:!0}]},put:{tags:["sounds"],summary:"/sound/{id}",consumes:["application/json"],parameters:[{name:"id",in:"path",required:!0}]},delete:{tags:["sounds"],summary:"/sound/{id}",consumes:["application/json"],parameters:[{name:"id",in:"path",required:!0}]}},"/sound-upload":{post:{tags:["sounds"],summary:"/sound-upload",consumes:["application/json"],parameters:[]}}},swagger:"2.0"}},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("morgan")},function(e,n,t){var o=t(14),s=t(17),r=t(19);t(21);var i=t(5),u=(i.authenticate("jwt",{session:!1}),i.authenticate("local",{session:!1}));e.exports=function(e){e.post("/signup",o.signup),e.get("/ressourceSecrete",function(e,n){n.send({test:666})}),e.get("/ressourceSecret/:id",function(e,n,t){n.send("result :"+e.params.id)}),e.post("/signin",u,o.signin),e.get("/accounts",o.accounts),e.get("/account/:id",function(e,n){n.send({result:"result"+e.params.id})}),e.get("/users",o.users),e.post("/sound",s.create),e.get("/sounds/:id",s.readAll),e.get("/sound/:id",s.read),e.put("/sound/:id",s.update),e.delete("/sound/:id",s.delete),e.post("/sound-upload",r.create)}},function(e,n,t){var o=t(2),s=t(1),r=t(16),i=t(3),u=t(4);function a(e){var n=(new Date).getTime();return r.encode({sub:e.id,iat:n},i.secret)}n.signup=function(e,n,t){var r=e.body.email,i=e.body.password,u=e.body.username;o.findOne({email:r},function(e,d){if(e)return t(e);if(d)return n.status(422).send({error:"email already exist !"});if(s.isEmpty(r)||s.isEmpty(u)||s.isEmpty(i))return n.status(422).send({error:"email / username or password empty !"});var c=new o({email:r,password:i,username:u});c.save(function(e){if(e)return t(e);n.json({token:a(c)})})})},n.signin=function(e,n,t){console.log("SIGNIN ",e.user),n.json({token:a(e.user),info:e.user})},n.users=function(e,n,t){u.get("https://jsonplaceholder.typicode.com/users").then(function(e){n.json(e.data)})},n.accounts=function(e,n,t){o.find().then(function(e){n.json(e)})}},function(e,n){e.exports=require("bcrypt-nodejs")},function(e,n){e.exports=require("jwt-simple")},function(e,n,t){var o=t(18),s=t(1),r=t(4);n.create=function(e,n,t){var r=e.body.title,i=e.body.description,u=e.body.soundUrl,a=e.body.author,d=e.body.uid,c=e.body.bpm,p=e.body.tone,l=e.body.genres,m=e.body.moods,f=e.body.loops,y=e.body.lenght,g=e.body.instruments;o.findOne({title:r},function(e,b){if(e)return t(e);if(b)return n.status(422).send({error:"title already exist !"});if(s.isEmpty(r)||s.isEmpty(u))return n.status(422).send({error:"title or soundUrl empty !"});var h=new o({title:r,description:i,soundUrl:u,author:a,uid:d,bpm:c,tone:p,genres:l,moods:m,loops:f,lenght:y,instruments:g});h.save(function(e){if(e)return t(e);n.send(h)})})},n.update=function(e,n,t){var s=e.params.id,r=e.body.title,i=e.body.description,u=e.body.soundUrl,a=e.body.author,d=e.body.uid,c=e.body.bpm,p=e.body.tone,l=e.body.genres,m=e.body.moods,f=e.body.loops,y=e.body.lenght,g=e.body.instruments;o.findByIdAndUpdate(s,{$set:e.body},{multi:!0,new:!0},function(e){if(e)return t(e);var o={title:r,description:i,soundUrl:u,author:a,uid:d,bpm:c,tone:p,genres:l,moods:m,loops:f,lenght:y,instruments:g};n.send(o),console.log("UPDATE : ",o)})},n.read=function(e,n,t){var s=e.params.id;o.findById(s).then(function(e){console.log("CATALOG : ",e),n.send(e)})},n.readAll=function(e,n,t){var s=e.params.id;o.find({uid:s}).then(function(e){console.log("readAll : ",e),n.json(e)})},n.delete=function(e,n,t){var s=e.params.id;o.findByIdAndRemove(s).then(function(e){n.send(e)})},n.signin=function(e,n,t){console.log("SIGNIN ",e.user),n.json({token:getToken(e.user),info:e.user})},n.users=function(e,n,t){r.get("https://jsonplaceholder.typicode.com/users").then(function(e){n.json(e.data)})},n.accounts=function(e,n,t){User.find().then(function(e){n.json(e)})}},function(e,n,t){var o=t(0),s=new(0,o.Schema)({title:{type:String,unique:!0,uppercase:!0},description:String,soundUrl:{type:String,unique:!0},author:String,uid:String,bpm:Number,tone:String,genres:Array,moods:Array,loops:Number,lenght:Number,instruments:Array}),r=o.model("catalog",s);e.exports=r},function(e,n,t){var o=t(20),s=t(1);n.create=function(e,n,t){var r=e.body.url;o.findOne({url:r},function(e,i){if(e)return t(e);if(i)return n.status(422).send({error:"url already exist !"});if(s.isEmpty(r))return n.status(422).send({error:"url empty !"});var u=new o({url:r});u.save(function(e){if(e)return t(e);n.send(u)})})}},function(e,n,t){var o=t(0),s=new(0,o.Schema)({url:{type:String,unique:!0}}),r=o.model("sound",s);e.exports=r},function(e,n,t){var o=t(5),s=t(2),r=t(3),i=t(6).Strategy,u=t(6).ExtractJwt,a=t(22),d=new i({jwtFromRequest:u.fromHeader("authorization"),secretOrKey:r.secret},function(e,n){var t=e.sub;s.findById(t,function(e,t){return e?n(e,!1):n(null,t||!1)})}),c=new a({usernameField:"email",passwordField:"password"},function(e,n,t){s.findOne({email:e},function(e,o){return e?t(e):o?void o.isPasswordEqualTo(n,function(e,n){return e?t(e):t(null,!!n&&o)}):t(null,!1)})});o.use(d),o.use(c)},function(e,n){e.exports=require("passport-local")},function(e,n){e.exports=require("http")},function(e,n){e.exports=require("cors")},function(e,n){e.exports=require("express-fileupload")}]);