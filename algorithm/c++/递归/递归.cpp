// �ݹ�.cpp : �������̨Ӧ�ó������ڵ㡣
//

#include "stdafx.h"
#include<iostream>
#include<string>
#include<vector>
#include<algorithm>

using namespace std;

/*
�ݹ������Ŀ�ģ�1��������Ԫ�أ�2������ĳ��Ԫ���Ƿ�����ĳ���ϣ�
�ݹ�ĺ����Ǳ����У���ʼ�����͹��ɲ��裡
β�ݹ飺ÿ��������ĩβֻʹ�õݹ���ã���֮ǰû��������ӵ��ã�
��β�ݹ飺�����������෴��˳�������
��ӵݹ飺����ͨ���м�����ӵ�����������receive()->decode()->store()->receive()...
Ƕ�׵ݹ飬����������Ϊ�������ݣ�
������ݹ飺Fibonacci���о��ǲ�����ݹ飬��ʹ�ǳ��򵥵�����Ҳ��Ҫ�ݹ�ܶ�Σ���ʹ�üӷ�������f(n)=(1+/5)^n��/ /5 
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
���ݣ��˻ʺ������ᣬ�����˹����ܣ�
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
			if ((rows+1) < store.size())		//�������û����Ļʺ���������ã�
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
			r.setQueen(false);			//��β������������Ե��������ĸ�����൱��ʹ����ջ���ڱ����У�����������ͬʱ���������ء�ɾ�����������õĻʺ󣡣�
			setleft(r, true,lft);		//ɾ�����࣡����vector<Cell>��¼�����������ı����ߣ�����ɾ�����࣡
			setright(r, true,rht);
			setcenter(r, true,sct);
		}
	}
}

vector<Cell> ChessBoard::setleft(const TFCell &tfc, bool flag, const vector<Cell> &vecTFC)
{
	vector<Cell> ret;
	if (flag)								//���Ҫ����Ϊtrue����ֻ�����Լ��Ĺ���ֵ��
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
	if (flag)								//���Ҫ����Ϊtrue����ֻ�����Լ��Ĺ���ֵ��
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
	if (flag)								//���Ҫ����Ϊtrue����ֻ�����Լ��Ĺ���ֵ��
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

