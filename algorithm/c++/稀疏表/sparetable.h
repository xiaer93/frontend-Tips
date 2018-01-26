#pragma once
#include<list>
#include<string>
#include<iostream>
#include<algorithm>
#include<iterator>

using namespace std;

class stuNode
{
public:
	bool operator==(const stuNode &sn) { return sn.coursename == coursename; }		//定义find函数所需要的==操作符！
	friend ostream& operator<<(ostream &os, const stuNode &sn);
	friend void addStudent();
	friend void pickcource();
	friend void setgrade();
private:
	string coursename;															//课程、分数
	double grade;
	stuNode(const string &s,double g=0):coursename(s),grade(g) {}
};

class stuPerson
{
public:
	stuPerson(const string &s) :studentname(s) {}
	bool operator==(const stuPerson &sp) { return sp.studentname == studentname; }
	const string get_name()const { return studentname; }

	friend ostream& operator<<(ostream &os, const stuPerson &sp);
	friend void addStudent();
	friend void pickcource();
	friend void setgrade();
	

private:
	string studentname;
	list<stuNode> chcourse;
};

class courseNode
{
public:
	bool operator==(const courseNode &cn) { return cn.course_name == course_name; }
	const string get_course()const { return course_name; }
	friend ostream& operator<<(ostream &os, const courseNode &cn);
	friend list<courseNode>::iterator checkcourse(const string &s);
	friend void addCourse();
	friend void addStudent();
	friend void pickcource();
private:
	string course_name;
	list<list<stuPerson>::iterator> course;				//引用！
	courseNode(const string &s) :course_name(s) {}
};

ostream& operator<<(ostream &os, const courseNode &cn)
{
	os << cn.course_name << ":" << endl;
	for (auto &r : cn.course)
	{
		os << r->get_name() << " + ";
	}
	os << endl;
	return os;
}
ostream& operator<<(ostream &os, const stuNode &sn)
{
	os << sn.coursename << " : " << sn.grade;
	return os;
}

ostream& operator<<(ostream &os, const stuPerson &sp)
{
	os << sp.get_name() << " : " << endl;
	for (auto &r : sp.chcourse)
	{
		os << r << endl;
	}
	return os;
}

list<stuPerson> peoples;			//学生人数8000
list<courseNode> classes;			//课程300

list<courseNode>::iterator checkcourse(const string &s)					//查找对应课程，如果没有返回classes.end()！
{
	return find(classes.begin(), classes.end(), courseNode(s));
}
list<stuPerson>::iterator checkstudent(const string &s)					//查找对应学生，如果没有返回peoples.end()！
{
	return find(peoples.begin(), peoples.end(), stuPerson(s));
}

string get_line(const string &msg)
{
	cout << msg << endl;
	string ret;
	getline(cin, ret);
	return ret;
}

void addCourse()				//添加课程！
{
	cout << "Add Course..." << endl;
	string student_course = get_line("please input the coursename");
	if(checkcourse(student_course) == classes.end())
	{
		classes.push_back(courseNode(student_course));
		cout << "Successed of adding " << student_course << endl;
	}
}

void addStudent()
{
	cout << "Add Student..." << endl;
	string student_name = get_line("please input name:");
	auto studendRef = checkstudent(student_name);
	if (studendRef == peoples.end())
	{
		peoples.push_back(stuPerson(student_name));
		cout << "Successed of adding " << student_name << endl;
	}
}

void pickcource()
{
	cout << "Pick Course..." << endl;
	string student_name = get_line("please input studentname:");
	auto studendRef = checkstudent(student_name);
	if (studendRef != peoples.end())
	{
		string student_course, student_grade;
		student_course = get_line("please input coursename:");
		while (student_course != "q")
		{
			auto courseRef = checkcourse(student_course);
			if (courseRef == classes.end())
			{
				cout << "Don't have the course!" << endl;
				student_course = get_line("please input coursename:");
				continue;
			}
			else
			{
				if (find(studendRef->chcourse.begin(), studendRef->chcourse.end(), stuNode(student_course)) == studendRef->chcourse.end())
				{
					studendRef->chcourse.push_back(stuNode(student_course));
					courseRef->course.push_back(studendRef);			//学生选课后，将指向学生的迭代器添加值course链表中！！
					cout << "Successed of picking " << student_course << endl;
				}
			}
			student_course = get_line("please input coursename:");
		}
	}
	else
	{
		cout << "Don't have the student!" << endl;
	}
}

void setgrade()
{
	cout << "Set Greade..." << endl;
	string student_name = get_line("please input studentname:");
	auto studendRef = checkstudent(student_name);
	if (studendRef != peoples.end())
	{
		cout << *studendRef;
		string student_course, student_grade;
		student_course = get_line("please input coursename:");
		while (student_course != "q")
		{
			auto pickedcourseRef = find(studendRef->chcourse.begin(), studendRef->chcourse.end(), stuNode(student_course));
			if (pickedcourseRef != studendRef->chcourse.end())
			{
				auto tmp = "please input the grades of " + student_course + " :";
				student_grade = get_line(tmp);
				pickedcourseRef->grade = stod(student_grade);
			}
			else
			{
				cout << "Don't have pick this " << student_course << endl;
			}
			student_course = get_line("please input coursename:");
		}
	}
	else
	{
		cout << "Don't have the student!" << endl;
	}
}

void findstudent()
{
	string studentname = get_line("please input the studentname: ");
	auto studentRef = checkstudent(studentname);
	if (studentRef != peoples.end())
	{
		cout << *studentRef;
	}
	else
	{
		cout << "Don't have the student!" << endl;
	}
}
void findcourse()
{
	string coursename = get_line("please input the coursename: ");
	auto courseRef = checkcourse(coursename);
	if (courseRef != classes.end())
	{
		cout << *courseRef;
	}
	else
	{
		cout << "Don't have the course!" << endl;
	}
}