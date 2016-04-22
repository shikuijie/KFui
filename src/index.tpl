<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="../jspm_packages/system.js"></script>
  <script src="../jspm.config.js"></script>
</head>
<body>
  <kf-layout class="layout">
    <div slot="header">
      <button class="kf-btn kf-primary kf-md" @click="toggleSidebar()"><i class="fa fa-bars"></i></button>
      <button class="kf-btn kf-primary kf-md" @click="toggleSidebar('right')"><i class="fa fa-bars"></i></button>
    </div>

    <div slot="left">
      <kf-menu class="menu" :menu="menuData"></kf-menu>
    </div>

    <div slot="middle" class="content">
      <kf-tab class="kf-lg kf-primary">
        <kf-tab-item label="蓝色">
          <div style="height: 200px">蓝色</div>
        </kf-tab-item>
        <kf-tab-item label="绿色">
          <div style="height: 300px">绿色</div>
        </kf-tab-item>
        <kf-tab-item label="红色">
          <div style="height: 200px">红色</div>
        </kf-tab-item>
      </kf-tab>
      <br>
      <kf-date-picker :moment.sync="moment" :flip="{top: true}" class="kf-primary kf-md"></kf-date-picker>
      <kf-date-ranger :start.sync="start" :end.sync="end" :flip="{top: true}" class="kf-lg"></kf-date-ranger>
      <div class="kf-input kf-primary kf-md">
        <input type="text">
      </div>
      <kf-select :flip="{top: true}" :model.sync="select" :values="[1, 2, 3]" :labels="['option1', 'option2', 'option3']"></kf-select>
      <br>
      <kf-radio-group :model.sync="radioGroup" :labels="[123, 345]" :values="[true, false]"></kf-radio-group>
      <br>
      <kf-checkbox-group :model.sync="checkboxGroup" :labels="[123, 345]" :values="['man', 'woman']"></kf-checkbox-group>
      <br>
      <kf-checkbox class="kf-primary kf-md" :model.sync="checkbox" :label="'123'" :value="'man'"></kf-checkbox>
      <br>
      <div class="kf-btn-group kf-dark kf-md">
        <input type="submit" class="kf-btn" value="提交信息">
        <input type="reset" class="kf-btn" value="重置">
      </div>
      <kf-file class="kf-lg" url="upload.json" :success="onsuccess" :other="uploadParams" :multiple="true"></kf-file>
      <button class="kf-btn kf-primary kf-md">按钮</button>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <div class="kf-input">
          <input type="text">
        </div>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-lg">
        <label class="kf-addon">标签名称</label>
        <kf-select :model.sync="select" :values="[1, 2, 3]" :labels="['option1', 'option2', 'option3']"></kf-select>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <kf-date-picker :moment.sync="moment" class="kf-date-picker"></kf-date-picker>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <kf-date-ranger :start.sync="start" :end.sync="end"></kf-date-ranger>
      </div>
      <br>
      <div class="kf-input-group kf-primary" style="width: 30%">
        <kf-select style="width: 25%" class="kf-addon" :model.sync="select" :values="[1, 2, 3]" :labels="['option1', 'option2', 'option3']"></kf-select>
        <kf-date-ranger :start.sync="start" :end.sync="end"></kf-date-ranger>
      </div>
      <br>
      <div class="kf-input-group">
        <div class="kf-addon">标签1</div>
        <div class="kf-input">
          <input type="text">
        </div>
        <div class="kf-addon">标签2</div>
      </div>
      <br>
      <div class="kf-btn-group">
        <button class="kf-btn">BUTTON</button>
        <button class="kf-btn">BUTTON</button>
      </div>
      <button class="kf-btn">BUTTON</button>
      <button class="kf-btn kf-primary">BUTTON</button>
      <br>
      <kf-pager class="kf-primary" :total-entries="100" :on-change="onChange"></kf-pager>
      <br>
      <button class="kf-btn kf-dark" @click="generateTable()">生成表格</button>
      <kf-stable class="kf-border" :table="tableData" :col-keys="colKeys"></kf-stable>
    </div>

    <div slot="right">RIGHT SIDEBAR</div>

    <div slot="footer">FOOTER</div>
  </kf-layout>

  <script>
    System.import('./index.js');
  </script>
</body>
</html>
