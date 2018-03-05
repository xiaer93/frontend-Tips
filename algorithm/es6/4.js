/* *
 * Created by winack on 2018/3/5 
 */
/*
* 正则表达式扩展
* */

//1. 字符串的match、replace、search、split都调用RegExp对象的方法！

//新增u模式，用以处理4字节的Unicode编码!
/^\uD83D/u.test('\uD83D\uDC2A'); // false
/^\uD83D/.test('\uD83D\uDC2A'); // true

var s = '𠮷';
/^.$/.test(s); // false
/^.$/u.test(s); // true

//新增y修饰符，类似于g修饰符。但是y修饰符确保匹配必须从剩余的第一个位置开始!(y模式要求必须在lastIndex指定的位置发现匹配)
var ss = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(ss); // ["aaa"]
r2.exec(ss); // ["aaa"]

r1.exec(ss); // ["aa"]
r2.exec(ss); // null

//y模式常用于提取词元
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4');
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4');
// [ '3', '+', '4' ]
tokenize(TOKEN_Y, '3x + 4');
// [ '3' ]
tokenize(TOKEN_G, '3x + 4');
// [ '3', '+', '4' ]
function tokenize(TOKEN_REGEX, str) {
    let result = [];
    let match;
    while (match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
    }
    return result;
}

//新增sticky属性，表示是否设置了y模式！
//新增source属性，返回正则表达式正文
//新增flags属性，返回修饰符：'gi'

//引入s修饰符，使得.可以匹配任意单个字符。
//点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（如\r\n等）

//先行断言
/\d+(?=%)/.exec('100% of US presidents have been male');  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them');                 // ["44"]
//后行断言
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill');  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90');                // ["90"]

//新增具名组匹配
//如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31

/*
* 1. 新增u修饰符，可以匹配4字节字符；
* 2. 新增y修饰符，类似于g修饰符，但是要求lastIndex必须匹配上！
* 3. 新增s修饰符，使点号可以匹配上终止符（\r\n等）
* 4. 新增后行断言：/(?<=\$)\d+/；   先行断言/\d+(?=%)/
* 5. 新增具名组匹配：/(?<year>\d{4})/。从而可以使用具名引用/\k<year>/.
* */