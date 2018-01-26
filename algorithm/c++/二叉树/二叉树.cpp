// 二叉树.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include<iostream>
#include<queue>
#include<stack>

using namespace std;

/*
二叉树与链表相比：
1、具有层次结构；
2、时间复杂度较小，为lgn；而链表为n；如果随机创建树，在大多数情况下，即使不是对称平衡，其查找效率也是十分高效的~
#二叉树默认为：左子树<根值<右子树；
#推荐实现方式：创建二叉树类Node;
#Morris遍历不需要额外空间，递归需要运行时栈，线索树会需要额外空间。如果树非常高，栈可能会溢出；在大多数情况下，递归实现比其他实现更好！
*/

template <typename T>
class Stack :public stack<T>
{
public:
	T pop()
	{
		auto ret = top();
		stack<T>::pop();
		return ret;
	}
};

template <typename T>
class Queue :public queue<T>
{
public:
	T dequeue()
	{
		T ret = front();
		queue<T>::pop();
		return ret;
	}
	void enqueue(const T &el)
	{
		push(el);
	}
};

template <typename T>
class BSTNode
{
public:
	BSTNode() :left(nullptr), right(nullptr) {}
	BSTNode(const T &e, BSTNode<T> *l = 0, BSTNode<T> *r = 0) :el(e), left(l), right(r) {}

	T el;
	BSTNode<T> *left, *right;
};

template <typename T>
class BST
{
public:
	BST() :root(nullptr) {}
	~BST() {clear(); }
	void clear() { clear(root); root = nullptr; numberOfTree = 0; levelOfTree = 0; }
	bool isEmpty() { return root == nullptr; }
	void perorder() { preorder(root); }
	void inorder() { inorder(root); }
	void postorder() { postorder(root); }
	T* search(const T& el)const { return search(root, el); }
	void breadthFirst();
	void iterativePreorder();
	void iterativeInorder();
	void iterativePostorder();
	void MorrisInorder();
	void insert(const T&);
	void deleteByMerging(BSTNode<T> *&);
	void findAndDeleteByMerging(const T &);
	void deleteByCopying(BSTNode<T> *&);
	void findAndDeleteByCopying(const T&);
	void balance(T data[], int, int);
	void dsw() { create_backbone(root); create_perfecttree(root); }
	unsigned getOfnumb()const { return numberOfTree; }
	unsigned getOflevel(){ getOflevel(root, 0); return levelOfTree; }
	
protected:
	BSTNode<T> *root;
	void clear(BSTNode<T> *);
	T* search(BSTNode<T>*, const T&) const;
	void preorder(BSTNode<T>*);
	void inorder(BSTNode<T>*);
	void postorder(BSTNode<T>*);
	void rotate_right(BSTNode<T>*, BSTNode<T>*, BSTNode<T>*);
	void rotate_left(BSTNode<T>*, BSTNode<T>*, BSTNode<T>*);
	void create_backbone(BSTNode<T>*);
	void create_perfecttree(BSTNode<T> *);
	void getOflevel(BSTNode<T> *, unsigned);
	virtual void visit(BSTNode<T> *p) { cout << p->el<<" "; }
private:
	unsigned numberOfTree = 0;
	unsigned levelOfTree = 0;
};

template <typename T>
void BST<T>::getOflevel(BSTNode<T> *p,unsigned level)
{
	if(p!=nullptr)
	{
		level = level + 1;
		getOflevel(p->left,level);
		getOflevel(p->right,level);
	}
	else
	{
		if (level > levelOfTree)			//find the max~
			levelOfTree = level;
	}
}

template <typename T>
void BST<T>::rotate_right(BSTNode<T>*gr, BSTNode<T>*par, BSTNode<T>*ch)
{
	if (gr != nullptr)
	{
		gr->right = ch;
	}
	if (root == par)
	{
		root = ch;					//如果父元素等于root，则更改root！
	}
	par->left = ch->right;
	ch->right = par;
}

template <typename T>
void BST<T>::rotate_left(BSTNode<T>*gr, BSTNode<T>*par, BSTNode<T>*ch)
{
	if (gr != nullptr)
	{
		gr->right = ch;
	}
	if(root==par)
	{
		root = ch;					//如果父元素等于root，则更改root！
	}
	par->right = ch->left;
	ch->left = par;
}

template <typename T>
void BST<T>::create_backbone(BSTNode<T>*tmp)
{
	BSTNode<T> *prev = nullptr;
	while (tmp!=nullptr)
	{
		if (tmp->left != nullptr)
		{
			auto tmp_tmp = tmp->left;
			rotate_right(prev, tmp, tmp->left);
			tmp = tmp_tmp;							//tmp指向被设为父节点的子节点！
		}
		else
		{
			prev = tmp;
			tmp = tmp->right;	
		}	
	}
}
template <typename T>
void BST<T>::create_perfecttree(BSTNode<T> *tmp)
{
	BSTNode<T> *prev = nullptr;
	auto n = getOfnumb();
	unsigned m =pow(2, ceil(log10(n + 1))) - 1;
	for (unsigned i = 0; i < (n - m); ++i)				//P202，旋转点tmp：5，15，23，28，40--10，25，40；
	{
		if (tmp!=nullptr && tmp->right != nullptr)
		{
			auto tmp_tmp1 = tmp->right->right;
			auto tmp_tmp2 = tmp->right;
			rotate_left(prev,tmp, tmp->right);
			tmp = tmp_tmp1;
			prev = tmp_tmp2;
		}
		else
		{
			tmp = root;
			prev = nullptr;
		}
	}
	while (m > 1)						//迷茫中~~~
	{
		m = m / 2;
		tmp = root;
		prev = nullptr;
		for (unsigned i = 0; i < m; ++i)
		{
			rotate_left(prev,tmp, tmp->right);
			tmp = root;
		}
	}
}

template <typename T>
void BST<T>::clear(BSTNode<T> *node)
{
	if (node != nullptr)
	{
		clear(node->left);
		clear(node->right);
		delete(node);
	}
}

template <typename T>
T* BST<T>::search(BSTNode<T> *p, const T& el)const		//根据二叉树结构特性，查找元素el！
{
	while (p!=nullptr)
	{
		if (el == p->el)
			return &p->el;
		else if (el < p->el)
			p = p->left;
		else
			p = p->right;
	}
	return nullptr;
}

template <typename T>
void BST<T>::breadthFirst()					//广度优先遍历！
{
	BSTNode<T> *p = root;
	Queue<BSTNode<T>*> queue;
	if (p != nullptr)
	{
		queue.enqueue(p);
		while (!queue.empty())
		{
			p = queue.dequeue();
			visit(p);
			if (p->left != nullptr)
				queue.enqueue(p->left);
			if (p->right != nullptr)
				queue.enqueue(p->right);
		}
	}
}

//深度优先遍历！
//VLR前序遍历
//LVR中序遍历
//LRV后序遍历

template <typename T>
void BST<T>::inorder(BSTNode<T>*p)		//LVR中序遍历，访问左子树
{
	if (p != nullptr)
	{
		inorder(p->left);		//如果p->left为空，则执行visit(p);
		visit(p);
		inorder(p->right);
	}
}
template <typename T>
void BST<T>::preorder(BSTNode<T>*p)		//VLR前序遍历,访问节点
{
	if (p != nullptr)
	{
		visit(p);				
		inorder(p->left);		//如果p->left为空，则执行visit(p);
		inorder(p->right);
	}
}
template <typename T>
void BST<T>::postorder(BSTNode<T>*p)		//LRV后序遍历，访问右子树
{
	if (p != nullptr)
	{
		inorder(p->left);		//如果p->left为空，则执行visit(p);
		inorder(p->right);
		visit(p);
	}
}

template <typename T>
void BST<T>::iterativePreorder()			//前序遍历、非递归实现！
{
	Stack<BSTNode<T>*> travStack;
	BSTNode<T> *p = root;
	if (p != nullptr)
	{
		travStack.push(p);
		while (!travStack.empty())
		{
			p = travStack.pop();
			visit(p);
			if (p->right != nullptr)
				travStack.push(p->right);
			if (p->left != nullptr)
				travStack.push(p->left);
		}
	}
}

template <typename T>
void BST<T>::iterativePostorder()		//后序遍历，非递归实现！
{
	Stack<BSTNode<T>*> travStack;
	BSTNode<T> *p = root ,*q=root;
	while (p!=nullptr)
	{
		for (; p->left != 0; p = p->left)
			travStack.push(p);
		while (p->right == nullptr || p->right == q)
		{
			visit(p);
			q = p;
			if (travStack.empty())
				return;
			p = travStack.pop();
		}
		travStack.push(p);
		p = p->right;
	}
}

template <typename T>
void BST<T>::iterativeInorder()						//中序遍历，非递归实现！
{
	Stack<BSTNode<T>*> travStack;
	BSTNode<T> *p = root;
	while (p != nullptr)
	{
		while (p!=nullptr)
		{
			if (p->right)
				travStack.push(p->right);
			travStack.push(p);
			p = p->left;
		}
		p = travStack.pop();
		while (!travStack.empty())
		{
			visit(p);
			p = travStack.pop();
		}
		visit(p);
		if (!travStack.empty())
			p = travStack.pop();
		else
			p = nullptr;
	}
}
//Morris算法，将树转为没有左子树的退化树！但是也对树进行了复原！
template <typename T>
void BST<T>::MorrisInorder()
{
	BSTNode<T> *p = root, *tmp;
	while (p!=nullptr)
	{
		if (p->left == nullptr)
		{
			visit(p);
			p = p->right;
		}
		else
		{
			tmp = p->left;
			while (tmp->right != 0 && tmp->right != p)
			{
				tmp = tmp->right;
			}
			if (tmp->right == nullptr)
			{
				tmp->right = p;
				p = p->left;
			}
			else
			{
				visit(p);
				tmp->right = 0;
				p = p->right;
			}
		}
	}
}

template <typename T>
void BST<T>::insert(const T& el)				//向二叉树中插入元素，插入尾部！
{
	BSTNode<T> *p = root, *prev = nullptr;
	while (p != nullptr)
	{
		prev = p;
		if (el < p->el)
		{
			p = p->left;
		}
		else
		{
			p = p->right;
		}
	}
	if (root == nullptr)
		root = new BSTNode<T>(el);
	else if (el < prev->el)
		prev->left = new BSTNode<T>(el);
	else
		prev->right = new BSTNode<T>(el);

	numberOfTree = numberOfTree + 1;
};

template <typename T>
void BST<T>::deleteByMerging(BSTNode<T> *&node)		//指针的引用？
{
	BSTNode<T> *tmp = node;
	if (node != nullptr)
	{
		if (node->right==0)
			node = node->left;
		else if (node->left == 0)
			node = node->right;
		else
		{
			tmp = node->left;
			while (tmp->right != nullptr)
				tmp = tmp->right;
			tmp->right = node->right;
			tmp = node;
			node = node->left;
		}
		delete tmp;
	}
}
template <typename T>
void BST<T>::findAndDeleteByMerging(const T &el)
{
	BSTNode<T> *node = root, *prev = nullptr;
	while (node != nullptr)
	{
		if (node->el == el)
			break;
		prev = node;
		if (node->el < el)
			node = node->right;
		else
			node = node->left;
	}
	if (node != nullptr && node->el == el)
	{
		if (node == root)
			deleteByMerging(root);
		else if (prev->left == node)
			deleteByMerging(prev->left);
		else
			deleteByMerging(prev->right);

		numberOfTree = numberOfTree - 1;
	}
	else if (root != nullptr)
		cout << "Key " << el << "is not in the tree!";
	else
		cout << "The tree is empty\n";
}

template <typename T>
void BST<T>::deleteByCopying(BSTNode<T> *&node)
{
	BSTNode<T>*previous, *tmp = node;
	if (node->right == nullptr)
	{
		node = node->left;
	}
	else if (node->left == nullptr)
	{
		node = node->right;
	}
	else
	{
		tmp = node->left;
		previous = node;
		while (tmp->right != nullptr)
		{
			previous = tmp;
			tmp = tmp->right;
		}
		node->el = tmp->el;
		if (previous == node)
			previous->left = tmp->left;
		else
			previous->right = tmp->left;
	}
	delete tmp;
}

template <typename T>
void BST<T>::findAndDeleteByCopying(const T &el)
{
	BSTNode<T> *node = root, *prev = nullptr;
	while (node != nullptr)
	{
		if (node->el == el)
			break;
		prev = node;
		if (node->el < el)
			node = node->right;
		else
			node = node->left;
	}
	if (node != nullptr && node->el == el)
	{
		if (node == root)
			deleteByCopying(root);
		else if (prev->left == node)
			deleteByCopying(prev->left);			//直接使用node不可以吗？为什么要如此？P195没看懂
		else
			deleteByCopying(prev->right);

		numberOfTree = numberOfTree - 1;			//成功删除后，节点数量减一；
	}
	else if (root != nullptr)
		cout << "Key " << el << "is not in the tree!";
	else
		cout << "The tree is empty\n";
}

/*
平衡树，是为了更快的查找。而通过DSW和AVL方法，可以创建或者修饰二叉树，是指平衡！
除了平衡树，提升查找和检索效率的方法还有自适应树、张开策略（将常用节点向上移动！）
自适应树，将查询的节点反复旋转至根部！
张开策略是对自适应树的改进！
根据实验结果，AVL树几乎总是比自适应树好！有时候普通二叉树都比自适应树好！
*/
template <typename T>
void BST<T>::balance(T data[],int first,int last)//传入的数组必须是排序了的！、创建平衡树！
{
	if (first < last)
	{
		int middle = (first + last) / 2;
		insert(data[middle]);
		balance(data, first, middle - 1);
		balance(data, middle + 1, last);
	}
}

template <typename T>
class ThreadNode					//线索树！只需要一条指向后继的信息即可！使用successor表明其右指针是线索还是指向右子树！
{
public:
	ThreadNode() :left(nullptr), right(nullptr) {}
	ThreadNode(const T &e, ThreadNode *l, ThreadNode *r) :el(e), left(l), right(r),successor(0) {}
private:
	T el;
	ThreadNode *left, *right;
	unsigned int successor : 1;
};
template <typename T>
class ThreadTree
{
public:
	ThreadTree() :root(nullptr) {}
	void insert(const T&);
	void inorder();
protected:
	ThreadNode<T> *root;
	virtual void visit(const ThreadNode<T> *p)const { cout << p->el << " "; }
};

template <typename T>
void ThreadTree<T>::inorder()
{
	ThreadNode<T> *prev, *p = root;
	if (p != nullptr)
	{
		while(p->left != nullptr)
		{
			p = p->left;
		}
		while (p!=nullptr)
		{
			visit(p);
			prev = p;
			p = p->right;
			if (p != 0 && prev->successor == 0)
			{
				while (p->left != nullptr)
					p = p->left;
			}
		}
	}
}

template <typename T>
void ThreadTree<T>::insert(const T& el)
{
	ThreadNode<T> *p, *prev = nullptr, *newNode;
	newNode = new ThreadNode(el);
	if (root == nullptr)
	{
		root = newNode;
		return;
	}
	p = root;
	while (p != nullptr)
	{
		prev = p;
		if (p->el > el)
		{
			p = p->left;
		}
		else if (p->successor == 0)
		{
			p = p->right;
		}
		else
			break;
	}
	if (prev->el > el)
	{
		prev->left == newNode;
		newNode->successor = 1;
		newNode->right = prev;
	}
	else if (prev->successor == 1)
	{
		newNode->successor = 1;
		prev->successor = 0;
		newNode->right = prev->right;
		prev->right = newNode;
	}
	else
		prev->right = newNode;
}

/*
堆是一种特殊类型的二叉树，1.每个节点的值大于等于其每个子节点的值；2.该树完全平衡，最后一层的叶子都处于最左侧的位置！（此为最大堆，最大值在根节点！）
堆的横向元素没有确切位置，只考虑竖直方向的大小关系！
堆的这种性质很适合实现优先队列~
*/
/*
treap树，笛卡尔树，x表示元素，y表示堆（优先级）
*/
/*
k-d树，
*/
/*
波兰表示法，表达式树
*/

int main()
{
	BST<int> intTree;

	for (int i = 0; i < 10; ++i)
	{
		intTree.insert(i);
	}
	
	intTree.breadthFirst();
	cout << endl;
	intTree.findAndDeleteByCopying(5);
	intTree.breadthFirst();
	cout << endl;
	intTree.MorrisInorder();
	cout << endl;
	auto tmp = intTree.search(5);
	if (tmp != nullptr)
	{
		cout << *tmp;
	}
	intTree.findAndDeleteByMerging(4);
	cout<<intTree.getOfnumb()<<" "<<intTree.getOflevel();

	intTree.dsw();
	intTree.inorder();

	intTree.clear();
	intTree.perorder();
	intTree.postorder();

	system("pause");
    return 0;
}

