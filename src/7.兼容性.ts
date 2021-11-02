console.log('兼容性 -------------------------------')
// TS中的兼容性，主要看结构是否兼容。（核心是考虑安全性）

// 1. 基本数据类型的兼容性
let temp:string | number;
let num!:number;
temp = num // 包含就可以赋值
let num2:{
  toString():string
}
// console.log(num2) // error: Variable 'num2' is used before being assigned.  没赋值之前不能使用
let str:string = '123'
num2 = str
console.log("1. 基本数据类型的兼容性",num2)



// 2. 接口兼容性
interface IAnimal {
  name: string,
  age: number,
}
interface IPerson {
  name: string,
  age: number,
  address: string
}
let animal1: IAnimal
let IPerson: IPerson = {
  name: '小米',
  age: 11,
  address: '北京'
}
animal1 = IPerson // 接口的兼容性，只要满足接口中所需要的类型即可！



// 3. 函数的兼容性

// 函数的兼容性主要是比较参数和返回值
let sum1 = (a: string, b: number) => a + b
let sum2 = (a: string) => a
sum1 = sum2 // 赋值函数的参数要少于等于被赋值的函数

type Func<T> = (item: T, index: number) => void
function forEach<T>(arr: T[], cb: Func<T>) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i);
    }
}
forEach([1, 2, 3], (item) => {
    console.log(item);
});

// 对象相反
type sum3 = () => string | number
type sum4 = () => string
let fn3: sum3
let fn4!: sum4
// fn4 = fn3 // error “sum3”类型不能分配给“sum4”类型
fn3 = fn4



// 4. 函数的逆变与协变
// 函数的参数是逆变的，返回值是协变的 （在非严格模式下函数的参数是双向协变的）
class Parent {
  address: string = '123'
}
class Child extends Parent {
  money: number = 100
}
class Grandsom extends Child {
  name: string = '456';
}
type Callback = (person: Child) => Child // 接收 Child, 返回 Child
function execCallback(cb: Callback) { }
let fn = (person: Parent) => new Grandsom; // 接收 Parent, 返回 Grandsom
execCallback(fn); // 通过这个案例可以说明: 函数参数可以接收父类，返回值可以返回子类



// 5. 类的兼容性
class Perent {
  name: string = '123';
  age: number = 0
}
class Parent1 {
  name: string = '456';
  age: number = 1
}
let parent: Perent = new Parent1
// 注意: 只要有 private 或者 protected 关键字类型就会不一致;但是继承的类可以兼容
class Parent3 {
  protected name: string = '789';
  age: number = 11
}
class Child3 extends Parent3 {}
// let child:Parent3 = new Parent1 // error: 'child' 被声明，但它的值永远不会被读取。
let child3:Parent3 = new Child3



// 6. 泛型的兼容性
interface IT<T>{}
let obj1:IT<string>
let obj2!:IT<string>
// obj2 = obj1 // error: 变量 'obj1' 在分配之前使用。
obj1 = obj2



// 7. 枚举的兼容性
enum USER1 {
  role = 1
}
enum USER2 {
  role = 1
}
let user1!:USER1
let user2!:USER2
// user1 = user2 // error: Type 'USER2' is not assignable to type 'USER1'.



export default {}
