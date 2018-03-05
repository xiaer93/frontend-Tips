/* *
 * Created by winack on 2018/3/5 
 */
/*
* 字符串的扩展！
* */
//对于Unicode双字节的支持
console.log("\uD842\uDFB7");
console.log("\u{20BB7}");
//字符z的6中表示方法
// '\z' === 'z'  // true
// '\172' === 'z' // true
// '\x7A' === 'z' // true
// '\u007A' === 'z' // true
// '\u{7A}' === 'z' // true

var s = "𠮷";
console.log(s.length);//2
s.charAt(0);// ''
s.charAt(1);// ''
s.charCodeAt(0);// 55362
s.charCodeAt(1);// 57271
//新增codePointat方法
s.codePointAt(0);// 134071
s.codePointAt(1);// 57271
//打印字符串字符编码！
let ss = '𠮷a';
for (let ch of ss){//新增遍历方法，可以自动识别4字节字符！
    console.log(ch.codePointAt(0).toString(16));
}
//判断2字节，还是4字节
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

//新增fromCodePoint方法，fromCharCode只支持2字节字符！
console.log(String.fromCodePoint(0x20BB7));

//新增includes（是否包含）、startswith（是否在头部）、endswith（是否在尾部）、indexof（找索引）
//新增repeat方法。负数和NAN等同于0
console.log('hello'.repeat(2));

//新增padStart、padEnd字符补全
console.log('x'.padEnd(5,'ab'));

//新增模版字符串
let name='xiaocheng';
let time='today';
console.log(`Hello ${name},how are you ${time}`);
console.log('Hello '+name+',how are you '+time);
//大括号内可以为任意js表达式，甚至可以为函数！
console.log(`${name+time}`);

//标签模版
let a = 5;
let b = 10;
//tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
//tag(['Hello ', ' world ', ''], 15, 50);//第一个参数有一个raw属性，保存着转以后的字符串！

//标签模版
function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
        let arg = String(arguments[i]);

        // Escape special characters in the substitution.
        s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Don't escape special characters in the template.
        s += templateData[i];
    }
    return s;
}
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
console.log(message);//转以后的安全字符！

// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack');// "Hello Jack!"

//新增String.raw方法！获取字符串转义后的字符串。如：\n=>\\n




/*
* 1. String新增对Unicode 4字节字符的支持，如\u{20BB7}、codePointAt、fromCodePoint、at等方法
* 2. 新增include、startswith等查找方法，新增padEnd等补全字符方法，新增repeat等构造字符串方法！
* 3. 新增模版字符串：`hello ${name}`    。常用于创建html组件？
* 4. 新增标签模版：function`hello ${name}`     。常用于html字符串过滤等？
* */