/* *
 * Created by winack on 2018/3/1 
 */
function Watcher(vm,exp,cb) {
    this.vm=vm;
    this.cb=cb;
    this.exp=exp;
    this.value=this.get();
}
Watcher.prototype={
    constructor:Watcher,
    update:function () {
        this.run();
    },
    run:function () {
        var value=this.vm.data[this.exp];
        var oldValue=this.value;
        if(value!==oldValue){
            this.value=value;
            this.cb.call(this.vm,value,oldValue);
        }
    },
    get:function () {
        Dep.target=this;
        var value=this.vm.data[this.exp];
        Dep.target=null;
        return value;
    }
};