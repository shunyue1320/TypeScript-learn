console.log('扩展全局变量类型 -------------------------------')

// 1. 扩展局部变量

// 可以直接使用接口对已有类型进行扩展
/*
interface String {
  double():string
}
String.prototype.double = function () {
  return this as string + this;
}
let str = '123';

interface Window {
  mynane:string
}
console.log(Window.mynane)
*/


// 2. 模块内全局扩展
declare global{
  interface String {
      double():string;
  }
  interface Window{
      myname:string
  }
}
// 声明全局表示对全局进行扩展


// 3. 声明合并
// 同一名称的两个独立声明会被合并成一个单一声明，合并后的声明拥有原先两个声明的特性。


// 同名接口合并
interface Animal {
  name:string
}
interface Animal {
  age:number
}
let a:Animal = {name:'456',age:10};


// 命名空间的合并

// 扩展类
class Form {}
namespace Form {
    export const type = 'form'
}

// 扩展方法
function getName(){}
namespace getName {
    export const type = 'form'
}

// 扩展枚举类型
enum Seasons {
  Spring = 'Spring',
  Summer = 'Summer'
}
namespace Seasons{
  export let Autum = 'Autum';
  export let Winter = 'Winter'
}



// 3. 交叉类型合并
/*
import { createStore, Store } from 'redux';
type StoreWithExt = Store & {
    ext:string
}
let store:StoreWithExt
*/



// 4. 生成声明文件
// 配置tsconfig.json 中 "declaration": true 生成声明文件


export default {}