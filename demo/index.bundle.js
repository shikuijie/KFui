System.register("demo/stable.js",["lib.js"],function(a){"use strict";function b(a,b){return'<button class="kf-btn kf-xs" @click="TABLE.'+a+'(ROW)">'+b+"</button>"}function c(a,b){var c=a?"TABLE":"ROW";return'<kf-checkbox :model.sync="'+c+'.checked"'+(b?" :label=\"'"+b+"'\"":"")+(b?' :on-change="TABLE.checkAll"':"")+"></kf-checkbox>"}var d,e;return{setters:[function(a){d=a.kfTable}],execute:function(){e={checked:!1,onReady:function(){d.setHead(this,this.thead),d.setBody(this,this.tbody)},checkAll:function(a){d.iterate(e,function(b){b.checked=a})},sampleRow:function(a,d){return{checked:!1,checkbox:c(),name:"Lagou",date:"2016-01-21",start:"2016-02-28",end:"2016-03-12",department:"平台运营部",email:"lagou@lagou.com",address:"海置创投大厦",action:b(a,d)}},appendRow:function(){d.appendRow(this,this.sampleRow("remove","删除"))},iterateRows:function(){d.iterate(this,function(a){console.log(a.name,a.email)})},prependRow:function(){d.prependRow(this,this.sampleRow("remove","删除"))},remove:function(a){d.deleteRow(a)},edit:function(a){alert("可以在此打开一个弹窗来编辑内容")},colKeys:["checkbox","name","email","department","address","action"],thead:[c(!0,"全部"),"姓名","邮箱","部门","地址","操作"],tbody:[{checked:!1,checkbox:c(),name:"Shimoo",department:"platform",email:"shimoo@lagou.com",address:"中关村创业大街",action:b("edit","编辑")}]},a("default",e)}}}),System.register("demo/mtable.js",["lib.js"],function(a){"use strict";function b(a,b){return'<button class="kf-btn kf-xs" @click="TABLE.'+a+'(ROW)">'+b+"</button>"}var c;return{setters:[function(a){c=a.kfTable}],execute:function(){a("default",{onReady:function(){c.setHead(this,this.thead),c.setBody(this,this.tbody)},sampleRow:function(){return{name:"Shimoo",email:"shimoo@gmail.com",phone:"17010547517",action:b("remove","删除"),address:[{type:"城市",value:"北京"},{type:"区",value:"海淀区"},{type:"街道",value:"龙岗路"}]}},appendRow:function(){c.appendRow(this,this.sampleRow())},prependRow:function(){c.prependRow(this,this.sampleRow())},iterateRows:function(){c.iterate(this,function(a){console.log(a.name,a.email,a.phone)})},remove:function(a){c.deleteRow(a)},showDetail:function(a){alert(a.name+" "+a.email+" "+a.phone)},thead:["姓名","邮箱","手机","地址类型","地址值","操作"],colKeys:["name","email","phone","address[].type","address[].value","action"],tbody:[{name:"Lagou",email:"Lagou@lagou.com",phone:"15741879798",action:b("showDetail","详情"),address:[{type:"城市",value:"北京"},{type:"区",value:"海淀区"},{type:"街道",value:"海淀大街"}]}]})}}}),System.register("demo/ttable.js",["lib.js"],function(a){"use strict";function b(a,b){return'<button class="kf-btn kf-xs" @click="TABLE.'+a+'(ROW)">'+b+"</button>"}var c;return{setters:[function(a){c=a.kfTable}],execute:function(){a("default",{onReady:function(){c.setHead(this,this.thead),c.setBody(this,this.tbody)},sampleRow:function(){return{name:"blah",email:"shimoo@gmail.com",phone:"17012345678",address:"北京市海淀区海淀大街",action:b("add","添加"),subrows:[{name:"blahson",email:"jquery@lagou.com",phone:"15312234566",address:"北京市朝阳区团结湖",action:b("remove","删除")}]}},appendRow:function(){c.appendRow(this,this.sampleRow())},prependRow:function(){c.prependRow(this,this.sampleRow())},iterateRows:function(){c.iterate(this,function(a){console.log(a.name)})},add:function(a){c.appendRow(a,this.sampleRow())},remove:function(a){c.deleteRow(a,!0)},thead:["姓名","邮箱","电话","地址","操作"],tbody:[{name:"Shimoo",email:"shimoo@gmail.com",phone:"17012345678",address:"北京市海淀区海淀大街",action:b("add","添加"),subrows:[{name:"jQuery",email:"jquery@lagou.com",phone:"15312234566",address:"北京市朝阳区团结湖",action:b("remove","删除")}]}],colKeys:["name","email","phone","address","action"]})}}}),System.register("demo/form.js",[],function(a){"use strict";var b;return{setters:[],execute:function(){b={currentRow:{name:"",addr:"",email:"",address:"",date:"",start:"",end:"",department:"",skills:[],salary:"",agree:!1},departCN:["平台运营部","技术研发部","设计部"],departEN:["platform","tech","design"],options:[],setfield:function(a,c){console.log(a,c),"range"==a?(b.currentRow.start=c[0],b.currentRow.end=c[1]):b.currentRow[a]=c},setoptions:function(a){var b=this;setTimeout(function(a){b.options.push("张"+Math.round(100*Math.random()))},300)},validator:{name:{required:"请输入姓名字段!"},addr:{required:"请输入地址字段!"},email:{required:"请输入邮箱字段!",email:"邮箱格式不对!"},address:{required:"请输入地址字段!",pattern:"请输入5-10个字符!"},skills:{validation:function(a){return!a||a.length<2?"请至少选择两项技能!":void 0}}},confirm:function(a){a.valid&&console.log("post http")},upload:"",photoURL:"",preview:function(a){b.photoURL=a}},a("default",b)}}}),System.register("demo/tree.js",["lib.js"],function(a){"use strict";var b,c;return{setters:[function(a){b=a.kfTree}],execute:function(){c={onDrop:function(a,b){console.log("drag "+a.node+" to "+b.node)},onToggle:function(a,b){console.log((b?"show ":"hide ")+a.node)},subtree:[{node:"节点1",subtree:[{node:"节点11",subtree:[{node:"节点111"},{node:"节点112"}]},{node:"节点12"}]},{node:"节点2",subtree:[{node:"节点21"},{node:"节点22"}]}]},a("default",c)}}}),System.register("demo/index.js",["lib.js","demo/stable.js","demo/mtable.js","demo/ttable.js","demo/form.js","demo/tree.js"],function(a){"use strict";var b,c,d,e,f,g,h,i,j;return{setters:[function(a){b=a.vue,c=a.kfModal,d=a.kfToaster},function(a){e=a["default"]},function(a){f=a["default"]},function(a){g=a["default"]},function(a){h=a["default"]},function(a){i=a["default"]}],execute:function(){j={el:"body",ready:function(){e.onReady(),f.onReady(),g.onReady()},data:{stable:e,mtable:f,ttable:g,tree:i,form:h,modal:{open:function(){c.open(this)},close:function(){c.close(this)}},toaster:{showSuccess:function(){d.info(this,"成功了!")},showError:function(){d.warn(this,"出错啦!")}},onAutoChange:function(){},getAutoOptions:function(a){for(var b=[],c=0;c<Math.round(20*Math.random());c++)b.push(a+""+Math.round(10*Math.random()));return b}}},new b(j)}}});
//# sourceMappingURL=index.bundle.js.map