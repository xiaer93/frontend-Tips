/* *
 * Created by winack on 2018/3/1 
 */

function Observer(data) {
    this.data=data;
    this.walk(data);
}
Observer.prototype={
    constructor:Observer,
    walk:function (data) {
        var self=this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data,key,data[key]);
        })
    },
    defineReactive:function (data,key,val) {
        var dep=new Dep();
        var childObj=observe(val);
        Object.defineProperty(data,key,{
            configurable:true,
            enumerable:true,
            //val和dep为闭包变量！
            get:function getter() {
                if(Dep.target){
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set:function setter(newVal) {
                if(newVal===val){
                    return;
                }
                val=newVal;
                dep.notify();

            }
        });
    }

};

//递归监视基本数据类型
function observe(value) {
    if(!value || typeof value !== 'object'){
        return;
    }
    return new Observer(value);
}

function Dep() {
    this.subs=[];
}
Dep.prototype={
    constructor:Dep,
    addSub:function (sub) {
        this.subs.push(sub);
    },
    notify:function () {
        this.subs.forEach(function (sub) { 
            sub.update();//触发回调，dep向watch！
        })
    }
};
Dep.target=null;