console.log('接口 -------------------------------')
// 1. 函数接口参数
// 没有接口的写法
const fullName = ({firstName,lastName}: {firstName:string,lastName:string}): string => {
  return firstName + lastName
}
// 接口写法：使用接口约束函数中的参数，但是类型无法复用
interface IFullName {
  firstName: string,
  lastName: string
}
const fullName2 = ({firstName,lastName}: IFullName): string => { // : string 函数返回类型需要手写
  return firstName + lastName
}


// 2. 函数类型接口
interface IFullName3 {
  firstName: string,
  lastName: string
}
interface IFn { // 通过接口限制函数的参数类型和返回值类型
  (obj:IFullName3):string // 函数参数：函数返回类型
}
const fullName3:IFn = ({firstName,lastName}) => {
  return firstName + lastName
}
console.log("2. 函数类型接口", fullName3);


// 3. 函数混合类型
interface ICounter {
  (): number;   // 限制函数返回类型
  count: 0      // 限制函数上的属性
}
let fn: any = () => {
  fn.count++;
  return fn.count;
}
fn.count = 0;
let counter:ICounter = fn;
console.log("3. 函数混合类型", counter());



// 4. 对象接口
// 对象接口可以用来描述对象的形状结构
interface IVegetables {
  readonly color: string, // readOnly 标识的属性则不能修改
  size: string
}
interface IVegetables { // 多个同名的接口会自动合并
  age?: number, // ?: 标识的属性为可选属性
  taste: 'sour' | 'sweet'
}
const tomato: IVegetables = {
  color:'red',
  size:'10',
  taste:'sour'
}
// tomato.color = 'green'; // Cannot assign to 'color' because it is a read-only  仅读属性不能进行修改
console.log("4. 对象接口 tomato", tomato);

// 多个同名的接口会自动合并
const tomato2: IVegetables = {
  color:'red',
  size:'10',
  taste:'sour',
  type:'蔬菜'     // error: 不可分配给类型“IVegetables”。对象字面量只能指定已知属性，并且类型“IVegetables”中不存在“type”。
} as IVegetables; // 多余的属性可以使用类型断言 就不会报以上错误
console.log("4. 对象接口 tomato2", tomato2);


// 5. 任意属性、可索引接口
interface Person {
  name: string;
  [key: string]: any
}
let p: Person = {
  name: '123',
  age: 10,
  [Symbol()]: '321'
}
console.log("5. 任意属性、可索引接口", p);
// 任意属性可以对某一部分必填属性做限制，其余的可以随意增减
interface IArr {
  [key: number]: any
}
let p2: IArr = {
  0:'1',1:'2',3:'3'
}
let arr:IArr = [1,'d','c']; 
// 可索引接口可以用于标识数组
console.log("5. 任意属性、可索引接口", p2, arr);


// 6. 类接口
// 这里先来强调一下抽象类和接口的区别,抽象类中可以包含具体方法实现。接口中不能包含实现
interface Speakable {
  name:string;
  speak():void; // 接口中不能包含实现
}
interface ChineseSpeakable{
  speakChinese():void
}
// 抽象类中可以包含具体方法实现
class Speak implements Speakable, ChineseSpeakable { //  implements 实现 Speakable, ChineseSpeakable 接口
  name!:string
  speak(){}
  speakChinese(){}
}
// 个类可以实现多个接口，在类中必须实现接口中的方法和属性
console.log("6. 类接口", new Speak);


// 7. 接口继承
interface Speakable2 {
  speak():void
}
interface SpeakChinese extends Speakable2 {
  speakChinese():void
}
class Speak2 implements SpeakChinese {
  speakChinese(): void {
      throw new Error("Method not implemented.");
  }
  speak(): void {
      throw new Error("Method not implemented.");
  }
}
console.log("7. 接口继承", new Speak2())


// 8. 构造函数类型
interface Clazz {
  new (name:string):any
}
function createClass(target:Clazz,name:string){
  return new target(name); // 传入的是一个构造函数
}
class Animal {
  constructor(public name:string){
      this.name = name;
  }
}
let r = createClass(Animal,'Tom'); // let r: any 这里无法标识返回值类型

// 标识返回值类型写法如下： （通过泛型实现）
interface Clazz2<T> {
  new(name: string): T
}
function createClass2<T>(target: Clazz2<T>, name: string):T {
  return new target(name)
}
class Animal2 {
  constructor(public name: string) {
      this.name = name;
  }
}
let r2 = createClass2(Animal2, 'Tom'); // let r2: Animal2
// new() 表示当前是一个构造函数类型,这里捎带使用了下泛型。 在使用 createClass 时动态传入类型
console.log('8. 构造函数类型', r, r2)


export default {}
