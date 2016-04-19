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
      <kf-menu class="menu kf-menu kf-dark kf-md" :menu="menuData"></kf-menu>
    </div>

    <div slot="middle" class="content">
      <kf-tab class="kf-tab kf-horizontal kf-primary kf-md">
        <kf-tab-item label="蓝色">
          <div style="height: 100px">蓝色</div>
        </kf-tab-item>
        <kf-tab-item label="绿色">
          <div style="height: 200px">绿色</div>
        </kf-tab-item>
        <kf-tab-item label="红色">
          <div style="height: 50px">红色</div>
        </kf-tab-item>
      </kf-tab>
      <br>
      <kf-date-picker :moment.sync="moment" class="kf-date-picker kf-primary kf-md"></kf-date-picker>
      <kf-date-ranger :start.sync="start" :end.sync="end" class="kf-date-ranger kf-primary kf-md"></kf-date-ranger>
      <div class="kf-input kf-primary kf-md">
        <input type="text">
      </div>
      <kf-select class="kf-select kf-primary kf-md" :model.sync="select" :values="[1, 2, 3]" :labels="['option1', 'option2', 'option3']"></kf-select>
      <br>
      <kf-radio-group class="kf-radio-group kf-primary kf-md" :model.sync="radioGroup" :labels="[123, 345]" :values="[true, false]"></kf-radio-group>
      <br>
      <kf-checkbox-group class="kf-checkbox-group kf-primary kf-md" :model.sync="checkboxGroup" :labels="[123, 345]" :values="['man', 'woman']"></kf-checkbox-group>
      <br>
      <kf-checkbox class="kf-checkbox kf-primary kf-md" :model.sync="checkbox" :label="'123'" :value="'man'"></kf-checkbox>
      <br>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <div class="kf-input">
          <input type="text">
        </div>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <kf-select class="kf-select" :model.sync="select" :values="[1, 2, 3]" :labels="['option1', 'option2', 'option3']"></kf-select>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <kf-date-picker :moment.sync="moment" class="kf-date-picker"></kf-date-picker>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <label class="kf-addon">标签名称</label>
        <kf-date-ranger :start.sync="start" :end.sync="end" class="kf-date-ranger"></kf-date-ranger>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md" style="width: 30%">
        <kf-select style="width: 25%" class="kf-select kf-addon" :model.sync="select" :values="[1, 2, 3]" :labels="['option1', 'option2', 'option3']"></kf-select>
        <kf-date-ranger :start.sync="start" :end.sync="end" class="kf-date-ranger"></kf-date-ranger>
      </div>
      <br>
      <div class="kf-input-group kf-primary kf-md">
        <div class="kf-addon">标签1</div>
        <div class="kf-input">
          <input type="text">
        </div>
        <div class="kf-addon">标签2</div>
      </div>

      <br>
      <div class="kf-btn-group kf-primary kf-md">
        <button class="kf-btn">BUTTON</button>
        <button class="kf-btn">BUTTON</button>
      </div>
      <button class="kf-btn kf-primary kf-md">BUTTON</button>
      <button class="kf-btn kf-dark kf-md">BUTTON</button>
    </div>

    <div slot="right">RIGHT SIDEBAR</div>

    <div slot="footer">FOOTER</div>
  </kf-layout>

  <script>
    System.import('./index.js');
  </script>
</body>
</html>
