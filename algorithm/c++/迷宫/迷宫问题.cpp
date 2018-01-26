// 迷宫问题.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include"mouse.h"
#include<stack>
#include<deque>
#include<vector>
#include<string>
#include<iostream>

/*
STL中自带stack适配器，默认为双端队列，可以由vector、list构成！stack<int,list<int>>
STL中自带queue适配器，默认为双端队列，可以由list构成！
STL中自带priority_queue适配器，默认为vector，可以由deque构成！priority_queue<int,vector<int>,less<int>>！优先队列~（less为函数对象！）
STL中list为双向链表，而deque双端队列，同时支持快速随机访问特性！支持at函数！
*/

/*

using namespace std;

template<typename T>
class Stack :public stack<T>					// 继承并修改父类stack！
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
		++rows;											//被围上一堵墙！
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
	if (store[x][y] ==passage || store[x][y]==exitMarker)		// 不为visited、wall、entrymark！
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
			currentCell = mazeStack.pop();			//寻路！
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
通过迭代求取最短路径，回溯！！！未完成！
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