
https://www.jianshu.com/p/25d605cb7edf

https://www.jianshu.com/p/c38e19cda77c

https://zhuanlan.zhihu.com/p/395504491


https://es6.ruanyifeng.com/#docs/module


- ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。


- 完全替代CJS和AMD，淘汰了UMD，命名空间等规范
- 静态化，编译时加载，使得页面加载速度快
- ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，- 再到模块里面去取值
- import命令具有提升效果，因为是编译时加载，所以会比其他代码都先执行


ESM由于具有简单的语法，异步加载的特性，以及Tree-shakeable的特性，因此被广泛使用。
UMD可以在任何环境下使用，并且在ESM不能使用的情况下回选择UMD。
CJS是同步的，适用于后端环境。
AMD是异步的，适用于前端环境。

多种主流浏览器兼容。
具有类似CJS那样的简单的语法以及AMD的异步加载的功能。
具有Tree-shakeable的特性，这是由于ES6的静态模块结构。
rollup这样的打包器在打包ESM的时候，会除去冗余的代码，这样网站就可以加载更少的代码已加快加载速度。
可以在html代码中使用




- 在命名空间


后就出现了命名空间这个东西，命名空间就是说：若全局空间中已有同名对象，则不覆盖该对象，否则创建一个新的命名空间。
var MYNAMESPACE = MYNAMESPACE || {};
MYNAMESPACE.person = function() {
    console.log("hello word");
};















format：输出的文件可以还可以是 amd，umd，cjs，es，iife；

cjs，amd，umd，es，iife 区别：

cjs:

- 只能在 NodeJS 上运行，使用 require("module") 读取并加载模块。
- commonjs 导入模块是同步导入
- 主要用于后端，客户端用的话需要通过 Browserify
- 缺点：不支持浏览器，执行后才能拿到依赖信息，由于用户可以动态 require，无法做到提前分析依赖以及 Tree-Shaking 。

amd:

- Asynchronous Module Definition，可以看作 CJS 的异步版本，制定了一套规则使模块可以被异步 require 进来并在回调函数里继续使用
- 其适用于浏览器端

umd: (Universal Module Definition)

- 其是 amd 和 commonjs 的统一规范，支持两种规范，即写一套代码，可用于多种场景
- 支持直接在前端用 <script src="lib.umd.js"></script> 的方式加载
- 前后端均通用
- 与 CJS 或 AMD 不同，UMD 更像是一种配置多个模块系统的模式。
- UMD 在使用诸如 Rollup/ Webpack 之类的 bundler 时通常用作备用模块

IIFE:

- Immediately Invoked Function Expression，只是一种写法，可以隐藏一些局部变量

ESM：ESM 是 ES6 提出的标准模块系统

- ESM 格式被设计为可以被静态分析，打包器可以轻易做到分析依赖以及 Tree-Shaking,也支持动态加载（import()）。
- 现代浏览器中通过 <script type="module"> 直接导入
- 使用 import export 来管理依赖
- node 也开始支持
  > node 支持 ESModule node 最新版本进一步增强了对 ESModule 的支出，只需要在 package.json 增加一个选项即可 "type":"module"
- 很多浏览器开始支持
