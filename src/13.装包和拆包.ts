console.log('装包和拆包 -------------------------------')

// 1. 装包
type Proxy<T> = {
  get():T,
  set(value:T):void
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
} 
function Proxify<T>(obj: T):Proxify<T> {
  let result = {} as Proxify<T>;
  for (const key in obj) {
    let value = obj[key]
    result[key] = {
      get() {
        console.log(key, '触发 get')
        return value
      },
      set: (newValue) => {
        console.log(key, '触发 set')
        value = newValue
      }
    }
  }
  return result
}

let props = { name: 'zhufeng', age: 11 }
let proxpProps = Proxify(props) // let proxyProps: Proxify<{ name: string; age: number; }>
console.log('1. 装包', proxpProps, proxpProps.name.get())


// 2. 拆包
function unProxify<T>(proxpProps:Proxify<T>):T{
  let result = {} as T;
  for(let key in proxpProps){
      let value = proxpProps[key];
      result[key] = value.get()
  }
  return result
}
let proxy = unProxify(proxpProps)
console.log('2. 拆包', proxy) // { name: 'zhufeng', age: 11 }



export default {}