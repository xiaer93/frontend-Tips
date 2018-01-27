/*
	设计模式-中介者模式
	- 迪米特法则也叫最少知识原则，是指一个对象应该尽可能少地了解另外的对象。如果对象之间的耦合性太高，一个对象发生改变之后，难免会影响到其他的对象。
	- 多对多对象沟通，如果对象之间复杂耦合难以调试和维护，而且耦合度随着项目的变化指数性增加，可以改为中介模式，各个对象与中介进行沟通！
	- 中介模式的缺点是：系统需要新增中介对象，而对象间的交互会令中介对象变得十分复杂！！
*/
//泡泡糖
//2人对战
function Player1(name){
	this.name=name;
	this.enemy=null;
	this.setEnemy=function(player){
		this.enemy=player;
	}
	this.win=function(){
		console.log(this.name+': win');
	};
	this.lose=function(){
		console.log(this.name+': lose');
	};
	this.die=function(){
		this.lose();
		this.enemy.win();
	}
}

var a=new Player1('a');
var b=new Player1('b');
a.setEnemy(b);
b.setEnemy(a);
a.die();

//2队对战，每队多人
var STATE_ACTIVE=0;
var STATE_LOSE=1;
var STATE_WIN=2;
function Player2(color,name){
	this.name=name;
	this.color=color;
	this.state=STATE_ACTIVE;
	this.enemy={
		length:0
	};
	this.partner=[];
	this.setEnemy=function(player){
		var color=player.color;
		if(!this.enemy[color]){
			this.enemy[color]=[];
			this.enemy.length+=1;
		}
		this.enemy[color].push(player);
	};
	this.setPartner=function(player){
		if(this.color!==player.color){
			return false;
		}
		this.partner.push(player);
		return true;
	};
	this.delEnemy=function(color){
		if(this.enemy[color]){
			delete this.enemy[color];
			this.enemy.length-=1;
		}
	};
	this.win=function(){
		this.state=STATE_WIN;
		console.log(name+': win');
	};
	this.lose=function(){
		this.state=STATE_LOSE;
		console.log(name+': lose');
	};
	this.die=function(){
		if(this.state===STATE_LOSE){
			return;
		}
		//阵亡
		this.lose();
		
		var flag=true;//全部阵亡？
		this.partner.forEach(function(t){
			flag=flag && (t.state!==STATE_LOSE)?false:true;
		});
		//全部阵亡
		if(flag){
			if(this.enemy.length===1){
				for(var key in this.enemy){
					if(key!=='length'){
						console.log('\n');
						console.log(key+': win');
						this.enemy[key].forEach(function(t){
							t.win();
						})
					}
				}
			}else{
				for(var key in this.enemy){
					if(key!=='length'){
						console.log('\n',key+': lose');
						this.enemy[key].forEach(function(t){
							t.delEnemy(this.color);
						})
					}
				}
			}
		}else{
			console.log(this.color+': 加油');
		}
	}
}

//存储所有的玩家
var players=[];
//通过工厂创建玩家，生产产品
var playerFactory=function(color,name){
	var newPlayer=new Player2(color,name);
	for(var i=0,len=players.length;i<len;++i){
		if(newPlayer.color===players[i].color){
			players[i].setPartner(newPlayer);
			newPlayer.setPartner(players[i]);
		}else{
			players[i].setEnemy(newPlayer);
			newPlayer.setEnemy(players[i]);
		}
	}
	players.push(newPlayer);
	return newPlayer;
};
//4位选手！
var pRed1=playerFactory('red','red1');
var pRed2=playerFactory('red','red2');
var pBlue1=playerFactory('blue','blue1');
var pBlue2=playerFactory('blue','blue2');



//如果pRed1掉线，即pRed1的属性和方法失效！(队友和敌人无法读取他的状态和方法！？？)
//则游戏无法继续进行！
//队友之前耦合十分密切，通过partner和enemy储存者每一个玩家！
for(var key in pRed1){
	pRed1[key]=null;
}

//报错！
//pBlue1.die();
//pBlue2.die();


//通过中介模式实现泡泡糖游戏！
//提供接口
function Player3(color,name){
	this.name=name;
	this.color=color;
	this.state=STATE_ACTIVE;
}
Player3.prototype={
	constructor:Player3,
	win:function(){
		console.log(this.name+': win');
		this.state=STATE_WIN;
	},
	lose:function(){
		console.log(this.name+': lose');
		this.state=STATE_LOSE;
	},
	die:function(){
		mediator.sendMessage('diePlayer',this);
	},
	remove:function(){
		mediator.sendMessage('removePlayer',this);
	},
	changTeam:function(color){
		mediator.sendMessage('changTeam',this,color);
	}
}
var playerFactory2=function(color,name){
	var newPlayer=new Player3(color,name);
	mediator.sendMessage('addPlayer',newPlayer);
	return newPlayer;
}
//实现中介的2种方案！
//1、、player为发布者，mediator为订阅者。玩家触发事件，中介响应事件
//2、、mediator开放一些接收消息的接口，各个玩家调用接口向中介发布消息！
var mediator=(function(){
	var players={};
	var length=0;//队伍支数
	var operations={};
	//添加人口
	operations.addPlayer=function(player){
		var color=player.color;
		var team=players[color];
		if(!team){
			players[color]=team=[];
			length+=1;
		}
		team.push(player);
	};
	//移除人口
	operations.removePlayer=function(player){
		var color=player.color;
		var team=players[color];
		//如果该成员队伍不存在，退出
		if(!team){
			return;
		}
		
		for(var i=0,len=team.length;i<len;++i){
			if(player===team[i]){
				team.splice(i,1);
			}
		}
		
		//如果该成员队伍没有人了，删除队伍
		if(team.length===0){
			delete players[color];
			length-=1;
		}
	};
	//玩家换队
	operations.changTeam=function(player,newColor){
		operations.removePlayer(player);
		player.color=newColor;
		operations.addPlayer(player);
	};
	//玩家死亡
	operations.diePlayer=function(player){
		var dieColor=player.color;
		//如果队伍被团灭，退出
		if(!players[dieColor]){
			return ;
		}
		//如果当前玩家死亡，退出
		if(player.state===STATE_LOSE){
			return;
		}
		//阵亡阵亡！
		player.lose();
		
		var flag=true;//全部阵亡？
		var partner=players[dieColor];
		
		partner.forEach(function(t){
			flag=flag && (t.state!==STATE_LOSE)?false:true;
		});
		//全部阵亡
		if(flag){
			//删除团灭的队伍
			console.log('\n');
			console.log(dieColor+': 团灭');
			console.log('\n');
			delete players[dieColor];
			length-=1;
			
			//如果仅剩1支队伍，则获胜
			if(length===1){
				for(var key in players){
					if(key!==dieColor){
						console.log('\n');
						console.log(key+': 获胜');
						console.log('\n');
						players[key].forEach(function(t){
							t.win();
						})
					}
				}
			}
		}else{
			console.log(dieColor+': 加油');
		}
	};
	operations.sendMessage=function(){
		var arg=Array.prototype.slice.call(arguments);
		var order=arg[0];
		if(operations[order]){
			operations[order].apply(null,arg.slice(1));
		}else{
			return new Error('指令错误！')
		}
	};
	//返回接口
	return {
		sendMessage:operations.sendMessage
	}
})();
//
var p1=playerFactory2('red','p1');
var p2=playerFactory2('red','p2');

var b1=playerFactory2('blue','b1');
var b2=playerFactory2('blue','b2');

var q1=playerFactory2('dark','q1');
var q2=playerFactory2('dark','q2');

p1.die();
p2.die();

q1.die();

b1.die();
b2.die();

//中介者模式在网购上的应用
//产品库存
var goods={
	red:5,
	green:4
}
var buyer={};

var sellBox=document.querySelector('.m-sell');
var sellColor=sellBox.querySelector('select');
var sellNumber=sellBox.querySelector('input');
var sellBtn=sellBox.querySelector('button');

//初始化获取信息
buyer.color=sellColor.value;
buyer.number=sellNumber.value;

sellColor.addEventListener('change',function(){
	buyer.color=this.value;
	checkValid(buyer.color,buyer.number);
});
sellNumber.addEventListener('change',function(){
	buyer.number=this.value;
	checkValid(buyer.color,buyer.number);
});
sellBtn.addEventListener('click',function(){
	alert('购买'+buyer.color+'-'+buyer.number+'部');
})
function checkValid(color,number){
	if(!(color && number)){
		return;
	}
	
	if(0<number && goods[color]>number){
		sellBtn.disabled=false;
	}else{
		sellBtn.disabled=true;
	}
}


//改为中介模式
//电脑型号管理
function Good(number,types){
	this.number=number;
	this.types=types;//数组
	
	this.getNumber=function(type){
		var flag=true;//true表示匹配上
		
		type.forEach(function(t){
			flag=flag && (this.types.indexOf(t)>-1)
		});
		
		return flag?this.number:undefined;
	}
}

var goods2=(function(){
	var goods={};
	//检查2个数组的数据项目是否相等
	var equal=function(lf,rg){
		var flag=true;
		lf.forEach(function(t){
			flag=flag && (rg.indexOf(t)>-1);
		});
		rg.forEach(function(t){
			flag=flag && (lf.indexOf(t)>-1);
		})
		return flag;
	};
	//p包含s中的所有元素！
	var contains=function(p,s){
		var flag=true;
		s.forEach(function(t){
			flag=flag && (p.indexOf(t)>-1);
		});
		return flag;
	};
	//获取key
	var getKey=function(array){
		return array.join('-');
	};
	var getAry=function(str){
		return str.split('-');
	};
	
	return {
		add:function(number,types){
			//将同类型的产品进行合并
			for(var key in goods){
				if(equal(getAry(key),types)){
					goods[key].number+=number;
					return ;
				}
			}
			var newGood=new Good(number,types);
			goods[getKey(types)]=newGood;
		},
		getNumber:function(types){
			var total=0;
			for(var key in goods){
				if(contains(key,types)){
					total+=goods[key].number;
					
				}
			}
			return total;
		}
	}
})();
//产品库存，新增内存分类
goods2.add(5,['red','16g']);
goods2.add(10,['red','32g']);
goods2.add(10,['green','16g']);
goods2.add(15,['green','32g']);

var sellBox2=document.querySelector('.m-sell-2');
var sellColor2=sellBox2.querySelector('#pc-color');
var sellNumber2=sellBox2.querySelector('input');
var sellBtn2=sellBox2.querySelector('button');
var sellMemory2=sellBox2.querySelector('#pc-memory');

//当各个选择框被改变时，通知中介者。而在每个元素的事件响应函数中进行判定是否允许购买！
var mediator2=(function(){
	var buyer={};
	buyer.color=sellColor2.value;
	buyer.number=sellNumber2.value;
	//添加内存型号
	buyer.memory=sellMemory2.value;
	
	var checkValid=function(){
		var color=buyer.color,
			number=buyer.number,
			memory=buyer.memory;
		if(!(color && number && memory)){
			return ;
		}
		var types=[color,memory];
		if(0<number && goods2.getNumber(types)>=number){
			sellBtn2.disabled=false;
		}else{
			sellBtn2.disabled=true;
		}
	}
	
	return function(obj){
		
		if(obj===sellColor2){
			buyer.color=obj.value;
			checkValid();
		}else if(obj===sellNumber2){
			buyer.number=obj.value;
			checkValid();
		}else if(obj===sellBtn2){
			alert('购买'+buyer.color+'-'+buyer.number+'部');
		}
	}
})();
sellColor2.addEventListener('change',function(){
	mediator2(this);
});
sellNumber2.addEventListener('change',function(){
	mediator2(this);
});
sellMemory2.addEventListener('input',function(){
	mediator2(this);
});
sellBtn2.addEventListener('click',function(){
	mediator2(this);
});

//参考文章：http://www.cnblogs.com/xiaohuochai/p/8042198.html
//书籍：设计模式与实际案例