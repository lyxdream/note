
# element-plus 源码之 package.json

开始看源码之前要熟悉整个项目架构，就得看 package.json，下面我们对 package.json 里面的几个主要参数的做下介绍：

上代码

```json
{
  "name": "element-plus",
  "version": "0.0.0-dev.1",
  "description": "A Component Library for Vue 3",
  "keywords": [
    "element-plus",
    "element",
    "component library",
    "ui framework",
    "ui",
    "vue"
  ],
  "homepage": "https://element-plus.org/",
  "bugs": {
    "url": "https://github.com/element-plus/element-plus/issues"
  },
  "license": "MIT",
  "main": "lib/index.js",
  "module": "es/index.mjs",
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
  "unpkg": "dist/index.full.js",
  "jsdelivr": "dist/index.full.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/element-plus/element-plus.git"
  },
  "publishConfig": {
    "access": "public"
  },
  "style": "dist/index.css",
  "sideEffects": [
    //哪些文件是有副作用的
    "dist/*",
    "theme-chalk/**/*.css",
    "theme-chalk/src/**/*.scss",
    "es/components/*/style/*",
    "lib/components/*/style/*"
  ],
  "peerDependencies": {
    "vue": "^3.2.0"
  },
  "dependencies": {},
  "devDependencies": {},
  "vetur": {
    "tags": "tags.json",
    "attributes": "attributes.json"
  },
  "web-types": "web-types.json",
  "browserslist": ["> 1%", "not ie 11", "not op_mini all"]
}
```

```
name：包名
version：版本号
description：关于包的一些功能描述
keywords：搜索关键字
...
```

接下来主要的来了，我们都知道 package.json 里的 main 字段是用来指示包的入口文件，通常情况下它都是指向 commonjs 模块入口，要使用 ES Module 的 Tree Shaking 功能，就需要增加一个字段 module，指向 esmodule 模块入口

```json
  "main": "lib/index.js",
  "module": "es/index.mjs",
```

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

2. 子目录别名

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
sideEffects:开启了sideEffects配置后，webpack在打包时就会先检查当前代码所属的package.json中有没有sideEffects的标识，以此来判断这个模块是不是又副作用。如果这个模块没有副作用，这些没被用到的模块就不会被打包。（这个特性在production模式下会自动开启）
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

peerDependencies

- 在npm2中

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

- npm3中

element-plus包中peerDependencies所指定的依赖会随着npm install element-plus一起被强制安装，所以不需要在宿主环境的package.json文件中指定对element-plus中peerDependencies内容的依赖。

但是在npm3中，peerDependencies的表现与npm2不同：

> npm3中不会再要求peerDependencies所指定的依赖包被强制安装，相反npm3会在安装结束后检查本次安装是否正确，如果不正确会给用户打印警告提示。
如：vue是一个需要的依赖，但是没有被安装。 

这时，你需要手动的在MyProject项目的package.json文件指定PackageB的依赖。
另外，在npm3的项目中，可能存在一个问题就是你所依赖的一个package包更新了它peerDependencies的版本，那么你可能也需要在项目的package.json文件中手动更新到正确的版本。

## 参考文章 

- webpack之sideEffects：https://blog.csdn.net/weixin_45047039/article/details/110387613
- ES6教程：https://es6.ruanyifeng.com/
- https://www.jianshu.com/p/e8fec377eeb8
