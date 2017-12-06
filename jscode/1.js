/*
##二叉树的概念
1. 所有分支结点都存在左子树和右子树，并且所有叶子都在同一层上，这样的二叉树称为满二叉树。深度为k，含有2^k-1个节点。
2. 完全二叉树是指最后一层左边是满的，右边可能满也可能不满，然后其余层都是满的。（同样结点树的二叉树，完全二叉树的深度最小。）
3. 性质：在二叉树的第i层上至多有2^(i-1)个结点(i>=1)、深度为k的二叉树至多有2^k-1个结点(k>=1)
4. 二叉搜索树的元素不能重复，左值小于右值

*/


var Node=function(data){
	this.data=data;
	this.left=null;
	this.right=null;
}

var BST=function(){
	var root=null;
	
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
	* prama data
	* out	boolean
	*/
	this.delete=function(data){
		var tmp=root,
			prev=tmp,
			flag=false;
		while(tmp!==null){
			if(data<tmp.data){
				prev=tmp;			//设置父元素必须放在if中；可以考虑在node中加入parent变量！
				tmp=tmp.left;
			}else if(data>tmp.data){
				prev=tmp;
				tmp=tmp.right;
			}else{
				//根据被删除元素的子元素分类
				var name="";
				if(prev.left.data===data)
					name="left";
				else
					name="right";
				
				//没有子元素
				if(tmp.left===null && tmp.right===null){
					prev[name]=null;
				}
				//如果有2个孩子
				else if(tmp.left!==null && tmp.right!==null){
						
					var lfchild=tmp.left,
						maxchildP=lfchild;
						maxchild=lfchild.right;
					while(maxchild.right!==null){
						maxchildP=maxchild;
						maxchild=maxchild.right;
					}
					//如果左子树没有右子树
					if(maxchild===null){
						prev[name]=lfchild;
						lfchild.right=tmp.right;
					}else{
						prev[name]=maxchild;
						maxchild.right=tmp.right;
						maxchild.left=lfchild;
						maxchildP.right=null;/*直接交换值如何？*/
					}
				}
				//如果有1个孩子
				else{
					var child=tmp.left || tmp.right;
					prev[name]=child;
				}
				
				flag=true;
				break;
			}
		}
	}
	/*
	* prama 
	* data
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
	this.inorder=function(){
		(function _inorder(node){
			if(node!==null){
				_inorder(node.left);
				console.log(node.data);
				_inorder(node.right);
			}
		})(root);
	};
	this.Postorder=function(){
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