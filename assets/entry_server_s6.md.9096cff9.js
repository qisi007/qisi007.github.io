import{_ as n,o as e,c as o,V as p}from"./chunks/framework.d56a99a4.js";const B=JSON.parse('{"title":"Enable注解原理","description":"","frontmatter":{"title":"Enable注解原理"},"headers":[],"relativePath":"entry/server/s6.md","filePath":"entry/server/s6.md","lastUpdated":1693989932000}'),t={name:"entry/server/s6.md"},a=p(`<p>springBoot中提供了很多Enable开头的注解，这些注解都是用于动态启用某些功能的。而底层原理是使用@Import注解导入一些配置类，实现Bean的动态加载</p><p>然后我们思考一个问题，springBoot工程是否可以直接获取jar包中定义的Bean呢？</p><p>我们可以自己来验证一把。</p><p>首先，这需要两个项目工程，一个用来定义Bean，另一个用来获取Bean。</p><p>新建一个工程，叫做 <code>java-springBoot-main</code></p><p>我们在工程中先获取一个Bean(这个我们规定为项目1)，暂且定义为person,一会儿我们会在另外一个工程中定义这个Bean</p><pre><code>Object person = context.getBean(&quot;person&quot;);
System.out.println(person);
</code></pre><p>然后我们新建一个工程，工程名叫做 <code>java-springBoot-other</code>， 写一下person这个Bean（这个我们叫项目2）</p><p>先在domain的文件夹新建一个Person这个类，里边什么也不写</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">package com.example.domain;</span></span>
<span class="line"><span style="color:#e1e4e8;">public class Person {</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">package com.example.domain;</span></span>
<span class="line"><span style="color:#24292e;">public class Person {</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>然后再写个配置类，在config文件夹下新建PersonConfig这个配置类</p><pre><code>package com.example.config;

import com.example.domain.Person;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PersonConfig {
    @Bean
    public Person person () {
        return new Person();
    }
}
</code></pre><p>然后我们运行一下项目1，看看能否获取person这个Bean</p><p>可以看到控制台上报错了，提示不能获取这个Bean</p><p>为什么呢？ 我们可以看一下启动类上有一个注解 <code>SpringBootApplication</code>, 点进这个注解可以看一下这里边有一个注解叫 <code>ComponentScan</code>， 这个注解有一个作用，它其实是起扫描作用的，他的扫描范围是当前引导类所在包及其子包，项目1的包名是<code>com.example.javaspringbootmain</code>, 项目2这个Bean的包名是 <code>com.example.config</code>, 既不是这个类下的包，也不是他的子包，因此我们就不能获取这个Bean了</p><p>其实想要获取这个Bean还是有很多方法的：</p><blockquote><p>使用@ComponentScan扫描<code>com.example.config</code></p></blockquote><p>想要获取这个包，我们需要先导入包的坐标，在项目1的pom.xml中写一个项目2的坐标：</p><pre><code>&lt;dependency&gt;
    &lt;groupId&gt;com.example&lt;/groupId&gt;
    &lt;artifactId&gt;java-springBoot-other&lt;/artifactId&gt;
    &lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><p>在项目1的引导类上添加一个注解</p><pre><code>@SpringBootApplication
@ComponentScan(&quot;com.example.config&quot;)
public class JavaSpringBootMainApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(JavaSpringBootMainApplication.class, args);
        Object person = context.getBean(&quot;person&quot;);
        System.out.println(person);
    }
}
</code></pre><p>重新运行一下项目1,可以看到打印出了Bean</p><p>但是我们仔细想想，这么做多少有些不太优雅，因为如果要获取很多Bean，就要写很多个 <code>ComponentScan</code>注解，况且我们不一定知道他们的包名，有没有别的方式呢？</p><p>答案肯定是有</p><p>第二种方法就是使用 <code>import</code>注解，来加载类，原理就是使用import导入的类都会被spring创建，并放入IOC容器中</p><p>所以项目1的代码变成了如下：</p><pre><code>@SpringBootApplication
@Import(PersonConfig.class)
public class JavaSpringBootMainApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(JavaSpringBootMainApplication.class, args);
        Object person = context.getBean(&quot;person&quot;);
        System.out.println(person);
    }
}
</code></pre><p>重启项目1，也是可以获取到person这个Bean的</p><p>但是这个方法虽然比第一种好些，但还是不太优雅，我们需要记住很多类名</p><p>所以有了第三种方案</p><p>第三种方案就是我们可以对Import注解进行封装</p><p>在项目2中新建一个注解，名字叫做 <code>EnablePerson</code>, 把我们刚才导入的类写在里边，然后点到import注解把他的三个注解也加上</p><pre><code>@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(PersonConfig.class)
public @interface EnablePerson {
}
</code></pre><p>然后我们修改一下项目1， 直接使用这个注解就行了</p><pre><code>@SpringBootApplication
@EnablePerson
public class JavaSpringBootMainApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(JavaSpringBootMainApplication.class, args);
        Object person = context.getBean(&quot;person&quot;);
        System.out.println(person);
    }
}
</code></pre><p>重启项目1就可以获取Bean了</p><p>所以归根结底，是 import注解起的作用，下一节我们就详细了解一下import注解</p>`,37),c=[a];function s(i,r,l,d,g,m){return e(),o("div",null,c)}const b=n(t,[["render",s]]);export{B as __pageData,b as default};
