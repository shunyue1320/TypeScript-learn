console.log('装包和拆包 -------------------------------')

// 1. unknown类型
// unknown类型，任何类型都可以赋值为unknown类型。 它是 any 类型对应的安全类型
let unknown:unknown;
unknown = 'zf';
unknown = 11;
// 不能访问unknown类型上的属性，不能作为函数、类来使用


// 联合类型中的unknown
type UnionUnknown = unknown | null | string | number // type UnionUnknown = unknown
// 联合类型与unknown都是unknown类型


//交叉类型中的unknown
type inter = unknown & null // type inter = null
// 交叉类型与unknown都是其他类型




// 2. unknown特性
// never是unknown的子类型
type isNever = never extends unknown ? true : false; // type isNever = true

// keyof unknown 是never
type key = keyof unknown; // type key = never

// unknown类型不能被遍历
type IMap<T> = {
  [P in keyof T]:number
}
type t = IMap<unknown>; // type t = {}
// unknown类型不能和number类型进行 +运算,可以用于等或不等操作










export default {}