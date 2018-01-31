/*
	设计模式-策略模式
	- 消除程序大量分支if-else和switch
	- 策略是平级，使得它们易于切换，易于理解，易于扩展。
	- 策略模式会增多一个策略类，用户必须了解所有策略才能做更好的选择！
*/
//1-根据绩效评级计算奖金
function calculateBonus(salary,level){
	if(level==='A'){
		return salary*1.0;
	}else if(level==='B'){
		return salary*0.8;
	}else if(level==='C'){
		return salary*0.5;
	}else{
		return salary*0.25;
	}
}
//实例
console.log(calculateBonus(2000,'B'));

//2-能否不适用这么多if-else（或者switch）语句，如果增加更多的评定等价，将非常复杂！（开放封闭原则，代码可拓展不可修改！）
//策略-平级策略
function PerformA(){};
PerformA.prototype.calculate=function(salary){
	return salary*1.0;
};
function PerformB(){};
PerformB.prototype.calculate=function(salary){
	return salary*0.8;
};
function PerformC(){};
PerformC.prototype.calculate=function(salary){
	return salary*0.5;
};
function PerformD(){};
PerformD.prototype.calculate=function(salary){
	return salary*0.25;
};
//调用方法类
function Bonus(){
	this.salary=null;
	this.level=null;
}
Bonus.prototype={
	constructor:Bonus,
	setSalary:function(s){
		this.salary=s;
	},
	setPerform:function(p){
		this.level=p;
	},
	getBonus:function(){
		return this.level.calculate(this.salary);
	}
}
var pb=new PerformB();
var b1=new Bonus();
b1.setSalary(2000);
b1.setPerform(pb);
console.log(b1.getBonus());

//3-函数也是对象，奖金计算方法简化
var bonusMethod={
	'A':function(salary){
		return salary*1.0;
	},
	'B':function(salary){
		return salary*0.8;
	},
	'C':function(salary){
		return salary*0.5;
	},
	'D':function(salary){
		return salary*0.25;
	}
};
//调用策略的方法
//多态的体现
function calculateBonus2(salary,level){
	return bonusMethod[level](salary);
}
console.log(calculateBonus2(2000,'B'));

//动画time-function
//t为已耗时间、b为起始位置，c为目标位置，d为动画总时长
var tween = {
    linear: function( t, b, c, d ){
        return c*t/d + b;
    },
    easeIn: function( t, b, c, d ){
        return c * ( t /= d ) * t + b;
    },
    strongEaseIn: function(t, b, c, d){
        return c * ( t /= d ) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d){
        return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
    },
    sineaseIn: function( t, b, c, d ){
        return c * ( t /= d) * t * t + b;
    },
    sineaseOut: function(t,b,c,d){
        return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
    }
};

//表单验证
//策略中心
var ValidForm={
	//不能为空
	isNonEmpty:function(value,errorMsg){
		return (value.length!==0)?'':errorMsg;
	},
	//最小长度
	minLen:function(value,errorMsg,minLength){
		return (value.length>minLength)?'':errorMsg;
	},
	//手机号检测
	isTel:function(value,errorMsg){
		var pattern=/^1[3|5|8]\d{9}$/;
		return pattern.test(value)?'':errorMsg;
	},
	//只能为字母或数字
	isAbc:function(value,errorMsg){
		var pattern=/^\w*$/;
		return pattern.test(value)?'':errorMsg;
	}
};
//调用策略中心
function Validator(rules){
	this.cache=[];
	this.rules=rules;
}
Validator.prototype={
	constructor:Validator,
	add:function(dom,rule,errorMsg){
		var _self=this;
		function _inner(){
			var arg=rule.split(':');
			var value=dom.value;
			var validMehod=arg.shift();
			arg.unshift(errorMsg);
			arg.unshift(value);
			//this指向window？？？？？
			//var msg=this.rules[validMehod].apply(null,arg);
			var msg=_self.rules[validMehod].apply(null,arg);
			return {
				ele:dom,
				msg:msg
			};
			
		}
		this.cache.push(_inner);
	},
	start:function(){
		var ret=[];
		for(var i=0,validMehod;validMehod=this.cache[i++];){
			var info=validMehod();//执行cache中的函数，this指向window！！！
			ret.push(info);
		}
		return ret;
	}
}

var loginBox=document.querySelector('.m-login');
var formUser=loginBox.querySelector('.user');
var formPwd=loginBox.querySelector('.pwd');
var formTel=loginBox.querySelector('.tel');

var checked=(function(){
	var validator=new Validator(ValidForm);
	validator.add(formUser,'isNonEmpty','用户名不能为空！');
	validator.add(formPwd,'minLen:6','密码至少长6位！');
	validator.add(formPwd,'isAbc','密码只能为字母或数字！');
	validator.add(formTel,'isTel','手机号码格式不正确！');
	
	return function(){
		var m=validator.start();
		var flag={};
		m.forEach(function(t){
			//true为合规,false为不合格！
			flag[t.ele]=flag[t.ele] || true;
			flag[t.ele]=flag[t.ele] && (t.msg.length!==0);
			showMsg(t,flag);
		})
	}
})();

loginBox.addEventListener('change',function(){
	checked();
},false);
//验证规则后的返回信息展示！
function showMsg(info,flag){
	var ele=info.ele;
	var textBox=ele.nextElementSibling;
	var msg=info.msg || textBox.innerHTML;
	
	textBox.innerHTML=(msg.length===0 && flag[ele])?"√":msg;
}