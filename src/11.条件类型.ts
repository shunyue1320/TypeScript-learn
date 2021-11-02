console.log('条件类型 -------------------------------')

// 1. 条件类型基本使用

// 可以使用extends关键字和三元表达式，实现条件判断
interface Fish {
  name1: string
}
interface Water {
  name2: string
}
interface Bird {
  name3: string
}
interface Sky {
  name4: string
}
type Condition<T> = T extends Fish ? Water : Sky;
// let con0: Condition<Water> = { name2: '水' } // error: Type '{ name2: string; }' is not assignable to type 'Sky'.
let con1: Condition<Fish> = { name2: '水' }



// 2. 条件类型分发
let con2: Condition<Fish|Bird> = { name2: '水' } // 这里会用每一项依次进行分发,最终采用联合类型作为结果
// 等价于:
type c1 = Condition<Fish>;
type c2 = Condition<Bird>;
type c = c1 | c2


// 3. 内置条件类型

// Exclude排除类型
type Exclude<T, U> = T extends U ? never : T;
type MyExclude = Exclude<'1' | '2' | '3', '1' | '2'> // type MyExclude = "3"

// Extract抽取类型 取交集
type Extract<T, U> = T extends U ? T : never;
type MyExtract = Extract<'1' | '2' | '3', '1' | '2'> // type MyExtract = "1" | "2"

// NoNullable 非空检测
type NonNullable<T> = T extends null | undefined ? never : T
type MyNone = NonNullable<'a' | null | undefined> // type MyNone = "a"



// 4. infer类型推断

// ReturnType返回值类型
function getUser(a: number, b: number) {
  return { name: 'zf', age: 10 }
}
type ReturnType<T> = T extends (...args: any) => infer R ? R : never
type MyReturn = ReturnType<typeof getUser> // type MyReturn = { name: string; age: number; }


// Parameters 参数类型
type Parameters<T> = T extends (...args: infer R) => any ? R : any;
type MyParams = Parameters<typeof getUser>; // type MyParams = [a: number, b: number]


// ConstructorParameters 构造函数参数类型
class Person {
  constructor(name: string, age: number) { }
}
type ConstructorParameters<T> = T extends { new(...args: infer R): any } ? R : never
type MyConstructor = ConstructorParameters<typeof Person> // type MyConstructor = [name: string, age: number]


// InstanceType 实例类型
type InstanceType<T> = T extends { new(...args: any): infer R } ? R : any
type MyInstance = InstanceType<typeof Person> // type MyInstance = Person



// 5. infer实践

// 将数组类型转化为联合类型
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TupleToUnion = ElementOf<[string, number, boolean]>; // type TupleToUnion = string | number | boolean


// 将两个函数的参数转化为交叉类型
type T1 = { name: string };
type T2 = { age: number };
type ToIntersection<T> = T extends ([(x: infer U) => any, (x: infer U) => any]) ? U : never;
type t3 = ToIntersection<[(x:T1)=>any,(x:T2)=>any]> // type t3 = T1 & T2
// 表示要把T1、T2赋予给x，那么x的值就是T1、T2的交集。（参数是逆变的可以传父类）
// TS的类型：TS主要是为了代码的安全性来考虑。所以所有的兼容性问题都要从安全性来考虑!




export default {}