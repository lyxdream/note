# element2.0和element3.0的区别

## 1. Element Plus 的手动导入

> Element Plus 提供了基于 ES Module 开箱即用的 Tree Shaking 功能。

若需使用 button 组件，则可以这样写：

```vue

<template>
  <el-button>I am ElButton</el-button>
</template>
<script>
import 'element-plus/es/components/button/style/css'   //如果您使用 unplugin-element-plus 并且只使用组件 API，您需要手动导入样式。
import { ElButton } from "element-plus";
export default {
  components: { ElButton },
};
</script>
```

加载 ElButton 的时候，会去找 element-plus 下找到 components 包，components 包里有一 index 的总入口，会导出所有组件

```js
// element-plus\packages\components\index.ts
export * from "./button";
...
export * from './affix'
export * from './alert'
export * from './autocomplete'
export * from './avatar'

//export *命令会忽略模块的default方法
```

再根据导出文件的路径可以找到 button 组件的入口文件，加载以export导出的文件进行解析，实现Tree Shaking

```js
// element-plus\packages\components\button.ts
import { withInstall } from "@element-plus/utils";

import Button from "./src/button.vue";

export const ElButton = withInstall(Button);
export default ElButton;

export * from "./src/button";
```

> 为什么esmodule能实现Tree Shaking而commonjs规范不行,原因是esmodule是静态编译的，也就是在编译阶段就能确定模块的依赖关系,确定某个模块导出了什么，引入了什么，代码执行阶段不会改变，所以打包工具在打包的时候就能分析出哪个方法被使用了，哪些没有，没有用到的就可以放心的删掉了。

### 2. 浅析组件库实现按需引入的几种方式

#### element-plus按需引入的方式：
首先你需要安装 unplugin-vue-components 和 unplugin-auto-import 这两款插件
```
 npm install -D unplugin-vue-components unplugin-auto-import
```
支持Vite和Webpack两种方式
element-plus官放示例地址：https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%89%8B%E5%8A%A8%E5%AF%BC%E5%85%A5

- unplugin-vue-components文档地址：https://www.npmjs.com/package/unplugin-vue-components

> unplugin-vue-components 自动导入 components，无需再手动引入，如下：

```js
// Vite
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```
> 这种方式的优点是完全不需要自己来引入组件，直接在模板里使用，由插件来扫描引入并注册，这个插件内置支持了很多市面上流行的组件库，对于已经内置支持的组件库，直接参考上图引入对应的解析函数配置一下即可

官方element-plus部分导入规则的源码：https://github.com/antfu/unplugin-vue-components/edit/main/src/core/resolvers/element-plus.ts

贴上核心代码部分：
```ts
function resolveComponent(name: string, options: ElementPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude))
    return

  if (!name.match(/^El[A-Z]/))
    return

  if (name.match(/^ElIcon.+/)) {
    return {
      name: name.replace(/^ElIcon/, ''),
      from: '@element-plus/icons-vue',
    }
  }

  const partialName = kebabCase(name.slice(2))// ElTableColumn -> table-column
  const { version, ssr } = options

  // >=1.1.0-beta.1
  if (cv.compare(version, '1.1.0-beta.1', '>=')) {
    return {
      name,
      from: `element-plus/${ssr ? 'lib' : 'es'}`,
      sideEffects: getSideEffects(partialName, options),
    }
  }
  // >=1.0.2-beta.28
  else if (cv.compare(version, '1.0.2-beta.28', '>=')) {
    return {
      from: `element-plus/es/el-${partialName}`,
      sideEffects: getSideEffectsLegacy(partialName, options),
    }
  }
  // for <=1.0.1
  else {
    return {
      from: `element-plus/lib/el-${partialName}`,
      sideEffects: getSideEffectsLegacy(partialName, options),
    }
  }
}

/**
 * @deprecated
 * @param partialName
 * @param options
 *
 * @returns
 */
 function getSideEffectsLegacy(
  partialName: string,
  options: ElementPlusResolverOptionsResolved,
): SideEffectsInfo | undefined {
  const { importStyle } = options
  if (!importStyle)
    return

  if (importStyle === 'sass') {
    return [
      'element-plus/packages/theme-chalk/src/base.scss',
      `element-plus/packages/theme-chalk/src/${partialName}.scss`,
    ]
  }
  else if (importStyle === true || importStyle === 'css') {
    return [
      'element-plus/lib/theme-chalk/base.css',
      `element-plus/lib/theme-chalk/el-${partialName}.css`,
    ]
  }
}

function getSideEffects(dirName: string, options: ElementPlusResolverOptionsResolved): SideEffectsInfo | undefined {
  const { importStyle, ssr } = options
  const themeFolder = 'element-plus/theme-chalk'
  const esComponentsFolder = 'element-plus/es/components'

  if (importStyle === 'sass')
    return ssr ? `${themeFolder}/src/${dirName}.scss` : `${esComponentsFolder}/${dirName}/style/index`
  else if (importStyle === true || importStyle === 'css')
    return ssr ? `${themeFolder}/el-${dirName}.css` : `${esComponentsFolder}/${dirName}/style/css`
}

```
可以看到，不同的版本，插件检测到使用某个个组件的时候，加载的路径是不同的
- 版本<=1.0.1，会根据组件名在element-plus/lib/下面去找,如ElButton组件，加载路径是element-plus/lib/el-button，相应的样式文件会在会在'element-plus/packages/theme-chalk/src/下找到基础样式文件base.scss和组件的样式文件${partialName}.scss

- 版本>=1.0.2-beta.28，会根据组件名在element-plus/es/下面去找，如ElButton组件，加载路径是element-plus/es/el-button，相应的样式文件会在会在'element-plus/packages/theme-chalk/src/下找到基础样式文件base.scss和组件的样式文件${partialName}.scss

- 版本>=1.1.0-beta.1，会判断是否是服务端渲染，如果是服务端渲染，则组件加载路径是element-plus/lib，样式加载路径是element-plus/theme-chalk/src/${dirName}.scss,如果不是服务端渲染，则组件加载路径是element-plus/es，样式加载路径是element-plus/es/components/${dirName}/style/index

注意：由package.json配置：

```
  "./es": "./es/index.mjs",
  "./lib": "./lib/index.js",
```
> 可以看出，element-plus/es就是element-plus/es/index.mjs文件，element-plus/lib就是element-plus/lib/index.js文件


- unplugin-auto-import文档地址：https://www.npmjs.com/package/unplugin-auto-import

> 自动导入 Vite、Webpack、Rollup 和 esbuild 的 API。支持 TypeScript。由unplugin提供支持。

使用如下：

```js
// Vite
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    })
  ],
})
```

```js
import { ref } from "vue";
const count = ref(0);
//用插件之后：
const count = ref(0);
```
> 使用插件之后，不用自己手动导入vue的api,会在使用的时候自动导入相关的pai

总结：这两个插件做的事情只是帮我们引入组件并注册，实际上按需加载的功能还是得靠element-plus提供的基于 ES Module 开箱即用的 Tree Shaking 功能。

参考文章：https://blog.csdn.net/sinat_33488770/article/details/121708231
#### elementUi按需引入的方式：

element-ui2.0借助的是 babel-plugin-component插件，只引入需要的组件，以达到减小项目体积的目的
npm 地址: https://www.npmjs.com/package/babel-plugin-component

```
npm install babel-plugin-component -D
```
```
将 .babelrc 修改为：
  {
    "presets": [["es2015", { "modules": false }]],
    "plugins": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
  }
```
插件按需导入的原理：

```js
//编译之前：
import { Button } from "element-ui";

//编译之后：
var button = require("element-ui/lib/button");
require("element-ui/lib/theme-chalk/button/button.css");

//require('element-ui/lib/button/style.css')
```
使用插件之后，导入一个组件，会自动去包下面的lib文件夹，找到button.vue文件，同时加载对应的样式文件

### 3. babel-plugin-component 和 babel-plugin-import区别

文档地址：
babel-plugin-import： https://www.npmjs.com/package/babel-plugin-import
babel-plugin-component： https://github.com/ElementUI/babel-plugin-component


babel-plugin-import 是 ant-design 团队出的，可以说其他绝大部分按需引入的插件都是在此基础上魔改的。

babel-plugin-component 是饿了么团队在前者的基础上做了一些改动。主要是因为 fork 的时间太早（2016 年 4 月），饿了么修复了一些早期 bug 却并没有 PR 到 ant-design 的仓库里去，但后来 ant-design 也有修复；再就是后来 ant-design 的有一些配置项的变动、而饿了么团队却没有跟进合并。所以二者还是有一些差异的。


### 4. babel-plugin-import（babel 的模块化导入插件）

文档地址：https://www.npmjs.com/package/babel-plugin-import

常用参数：

```
  "libraryName": "antd",   //包名
  "libraryDirectory": "lib",   // 默认值：lib 
  "camel2DashComponentName": false,  // 默认值：true (camel2DashComponentName为false禁用从骆驼到-连接)
  "style": true  //模块化导入 js 和 css（LESS/Sass) 源文件

```
> 注意：使用style: true css 源文件被导入，并且可以在编译期间进行优化。使用style: "css"，预捆绑的 css 文件按原样导入。
> style: true可以显着减小包大小，具体取决于您对库的使用。

使用 customName自定义每个名称解析：

```
// .babelrc
 plugins: [
  [
    "import",
    {
      libraryName: "antd",
      camel2DashComponentName: false,
      customName: (name) => `@antd/packages/${name}`,
    },
  ],
],
```
```
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
ReactDOM.render(<_button>xxxx</_button>);

```
可以看到插件默认是在包的lib文件夹下找组件，如果想修改默认查找的文件夹可以修改libraryDirectory参数