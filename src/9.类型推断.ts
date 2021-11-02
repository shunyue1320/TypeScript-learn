console.log('9.类型推断 -------------------------------')

// 1. 赋值推断

// 赋值时推断，类型从右像左流动,会根据赋值推断出变量类型
let str = '123';    // let str: string
let age = 1;        // let age: number
let bool = true;    // let bool: boolean


// 2. 返回值推断

// 自动推断函数返回值类型
function sum(a: string, b: string) { // function sum(a: string, b: string): string
  return a + b;
}
sum('a','b');  // function sum(a: string, b: string): string



// 3. 函数推断

// 函数从左到右进行推断
type Sum = (a: string, b: string) => string;
const sum2:Sum = (a, b) => a + b;



// 4. 属性推断

// 可以通过属性值,推断出属性的类型
let person = {
  name1: '123',
  age1: 11
}
let { name1, age1 } = person; // let name1: string  ,  let age1: number



// 5. 类型反推

// 可以使用typeof关键字反推变量类型
type Person = typeof person
// type Person = { name1: string; age1: numbe; }



// 6. 索引访问操作符
interface IPerson {
  name:string,
  age:number,
  job:{
      address:string
  }
}
type job = IPerson['job'] // type job = { address: string; }



// 7. 类型映射
interface IPerson2 {
  name:string,
  age:number
}
// in keyof 遍历出接口的 key
type MapPerson = {[key in keyof IPerson2]:IPerson2[key]} // type MapPerson = { name: string; age: number; }



export default {}