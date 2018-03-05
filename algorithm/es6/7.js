/* *
 * Created by winack on 2018/3/5 
 */
/*
* 数组的拓展
* */

//新增拓展运算符：...
console.log(1, ...[2, 3, 4], 5);

//应用，展开数组
function hi(x,y,z) {
    console.log(x,y,z)
}
var args=[1,2,3];
//es5
hi.apply(null,args);
//es6
hi(...args);

//应用，复制数组
var a=[1,2,3];
var a1=a.concat();//es5
var a2=[...a];//es6

//应用，合并数组
var b=[4,5];
console.log([...a,...b]);

//应用，与解构联合使用
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first,rest);//first为1，rest为数组[2,3,4,5]

//拓展字符还可以将字符串转为数组
console.log([...'hello']);

//任何具有iterator接口的函数，都可以通过拓展运算符转为真正数组！
/*
const go = function(){
    yield 1;
    yield 2;
    yield 3;
};
console.log([...go()]);// [1, 2, 3]*/

//新增Array.form方法，将类似数组对象和具有iterator接口对象转为真正的数组
//而拓展运算符只支持具有iterator接口的对象转为数组，querySelectorAll返回具有iterator接口对象！
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
console.log([].slice.call(arrayLike));
console.log(Array.from(arrayLike));

//Array.of方法用于将一组值，转换为数组。
console.log(Array.of(1,2,3));//[1,2,3]

//copywith方法
console.log([1, 2, 3, 4, 5].copyWithin(0, 3));//[4,5,3,4,5]

//find用于找出第一个符合条件的数组成员，findIndex类似，但是返回值为索引（都不符合返回-1）！
console.log([1, 4, -5, 10].find((n) => n < 0));//-5
//find和findIndex可以搜索NAN
[NaN].indexOf(NaN);// -1
[NaN].findIndex(y => Object.is(NaN, y));// 0

//fill方法使用给定值，填充一个数组。还可以接受参数，用于指定起始和结束位置！
console.log(['a','b'].fill(5));//[5,5]
console.log(['c','d'].fill({name:'hong'}));//浅拷贝！

//提供entries()，keys() 和 values()方法，但会一个遍历器对象！

//提供Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值。（可以判断NAN）
console.log([1,2,3].includes(2));

//空位，es6将空位转为undefined
console.log(Array.from(['a',,'b']));//['a',undefined,'b']
console.log(new Array(3).fill('a'));
//避免出现空位！

/*
* 1. 新增拓展字符:...，将数组展开！（字符串可以展开成数组）
* 2. 新增from方法，将类数组和iterator接口对象转为数组。
* 3. 新增find、findIndex方法，用于查找值（支持NAN）.
* 4. es6对于空位的处理，统一转为undefined！
* */
