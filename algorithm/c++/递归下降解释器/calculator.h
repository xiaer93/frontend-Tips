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
		switch (ch)				//ÿ�γɹ���ȡ���ֺ󣬼��ch��Ϊ+-*/��
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
	cin >> ch;							//��ȡһλ�ַ��������������ת����һλ��
	while (isspace(ch))					//����հ�
	{
		cin >> ch;
	}
	while (ch == '+' || ch == '-')		//���������
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
	cin >> ch;								//��ȡ���������������
	while (isdigit(ch) || ch=='.')
	{
		tmp = tmp + string(1, ch);
		cin >> ch;
	}
	f = stod(tmp);
	return f;
}