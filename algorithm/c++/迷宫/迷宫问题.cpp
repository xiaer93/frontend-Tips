// �Թ�����.cpp : �������̨Ӧ�ó������ڵ㡣
//

#include "stdafx.h"
#include"mouse.h"
#include<stack>
#include<deque>
#include<vector>
#include<string>
#include<iostream>

/*
STL���Դ�stack��������Ĭ��Ϊ˫�˶��У�������vector��list���ɣ�stack<int,list<int>>
STL���Դ�queue��������Ĭ��Ϊ˫�˶��У�������list���ɣ�
STL���Դ�priority_queue��������Ĭ��Ϊvector��������deque���ɣ�priority_queue<int,vector<int>,less<int>>�����ȶ���~��lessΪ�������󣡣�
STL��listΪ˫��������deque˫�˶��У�ͬʱ֧�ֿ�������������ԣ�֧��at������
*/

/*

using namespace std;

template<typename T>
class Stack :public stack<T>					// �̳в��޸ĸ���stack��
{
public:
	T pop() { T ret = top(); stack<T>::pop(); return ret; }
};

class Cell
{
public:
	Cell(int i = 0, int j = 0) :x(i), y(j) {}
	bool operator==(const Cell &c) const { return c.x == x && c.y == y; }
private:
	int x, y;
	friend class Maze;
};


class Maze
{
public:
	Maze() :exitMarker('e'), entryMarker('m'), visited('.'), passage('0'), wall('1') { readMaze(); }
	void exitMaze();
private:
	int rows, cols;
	Cell currentCell, exitCell, entryCell;
	const char exitMarker, entryMarker, visited, passage, wall;
	Stack<Cell> mazeStack;
	vector<string> store;
	void pushUnvisited(int, int);
	void readMaze();
	friend ostream& operator<<(ostream &os, const Maze &rhm);
};
void Maze::readMaze()
{
	string tmp_line;
	deque<string> tmp_maze;
	rows = 0; cols = 0;
	size_t length = 0;
	cout << "Enter a rectanguar maze using the following: " << endl;
	cout << "characters:\nm-entry\ne-exit\n1-wall\n0-passage\n";
	cout << "Enter one line at a time;end with q;" << endl;

	while (cin>>tmp_line && tmp_line!="q")
	{
		++rows;											//��Χ��һ��ǽ��
		tmp_line = "1" + tmp_line + "1";
		tmp_maze.push_back(tmp_line);
		if (tmp_line.find(exitMarker) != string::npos)
		{
			exitCell.x = rows;		//cols
			exitCell.y = tmp_line.find(exitMarker);
		}
		if (tmp_line.find(entryMarker) != string::npos)
		{
			entryCell.x = rows;							//x=rows
			entryCell.y = tmp_line.find(entryMarker);
			length = tmp_line.size();
		}
	}
	while (!tmp_maze.empty())
	{
		if (store.empty())
		{
			store.push_back(string(length, '1'));
		}

		store.push_back(tmp_maze.front());
		tmp_maze.pop_front();

		if (tmp_maze.size() == 0)
		{
			store.push_back(string(length, '1'));
		}
	}
}
void Maze::pushUnvisited(int x, int y)
{
	if (store[x][y] ==passage || store[x][y]==exitMarker)		// ��Ϊvisited��wall��entrymark��
		mazeStack.push(Cell(x, y));
}
void Maze::exitMaze()
{
	int row, col;
	currentCell = entryCell;
	while (!(currentCell==exitCell))
	{
		row = currentCell.x;
		col = currentCell.y;
		cout << *this;
		if (!(currentCell == entryCell))
			store[row][col] = visited;
		pushUnvisited(row - 1, col);
		pushUnvisited(row + 1, col);
		pushUnvisited(row, col - 1);
		pushUnvisited(row, col + 1);

		if (mazeStack.empty())
		{
			cout << *this;
			cout << "Failure\n";
			return;
		}
		else
		{
			currentCell = mazeStack.pop();			//Ѱ·��
		}
	}
	cout << *this;
	cout << "Success\n";
}
ostream& operator<<(ostream &os, const Maze &rhm)
{
	cout << "------------------>" << endl;
	for (auto r : rhm.store)
	{
		os << r << endl;
	}
	cout << "------------------>" << endl;
	return os;
}

int main()
{
	//Maze m;
	//m.exitMaze();

	system("pause");
    return 0;
}
*/



/*
ͨ��������ȡ���·�������ݣ�����δ��ɣ�
*/

int main()
{
	vector<vector<string>> ret;
	readMaze();
	findMinMaze(store, entryCell,ret);

	cout.clear();
	for (auto &r : minRoute)
	{
		print(r);
	}

	system("pause");
	return 0;
}