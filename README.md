## KFui 使用指南

### 简介
  * demo文件夹中是一些示例html及js，用户可以从中看到所有组件的用法
  * module文件夹中是组件的源代码，用户可以自由修改，但无法push到仓库中
  * gulpfile.js定义了一系列的gulp任务，用户可以执行这些任务来做开发，打包等工作，具体任务的使用方式见后面的描述
  * jspm.config.js管理项目中使用到的前端库，用户通过gulp任务去管理，一般不需要手动修改
  * lib.js用户用到的库文件，用法见 demo 中的js文件
  * package.json管理本地nodejs库的配置文件，用户只需使用其中定义的一些脚本命令，不需手动修改

### 开发流程
  1. node，npm安装，请前往[node官网](https://nodejs.org/en)下载安装
  2. 安装前端工具jspm: npm install -g jspm(遇到提问就按Enter)
  3. cd xxx(项目根目录，比如webapp)
  4. 安装组件库 jspm install kfui=github:shikuijie/KFui
  5. 将jspm_packages/github/shikuijie/KFui@xxx/下的package.json和gulpfile.js考到项目根目录下
  6. npm install (安装本地开发用到的nodejs库)
  7. npm run bundle -- --kfui (打包组件代码)
  8. npm run dev -- --xxx (启动本地服务器)
  9. npm run bundle -- --xxx.js (打包自己的前端代码, 参数为项目的入口js文件)

#### 注意事项
  * 组件库使用方式请参考 demo 中的文件
  * 上述开发流程中，1~3步只需在项目初始化时操作，4~7在更新组件库时执行，8步是在开发过程中执行，9步则是在开发完成后执行
  * npm run dev 指令的参数应该是当前的项目文件夹，当其中的文件有更改时，浏览器会自动刷新，从而呈现最新效果。请尽量不要使用项目根目录，因为jspm_packages和node_modules文件夹下文件太多，会导致本地服务启动缓慢
  * npm run bundle -- --xxx.js 会将特定的html文件的依赖js及css文件打包并压缩，该指令的参数应该是html文件的入口js文件(在html中通过System.import()指定的js文件)。
