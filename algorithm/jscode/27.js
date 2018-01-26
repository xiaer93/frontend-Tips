/*
	设计模式-代理模式
	- 代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。
	- 应用：1、远程代理；2、虚拟代理；3、安全代理；4、智能指引
*/
//送花的代理
var Girl=function(name){
	this.name=name;
};
var Boy=function(girl){
	this.girl=girl;
	this.sendGift=function(gift){
		console.log(this.girl.name+':'+gift);
	}
};
var Proxy=function(g){
	this.sendGift=function(gift){
		console.log((new Boy(g)).sendGift(gift));
	}
}
var g=new Girl('yuan');
//var b=new Boy();
var p=new Proxy(g);
p.sendGift('happy Birthdat');

//中介买卖房
var Buy=function(name,money){
	//买家信息
	this.name=name;
	this.money=money;
};
var Intermediary=function(buyer){
	//中介交易
	var m=parseInt(buyer.money*0.9);
	var b=new Buy(buyer.name,m);
	this.trade=function(){
		(new Sell(b)).trade(m);
	}
};
var Sell=function(buyer){
	//卖家收款
	this.buyerName=buyer.name;
	this.trade=function(money){
		console.log(this.buyerName+':'+money);
	}
};
var buyer=new Buy('yuan',300000);
(new Intermediary(buyer)).trade();

//中介
var A=function(name,money){
	this.money=money;
	this.name=name;
	this.getHouse=function(houseName){
		console.log('买到房子：'+houseName);
	}
};
var Exc=function(){
	this.trade=function(a,b){
		var money=parseInt(a.money*0.9);
		var aCp=new A(a.name,money);
		var bCp=b;
		aCp.getHouse(bCp.house);
		bCp.getMoney(aCp.money);
		
	}
};
var B=function(name,house){
	this.name=name;
	this.house=house;
	this.getMoney=function(houseMoney){
		console.log('收到房款：'+houseMoney);
	}
};

var a=new A('a',300000);
var b=new B('b','30-02');
var e=new Exc();
e.trade(a,b);
//参考链接：http://www.cnblogs.com/TomXu