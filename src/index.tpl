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
      <!-- <button class="kf-btn kf-primary kf-md" @click="toggleSidebar()"><i class="fa fa-bars"></i></button>
      <button class="kf-btn kf-primary kf-md" @click="toggleSidebar('right')"><i class="fa fa-bars"></i></button> -->
    </div>

    <div slot="left">
      <!-- <kf-menu class="menu" :menu="menuData"></kf-menu> -->
    </div>

    <div slot="middle" class="content">
      <kf-tab class="kf-lg kf-primary kf-vertical">
        <kf-tab-item label="表格">
          <div style="margin: 10px">
            <div class="kf-justify-3-9" style="margin-bottom: 10px">
              <h3 class="kf-bottom">单行表格</h3>
              <div class="kf-btn-group kf-dark">
                <button class="kf-btn" @click="stable.prependRow()">前插</button>
                <button class="kf-btn" @click="stable.appendRow()">后插</button>
                <button class="kf-btn" @click="stable.iterateRows()">遍历</button>
              </div>
            </div>
            <kf-stable class="kf-border" :table="stable" :col-keys="stable.colKeys"></kf-stable>
          </div>

          <div style="margin: 10px">
            <div class="kf-justify-3-9" style="margin-bottom: 10px">
              <h3 class="kf-bottom">多行表格</h3>
              <div class="kf-btn-group kf-dark">
                <button class="kf-btn" @click="mtable.prependRow()">前插</button>
                <button class="kf-btn" @click="mtable.appendRow()">后插</button>
                <button class="kf-btn" @click="mtable.iterateRows()">遍历</button>
              </div>
            </div>
            <kf-mtable class="kf-border" :table="mtable" :col-keys="mtable.colKeys"></kf-mtable>
          </div>

          <div style="margin: 10px">
            <div class="kf-justify-3-9" style="margin-bottom: 10px">
              <h3 class="kf-bottom">树行表格</h3>
              <div class="kf-btn-group kf-dark">
                <button class="kf-btn" @click="ttable.prependRow()">前插</button>
                <button class="kf-btn" @click="ttable.appendRow()">后插</button>
                <button class="kf-btn" @click="ttable.iterateRows()">遍历</button>
              </div>
            </div>
            <kf-ttable class="kf-border" :table="ttable" :col-keys="ttable.colKeys"></kf-ttable>
          </div>
        </kf-tab-item>
        <kf-tab-item label="弹窗">
          <button class="kf-btn kf-primary" style="margin-left: 10px" @click="modal.open=true">打开弹窗</button>
          <kf-modal :open.sync="modal.open">
            <div slot="body" style="padding: 10px 20px; color: red">
              警告！网络错误，请告知网络管理员

              <div style="margin-top: 30px; text-align: right">
                <button class="kf-btn kf-accent" @click="modal.open=false">确定</button>
              </div>
            </div>
          </kf-modal>
        </kf-tab-item>
        <kf-tab-item label="表单及验证">
          <style>
            .kf-form {
              margin: 20px auto;
              width: 500px;
              border: 1px solid #ecf0f1;
              border-radius: 8px;
              padding: 10px;
            }
          </style>
          <form novalidate v-kf-validate="form.validator" class="kf-form">
            <div class="kf-control kf-justify-3-9">
              <label>姓名<span class="kf-asterisk">*</span></label>
              <div class="kf-input">
                <input type="text" name="name" required v-model="form.currentRow.name">
              </div>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>日期<span class="kf-asterisk">*</span></label>
              <kf-date-picker :moment.sync="form.currentRow.date" name="date" :required="true"></kf-date-picker>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>起始日期<span class="kf-asterisk">*</span></label>
              <kf-date-ranger :start.sync="form.currentRow.start" :end.sync="form.currentRow.end" name="range" :required="true"></kf-date-ranger>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>部门<span class="kf-asterisk">*</span></label>
              <kf-select name="department" :required="true" :model.sync="form.currentRow.department" :values="form.departEN" :labels="form.departCN"></kf-select>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>邮箱<span class="kf-asterisk">*</span></label>
              <div class="kf-input">
                <input type="email" required name="email" v-model="form.currentRow.email">
              </div>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>地址<span class="kf-asterisk">*</span></label>
              <div class="kf-input">
                <input type="text" required name="address" v-model="form.currentRow.address">
              </div>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>技能</label>
              <kf-checkbox-group name="skills" class="kf-left" :model.sync="form.currentRow.skills" :values="['c++', 'js', 'css']" name="agree" :required="true" label="同意"></kf-checkbox-group>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>薪资</label>
              <kf-radio-group name="salary" :required="true" class="kf-left" :model.sync="form.currentRow.salary" :values="['8k', '12k', '15k']" name="agree" :required="true" label="同意"></kf-radio-group>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label>头像</label>
              <div class="kf-left">
                <kf-file url="upload.json" accept=".pdf"></kf-file>
              </div>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label></label>
              <kf-checkbox class="kf-left" :model.sync="form.currentRow.agree" name="agree" :required="true" label="同意"></kf-checkbox>
            </div>

            <div class="kf-control kf-justify-3-9">
              <label></label>
              <div class="kf-btn-group kf-primary">
                <input type="submit" class="kf-btn" @click.prevent="form.confirm($event)" value="确定">
                <input type="reset" class="kf-btn" @click.prevent value="取消">
              </div>
            </div>
          </form>
        </kf-tab-item>
      </kf-tab>
      <br>
    </div>

    <div slot="right"></div>

    <div slot="footer"></div>
  </kf-layout>

  <script>
    System.import('./index.js');
  </script>
</body>
</html>
