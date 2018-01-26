#pragma once

//��������ʱ�临�Ӷ�O(n2)
template <typename T>
void insertionsort(T data[], int n)
{
	for (int i = 1,j; i < n; ++i)
	{
		auto tmp = data[i];
		for (j = i; j > 0 && tmp < data[j - 1]; --j)		//j>0��֤data[j-1]������bug��tmp<data[j-1]��֤����ʱ�˳���
		{
			data[j] = data[j - 1];
		}
		data[j] = tmp;
	}
}

//ѡ�����򣬱Ƚϴ����㶨�����Ǹ�ֵ�������٣������������㷨�޷�����ģ���
template <typename T>
void selectionsort(T data[], int n)
{
	for (int i = 0,j,least; i < n - 1; ++i)
	{
		for (j = i+1, least = i; j < n; ++j)
		{
			if (data[least] > data[j])
				least = j;
		}
		if(i!=least)							//���û���ҵ���С�ģ��Ͳ�����������
			swap(data[i], data[least]);
	}
}

//ð�����򣬱ȽϺ͸�ֵ����̫�࣡����������ð�������2����
template <typename T>
void bubblesort(T data[], int n)
{
	for (int i = 0; i < n-1; ++i)
	{
		for (int j = n - 1; j > i; --j)
		{
			if (data[j] < data[j - 1])
				swap(data[j], data[j - 1]);
		}
	}
}
//ð�����������汾��
template <typename T>
void bubblesortAdvance(T data[], int n)
{
	bool flag = false;
	for (int i = 0; i < n - 1 && flag==true; ++i)
	{
		flag = false;									//���û����������ֵ�����˳�ѭ����
		for (int j = n - 1; j > i; --j)
		{
			if (data[j] < data[j - 1])
			{
				swap(data[j], data[j - 1]);
				flag = true;
			}
		}
	}
}
//���������Ӳ��������������αȽ�Ԫ�أ���ð������ĸĽ���[ʵ��������������������������൱��]
template <typename T>
void combsort(T data[], int n)
{
	int step = n, j, k;										//��һ�׶Σ���������
	while ((step = int(step / 1.3)) > 1)
	{
		for (j = n - 1; j >= step; --j)
		{
			k = j - step;						//k��j����step��
			if (data[j] < data[k])
				swap(data[j], data[k]);
		}
	}

	bool flag = false;										//�ڶ��׶Σ�����ð��.
	for (int i = 0; i < n - 1 && flag == true; ++i)
	{
		flag = false;	
		for (int j = n - 1; j > i; --j)
		{
			if (data[j] < data[j - 1])
			{
				swap(data[j], data[j - 1]);
				flag = true;
			}
		}
	}
}

//����Ч��nlgn����������(n^2+n-2)/4��ѡ����ð������(n^2-n)/2����ˣ�̽Ѱ����Ч�����򷽷���

//ϣ����������Ч�������鳤�����Ӷ����������Կ��Խ�����ֳ�С���飬��С����������ٽ���ϳɡ������ϣ������
//123456789����3�飬14710��258��369��
template <typename T>
void shellSort(T data[], int arrSize)
{
	//����ϣ����
	register int i, j, hCnt, h;
	int increments[20], k;					//ϣ����Ҳ����ͨ����ʽ���Ƶõ�~
	for (h = 1, i = 0; h < arrSize; ++i)
	{
		increments[i] = h;
		h = 3 * h + 1;
	}

	for (i--; i >= 0; --i)
	{
		h = increments[i];
		for (hCnt = h; hCnt < 2 * h; ++hCnt)
		{
			for (j = hCnt; j < arrSize;)
			{
				auto tmp = data[j];
				k = j;
				while ((k - h) >= 0 && tmp < data[k - h])
				{
					data[k] = data[k - h];
					k = k - h;
				}
				if(k!=j)				//���������Ԫ�ؽ�������ִ�и�ֵ�������Ĳ�������
					data[k] = tmp;
				j = j + h;
			}
		}
	}
}

//�����򣬶ѵ��㷨��δ��ɣ���д��

//���������㷨��ͬ���ǻ��ֳ�С���顣���������������ݵ��Ǳ߽绮�֣�
//�������������ȡ���ڱ߽�ֵ�����⣬�����㷨���ʺ�����30���������С���顣��ʱ����������ܸ���Ч��
template <typename T>
void _quicksort(T data[], int first, int last)		//������غ�����
{
	int lower = first + 1, upper = last;
	int middle = (first + last) / 2;
	swap(data[first], data[middle]);
	T bound = data[first];
	while (lower <= upper)
	{
		while (data[lower] <= bound)
			++lower;
		while (data[upper] > bound)
			--upper;
		if (lower < upper)
			swap(data[lower], data[upper]);
		else
			++lower;
	}
	swap(data[upper], data[first]);
	if (first < (upper - 1))
		_quicksort(data, first, upper - 1);
	if ((upper + 1) < last)
		_quicksort(data, upper + 1, last);
}

template <typename T>
void quicksort(T data[], int n)
{
	int i, max;
	if (n < 2)
		return;
	for (i = 1, max = 0; i < n; ++i)
	{
		if (data[max] < data[i])			
			max = i;
	}
	swap(data[n - 1], data[max]);				//���ñ߽磬����lowerԽ�磡
	_quicksort(data, 0, n - 2);
}

#include<queue>
//�鲢����ʹ���ּ򵥣������ںϲ��Ѿ��źõ����У�
//�鲢������Ҫ�����Ŀ����ռ䣬�����һȱ�����ʹ������
template <typename T>
void _merge(T data[], int first, int last)
{
	queue<T> tmp;
	auto middle = (first + last) / 2;
	int i1 = 0, i2 = first, i3 = middle + 1;
	while (i2 <= middle && i3 <= last)
	{
		if (data[i2] < data[i3])
			tmp.push(data[i2++]);
		else
			tmp.push(data[i3++]);
	}
	//��ʣ��Ԫ�ص���tmp��
	while (i2 <= middle)
		tmp.push(data[i2++]);
	while (i3 <= last)
		tmp.push(data[i3++]);
	//data���ݳ���û�仯�������޸ĵ�ֻ��first-last��Χ�ڵ����ݣ�
	for (int i = first; i <= last; ++i)	
	{
		data[i] = tmp.front();
		tmp.pop();
	}
}

template <typename T>
void _mergesort(T data[], int first, int last)
{
	if (first < last)
	{
		int middle = (first + last) / 2;
		_mergesort(data, first, middle);
		_mergesort(data, middle + 1, last);
		_merge(data, first, last);
	}
}

template <typename T>
void mergesort(T data[], int arrsize)
{
	int first = 0;
	int last = arrsize - 1;
	_mergesort(data, first, last);
}

//�������򣬴˳���רΪ��������
//Ϊʲô����ͨ���أ�
#include<queue>
using namespace std;
void radixsort(int data[], int n)
{
	register int i, j, k, factor;
	const int radix = 10;
	const int digits = 10;
	queue<int> que[radix];

	for (i = 0, factor = 1; i < digits; factor =factor * radix, i++)
	{
		for (j = 0; j < n; ++j)
			que[(data[j] / factor) % radix].push(data[j]);
		for (j = k = 0; j < radix; ++j)
		{
			while (!que[j].empty())
			{
				data[k++] = que[j].front();
				que[j].pop();
			}
		}
	}
}

//�������򣬶Ի�����������øĽ������ܷǳ��ã����ԺͿ���������ȣ�
void countingsort(long data[], const long n)
{
	long i;
	long largest = data[0];
	long *tmp = new long[n];
	for (i = 1; i < n; ++i)
	{
		if (largest < data[i])
			largest = data[i];
	}
	unsigned long *count = new unsigned long[largest + 1];
	for (i = 0; i <= largest; ++i)
	{
		count[i] = 0;
	}
	for (i = 0; i < n; ++i)
		count[data[i]]++;
	for (i = 1; i <= largest; ++i)
		count[i] = count[i] + count[i - 1];
	for (i = n - 1; i >= 0; --i)
	{
		tmp[count[data[i]] - 1] = data[i];
		count[data[i]]--;
	}
	for (i = 0; i < n; ++i)
	{
		data[i] = tmp[i];
	}
	delete[]tmp;				//�Ƿ���Ҫ�ͷ�tmp�ģ�
}

//��������-ɢ�а汾
template <typename T>
void _quicksort_hash1(T data[],int lower,int high,int &bound)
{
	for (int i = lower; i <= high; ++i)
		cout << data[i] << " ";
	cout << "-----------------" << endl;


	int least = lower;
	int middle = (lower + high) / 2;
	swap(data[lower], data[middle]);

	for (int i = lower + 1; i <= high; ++i)
	{
		if (data[lower] > data[i])
		{
			++least;
			swap(data[least], data[i]);
		}
	}
	swap(data[lower], data[least]);
	bound = least;
}
template <typename T>
void _quicksort_hash2(T data[], int lower,int high)
{
	if (lower < high)
	{
		int bound = 0;
		_quicksort_hash1(data, lower, high, bound);
		_quicksort_hash2(data, lower, bound - 1);
		_quicksort_hash2(data, bound + 1, high);
	}
}
template <typename T>
void quicksort_hash(T data[], int arrsize)
{
	_quicksort_hash2(data, 0, arrsize-1);
}