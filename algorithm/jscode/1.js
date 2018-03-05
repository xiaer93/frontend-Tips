/*
##二叉树的概念
1. 所有分支结点都存在左子树和右子树，并且所有叶子都在同一层上，这样的二叉树称为满二叉树。深度为k，含有2^k-1个节点。
2. 完全二叉树是指最后一层左边是满的，右边可能满也可能不满，然后其余层都是满的。（同样结点树的二叉树，完全二叉树的深度最小。）
3. 性质：在二叉树的第i层上至多有2^(i-1)个结点(i>=1)、深度为k的二叉树至多有2^k-1个结点(k>=1)
4. 二叉搜索树的元素不能重复，左值小于右值

应用：链表和数组无法表示分层对象，而栈和队列是一维的层次，所以使用树反映层次结构（如大学-》大学A区》a系列+b系列）

*/

/*
	搜索二叉树，实现插入、删除、前中后序遍历！
*/
var Node=function(data){
	this.data=data;
	this.left=null;
	this.right=null;
};

var BST=function(){
	var root=null;
	
	/*
		[function 向搜索二叉树中插入数据]
		@param	{type}	data	需要存储在二叉树中的数据，必须具有<操作符！
		@return
	*/
	
	this.insert=function(data){
		if(root===null){
			root=new Node(data);
		}else{
			var tmp=root,
				prev=tmp;
			while(tmp!==null){
				prev=tmp;
				if(data<tmp.data){
					tmp=tmp.left;
				}else{
					tmp=tmp.right;
				}
			}
			if(data<prev.data){
				prev.left=new Node(data);
			}else{
				prev.right=new Node(data);
			}
		}
	};
	/*
		[function 删除节点，私有函数]
		@parma	{Node}		被删除节点的父节点引用
		@param	{string}	指示被删除节点为父节点左节点OR右节点，只能为left/right
		@return
	*/
	//合并删除,js删除的逻辑是解除引用！
	//例如：var a=[1];var b=a;令b=null,但是a依旧指向对象[1]！！！所以删除【1】的方式必须使其所有引用为零，接着继续令a=null！！！
	var _delete=function(prev,dir){
		//判断被删除节点是否为root节点
		if(prev===root){
			//还需要根据子节点情况分类考虑
			if(root.left===null && root.right===null){
				root=null;
			}else if(root.left!==null && root.right!==null){
				var tmp=root.left;
				while(tmp.right!==null){
					tmp=tmp.right;
				}
				tmp.right=root.right;
				root=tmp;//移动根节点指针
			}else{
				if(root.left!==null){
					root=root.left;
				}else{
					root=root.right;
				}
			}
		}else{
			var node=prev[dir];
			//被删除节点不是root节点，根据其子节点情况删除！
			if(node.left===null && node.right===null){
				prev[dir]=null;
			}else if(node.left!==null && node.right!==null){
				prev[dir]=node.left;
				//寻找左子树的最大右子树
				var tmp=node.left;
				while(tmp.right!==null){
					tmp=tmp.right;
				}
				tmp.right=node.right;
				
				//下述操作没必要？》
				node.right=null;
				node.left=null;
				
			}else{
				if(node.left!==null){
					prev[dir]=node.left;
				}else{
					prev[dir]=node.right;
				}
			}
		}
	};
	/*
		[function 删除节点函数]
		@param	{data}	从二叉树中将被删除的数据
		@return
		//需要考虑被删除的节点是否为root，如果为root，则需要修改root指向！
	*/
	this.delete=function(data){
		if(root!=null){
			var node=root;
			var prev=node;
			while(node!==null){
				if(node.data>data){
					prev=node;
					node=node.left;
				}else if(node.data<data){
					prev=node;
					node=node.right;
				}else{
					break;
				}
			}
			//如果node为null，则说明没找到节点
			if(node!==null){
				//如果为根节点
				if(prev===node){
					_delete(prev,"");
				}else if(prev.left===node){
					_delete(prev,"left");
				}else{
					_delete(prev,"right");
				}
			}
		}
	}
	/*
		[function 前序遍历]
		@param	{}
		@return
	*/
	this.prevorder=function(){
		(function _prevorder(node){
			if(node!==null){
				console.log(node.data);
				_prevorder(node.left);
				_prevorder(node.right);
			}
		})(root);
	};
	/*
		[function 中序遍历]
		@param
		@return
	*/
	this.inorder=function(){
		(function _inorder(node){
			if(node!==null){
				_inorder(node.left);
				console.log(node.data);
				_inorder(node.right);
			}
		})(root);
	};
	/*
		[function 后序遍历]
		@param
		@return
	*/
	this.postorder=function(){
		(function _postorder(node){
			if(node!==null){
				_postorder(node.left);
				_postorder(node.right);
				console.log(node.data);
			}
		})(root);
	};
	/*
	* stack栈版本的遍历，前序遍历
	* 前序：根左右
	* 中序：左根右
	* 后序：左右根
	*/
	this.iteratorPreorder=function(){
		var tmp=root,
			stack=[];
		while(tmp!==null || stack.length>0){
			while(tmp!==null){
				console.log(tmp.data);
				stack.push(tmp);
				tmp=tmp.left;
			}
			if(stack.length>0){
				tmp=stack.pop();
				tmp=tmp.right;
			}
		}
	};
	this.iteratorInorder=function(){
		var tmp=root;
			stack=[];
		while(tmp!==null || stack.length>0){
			while(tmp!==null){
				stack.push(tmp);
				tmp=tmp.left;
			}
			if(stack.length>0){
				tmp=stack.pop();
				console.log(tmp.data);
				tmp=tmp.right;
			}
		}
	};
	this.iteratorPostorder=function(){
		
		var tmp=root,
			top=null,
			prev=null,
			stack=[];
		while(tmp!==null || stack.length>0){
			while(tmp!==null){
				stack.push(tmp);
				tmp=tmp.left;
			}
			if(stack.length>0){
				top=stack[stack.length-1];
				if(top.right!==null && top.right!==prev){
					tmp=top.right;
				}else{
					console.log(top.data);
					prev=top;
					stack.pop();
				}
			}
		}
	};
	/*
		[function 检查二叉树是否为空]
		@param
		@return
	*/
	this.empty=function(){
		root=null;
	};
};

var a=new BST();
a.insert(5);
a.insert(7);
a.insert(6);
a.insert(3);
a.insert(4);
a.insert(2);
a.insert(2.5);


/*
	AVL树，自平衡树。对搜索二叉树进行优化
*/
function AVL(){
	var Node=function(data,right,left){
		this.data=data;
		this.right=right;
		this.left=left;
	};
	
	var root=null;
	
	//计算节点高度
	var heightNode=function(node){
		if(node===null){
			return -1;
		}else{
			return Math.max(heightNode(node.left),heightNode(node.right))+1;
		}
	};
	//RR旋转
	var rotationRR=function(node){
		var tmp=node.right;
		node.right=tmp.left;
		tmp.left=node;
		return tmp;
	};
	//LL旋转
	var rotationLL=function(node){
		var tmp=node.left;
		node.left=tmp.right;
		tmp.right=node;
		return tmp;
	};
	//LR旋转
	var rotationLR=function(node){
		node.left=rotationRR(node.left);
		return rotationLL(node);
	};
	//RL旋转
	var rotationRL=function(node){
		node.right=rotationLL(node.right);
		return rotationRR(node);
	};
	
	this.insert=function(data){
		root=insertNode(root,data);
	};
	var insertNode=function(node,element){
		if(node===null){
			node=new Node(element,null,null);
		}else if(element<node.data){
			node.left=insertNode(node.left,element);
			
			if(node.left!==null){
				if((heightNode(node.left)-heightNode(node.right))>1){
					if(element<node.left.data){
						node=rotationLL(node);
					}else{
						node=rotationLR(node);
					}
				}
			}
		}else if(element>node.data){
			node.right=insertNode(node.right,element);
			
			if(node.right!==null){
				if((heightNode(node.right)-heightNode(node.left))>1){
					if(element>node.right.data){
						node=rotationRR(node);
					}else{
						node=rotationRL(node);
					}
				}
			}
		}
		return node;
	};
	
	this.inorder=function(){
		_inorder(root);
	}
	var _inorder=function(node){
		if(node!==null){
			_inorder(node.left);
			console.log(node.data);
			_inorder(node.right);
		}
	}
	
}

/*
	红黑树
	堆积树？？？
*/