console.log('装包和拆包 -------------------------------')

// 1. Diff实现

// 求两个对象不同的部分
let person1 = {
  name: 'zhufeng',
  age: 11,
  address: '回龙观'
}
let person2 = {
  address: '回龙观',
}
type Diff<T extends object,K extends Object> = Omit<T,keyof K> // Omit忽略属性
type DiffPerson = Diff<typeof person1,typeof person2>  // type DiffPerson = { name: string; age: number; }
type DiffPerson2 = Diff<typeof person2,typeof person1> // type DiffPerson = {}



// 2. InterSection交集
let person3 = {
  name: 'zhufeng',
  age: 11,
  address: '回龙观'
}
let person4 = {
  address: '回龙观',
}
type InterSection<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>> // Extract抽取类型 取交集
type InterSectionPerson = InterSection<typeof person4, typeof person4> // type InterSectionPerson = { address: string; }


// 3. Overwrite属性覆盖
type OldProps = { name: string, age: number, visible: boolean };
type NewProps = { age: string, other: string };

type Diff2<T extends object,K extends Object> = Omit<T,keyof K>
type InterSection2<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>>
type Overwrite<T extends object, K extends object, I = Diff<T,K> & InterSection<K,T>> = Pick<I,keyof I>
type ReplaceProps = Overwrite<OldProps, NewProps> // type ReplaceProps = { name: string; age: string; visible: boolean; }
// 如果存在已有属性则使用新属性类型进行覆盖操作



// 4. Merge对象合并
type Compute<A extends any> = { [K in keyof A]: A[K] };
type Merge<T, K> = Compute<Omit<T, keyof K> & K>;
type MergeObj = Merge<OldProps,NewProps> // type MergeObj = {name: string  visible: boolean  age: string  other: string}
// 将两个对象类型进行合并操作



export default {}