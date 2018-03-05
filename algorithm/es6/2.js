/* *
 * Created by winack on 2018/3/5 
 */
/*
* 解构！
* */

//从数组和对象中提取值，对变量进行赋值，这被称为解构
let [a,b,c]=[1,2,3];
console.log(a,b,c);//1,2,3
//
let [,,foo]=[1,2,3];
console.log(foo);//3
//不完全解构也是可以的！
let [d,[[e],f]]=[1,[[2,3],4]];
console.log(d,e,f);//124
//tail获取剩余所有值，组成数组
let [head,...tail]=[1,2,3,4];
console.log(head,tail);//1,[2,3,4]
//如果结构不成功则为undefined
let [x,y,...z]=['a'];
console.log(x,y,z);//a,undefined,[]

//待解构的右侧必须具备iterator接口
/*function fib() {
    let a=0;
    let b=1;
    while (true){
        yield a;
        [a,b]=[b,a+b];
    }
}*/
//let [first,second,third]=fib();
//console.log('third:',third);

//解构赋值允许指定默认值
let [a1,a2=3]=[1];
console.log(a1,a2);//1，3

let [b1,b2=3]=[1,undefined];
console.log(b1,b2);//1，3

//传递为undefined则使用默认值，传递为null则不适用默认值！
let [c1=1,c2=2]=[undefined,null];
console.log(c1,c2);//1,null

//不仅是数组，对象也可以解构！
//变量名必须与属性名相同
let { ff, bb } = { ff: "aaa", bb: "bbb" };
console.log(ff,bb);//aaa,bbb
//如果变量名不同，则必须如下形式
let {food:gg}={food:'ccc'};
console.log(gg);//ccc
//嵌套解构
let obj={
    p:['hello',{yy:'world'}]
};
let {p,p:[xx,{yy}]}=obj;
console.log(p,xx,yy);
//对象解构也可以有默认值
//默认值生效的条件是：对象的属性值严格等于undefined！！！
let {o1=3}={};
console.log(o1);//3
let {o2,o3=2}={o2:1};
console.log(o2,o3);//1,2
let {o4:oo=5}={o4:6};
console.log(oo);//6

//如果解构失败，等于undefined
//如果嵌套解构，子对象的扶对象不存在将会报错！
//let {cc:{jj}}={ww:{jj:'cjw'}};//Cannot read property 'jj' of undefined

//字符串也可以解构赋值
const [cc1,cc2,cc3,cc4,cc5] = 'hello';
let {length:len}='hello';
console.log(len);//5

//当为对象解构时，如果右侧为基本类型，将先转换为包装类型！

//函数的参数也支持解构
function add([x,y]) {
    console.log(x+y);
}
add([1,2]);//3
//数组作为参数参与解构
[[1,2],[3,4]].map(([a,b])=> a+b);
//函数参数解构可以使用默认值
function move1({x=1,y=2}={}) {
    console.log(x,y);
}
move1({x:3});//[3,0]
move1({});//[0,0]
move1();//[0,0]
function move2({x,y}={x:0,y:0}) {
    console.log(x,y);
}
move2({x:3});//[3,undefined]
move1({});//[undefined,undefined]
move1();//[0,0]

//undefined触发默认参数
[1, undefined, 3].map((x = 'yes') => x);

//圆括号对解析的影响？？？


//用途
//1. 交换变量的值
let p1=1;
let p2=2;
[p1,p2]=[p2,p1];
//2. 从函数返回对象中提取变量
//3. 函数参数中使用
//4. 提取json数组
//5. 函数参数的默认值！
//6. 遍历map解构。for (let [key, value] of map)

/*
* 1. 数组、对象、字符串、函数参数都可以解构！
* 2. 解构形式多样，可以设置默认值，undefined触发默认值！如果解构失败则为undefined！
* 3. 对象解构必须同属性名，数组解构右侧必须有iterator接口！
* 4. 解构支持嵌套解构，应用广泛！
* */


