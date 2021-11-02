console.log('泛型 -------------------------------')

// 1. 指定函数参数类型
// 单个泛型
const getArray = <T>(times:number, val:T): T[] => {
  let result:T[] = []
  for (let i = 0; i < times; i++) {
    result.push(val)
  }
  return result
}
console.log('单个泛型', getArray(6,6))

// 多个泛型
function swap<T, K>(tuple: [T, K]): [K, T] {
  return [tuple[1], tuple[0]]
}
console.log('多个泛型', swap([1,'a']))



// 2. 函数标注的方式
// 类型别名 (实现如下)
type TArray = <T, K>(tuple: [T, K]) => [K, T]; // 可以使用类型别名，但是类型别名不能被继承和实现。一般联合类型可以使用类型别名来声明
const getArray2:TArray = (tuple) => {
  // return [tuple[1], tuple[1]] // error: Call signature return types '[K, K]' and '[K, T]' are incompatible.
  return [tuple[1], tuple[0]]
}
console.log('类型别名', getArray2([1,'a']))

// 接口 (实现如下) ****能使用interface尽量使用interface****
interface TArray2{
  <T,K>(typle:[T,K]):[K,T]
}
const getArray3:TArray2 = (tuple) => {
  // return [tuple[1], tuple[1]] // error: Type '[K, K]' is not assignable to type '[K, T]'.
  return [tuple[1], tuple[0]]
}
console.log('接口', getArray3([1,'a']))



// 3. 泛型接口使用
interface ISum<T> { // 这里的 T 是使用接口的时候传入
  <U>(a: T, b: T): U   // 两参数类型相同， 返回类型不是参数类型  这里的U是调用函数的时候传入
}
let sum2: ISum<number> = (a:number,b:number) => {
  return a as any
}
console.log('3. 泛型接口使用', sum2(1, 2))



// 4. 默认泛型
interface T2<T=string> { // 默认泛型为 string
  name:T
}
type T22 = T2;
let name1:T22 = { name: '小米' }
console.log('4. 默认泛型', name1)



// 5. 类中的泛型

// 创建实例时提供类型
class MyArray<T>{ // T => number
  arr: T[] = [];
  add(num: T) {
    this.arr.push(num);
  }
  getMaxNum(): T {
    let arr = this.arr
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      current > max ? max = current : null
    }
    return max;
  }
}
let myArr = new MyArray<number>();
myArr.add(3);
myArr.add(1);
myArr.add(2);
console.log(myArr.getMaxNum());

// 校验构造函数类型
const createClass = <T>(clazz: new(name:string,age:number)=>T):T =>{
  return new clazz('a',1);
}
class Person {
  name: string
  age: number
  constructor(name:string, age:number) {
    this.name = name
    this.age = age
  }
}
console.log("校验构造函数类型", createClass<Person>(Person))



// 6. 泛型约束

// 泛型必须包含某些属性
interface IWithLength {
  length: number
}
function getLen<T extends IWithLength>(val: T) {
  return val.length
}
const sum = <T extends number>(a:T, b:T): T => {
  // return a + b // Type 'number' is not assignable to type 'T'.
  return (a + b) as T
}
console.log('泛型必须包含某些属性', getLen('hello'), sum(1,2))


// 返回泛型中指定属性
const getVal = <O, K extends keyof O>(obj:O, key:K) => {
  return obj[key]
}
console.log('返回泛型中指定属性', getVal({a:1}, 'a'))





export default {}
