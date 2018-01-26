#pragma once
#include<iostream>
#include<list>
#include<algorithm>
#include<string>

using namespace std;

class IdNode
{
public:
	IdNode(char *s = "", double e = 0) :id(s), value(e) {}
	bool operator==(const IdNode &rh)const { return id==rh.id; }
private:
	//char *id;//使用指针时，当实参释放后，id就指向无效空间！
	string id;
	double value;
	friend class Statement;
	friend ostream& operator<<(ostream &os, const IdNode&);
};

class Statement
{
public:
	Statement() = default;
	void getstatement();
private:
	list<IdNode> idList;
	char ch;
	double factor();
	double term();
	double expression();
	void readId(char *);
	void issueError(char *s) { cout << s << endl; }
	double findValue(char *);
	void processNode(char*, double);
	friend ostream& operator<<(ostream &os, const Statement&);
};

/*
getstatement-》expression-》term-》factor-》expression、findvalue！
*/
double Statement::findValue(char *id)
{
	IdNode tmp(id);
	auto i = find(idList.begin(), idList.end(), tmp);
	if (i != idList.end())
		return i->value;
	else
		issueError("Unknown varible");
	return 0;
}

void Statement::processNode(char *id, double e)
{
	IdNode tmp(id, e);
	auto i = find(idList.begin(), idList.end(), tmp);
	if (i != idList.end())
		i->value = e;
	else
		idList.push_front(tmp);
}

void Statement::readId(char *id)
{
	int i = 0;
	if (isspace(ch))
		cin >> ch;
	if (isalpha(ch))
	{
		while (isalnum(ch))
		{
			id[i++] = ch;
			cin.get(ch);
		}
		id[i] = '\0';
	}
	else
		issueError("Identifier expected!");
}

double Statement::factor()
{
	double var, minus = 1.0;
	static char id[200];
	cin >> ch;
	while (ch == '+' || ch == '-')
	{
		if (ch == '-')
			minus *= -1.0;
		cin >> ch;
	}
	if (isdigit(ch) || ch == '.')
	{
		cin.putback(ch);
		cin >> var >> ch;
	}
	else if (ch == '(')
	{
		var = expression();
		if (ch == ')')
			cin >> ch;
		else
			issueError("Right paren left out!");
	}
	else
	{
		readId(id);
		if (isspace(ch))
			cin >> ch;
		var = findValue(id);
	}
	return var*minus;
}

double Statement::term()
{
	double f = factor();
	while (true)
	{
		switch (ch)
		{
		case '*':f *= factor(); break;
		case '/':f /= factor(); break;
		default:return f;
		}
	}
}
double Statement::expression()
{
	double f = term();
	while (true)
	{
		switch (ch)
		{
		case '+':f += factor(); break;
		case '-':f -= factor(); break;
		default:return f;
		}
	}
}

void Statement::getstatement()
{
	char id[20], command[20];
	double e;
	cout << "Enter a statement: " << endl;
	cin >> ch;
	readId(id);
	strupr(strcpy(command, id));
	if (strcmp(command, "STATUS") == 0)
		cout << *this;
	else if (strcmp(command, "PRINT") == 0)
	{
		readId(id);
		cout << id << " = " << findValue(id) << endl;
	}
	else if (strcmp(command, "END") == 0)
		exit(0);
	else
	{
		if (isspace(ch))
			cin >> ch;
		if (ch == '=')
		{
			e = expression();
			if (ch != ';')
				issueError("There are some extras in the statement.");
			else
				processNode(id, e);
		}
		else
		{
			issueError("'=' is missing!");
		}
	}
}
ostream& operator<<(ostream &os, const Statement &s)
{
	auto i = s.idList.begin();
	for (; i != s.idList.end(); ++i)
	{
		os << *i;
	}
	os << endl;
	return os;
}
ostream& operator<<(ostream &os, const IdNode &s)
{
	os << s.id << " = " << s.value << endl;
	return os;
}