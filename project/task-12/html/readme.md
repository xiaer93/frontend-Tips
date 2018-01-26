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
                p=top->right;
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
##二叉树的概念
1. 所有分支结点都存在左子树和右子树，并且所有叶子都在同一层上，这样的二叉树称为满二叉树。深度为k，含有2^k-1个节点。
2. 完全二叉树是指最后一层左边是满的，右边可能满也可能不满，然后其余层都是满的。（同样结点树的二叉树，完全二叉树的深度最小。）
3. 性质：在二叉树的第i层上至多有2^(i-1)个结点(i>=1)、深度为k的二叉树至多有2^k-1个结点(k>=1)
4. 二叉搜索树的元素不能重复，左值小于右值

>javascript中为引用计数，当引用计数为0时，对象将被清除。所以可以通过设置null清除对象空间！在二叉树中，通过a.left=null删除左子树，而不能通过node=null删除自身（调用函数时，引用计数加1，所以此方法只是另引用计数减1！）