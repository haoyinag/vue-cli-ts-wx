// TypeScript赋予被声明的变量拥有类型定义的能力
// 相比于Javascirpt，ts的第一大特点就是使得被声明的变量在编译阶段就拥有了类型检查的功能。
// 定义了类型的变量在改变值的时候如果类型不一致，就会报错。

/**
 * 基础类型
 *  number string boolean Aarray T enum any void null/undefined never 类型断言
 */

/** 别名 */
// type Name = string;
// type GetName = (name: Name) => string;
// // const ge  = new GetName('哈哈') //“GetName”仅表示类型，但在此处却作为值使用。
// function getName(name: Name): GetName {
//   let res = "Hello " + name;
//   return () => res;
// }

//--------------------------------------------------------------------

/** 类 class */
// class Cloth {
//   size: number;
//   color: string;
//   constructor(size: number, color: string) {
//     /** this 指向 new 后的实例对象 */
//     this.size = size;
//     this.color = color;
//   }
//   readonly name: string = "T-Shirt";
//   /** 类定义的方法会被挂在圆形链__proto__上 */
//   sellTo(to: string) {
//     return "Is was sold to " + to;
//   }
// }
// const cloth = new Cloth(18, "pink");
// console.log(cloth); // {name: "T-Shirt",size:18,color:'pink,__proto__:...}
/** 类的继承 */
// class Obja {
//   nameA: string;
//   /** 如果当前的 class 被继承 extends ，必须要有构造函数给被继承的属性赋值 */
//   constructor(nameA: string) {
//     this.nameA = nameA;
//   }
// }
// class Objb extends Obja {
//   nameB: string;
//   /** 派生类的构造函数必须包含 "super" 调用。 */
//   constructor(props: any) {
//     super(props);
//     // 如果不给初始值，就要在构造函数中赋予初始值
//     this.nameB = "B";
//   }
// }
// const b = new Objb("b");
// b.nameA = "A";
// console.log(b); // {nameA: "A",nameB: "B"}
//--------------------------------------------------------------------

/** 接口 interface */
// interface Fruit {
//   name: string;
//   color: string;
// }
// const per = new Fruit() // 报错：“Fruit”仅表示类型，但在此处却作为值使用。
// const apple: Fruit = {
//   name: "apple",
//   color: "pink"
// };

//--------------------------------------------------------------------

/**
 * 接口的 interface 继承 extends
 *    继承同样使用于 class 以及 interface
 */
// interface Orange extends Fruit {
//   price: number;
// }
// const orange: Orange = {
//   name: "apple",
//   color: "pink",
//   price: 3.33
// };

//--------------------------------------------------------------------

/**
 * 枚举--enum
 * 1、数字枚举的声明可以分为两大类，带有初始化器和不带初始化器
 *    01-不带初始化器，枚举成员默认从 0 开始，依次递增；
 *    02-带有初始化器，这种又可以分为两种：
 *        02-01-使用初始化器并指定初始化的常数，
 *        02-02-使用初始化器并且初始化值是对已经声明的枚举的枚举成员的引用
 * 2、字符串枚举需使用字符串字面量或者之前定义的字符串枚举成员来初始化
 * */

/** 1-01 */
// enum NumEnum1 {
//   one,
//   two
// }
// NumEnum1.one; // 0
// NumEnum1.two; // 1
/** 1-02  */
// 1-02-01 未使用初始化器的成员取值是在上一个成员的基础上 +1；
// enum NumEnum2 {
//   one = 10,
//   two ,
//   three = 20,
//   four
// }
// NumEnum2.two // 11
// NumEnum2.four // 21
// 1-02-02 使用初始化器并且初始化值是对已经声明的枚举的枚举成员的引用
// enum NumEnum3 {
//   one = NumEnum2.four,
//   two
// }
// NumEnum3.one // 21
// NumEnum3.two // 22
/** 2- */
// enum Str {
//   one = "one",
//   two = "two",
// }
// const boolean: true | false = Str["one"] === "one";
// console.log(boolean); // true
// const arr: string[] = [Str.one, Str.two];
// console.log(arr); //one two

//--------------------------------------------------------------------

/** 任意类型
 * 1、readonly： 只读参数，声明后不可更改
 * 2、?： 可选参数，跟·任意数量的任意属性·冲突
 * 3、[prop: string]： 任意数量的任意属性，
 *                  字段只能是number或string；
 *                  跟只读、可选属性冲突；
 *                  任意数量的任意属性，只能有一个。
 */
// interface Animal {
//   color: string; // 必填参数
//   // readonly age: number; // 只读参数，声明后不可更改
//   // from?: string; // 可选参数
//   [prop: string]: string; // 任意数量的任意属性，字段只能是number或string，跟只读、可选属性冲突
//   // [prop2: number]: string; // 任意数量的任意属性，只能有一个，所以当前的不生效
// }
// const cat: Animal = {
//   color: "black",
//   from: "china" //  任意参数之一，
//   // age: 3, //会报错，因为上面定义的任意参数的类型是string
// };

//--------------------------------------------------------------------

/** 类型断言 as
 * 多余参数使用断言可以越过类型检查
 */
// interface Data {
//   a: string;
//   b: number;
// }
// function test(params: Data) {
//   console.log(params);
// }
// test({ a: "123", b: 123, c: 123 } as Data); // 多余参数使用断言越过类型检查
// test({ a: "123", b: 123, c: '123' }); //报错，因为属性c不在接口Data中

//--------------------------------------------------------------------

/**
 * 函数类型
 * 参数类型：返回值类型
 */
// interface Fn {
//   (prop: number): string;
// }
// function fn({ a, b, c }): Fn {
//   return a + b + c;
// }
// interface Params {
//   get: string;
//   post: string;
// }
// /** 使用一 */
// const fn1 = (params: Params): string => {
//   return params.get + params.post;
// };
// /** 使用二 */
// const fn2: (num: Params) => string = (params: Params) => {
//   return params.get + params.post;
// };

// /** 默认值 */
// const fn3: (num: Params) => string = ({
//   // get = 1, 报错，类型必须是string
//   get = "Hello ",
//   post = "world",
// }: Params) => {
//   return get + post;
// };
// interface Params2 extends Params {
//   result: string | number;
// }
// 报错，因为Params2的域大于Params，多余的类型result无法检测
// const fn4: (p: Params) => string = (params: Params2) => {
//   return params.get + params.post;
// };
// const fn4: (p: Params2) => string = (params: Params) => {
//   // 报错，因为Params的域小于Params2，类型result在Params上不存在
//   return params.get + params.post + params.result;
// };
/** 剩余参数：rest 参数只能是最后一个参数（rest可以写成其他变量） */
// const fn4: (p: Params2) => string = ({ get = "Hello", ...rest }: Params2) => {
//   return get + rest.post + rest.result;
// };

// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//   if (typeof x === "number") {
//     return Number(
//       x
//         .toString()
//         .split("")
//         .reverse()
//         .join("")
//     );
//   } else if (typeof x === "string") {
//     return x
//       .split("")
//       .reverse()
//       .join("");
//   }
// }
