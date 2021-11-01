// 1. 类型推导 -------------------------------
console.log('类型推导 -------------------------------')

// 声明变量没有赋予值时默认变量是any类型
let name;    // let name: any
name = '123' // let name: any
name = 10    // let name: any

// 声明变量赋值时则以赋值类型为准
let name1 = '123'; // let name1: string
// name1 = 10 // Type 'number' is not assignable to type 'string'.
console.log('1. 类型推导', name, name1)


// 2. 包装对象 -------------------------------
// 我们在使用基本数据类型时，调用基本数据类型上的方法，默认会将原始数据类型包装成对象类型
let bool1:boolean = true
let bool2:boolean = Boolean(1)
let bool3:object = new Boolean(2) // boolean是基本数据类型 , Boolean是他的封装类
console.log('2. 包装对象', bool1, bool2, bool3)


// 3. 联合类型 -------------------------------
// 在使用联合类型时，没有赋值也能访问联合类型中共有的方法和属性
let value: string | number // 联合类型
// console.log('3. 联合类型', value!.toString()) // 公共方法
value = 10
console.log('3. 联合类型', value!.toFixed(2)) // number方法
value = '123'
console.log('3. 联合类型', value!.toLowerCase()) // 字符串方法
// value!. 表示 value 一定有值


// 4. 类型断言 -------------------------------
let name3: string | number;
// (name3! as number).toFixed(2); // 1.强制
// ((<number>name3!).toFixed(2)); // 2. 泛型方式强制
// 尽量使用第一种类型断言因为在react中第二种方式会被认为是jsx语法

// 双重断言
let name4: string | boolean;
((name4! as any) as string); // 尽量不要使用双重断言，会破坏原有类型关系，断言为any是因为any类型可以被赋值给其他类型
console.log('4. 类型断言')

// 5. 字面量类型 -------------------------------
type Direction = 'Up' | 'Down' | 'Left' | 'Right'; // 只能是这4个值
let direction:Direction = 'Down';
console.log('5. 字面量类型', direction)
// 可以用字面量当做类型，同时也表明只能采用这几个值（限定值）。类似枚举。

export default {}
