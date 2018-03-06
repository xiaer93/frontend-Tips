/* *
 * Created by winack on 2018/3/6 
 */

/*
* 模块
* CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
* ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
* */

//ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

//es6加载模块。编译时加载，在编译时就完成加载，只加载了3个方法！
// import { stat, exists, readFile } from 'fs';
//1、es6模块自动采用严格模式
    // 变量必须声明后再使用
    // 函数的参数不能有同名属性，否则报错
    // 不能使用with语句
    // 不能对只读属性赋值，否则报错
    // 不能使用前缀 0 表示八进制数，否则报错
    // 不能删除不可删除的属性，否则报错
    // 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
    // eval不会在它的外层作用域引入变量
    // eval和arguments不能被重新赋值
    // arguments不会自动反映函数参数的变化
    // 不能使用arguments.callee
    // 不能使用arguments.caller
    // 禁止this指向全局对象
    // 不能使用fn.caller和fn.arguments获取函数调用的堆栈
    // 增加了保留字（比如protected、static和interface）
//2、通过export命令输出变量
    // export var firstName = 'Michael';
    // export var lastName = 'Jackson';
    // export var year = 1958;
    //export {firstName, lastName, year};
    //还可以输出函数或者类：export function abs(){}
    //还可以通过as指令，重命名关键字 export {a as abs}
//3、export命令输出的是对外接口
    // 报错   export 1;
    // 报错   var m = 1;export m;
    //报错    function f(){};export f;
    //更正    export var m=1;
    //更正    export {m}
    //更正    export {f}
//4、export输出的接口，与对应的值是动态绑定关系！（通过接口可以取到模块内部的实时值！）
//5、import导入模块
    // import { lastName as surname } from './profile.js';
    //import命令输入的变量都是只读的，因为它的本质是输入接口。
    //import命令具有提升效果，会提升到整个模块的头部
    //import是静态执行，所以不能使用表达式和变量，或者在逻辑结构内。//报错：import { 'f' + 'oo' } from 'my_module'; import { foo } from module;
//6、模块可以整体加载
    //import * as circle from './circle';将所有东西都加载到circle对象上！
//7、指定模块默认输出，在加载模块时可以指定任意名称！
    //export default命令用于指定模块的默认输出
    //import crc32 from 'crc32'; // 输入
    //export default var a = 1;错误，改为：export default a;（export default a的含义是将变量a的值赋给变量default）
//8、export和import可以联合使用！
    //export { foo, bar } from 'my_module';
//9、模块之间的继承
    // export * from 'circle';将circle模块内容又输出！
//10、通过创建constant.js文件，使得其他文件能够共用其内部常量！
//11、通过设置type属性，加载es6模块
    //<script type="module" src="./foo.js"></script>

//commonJS加载模块
//1、commonJS与es6模块的区别
    // CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    // CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
    //export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
//2、nodejs通过commonJS加载模块，也支持es6方式
    //module.exports = {foo: 'hello', bar: 'world'};
    // let { stat, exists, readFile } = require('fs');
//3、循环加载的处理方式
    // CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。
    //var a = require('a'); // 安全的写法。a.foo是最新的值！
    //var foo = require('a').foo; // 危险的写法。foo为已经加载的旧值！