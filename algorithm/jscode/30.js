/*
	设计模式-中介者模式
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
		console.log(name+': win');
	};
	this.lose=function(){
		console.log(name+': lose');
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

//多队对战，每队多人
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
	this.setEnemy=function(players){
		var color=players[0].color;
		if(!this.enemy[color]){
			this.enemy[color]=[];
			this.enemy.length+=1;
		}
		this.enemy[color]=players;

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
//4位选手！
var pRed1=new Player2('red','red1');
var pRed2=new Player2('red','red2');
var pBlue1=new Player2('blue','blue1');
var pBlue2=new Player2('blue','blue2');

//红队
pRed1.setPartner(pRed2);
pRed1.setEnemy([pBlue1,pBlue2]);

pRed2.setPartner(pRed1);
pRed2.setEnemy([pBlue1,pBlue2]);

//蓝队
pBlue1.setPartner(pBlue2);
pBlue1.setEnemy([pRed1,pRed2]);

pBlue2.setPartner(pBlue1);
pBlue2.setEnemy([pRed1,pRed2]);

//如果pRed1掉线，即pRed1的属性和方法失效！
//则游戏无法继续进行！
for(var key in pRed1){
	pRed1[key]=null;
}
//报错！
pBlue1.die();
pBlue2.die();

//通过中介模式实现泡泡糖游戏！
