# mw-jssdk [![Build Status](https://travis-ci.org/magicwindow/mw-jssdk.svg)](https://travis-ci.org/magicwindow/mw-jssdk)

Magic Window Javascript SDK.

### 引用mw-sdk.js
您可以直接通过URL引用我们的JS SDK；如果您的App使用Bower，也可以使用Bower安装魔窗的JS SDK；

通过URL引用：
```
http://magicwindow.cn/sdk/jssdk/mw-sdk.js
http://magicwindow.cn/sdk/jssdk/mw-sdk.min.js
```

使用Bower安装：
```
bower install mw-sdk --save
```

### 初始化SDK

在您的页面底部，和引用mw-sdk.js的script标签之后，加入以下SDK的初始化代码：
```
mw.sdk.init({
  'server'  : 'http://stats.magicwindow.cn/',     // 读取数据的服务器（不用修改）
  'appkey'  : 'XEJ7F76J61LHEWRI3Q9A6UN9BM4CRT3X', // 从哪里获取appkey？答：魔窗后台 》应用设置 》应用管理 》（你关联的应用里面的appkey）
  'appVersion'  : '2.3',
  'Version' : '2.3'
});
```

### 设置活动入口

在您需要显示活动入口的位置加入下方的标签，此标签默认的宽度和高度以您在魔窗后台上传的活动展示图片尺寸一致，最大宽度为100%，高度会根据最大宽度的比例缩放，_当然，您可以使用CSS代码自定义显示样式_。
```
<mw-image data-key="xxxx"></mw-image>
```
其中data-key属性值请按此方法获取：

1. 进入魔窗后台；
2. 在魔窗左侧边栏中点击“应用配置” 》 “应用配置”；
3. 在应用配置的界面内正确关联您的应用；
4. 点击您关联的应用内的“编辑”链接，进入应用编辑页面；
5. 在关联好的应用的“魔窗位配置”的标签页内会显示所有的魔窗位（如果没有则新建魔窗位）;
6. 找到您需要的魔窗位的"魔窗位key"，填到此处即可；

