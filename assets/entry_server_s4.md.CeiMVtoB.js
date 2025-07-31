import{_ as n,c as a,o as p,ao as e}from"./chunks/framework.B_KIjQED.js";const u=JSON.parse('{"title":"springBoot自动配置-Condition","description":"","frontmatter":{"title":"springBoot自动配置-Condition"},"headers":[],"relativePath":"entry/server/s4.md","filePath":"entry/server/s4.md","lastUpdated":1693990097000}'),i={name:"entry/server/s4.md"};function t(l,s,o,c,d,r){return p(),a("div",null,s[0]||(s[0]=[e(`<p>condition是在Spring4.0增加的条件判断功能，通过这个功能可以实现选择性的创建Bean操作</p><h2 id="springboot是如何导入bean的" tabindex="-1">springBoot是如何导入Bean的？ <a class="header-anchor" href="#springboot是如何导入bean的" aria-label="Permalink to &quot;springBoot是如何导入Bean的？&quot;">​</a></h2><p>首先，我们思考一个问题，springBoot是如何知道要创建哪个Bean的？比如springBoot是何如知道要创建readisTemplate的？</p><p>我们先创建一个项目，获取一下这个Bean</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class JavaSpringBoot02Application {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 启动sprintboot应用，返回run方法</span></span>
<span class="line"><span>        ConfigurableApplicationContext context = SpringApplication.run(JavaSpringBoot02Application.class, args);</span></span>
<span class="line"><span>        // 获取Bean,redisTemplate</span></span>
<span class="line"><span>        Object redisTemplate = context.getBean(&quot;redisTemplate&quot;);</span></span>
<span class="line"><span>        System.out.print(redisTemplate);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们先说明一把，启动类里的run方法是有返回值的，他返回的就是<a href="https://www.jb51.net/article/88132.htm" target="_blank" rel="noreferrer">ioc容器</a> ,我们先声明一下这个返回值，然后获取 redisTemplate这个Bean，打印一下，可以看到控制台提示我们没有这个Bean。</p><p>很明显，我们并没有导入这个Bean，自然获取不到。</p><p>我们接下来导入一下这个坐标，在pom.xml中添加redis的坐标</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>然后我们再运行一下刚才的方法，可以看到控制台输出了这个Bean。</p><p>其实，springBoot会判断，当前项目中有没有redisTemplate这个字节码文件，有就帮你创建，没有就不创建，这个就是condition帮我们实现的</p><h2 id="案例分析" tabindex="-1">案例分析 <a class="header-anchor" href="#案例分析" aria-label="Permalink to &quot;案例分析&quot;">​</a></h2><blockquote><p>有这样一个需求: 在springBoot的IOC容器中有一个User的Bean，现要求：导入Jedis坐标后，加载该Bean，没导入则不加载</p></blockquote><p>我们实现一下，先写一个User的Bean获取一下</p><p>在我们的项目里创建一个domain文件夹，里边写一个User类，什么也不写</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example.javaspringboot02.domain;</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后再创建一个config的文件夹，写一个类，就叫UserConfig，里面写如下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example.javaspringboot02.config;</span></span>
<span class="line"><span>import com.example.javaspringboot02.domain.User;</span></span>
<span class="line"><span>import org.springframework.context.annotation.Bean;</span></span>
<span class="line"><span>import org.springframework.context.annotation.Configuration;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class UserConfig {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public User user () {</span></span>
<span class="line"><span>        return  new User();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个类首先用注解声明了一下这是个配置类，然后写了个Bean方法，返回了我们刚才写的User类</p><p>然后我们获取一下这个Bean：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object user = context.getBean(&quot;user&quot;);</span></span>
<span class="line"><span>System.out.println(user);</span></span></code></pre></div><p>可以看到控制台输出了这个Bean。</p><p>这里肯定是能够获取到的，我们的需求是如果有jedis坐标后才加载User的Bean，所以我们要完善一下</p><p>有一个注解是专门帮我们完成这个的，就是<code>Conditional</code>， 这个注解接收一个布尔值，如果返回true则加载这个Bean，如果返回false，则不加载Bean， 所以我们要先写一个判断方法。</p><p>我们在项目中新建condition文件夹，里边写一个类就叫ClassCondition，里边写如下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class ClassCondition implements Condition {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {</span></span>
<span class="line"><span>        // 需求是导入jedis坐标后才创建Bean,这里判断\`redis.clients.jedis.Jedis\` 文件是否存在</span></span>
<span class="line"><span>        boolean flag = true;</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Class&lt;?&gt; cls = Class.forName(&quot;redis.clients.jedis.Jedis&quot;);</span></span>
<span class="line"><span>        } catch (ClassNotFoundException e ) {</span></span>
<span class="line"><span>            flag = false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return flag;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看到这个方法是用来实现Condition的方法的，这里边判断了一下jedis这个文件存不存在，存在的话返回true，不存在捕获了错误，并返回了false， 写完之后我们注入刚才写的配置类里边，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class UserConfig {</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    @Conditional(ClassCondition.class)</span></span>
<span class="line"><span>    public User user () {</span></span>
<span class="line"><span>        return  new User();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>运行一个程序，可以看到控制台报错了，因为我们还没有导入jedis坐标，接下来我们导入一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;redis.clients&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;jedis&lt;/artifactId&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>再运行把程序，可以看到输出了User的Bean</p><p>其实我们不难看出这么写是有个小问题的，就是这么做判断条件只有一个，如果我不用jedis判断呢？是不是得重新写一个判断方法</p><p>现在需求升级了，我可以判断任意坐标导入后，才加载User的Bean。</p><h2 id="动态判断任意坐标" tabindex="-1">动态判断任意坐标 <a class="header-anchor" href="#动态判断任意坐标" aria-label="Permalink to &quot;动态判断任意坐标&quot;">​</a></h2><p>我们可以想一下，condition这个注解不就是做这个事儿的吗？我们只要重新实现一下不就好了？</p><p>所以我们重新写一个注解，就叫ConditionOnClass,先把我们配置类里的注解替换一下，修改一下UserConfig</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class UserConfig {</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    // @Conditional(ClassCondition.class)</span></span>
<span class="line"><span>    @ConditionOnClass(&quot;redis.clients.jedis.Jedis&quot;)</span></span>
<span class="line"><span>    public User user () {</span></span>
<span class="line"><span>        return  new User();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后我们写一下我们刚才写的注解ConditionOnClass</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Conditional(ClassCondition.class)</span></span>
<span class="line"><span>public @interface ConditionOnClass {</span></span>
<span class="line"><span>    String[] value();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里我们把一开始的Conditional注解放在这里，并在这个里边定义了一个字符串数据，目的就是想通过这个注解可以判断多个Bean，不只局限于一个Bean</p><p>我们先运行一下项目，控制台会打印User的Bean</p><p>接下来我们需要修改一下判断条件，我们可以先看一下Conditional这个注解是如何做的，点到这个类里边看一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Target({ElementType.TYPE, ElementType.METHOD})</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Documented</span></span>
<span class="line"><span>public @interface Conditional {</span></span>
<span class="line"><span>    Class&lt;? extends Condition&gt;[] value();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>其中Target表示这个注解的作用范围，第二个Retention表示注解生效的时机，第三个参数表示生成java Doc的文档，我们把这三个注解放在我们自定义的注解上</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Target({ElementType.TYPE, ElementType.METHOD})</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Documented</span></span>
<span class="line"><span>@Conditional(ClassCondition.class)</span></span>
<span class="line"><span>public @interface ConditionOnClass {</span></span>
<span class="line"><span>    String[] value();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后我们修改一下判断法方法,把我们写死的条件改成从注解动态获取</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Map&lt;String, Object&gt; map = metadata.getAnnotationAttributes(ConditionOnClass.class.getName());</span></span>
<span class="line"><span>String[] list =(String[]) map.get(&quot;value&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>boolean flag = true;</span></span>
<span class="line"><span>try {</span></span>
<span class="line"><span>    for (String className : list) {</span></span>
<span class="line"><span>        Class&lt;?&gt; cls = Class.forName(className);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>} catch (ClassNotFoundException e ) {</span></span>
<span class="line"><span>    flag = false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>return flag;</span></span></code></pre></div><p>这里说一下matches这个方法的两个参数，第一个context表示上下文对象，用于获取环境，IOC容器，ClassLoader对象， 第二个metadata表示注解元对象 可以用于获取注解定义的属性值</p><p>因此我们可以利用metadata获取我们写在注解上的值，然后遍历一下，看一下有没有，从而判断是否引入了我们定义的Bean</p><p>我们运行一下程序可以看到控制台打印了User这个Bean</p><p>到现在我们回到第一个问题，也就迎刃而解了，其实springBoot也是这个帮我们做的，我们可以看一下</p><p>有很多个类似的注解，有的判断有没有导入坐标，有的判断有没有导入某个类，还有的判断如果没有导入某个类，才加载这个Bean。</p><p>到这里我们最初的问题应该明白了。</p>`,53)]))}const h=n(i,[["render",t]]);export{u as __pageData,h as default};
