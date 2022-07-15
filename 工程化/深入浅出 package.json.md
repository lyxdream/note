# 深入浅出 package.json

> npm是前端开发人员广泛使用的包管理工具，项目中通过package.json来管理项目中所依赖的npm包的配置。package.json就是一个json文件，除了能够描述项目的包依赖外，允许我们使用“语义化版本规则”指明你项目依赖包的版本，让你的构建更好地与其他开发者分享，便于重复使用。

> 项目的 package.json 是配置和描述如何与程序交互和运行的中心。 npm CLI（和 yarn）用它来识别你的项目并了解如何处理项目的依赖关系。package.json 文件使 npm 可以启动你的项目、运行脚本、安装依赖项、发布到 NPM 注册表以及许多其他有用的任务。 npm CLI 也是管理 package.json 的最佳方法，因为它有助于在项目的整个生命周期内生成和更新 package.json 文件。


## 1. package.json

### 1.1 package.json简介

在nodejs项目中，package.json是管理其依赖的配置文件，通常我们在初始化一个nodejs项目的时候会通过：

```bash
npm init
```
然后在你的目录下会生成3个目录/文件， node_modules, package.json和 package.lock.json。其中package.json的内容为：

```json
{
    "name": "Your project name",
    "version": "1.0.0",
    "description": "Your project description",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
    },
    "author": "Author name",
    "license": "ISC",
    "dependencies": {
        "dependency1": "^1.4.0",
        "dependency2": "^1.5.2"
    }
}
```
> 上述可以看出，package.json中包含了项目本身的元数据,以及项目的子依赖信息(比如dependicies等)。


###  1.2 package-lock.json

我们发现在npm init的时候，不仅生成了package.json文件，还生成了package-lock.json文件。那么为什么存在package.json的清空下，还需要生成package-lock.json文件呢。本质上package-lock.json文件是为了锁版本，在package.json中指定的子npm包比如：react: "^16.0.0"，在实际安装中，只要高于react的版本都满足package.json的要求。这样就使得根据同一个package.json文件，两次安装的子依赖版本不能保证一致。
而package-lock文件如下所示，子依赖dependency1就详细的指定了其版本。起到lock版本的作用。

```
{
    "name": "Your project name",
    "version": "1.0.0",
    "lockfileVersion": 1,
    "requires": true,
    "dependencies": {
        "dependency1": {
            "version": "1.4.0",
            "resolved": 
"https://registry.npmjs.org/dependency1/-/dependency1-1.4.0.tgz",
            "integrity": 
"sha512-a+UqTh4kgZg/SlGvfbzDHpgRu7AAQOmmqRHJnxhRZICKFUT91brVhNNt58CMWU9PsBbv3PDCZUHbVxuDiH2mtA=="
        },
        "dependency2": {
            "version": "1.5.2",
            "resolved": 
"https://registry.npmjs.org/dependency2/-/dependency2-1.5.2.tgz",
            "integrity": 
"sha512-WOn21V8AhyE1QqVfPIVxe3tupJacq1xGkPTB4iagT6o+P2cAgEOOwIxMftr4+ZCTI6d551ij9j61DFr0nsP2uQ=="
        }
    }
}

```

## 2.package.json常用属性

### 2.1 name：包名

 name 规范

- 最好取简短而语义化的值
- 不能以,.开头
- 不能有大写字母/空格/下滑线!
- 不能和 NPM 网站中已有的包名字重名！

### 2.2 version：版本号

version 具体体现为：:“x.y.z”

修复 bug,小改动，增加 z
增加了新特性，但仍能向后兼容，增加 y
有很大的改动，无法向后兼容,增加 x
```
使用 npm version <update_type>自动升级版本号
update_type为patch, minor, major其中之一，分别表示补丁，小改，大改

npm version patch
npm version minor
npm version major
```

### 2.3 description 一个描述，方便别人了解你的模块作用，搜索的时候也有用。

```json
{
  "description": "xxxx"
}
```
### 2.4 private

如果为 true，则该程序包被视为私有程序,Yarn/NPM 会在任何情况下均拒绝发布该程序包。这防止私人存储库意外发布
```json
{
  "private": true
}
```

### 2.5 keywords 一个字符串数组，方便别人搜索到本模块

```json
{
  "keywords": [
    "ant",
    "component",
    "design"
  ]
}
```
> 当我们使用 npm 检索模块时，会对模块中的 description 字段和 keywords 字段进行匹配，写好 package.json 中的 description 和 keywords 将有利于增加我们模块的曝光率。

### 2.6 homepage

项目主页 url,默认值为/

一般来说，我们打包的静态资源会部署在 CDN 上，为了让我们的应用知道去哪里加载资源，则需要我们设置一个根路径，这时可以通过 package.json 中的 homepage 字段设置应用的根路径。

```json
{
  "homepage": "https://ant.design"
}
```
### 2.7 bugs
填写一个 bug 提交地址或者一个邮箱，被你的模块坑到的人可以通过这里吐槽，例如：
```json
{
  "bugs": {
    "url":"https://github.com/ant-design/ant-design/issues"
  }
}
```
### 2.8 license

你应该为你的开源代码模块制定一个开源协议，让用户知道他们有何权限来使用你的模块，以及使用该模块有哪些限制
  - MIT 是最少约束的选择。
  - GPL 是最多约束的。
如果是个人随意作品，建议 MIT 许可。如果是公司或者需要严格保护的开源产品，GPL。

```json
{
  "license": "MIT"
}
```
![license1](./../static/1.png)
![license2](./../static/2.png)


### 2.9 和用户相关的属性: author, contributors

```json
{
  "author": "iikonan",
  "contributors": [
    "zhangsan",
    "lisi"
  ]
}
```

### 2.10 script

- scripts
该字段用于列出在运行 yarn run 时将要执行的小型 shell 脚本。
请注意，包含:（冒号）的脚本是项目的全局变量，无论你当前的工作空间如何，都可以调用它们。

> 请注意，脚本总是相对于最近的工作空间（而不是 cwd）执行。

```js
"scripts": {
  "test": "jest",
  "build:dev": "webpack-cli --config ./webpack.dev.config.js",
  "build:test": "webpack-cli --config ./webpack.test.config.js",
  "build:pro": "webpack-cli --config ./webpack.pro.config.js"
}
```

**NPM 脚本的原理**

npm 脚本的原理非常简单。每当执行 npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，npm run 新建的这个 Shell，会将当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。

这意味着，当前目录的 node_modules/.bin 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写 mocha test 就可以了。

```json
"test": "mocha test"
```
而不用写成下面这样:
```json
"test": "./node_modules/.bin/mocha test"
```
> 由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。
> npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是0，npm 就认为这个脚本执行失败。

### 2.11 bin

> 用于将某些可执行 Javascript 文件公开给父包的字段。 此处列出的所有条目都可以通过$ PATH 获得。通俗点理解就是我们全局安装， 我们就可以在命令行中执行这个文件， 本地安装我们可以在当前工程目录的命令行中执行该文件。

- bin属性用来将可执行文件加载到全局环境中，指定了bin字段的npm包，一旦在全局安装，就会被加载到全局环境中，可以通过别名来执行该文件。

```json
"bin": {
  "my-bin": "./dist/my-bin.js",
}
```
dist/my-bin.js
```js
#!/usr/bin/env node

console.log("cool");
```
> 一旦在全局安装，就会被加载到全局环境中，可以通过别名来执行该文件。 
```bash
my-bin -v
```
> 如果非全局安装，那么会自动连接到项目的node_module/.bin目录中。与前面介绍的script标签中所说的一致，可以直接用别名来使用。


### 2.12 workspaces


工作区是 monorepos 用来将一个大型项目拆分为半独立子项目的一项可选功能，每个子项目都列出了自己的一组依赖关系。 工作区字段是全局模式列表，这些模式与应成为应用程序工作区的所有目录匹配。

早期我们会用yarn workspaces，现在npm官方也支持了workspaces,workspaces解决了本地文件系统中如何在一个顶层root package下管理多个子packages的问题，在workspaces声明目录下的package会软链到最上层root package的node_modules中。

```json
{
  "name": "my-project",
  "workspaces": [
    "packages/a"
  ]
}
```
在一个npm包名为my-project的npm包中，存在workspaces配置的目录。
并且该最上层的名为my-project的root包，有packages/a子包。此时，我们如果npm install,那么在root package中node_modules中安装的npm包a，指向的是本地的package/a.

```
.
+-- node_modules
|  `-- packages/a -> ../packages/a
+-- package-lock.json
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
```
-- packages/a -> ../packages/a 指的就是从node_modules中a链接到本地npm包的软链

## 3.不常用属性

### 3.1funding 在开源领域，资金是一个长期存在的问题

funding命令的作用是让维护 npm 的开发人员(为 Node.js 创建包)声明元数据，为有意愿的捐赠者指明捐赠平台。

在 package.json 文件中添加了一个funding 字段， 可指向在线捐赠服务的 url，如 Patreon、Open Collective、GitHub Sponsors、License Zero 或者其他支付网站。

```json
{
  "funding": {
    "type": "opencollective",
    "url": "https://opencollective.com/ant-design"
  }
}
```

### 3.2 optionalDependencies

除非你依赖于 fsevents 软件包，否则通常不需要此字段。

如果仅在使用特定功能时才需要包，请使用可选的对等依赖项。

```json
{
  "optionalDependencies": {
    "fsevents": "^5.0.0"
  }
}
```
## 4.环境相关属性

### 4.1 type

> js的模块化规范包含了commonjs、CMD、UMD、AMD和ES module等，最早先在node中支持的仅仅是commonjs字段，但是从node13.2.0开始后，node正式支持了ES module规范，在package.json中可以通过type字段来声明npm包遵循的模块化规范。

  - commonjs(默认值),适用于 Node.js 环境(服务端)
  - module,即 ES Module 语法,适用于浏览器环境(客户端)

```json
//package.json
{
   "name": "some package",
   "type": "module"||"commonjs" 
}
```
需要注意的是：

  - 不指定type的时候，type的默认值是commonjs，不过建议npm包都指定一下type

  - 当type字段指定值为module则采用ESModule规范

  - 当type字段指定时，目录下的所有.js后缀结尾的文件，都遵循type所指定的模块化规范

  - 除了type可以指定模块化规范外，通过文件的后缀来指定文件所遵循的模块化规范，以.mjs结尾的文件就是使用的ESModule规范，以.cjs结尾的遵循的是commonjs规范`


### 4.2  main & module & browser
- main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
- module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node - 环境均可使用
- browser : 定义 npm 包在 browser 环境下的入口文件

package.json 里的 main字段，它可以用来指定加载的入口文件，通常情况下它都是指向 commonjs 模块入口，要使用 ES Module 的 Tree Shaking 功能，就需要增加一个字段 module，指向 esmodule 模块入口
> 最早先在node中支持的仅仅是commonjs字段，但是从node13.2.0开始后，node正式支持了ES module规范，
> 与 ES6 兼容的环境尝试通过其名称访问程序包时将使用的路径
> module 字段用于指向 ES 版本的库/包,一般指定为 webpack/rollup 打包 ES 版本后的路径

```json
  "main": "lib/index.js",
  "module": "es/index.mjs",
```
> 假如你的项目是一个 npm 包，当用户安装你的包后，require('my-module') 返回的是 main 字段中所列出文件的 module.exports 属性。

> 当不指定main字段时，默认值是模块根目录下面的 index.js 文件。

我们来看一下这3个字段的使用场景，以及同时存在这3个字段时的优先级。我们假设有一个npm包为demo1,

```
----- dist
   |-- index.browser.js
   |-- index.browser.mjs
   |-- index.js
   |-- index.mjs
```
其package.json中同时指定了main,module和browser这3个字段，

```

"main": "dist/index.js",  // main 
  "module": "dist/index.mjs", // module
 
  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
  "browser": {
    "./dist/index.js": "./dist/index.browser.js", // browser+cjs
    "./dist/index.mjs": "./dist/index.browser.mjs"  // browser+mjs
  },
 
  // "browser": "./dist/index.browser.js" // browser
```
默认构建和使用，比如我们在项目中引用这个npm包：

```js
import demo from 'demo'
```
> 通过构建工具构建上述代码后，模块的加载循序为：_browser+mjs > module > browser+cjs > main_这个加载顺序是大部分构建工具默认的加载顺序，比如webapck、esbuild等等。可以通过相应的配置修改这个加载顺序，不过大部分场景，我们还是会遵循默认的加载顺序。

### 4.3 exports

我们看到 package.json 里除了 main 和 module，还有一个 exports 字段,由于 exports 字段只有支持 ES6 的 Node.js 才认识，所以需要用 main 来兼容旧版本的 Node.js。

```json
 "exports": {
    ".": {
      "require": "./lib/index.js",
      "import": "./es/index.mjs"
    },
    "./es": "./es/index.mjs",
    "./lib": "./lib/index.js",
    "./es/*.mjs": "./es/*.mjs",
    "./es/*": "./es/*.mjs",
    "./lib/*.js": "./lib/*.js",
    "./lib/*": "./lib/*.js",
    "./*": "./*"
  },
```

exports 字段有多种用法：

1. exports 字段的别名如果是.，就代表模块的主入口，优先级高于 main 字段，利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。

```
 ".": {
      "require": "./lib/index.js",
      "import": "./es/index.mjs"
    },
```
上面代码中，别名.的 require 条件指定 require()命令的入口文件（即 CommonJS 的入口），import 条件指定其他情况的入口（即 ES6 的入口）。

2. 子目录别名(  exports还有一个最大的特点，就是条件引用，比如我们可以根据不同的引用方式或者模块化类型，来指定npm包引用不同的入口文件。)

```json
 "./es": "./es/index.mjs",
  "./lib": "./lib/index.js",
  "./es/*.mjs": "./es/*.mjs",
  "./es/*": "./es/*.mjs",
  "./lib/*.js": "./lib/*.js",
  "./lib/*": "./lib/*.js",
  "./*": "./*"
```

上面的代码指定./es/index.mjs 别名为./es，然后就可以从别名加载这个文件。

```js
//如：
import { ElButton } from "element-plus/es";
// 加载 ./node_modules/element-plus/es/index.mjs
```
- browserslist

> 指定该模板供浏览器使用的版本。Browserify 这样的浏览器打包工具，通过它就知道该打包那个文件。

```json
{
  "browserslist": [
    "> 0.5%",
    "last 2 versions",
    "Firefox ESR",
    "not dead",
    "IE 11",
    "not IE 10"
  ]
}

```
### 4.4 browserslist

> 指定该模板供浏览器使用的版本。Browserify 这样的浏览器打包工具，通过它就知道该打包那个文件。

```json
{
  "browserslist": [
    "> 0.5%",
    "last 2 versions",
    "Firefox ESR",
    "not dead",
    "IE 11",
    "not IE 10"
  ]
}
```
### 4.5 engines（指定项目 node 版本,指定适用的 npm 版本）

```json
"engines": {
    "node": ">= 16",
     "npm": ">= 6.9.0"
  }
``` 
> 需要注意的是，engines属性仅起到一个说明的作用，当用户版本不符合指定值时也不影响依赖的安装。

## 5.依赖相关属性

package.json中跟依赖相关的配置属性包含了dependencies、devDependencies、peerDependencies和peerDependenciesMeta等。

dependencies是项目的依赖，而devDependencies是开发所需要的模块，所以我们可以在开发过程中需要的安装上去，来提高我们的开发效率。这里需要注意的时，在自己的项目中尽量的规范使用，形如webpack、babel等是开发依赖，而不是项目本身的依赖，不要放在dependencies中。

### 5.1 dependencies

> 应用依赖，或者叫做业务依赖/生产环境依赖，这是我们最常用的依赖包管理对象！它用于指定应用依赖的外部包，这些依赖是应用发布后正常执行时所需要的，但不包含测试时或者本地打包时所使用的包

如：

```json
{
  "dependencies": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  }
}
```
放置生产环境依赖包的地方，即执行项目的 npm run build 时需要的依赖包。因此不要把开发环境的依赖包放在这里,比如

```
eslint
typesctipt
webpack-dev-server
……
```
因为会增加生产环境安装依赖的时间

### 5.2 devDependencies

与dependencies字段类似，但这些依赖项仅在本地开发环境中安装，而不会由软件包的使用者(生产环境)安装。
开发环境依赖，它的作用和dependencies一样，只不过它里面的包只用于开发环境，不用于生产环境，这些包通常是单元测试或者打包工具等，例如gulp, webpack, moca等

```json
{
  "devDependencies": {
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.1"
  }
}
```
放置开发环境依赖包的地方，即执行项目的 npm start 时需要的依赖包。因此不要把生产环境的依赖包放在这里

### 5.3 peerDependencies

 **在npm2中**

```
"peerDependencies": {
    "vue": "^3.2.0"
  },
```
> 它会告诉npm：如果某个package把element-plus列为依赖的话，那么那个package也必需应该有对vue的依赖。也就是说，如果你npm install element-plus，你将会得到下面的如下的目录结构：

```
MyProject
|- node_modules
   |- element-plus
   |- vue
```

在npm2中，即使当前项目MyProject中没有直接依赖vue，该vue包依然会安装到当前项目的node_modules文件夹中。

总结：peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。

**npm3中**


但是在npm3中，peerDependencies的表现与npm2不同：

> npm3中不会再要求peerDependencies所指定的依赖包被强制安装，相反npm3会在安装结束后检查本次安装是否正确，如果不正确会给用户打印警告提示。
如：vue是一个需要的依赖，但是没有被安装。 

这时，你需要手动的在MyProject项目的package.json文件指定PackageB的依赖。
另外，在npm3的项目中，可能存在一个问题就是你所依赖的一个package包更新了它peerDependencies的版本，那么你可能也需要在项目的package.json文件中手动更新到正确的版本。

### 5.4 peerDependenciesMeta

看到“Meta”就有元数据的意思，这里的peerDependenciesMeta就是详细修饰了peerDependicies，比如在react-redux这个npm包中的package.json中有这么一段：

```json
"peerDependencies": {
    "react": "^16.8.3 || ^17 || ^18"
  },
 "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    },
    "react-native": {
      "optional": true
    }
  }
```
这里指定了"react-dom","react-native"在peerDependenciesMeta中，且为可选项，因此如果项目中检测没有安装"react-dom"和"react-native"都不会报错。

值得注意的是，通过peerDependenciesMeta我们确实是取消了限制，但是这里经常存在非A即B的场景，比如上述例子中，我们需要的是“react-dom”和"react-native"需要安装一个，但是实际上通过上述的声明，我们实现不了这种提示。

## 6.发布相关的属性

### 6.1 files 描述了将软件包作为依赖项安装时要包括的条目，默认值为[“*”]，这意味着它将包括所有文件。

当你发布package时，具体那些文件会发布上去

```json
{
  "files": ["dist/**/*", "lib/**/*"]
}
```
你还可以在包的根目录或子目录中提供.npmignore 文件，以防止某些文件被发布。

.npmignore 文件的工作原理与.gitignore 一样。
如果存在.gitignore 文件，而缺少.npmignore，则将改用.gitignore 的内容。
files字段内容会覆盖.npmignore 和.gitignore的内容。

### 6.2 repository

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/ant-design/ant-design"
  }
}
```
### 6.3 publishConfig

此字段包含各种设置，仅当从本地来源生成包时才考虑这些设置（通过 yarn pack 或像 yarn npm publish 这样的发布命令之一）。

publishConfig.access定义将程序包发布到 npm 注册表时要使用的程序包访问级别。 有效值是公开的并且是受限制的，但是受限制的通常需要注册付费计划（这取决于你使用的注册表）。

publishConfig.bin如果存在，则在打包打包以将其运送到远程注册表之前，清单中的顶级 bin 字段将被设置为此新值。 这不会修改真正的清单，只会修改存储在 tarball 中的清单。

publishConfig.browser与publishConfig.bin属性的原理相同； 生成工作空间 tarball 时，将使用此值代替顶级浏览器字段。

publishConfig.executableFiles默认情况下，出于可移植性的原因，在 bin 字段中列出的文件之外的文件都不会在结果包归档文件中标记为可执行文件。 executeFiles 字段使你可以声明必须设置了可执行标志（+ x）的其他字段，即使不能通过 bin 字段直接访问它们也是如此。

publishConfig.main与publishConfig.bin属性相同的原理； 生成工作空间 tarball 时，将使用此值代替顶级“ main”字段。

publishConfig.module与publishConfig.bin属性相同的原理； 生成工作空间 tarball 时，将使用此值代替顶级“ module”字段。

publishConfig.registry如果存在，当将包推送到远程位置时，将替换配置中定义的任何注册表。

可能的值:
```
https://registry.npmjs.org/
https://npm.pkg.github.com
```

```json
{
  "publishConfig": {
    "access": "public",
    "bin": "./build/bin.js",
    "browser": "./build/browser.js",
    "executableFiles": ["./dist/shim.js"],
    "main": "./build/index.js",
    "module": "./build/index.mjs",
    "registry": "https://npm.pkg.github.com"
  }
}

```
## 7.三方属性

### 7.1 unpkg
unpkg 是一个内容源自 npm 的全球快速 CDN

配置unpkg 字段后,发布到 npmjs.com 中的包会自动同步到 unpkg.com 上，一般为 umd 格式。

```json
{
  "unpkg": "dist/antd.min.js"
}
```
### 7.2 typings  TypeScript 的入口文件

```json
{
  "typings": "lib/index.d.ts"
}

```

### 7.3 sideEffects

开启了sideEffects配置后，webpack在打包时就会先检查当前代码所属的package.json中有没有sideEffects的标识，以此来判断这个模块是不是又副作用。如果这个模块没有副作用，这些没被用到的模块就不会被打包。（这个特性在production模式下会自动开启）
在package.json中配置以下"sideEffects":false,打包就会清除未引用代码了。

package.json中关闭副作用，或者标识以下当前文件中有哪些文件是有副作用的，element-plus是这样写的：
```json
  "sideEffects": [
    //哪些文件是有副作用的
    "dist/*",
    "theme-chalk/**/*.css",
    "theme-chalk/src/**/*.scss",
    "es/components/*/style/*",
    "lib/components/*/style/*"
  ],
```
这样打包的时候就不会移除标识了的副作用模块了


## 参考文章

- webpack之sideEffects：https://blog.csdn.net/weixin_45047039/article/details/110387613
- ES6教程：https://es6.ruanyifeng.com/
- https://www.jianshu.com/p/e8fec377eeb8
- https://www.jianshu.com/p/c86d511d99fd
- https://blog.csdn.net/u012384510/article/details/124958427
