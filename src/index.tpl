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
      <button class="kf-btn kf-btn-primary kf-btn-md" @click="toggleSidebar()"><i class="fa fa-bars"></i></button>
      <button class="kf-btn kf-btn-primary kf-btn-md" @click="toggleSidebar('right')"><i class="fa fa-bars"></i></button>
    </div>

    <div slot="left">
      <kf-menu class="menu kf-menu-dark kf-menu-md" :menu="menuData"></kf-menu>
    </div>

    <div slot="middle" class="content">
      <kf-tab class="kf-tab-vertical kf-tab-dark kf-tab-lg">
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
      <div class="kf-btn-group">
        <button class="kf-btn kf-btn-primary kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-dark kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-red kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-blue kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-green kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-orange kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-yellow kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-purple kf-btn-lg">BUTTON</button>
        <button class="kf-btn kf-btn-gray kf-btn-lg">BUTTON</button>
      </div>
      <br>
      <div class="kf-btn-group">
        <button class="kf-btn kf-btn-primary kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-dark kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-red kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-blue kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-green kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-orange kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-yellow kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-purple kf-btn-md">BUTTON</button>
        <button class="kf-btn kf-btn-gray kf-btn-md">BUTTON</button>
      </div>
      <br>
      <div class="kf-btn-group">
        <button class="kf-btn kf-btn-primary kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-dark kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-red kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-blue kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-green kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-orange kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-yellow kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-purple kf-btn-sm">BUTTON</button>
        <button class="kf-btn kf-btn-gray kf-btn-sm">BUTTON</button>
      </div>
      <br>
      <div class="kf-btn-group">
        <button class="kf-btn kf-btn-primary kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-dark kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-red kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-blue kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-green kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-orange kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-yellow kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-purple kf-btn-xs">BUTTON</button>
        <button class="kf-btn kf-btn-gray kf-btn-xs">BUTTON</button>
      </div>

      <br>
      <div class="kf-input-group kf-input-group-primary kf-input-group-sm">
        <div class="kf-input-addon">标签1</div>
        <div class="kf-input">
          <input type="text">
        </div>
        <div class="kf-input-addon">标签2</div>
      </div>
      <br>
      <div class="kf-input kf-input-primary kf-input-sm"><input type="text"></div>
    </div>

    <div slot="right">RIGHT SIDEBAR</div>

    <div slot="footer">FOOTER</div>
  </kf-layout>

  <script>
    System.import('./index.js');
  </script>
</body>
</html>
