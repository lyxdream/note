//配置模块及其路径
require.config({
  baseUrl: "./src", //默认为当前文件所在目录
  paths: {
    foo: "./foo"
  },
});

//使用模块
require(["foo"], function (foo) {
  console.log(foo.name, foo.age);
});
