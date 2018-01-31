/*
	设计模式-模版模式
	- 基于继承的设计模式——模板方法（TemplateMethod）模式
	- 在javascript开发中用到继承的场景其实并不是很多，很多时候喜欢用mix-in的方式给对象扩展属性。（混入mix-in，即通过Person[key]=obj[key]形式复制方法！）
*/
//泡茶、泡咖啡
function Coffee(){}
Coffee.prototype={
	constructor:Coffee,
	boilWater:function(){
		conssole.log('烧水')
	},
	brewCoffee:function(){
		console.log('沸水煮咖啡')
	},
	pourInCup:function(){
		console.log('倒入杯中')
	},
	addSugar:function(){
		console.log('加糖')
	},
	init:function(){
		this.boilWater();
		this.brewCoffee();
		this.pourInCup();
		this.addSugar();
	}
}
//泡茶的步骤类似：1、烧水；2、沸水煮；3、倒入杯中；4、加糖！

//定义父类，抽象类
//定义钩子函数
function Drink(){
	
}
Drink.prototype={
	constructor:Drink,
	boilWater:function(){},
	brewCoffee:function(){},
	pourInCup:function(){},
	addSugar:function(){},
	hook:function(){
		return true;
	},
	//在父类中封装了子类的算法框架！
	init:function(){
		this.boilWater();
		this.brew();
		this.pourInCup();
		this.addSugar();
		
		if(this.hook()){
			console.log('子类通过修改hook，来决定是否执行这。。。')
		}
	}
}
//继承函数
function inherit(sub,sup){
	var p=Object.create(sup.prototype);
	p.constructor=sub;
	sub.prototype=p;
}
function Tea(){
	Drink.call(this);
}
inherit(Tea,Drink);
Tea.prototype.boilWater=function(){
	conssole.log('烧水')
};
Tea.prototype.brew=function(){
	console.log('沸水煮茶')
};
Tea.prototype.pourInCup=function(){
	console.log('倒入杯中')
};
Tea.prototype.addSugar=function(){
	console.log('加糖')
};



//好莱坞原则
//允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候、以何种方式去使用这些底层组件!!!
var Beverage = function( param ){
    var boilWater = function(){
        console.log( '把水煮沸' );
    };
    var brew = param.brew || function(){
        throw new Error( '必须传递brew 方法' );
    };
    var pourInCup = param.pourInCup || function(){
        throw new Error( '必须传递pourInCup 方法' );
    };
    var addCondiments = param.addCondiments || function(){
        throw new Error( '必须传递addCondiments 方法' );
    };
    var F = function(){};
    F.prototype.init = function(){
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };
    return F;
};
var Coffee2 = Beverage({
    brew: function(){
        console.log( '用沸水冲泡咖啡' );
    },
    pourInCup: function(){
        console.log( '把咖啡倒进杯子' );
    },
    addCondiments: function(){
        console.log( '加糖和牛奶' );
    }
});

var Tea2 = Beverage({
    brew: function(){
        console.log( '用沸水浸泡茶叶' );
    },
    pourInCup: function(){
        console.log( '把茶倒进杯子' );
    },
    addCondiments: function(){
        console.log( '加柠檬' );
    }
});
var coffee = new Coffee2();
coffee2.init();
var tea = new Tea2();
tea2.init();