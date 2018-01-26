#pragma once
#pragma once
#include<string>
#include<tuple>
#include<map>
#include<utility>
using namespace std;
class StuNode
{
public:
	StuNode() :nextstu(nullptr), nextcls(nullptr) {}
	StuNode(const string &st, const string &cr, const double &gd, StuNode *nst = 0, StuNode *ncr = 0) :stuid(st), couid(cr), grade(gd), nextstu(nst), nextcls(ncr) {}
	StuNode *setnstu(StuNode *ptr) { nextstu = ptr; return this; }
	StuNode *setncls(StuNode *ptr) { nextcls = ptr; return this; }
	~StuNode() = default;

	string stuid;
	string couid;
	double grade;
	StuNode *nextstu, *nextcls;
};
class StuList
{
public:
	StuList() :curhead(nullptr), curtail(nullptr), stuhead(nullptr), stutail(nullptr) {}
	~StuList();

	void addToTail(const string &st, const string &cr, const double &grade);
	double *deleteFromHead(const string &st, const string &cr);

private:
	StuNode *curhead, *curtail;
	StuNode *stuhead, *stutail;
	map<string, tuple<StuNode*, StuNode*>> cls, stu;
};

StuList::~StuList()
{
	for (auto &r : cls)
	{
		auto tmp = get<1>(r);
		auto head = get<0>(tmp);
		auto tail = get<1>(tmp);
		for (; head != nullptr; head = head->nextcls)
			delete head;
		head = tail = nullptr;
	}
}
void StuList::addToTail(const string &st, const string &cr, const double &gd)
{
	auto new_node = new StuNode(st, cr, gd);
	auto &tmp1 = stu[st];
	auto &tmp2 = cls[cr];
	if (get<0>(tmp1) == nullptr)
	{
		if (get<0>(tmp2) == nullptr)
		{
			get<0>(tmp2) = get<1>(tmp2) = new_node;
		}
		else
		{
			get<1>(tmp2)->nextcls = new_node;
			get<1>(tmp2) = new_node;
		}

		get<0>(tmp1) = get<1>(tmp1) = new_node;
	}
	else
	{
		if (get<0>(tmp2) == nullptr)
		{
			get<0>(tmp2) = get<1>(tmp2) = new_node;
		}
		else
		{
			get<1>(tmp2)->nextcls = new_node;
			get<1>(tmp2) = new_node;
		}

		get<1>(tmp1)->nextstu = new_node;
		get<1>(tmp1) = new_node;
	}
}

double *StuList::deleteFromHead(const string &st, const string &cr)
{
	double *ret = nullptr;
	auto &tmp1 = stu[st];		//STUDENT
	auto &tmp2 = cls[cr];		//COURSE

	if (!(get<0>(tmp1) == nullptr) && !(get<0>(tmp2)==nullptr))			//一个节点肯定有2个指针指着，一个是stu，一个是clas.即遍历stu的节点，对每次stu操作节点进行分析（更改其cls的指针信息！）
	{
		if (get<0>(tmp1) == get<1>(tmp1))
		{
			ret = new double(get<0>(tmp1)->grade);

			if (get<0>(tmp2) == get<1>(tmp2))
			{
				if (get<0>(tmp2)->couid == cr)
					get<0>(tmp2) = get<1>(tmp2) = nullptr;
				else
					return nullptr;
			}
			else
			{
				auto pre = get<0>(tmp2);
				auto now = get<0>(tmp2)->nextcls;
				for (; now != nullptr && (now->couid != cr || now->stuid!=st); now = now->nextcls, pre = pre->nextcls);
				if (now == nullptr)
					return nullptr;
				else
				{
					pre->nextcls = now->nextcls;
				}
			}

			if (get<0>(tmp1)->stuid == st)
			{
				delete get<0>(tmp1);
				get<0>(tmp1) = get<1>(tmp1) = nullptr;
			}
			else
				return nullptr;
		}
		else
		{

			if (get<0>(tmp2) == get<1>(tmp2))
			{
				if (get<0>(tmp2)->couid == cr)
					get<0>(tmp2) = get<1>(tmp2) = nullptr;
				else
					return nullptr;
			}
			else
			{
				auto pre = get<0>(tmp2);
				auto now = get<0>(tmp2)->nextcls;
				for (; now != nullptr && (now->couid!= cr || now->stuid != st); now = now->nextcls, pre = pre->nextcls);
				if (now == nullptr)
					return nullptr;
				else
				{
					pre->nextcls = now->nextcls;
				}
			}

			auto pre = get<0>(tmp1);
			auto now = get<0>(tmp1)->nextstu;
			for (; now != nullptr && (now->stuid != st || now->couid !=cr); now = now->nextstu, pre = pre->nextstu);
			if (now == nullptr)
				return nullptr;
			else
			{
				ret = new double(now->grade);
				pre->nextstu = now->nextstu;
			}
		}
	}
	return ret;
}