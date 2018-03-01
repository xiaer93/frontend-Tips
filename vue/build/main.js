/* *
 * Created by winack on 2018/3/1 
 */
function Vue(options) {
    var self=this;
    this.data=options.data;
    this.methods=options.methods;

    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);//将data中数据注册在vue对象上，方便使用！
    });

    observe(this.data);
    new Compile(options.el,this);
    options.mounted.call(this);//生命周期钩子mounted函数！
}
Vue.prototype={
    constructor:Vue,
    proxyKeys:function (key) {
        var self=this;
        Object.defineProperty(this,key,{
            configurable:true,
            enumerable:true,
            get:function () {
                return self.data[key];
            },
            set:function (newVal) {
                self.data[key]=newVal;
            }
        })
    }
};