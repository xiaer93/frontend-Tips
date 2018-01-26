#pragma once
#include<stack>
#include<iostream>
#include<string>
#include<vector>

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
	friend void readMaze();
	friend void findMinMaze(vector<string> store_find, Cell curnt, vector<vector<string>> ret);
};

int rows, cols;
Cell exitCell, entryCell;
const char exitMarker='e', entryMarker='m', visited='*', passage='0', wall='1';
vector<string> store;

void readMaze()
{
	string tmp_line;
	deque<string> tmp_maze;
	rows = 0; cols = 0;
	size_t length = 0;
	cout << "Enter a rectanguar maze using the following: " << endl;
	cout << "characters:\nm-entry\ne-exit\n1-wall\n0-passage\n";
	cout << "Enter one line at a time;end with q;" << endl;

	while (cin >> tmp_line && tmp_line != "q")
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

Stack<Cell> pushUnvisited(int x, int y,vector<string> s ,Stack<Cell> &ms)
{
	if (s[x][y] == passage || s[x][y] == exitMarker)		// 不为visited、wall、entrymark！
		ms.push(Cell(x, y));

	return ms;
}

void print(const vector<string> &s)
{
	for (auto &r : s)
	{
		cout << r << endl;
	}
	cout << "-------------------->" << endl;
}

vector<vector<string>> minRoute;
void findMinMaze(vector<string> store_find, Cell curnt, vector<vector<string>> ret)
{
	Stack<Cell> ms;
	auto row = curnt.x;
	auto col = curnt.y;

	pushUnvisited(row - 1, col, store_find, ms);
	pushUnvisited(row + 1, col, store_find, ms);
	pushUnvisited(row, col - 1, store_find, ms);
	pushUnvisited(row, col + 1, store_find, ms);

	if (curnt == exitCell)
	{
		ret.push_back(store_find);
		if (minRoute.size() == 0)
			minRoute = ret;
		else if (minRoute.size() > ret.size())
			minRoute = ret;
		return;
	}
	else if (ms.empty())
	{
		return;
	}
	else
	{
		while (!(ms.empty()))
		{
			if (!(curnt == entryCell))
				store_find[row][col] = visited;
			
			print(store_find);
			ret.push_back(store_find);
			curnt = ms.pop();
			findMinMaze(store_find, curnt,ret);
		}
	}
}