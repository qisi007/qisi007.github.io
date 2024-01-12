import{_ as t,o as e,c as o,V as r}from"./chunks/framework.d56a99a4.js";const u=JSON.parse('{"title":"springBoot切换web服务器","description":"","frontmatter":{"title":"springBoot切换web服务器"},"headers":[],"relativePath":"entry/server/s5.md","filePath":"entry/server/s5.md","lastUpdated":1693990060000}'),a={name:"entry/server/s5.md"},n=r(`<p>springBoot的web环境中默认使用Tomcat作为内置服务器，其实springBoot提供了4种内置的额服务器供我们选择：</p><ul><li>tomcat</li><li>jetty</li><li>netty</li><li>undertow</li></ul><h2 id="添加web服务器" tabindex="-1">添加web服务器 <a class="header-anchor" href="#添加web服务器" aria-label="Permalink to &quot;添加web服务器&quot;">​</a></h2><p>打开我们的项目，运行一下，可以发现控制台没有任何服务器的，因为我们并没有导入他们</p><p>我们在pom.xml中导入一下web服务器坐标</p><pre><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><p>然后再来看一下控制台的输出：</p><p>可以看到有一句话是说tomcat服务器运行了8080端口号，这就说明我们导入web服务器成功了</p><p>那么如何切换web服务器呢？如果我不想用Tomcat呢？</p><h2 id="切换web服务器" tabindex="-1">切换web服务器 <a class="header-anchor" href="#切换web服务器" aria-label="Permalink to &quot;切换web服务器&quot;">​</a></h2><p>首先我们打开springBoot的源码分析一下</p><p>打开 <code>Maven: org.springframework.boot:spring-boot-autoconfigure:2.6.2</code>的jar包，找到web文件夹--&gt;embedded文件夹， 这个文件夹的意思嵌入的意思，可以看到这个文件里有我们刚才说的四种服务器，然后我们打开第一个类 <code>EmbeddedWebServerFactoryCustomizerAutoConfiguration</code>,</p><p>可以看到这个类中有我们上节说的注解，用来判断这个Bean什么时候加载。这四个服务器的类中都有一个注解 <code>ConditionalOnClass</code>，条件是 Tomcat的类或者jetty的类等等， 也就是说如果有这个类才加载这个Bean，如果没有这个类就不加载这个Bean，所以我们就有办法了，只要把Tomcat的类去掉，换上别的服务器的类不就行了？</p><p>那么，如果去掉Tomcat的类呢？</p><p>只需要在pom.xml中把这Tomcat排除在外就行了，修改web服务器的坐标，引入jetty的坐标，代码如下：</p><pre><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
    &lt;exclusions&gt;
        &lt;exclusion&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-tomcat&lt;/artifactId&gt;
        &lt;/exclusion&gt;
    &lt;/exclusions&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-jetty&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><p>重新运行一下项目，可以看到jetty服务器运行起来了</p>`,17),p=[n];function d(i,l,c,s,g,b){return e(),o("div",null,p)}const _=t(a,[["render",d]]);export{u as __pageData,_ as default};