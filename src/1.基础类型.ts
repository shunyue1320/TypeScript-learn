console.log('基础类型 -------------------------------')
// 1.布尔、数字、字符串类型 -------------------------------
let myname: string = "小米";
let age: number = 18;
let bool: boolean = true;
console.log('1.布尔、数字、字符串类型', myname, age, bool);


// 2.元组类型 -------------------------------
// 限制长度个数、类型一一对应
let tuple: [string, number] = ['123', 1]
tuple.push('456')  // 像元组中增加数据，只能增加元组中存放的类型
// tuple.push(true); // Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
console.log('2.元组类型', tuple)


// 3. 数组 -------------------------------
let arr1:number[] = [1,2,3]
let arr2:string[] = ['1', '2', '3']
let arr3: (number | string)[] = [1, 2, '3']
let arr4: Array<number | string> = [1, 2, '3'] // 泛型方式来声明
console.log('3. 数组', arr1, arr2, arr3, arr4)


// 4. 枚举类型 -------------------------------
enum USER_ROLE1 {
  USER, // 默认从0开始
  ADMIN,
  MANAGER
}
// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}

enum USER_ROLE2 { // 异构枚举
  USER = 'user',
  ADMIN = 1,
  MANAGER,
}

const enum USER_ROLE3 { // 常量枚举
  USER,
  ADMIN,
  MANAGER,
}
console.log('4. 枚举类型', USER_ROLE1, USER_ROLE2, USER_ROLE3.USER)


// 5. any类型 -------------------------------
// 不进行类型检测
let arrAny:any = ['123',true,{name:'456'}]
console.log('5. any类型', arrAny)


// 6. null 和 undefined -------------------------------
// 任何类型的子类型,如果 tsconfig.json 内配置 strictNullChecks:true 时（默认为 true），则不能把 null 和 undefined 付给其他类型
let nandb:number | boolean;
nandb = true
// nandb = null; // Type 'null' is not assignable to type 'number | boolean'.
console.log('6. null 和 undefined', nandb)


// 7. void类型 -------------------------------
// 只能接受null，undefined。一般用于函数的返回值 (严格模式下不能将null赋予给void)
let void类型:void;
void类型 = undefined;
// void类型 = null; // strictNullChecks: false (不严格模式) 才不报错
// void类型 = true; // Type 'boolean' is not assignable to type 'void'.
console.log('7. void类型', void类型)

// 8. never类型 -------------------------------
// 任何类型的子类型, never 代表不会出现的值。不能把其他类型赋值给never
function error(message: string): never {
  throw new Error("err");
}
function loop(): never {
  while (true) { }
}
function fn(x:number | string){
  if(typeof x == 'number'){

  }else if(typeof x === 'string'){

  }else{
      console.log(x); // never
  }
}
console.log('8. never类型', error, loop, fn)


// 9. Symbol类型 -------------------------------
// Symbol表示独一无二
const s1 = Symbol('key');
const s2 = Symbol('key');
console.log('9. Symbol类型', s1, s2); // s1 == s2  false


// 10. BigInt类型 -------------------------------
const num1 = Number.MAX_SAFE_INTEGER + 1;
const num2 = Number.MAX_SAFE_INTEGER + 2;
let max: bigint = BigInt(Number.MAX_SAFE_INTEGER)
console.log('10. BigInt类型', num1 == num2, max + BigInt(1) === max + BigInt(2)) // true, false


// 11. object对象类型 -------------------------------
// object表示非原始类型
let create = (obj: object):void => { console.log('11. object对象类型', obj) }
create({})
create([])
create(function(){})



export default {} // 导出后这个变量就属于模块内了，不会被声明在全局上
