console.log('模块和命名空间 -------------------------------')
// 默认情况下 ,我们编写的代码处于全局命名空间中


// 1. 模块
// 文件模块： 如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域 。
// 导出
// export default 'zf'
// index.ts导入
// import name from './xxx'



// 2. 命名空间
// 命名空间可以用于组织代码，避免文件内命名冲突


// 命名空间的使用
export namespace zoo {
  export class Dog { eat() { console.log('zoo dog'); } }
}
export namespace home {
  export class Dog { eat() { console.log('home dog'); } }
}

let dog_of_zoo = new zoo.Dog();
dog_of_zoo.eat();
let dog_of_home = new home.Dog();
dog_of_home.eat();


// 命名空间嵌套使用
export namespace zoo {
  export class Dog2 { eat() { console.log('zoo dog'); } }
  export namespace bear{
      export const name = '熊'
  } 
}
console.log(zoo.bear.name); 
// 命名空间中导出的变量可以通过命名空间使用。




export default {}
