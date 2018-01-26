#pragma once

//插入排序，时间复杂度O(n2)
template <typename T>
void insertionsort(T data[], int n)
{
	for (int i = 1,j; i < n; ++i)
	{
		auto tmp = data[i];
		for (j = i; j > 0 && tmp < data[j - 1]; --j)		//j>0保证data[j-1]不发生bug，tmp<data[j-1]保证程序即时退出！
		{
			data[j] = data[j - 1];
		}
		data[j] = tmp;
	}
}

//选择排序，比较次数恒定，但是赋值次数最少！（这是其他算法无法比拟的！）
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
		if(i!=least)							//如果没有找到更小的，就不发生交换！
			swap(data[i], data[least]);
	}
}

//冒泡排序，比较和赋值次数太多！插入排序是冒泡排序快2倍！
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
//冒泡排序提升版本！
template <typename T>
void bubblesortAdvance(T data[], int n)
{
	bool flag = false;
	for (int i = 0; i < n - 1 && flag==true; ++i)
	{
		flag = false;									//如果没发生交换赋值，则退出循环！
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
//梳排序，增加步长，而不是依次比较元素！对冒泡排序的改进！[实验结果表明，其性能与快速排序相当！]
template <typename T>
void combsort(T data[], int n)
{
	int step = n, j, k;										//第一阶段，步长排序
	while ((step = int(step / 1.3)) > 1)
	{
		for (j = n - 1; j >= step; --j)
		{
			k = j - step;						//k和j距离step步
			if (data[j] < data[k])
				swap(data[j], data[k]);
		}
	}

	bool flag = false;										//第二阶段，调用冒泡.
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

//理论效率nlgn，插入排序(n^2+n-2)/4，选择性冒泡排序(n^2-n)/2。因此，探寻更高效的排序方法！

//希尔排序，排序效率随数组长度增加而暴增，所以可以将数组分成小数组，对小数组排序后，再将其合成。这就是希尔排序！
//123456789，分3组，14710，258，369；
template <typename T>
void shellSort(T data[], int arrSize)
{
	//生成希尔数
	register int i, j, hCnt, h;
	int increments[20], k;					//希尔数也可以通过公式近似得到~
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
				if(k!=j)				//如果发生了元素交换，则执行赋值，完美的插入排序！
					data[k] = tmp;
				j = j + h;
			}
		}
	}
}

//堆排序，堆的算法还未完成，待写！

//快速排序算法，同样是划分程小数组。不过快速排序依据的是边界划分！
//快速排序的性能取决于边界值。另外，快速算法不适合少于30个数据项的小数组。此时插入排序可能更高效！
template <typename T>
void _quicksort(T data[], int first, int last)		//如何隐藏函数？
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
	swap(data[n - 1], data[max]);				//设置边界，避免lower越界！
	_quicksort(data, 0, n - 2);
}

#include<queue>
//归并排序，使划分简单，重视于合并已经排好的序列！
//归并排序需要大量的拷贝空间，解决这一缺点的是使用链表？
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
	//将剩余元素导入tmp！
	while (i2 <= middle)
		tmp.push(data[i2++]);
	while (i3 <= last)
		tmp.push(data[i3++]);
	//data数据长度没变化，所以修改的只是first-last范围内的数据！
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

//基数排序，此程序专为整数排序
//为什么不能通过呢？
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

//计数排序，对基数排序的良好改进！性能非常好，可以和快速排序相比！
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
	delete[]tmp;				//是否需要释放tmp的？
}

//快速排序-散列版本
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