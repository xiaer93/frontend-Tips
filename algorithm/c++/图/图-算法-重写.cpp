// ͼ-�㷨-��д.cpp : �������̨Ӧ�ó������ڵ㡣
//

#include "stdafx.h"
#include"graph.h"
#include<iostream>

using namespace std;

//�洢list����ĵ�ַ���Ǽ��䲻��ȫ�ģ���������º󣬵�ַ�п���ʧЧ��

//UΪ����ͼ��WΪȨֵͼ
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

