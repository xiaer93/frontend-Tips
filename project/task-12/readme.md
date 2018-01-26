##笔记
1. 对象拷贝：
```
/*b、c、d均为浅复制。*/
var a=[1,2];
var b=new Array(a);
var c=new Object(a);
var d=a;

/*递归深度复制*/
function deepClone(initalObj,finalObj) {
    var ret=null;
    (function (initalObj,finalObj) {
        var obj=finalObj || {};
        for(var i in initalObj){
            if(typeof initalObj[i] === "object"){
                obj[i]=(initalObj[i].constructor===Array)?[]:{};
                arguments.callee(initalObj[i],obj[i]);
            }else{
                obj[i]=initalObj[i];
            }
        }
        ret=obj;
    })(initalObj,finalObj);
    return ret;
}

/*Object.create 函数
* 继承某个对象原型，等价于javascript高级程序设计中的原型拷贝函数
* function(obj){
*   function F(){}
*   F.prototype=obj;
*   return new F();
* }
* */

/*jQuery的深度复制函数，合并多个对象，并深度拷贝
* extend(dest,src1,src2,src3...);将src合并至dest中，如果有重复键值，则进行覆盖。
* var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})---》result={name:"Jerry",age:21,sex:"Boy"}
*
* 如果省略dest，则只能有一个参数，将参数深度拷贝至调用extend方法的对象！
*
* extend(boolean,dest,src1,src2,src3...)，Boolean指示是否将src1和src2合并！
*
**/

结果为：a===b[0]===c===d，无法通过这种形式拷贝对象
```
2. 色彩动画并不包含在核心 jQuery 库中。jQuery只支持驼峰式属性名！
3. javascript中为引用计数，当引用计数为0时，对象将被清除。所以可以通过设置null清除对象空间！在二叉树中，通过a.left=null删除左子树，而不能通过node=null删除自身（调用函数时，引用计数加1，所以此方法只是另引用计数减1！）
4. 单位百分比的参照：
    * 参照父元素的宽度：padding、margin、width、text-align
    * 参照父元素的高度：height
    * 参照父元素字体：font-size、line-height（line-height不带单位时，参照当前字体尺寸！）
5. 父元素参照选取：
    * 普通元素为相对父元素
    * position：absolute参照于定位父元素
    * position：fixed参照于可视窗口尺寸
    * 子元素为absolute，则以父元素paddingbox为计算基准；子元素为relative，则以父元素contentbox为计算基准！(如widht：100%)
6. 父元素如果没有定义宽高(百分比外)，则其普通子元素将不知道参照是谁？可以通过position：absolute设置参照父元素！
7. 定位用的：left和right是参照包含块的宽度，bottom和top是参照包含块的高度
8. transform: translate参照于自身border-box


/*搜索二叉树和多叉树*/
##二叉树的概念
1. 所有分支结点都存在左子树和右子树，并且所有叶子都在同一层上，这样的二叉树称为满二叉树。深度为k，含有2^k-1个节点。
2. 完全二叉树是指最后一层左边是满的，右边可能满也可能不满，然后其余层都是满的。（同样结点树的二叉树，完全二叉树的深度最小。）
3. 性质：在二叉树的第i层上至多有2^(i-1)个结点(i>=1)、深度为k的二叉树至多有2^k-1个结点(k>=1)
4. 二叉搜索树的元素不能重复，左值小于右值
1. 非递归的遍历
```
/*
//非递归前序遍历，优先访问根结点，然后再分别访问左孩子和右孩子
void preOrder2(BinTree *root) {
    stack<BinTree*> s;
    BinTree *p=root;
    while(p!=NULL||!s.empty())
    {
        while(p!=NULL)
        {
            cout<<p->data<<" ";
            s.push(p);
            p=p->lchild;
        }
        if(!s.empty())
        {
            p=s.top();
            s.pop();
            p=p->rchild;
        }
    }
}
//非递归中序遍历，中序遍历按照“左孩子-根结点-右孩子”的顺序进行访问。
void inOrder2(BinTree *root)
{
    stack<BinTree*> s;
    BinTree *p=root;
    while(p!=NULL||!s.empty())
    {
        while(p!=NULL)
        {
            s.push(p);
            p=p->lchild;
        }
        if(!s.empty())
        {
            p=s.top();
            cout<<p->data<<" ";
            s.pop();
            p=p->rchild;
        }
    }
}
//非递归后序遍历， 后序遍历按照“左孩子-右孩子-根结点”的顺序进行访问。
void postOrder2(BinTree *root)
{
    stack<BinTree*> s;
    BinTree *p=root;
    BinTree *pre=NULL;
    BinTree *top=NULL;
    while(p!=NULL||!s.empty())
    {
        while(p!=NULL)
        {
            s.push(p);
            p=p->lchild;
        }
        if(!s.empty())
        {
            top=s.top();
            if(top->right!=NULL&&top->right!=pre)
            {
                p=p->right;
            }
            else
            {
                cout<<top->data<<" "
                pre=top;
                s.pop()
            }
        }
    }
}
 * */
```
2. 递归遍历
```
//递归前序遍历
void preOrder1(BinTree *root)     
{
    if(root!=NULL)
    {
        cout<<root->data<<" ";
        preOrder1(root->lchild);
        preOrder1(root->rchild);
    }
}
//递归中序遍历
void inOrder1(BinTree *root)      
{
    if(root!=NULL)
    {
        inOrder1(root->lchild);
        cout<<root->data<<" ";
        inOrder1(root->rchild);
    }
}
//递归后序遍历
void postOrder1(BinTree *root)    
{
    if(root!=NULL)
    {
        postOrder1(root->lchild);
        postOrder1(root->rchild);
        cout<<root->data<<" ";
    }   
}
```
3. 广度优先遍历
```
this.breadfirst=function () {
    var queue=[];
    var tmp=null;
    if(root!==null){
        queue.push(root);
        while (stack.length>0){
            tmp=queue.shift();/*队列*/
            console.log(visit(tmp));
            if(tmp.left!==null){
                queue.push(tmp.left);
            }
            if(tmp.right!==null){
                queue.push(tmp.right);
            }
        }
    }
};
```


## 多叉树
 ```
  MulitTree.prototype.traverseDF=function (callback) {
      (function recurse(node) {
          if(node!==null){
              callback(node);
              for(var i=0;i<node.childTree.length;++i){
                  recurse(node.childTree[i]);
              }
          }
      })(this._root);
  };
  /*深度遍历非递归版本*/
  MulitTree.prototype.traverseDFStack=function (callback) {
      var stack=[];
      (function (node) {
        stack.push(node);
        while (stack.length>0){
            var tmp=stack.pop();
            callback(tmp);
            for(var i=0;i<tmp.childTree.length;++i){
                stack.push(tmp.childTree[i]);
            }
        }
    })(this._root);
  };
  /*广度遍历*/
  MulitTree.prototype.traverseBF=function (callback) {
      var queue=[];
      (function (node) {
          queue.push(node);
          while (queue.length>0){
              var tmp=queue.shift();
              for(var i=0;i<tmp.childTree.length;++i){
                  queue.push(tmp.childTree[i]);
              }
              callback(tmp);
          }
      })(this._root);
  };
  ```