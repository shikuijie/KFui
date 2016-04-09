import vue from 'vue';
import _ from 'lodash';
import '../slide/slide';
import './date.css!';
import cls from './date.css.map';
import 'animate.css';

let datime = vue.extend({
  props: ['year', 'month', 'day', 'hour', 'minute', 'second', 'hasSec', 'hasTime'],
  data: function() {
    let now = new Date();
    let year = this.year || now.getFullYear(),
        month = this.month || now.getMonth(),
        hour = this.hour || now.getHours(),
        min = this.minute || now.getMinutes(),
        sec = this.second || now.getSeconds();

    let years = _.range(year, year + 6).concat(_.range(year - 6, year)),
        months = _.range(month - 1, 12).concat(_.range(0, month - 1)),
        hours = _.range(hour, 24).concat(_.range(0, hour)),
        minutes = _.range(min, 60).concat(_.range(0, min)),
        seconds = _.range(sec, 60).concat(_.range(0, sec));

    return {
      cls: cls,
      date: this.day || now.getDate(),
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

      weeks: ['日', '一', '二', '三', '四', '五', '六']
    };
  },
  computed: {
    weeksOfMonth: function() {
      function isLeapYear(y) {
        return ((y%4 == 0) && (y%100 != 0)) || (y%400 == 0);
      }

      function getLastDate(y, m) {
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(isLeapYear(y)) {
          days[1] = 29;
        }

        return days[m];
      }

      let m = this.monthObj.els[this.monthObj.idx],
          y = this.yearObj.els[this.yearObj.idx],
          first = new Date(y, m, 1),
          firstDate = first.getDate(),
          firstWeekDay = first.getDay(),
          lastDate = getLastDate(y, m),
          last = new Date(y, m, lastDate),
          lastWeekDay = last.getDay(),
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
    chooseDate: function(d) {
      if(!d.valid) return;
      this.date = d.value;
      this.$dispatch('kf-datime-selected', new Date(
        this.yearObj.els[this.yearObj.idx],
        this.monthObj.els[this.monthObj.idx],
        this.date,
        this.hourObj.els[this.hourObj.idx],
        this.minuteObj.els[this.minuteObj.idx],
        this.secondObj.els[this.secondObj.idx]
      ));
    }
  },
  template:
    '<div :class="cls.datime">' +
      '<div :class="cls.date">' +
        '<span :class="cls.title">' +
          '<span v-text="datify(yearObj.els[yearObj.idx])"></span>' +
          '<span>-</span>' +
          '<span v-text="datify(monthObj.els[monthObj.idx] + 1)"></span>' +
          '<span></span>' +
        '</span>' +

        '<div :class="cls.slides">' +
          '<div @mousewheel="scroll($event, yearObj)" :class="cls.year">' +
            '<span @click="prev(yearObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="yearObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="yearObj.idx == $index" v-for="y in yearObj.els" v-text="y + \'年\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="next(yearObj)"></span>' +
          '</div>' +

          '<div @mousewheel="scroll($event, monthObj)" :class="cls.month">' +
            '<span @click="prev(monthObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="monthObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="monthObj.idx == $index" v-for="m in monthObj.els" v-text="m + 1 + \'月\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="next(monthObj)"></span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div :class="cls.time" v-if="hasTime">' +
        '<span :class="cls.title">' +
          '<span v-text="datify(hourObj.els[hourObj.idx])"></span>' +
          '<span> : </span>' +
          '<span v-text="datify(minuteObj.els[minuteObj.idx])"></span>' +
          '<span v-if="hasSec"> : </span>' +
          '<span v-if="hasSec" v-text="datify(secondObj.els[secondObj.idx])"></span> ' +
          '<span></span>' +
        '</span>' +

        '<div :class="cls.slides">' +
          '<div :class="cls.hour" @mousewheel="scroll($event, hourObj)">' +
            '<span @click="prev(hourObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="hourObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="hourObj.idx == $index" v-for="h in hourObj.els" v-text="h + \'时\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="prev(hourObj)"></span>' +
          '</div>' +

          '<div :class="cls.minute" @mousewheel="scroll($event, minuteObj)">' +
            '<span @click="prev(minuteObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="minuteObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="minuteObj.idx == $index" v-for="m in minuteObj.els" v-text="m + \'分\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="prev(minuteObj)"></span>' +
          '</div>' +

          '<div v-if="hasSec" :class="cls.second" @mousewheel="scroll($event, secondObj)">' +
            '<span @click="prev(secondObj)"></span>' +
            '<kf-circle-slide :class="cls.slide" axis="x" :current="secondObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="secondObj.idx == $index" v-for="h in secondObj.els" v-text="h + \'秒\'"></span>' +
            '</kf-circle-slide>' +
            '<span @click="prev(secondObj)"></span>' +
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
            '<td v-for="d in w" @click.prevent.stop="chooseDate(d)" :kf-datime-active="d.valid && d.value == date">' +
              '<div v-text="d.valid && d.value || \'\'"></div>' +
            '</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>' +
    '</div>'
});

function formatDate(date, hasTime, hasSec) {
  function datify(n) {
    return (n < 10) ? '0'+n : n;
  }

  let dateArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  let timeArr = [];
  if(hasTime) {
    timeArr = [date.getHours(), date.getMinutes(), date.getSeconds()];
    if(!hasSec) {
      timeArr.pop();
    }
  }

  return _.map(dateArr, datify).join('-') + ' ' +
        _.map(timeArr, datify).join(':');
}

vue.component('kf-date-picker', {
  props: {
    datime: {
      twoWay: true,
      type: String,
      required: true,
      default: formatDate(new Date(), true, true)
    },
    flip: {
      type: Object,
      default: function() {
        return {bottom: true, left: true};
      },
      coerce: function(val) {
        if((val.bottom && val.top) || (!val.bottom && !val.top)) {
          val.bottom = true;
          val.top = false;
        }
        if((val.left && val.right) || (!val.left && !val.right)) {
          val.left = true;
          val.right = false;
        }

        return val;
      }
    },
    label: {
      type: String
    },
    hasTime: {
      type: Boolean,
      default: false
    },
    hasSec: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    let date = new Date(this.datime);
    return {
      cls: cls,
      visible: false
    };
  },
  methods: {
    getDtCls: function() {
      return !this.visible ? cls.hidden : '';
    },
    getFlipCls: function() {
      let res = {};
      res[cls.hidden] = !this.visible;
      res[cls.left] = this.flip.left;
      res[cls.right] = this.flip.right;
      res[cls.top] = this.flip.top;
      res[cls.bottom] = this.flip.bottom;

      return res;
    },
    clear: function() {
      this.datime = '';
    }
  },
  components: {
    'kf-datime': datime
  },
  events: {
    'kf-datime-selected': function(date) {
      this.datime = formatDate(date, this.hasTime, this.hasSec);
      this.visible = false;
    }
  },
  template:
    '<div :class="cls.dtpicker">' +
      '<div>' +
        '<label v-if="label" v-text="label"></label>' +
        '<input type="text" @click="visible = true" v-model="datime" readonly/>' +
      '</div>' +
      '<div :class="cls.bg" v-show="visible" @click="visible = false"></div>' +
      '<kf-datime :class="getFlipCls()" :has-time="hasTime" :has-sec="hasSec"></kf-datime>' +
      '<i class="fa fa-times" @click="clear()"></i>' +
    '</div>'
});
