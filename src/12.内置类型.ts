console.log('内置类型 -------------------------------')

// 1. Partial转化可选属性
interface Company {
  num: number
}
interface Person {
  name: string,
  age: string,
  company: Company
}
type PartialPerson = Partial<Person>; // type PartialPerson = { name?: string | undefined; age?: string | undefined; company?: Company | undefined; }
// Partial实现原理
// type Partial<T> = { [K in keyof T]?: T[K] }; 
// 注意：Partial 遍历所有的属性将属性设置为可选属性,但是无法实现深度转化!

// 手写一个深度转化的 Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
type DeepPartialPerson = DeepPartial<Person>;



// 2. Required转化必填属性
interface Company2 {
  num: number
}
interface Person2 {
  name: string,
  age: string,
  company: Company2
}
type PartialPerson2 = Partial<Person2>;
// Required 源码如下
// type Required<T> = {[K in keyof T]-?:T[K]}    // -? 就是将 ?: 的 ? 去掉, 也就是将“选填” 变成 “必填”
type RequiredPerson2 = Required<PartialPerson2>  // 将所有的属性转化成必填属性
// type RequiredPerson2 = {
//   name: string;
//   age: string;
//   company: Company2;
// }



// 3. Readonly 转化仅读属性
type Readonly<T> = { readonly [K in keyof T]: T[K] } // Required 源码
type RequiredPerson = Readonly<Person>
// RequiredPerson 类型如下
// type RequiredPerson = { // 将所有属性变为仅读状态
//   readonly name: string;
//   readonly age: string;
//   readonly company: Company;
// }




// 4. Pick 挑选所需的属性
type Pick<T, U extends keyof T> = { [P in U]: T[P] } // Pick 源码
type PickPerson = Pick<Person, 'name' | 'age'> // 在已有类型中挑选所需属性



// 5. Record记录类型
type Record<K extends keyof any, T> = { [P in K]  : T }
let person: Record<string, any> = { name: '456', age: 11 };

// 实现map方法，我们经常用record类型表示映射类型
function map<T extends keyof any, K, U>(obj: Record<T, K>, callback: (item: K, key: T) => U) {
  let result = {} as Record<T, U>
  for (let key in obj) {
      result[key] = callback(obj[key], key)
  }
  return result
}
const r = map({ name: '456', age: 11 }, (item, key) => {
  return item
});



// 6. Omit忽略属性
let person2 = {
  name: '123',
  age: 11,
  address: '456'
}
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> // Omit 源码
type OmitAddress = Omit<typeof person2, 'address'> // type OmitAddress = { name: string; age: number; }



export default {}