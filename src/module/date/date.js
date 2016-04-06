import vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import '../slide/slide';
import './date.css!';
import cls from './date.css.map';

vue.component('kf-date', {
  props: ['year', 'month'],
  data: function() {
    let today = moment(),
        years = _.range(this.year, this.year + 5).concat(_.range(this.year - 5, this.year)),
        months = _.range(this.month - 1, 12).concat(_.range(0, this.month - 1));

    return {
      cls: cls,
      months: months,
      monthIdx: 0,
      monthOffset: 0,
      years: years,
      yearIdx: 0,
      yearOffset: 0
    };
  },
  methods: {
    nextMonth: function() {
      this.monthOffset++;
      this.monthIdx = (this.monthIdx + 1) % 12;
      this.month = this.monthIdx + 1;
    },
    prevMonth: function() {
      this.monthOffset--;
      this.monthIdx = (this.monthIdx + 11) % 12;
      this.month = this.monthIdx + 1;
    },

    nextYear: function() {
      this.yearOffset++;
      this.yearIdx = (this.yearIdx + 1) % this.years.length;
      this.year = this.years[this.yearIdx];
    },
    prevYear: function() {
      this.yearOffset--;
      this.yearIdx = (this.yearIdx + this.years.length - 1) % this.years.length;
      this.year = this.years[this.yearIdx];
    }
  },
  template:
    '<div :class="cls.date">' +
      '<div :class="cls.year">' +
        '<div :class="cls.left" @click="nextYear()"></div>' +
        '<div :class="cls.right" @click="prevYear()"></div>' +

        '<kf-circle-slide :class="cls.slide" axis="y" :current="yearOffset">' +
          '<span :class="cls.el" v-for="y in years" v-text="y + \'年\'"></span>' +
        '</kf-circle-slide>' +
      '</div>' +
      '<div :class="cls.month">' +
        '<div :class="cls.left" @click="nextMonth()"></div>' +
        '<div :class="cls.right" @click="prevMonth()"></div>' +

        '<kf-circle-slide :class="cls.slide" axis="y" :current="monthOffset">' +
          '<span :class="cls.el" v-for="m in months" v-text="m + 1 + \'月\'"></span>' +
        '</kf-circle-slide>' +
      '</div>' +
    '</div>'
});
