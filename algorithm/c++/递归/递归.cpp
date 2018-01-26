// 递归.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include<iostream>
#include<string>
#include<vector>
#include<algorithm>

using namespace std;

/*
递归的两个目的，1、产生新元素；2、测试某个元素是否属于某集合！
递归的核心是必须有，初始条件和归纳步骤！
尾递归：每个函数的末尾只使用递归调用，且之前没有其他间接调用！
非尾递归：将输入行以相反的顺序输出！
间接递归：函数通过中间链间接调用自身！例如receive()->decode()->store()->receive()...
嵌套递归，函数本身作为参数传递！
不合理递归：Fibonacci数列就是不合理递归，即使非常简单的问题也需要递归很多次！（使用加法，或者f(n)=(1+/5)^n）/ /5 
*/

void tail(int i)
{
	if (i > 0)
	{
		cout << i << "+";
		tail(i - 1);
	}
}

void reverse()
{
	char ch;
	cin.get(ch);
	if (ch != '\n')
	{
		reverse();
		cout.put(ch);
	}
}
unsigned int iterativeFib(unsigned int n)
{
	if (n < 2)
		return n;
	else
	{
		register int i = 2, tmp, current = 1, last = 0;
		for (; i <= n; ++i)
		{
			tmp = current;
			current = current + last;
			last = tmp;
		}
		return current;
	}
}

/*
回溯，八皇后我呢提，用于人工智能！
*/

class Cell
{
public:
	Cell(unsigned i = 0, unsigned j = 0) :x(i), y(j) {}
protected:
	unsigned x, y;
	friend class ChessBoard;
};

class TFCell :public Cell
{
public:
	TFCell(unsigned i = 0, unsigned j = 0,bool a = true,bool b=false) :Cell(i,j), available(a),queen(b) {}
	
	bool operator==(const TFCell &rhc) const { return rhc.x==x && rhc.y==y; }
	
	void setStaus(bool flag) const { available = flag; }
	bool getStaus()const { return available; }
	void setQueen(bool flag) const { queen = flag; }
	bool getQueen()const { return queen; }
private:
	mutable bool available;
	mutable bool queen;
	friend class ChessBoard;
};

class ChessBoard
{
public:
	ChessBoard(unsigned rc = 4):squares(rc) { initChessboard(squares); }
	vector<vector<TFCell>> chess() { putQueen(0); return store; }
	friend ostream&operator<<(ostream &os, const ChessBoard &cb);
private:
	unsigned squares;
	vector<vector<TFCell>> store;
	void initChessboard(const unsigned &k);
	vector<Cell> setleft(const TFCell &tfc,bool flag, const vector<Cell> &vecTFC);
	vector<Cell> setright(const TFCell &tfc,bool flag, const vector<Cell> &vecTFC);
	vector<Cell> setcenter(const TFCell &tfc,bool flag, const vector<Cell> &vecTFC);
	void putQueen(unsigned rows);
};

ostream& operator<<(ostream &os, const ChessBoard &cb)
{
	for (auto &r : cb.store)
	{
		for (auto &&rr : r)
		{
			if (rr.getQueen())
				os << "P";
			else if (rr.getStaus())
				os << "V";
			else
				os << "X";
		}
		os << endl;
	}
	os << "--------------->" << endl;
	return os;
}

void ChessBoard::putQueen(unsigned rows)
{
	for (auto &r : store[rows])
	{
		if (r.getStaus())
		{
			r.setQueen(true);
			auto lft=setleft(r,false,vector<Cell>());
			auto rht=setright(r,false, vector<Cell>());
			auto sct=setcenter(r,false, vector<Cell>());
			//cout << *this;
			if ((rows+1) < store.size())		//如果还有没放完的皇后，则继续放置！
				putQueen((rows + 1));
			else
			{
				cout << *this;


				r.setQueen(false);		
				setleft(r, true, lft);			
				setright(r, true, rht);
				setcenter(r, true, sct);
				return;
			}
			r.setQueen(false);			//非尾后迭代器，可以倒序输出字母！（相当于使用了栈，在本例中：当走入死胡同时、函数返回、删除本局所放置的皇后！）
			setleft(r, true,lft);		//删除过多！返回vector<Cell>记录各个函数所改变的左边，避免删除过多！
			setright(r, true,rht);
			setcenter(r, true,sct);
		}
	}
}

vector<Cell> ChessBoard::setleft(const TFCell &tfc, bool flag, const vector<Cell> &vecTFC)
{
	vector<Cell> ret;
	if (flag)								//如果要设置为true，则只设置自己改过的值！
	{
		for (auto &r : vecTFC)
		{
			auto x = r.x;
			auto y = r.y;
			store[x][y].setStaus(flag);
		}
	}
	else
	{
		auto x = tfc.x;
		auto y = tfc.y;
		for (unsigned i = 0; i < squares; ++i)		//x
		{
			auto j = x + y - i;						//y
			if (0 <= j && j < squares)
			{
				if (store[i][j].getStaus())
				{
					ret.push_back(Cell(i, j));
					store[i][j].setStaus(flag);
				}	
			}
		}
	}
	return ret;
}
vector<Cell> ChessBoard::setright(const TFCell &tfc, bool flag, const vector<Cell> &vecTFC)
{
	vector<Cell> ret;
	if (flag)								//如果要设置为true，则只设置自己改过的值！
	{
		for (auto &r : vecTFC)
		{
			auto x = r.x;
			auto y = r.y;
			store[x][y].setStaus(flag);
		}
	}
	else
	{
		auto x = tfc.x;
		auto y = tfc.y;

		if (x <= y)
		{
			auto tmp = y - x;
			for (unsigned i = 0, j = i + tmp; i < squares && j < squares; ++i, ++j)
			{
				if (store[i][j].getStaus())
				{
					ret.push_back(Cell(i, j));
					store[i][j].setStaus(flag);
				}
			}
		}
		else
		{
			auto tmp = x - y;
			for (unsigned j = 0, i = j + tmp; i < squares && j < squares; ++i, ++j)
			{
				if (store[i][j].getStaus())
				{
					ret.push_back(Cell(i, j));
					store[i][j].setStaus(flag);
				}
			}
		}
	}
	return ret;
}

vector<Cell> ChessBoard::setcenter(const TFCell &tfc, bool flag, const vector<Cell> &vecTFC)
{
	vector<Cell> ret;
	if (flag)								//如果要设置为true，则只设置自己改过的值！
	{
		for (auto &r : vecTFC)
		{
			auto x = r.x;
			auto y = r.y;
			store[x][y].setStaus(flag);
		}
	}
	else
	{
		auto x = tfc.x;
		auto y = tfc.y;

		for (unsigned j = 0; j < squares; ++j)
		{
			if (store[j][y].getStaus())
			{
				ret.push_back(Cell(j, y));
				store[j][y].setStaus(flag);
			}
		}
		for (unsigned i = 0; i < squares; ++i)
		{
			if (store[x][i].getStaus())
			{
				ret.push_back(Cell(x, i));
				store[x][i].setStaus(flag);
			}
		}
	}
	return ret;
}


void ChessBoard::initChessboard(const unsigned &k)
{
	for (unsigned i = 0; i < k; ++i)
	{
		vector<TFCell> tmp;
		for (unsigned j = 0; j < k; ++j)
		{

			tmp.push_back(TFCell(i, j, true));
		}
		store.push_back(tmp);
	}
}

int main()
{
	ChessBoard cb(10);

	auto tmp = cb.chess();

	system("pause");
    return 0;
}

