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
          <div class="stable-title kf-justify-3-9">
            <h3>单行表格</h3>
            <div class="kf-btn-group kf-dark">
              <button class="kf-btn" @click="stable.prependRow()">前插</button>
              <button class="kf-btn" @click="stable.appendRow()">后插</button>
              <button class="kf-btn" @click="stable.iterateRows()">遍历</button>
            </div>
          </div>
          <div class="stable-body">
            <kf-modal :open.sync="stable.modal.editOpen">
              <h2 slot="head">编辑行</h2>
              <div slot="body" style="width: 600px">
                <form novalidate v-kf-validate="stable.modal.error" class="kf-form" style="margin: 0 auto; width: 500px">
                  <div class="kf-control kf-justify-3-9">
                    <label>姓名<span class="kf-asterisk">*</span></label>
                    <div class="kf-input">
                      <input type="text" name="name" required v-model="stable.modal.currentRow.name">
                    </div>
                  </div>

                  <div class="kf-control kf-justify-3-9">
                    <label>邮箱<span class="kf-asterisk">*</span></label>
                    <div class="kf-input">
                      <input type="email" required name="email" v-model="stable.modal.currentRow.email">
                    </div>
                  </div>

                  <div class="kf-control kf-justify-3-9">
                    <label>地址<span class="kf-asterisk">*</span></label>
                    <div class="kf-input">
                      <input type="text" required name="address" v-model="stable.modal.currentRow.address">
                    </div>
                  </div>

                  <div class="kf-btn-group kf-primary">
                    <input type="submit" class="kf-btn" @click.prevent="stable.modal.confirmEdit($event)" value="确定">
                    <input type="reset" class="kf-btn" @click="stable.modal.editOpen = false" value="取消">
                  </div>
                </form>
              </div>
            </kf-modal>
            <kf-stable class="stable kf-border" :table="stable" :col-keys="stable.colKeys"></kf-stable>
          </div>
        </kf-tab-item>
        <kf-tab-item label="树">
        </kf-tab-item>
      </kf-tab>
      <br>
      <!-- <kf-date-picker :moment.sync="moment" :flip="{top: true}" class="kf-primary kf-md"></kf-date-picker>
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
      <button class="kf-btn kf-primary" @click="addRow()">添加</button>
      <br>
      <kf-pager class="kf-primary" :total-entries="100" :on-change="onChange"></kf-pager>
      <br>
      <br>
      <kf-mtable class="kf-border" :table="mtable" :col-keys="mcolKeys"></kf-mtable>
      <br>
      <kf-ttable class="kf-border" :table="ttable" :col-keys="tcolKeys"></kf-mtable> -->
    </div>

    <div slot="right"></div>

    <div slot="footer"></div>
  </kf-layout>

  <script>
    System.import('./index.js');
  </script>
</body>
</html>
