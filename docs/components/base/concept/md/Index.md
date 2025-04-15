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