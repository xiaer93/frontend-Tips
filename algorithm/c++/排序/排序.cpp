// 排序.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include"sort.h"
#include<iostream>

using namespace std;

int main()
{
	long data[] = { 4,7,6,6,6,7,4,5,5,2,5,245,2,4,46,23,426,56,34,56,57,345,13,1,5,64,42,4,1,2,3,53,1,2,3,7,6,5 };
	auto arrsize = sizeof(data) / sizeof(int);
	//insertionsort(data, arrsize);
	//selectionsort(data, arrsize);
	//bubblesort(data, arrsize);
	//shellSort(data, arrsize);
	//quicksort(data,arrsize);
	//mergesort(data, arrsize);
	//radixsort(data, arrsize);
	//countingsort(data, arrsize);
	quicksort_hash(data, arrsize);

	for (size_t i = 0; i < arrsize; ++i)
		cout << data[i] << " ";

	system("pause");
    return 0;

}

