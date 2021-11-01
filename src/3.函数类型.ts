
console.log('函数类型 -------------------------------')

// 1. 函数的两种声明方式
// 通过function关键字来进行声明
function sum1(a: string, b: string):string { // 返回 string
  return a+b;
}
sum1('a','b')

// 通过表达式方式声明
type Sum = (a1: string, b1: string) => string;
let sum2: Sum = (a: string, b: string) => {
    return a + b;
};
sum2('a','b')


// 2. 可选参数
let sum3 = (a: string, b?: string):string => { // ?:
  return a + b;
};
sum3('a'); // 可选参数必须在其他参数的最后面



// 3. 默认参数
let sum4 = (a: string, b: string = 'b'): string => {
  return a + b;
};
sum4('a'); // 默认参数必须在其他参数的最后面


// 4. 剩余参数
const sum = (...args: string[]): string => {
  console.log(' 4. 剩余参数', args)
  return args.reduce((memo, current) => memo += current, '')
}
sum('a', 'b', 'c', 'd')
// sum(1, 'a', 'b', 'c', 'd') // Argument of type 'number' is not assignable to parameter of type 'string'.


// 5. 函数的重载
function toArray(value: number): number[] // 参数是数字 则返回 数字
function toArray(value: string): string[] // 参数是字符串 则返回 字符串
function toArray(value: number | string) {
  if (typeof value == 'string') {
    return value.split('');
  } else {
    return value.toString().split('').map(item => Number(item));
  }
}
toArray(123) // 根据传入不同类型的数据 返回不同的结果
toArray("123")


export default {}
