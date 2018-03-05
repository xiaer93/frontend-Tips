/* *
 * Created by winack on 2018/3/5 
 */
/*
* 数值的扩展
* */

//新增二进制、八进制表示
console.log(0b111110111 === 503); // 二进制
console.log(0o767 === 503); // 八进制
console.log(0x1f7===503);//十六进制
//Number(503).toString(16)

//新提供了Number.isFinite()和Number.isNaN()两个方法。Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

//ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// ES6的写法
Number.parseInt('12.34'); // 12
Number.parseFloat('123.45#'); // 123.45

//新增Number.isInteger()用来判断一个数值是否为整数。如果参数不是数值，Number.isInteger返回false。
Number.isInteger(25.1);//false
Number.isInteger(25.0); // true
//判断前不会自动发生类型转换
Number.isInteger(); // false
Number.isInteger(null); // false
Number.isInteger('15'); // false
Number.isInteger(true); // false

//新增极小值：Number.EPSILON
console.log(Number.EPSILON === Math.pow(2, -52));

//新增安全整数判断Number.isSafeInteger()
//JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);

//math对象上新增的方法
//Math.trunc方法用于去除一个数的小数部分，返回整数部分。对于非数值，先进行转换！
//Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
//Math.cbrt方法用于计算一个数的立方根。
//Math.hypot方法返回所有参数的平方和的平方根。

//Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
//Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
//Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

//ES2016 新增了一个指数运算符（**）。
console.log(2**2);

/**
 * 1. 新增NAN、Finite、Integer、sign等判断方法
 * 2. 新增指数运算符：**
 * 3. 新增常用数学运算公式。
 */

