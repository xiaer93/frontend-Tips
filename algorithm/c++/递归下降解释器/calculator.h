#pragma once
#include<string>
#include<iostream>

using namespace std;


double exS2();
double exS3();
double readdigit();

char ch;
double exS1()
{
	double f = exS2();
	while (true)
	{
		switch (ch)
		{
		case '+':f += exS2(); break;
		case '-':f -= exS2(); break;
		default:return f;
		}
	}
}
double exS2()
{
	double f = exS3();
	while (true)
	{
		switch (ch)				//每次成功读取数字后，检查ch是为+-*/？
		{
		case '*':f *= exS3(); break;
		case '/':f /= exS3(); break;
		default:return f;
		}
	}
	
}
double exS3()
{
	double f, minus = 1.0;
	cin >> ch;							//读取一位字符，从算术运算符转到下一位！
	while (isspace(ch))					//清除空白
	{
		cin >> ch;
	}
	while (ch == '+' || ch == '-')		//清除正负号
	{
		if (ch == '-')
			minus *= -1.0;
		cin >> ch;
	}
	if (isdigit(ch) || ch == '.')
	{
		cin.putback(ch);
		f=readdigit();
	}
	else if (ch == '(')
	{
		double tmp=exS1();
		while (isspace(ch))
		{
			cin >> ch;
		}
		if (ch != ')')
		{
			cout << "The ')' left out!" << endl;
		}
		else
		{
			f = tmp;
		}
	}
	else
	{
		cout << "The statement is worng!" << endl;
	}
	return f*minus;
}
double readdigit()
{
	double f = 0;
	string tmp;
	cin >> ch;								//读取到了算术运算符！
	while (isdigit(ch) || ch=='.')
	{
		tmp = tmp + string(1, ch);
		cin >> ch;
	}
	f = stod(tmp);
	return f;
}