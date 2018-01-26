// 散列.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include"hash.h"

using namespace std;

int main()
{
	char filename[100] = "C:\\Users\\winack\\Documents\\Visual Studio 2017\\Projects\\散列\\123.txt";
	File fclass;
	fclass.processFile(filename);

    return 0;
}

