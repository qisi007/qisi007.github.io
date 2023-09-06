
之前我对vue的seo也仅仅停留在理论方面，并没有实际进行过优化，也不知道具体效果会是什么样的，恰巧公司官网上线三个月后需求增加不是那么多，所以想停下来先对官网进行优化。

首先是选择哪种方案进行优化，上篇文章提到过，vue的seo解决方案有很多种，常见的如下

1. vue官方服务端渲染
2. vue-meta-info
3. nuxt
4. phantomjs

等等，首先我只调研了两种，vue官方的解决方案和nuxt。

vue官方的解决方案并不复杂（不要被ssr这个词吓到），这个是服务端预渲染，需要后端配合，我做的是通过node解析前端网页的，但是也就是因为这个，需要后端配合，这明明是前端优化，还要说服后端（这估计是所有前端不远面对的，毕竟接口让他多传一个字段就得说半天），所以我果断放弃了这个方案。


后来我看了nuxt官网，发现这个成本是非常低的，如果你的网站不大，通常两天时间就能迁移完成（我们公司的官网花了一周时间）。这其实对于一个项目的优化是可以接受的，毕竟如果这个做好了是可以为公司创造收益的。

关于nuxt框架具体怎么用，这里就不多介绍了，因为官网说的很详细，[地址](https://zh.nuxtjs.org/)，下面说一下从老项目迁移到新项目具体的过程：

## 依赖如何处理

[nuxt官网插件部分](https://zh.nuxtjs.org/docs/2.x/directory-structure/plugins)提到，如果想使用一个插件，首先下载插件，然后在`plugins`目录下新建关于该插件的文件，然后引入改插件，我们以`element-ui`插件为例：

> 首先在`plugins`目录下新建`element.js`,在文件中导入`element-ui`
```js
import Vue from 'vue'
import VTooltip from 'element-ui'
Vue.use(element-ui)
```

> 接下来在`nuxt.config.js`中引用改模块：
```js
export default {
  plugins: [
     '~/plugins/element.js'
  ]
}
```

因为`plugins`的数据结构是数组，所以我们可以添加任何我们想添加的依赖。

## 页面中数据请求如何操作

`nuxt`数据请求和之前就有些出入了，我们需要把请求的接口放在`asyncData`函数中，`asyncData`函数有点像`vue3`中的`组合式 API`,我们需要把所有的接口集成在`asyncData`中, 写法如下：
```
async asyncData({ $axios }) {
    const getList1 = await $axios.$get('接口1')
    const getList2 = await $axios.$get('接口2')
    return { getList1, getList2 }
}
```

当然我们也可以对我们的请求添加很多配置，比如请求头，代理等等，具体可以查看[nuxt/axios](https://axios.nuxtjs.org/)

## 老项目中的代码如何迁移

这里建议，在拷贝代码的时候，一个模块一个模块的操作，避免一次性出现太多bug的时候无法排查，这里说的包含一个模块所有的文件，包含`api, css，组件，工具类，局部依赖`等等，这里的顺序建议如下：

1. 先拷贝组件代码，因为组件才是最核心的代码，一般其他所有的文件都和组件有关
2. 拷贝样式文件，拷贝完后，需要将样式导入在`nuxt.config.js`中引用该样式文件
3. 拷贝其他文件，这时候我们就可以有针对性的修改我们的组件了，或者我们在构建的时候后台会有报错，这都需要我们一个一个的解决

## 其他关于seo的细节

这个就是我们老生常谈的问题了，我们在写`vue`之前就已经非常熟悉了，比如一个网页只能有一个`h1`，给图片加`title`等等，这里就不一一介绍了，前几天我看了一篇文章[前端seo优化](https://juejin.cn/post/6844903824428105735)写的很详细，可以按照里边的一一修改

## 除了修改代码，我们还能做些什么

按照百度的说法，如果一个网站被认证过，那么他被抓取的机会也会有所提高，所以我特意去查了一下认证的价格，添加一个官网的标识一年也就三千多块钱，这对一个企业来说应该算不什么钱，况且网页收录的多了，提高的收益可不只3000，所以我们要想好好做，可以去申请一下。[传送门](https://trust.baidu.com/vstar/official/intro?type=gw)

## 看一下我们网站的最后效果

其实效果还是挺明显的，我们可以右键查看源代码，几乎所有的网站结构都出来了。

>这个是首页的

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2150db3c2db3420fa61ef4a17e63befd~tplv-k3u1fbpfcp-watermark.image)

>这个是列表页的
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5c1cc099c8d4506bcae65c5a2046b8b~tplv-k3u1fbpfcp-watermark.image)

>我们开一下百度的收录情况


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b213fbbfb33440539c776fead7c11314~tplv-k3u1fbpfcp-watermark.image)

收录的不仅是首页和一级菜单页面，而且连小区和房源详情页面也有收录

> 谷歌收录情况


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c03bcc8a926a46879773c117c89ab88b~tplv-k3u1fbpfcp-watermark.image)

所以，综上所述，使用`nuxt`提升网站的收录是非常有效果的，而且成本不高，难度也不大，我们可以在此基础上根据自己网站的实际情况做有针对性的优化。

原创不易，如果这篇文章对你有帮助，点个赞吧！（手动下跪）





