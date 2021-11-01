console.log('类 -------------------------------')
// 1. TS中定义类
class Pointer{
  x!:number; // 实例上的属性必须先声明
  y!:number;
  constructor(x:number,y?:number,...args:number[]){
      this.x = x;
      this.y = y as number;
  }
}
let p = new Pointer(100,200);
// 实例上的属性需要先声明在使用，构造函数中的参数可以使用可选参数和剩余参数
console.log('1. TS中定义类', p)

// 2. 类中的修饰符
// public修饰符（谁都可以访问到）
class Animal {
  public name!: string; // 不写public默认也是公开的
  public age!: number;
  constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
  }
}
class Cat extends Animal {
  constructor(name: string, age: number) {
      super(name, age);
      console.log('子类访问', this.name,this.age); // 子类访问
  }
}
let p2 = new Cat('Tom', 18);
console.log('外层访问', p2, p2.name, p2.age); // 外层访问

// 我们可以通过参数属性来简化父类中的代码
class Animal2 {
  constructor(public name: string, public age: number) {
      this.name = name;
      this.age = age;
  }
}


// protected(受保护的) 修饰符 (自己和子类可以访问到)
class Animal3 {
  constructor(protected name: string, protected age: number) {
      this.name = name;
      this.age = age;
  }
}
class Cat3 extends Animal3 {
  constructor(name: string, age: number) {
      super(name, age);
      console.log('protected 子类访问', this.name, this.age)
  }
}
let p3 = new Cat3('Tom', 18);
// console.log('protected 外层访问', p3.name, p3.age); // error 不让打包 无法访问



// private(私有的) 修饰符 （除了自己都访问不到）
class Animal4 {
  constructor(private name: string, private age: number) {
      this.name = name;
      this.age = age;
  }
}
class Cat4 extends Animal4 {
  constructor(name: string, age: number) {
      super(name, age);
      // console.log(this.name, this.age); // 无法访问 (error 不让打包)
  }
}
let p4 = new Cat4('Tom', 18); 
// console.log(p4.name, p4.age);// 无法访问 (error 不让打包)


// readonly修饰符 （仅读修饰符）
class Animal5 {
  constructor(public readonly name: string, public age: number) {
      this.name = name;
      this.age = age;
  }
  changeName(name:string){
      // this.name = name; // 仅读属性只能在constructor中被赋值 (error 不让打包)
  }
}
class Cat5 extends Animal5 {
  constructor(name: string, age: number) {
      super(name, age);
  }
}
let p5 = new Cat5('Tom', 18); 
p5.changeName('Jerry');




// 3. 静态属性和方法
class Animal6 {
  static type = '哺乳动物'; // 静态属性
  static getName() { // 静态方法
      return '动物类';
  }
  private _name: string = 'Tom';

  get name() { // 属性访问器
      return this._name;
  }
  set name(name: string) {
      this._name = name;
  }
}
let animal = new Animal6();
console.log('间接获取私有变量', animal.name); // 间接获取私有变量
// 静态属性和静态方法是可以被子类所继承的



// 4.Super属性
class Animal7 {
  say(message:string){
      console.log(message);
  } 
  static getType(){
      return '动物'
  }
}
class Cat7 extends Animal7 {
  say(){ // 原型方法中的super指代的是父类的原型
      super.say('猫猫~');
  }
  static getType(){ // 静态方法中的super指代的是父类
      return super.getType()
  }
}
let cat = new Cat7();
console.log(Cat7.getType())


// 5. 类的装饰器

// 装饰类
function addSay(target:any){
  target.prototype.say = function(){console.log('say')}
}
// 装饰类可以给类扩展功能,需要 tsconfig.json 开启 experimentalDecorators:true
@addSay
class Person { // 装饰器其实就是高阶函数 把 Person 当作参数传递给 addSay
  say!:Function
}
let person = new Person
person.say();


// 装饰类中属性
function toUpperCase(target:any, key:string){
  let value = target[key]; 
  Object.defineProperty(target,key,{
      get(){
          return value.toUpperCase();
      },
      set(newValue){
          value = newValue
      }
  })
}
function double(target: any, key: string) {
  let value = target[key];
  Object.defineProperty(target, key, {
      get() {
          return value * 2;
      },
      set(newValue) {value = newValue}
  })
}
class Person2 {
  @toUpperCase
  name: string = 'xiaomi' // 装饰器可以装饰属性
  @double
  static age: number = 10;
  getName() {
      return this.name;
  }
}
let person2 = new Person2();
console.log("装饰类中属性", person2.getName(),Person2.age)
// 装饰属性可以对属性的内容进行改写，装饰的是实例属性则target指向类的原型、装饰的是静态属性则 target 执行类本身~



// 装饰类中方法
function noEnum(target:any,key:string,descriptor:PropertyDescriptor){
  console.log(descriptor)
  descriptor.enumerable = false;
}
class Person3 {
  @toUpperCase
  name: string = 'xiaomi'
  @double
  static age: number = 10;
  @noEnum
  getName() {
      return this.name;
  }
}
let person3 = new Person3();
console.log("getName 不可枚举", person3); // getName 不可枚举



// 装饰参数
function addPrefix(target:any,key:string,paramIndex:number){
  console.log(target,key,paramIndex); // Person.prototype getName  0 
}
class Person4 {
  @toUpperCase
  name: string = 'xiaomi'
  @double
  static age: number = 10;
  prefix!:string
  @noEnum
  getName(@addPrefix prefix:string) { // 给参数添加装饰器
      return this.name;
  }
}


// 6. abstract 抽象类
// 抽象类无法被实例化，只能被继承，抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现,而且必须实现。
abstract class Animal8 {
  name!:string;
  abstract speak():void // 定义类型时void表示函数的返回值为空（不关心返回值类型，所有在定义函数时也不关心函数返回值类型）
}
class Cat8 extends Animal8 {
  speak(){
    console.log('猫猫~');
  }
}
class Dog8 extends Animal8 {
  speak():string {
    console.log('汪汪~');
    return 'wangwang'
  }
}


export default {}
