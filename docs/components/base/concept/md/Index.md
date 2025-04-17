## 地图坐标格式

::: details WGS84
全称：World Geodetic System 1984

说明：

全球通用的地理坐标系，GPS设备采集的原始坐标，国际标准（如Google Earth、GPS导航使用）。
对应EPSG代码：EPSG:4326（地理坐标系，经纬度格式）。
:::

::: details GCJ-02
全称：国家测绘局2002坐标系（拼音缩写：Guó Cè Jú 2002）

别名：火星坐标系

说明：

中国国家标准，对WGS84坐标进行非线性加密（偏移），国内地图服务（如高德、腾讯地图）必须使用此坐标系。
:::

::: details BD09
全称：Baidu Coordinate System 2009

说明：

百度在GCJ-02基础上进一步加密的坐标系，用于百度地图服务。
:::

::: details EPSG:3857
全称：Web Mercator Projection

别名：伪墨卡托投影

说明：

基于WGS84的投影坐标系，用平面坐标（米）表示地球，适用于Web地图（如Google Maps、OpenStreetMap）。
:::

::: tip 区别
WGS84：国际通用原始坐标。

GCJ-02：国内地图加密标准。

BD09：百度地图专用加密。

EPSG:3857：Web地图显示标准（平面投影）。

开发中需注意不同坐标系间的转换（如调用API转换工具），避免定位偏移问题。
:::

## JS原型链

::: details 对象
```js
const o = {
  a: 1,
  b: 2,
  // __proto__ 设置了 [[Prototype]]。在这里它被指定为另一个对象字面量。
  __proto__: {
    b: 3,
    c: 4,
  },
};
// o ---> o.__proto__ ---> o.__proto__.__proto__ ---> o.__proto__.__proto__.__proto__
// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> Object.prototype ---> null
```
:::
::: details 函数
```js
function f() {}
// f ---> f.prototype ---> f.prototype.__proto__ ---> o.__proto__.__proto__.__proto__
// f() {} ---> F() {} ---> Object.prototype ---> null
```
:::
::: tip 区别
对象：一个普通的对象访问原型链通过 `__proto__` 属性，可以访问到该对象的原型对象`(Object.prototype)`，最后访问`__proto__`为null原型链结束。

函数：一个普通的函数访问原型链通过 `prototype` 属性，可以访问到该函数的原型对象，再通过 `__proto__` 属性访问到原型对象`(Object.prototype)`，最后访问 `__proto__` 为null原型链结束。
:::

::: tip 备注
根据 ECMAScript 标准，符号 `someObject.[[Prototype]]` 用于指定 someObject 的原型。

使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 函数分别访问和修改 [[Prototype]] 内部插槽。

这与 JavaScript 访问器 `__proto__` 是等价的，后者是非标准的，但许多 JavaScript 引擎实际上实现了它。

为了保持简洁和避免困惑，在表示法中，我们会避免使用 `obj.__proto__` 而是使用 `obj.[[Prototype]]`。
:::