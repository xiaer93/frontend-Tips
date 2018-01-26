#pragma once
#include<string>
#include<list>
#include<vector>
#include<string>
#include<map>
#include<set>
#include<queue>
#include<algorithm>
#include<tuple>
#include<stack>
#include<iostream>


using namespace std;

enum GraphKind { DG, WDG, UDG, WUDG };

//邻接表示法
class List_node;
class List_node_node
{
public:
	bool operator==(const List_node_node &r) { return nodename == r.nodename; }
private:
	friend class Graph;
	friend class GraphAlgorithm;
	List_node_node(const string &s, const int &w = 0) :nodename(s), weight(w) {}
	string nodename;							//边的第二个节点
	int weight = 0;								//边的权重
	//list<List_node>::iterator thenode;			//利用迭代器指向变化列表的元素是非常危险的！
};
class List_node
{
public:
	bool operator==(const List_node &rhl) { return nodename == rhl.nodename; }
private:
	friend class Graph;
	friend class GraphAlgorithm;
	List_node(const string &s) :nodename(s) {}
	string nodename;					//边的第一个节点
	list<List_node_node> nodelist;		//某边的相邻所有节点
	mutable int inum = 0;				//用于遍历等等算法/最短路径算法
	bool isdelete = false;				//dijkstra算法
	void insert(const List_node_node &rh)
	{
		if (find(nodelist.begin(), nodelist.end(), rh) == nodelist.end())
			nodelist.push_back(rh);
	}
};

class Matrix_node
{
	friend class Graph;
	friend class GraphAlgorithm;
	int weight = INT_MAX;				//默认权值为无穷大
	bool edge = false;					//默认边不存在
};

class Graph
{
public:
	friend class GraphAlgorithm;
private:
	Graph() = default;
	void create(GraphKind k);
	size_t nodenum = 0;
	size_t edgenum = 0;
	vector<tuple<string, string,int>> coord;	//所有的边,以及他的权值
	//邻接表法
	list<List_node> listnode;				//所有的节点
	//邻接矩阵法
	map<string, size_t> matrixnode;
	vector<vector<Matrix_node>> matrix;
	void to_matrix();

	void add_noweight(const string &f, const string &s);
	void add_weight(const string &f, const string &s,int w);
	void set(bool u, bool w);
	size_t getnodenumber()const { return listnode.size(); }
	size_t getedgenumber();											//获得边和边数
	list<List_node>::iterator getnode(const List_node_node &v);		//list_node_node找同名顶点！
	list<List_node>::iterator getnode(const string &s);		//list_node_node找同名顶点！
};
void Graph::to_matrix()
{
	matrix = vector<vector<Matrix_node>>(nodenum, vector<Matrix_node>(nodenum));
	size_t i = 0;
	size_t j = 0;
	for (auto &r : listnode)
	{
		matrixnode[r.nodename] = i++;
	}
	for (auto &r : listnode)
	{
		i = matrixnode[r.nodename];
		matrix[i][i].edge = true;
		matrix[i][i].weight = 0;
		for (auto &rr : r.nodelist)
		{
			j = matrixnode[rr.nodename];
			matrix[i][j].edge = true;
			matrix[i][j].weight = rr.weight;
		}
	}
}


list<List_node>::iterator Graph::getnode(const List_node_node &v)
{
	for (auto beg = listnode.begin(); beg != listnode.end(); ++beg)
	{
		if (beg->nodename == v.nodename)
			return beg;
	}
	return listnode.end();
}
list<List_node>::iterator Graph::getnode(const string &s)
{
	List_node_node tmp(s);
	return getnode(tmp);
}
size_t Graph::getedgenumber()
{
	size_t sum = 0;
	for (auto &r : listnode)
	{
		sum = sum + r.nodelist.size();
		for (auto &rr : r.nodelist)
		{
			coord.push_back(make_tuple(r.nodename,rr.nodename,rr.weight));
		}
	}
	return sum;
}

void Graph::create(GraphKind k)
{
	switch (k)
	{
	case DG:
		set(false, false);
		break;
	case WDG:
		set(true, false);
		break;
	case UDG:
		set(false, true);
		break;
	case WUDG:
		set(true, true);
		break;
	default:
		cerr << "Error of kind!";
		break;
	}
	nodenum = getnodenumber();
	edgenum = getedgenumber();
}

void Graph::add_noweight(const string &f, const string &s)
{
	List_node_node tmp1(s);
	List_node tmp2(f);
	auto reftmp2 = find(listnode.begin(), listnode.end(), tmp2);
	if ( reftmp2!= listnode.end())
	{
		if(s!="#")
			reftmp2->insert(tmp1);
	}
	else
	{
		if(s!="#")								//s不为#才有后继节点！
			tmp2.insert(tmp1);
		listnode.push_back(tmp2);
	}
}
void Graph::add_weight(const string &f,const string &s,int w)
{
	List_node_node tmp1(s,w);
	List_node tmp2(f);
	auto reftmp2 = find(listnode.begin(), listnode.end(), tmp2);
	if (reftmp2 != listnode.end())
	{
		if(s!="#")
			reftmp2->insert(tmp1);
	}
	else
	{
		if(s!="#")
			tmp2.insert(tmp1);
		listnode.push_back(tmp2);
	}
}

//U为有向图，W为权值图
//如果节点a为孤立，则输入形式：a 0 
void Graph::set(bool w, bool u)
{
	string firstnode = "";
	string secondnode = "";
	int weight=0;
	int count = 0;
	if (w)					//有权
	{
		if (u)				//有向
		{
			while (true)
			{
				cout << "Enter the node of edge, and weight(f s w): ";
				if (!(cin >> firstnode >> secondnode >> weight))
					break;
				//cin.ignore(INT_MAX, '\n');//清除多余字符

				add_weight(firstnode, secondnode, weight);
				if(secondnode!="#")
					add_weight(secondnode, "#", 0);
			}
		}
		else
		{
			while (true)
			{
				cout << "Enter the node of edge, and weight(f s w): ";
				if (!(cin >> firstnode >> secondnode >> weight))
					break;
				add_weight(firstnode, secondnode, weight);
				if(secondnode!="#")
					add_weight(secondnode, firstnode, weight);
			}
		}
	}
	else
	{
		if (u)
		{
			while (true)
			{
				cout << "Enter the node of edge, and weight(f s): ";
				if (!(cin >> firstnode >> secondnode))
					break;
				add_noweight(firstnode, secondnode);
				if(secondnode!="#")
					add_noweight(secondnode, "#");
			}
		}
		else
		{
			while (true)
			{
				cout << "Enter the node of edge(f s): ";
				if (!(cin >> firstnode >> secondnode))
					break;
				add_noweight(firstnode, secondnode);
				if(secondnode!="#")
					add_noweight(secondnode, firstnode);
			}
		}
	}
}
template <typename T>
class BSTNode;
template <typename T>
class BST;
class GraphAlgorithm
{
public:
	GraphAlgorithm(GraphKind k) :kind(k) { gp.create(kind); };
	~GraphAlgorithm()=default;
	void depthFirstSearch();
	void breadFirstSearch();
	void dijkstraAlgorithm(const string &s);
	//void labelCorrectingAlgorithm();
	void to_matrix() { gp.to_matrix(); }
	void WFIalgorithm();
	void cycleDetection();
	bool unionfind(const string &a, const string &b);
	//void unionfindbyparent(const string &a, const string &b);节点的父元素太多，不方便做相同判断！
	vector<tuple<string, string, int>> KruskalAlgorithm();
	void blockSearch();
	void stonglyConnectedCompontSearch();
	void topologicalsorting();
	void FordFulkersonAlgorithm(const string &s, const string &t);
private:
	Graph gp;
	GraphKind kind;
	vector<tuple<string, string>> coord;
	//map<List_node, int> num;
	int *getweight(const string &a, const string &b);
	void dfs(const List_node &v, int &i);
	void cycleDetectionDFS(list<List_node>::iterator v, int &i);
	void initialize(map<string, string> &root, map<string, string> &next, map<string, int> &length);
	void unionf(const string &a, const string &b, map<string, string> &root, map<string, string> &next, map<string, int> &length);
	void blockDFS(const string &v, int &i, map<string, set<string>> &parent, map<string, int> &pred, map<string, int> &num);
	void strongDFS(const string &v, int &i, map<string, int> &pred, map<string, int> &num, stack<string> &stk);
	bool strongDFSbool(const string &u, stack<string> stk);
	void ts(const string &v, int &i,int &j, map<string, int> &num, map<string, int>&tsnum);
	//void augmentPath(const string &s, const string &t, map<string, tuple<string, int>> &lable);p331,看不懂
	bool augmentPathBFS(const string &s, const string &t, vector<vector<Matrix_node>> &mat, map<string, string> &parent);
};

int *GraphAlgorithm::getweight(const string &a, const string &b)
{
	for (auto &r : gp.listnode)
	{
		if (a == r.nodename)
		{
			for (auto &rr : r.nodelist)
			{
				if (b == rr.nodename)
					return &rr.weight;
			}
		}
	}
	return nullptr;
}

void GraphAlgorithm::dfs(const List_node &v,int &i)
{
	v.inum = i++;
	auto tmp = v.nodelist;
	for (auto beg = tmp.begin(); beg != tmp.end(); ++beg)
	{
		auto u = gp.getnode(*beg);			//根据list_node_node名字找到同名顶点！
		if (u != gp.listnode.end() && u->inum == 0)
		{
			coord.push_back(make_tuple(v.nodename, u->nodename));
			dfs(*u, i);
		}
	}
}

void GraphAlgorithm::depthFirstSearch()			//生成树，包含原图的所有顶点！
{
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		beg->inum = 0;
	}
	coord.clear();
	int i = 1;
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		if (beg->inum == 0)
		{
			dfs(*beg,i);
		}
	}
}
void GraphAlgorithm::breadFirstSearch()				//广度优先算法效率更高，其实用队列结构；深度优先使用隐式栈结构，效率较低！
{
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		beg->inum = 0;
	}
	coord.clear();
	int i = 1;
	queue<list<List_node>::iterator> q;
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		if (beg->inum == 0)
		{
			beg->inum = i++;
			q.push(beg);
		}
		while (!q.empty())
		{
			auto v = q.front(); q.pop();
			for (auto beg = v->nodelist.begin(); beg != v->nodelist.end(); ++beg)
			{
				auto u = gp.getnode(*beg);
				if (u != gp.listnode.end() && u->inum == 0)
				{
					u->inum = i++;
					q.push(u);
					coord.push_back(make_tuple(v->nodename, u->nodename));
				}
			}
		}
	}
}

//只能对权值为正的进行计算！
void GraphAlgorithm::dijkstraAlgorithm(const string &s)
{
	list<List_node>::iterator first=gp.getnode(s);
	if (kind != WDG && kind != WUDG)
	{
		cerr << "The graph hasn't weight!";
		return;
	}
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		beg->inum = INT_MAX;
	}
	first->inum = 0;
	int tobechecked = 0;
	while (true)
	{
		if (tobechecked == gp.listnode.size())
			return;
		auto beg = gp.listnode.begin();
		auto v = beg;
		for (++beg; beg != gp.listnode.end(); ++beg)
		{
			if (v->isdelete == true)
			{
				if (beg->isdelete == false)
				{
					v = beg;
				}
			}
			else
			{
				if (beg->isdelete == false && v->inum > beg->inum)
				{
					v = beg;
				}
			}
		}
		v->isdelete = true;			//删除v点
		++tobechecked;
		for (auto beg = v->nodelist.begin(); beg != v->nodelist.end(); ++beg)
		{
			auto u = gp.getnode(*beg);
			if (u->isdelete == false)
			{
				if (u->inum > (v->inum + *getweight(v->nodename, u->nodename)))
				{
					u->inum = v->inum + *getweight(v->nodename, u->nodename);
				}
			}
		}
	}
}
//标记校正法，可以对权值为负的进行查找.有问题呀
/*
void GraphAlgorithm::labelCorrectingAlgorithm()
{
	stack<list<List_node>::iterator> parent;
	list<List_node>::iterator first = gp.listnode.begin();
	if (kind != WDG)
	{
		if (kind != WUDG)
		{
			cerr << "The graph hasn't weight!";
			return;
		}

	}
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		beg->inum = INT_MAX;
		beg->isdelete = true;
	}
	first->inum = 0;
	first->isdelete = false;
	int tobechecked = gp.listnode.size() - 1;
	while (true)
	{
		if (tobechecked == gp.listnode.size())
			return;

		list<List_node>::iterator v;
		for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
		{
			if (beg->isdelete == false)
			{
				v = beg;
				break;
			}
		}
		v->isdelete = true;			//删除v点
		++tobechecked;
		for (auto beg = v->nodelist.begin(); beg != v->nodelist.end(); ++beg)
		{
			auto u = gp.getnode(*beg);

			if (!parent.empty() && u==parent.top())
			{
				continue;
			}
			if (u->inum > (v->inum + *getweight(make_tuple(v->nodename, u->nodename))))
			{
				u->inum = v->inum + *getweight(make_tuple(v->nodename, u->nodename));
				if (u->isdelete == true)
				{
					u->isdelete = false;
					parent.push(v);
					--tobechecked;
				}
			}
		}
		if(v!=first)
			parent.pop();
	}
}
*/

void GraphAlgorithm::WFIalgorithm()
{
	size_t i, j, k;
	i = j = k = 0;
	for (i=0; i < gp.nodenum; ++i)
	{
		for (j=0; j < gp.nodenum; ++j)
		{
			for (k=0; k < gp.nodenum; ++k)
			{
				if(gp.matrix[j][k].edge && gp.matrix[j][i].edge && gp.matrix[i][k].edge)
					if (gp.matrix[j][k].weight > (gp.matrix[j][i].weight + gp.matrix[i][k].weight))
						gp.matrix[j][k].weight = gp.matrix[j][i].weight + gp.matrix[i][k].weight;
			}
		}
	}
}
void GraphAlgorithm::cycleDetection()
{
	depthFirstSearch();		//深度遍历生成的边不完全！无向环的检测根据DFS发展而来！
	int i = 1;
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		beg->inum = 0;
	}
	for (auto beg = gp.listnode.begin(); beg != gp.listnode.end(); ++beg)
	{
		if (beg->inum == 0)
		{
			cycleDetectionDFS(beg, i);
		}
	}
}
void GraphAlgorithm::cycleDetectionDFS(list<List_node>::iterator v, int &i)
{
	v->inum = i++;
	auto tmp = v->nodelist;
	for (auto beg = tmp.begin(); beg != tmp.end(); ++beg)
	{
		auto u = gp.getnode(*beg);						//根据list_node_node名字找到同名顶点！
		if (u != gp.listnode.end() && u->inum == 0)
		{
			cycleDetectionDFS(u, i);
		}
		else if (find(coord.begin(), coord.end(), make_tuple(v->nodename, u->nodename)) == coord.end() && find(coord.begin(), coord.end(), make_tuple(u->nodename, v->nodename)) == coord.end())		//uv不再coord中，而深度遍历生成的边不完全，因此需要做uv和vu的判断！
		{
			cout << "检测到环..." << endl;		//访问过U点，并且V点不是其父节点，则有环！
			return;
		}
	}
}

//union-find
void GraphAlgorithm::initialize(map<string, string> &root, map<string, string> &next, map<string, int> &length)
{
	for (auto &r : gp.listnode)
	{
		root[r.nodename] =next[r.nodename]= r.nodename;
		length[r.nodename] = 1;
	}
}
//ab的父元素是否相同！
void GraphAlgorithm::unionf(const string &a,const string &b, map<string, string> &root, map<string, string> &next, map<string, int> &length)
{
	if (root.at(a)==root.at(b))
		return;
	else if (length.at(root.at(a)) < length.at(root.at(b)))	
	{
		auto at = root.at(a);
		length.at(root.at(b)) += length.at(root.at(a));			//a比较短，将a转移给b！
		root.at(at) == root.at(b);
for (auto j = next.at(at); j != at; j = next[j])
root.at(j) = root.at(b);
swap(next.at(at), next.at(root.at(b)));
//将uv加入生成树
	}
	else
	{
		auto bt = root.at(b);
		length.at(root.at(a)) += length.at(root.at(b));			//a比较短，将a转移给b！
		root.at(bt) == root.at(a);
		for (auto j = next.at(bt); j != bt; j = next[j])
			root.at(j) = root.at(b);
		swap(next.at(bt), next.at(root.at(a)));
		//将uv加入生成树
	}
}
//有向图的边如何监测呢？
bool GraphAlgorithm::unionfind(const string &a, const string &b)
{
	map<string, string> root, next;
	map<string, int> length;
	initialize(root, next, length);
	for (auto &r : gp.listnode)
	{
		for (auto &rr : r.nodelist)
		{
			unionf(r.nodename, rr.nodename, root, next, length);
		}
	}
	if (root.at(a) == root.at(b))
	{
		cout << a << b << "是环的边！" << endl;
		return true;
	}
	return false;
}

//最小生成树
void initializetree(vector<tuple<string,string,int>> &tree,map<string, string> &root, map<string, string> &next, map<string, int> &length)
{
	set<string> tmp;
	for (auto &r : tree)
	{
		tmp.insert(get<0>(r));
		tmp.insert(get<1>(r));
	}
	for (auto &r : tmp)
	{
		root[r] = next[r] = r;
		length[r] = 1;
	}
}
void unionftree(const string &a, const string &b, map<string, string> &root, map<string, string> &next, map<string, int> &length)
{
	if (root.at(a) == root.at(b))
		return;
	else if (length.at(root.at(a)) < length.at(root.at(b)))
	{
		auto at = root.at(a);
		length.at(root.at(b)) += length.at(root.at(a));			//a比较短，将a转移给b！
		root.at(at) = root.at(b);
		for (auto j = next.at(at); j != at; j = next[j])
			root.at(j) = root.at(b);
		swap(next.at(at), next.at(root.at(b)));
		//将uv加入生成树
	}
	else
	{
		auto bt = root.at(b);
		length.at(root.at(a)) += length.at(root.at(b));			//a比较短，将a转移给b！
		root.at(bt) = root.at(a);
		for (auto j = next.at(bt); j != bt; j = next[j])
			root.at(j) = root.at(b);
		swap(next.at(bt), next.at(root.at(a)));
		//将uv加入生成树
	}
}
bool unionfindtree(vector<tuple<string, string, int>> &tree, tuple<string, string, int> &ab)
{
	map<string, string> root, next;
	map<string, int> length;
	auto tmp = tree;
	tmp.push_back(ab);						//传入的边是否可以与树中的边构成环，因此初始化时要添加此边
	initializetree(tmp,root, next, length);
	
	for (auto &r : tree)
	{
		unionftree(get<0>(r), get<1>(r), root, next, length);
	}
	if ( root.at(get<0>(ab)) != root.at(get<1>(ab)))
		return true;
	else
		return false;
}

vector<tuple<string, string, int>> GraphAlgorithm::KruskalAlgorithm()//加权连通无向图
{

	vector<tuple<string, string, int>> tree;
	sort(gp.coord.begin(), gp.coord.end(), [](tuple<string, string, int> &lf, tuple<string, string, int> &rg) {return get<2>(lf) < get<2>(rg); });
	for (size_t i = 0; i < gp.coord.size() && tree.size() < (gp.getnodenumber() - 1); ++i)
	{
		if (unionfindtree(tree,gp.coord[i])==true)		//使用的非类中的版本，特制版！
		{
			tree.push_back(gp.coord[i]);
		}
	}
	return tree;
}

//无向图的连通性
void GraphAlgorithm::blockDFS(const string &v, int &i, map<string, set<string>> &parent, map<string, int> &pred, map<string, int> &num)
{
	pred[v]=num[v] = i++;
	auto node = gp.getnode(v);
	for (auto &r : node->nodelist)
	{
		if (num.at(r.nodename) == 0)
		{
			auto &tmp = parent[r.nodename];
			tmp.insert(v);

			blockDFS(r.nodename, i, parent, pred, num);
			pred.at(v) = min(pred.at(r.nodename), pred.at(v));
			if (parent.at(v).empty() && node->nodelist.size() > 1)
				cout << v<< " ";
			if (!parent.at(v).empty() && pred.at(r.nodename) >= num.at(v))
				cout << v << " ";
		}
		else
		{
			auto tmp = parent[v];
			if (tmp.find(r.nodename) == tmp.end())
			{
				auto k1 = num.at(r.nodename);
				auto k2 = pred.at(v);//??
				pred.at(v) = min(k1,k2);
			}
		}
	}
}
void GraphAlgorithm::blockSearch()
{
	map<string, set<string>> parent;
	map<string, int> pred, num;
	set<string> baba;
	for (auto &r : gp.listnode)
	{
		num[r.nodename] = 0;
		pred[r.nodename] = INT_MAX;
		parent[r.nodename] = baba;
	}
	int i = 1;
	for (auto &r : num)
	{
		if (r.second == 0)
			blockDFS(r.first,i,parent, pred, num);
	}
}
//有向图连通性
void GraphAlgorithm::strongDFS(const string &v, int &i, map<string, int> &pred, map<string, int> &num, stack<string> &stk)
{
	pred[v] = num[v] = i++;
	stk.push(v);
	auto node = gp.getnode(v);
	for (auto &u : node->nodelist)
	{
		if (num[u.nodename] == 0)
		{
			strongDFS(u.nodename, i, pred, num, stk);
			pred[v] = min(pred[v], pred[u.nodename]);
		}
		else if (num[u.nodename] < num[v] && strongDFSbool(u.nodename, stk))	//如果访问过，且在v的前面，即u可以访问v，条件：num[u.nodename] < num[v]
		{
			pred[v] = min(pred[v], num[u.nodename]);
		}
	}
	if (pred[v] == num[v])
	{
		string w = stk.top();
		stk.pop();
		while (w != v)
		{
			cout << w << " ";
			w = stk.top();
			stk.pop();
		}
		cout << w << endl;
	}
}
bool GraphAlgorithm::strongDFSbool(const string &u, stack<string> stk)
{
	while (!stk.empty())
	{
		if (u == stk.top())
			return true;
		stk.pop();
	}
	return false;
}
void GraphAlgorithm::stonglyConnectedCompontSearch()
{
	map<string, int> num, pred;
	for (auto &r : gp.listnode)
	{
		num[r.nodename] = 0;
		pred[r.nodename] = INT_MAX;
	}
	int i = 1;
	stack<string> stk;
	for (auto &r : num)
	{
		if (r.second == 0)
			strongDFS(r.first, i, pred, num, stk);
	}
}
//拓扑排序
void GraphAlgorithm::ts(const string &v, int &i, int &j, map<string, int> &num, map<string, int>&tsnum)
{
	num[v] = i++;
	auto node = gp.getnode(v);
	for (auto &r : node->nodelist)
	{
		if (num[r.nodename] == 0)
			ts(r.nodename, i, j, num, tsnum);
		else if (tsnum[r.nodename] == 0)
			cerr << "存在环！";
	}
	tsnum[v] = j++;
}
void GraphAlgorithm::topologicalsorting()
{
	map<string, int> num, tsnum;
	for (auto &r : gp.listnode)
	{
		num[r.nodename] = tsnum[r.nodename] = 0;
	}
	int i = 1;
	int j = gp.listnode.size();
	for (auto &r : num)
	{
		if (r.second == 0)
			ts(r.first, i, j, num, tsnum);
	}
	vector<pair<string, int>> outnum(tsnum.begin(), tsnum.end());
	sort(outnum.begin(), outnum.end(), [](pair<string, int> &lh, pair<string, int> &rh) {return lh.second > rh.second; });
	for (auto &r : outnum)
	{
		cout << r.first << " ";
	}
	cout << endl;
}

bool GraphAlgorithm::augmentPathBFS(const string &s, const string &t, vector<vector<Matrix_node>> &mat, map<string, string> &parent)
{
	map<string, bool> visited;
	for (auto &r : gp.listnode)
	{
		visited[r.nodename] = false;
	}
	queue<string> q;
	q.push(s);
	visited[s] = true;
	parent[s] = "#";
	while (!q.empty())
	{
		auto v = q.front();
		q.pop();
		auto node = gp.getnode(v);
		for (auto &r : node->nodelist)
		{
			auto i = gp.matrixnode[v];
			auto j = gp.matrixnode[r.nodename];
			
			if (visited[r.nodename] == false && mat[i][j].weight > 0)
			{
				q.push(r.nodename);
				parent[r.nodename] = v;
				visited[r.nodename] = true;
			}
		}
	}
	return visited[t] == true;
}
void GraphAlgorithm::FordFulkersonAlgorithm(const string &s, const string &t)
{
	gp.to_matrix();
	auto tmpmatrix = gp.matrix;
	int max_flow = 0;
	string v,u;
	map<string, string> parent;
	while (augmentPathBFS(s,t, tmpmatrix,parent))
	{
		int pathflow = INT_MAX;
		//找到最小的容量
		for (v = t; v != s; v = parent[v])
		{
			u = parent[v];
			auto i = gp.matrixnode[u];
			auto j = gp.matrixnode[v];
			pathflow = min(pathflow, tmpmatrix[i][j].weight);
		}
		//修改该路径的所有最小容量值（最小容量处则为0，路被堵死了，则寻找其他父节点！）
		for (v = t; v != s; v = parent[v])
		{
			u = parent[v];
			auto i = gp.matrixnode[u];
			auto j = gp.matrixnode[v];
			tmpmatrix[i][j].weight -= pathflow;
			tmpmatrix[j][i].weight += pathflow;
		}
		max_flow += pathflow;
	}
	cout <<"最大流量: " <<max_flow;
}