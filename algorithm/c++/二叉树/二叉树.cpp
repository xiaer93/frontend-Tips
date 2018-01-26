// ������.cpp : �������̨Ӧ�ó������ڵ㡣
//

#include "stdafx.h"
#include<iostream>
#include<queue>
#include<stack>

using namespace std;

/*
��������������ȣ�
1�����в�νṹ��
2��ʱ�临�ӶȽ�С��Ϊlgn��������Ϊn�����������������ڴ��������£���ʹ���ǶԳ�ƽ�⣬�����Ч��Ҳ��ʮ�ָ�Ч��~
#������Ĭ��Ϊ��������<��ֵ<��������
#�Ƽ�ʵ�ַ�ʽ��������������Node;
#Morris��������Ҫ����ռ䣬�ݹ���Ҫ����ʱջ������������Ҫ����ռ䡣������ǳ��ߣ�ջ���ܻ�������ڴ��������£��ݹ�ʵ�ֱ�����ʵ�ָ��ã�
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
		root = ch;					//�����Ԫ�ص���root�������root��
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
		root = ch;					//�����Ԫ�ص���root�������root��
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
			tmp = tmp_tmp;							//tmpָ����Ϊ���ڵ���ӽڵ㣡
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
	for (unsigned i = 0; i < (n - m); ++i)				//P202����ת��tmp��5��15��23��28��40--10��25��40��
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
	while (m > 1)						//��ã��~~~
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
T* BST<T>::search(BSTNode<T> *p, const T& el)const		//���ݶ������ṹ���ԣ�����Ԫ��el��
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
void BST<T>::breadthFirst()					//������ȱ�����
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

//������ȱ�����
//VLRǰ�����
//LVR�������
//LRV�������

template <typename T>
void BST<T>::inorder(BSTNode<T>*p)		//LVR�������������������
{
	if (p != nullptr)
	{
		inorder(p->left);		//���p->leftΪ�գ���ִ��visit(p);
		visit(p);
		inorder(p->right);
	}
}
template <typename T>
void BST<T>::preorder(BSTNode<T>*p)		//VLRǰ�����,���ʽڵ�
{
	if (p != nullptr)
	{
		visit(p);				
		inorder(p->left);		//���p->leftΪ�գ���ִ��visit(p);
		inorder(p->right);
	}
}
template <typename T>
void BST<T>::postorder(BSTNode<T>*p)		//LRV�������������������
{
	if (p != nullptr)
	{
		inorder(p->left);		//���p->leftΪ�գ���ִ��visit(p);
		inorder(p->right);
		visit(p);
	}
}

template <typename T>
void BST<T>::iterativePreorder()			//ǰ��������ǵݹ�ʵ�֣�
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
void BST<T>::iterativePostorder()		//����������ǵݹ�ʵ�֣�
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
void BST<T>::iterativeInorder()						//����������ǵݹ�ʵ�֣�
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
//Morris�㷨������תΪû�����������˻���������Ҳ���������˸�ԭ��
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
void BST<T>::insert(const T& el)				//��������в���Ԫ�أ�����β����
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
void BST<T>::deleteByMerging(BSTNode<T> *&node)		//ָ������ã�
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
			deleteByCopying(prev->left);			//ֱ��ʹ��node��������ΪʲôҪ��ˣ�P195û����
		else
			deleteByCopying(prev->right);

		numberOfTree = numberOfTree - 1;			//�ɹ�ɾ���󣬽ڵ�������һ��
	}
	else if (root != nullptr)
		cout << "Key " << el << "is not in the tree!";
	else
		cout << "The tree is empty\n";
}

/*
ƽ��������Ϊ�˸���Ĳ��ҡ���ͨ��DSW��AVL���������Դ����������ζ���������ָƽ�⣡
����ƽ�������������Һͼ���Ч�ʵķ�����������Ӧ�����ſ����ԣ������ýڵ������ƶ�����
����Ӧ��������ѯ�Ľڵ㷴����ת��������
�ſ������Ƕ�����Ӧ���ĸĽ���
����ʵ������AVL���������Ǳ�����Ӧ���ã���ʱ����ͨ��������������Ӧ���ã�
*/
template <typename T>
void BST<T>::balance(T data[],int first,int last)//�������������������˵ģ�������ƽ������
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
class ThreadNode					//��������ֻ��Ҫһ��ָ���̵���Ϣ���ɣ�ʹ��successor��������ָ������������ָ����������
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
����һ���������͵Ķ�������1.ÿ���ڵ��ֵ���ڵ�����ÿ���ӽڵ��ֵ��2.������ȫƽ�⣬���һ���Ҷ�Ӷ�����������λ�ã�����Ϊ���ѣ����ֵ�ڸ��ڵ㣡��
�ѵĺ���Ԫ��û��ȷ��λ�ã�ֻ������ֱ����Ĵ�С��ϵ��
�ѵ��������ʺ��ʺ�ʵ�����ȶ���~
*/
/*
treap�����ѿ�������x��ʾԪ�أ�y��ʾ�ѣ����ȼ���
*/
/*
k-d����
*/
/*
������ʾ�������ʽ��
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

