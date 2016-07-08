# mw-jssdk [![Build Status](https://travis-ci.org/magicwindow/mw-jssdk.svg)](https://travis-ci.org/magicwindow/mw-jssdk)

Magic Window Javascript SDK.

# 使用指南

### 引用mw-sdk.js
您可以直接通过URL引用我们的JS SDK；如果您的App使用Bower，也可以使用Bower安装魔窗的JS SDK；

通过URL引用：
```html
http://magicwindow.cn/sdk/jssdk/mw-sdk.js
http://magicwindow.cn/sdk/jssdk/mw-sdk.min.js
```

使用npm安装：
```shell
npm install mw-sdk --save
```

使用Bower安装：
```shell
bower install mw-sdk --save
```

### 初始化SDK

在您的页面底部，引用mw-sdk.js的script标签之后，加入以下SDK的初始化代码：
```javascript
mwsdk.init({
  'appkey'  : 'XEJ7F76J61LHEWRI3Q9A6UN9BM4C****', // 从哪里获取appkey？魔窗后台 》应用设置 》应用管理 》（你关联的应用里面的appkey）
  'appVersion'  : '2.3',
  'Version' : '2.3'
});
```

### 魔窗位展示（活动入口）

在您需要显示魔窗位（活动入口）的位置加入下方的标签，此标签默认的宽度和高度以您在魔窗后台上传的活动展示图片尺寸一致，最大宽度为100%，高度会根据最大宽度的比例缩放，_当然，您可以使用CSS代码自定义显示样式_。
```html
<mw-block id="xxxx" class="mw-banner"></mw-block>
```
其中id的属性值请按此方法获取：

1. 进入魔窗后台；
2. 在魔窗左侧边栏中点击“应用配置” 》 “应用配置”；
3. 在应用配置的界面内正确关联您的应用；
4. 点击您关联的应用内的“编辑”链接，进入应用编辑页面；
5. 在关联好的应用的“魔窗位配置”的标签页内会显示所有的魔窗位（如果没有则新建魔窗位）;
6. 找到您需要的魔窗位的"魔窗位key"，填到此处即可；

### 如何自定义魔窗位样式

从v2.0.3开始,支持您使用HTML和CSS样式自定义魔窗位模板,在初始化mwsdk时,可以为所有魔窗位设置统一的自定义模板,也支持为每一个魔窗位设置不同的模板.

1. 为所有魔窗位自定义统一的渲染模板:

  ```javascript
  mwsdk.init({
    'appkey'  : 'XEJ7F76J61LHEWRI3Q9A6UN9BM4C****',
    'template': '<div><h3>[ $title ]</h3><img  src="[ $imgUrl ]" thumb-src="[ $thumbUrl ]"/></div>'
  });
  ```

  如果您需要使用动态模板,您可以通过制定一个JS函数作为魔窗位渲染模板,该函数会传入一个Map类型的参数,这个Map包含了投放在此魔窗位中的活动配置,此函数的返回结果就是动态魔窗位模板:
  
  ```javascript
  mwsdk.init({
    'appkey'  : 'XEJ7F76J61LHEWRI3Q9A6UN9BM4C****',
    'template': function (banner) {
      // return '<div><img  src="[ $imgUrl ]"/></div>'
      return '<div><img  src="'+ banner.imgUrl +'"/></div>'
    }
  });
  ```
  __banner__支持的属性:
  a. banner.title 类型: String; 活动标题
  b. banner.description 类型: String; 活动描述
  c. banner.imgUrl 类型: String; 活动图片
  d. banner.thumbUrl 类型: String; 活动缩略图
  e. banner.startTime 类型: Number; 活动开始时间戳
  f. banner.endTime 类型: Number; 活动结束时间戳


2. 为不同的魔窗位自定义不同的渲染模板:
  ```javascript
  mwsdk.init({
    'appkey'  : 'XEJ7F76J61LHEWRI3Q9A6UN9BM4C****',
    'template': {
      '魔窗位KEY1': '<img src="[ $imgUrl ]"/>',
      '魔窗位KEY2': function(banner) {
        var dateTime = new Date(banner.endtime);
        var localeTime = dateTime.getYear() + '年' + dateTime.getMonth() + '月' + dateTime.getDate() + '日';  
        return '<div><img src="[ $imgUrl ]"/><span>活动结束时间: '+ localTime +'</span></div>'
      }
    }
  });
  ```

### 如何实现App场景还原？
如果您是Hybrid App，用户在其他渠道（比如微信、QQ、微博、短信、邮件中）看到从您App中分享出去的使其感兴趣的内容后，很有可能会下载并安装您的App,那么如何使用户在App安装后第一次打开时仍然能回到他在其他渠道看到的内容呢？答案就是__[mLink](http://documentation.magicwindow.cn/#mlink-info)__, 关于如何使用mLink服务，可以参考我们的帮助文档：
1. [开始使用mLink](http://documentation.magicwindow.cn/#mlink-info);
2. [如何在__H5站点__中使用mLink短链接？](http://documentation.magicwindow.cn/#mlink-dynamic-params)
3. [如何在__推送服务__中使用mLink短链接？](http://documentation.magicwindow.cn/#mlink-push)
4. [如何在__短信__中使用mLink短链接？](http://documentation.magicwindow.cn/#mlink-message)
5. [mLink Javascript Api使用说明](http://documentation.magicwindow.cn/#mlink-js-api)，（此文档用于在您分享到其他渠道的H5页面中集成mLink服务）；

接下来在您的App中调用魔窗JSSDK的场景还原方法,调用时机建议在您App首页初始化完成时调用。

```javascript

// 示例一：使用回调
mwsdk.router(
  function onSuccess(path) {
    console.log('mwsdk.router:'+ path);
    if (path) {
      document.location.hash = path;
    }
  },
  function onError(err) {
    cosole.log('没有匹配的用户访问记录');
  }
);

// 示例二：使用Promise
mwsdk.router()
.then(
  function resolve(path) {
    console.log('mwsdk.router:'+ path);
    if (path) {
      document.location.hash = path;
    }
  },
  function reject(err) {
    cosole.log('没有匹配的用户访问记录');
  }
);
```
