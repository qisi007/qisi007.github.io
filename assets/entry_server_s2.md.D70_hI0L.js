import{_ as a,c as n,o as p,ao as e}from"./chunks/framework.B_KIjQED.js";const u=JSON.parse('{"title":"springBoot整合其他框架","description":"","frontmatter":{"title":"springBoot整合其他框架"},"headers":[],"relativePath":"entry/server/s2.md","filePath":"entry/server/s2.md","lastUpdated":1693989932000}'),l={name:"entry/server/s2.md"};function t(i,s,o,c,r,d){return p(),n("div",null,s[0]||(s[0]=[e(`<h2 id="_1-springboot整合junit" tabindex="-1">1.springBoot整合Junit <a class="header-anchor" href="#_1-springboot整合junit" aria-label="Permalink to &quot;1.springBoot整合Junit&quot;">​</a></h2><ol><li>搭建SpringBoot工程</li><li>引入starter-test起步依赖</li><li>编写测试类</li><li>添加测试相关注解</li></ol><ul><li>@RunWith(SpringClass.classs)</li><li>SpringBootTest(class = 启动类.class)</li></ul><p>首先，创建好项目之后，springBoot默认帮我们引入了 <code>starter-test</code>这个依赖，我们可以看一下 <code>pom.xml</code>,里边已经引入了：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;scope&gt;test&lt;/scope&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>所以我们省去了这个步骤</p><p>因为单元测试我们大部分测试的业务中的代码，所以我们写一个service, 代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example.javaspringboot.service;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span>import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@RestController</span></span>
<span class="line"><span>@RequestMapping(&quot;/person&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class person {</span></span>
<span class="line"><span>@GetMapping(&quot;/getUser&quot;)</span></span>
<span class="line"><span>    public void getUser () {</span></span>
<span class="line"><span>        System.out.print(&quot;张三&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后我们写一个单元测试，路径我们就在test/java下新建一个testPerson的类，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example.javaspringboot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import com.example.javaspringboot.controller.HelloJava;</span></span>
<span class="line"><span>import org.junit.jupiter.api.Test;</span></span>
<span class="line"><span>import org.junit.runner.RunWith;</span></span>
<span class="line"><span>import org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span>import org.springframework.boot.test.context.SpringBootTest;</span></span>
<span class="line"><span>import org.springframework.test.context.junit4.SpringRunner;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@RunWith(SpringRunner.class)</span></span>
<span class="line"><span>@SpringBootTest(classes = JavaSpringBootApplication.class)</span></span>
<span class="line"><span>class JavaSpringBootApplicationTests {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private HelloJava helloJava;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    void testHello() {</span></span>
<span class="line"><span>        helloJava.hello();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后启动一下这个类，我的项目在控制台包了个错,上边显示找不到RunWith这个注解，我从网上找了方法，原因是我们没有引入junit, 我们在maven的配置中引入一下这个包：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;junit&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;junit&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;4.12&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;scope&gt;test&lt;/scope&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>然后刷新一下maven，可以看到代码的飘红消失了，在启动一下测试类，可以看到控制台打印了 <code>张三</code>, 符合我们的预期；</p><p>如果测试类的包名和我们代码写的包名一样，我们可以不用指定引导类文件，也就是直接写 @SpringBootTest</p><h2 id="_2-springboot整合redis" tabindex="-1">2.springBoot整合Redis <a class="header-anchor" href="#_2-springboot整合redis" aria-label="Permalink to &quot;2.springBoot整合Redis&quot;">​</a></h2><ol><li>搭建SpringBoot工程</li><li>引入redis起步依赖</li><li>配置redis相关属性</li><li>注入RedisTemplate模板</li><li>编写测试方法，测试</li></ol><p>我们还是用之前的工程，在 <code>pom.xml</code>中引入redis依赖：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>然后刷新一下maven</p><p>然后在我们修改一下之前写的测试类，代码如下：</p><div class="language-package vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">package</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>import com.example.javaspringboot.controller.HelloJava;</span></span>
<span class="line"><span>import org.junit.jupiter.api.Test;</span></span>
<span class="line"><span>import org.junit.runner.RunWith;</span></span>
<span class="line"><span>import org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span>import org.springframework.boot.test.context.SpringBootTest;</span></span>
<span class="line"><span>import org.springframework.data.redis.core.RedisTemplate;</span></span>
<span class="line"><span>import org.springframework.test.context.junit4.SpringRunner;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@RunWith(SpringRunner.class)</span></span>
<span class="line"><span>@SpringBootTest(classes = JavaSpringBootApplication.class)</span></span>
<span class="line"><span>class JavaSpringBootApplicationTests {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private RedisTemplate redisTemplate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testSet() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        redisTemplate.boundValueOps(&quot;name&quot;).set(&quot;李四&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testGet () {</span></span>
<span class="line"><span>        Object name =  redisTemplate.boundValueOps(&quot;name&quot;).get();</span></span>
<span class="line"><span>        System.out.print(name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看到我们写了两个方法，第一个是往<code>redies</code>中存入一个值，第二个是获取这个值并打印</p><p>我们启动一下 <code>redis</code>, 这个文件我存在了我的百度网盘下，关注我的微信公众号【凤凰城下的小码农】后，回复【软件】，里边有一个 【Redis-x64-3.2.100.zip】压缩文件， 解压之后运行【redis-server.exe】即可启动 <code>redis</code></p><p>我们先不调用写入的方法，我们先调 <code>testGet</code>这个方法，可以看到控制台中输出一个 <code>null</code>，证明 <code>redies</code>中还没有 <code>name</code>这个 值，然后我们调用 <code>testSet</code> 这个方法，面板中上方有一个条，如果显示绿色，表示 <code>redies</code> 链接成功， 运行完成之后我们再调用 <code>testGet</code> 这个方法，可以看到控制台输出了 <code>李四</code>, 证明我们测试通过</p><p>这个连接的是本地的 <code>redies</code>, 如果是到线上呢，肯定是不能用本地的，我们可以再配置一下，在 <code>application.yaml</code>中写入如下配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server:</span></span>
<span class="line"><span>  port: 8081</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  porfiles: dev</span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    host: 127.0.0.1  # redis的主机</span></span>
<span class="line"><span>    port: 6379 # redis的端口号, 默认就是6739， 也可以换成别的</span></span></code></pre></div><h2 id="_3-springboot整合mybatis和mysql" tabindex="-1">3. springBoot整合MyBatis和Mysql <a class="header-anchor" href="#_3-springboot整合mybatis和mysql" aria-label="Permalink to &quot;3. springBoot整合MyBatis和Mysql&quot;">​</a></h2><ol><li>搭建springBoot工程</li><li>引入mybatis起步依赖, 添加mysql驱动</li><li>编写DataSource和MyBatis相关配置</li><li>定义表和实体类</li><li>编写dao和mapper文件/纯注解开发</li><li>测试</li></ol><p>下面我们看一下实际代码中如何操作：</p><p>我们在项目工程的pom.xml文件中引入mybatis和mysql的依赖：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;2.1.0&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;mysql&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;scope&gt;runtime&lt;/scope&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span></code></pre></div><p>刷新一下maven，下载一下这些包</p><blockquote><p>a.我们先看一下如何使用注解的方式</p></blockquote><p>首先强调一下,用注解开发可以不用写mybatis配置信息,所以我们只需要配置一下mysql</p><p>在整合mysql之前，我们先启动一下mysql，关于如何启动，这里不过多介绍， 可以查看这篇文章 <a href="https://blog.csdn.net/zhouzezhou/article/details/52446608" target="_blank" rel="noreferrer">传送</a></p><p>我们在mysql中创建一个库，暂且叫他 <code>test</code>, 新建一个表，叫 <code>user</code>， 存一些用户的用户名 <code>name</code>和密码 <code>password</code>， 主键为 <code>id</code>， 随便写几条数据， 这样准备工作就做好了</p><p>我们打开application.yaml文件配置一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    datasource:</span></span>
<span class="line"><span>    driver-class-name: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span>    url: jdbc:mysql:///test?serverTimezone=UTC  # 本地的可以用///表示</span></span>
<span class="line"><span>    username: root</span></span>
<span class="line"><span>    password: root</span></span></code></pre></div><p>注意一定要写 <code>serverTimezone=UTC</code>, 这个是配置时区的，时区对应不上会报错</p><p>然后我们写一个类，路径为 <code>src/main/java/com/example/javaspringboot/domain</code>, 新建一个 User 类，添加用户名和密码的属性，并写getter和setter以及toString的方法，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example.javaspringboot.domain;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span>    private int id;</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>    private String password;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public int getId() {</span></span>
<span class="line"><span>        return id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setId(int id) {</span></span>
<span class="line"><span>        this.id = id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getUsername() {</span></span>
<span class="line"><span>        return name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setUsername(String username) {</span></span>
<span class="line"><span>        this.name = username;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getPassword() {</span></span>
<span class="line"><span>        return password;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setPassword(String password) {</span></span>
<span class="line"><span>        this.password = password;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;User{&quot; +</span></span>
<span class="line"><span>                &quot;id=&quot; + id +</span></span>
<span class="line"><span>                &quot;, username=&#39;&quot; + name + &#39;&#39;&#39; +</span></span>
<span class="line"><span>                &quot;, password=&#39;&quot; + password + &#39;&#39;&#39; +</span></span>
<span class="line"><span>                &#39;}&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里说一下如何快速创建getter和setter的方法，在文件中右键，选择【Gererate】， 选择【Getter and Getter】，勾选上对应的属性，点确定就ok了， toString方法一样</p><p>然后我们写一下对应的mapper, 目前我了解到mapper的作用是作为单独的一层，写一些数据库相关操作的映射，这样我们就不必再业务代码中写一堆查询</p><p>在 <code>src/main/java/com/example/javaspringboot/mapper</code> 路径下新建一个 <code>UserMapper</code>的文件，注意创建是这个文件的类型不是 <code>class</code>而是 <code>interface</code>， 写如下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example.javaspringboot.mapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import com.example.javaspringboot.domain.User;</span></span>
<span class="line"><span>import org.apache.ibatis.annotations.Mapper;</span></span>
<span class="line"><span>import org.apache.ibatis.annotations.Select;</span></span>
<span class="line"><span>import org.springframework.stereotype.Repository;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.util.List;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Mapper</span></span>
<span class="line"><span>@Repository</span></span>
<span class="line"><span>public interface UserMapper {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Select(&quot;select * from user&quot;)</span></span>
<span class="line"><span>    public List&lt;User&gt; findAll();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>至此，我们就把刚才在数据库中创建的那个user表里的数据都查出来了，我们写个单元测试验证一下</p><p>我们在单元测试的文件中添加如下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private UserMapper userMapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testUser () {</span></span>
<span class="line"><span>        List&lt;User&gt; list = userMapper.findAll();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.print(list);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>跑一下单元测试，可以看到控制台已经把数据库中的数据打印出来了！</p><blockquote><p>b. 我们还可以使用xml的方式</p></blockquote><p>我们还用domain文件夹下的 User类</p><p>然后我们在mapper文件夹下新建一个接口，叫做 UserXmlMapper, 里面写上如下代码,注意查询数据的方法我们没有写注解：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ackage com.example.javaspringboot.mapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>import com.example.javaspringboot.domain.User;</span></span>
<span class="line"><span>import org.apache.ibatis.annotations.Mapper;</span></span>
<span class="line"><span>import org.springframework.stereotype.Repository;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.util.List;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Mapper</span></span>
<span class="line"><span>@Repository</span></span>
<span class="line"><span>public interface UserXmlMapper {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public List&lt;User&gt; findAll();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后我们写一个xml文件，里边有我们需要的sql语句，以及对应方法的映射，我们通常把这种配置文件放在<code>resource</code>文件夹下，在这个 文件夹下新建一个mapper的文件夹，里边新建一个xml文件，叫UserMapper.xml, 注意xml文件是有约束头的，具体内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;mapper namespace=&quot;com.example.javaspringboot.mapper.UserXmlMapper&quot;&gt;</span></span>
<span class="line"><span>    &lt;select id=&quot;findAll&quot; resultType=&quot;user&quot;&gt;</span></span>
<span class="line"><span>        select * from user</span></span>
<span class="line"><span>    &lt;/select&gt;</span></span>
<span class="line"><span>&lt;/mapper&gt;</span></span></code></pre></div><p>这里解释一下，namespace是我们刚才写的接口的全路径，表示当前xml和那个文件的映射，id就是对应方法名，resultType是别名，接下来我 们需要配置一下，使这个xml生效</p><p>在 <code>application.yaml</code>文件中添加如下配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mybatis:</span></span>
<span class="line"><span>  mapper-locations: classpath:mapper/*Mapper.xml # mapper配置文件的路径，这里匹配所有以Mapper.xml结尾的文件</span></span>
<span class="line"><span>  type-aliases-package: com.example.javaspringboot.domain # domain的全路径</span></span>
<span class="line"><span># config-location: # 指定mybatis的核心配置文件</span></span></code></pre></div><p>接下来我们测试一下我们写的代码是否能跑通</p><p>同样在我们的测试类中再添加一个方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private UserXmlMapper userXmlMapper;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testUser2 () {</span></span>
<span class="line"><span>        List&lt;User&gt; list = userXmlMapper.findAll();</span></span>
<span class="line"><span>        System.out.print(list);</span></span>
<span class="line"><span>        System.out.print(&quot;测试通过&quot;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>可以从控制台看到我们打印的数据已经输出了</p><p>至此， springBoot整合其他框架的内容已经介绍完了。</p><blockquote><p>文中所有的代码以及之后的代码已经上传到github和码云中，想要源码的同学关注我得vx公号【凤凰城下的小码农】后，回复【spring】即可获取。</p></blockquote>`,64)]))}const m=a(l,[["render",t]]);export{u as __pageData,m as default};
