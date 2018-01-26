// 图-算法-重写.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include"graph.h"
#include<iostream>

using namespace std;

//存储list链表的地址，是极其不安全的，当链表更新后，地址有可能失效！

//U为有向图，W为权值图
int main()
{
	GraphAlgorithm ga(WUDG);
	//ga.dijkstraAlgorithm("a");
	//ga.labelCorrectingAlgorithm();
	
	//ga.cycleDetection();
	//auto minTree=ga.KruskalAlgorithm();
	//ga.unionfind("a", "b");
	
	//ga.blockSearch();

	//ga.stonglyConnectedCompontSearch();
	//ga.topologicalsorting();

	ga.FordFulkersonAlgorithm("0","5");

	system("pause");
    return 0;
}

