import{_ as s,o as n,c as a,V as e}from"./chunks/framework.d56a99a4.js";const v=JSON.parse('{"title":"yaml语法","description":"","frontmatter":{"title":"yaml语法"},"headers":[],"relativePath":"entry/server/s3.md","filePath":"entry/server/s3.md","lastUpdated":1693989932000}'),l={name:"entry/server/s3.md"},p=e(`<h2 id="_1-基本语法" tabindex="-1">1.基本语法 <a class="header-anchor" href="#_1-基本语法" aria-label="Permalink to &quot;1.基本语法&quot;">​</a></h2><ul><li>大小写敏感</li><li>数据值前边必须有空格，作为分隔符</li><li>使用缩进标识层级关系</li><li>缩进式不允许使用Tab键，只允许使用空格（各个系统Tab对应的空格数目可能不同，导致层次混乱***特别说明：idea对yaml有良好的支持，使用tab键缩进也能是排版整洁）</li><li>缩进的空格数目不重要，只要相同层级的原色左对齐即可</li><li>“#” 表示注释，从这个字符一直到行尾，都会被解析器忽略</li><li>配置文件优先级： .properties&gt;.yml&gt;yaml</li></ul><pre><code>server:
    port: 8080
    address: 127.0.0.1
name: abc
</code></pre><h2 id="_2-数据格式" tabindex="-1">2.数据格式 <a class="header-anchor" href="#_2-数据格式" aria-label="Permalink to &quot;2.数据格式&quot;">​</a></h2><ul><li>对象（map）: 键值对的集合</li></ul><pre><code>// 一般写法
person:
    name: zhangsan 
    
// 行内写法
person: {name: zhangsan}
</code></pre><ul><li>数组： 子组按次序排列的值</li></ul><pre><code>// 一般写法
address:
    - beijing
    - shanghai
    
// 行内写法
address: [beijing,shanghai]
</code></pre><ul><li>纯量： 带个的，不可再分的值</li></ul><pre><code>msg1: &#39;hello \\n world&#39; // 单引号忽略转义字符，输出为一行
msg2: &quot;hello \\n world&quot; // 双引号识别转义字符，输出为两行
</code></pre><ul><li>参数引用</li></ul><pre><code>name: abc

person:
    name: \${name}
</code></pre><h2 id="_3-读取配置内容" tabindex="-1">3.读取配置内容 <a class="header-anchor" href="#_3-读取配置内容" aria-label="Permalink to &quot;3.读取配置内容&quot;">​</a></h2><blockquote><p>三种方式</p></blockquote><ul><li>注解： @Value 缺点： 属性太多的话会写一堆代码</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">例如方法内有个属性:</span></span>
<span class="line"><span style="color:#e1e4e8;">@Value(&quot;\${name}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">private String name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 对象</span></span>
<span class="line"><span style="color:#e1e4e8;">@Value(&quot;\${person.name}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">private String name2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">@Value(&quot;\${address[1]}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">private String name3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">例如方法内有个属性:</span></span>
<span class="line"><span style="color:#24292e;">@Value(&quot;\${name}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">private String name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 对象</span></span>
<span class="line"><span style="color:#24292e;">@Value(&quot;\${person.name}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">private String name2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">@Value(&quot;\${address[1]}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">private String name3</span></span></code></pre></div><ul><li>环境对象： Environment</li></ul><pre><code>@Autowired
private Environment env

System.out.print(env.getProperty(&quot;person.name&quot;))
</code></pre><ul><li>注解： @ConfigurationProperties</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Component</span></span>
<span class="line"><span style="color:#e1e4e8;">@ConfigurationProperties(prefix = &quot;persion&quot;) // 表示yaml中的person配置和类中的属性一一对应</span></span>
<span class="line"><span style="color:#e1e4e8;">public class Person {</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String name;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    public void setName ( String name ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        this.name = name</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    public String getName () {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return name</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Component</span></span>
<span class="line"><span style="color:#24292e;">@ConfigurationProperties(prefix = &quot;persion&quot;) // 表示yaml中的person配置和类中的属性一一对应</span></span>
<span class="line"><span style="color:#24292e;">public class Person {</span></span>
<span class="line"><span style="color:#24292e;">    private String name;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    public void setName ( String name ) {</span></span>
<span class="line"><span style="color:#24292e;">        this.name = name</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    public String getName () {</span></span>
<span class="line"><span style="color:#24292e;">        return name</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="profile" tabindex="-1">Profile <a class="header-anchor" href="#profile" aria-label="Permalink to &quot;Profile&quot;">​</a></h2><ul><li>profile是用来完成不同环境下，配置动态切换功能的</li><li>profile配置方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1. 多profile 文件方式： 提供多个配置文件， 每个代表一种环境，例如：</span></span>
<span class="line"><span style="color:#e1e4e8;"> application-dev.yml 开发环境</span></span>
<span class="line"><span style="color:#e1e4e8;"> application-test.yml 测试环境</span></span>
<span class="line"><span style="color:#e1e4e8;"> application-pro.yml 生产环境</span></span>
<span class="line"><span style="color:#e1e4e8;"> ** 在主文件application.yml通过设置 spring.profiles.active = dev激活</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">2. yml多文档方式，写在一个文件即可，使用---分割不同配置</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">server:</span></span>
<span class="line"><span style="color:#e1e4e8;">  port: 8081</span></span>
<span class="line"><span style="color:#e1e4e8;">spring:</span></span>
<span class="line"><span style="color:#e1e4e8;">  porfiles: dev</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">server:</span></span>
<span class="line"><span style="color:#e1e4e8;">  port: 8082</span></span>
<span class="line"><span style="color:#e1e4e8;">spring:</span></span>
<span class="line"><span style="color:#e1e4e8;">  porfiles: test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">server:</span></span>
<span class="line"><span style="color:#e1e4e8;">  port: 8083</span></span>
<span class="line"><span style="color:#e1e4e8;">spring:</span></span>
<span class="line"><span style="color:#e1e4e8;">  porfiles: pro</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">spring:</span></span>
<span class="line"><span style="color:#e1e4e8;">  profiles:</span></span>
<span class="line"><span style="color:#e1e4e8;">    active: dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1. 多profile 文件方式： 提供多个配置文件， 每个代表一种环境，例如：</span></span>
<span class="line"><span style="color:#24292e;"> application-dev.yml 开发环境</span></span>
<span class="line"><span style="color:#24292e;"> application-test.yml 测试环境</span></span>
<span class="line"><span style="color:#24292e;"> application-pro.yml 生产环境</span></span>
<span class="line"><span style="color:#24292e;"> ** 在主文件application.yml通过设置 spring.profiles.active = dev激活</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">2. yml多文档方式，写在一个文件即可，使用---分割不同配置</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">server:</span></span>
<span class="line"><span style="color:#24292e;">  port: 8081</span></span>
<span class="line"><span style="color:#24292e;">spring:</span></span>
<span class="line"><span style="color:#24292e;">  porfiles: dev</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">server:</span></span>
<span class="line"><span style="color:#24292e;">  port: 8082</span></span>
<span class="line"><span style="color:#24292e;">spring:</span></span>
<span class="line"><span style="color:#24292e;">  porfiles: test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">server:</span></span>
<span class="line"><span style="color:#24292e;">  port: 8083</span></span>
<span class="line"><span style="color:#24292e;">spring:</span></span>
<span class="line"><span style="color:#24292e;">  porfiles: pro</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">spring:</span></span>
<span class="line"><span style="color:#24292e;">  profiles:</span></span>
<span class="line"><span style="color:#24292e;">    active: dev</span></span></code></pre></div><ul><li>profile激活方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1. 配置文件： 在配置文件中配置： spring.profiles.active = dev</span></span>
<span class="line"><span style="color:#e1e4e8;">2. 虚拟机参数： 在VM options指定： -Dspring.profiles.active = dev</span></span>
<span class="line"><span style="color:#e1e4e8;">3. 命令行参数： java -jar xxx.jar --spring.profiles.active = dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1. 配置文件： 在配置文件中配置： spring.profiles.active = dev</span></span>
<span class="line"><span style="color:#24292e;">2. 虚拟机参数： 在VM options指定： -Dspring.profiles.active = dev</span></span>
<span class="line"><span style="color:#24292e;">3. 命令行参数： java -jar xxx.jar --spring.profiles.active = dev</span></span></code></pre></div><h2 id="_4-内部加载顺序" tabindex="-1">4. 内部加载顺序 <a class="header-anchor" href="#_4-内部加载顺序" aria-label="Permalink to &quot;4. 内部加载顺序&quot;">​</a></h2><p>Springboot程序启动时，会从以下位置加载配置文件</p><ol><li>file:./config/: 当前项目下的/config目录下</li><li>file:./：当前项目的根目录</li><li>classpath:/config/: classpath的/config目录下</li><li>classpath:/ ：classpath的根目录（我们平常在resources下写的配置文件会被打包到这个目录下）</li></ol><p>加载顺序为以上的排列顺序，相同属性高优先级配置会生效，低优先级的其他属性同样生效</p><h2 id="_5-内部加载顺序" tabindex="-1">5. 内部加载顺序 <a class="header-anchor" href="#_5-内部加载顺序" aria-label="Permalink to &quot;5. 内部加载顺序&quot;">​</a></h2><p>打包不会把config目录下的配置打进去</p><p>我们可以通过命令行制定响应的参数，例如：</p><pre><code>java -jar .\\java-spring-boot-0.0.1-SNAPSHOT.jar --server.port=8082
</code></pre><p>但是如果配置太多，全部用命令去敲，显然会很繁琐，所以我们可以写一个配置文件，我们先把他放在D盘的根目录下，叫做【application.yaml】，里面写如下内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server:</span></span>
<span class="line"><span style="color:#e1e4e8;">  port: 8088</span></span>
<span class="line"><span style="color:#e1e4e8;">spring:</span></span>
<span class="line"><span style="color:#e1e4e8;">  porfiles: dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server:</span></span>
<span class="line"><span style="color:#24292e;">  port: 8088</span></span>
<span class="line"><span style="color:#24292e;">spring:</span></span>
<span class="line"><span style="color:#24292e;">  porfiles: dev</span></span></code></pre></div><p>然后使用命令指定当前配置：</p><pre><code>java -jar .\\java-spring-boot-0.0.1-SNAPSHOT.jar --spring.config.location=d://application.yaml
</code></pre><p>如果和jar包在同级目录，我们可以使用相对路径：</p><pre><code>java -jar .\\java-spring-boot-0.0.1-SNAPSHOT.jar --spring.config.location=./application.yaml
</code></pre><p>如果配置文件和jar包在同级目录，或者同级目录的config文件，可以不用指定配置文件，他会默认加载这两个路径的配置文件</p><p>*注意： config目录的优先级的优先级会更高</p>`,41),o=[p];function i(c,r,t,y,d,u){return n(),a("div",null,o)}const h=s(l,[["render",i]]);export{v as __pageData,h as default};
