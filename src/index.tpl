<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="../jspm_packages/system.js"></script>
  <script src="../jspm.config.js"></script>
</head>
<body>
  <kf-menu class="menu" :menu="menuData"></kf-menu>

  <kf-checkbox class="checkbox" label="复选框" :value="val" :model.sync="cb"></kf-checkbox>
  <br>
  <kf-checkbox-group class="checkbox-group" :labels="['标签1', '标签2', '标签3']" :values="[val1, val2, val3]" :model.sync="cbgrp"></kf-checkbox-group>
  <br>
  <span v-text="cb | json"></span>
  <br>
  <span v-text="cbgrp | json"></span>

  <br>
  <kf-radio-group class="radio-group" :model.sync="rdgrp" :labels="['标签1', '标签2', '标签3']" :values="[1,2,3]"></kf-radio-group>
  <br>
  <span v-text="rdgrp | json"></span>
  <br>

  <kf-select class="select" :model.sync="slct" :values="[123, 456, 789]" :default-label="'<div></div>'" :labels="['<div>option1</div>', '<div>option2</div>', '<div>option3</div>']"></kf-select>
  <br>
  <span v-text="slct | json"></span>
  <br>

  <kf-tree class="tree" :tree="treeData" :draggable="true"></kf-tree>
  <kf-date-picker :datime.sync="datime" label="日期" :flip="{top: true}" :has-time="true" :has-sec="false"></kf-date-picker>

  <script>
    System.import('./index.js');
  </script>
</body>
</html>
