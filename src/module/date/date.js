import vue from 'vue';
import '../slide/slide';
import './date.css!';
import cls from './date.css.map';

vue.component('kf-date', {
  data: function() {
    return {
      cls: cls,
      active: 1,
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      curMonth: 0
    };
  },
  methods: {
  },
  template:
    '<div :class="cls.date">' +
      '<div :class="cls.monthWrapper">' +
        '<div :class="cls.left" @click="curMonth++"></div>' +
        '<div :class="cls.right" @click="curMonth--"></div>' +

        '<kf-circle-slide :class="cls.month" axis="y" :current="curMonth">' +
          '<span v-for="m in months" v-text="m"></span>' +
        '</kf-circle-slide>' +
      '</div>' +
    '</div>'
});
