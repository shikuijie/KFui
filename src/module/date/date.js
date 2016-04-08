import vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import '../slide/slide';
import './date.css!';
import cls from './date.css.map';

vue.component('kf-date', {
  props: ['year', 'month', 'day', 'hour', 'minute', 'second', 'nosec'],
  data: function() {
    let now = moment();
    let year = this.year || now.year(),
        month = this.month || now.month(),
        hour = this.hour || now.hour(),
        min = this.minute || now.minute(),
        sec = this.second || now.second();

    let years = _.range(year, year + 5).concat(_.range(year - 5, year)),
        months = _.range(month - 1, 12).concat(_.range(0, month - 1)),
        hours = _.range(hour, 24).concat(_.range(0, hour)),
        minutes = _.range(min, 60).concat(_.range(0, min)),
        seconds = _.range(sec, 60).concat(_.range(0, sec));

    return {
      cls: cls,
      monthObj: {
        els: months,
        idx: 0,
        offset: 0
      },
      yearObj: {
        els: years,
        idx: 0,
        offset: 0
      },
      hourObj: {
        els: hours,
        idx: 0,
        offset: 0
      },
      minuteObj: {
        els: minutes,
        idx: 0,
        offset: 0
      },
      secondObj: {
        els: seconds,
        idx: 0,
        offset: 0
      },

      weeks: ['日', '一', '二', '三', '四', '五', '六'],
    };
  },
  computed: {
    weeksOfMonth: function() {
      let m = this.monthObj.els[this.monthObj.idx],
          y = this.yearObj.els[this.yearObj.idx],
          first = moment([y, m, 1]),
          firstDate = first.date(),
          firstWeekDay = first.day(),
          last = first.endOf('month'),
          lastDate = last.date(),
          lastWeekDay = last.day(),
          days = _.range(- firstWeekDay + 1, lastDate + 7 - lastWeekDay);
      let res = [];
      while(days.length) {
        res.push(_.map(days.splice(0, 7), function(d) {
          return {
            value: d,
            valid: d >= 1 && d <= lastDate
          };
        }));
      }

      return res;
    }
  },
  methods: {
    next: function(obj) {
      obj.offset++;
      obj.idx = (obj.idx + 1) % obj.els.length;
      obj.cur = obj.els[obj.idx];
    },
    prev: function(obj) {
      obj.offset--;
      obj.idx = (obj.idx - 1 + obj.els.length) % obj.els.length;
      obj.cur = obj.els[obj.idx];
    },
    scroll: function(event, obj) {
      let delta = Math.floor(event.deltaY / 20);
      obj.offset += delta;
      delta %= obj.els.length;
      delta = (delta < 0) ? (delta + obj.els.length) : delta;
      obj.idx = (obj.idx + delta) % obj.els.length;
    },
    datify: function(num) {
      if(num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    },
    getSlideElCls: function(obj, idx) {
      if(obj.idx == idx) {
        return cls.active;
      } else {
        return '';
      }
    },
    getDayElCls: function(d) {
      if(d.valid && d.value == this.day) {
        return cls.active;
      }
    },
    chooseDate: function(d) {
      if(!d.valid) return;
      this.day = d.value;
      this.$emit('kfDate.done');
    }
  },
  template:
    '<div :class="cls.date">' +
      '<div :class="cls.header">' +
        '<span :class="cls.title">' +
          '<span v-text="datify(yearObj.els[yearObj.idx])"></span>' +
          '<span>-</span>' +
          '<span v-text="datify(monthObj.els[monthObj.idx] + 1)"></span>' +
          '<span></span>' +
        '</span>' +

        '<div :class="cls.slides">' +
          '<div @mousewheel="scroll($event, yearObj)" :class="cls.year">' +
            '<span @click="prev(yearObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="yearObj.offset" :size="yearObj.els.length">' +
              '<span :class="[cls.el, getSlideElCls(yearObj, $index)]" v-for="y in yearObj.els" v-text="y + \'年\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="next(yearObj)"></span>' +
          '</div>' +

          '<div @mousewheel="scroll($event, monthObj)" :class="cls.month">' +
            '<span @click="prev(monthObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="monthObj.offset" :size="monthObj.els.length">' +
              '<span :class="[cls.el, getSlideElCls(monthObj, $index)]" v-for="m in monthObj.els" v-text="m + 1 + \'月\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="next(monthObj)"></span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<table>' +
        '<thead>' +
          '<tr>' +
            '<th v-for="w in weeks" v-text="w"></th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr v-for="w in weeksOfMonth">' +
            '<td v-for="d in w" @click.prevent.stop="chooseDate(d)" :class="getDayElCls(d)">' +
              '<div v-text="d.valid && d.value || \'\'"></div>' +
            '</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>' +

      '<div :class="cls.footer">' +
        '<span :class="cls.title">' +
          '<span v-text="datify(hourObj.els[hourObj.idx])"></span>' +
          '<span> : </span>' +
          '<span v-text="datify(minuteObj.els[minuteObj.idx])"></span>' +
          '<span v-if="!nosec"> : </span>' +
          '<span v-if="!nosec" v-text="datify(secondObj.els[secondObj.idx])"></span> ' +
          '<span></span>' +
        '</span>' +

        '<div :class="cls.slides">' +
          '<div :class="cls.hour" @mousewheel="scroll($event, hourObj)">' +
            '<span @click="prev(hourObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="hourObj.offset" :size="hourObj.els.length">' +
              '<span :class="[cls.el, getSlideElCls(hourObj, $index)]" v-for="h in hourObj.els" v-text="h + \'时\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="prev(hourObj)"></span>' +
          '</div>' +

          '<div :class="cls.minute" @mousewheel="scroll($event, minuteObj)">' +
            '<span @click="prev(minuteObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="minuteObj.offset" :size="minuteObj.els.length">' +
              '<span :class="[cls.el, getSlideElCls(minuteObj, $index)]" v-for="m in minuteObj.els" v-text="m + \'分\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="prev(minuteObj)"></span>' +
          '</div>' +

          '<div v-if="!nosec" :class="cls.second" @mousewheel="scroll($event, secondObj)">' +
            '<span @click="prev(secondObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="secondObj.offset" :size="secondObj.els.length">' +
              '<span :class="[cls.el, getSlideElCls(secondObj, $index)]" v-for="h in secondObj.els" v-text="h + \'秒\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="prev(secondObj)"></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
});
