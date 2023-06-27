
pnpm官网地址：https://www.pnpm.cn

# 仿element-plus 组件库搭建

## 1.搭建 monorepo 环境

pnpm官网地址：https://www.pnpm.cn

> 使用pnpm安装包速度快，磁盘空间利用率高效，使用pnpm可以快速建立monorepo，这里我们使用pnpm workspace来实现monorepo
> 在一个大的项目仓库中，管理多个模块/包（package），这种类型的项目大都在项目根目录下有一个packages文件夹，分多个项目管理。

### 1.1 使用pnpm

- 安装
```bash
npm install pnpm -g # 全局安装pnpm
```
- 创建package.json 文件
```bash
pnpm init # 初始化package.json配置文件
```
- 新建配置文件 .npmrc

```
shamefully-hoist=true  
strict-peer-dependencies=false 
```
> shamefully-hoist=true ,如果某些工具仅在根目录的node_modules时才有效，可以将其设置为true来提升那些不在根目录的node_modules，就是将你安装的依赖包的依赖包的依赖包的...都放到同一级别（扁平化）。说白了就是不设置为true有些包就有可能会出问题。

> strict-peer-dependencies=false（ pnpm v6升v7的变化）peer deps 不需要严格，在 .npmrc 里把 strict-peer-dependencies 置为 false ，我们不需要严格的 peer deps 依赖链。

element-plus最新版本用的是pnpm@7.2.1

 - 创建 .nvmrc 文件

 >项目中配置了.nvmrc 用于锁定当前项目需要的node版本
 ```
 v16
 ```
 nvm use #无需指定版本号，会自动使用 .nvmrc 文件中配置的版本

### 1.2 monorepo的实现

为了我们各个项目之间能够互相引用我们要新建一个pnpm-workspace.yaml文件将我们的包关联起来

> 早期我们会用yarn workspaces，现在npm官方也支持了workspaces,workspaces解决了本地文件系统中如何在一个顶层root package下管理多个子packages的问题，在workspaces声明目录下的package会软链到最上层root package的node_modules中。

在项目根目录下建立pnpm-workspace.yaml配置文件
```yaml
packages:
  - packages/*   # 存放编写组件的
  - docs  # 存放文档的
  - play  # 测试组件的
  - internal/*  # 组件库打包之后的文件
```

### 1.3 安装对应依赖

我们开发环境中的依赖一般全部安装在整个项目根目录下，方便下面我们每个包都可以引用,所以在安装的时候需要加个 -w

```bash
pnpm i vue@next typescript sass -D -w
```

- 配置tsconfit.json

```bash
npx tsc --init # 初始化ts配置文件 
```

tsconfig.base.json

```json
{
  "compilerOptions": {
    "outDir":"dist",  //用来指定编译后文件所在的目录   使用 "outDir"指定的目录下的文件永远会被编译器排除，除非你明确地使用"files"将其包含进来
    "target": "es2018", // 遵循es9版本
    "module": "ESNext", // 打包模块类型ESNext
    "baseUrl": ".",
    "sourceMap": true,
    "moduleResolution": "node", // 按照node模块来解析
    "allowJs": false, //允许编译javascript文件
    "strict": true, // 是否启动严格模式
    "noUnusedLocals": true, //用于检查是否有定义了但是没有使用的变量，对于这一点的检测，使用eslint可以在你书写代码的时候做提示，你可以配合使用。它的默认值为false
    "resolveJsonModule": true, //TypeScript 导入 JSON Module
    "allowSyntheticDefaultImports": true, //允许没有导出的模块中导入 
    "esModuleInterop": true, //通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
    "removeComments": false, // 删除注释
    "rootDir": ".", //rootDirs可以指定一个路径列表，在构建时编译器会将这个路径列表中的路径的内容都放到一个文件夹中 
    "types": [], //types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来 
    "paths": { //用于设置模块名称到基于baseUrl的路径映射 
      "@el-plus/*": ["packages/*"]
    } 
  }
}
```

tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.web.json" },
    { "path": "./tsconfig.play.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.vite-config.json" },
    { "path": "./tsconfig.vitest.json" }
  ]
}
```
不同的模块引入的ts配置文件有所不同

## 2.创建组件测试环境(搭建一个基于vite的vue3项目)

## 2.1 初始化仓库

- 新建文件夹

```bash
mkdir play && cd play
pnpm init
```

```json
{
  "name": "@el-plus/play",
  "version": "1.0.0",
  "description": "组件测试环境",
  "scripts": {
  },
  "author": "yx",
  "license": "ISC",
  "dependencies": {
  }
}
```

- 安装vite和@vitejs/plugin-vue

> @vitejs/plugin-vue用来支持.vue文件的转译

```bash
pnpm add vite --filter @el-plus/play
pnpm add @vitejs/plugin-vue --filter @el-plus/play # 安装vite及插件
```

文件目录：
```
play
  ├─app.vue
  ├─index.html
  ├─main.ts
  ├─package.json
  └─vite.config.ts
```
- 配置vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins:[vue()]
})
```
- 新建html文件
@vitejs/plugin-vue 会默认加载play下的index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./main.ts" ></script>
</body>
</html>

```
注意： 是基于esmodule的 所以type="module"

- app.vue模板

```vue
<template>
  <div>
      测试
  </div>
</template>
```
- main.ts

```ts
import {createApp} from 'vue'
import App from './app.vue'

const app = createApp(App)

app.mount('#app')
```
此时会发现编译器会提示个错误：找不到模块“./app.vue”或其相应的类型声明

> 因为直接引入.vue文件 TS会找不到对应的类型声明；所以需要新建typings（命名没有明确规定，TS会自动寻找.d.ts文件）文件夹来专门放这些声明文件。

- 提供typescript声明文件 typings/vue-shim.d.ts

TypeScriptTS默认只认ES 模块。如果你要导入.vue文件就要declare module把他们声明出来。

```
declare module '*.vue' {
    import type { DefineComponent } from "vue";
    const component:DefineComponent<{},{},any>
    export default component
}
```

- 配置脚本启动项目
最后在package.json文件中配置scripts脚本
```json
"scripts": {
    "dev": "vite"
  },
```

- 终端输入我们命令：pnpm run dev

vite启动端口为5173；在浏览器中打开localhost:5173 就会看我们的“测试”页面。(具体端口根据自己启动项目时的实际端口为准)

## 3.开发组件库

### 3.1 新建包文件

新建packages文件夹

```
packages
  ├─components  //存放各种UI组件的包
  ├─utils       //存放我们公共方法，工具函数
  ├─theme-chalk  //存放组件的样式
  ├─element-plus //组件的入口包
  └─constants    //存放常量
```

- 组件库包（components）

新建components文件夹并执行 pnpm init 生成package.json

这里需要改一下包名，我这里将name改成@el-plus/components表示这个utils包是属于el-plus这个组织下的。所以记住发布之前要登录npm新建一个组织；例如el-plus





