## KFui 使用指南

### 简介
  * demo文件夹中是一些示例html及js，用户可以从中看到所有组件的用法
  * module文件夹中是组件的源代码，用户可以自由修改，但无法push到仓库中
  * gulpfile.js定义了一系列的gulp任务，用户可以执行这些任务来做开发，打包等工作，具体任务的使用方式见后面的描述
  * jspm.config.js管理项目中使用到的前端库，用户通过gulp任务去管理，一般不需要手动修改
  * lib.js用户用到的库文件，其实用户在引用该文件时并不需要直接指定其路径，具体用法见后面的描述
  * package.json管理本地nodejs库的配置文件，用户只需使用其中定义的一些脚本命令，不需手动修改

### 开发流程
  1. cd xxx(项目中webapp目录)
  2. git clone https://github.com/shikuijie/KFui (将组件代码clone到本地，若有新版本，重新clone即可)
  3. npm install (安装本地开发用到的nodejs库)
  5. npm run dev -- --xxx (启动本地服务器，然后就可以开发页面代码了，参数为项目代码所在的目录)
  6. npm run bundle -- --xxx.js (打包自己的前端代码, 参数为项目的入口js文件)
  7. npm run sprite -- --xxx (将指定目录中的png文件合并生成精灵图以及相关的css文件，不需要该功能的用户请略过)
  8. npm run image -- --xxx (将指定目录中的png文件压缩，不需要该功能的用户请略过)

#### 注意事项
  * 组件库使用方式请参考 demo 中的文件
  * 上述开发流程中，1~3步只需在项目初始化或更新组件库时操作，4步是在开发过程中执行，5步则是在开发完成后执行
  * npm run dev 指令的参数应该是当前的项目文件夹(webapp下可能有多个独立的子项目)，当其中的文件有更改时，浏览器会自动刷新，从而呈现最新效果
  * npm run bundle 会将特定的html文件的依赖js及css文件打包并压缩，该指令的参数应该是html文件的入口js文件(在html中通过System.import()指定的js文件)。
