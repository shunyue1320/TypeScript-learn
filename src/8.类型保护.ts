console.log('类型保护 -------------------------------')
// 通过判断识别所执行的代码块，自动识别变量属性和方法

// 1. typeof 类型保护
function double(val: number | string) {
  if (typeof val === 'number') {} else {}  // val 类型是 number
}



// 2. instanceof 类型保护
class Cat {}
class Dog {}
const getInstance = (clazz: { new(): Cat | Dog}) => {
  return new clazz()
}
let r = getInstance(Cat)
if (r instanceof Cat) {} else {} // 是 Cat 的实例



// 3. in 类型保护
interface Fish {
  swiming: string
}
interface Bird {
  fly: string,
  leg: number
}
function getType(animal: Fish | Bird) {
  if ('swiming' in animal) {} else {} // animal 内存在 'swiming' 的键值
}



// 4. 可辨识联合类型
interface WarningButton {
  class: 'warning'
}
interface DangerButton {
  class: 'danger'
}
function createButton(button: WarningButton | DangerButton) {
  if (button.class == 'warning') {} else {}
}



// 5. null 保护
const addPrefix = (num?: number) => {
  num = num || 1.1;
  function prefix(fix: string) {
      return fix + num?.toFixed() // 这里要注意的是ts无法检测内部函数变量类型
  }
  return prefix('123');
}
console.log(' null 保护', addPrefix());



// 6. 自定义类型保护
interface Fish2 {
  swiming: string,
}
interface Bird2 {
  age: number,
}
function isBird(animal: Fish2 | Bird2):animal is Bird2 {
  return 'swiming' in animal
}
function getAnimal(animal: Fish2 | Bird2) {
  if (isBird(animal)) {
    console.log('是 Bird2', animal)
  } else {
    console.log('是 Fish2', animal)
  }
}
let fish2: Fish2 = { swiming: '123' }
let bird2: Bird2 = { age: 11 }
console.log('6. 自定义类型保护', getAnimal(fish2))
console.log('6. 自定义类型保护', getAnimal(bird2))



// 7. 完整性保护
interface ICircle {
  kind: 'circle',
  r: number
}
interface IRant {
  kind: 'rant',
  width: number,
  height: number
}
interface ISquare {
  kind: 'square',
  width: number
}
type Area = ICircle | IRant | ISquare
const isAssertion = (obj: never) => { }
const getArea = (obj: Area) => {
  switch (obj.kind) {
      case 'circle':
          return 3.14 * obj.r ** 2
      case 'rant':
        return 3.14 * obj.height ** 2
      case 'square':
        return 3.14 * obj.width ** 2
      default:
          return isAssertion(obj); // 必须实现所有逻辑
  }
}




export default {}