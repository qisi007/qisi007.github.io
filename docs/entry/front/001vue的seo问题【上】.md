

首先，可以肯定的是前后端分离不利于SEO，为什么呢？  
1.  搜索引擎的基础爬虫的原理就是抓取你的url，然后获取你的html源代码并解析。 而你的页面通常用了vue等js的数据绑定机制来展示页面数据，爬虫获取到的html是你的模型页面而不是最终数据的渲染页面，所以说用js来渲染数据对seo并不友好。  
2.  seo 本质是一个服务器向另一个服务器发起请求，解析请求内容。但一般来说搜索引擎是不回去执行请求到的js的。也就是说，如果一个单页应用，html在服务器端还没有渲染部分数据数据，在浏览器才渲染出数据，而搜索引擎请求到的html是没有渲染数据的。 这样就很不利于内容被搜索引擎搜索到。 所以服务端渲染就是尽量在服务器发送到浏览器前 页面上就是有数据的。  
3.  一般的数据逻辑操作是放在后端的。排序这个如果仅仅是几条数据，前后端排序开起来是一样的，如果是有1000条数据，前端要排序就要都请求过来。这样显然是不合理的。

无意间看见vue作者在知乎是这么说的+

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/23/169198217cb9ebb6~tplv-t2oaga2asx-image.image)



但是，对于像vue这种前后端分离的开发，我们还是能够通过其他技术优化的。常用的解决方案有三种：
1. 页面预渲染
2. 服务端渲染
3. 路由采用h5 history模式



 - 第一，ssr,这是一套完整的构建vue服务端渲染应用的指南，具体参考https://cn.vuejs.org/v2/guide/ssr.html
 - 第二，vue-meta-info，这个是针对单页面的meta SEO的另一种思路，参考网站  https://zhuanlan.zhihu.com/p/29148760
 - 第三，nuxt 简单易用 https://zh.nuxtjs.org/guide/installation
 - 第四，phantomjs 预渲染 phantomjs.org


## 关于收录问题：
网站收录，搜索引擎在爬取你的网页以后，通过对网页内容进行检测，将符合收录规则的网页存库。因此该网页将会出现在与网页内容相关的查询的搜索结果中。
搜索引擎判断一个网站权重高低的尺度无非两个：收录和外链。因此百度收录的高低很大程度上影响着网站在百度的排名。（这个我也不是很清楚，但是看掘金真的是一个很好的案例，值得我们思考）


## 案例
用vue做出来的成功案例还有很多

1） https://www.bilibili.com （bilibili）  
2） http://m.sohu.com （手机搜狐网）  
3） https://juejin.im/timeline （掘金）  
4） http://element.eleme.io/#/en-US （2）  
5） https://classics.autotrader.com （New&Used Classic Car for sale）  
6） http://qiqu.uc.cn （奇趣百科）  
7） https://m.uhouzz.com/apartments （异乡好居） 

## Vue网站SEO分析  
1） bilibili做了基本的seo优化，比如  
（1）TDK描叙详细。   
（2）提升网页加载速度：对外联css,以及js使用了延迟加载以及dns-prefetch，preload。  
（3）外联较多，关键词排名高。  
2） 掘金网站使用了vue-meta-info 管理网站的meta，应该配合使用了prerender-spa-plugin 对SEO进行了优化。  
3） Element在logo上加了首页的地址，并且只有logo是放在h1标签中。  
4） 有一些流量不太高的网站比如http://www.marshall.edu （Marshall   University）做了seo社会化分享优化，在meta信息中出现了property=”og:title”这种新东西；https://we.dji.com/zh-CN/campus  

5)（大疆招聘）使用了Nuxt 


 这只是我片面的分析，具体情况我们还要根据网站定位，开发成本，后期的维护成本等综合考虑，但是我觉得掘金真的是一个非常成功的案例，既然有人给我们迈出了这一步，我们也要紧跟潮流，毕竟互联网是一个与时俱进的行业。如果我们永远停留在传统的混合开发，也会给我们的公司，给我们个人带来一些影响。