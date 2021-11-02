console.log('交叉类型 -------------------------------')

// 1. 交叉类型(Intersection Types)是将多个类型合并为一个类型
interface Person1 {
  handsome: string,
}
interface Person2 {
  high: string,
}
type P1P2 = Person1 & Person2;
let p: P1P2 = { handsome: '帅', high: '高' }




// 2. 交叉泛型
function mixin<T, K>(a: T, b: K): T & K {
  return { ...a, ...b }
}
const x = mixin({ name: 'zf' }, { age: 11 })



// 2. 交叉接口
interface IPerson1 {
  name: string,
  age: number
}

interface IPerson2 {
  name: number,
  age: number
}

type person = IPerson1 & IPerson2 //  name 既是 string 又是 number 所以只能是 never
let name!: never // never 代表不会出现的值
let person1: person = { name, age: 22 }





export default {}