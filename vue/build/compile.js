/* *
 * Created by winack on 2018/3/1 
 */
function Compile(el,vm) {
    this.el=document.querySelector(el);
    this.vm=vm;
    this.fragment=null;
    this.init();
}
Compile.prototype={
    constructor:Compile,
    init:function () {
        if(this.el){
            this.fragment=this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        }else{
            console.log('元素不存在！')
        }
    },
    nodeToFragment:function (el) {
        var fragment=document.createDocumentFragment();
        var child=el.firstChild;
        while (child){
            fragment.appendChild(child);//appendChild将已有的节点移动至fragment！！！
            child=el.firstChild;//为什么还是el？？？不断获取第一个子节点！
        }
        return fragment;
    },
    compileElement:function (el) {
        var childNodes=el.childNodes;
        var self=this;
        [].slice.call(childNodes).forEach(function (node) {
            var reg=/\{\{(.*)\}\}/;
            var text=node.textContent;

            if(self.isElementNode(node)){
                self.compile(node);
            }else if(self.isTextNode(node) && reg.test(text)){
                self.compileText(node,reg.exec(text)[1]);
            }
            //递归解析节点
            if(node.childNodes && node.childNodes.length){
                self.compileElement(node);
            }
        })
    },
    compile:function (node) {
        var nodeAttrs=node.attributes;
        var self=this;
        Array.prototype.forEach.call(nodeAttrs,function (attr) {
            var attrName=attr.name;
            if(self.isDirective(attrName)){
                var exp=attr.value;
                var dir=attrName.substring(2);
                if(self.isEventDirective(dir)){
                    self.compileEvent(node,self.vm,exp,dir);
                }else{
                    self.compileModel(node,self.vm,exp,dir);
                }
                //为什么要删除标签属性啊？
                node.removeAttribute(attrName);
            }
        })
    },
    compileText:function (node,exp) {
        var self=this;
        var initText=this.vm[exp];
        this.updateText(node,initText);//给节点设置初始值（data中数据的初始值）
        new Watcher(this.vm,exp,function (value) {
            self.updateText(node,value);
        })
    },
    compileEvent:function (node,vm,exp,dir) {
        var eventType=dir.split(':')[1];
        var cb=vm.methods && vm.methods[exp];

        if(eventType && cb){
            node.addEventListener(eventType,cb.bind(vm),false);//回调函数为什么要绑定运行环境vm？？？在回调函数中，会使用到this.title，所以需要设定执行环境！
        }
    },
    compileModel:function (node,vm,exp,dir) {
        var self=this;
        var val=vm[exp];//没有使用传入的vm？可以使用传入的vm
        this.modelUpdater(node,val);

        //数据更新至view
        new Watcher(this.vm,exp,function (value) {
            self.modelUpdater(node,value);
        });

        //view修改后的数据保存至data
        node.addEventListener('input',function (e) {
            var newValue=e.target.value;
            if(val===newValue){
                return;
            }
            self.vm[exp]=newValue;//调用observer
            val=newValue;//当再次修改时，与新值进行比较？不用每次都获取一次vm[exp]!
        })
    },
    updateText:function (node,value) {
        node.textContent=typeof value === 'undefined'?'':value;
    },
    modelUpdater:function (node,value) {
        node.value=typeof value === 'undefined'?'':value;
    },
    isDirective:function (attr) {
        return attr.indexOf('v-')===0;
    },
    isEventDirective:function (dir) {
        return dir.indexOf('on:')===0;
    },
    isElementNode:function (node) {
        return node.nodeType===1;
    },
    isTextNode:function (node) {
        return node.nodeType===3;
    }
};