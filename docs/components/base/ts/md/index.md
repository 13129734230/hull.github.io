## 接口 interface

```ts
interface interfaceType {
    name?:string,//name?:string, 加上问号代表可选属性
    readonly age:number,//readonly 代表只读属性
    hobby:string,
}
const interfaceProperty:interfaceType = {
    name:'hull',
    age:27,
    hobby:'sing'
}
const interfaceFunction = (interfaceReq:interfaceType)=>{
    return {...interfaceReq}
}

// 接口类型可选属性作为函数的形参类型时，在调用函数时传入的属性必须是接口类型所包含的，可选属性仅支持可传可不传，不支持多传乱传。
// 可使用断言 as 消除报错
// 最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性
interface optionalInterface {
    a?:number,
    b?:number,
    c?:number,
    [propName: string]: any;//最佳做法
}
const optionalFunction = (optionalReq:optionalInterface)=>{
    return {...optionalReq}
}
console.log(optionalFunction({d:1}));//error
console.log(optionalFunction({d:1} as optionalInterface));//pass
console.log(optionalFunction({d:1}))//最佳做法
```

## 类 class

```ts
//子类extends超类，并重写构造函数时，必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//当超类中包含private或protected成员时，只有extends超类的子类的实例对象类型才兼容超类类型，即private或protected成员的声明必须出自同一处。
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.

//构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.


//参数属性 仅在构造函数里使用 readonly name: string参数来创建和初始化 name成员。 我们把声明和赋值合并至一处。
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}

// 静态属性static。每个实例想要访问这个属性的时候，都要在 origin前面加上类名。
class Grid{
    static origin = {x:0,y:0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    constructor (public scale: number) { }
}
```

## 抽象类 abstract

```ts
// 抽象类本身不能被实例化，抽象声明的方法必须在派生类中实现
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```
## 函数 function

```ts
//剪头函数可以保存函数创建时的this值，而不是调用时的值。
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return () => { //return function() { ////非剪头函数时，以下this指向window对象（严格模式下则为undefined）
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
} 

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

//方法重载 可以解决函数根据不同条件返回不同类型的值。
//为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。
//如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x: {suit: string; card: number; }[]): number;//重载方法1
function pickCard(x: number): {suit: string; card: number; };//重载方法2
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

## 泛型 T

```ts
//函数泛型
function identity<T>(arg:T):T{
    return arg;
}
function identity<T>(arg:T[]):T[]{ //Array<T>===T[]
    return arg;
}
const str = identity<string>('str');
const num = identity<number>(1);
const boo = identity(true);//类型推断
console.log(str,num);

let myIdentity: <T>(arg: T) => T = identity;
let myIdentity = identity; //类型推断

//接口泛型
interface identityInterFace {
    <T>(arg:T):T
}
let myIdentity:identityInterFace = identity
//理解何时把参数放在调用签名里和何时放在接口
interface identityInterFace<T>{
    (arg:T):T
}
let myIdentity:identityInterFace<string> = identity

//泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

//类型别名泛型
type Container<T> = { value: T };

//泛型约束：当使用类型变量T规定形参arr:T时，arr.length不一定都能读取到length属性，也有可能error；
//此时需要使用泛型约束和extends来进行限制：
interface Lengthwise {
    length:number;
}
function loggingIdentity<T extends Lengthwise>(arg:T):T{
    console.log(arg.length);
    return arg
}
loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3});
```

## 枚举 enum

```ts
//枚举
//数字枚举
enum numEnum {
    A=1,
    B//2 自动推断
}
//字符串枚举
enum strEnum {
    A="A",
    B="B"
}
//异构枚举
enum hetEnum {
    A=0,
    B="B"
}
//枚举成员：计算成员，常量成员
//联合枚举与枚举成员的类型
//const枚举 const 修饰:只能包含常量成员
const enum decEnum {
    A=1,
    //...常量
}
//外部枚举 declare 修饰:外部枚举用来描述已经存在的枚举类型的形状。
declare enum decEnum {
    A=1,
    B,
    C=2
}
//外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。
//对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
```

## 类型推断（推论）

```ts
//...
```

## 类型兼容性

```ts
//协变：同属性同类型的情况下，字段多的可以赋值给字段少的。
//逆变：通常发生在函数的形参上，即同形参属性同类型的情况下，形参属性少的函数可以赋值给形参属性多的函数，反之则不可，被认为是不安全的。
interface A {
    a:string,
    b:number,
    c:boolean
}
interface B {
    a:string,
    b:number
}

let fna = (p:A)=>{}
let fnb = (p:B)=>{}

fna = fnb
// fnb = fna//不能将类型“(p: A) => void”分配给类型“(p: B) => void”。参数“p”和“p” 的类型不兼容。类型 "B" 中缺少属性 "c"，但类型 "A" 中需要该属性。
//双向协变：tsconfig strictFunctionTypes 设置为false 支持双向协变
//具有两个相同命名的成员对象时，成员数量多的向成员数量少的兼容，向下兼容。
//关于函数的类型兼容，只比较形参的类型，形参的命名无所谓。
//详见：https://www.tslang.cn/docs/handbook/type-compatibility.html
//比较类的类型兼容时，类有静态部分和实例部分的类型，只有实例的成员会被比较。
//泛型类型兼容，只对结果进行类型比较。
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;
x = y;  // OK, because y matches structure of x

interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y;  // Error, because x and y are not compatible
```

## 高级类型

```ts
//交叉类型: &
//联合类型: |

//类型保护(类型守卫)与区分类型: typeof（"number"， "string"， "boolean"或 "symbol"）、instanceof（构造函数）
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

//不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

//可以为null的类型只能通过联合类型来实现。
//TypeScript会把 null和 undefined区别对待。 string | null， string | undefined和 string | undefined | null是不同的类型。
//可选参数和可选属性，使用了 --strictNullChecks，可选参数会被自动地加上 | undefined。--strictNullChecks对旧代码支持不好。
//类型保护和类型断言来去除nullh或undefined。
//使用类型断言手动去除。 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined。

//类型别名
//类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
type Container<T> = { value: T };
// 类型别名属性中引用自身
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
//十分稀奇古怪的类型
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
    name: string;
}
var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
//类型别名不能出现在声明右侧的任何地方
type Yikes = Array<Yikes>; // error
//类型别名并不创建新名字
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;//显示引用类型{ num: number }
declare function interfaced(arg: Interface): Interface;//显示引用类型Interface

//索引类型（Index types）
interface Person {
    name: string;
    age: number;
}
// 索引类型查询操作符: keyof T: keyof Person ==> 'name' | 'age'
// 索引访问操作符: T[K]：Person['name'] ==> string类型，T[K][]==>string[]
```

## Symbol

```ts
//...
```

## 迭代器和生成器

```ts
//...
```

## 装饰器 @Decorator
::: tip 
装饰器是一项实验性特性，在未来版本中可能会发生变化。

若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用编译器选项 experimentDecorator:true
:::

```ts
//实验阶段
//若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项：

//命令行:
tsc --target ES5 --experimentalDecorators
//tsconfig.json:
{
    "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
    }
}

//装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
//例如，有一个@sealed装饰器，我们会这样定义sealed函数：
function sealed(target) {
    // do something with "target" ...
}

//装饰器工厂：接受传参
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
```

## Mixins

```ts

```

## 泛型工具
::: code-group
```ts [Partial(可选)]
interface User {
    name:string,
    age:number
}
type UserTestPartial = Partial<User>
//原理：
// type UserPartial<T> = {
//     [K in keyof T]?:T[K]
// }
type UserPartial<T,P extends keyof T> = {
    [K in P]?:T[K]
}
type UserTestPartial2 = UserPartial<User>
```
```ts [Required(必选)]
interface User {
    name?:string,
    age?:number
}
type UserTestRequired = Required<User>
//原理：
// type UserRequired<T> = {
//     [K in keyof T]-?:T[K]
// }
type UserRequired<T,P extends keyof T> = {
    [K in P]-?:T[K]
}
type UserTestRequired2 = UserRequired<User>
```
```ts [Pick(选取)]
interface User {
    name:string,
    age:number
}
type UserTestPick = Pick<User,'name'>
//原理：
type UserPick<T,P extends keyof T> = {
    [K in P]:T[K]
}
type UserTestPick2 = UserPick<User>
```
```ts [Exclude(剔除)]
interface User {
    name:string,
    age:number
}
type UserTestExclude = Exclude<keyof User,'name'>
//原理：
//分解1：'name'|'age' extends 'age'
//分解2：'name' extends 'age'==>false; 'age' extends 'age'===>true;
type UserPick<T,K> = T extends K ? never : T;

type UserTestPick2 = UserPick<keyof User,'age'>
```
```ts [Omit(剔除属性并生成新类型)]
interface User {
    name:string,
    age:number
}
type UserTestOmit = Omit<User,'name'>
//原理：
type UserOmit<T,K> = Pick<T,Exclude<keyof T,K>>
type UserTestOmit2 = UserOmit<User,'age'>
```
```ts [Record(约束对象的key:value)]
type Key = "c" | "x" | "k"
type Value = "唱" | "跳" | "rap" | "篮球"

let kk:Record<Key,Value> = {
    "c":"唱",
    "x":"跳",
    "k":"rap"
}
//原理：
//对象的key值只能是symbol、string、number;keyof any ==> symbol|string|numbe
type KeyType = keyof any
type KkRecord<K extends KeyType,VT> = {
    [P in K]:T
}
```
```ts [ReturnType(提取函数返回类型)]
const fn = () => [1,'c',2,'x',3,'k',{}];
type num = ReturnType<typeof fn>;
//原理：
type CustomFn<F extends Function>  = F extends (...args:any[])=> infer Res  ? Res :never;
```
:::



## 实现发布订阅模式

```ts
//实现发布订阅模式
//首先捋清楚三个角色，发布者、调度者、订阅者

interface EventFace {
    on:(name:string,callback:Function)=>void;
    emit:(name:string,arg:any[])=>void;
    off:(name:string,callback:Function)=>void;
    once:(name:string,callback:Function)=>void;
}
interface List {
    [key:string]:Array<Function>
}

class Dispatch implements EventFace{
    list:List;
    constructor(){
        this.list = {};
    };
    on(name:string,callback:Function){
        let callbackList = this.list[name]
        callbackList.push(callback);
        this.list[name] = callbackList;
    };
    emit(name:string,...arg:any[]){
        const eventName = this.list[name];
        if(eventName){
            eventName.forEach(fn=>{
                fn.apply(this,arg)
            })
        }else{
            console.log(name,'事件未监听');
        }
    };
    off(name:string,fn:Function){
        const eventName = this.list[name];
        if(eventName && fn){
            let index = eventName.findIndex(fns=>fns===fn);
            index>-1?eventName.splice(index,1):''
        }else{
            console.log(name,'事件未监听');
        }
    };
    once(name:string,fn:Function){
        let decorator = (...arg:any[])=>{
            fn.apply(this,arg);
            this.off(name,decorator);
        }
        this.on(name,decorator);
    }
}

const bus = new Dispatch()
```