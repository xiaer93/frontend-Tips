/* *
 * Created by winack on 2018/3/6 
 */
/*
* 编程风格
* */

//let 取代 var，let不存在变量提升，是块级作用域
//在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。
//字符串使用单引号或者反引号
//使用数组成员对变量赋值时，优先使用解构赋值。const [first, second] = arr;
//函数的参数如果是对象的成员，优先使用解构赋值。const { firstName, lastName } = obj;
//单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
//对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。const a = { x: null };a.x = 3;
//使用扩展运算符（...）拷贝数组。使用 Array.from 方法，将类似数组的对象转为数组。
//立即执行函数可以写成箭头函数的形式。（绑定了this）
//不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。
//使用默认值语法设置函数参数的默认值。
//如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
//总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
//使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。
//Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。
//如果模块只有一个输出值，就使用export default，如果模块有多个输出值，就不使用export default，export default与普通的export不要同时使用。

//ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。



//