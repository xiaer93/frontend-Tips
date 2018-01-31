/*
	设计模式-状态模式????
	- 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换
	- 避免Context无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了Context中原本过多的条件分支
	- 
*/
var STATE_OFF=0;
var STATE_ON=1;
function Light(ele){
	this.ele=ele;
	this.state=STATE_OFF;
	this.init();
}
Light.prototype={
	constructor:Light,
	press:function(){
		if(this.state===STATE_OFF){
			console.log('开灯！');
			this.state=STATE_ON;
		}else if(this.state===STATE_ON){
			console.log('关灯');
			this.state=STATE_OFF;
		}
	},
	init:function(){
		var _self=this;
		this.ele.onclick=function(){
			_self.press();
		}
	}
}
var ele=document.querySelector('.m-light button');
var light=new Light(ele);

//2-现在新增一种柔光功能，上述代码必须修改press函数，不符合开放封闭原则！
//使用状态模式
// offLightState
var OffLightState = function( light ){
    this.light = light;
};
OffLightState.prototype.buttonWasPressed = function(){
    console.log( '弱光' ); // offLightState 对应的行为
    this.light.setState( this.light.weakLightState ); // 切换状态到weakLightState
};
// WeakLightState：
var WeakLightState = function( light ){
    this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function(){
        console.log( '强光' ); // weakLightState 对应的行为
        this.light.setState( this.light.strongLightState ); // 切换状态到strongLightState
    };
// StrongLightState：
var StrongLightState = function( light ){
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function(){
    console.log( '关灯' ); // strongLightState 对应的行为
    this.light.setState( this.light.offLightState ); // 切换状态到offLightState
};
var Light2 = function(ele){
	this.ele=ele;
    this.offLightState = new OffLightState( this );
    this.weakLightState = new WeakLightState( this );
    this.strongLightState = new StrongLightState( this );
    this.button = null;
};
Light2.prototype.init = function(){
    var self = this;
    this.currState = this.offLightState; // 设置当前状态
    this.ele.onclick = function(){
        self.currState.buttonWasPressed();
    }    
};
//切换状态对象！
Light2.prototype.setState = function( newState ){
    this.currState = newState;
};
//状态模式的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部，所以button被按下的的时候，只需要在上下文中，把这个请求委托给当前的状态对象即可，该状态对象会负责渲染它自身的行为。同时还可以把状态的切换规则事先分布在状态类中，这样就有效地消除了原本存在的大量条件分支语句

//状态模式的简化
var delegate = function( client, delegation ){
    return {
        buttonWasPressed: function(){ // 将客户的操作委托给delegation 对象
            return delegation.buttonWasPressed.apply( client, arguments );
        }
    }
};

var FSM = {
    off: {
        buttonWasPressed: function(){
            console.log( '关灯' );
            this.button.innerHTML = '下一次按我是开灯';
            this.currState = this.onState;
        }
    },
    on: {
        buttonWasPressed: function(){
            console.log( '开灯' );
            this.button.innerHTML = '下一次按我是关灯';
            this.currState = this.offState;
        }
    }
};

var Light3 = function(){
    this.offState = delegate( this, FSM.off );
    this.onState = delegate( this, FSM.on );
    this.currState = this.offState; // 设置初始状态为关闭状态
    this.button = null;
};

Light3.prototype.init = function(){
    var button = document.createElement( 'button' ),
    self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild( button );
    this.button.onclick = function(){
        self.currState.buttonWasPressed();
    }
};
var light = new Light3();
light3.init();

//接头霸王等游戏更适合状态模式。状态对应着哪些行为可以执行！