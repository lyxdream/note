# npm 的配置文件 .npmrc

## .npmrc 配置文件的作用

.npmrc，可以理解成npm running cnfiguration, 即npm运行时配置文件。简单点说， .npmrc 可以设置 package.json 中依赖包的安装来源，既从哪里下载依赖包。

## .npmrc 配置文件的优先级

电脑中有多个 .npmrc 文件，在我们安装包的时候，npm按照如下顺序读取这些配置文件

- 项目配置文件: /project/.npmrc
- 用户配置文件：~/.npmrc
- 全局配置文件：$PREFIX/etc/npmrc
- npm 内置配置文件 /path/to/npm/npmrc

```
# 获取 .npmrc 用户配置文件路径
npm config get userconfig

// 如果想恢复默认配置，只需要将用户配置文件~/.npmrc删除即可；
```

```
# 获取 .npmrc 全局配置文件路径 $PREFIX
npm config get prefix

// 如果你不曾配置过全局文件，该文件不存在。
```


```
# 获取 npmrc 在npm的路径 
which npm
// 与npm同级别, 使用which npm获取 npm的路径

```

## 如何设置 .npmrc

### 1.设置项目配置文件

项目下 .npmrc 文件的优先级最高，可以给每个项目配置不同的镜像，项目之间的配置互不影响。
在项目的根目录下新建 .npmrc 文件，在里面以 key=value 的格式进行配置。

```
registry=https://registry.npm.taobao.org  //写入配置文件
```
也可以指定特殊的命名空间（scope）的来源。
以@test 开头的包从 registry=https://npm.xx.com 这里下载，其余全去淘宝镜像下载。

```
registry=https://registry.npm.taobao.org/
@test:registry = https://npm.xx.com
```

### 2. 设置用户配置文件
可以直接通过 npm config get userconfig 命令找到该文件的路径，然后直接仿照上述方法该文件，也可以通过 npm config set命令继续设置

```
npm config set registry https://registry.npm.taobao.org  //配置源为淘宝的源
```
如果想要删除一些配置，可以直接编辑.npmrc文件，也可以使用命令进行删除，比如：

```
npm config delete registry

```
### 3. 设置全局配置文件

```
npm config set registry https://registry.npm.taobao.org -g

```
### 4. 给npm 命令添加注册源选项

- 临时使用淘宝镜像

```
npm --registry=https://registry.npm.taobao.org [npm命令]

// 通过 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

//使用 npm 安装依赖包
npm install  --registry https://registry.npmjs.org
```
> 通过这种方式指定的注册源只在本条命令内有效；

> 不推荐用这种做法，更推荐设置项目配置文件 .npmrc

> yarn 会读取.npmrc的配置文件，所以不必为yarn再设置一次

- 在配置文件.npmrc 文件写入源地址

## 出现的问题
### 镜像出错
.npmrc 文件配置了私有包 registry 源，但是当前的下载源是淘宝镜像，可能会报错
```
error Command failed with exit code 1
```
> 可以将当前的下载源改成 私有包 registry 源，如果改了之后还是报错，可以尝试将lock文件，或者node_modules文件删掉，重新开始下载。

## 参考文章
- npm 的配置文件 .npmrc：https://blog.csdn.net/kelly0721/article/details/121908256