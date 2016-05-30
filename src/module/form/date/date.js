import vue from 'vue';
import _ from 'lodash';
import './rotator';
import './date.css!';
import cls from './date.css.map';

let datime = vue.extend({
  props: ['moment', 'hasSec', 'hasTime', 'name', 'min', 'max'],
  data: function() {
    let now = this.moment && new Date(this.moment) || new Date();
    let year = now.getFullYear(),
        month = now.getMonth(),
        hour = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds();

    let years = _.range(year, year + 6).concat(_.range(year - 6, year)),
        months = _.range(month, 12).concat(_.range(0, month)),
        hours = _.range(hour, 24).concat(_.range(0, hour)),
        minutes = _.range(min, 60).concat(_.range(0, min)),
        seconds = _.range(sec, 60).concat(_.range(0, sec));

    return {
      cls: cls,
      date: now.getDate(),
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
          lm = m == 0 ? 11 : m-1,
          y = this.yearObj.els[this.yearObj.idx],
          ly = m == 0 ? y - 1 : y,
          first = new Date(y, m, 1),
          firstDate = first.getDate(),
          firstWeekDay = first.getDay(),
          lastDate = getLastDate(y, m),
          lmLastDate = getLastDate(ly, lm),
          last = new Date(y, m, lastDate),
          lastWeekDay = last.getDay(),
          days = _.range(- firstWeekDay + 1, -firstWeekDay + 43);

      let res = [];
      while(days.length) {
        res.push(_.map(days.splice(0, 7), function(d) {
          let valid = d >= 1 && d <= lastDate,
              value = valid ? d : (d <= 0 ? (lmLastDate + d) : (d - lastDate));
          return {
            value: value,
            valid: valid
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
      if(delta == 0) delta = 1;

      obj.offset += delta;
      delta %= obj.els.length;
      delta = (delta < 0) ? (delta + obj.els.length) : delta;
      obj.idx = (obj.idx + delta) % obj.els.length;
    },
    prevMonth: function() {
      let m = this.monthObj.els[this.monthObj.idx];
      if(m == 0) {
        this.prev(this.yearObj);
      }
      this.prev(this.monthObj);
    },
    nextMonth: function() {
      let m = this.monthObj.els[this.monthObj.idx];
      if(m == 11) {
        this.next(this.yearObj);
      }
      this.next(this.monthObj);
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

      this.$parent.$emit('kf.datime.selected', {
        name: this.name,
        date: new Date(
          this.yearObj.els[this.yearObj.idx],
          this.monthObj.els[this.monthObj.idx],
          this.date,
          this.hourObj.els[this.hourObj.idx],
          this.minuteObj.els[this.minuteObj.idx],
          this.secondObj.els[this.secondObj.idx])
      });
    },
    inRange: function(d) {
      if(!this.min || !this.max) return false;
      let month = this.monthObj.els[this.monthObj.idx],
          year = this.yearObj.els[this.yearObj.idx];

      if(!d.valid && d.value < 20) {
        month++;
        if(month == 12) {
          month = 0;
          year++;
        }
      } else if(!d.valid && d.value > 20) {
        month--;
        if(month == -1) {
          month = 11;
          year--;
        }
      }

      let el = formatDate(new Date(year, month, d.value), false, false),
          min = this.min.split(' ')[0],
          max = this.max.split(' ')[0];
      return min < el && el < max;
    }
  },
  compiled: function() {
    this.$on('kf.datime.change', function(init) {
      this.moment = init;
      let now = this.moment && new Date(this.moment) || new Date();
      let year = now.getFullYear(),
          month = now.getMonth(),
          hour = now.getHours(),
          min = now.getMinutes(),
          sec = now.getSeconds();

      this.date = now.getDate();
      this.yearObj.els = _.range(year, year + 6).concat(_.range(year - 6, year)),
      this.monthObj.els = _.range(month, 12).concat(_.range(0, month)),
      this.hourObj.els = _.range(hour, 24).concat(_.range(0, hour)),
      this.minuteObj.els = _.range(min, 60).concat(_.range(0, min)),
      this.secondObj.els = _.range(sec, 60).concat(_.range(0, sec));
    });
  },
  ready: function() {
    this.$on('kf.datime.ask', function() {
      let answer = {
        name: this.name,
        date: new Date(
          this.yearObj.els[this.yearObj.idx],
          this.monthObj.els[this.monthObj.idx],
          this.date,
          this.hourObj.els[this.hourObj.idx],
          this.minuteObj.els[this.minuteObj.idx],
          this.secondObj.els[this.secondObj.idx])
      };
      this.$parent.$emit('kf.datime.answer', answer);
    });
    this.$parent.$emit('kf.datime.register', this);
  },
  destroyed: function() {
    this.$off('kf.datime.ask');
  },
  template:
    '<section :class="cls.datime">' +
      '<div :class="cls.date">' +
        '<span :class="cls.title">' +
          '<i @click.stop="prevMonth()"></i>' +
          '<span v-text="datify(yearObj.els[yearObj.idx])"></span>' +
          '<span>-</span>' +
          '<span v-text="datify(monthObj.els[monthObj.idx] + 1)"></span>' +
          '<span></span>' +
          '<i @click.stop="nextMonth()"></i>' +
        '</span>' +

        '<div :class="cls.slides">' +
          '<div @wheel.stop.prevent="scroll($event, yearObj)" :class="cls.year">' +
            '<span @click.stop="next(yearObj)"></span>' +
            '<kf-rotator :class="cls.slide" axis="x" :current="yearObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="yearObj.idx == $index" v-for="y in yearObj.els" v-text="y + \'年\'"></span>' +
            '</kf-rotator>' +
            '<span @click.stop="prev(yearObj)"></span>' +
          '</div>' +

          '<div @wheel.prevent.stop="scroll($event, monthObj)" :class="cls.month">' +
            '<span @click.stop="next(monthObj)"></span>' +
            '<kf-rotator :class="cls.slide" axis="x" :current="monthObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="monthObj.idx == $index" track-by="$index" v-for="m in monthObj.els" v-text="m + 1 + \'月\'"></span>' +
            '</kf-rotator>' +
            '<span @click.stop="prev(monthObj)"></span>' +
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
          '<div :class="cls.hour" @wheel.prevent.stop="scroll($event, hourObj)">' +
            '<span @click.stop="next(hourObj)"></span>' +
            '<kf-rotator :class="cls.slide" axis="x" :current="hourObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="hourObj.idx == $index" v-for="h in hourObj.els" v-text="h + \'时\'"></span>' +
            '</kf-rotator>' +
            '<span @click.stop="prev(hourObj)"></span>' +
          '</div>' +

          '<div :class="cls.minute" @wheel.prevent.stop="scroll($event, minuteObj)">' +
            '<span @click.stop="next(minuteObj)"></span>' +
            '<kf-rotator :class="cls.slide" axis="x" :current="minuteObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="minuteObj.idx == $index" v-for="m in minuteObj.els" v-text="m + \'分\'"></span>' +
            '</kf-rotator>' +
            '<span @click.stop="prev(minuteObj)"></span>' +
          '</div>' +

          '<div v-if="hasSec" :class="cls.second" @wheel.prevent.stop="scroll($event, secondObj)">' +
            '<span @click.stop="next(secondObj)"></span>' +
            '<kf-rotator :class="cls.slide" axis="x" :current="secondObj.offset">' +
              '<span :class="cls.el" :kf-datime-active="secondObj.idx == $index" v-for="h in secondObj.els" v-text="h + \'秒\'"></span>' +
            '</kf-rotator>' +
            '<span @click.stop="prev(secondObj)"></span>' +
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
            '<td v-for="d in w" @click.prevent.stop="chooseDate(d)" ' +
                ':class="!d.valid && cls.invalid" ' +
                ':kf-datime-inrange="inRange(d)" ' +
                ':kf-datime-active="d.valid && d.value == date">' +
              '<div v-text="d.value"></div>' +
            '</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>' +
    '</section>'
});

vue.component('kf-date-picker', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    value: String,
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Object,
      default: function() {
        return {bottom: true, left: true};
      }
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
    return {
      cls: cls,
      visible: false
    };
  },
  computed: {
    flipObj: function() {
      let val = this.flip;
      if((val.bottom && val.top) || (!val.bottom && !val.top)) {
        val.bottom = true;
        val.top = false;
      }
      if((val.left && val.right) || (!val.left && !val.right)) {
        val.left = true;
        val.right = false;
      }

      return val;
    },
    datimeCls: function() {
      let res = {};
      res[cls.visible] = this.visible;
      res[cls.left] = this.flipObj.left;
      res[cls.right] = this.flipObj.right;
      res[cls.top] = this.flipObj.top;
      res[cls.bottom] = this.flip.bottom;

      return res;
    }
  },
  methods: {
    clear: function() {
      this.value = '';
    },
    hide: function() {
      this.visible = false;
    }
  },
  components: {
    'kf-datime': datime
  },
  watch: {
    value: function(val) {
      this.onChange(val, this.name);
      this.input.__mkfBus && this.input.__mkfBus.$emit('kf.form.change', this.input, val);
    }
  },
  compiled: function() {
    this.input = this.$el.querySelector('input');
    this.input.__mkfParent = this;
    this.$on('kf.datime.register', function(datime) {
      this.datime = datime;
    });
    this.$on('kf.form.init', function(date) {
      this.initValue = date;
    });
  },
  ready: function() {
    this.$on('kf.datime.selected', function(data) {
      this.value = formatDate(data.date, this.hasTime, this.hasSec);
      this.visible = false;
    });

    if(this.initValue) {
      this.datime.$emit('kf.datime.change', this.initValue);
      this.value = this.initValue;
    }
  },
  destroyed: function() {
    this.$off('kf.datime.selected');
  },
  template:
    '<div :class="cls.dtpicker" class="kf-date-picker" @click.stop="visible = true">' +
      '<input autocomplete="off" type="picker" :name="name" v-model="value" :required="required"/>' +
      '<div :class="cls.bg" v-show="visible" @click.stop="hide()"></div>' +
      '<kf-datime kf-datime :class="datimeCls" :moment="value" :has-time="hasTime" :has-sec="hasSec"></kf-datime>' +
      '<i class="fa fa-times" @click.stop="clear()"></i>' +
    '</div>'
});

vue.component('kf-date-ranger', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    start: String,
    end: String,
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Object,
      default: function() {
        return {bottom: true, left: true};
      }
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
    return {
      cls: cls,
      visible: false,
      range: {start: '', end: ''},
      rangerr: ''
    };
  },
  computed: {
    flipObj: function() {
      let val = this.flip;
      if((val.bottom && val.top) || (!val.bottom && !val.top)) {
        val.bottom = true;
        val.top = false;
      }
      if((val.left && val.right) || (!val.left && !val.right)) {
        val.left = true;
        val.right = false;
      }

      return val;
    },
    dropCls: function() {
      let res = {};
      res[cls.visible] = this.visible;
      res[cls.left] = this.flipObj.left;
      res[cls.right] = this.flipObj.right;
      res[cls.top] = this.flipObj.top;
      res[cls.bottom] = this.flipObj.bottom;
      res[cls.drop] = true;

      return res;
    },
    rangeStr: function() {
      return this.start && this.end && ('From ' + this.start + ' To ' + this.end) || '';
    }
  },
  methods: {
    clear: function() {
      this.start = '';
      this.end = '';
      this.rangeStr = '';
    },
    chooseRange: function() {
      _.forEach(this.datimes, function(datime) {
        datime.$emit('kf.datime.ask');
      });
    },
    hide: function() {
      this.visible = false;
    }
  },
  components: {
    'kf-datime': datime
  },
  watch: {
    '[start, end]': function(val, oval) {
      this.onChange(val, this.name);
      this.input.__mkfBus && this.input.__mkfBus.$emit('kf.form.change', this.input, val);
    }
  },
  compiled: function() {
    this.input = this.$el.querySelector('input');
    this.input.__mkfParent = this;
    this.$on('kf.datime.register', function(datime) {
      this.datimes = this.datimes || [];
      this.datimes.push(datime);
    });
    this.$on('kf.form.init', function(dates) {
      this.initValue = dates;
    });
  },
  ready: function() {
    this.$on('kf.datime.selected', function(data) {
      this.range[data.name] = formatDate(data.date, this.hasTime, this.hasSec);
    });

    let count = 0;
    this.$on('kf.datime.answer', function(data) {
      count++;
      this.range[data.name] = formatDate(data.date, this.hasTime, this.hasSec);
      if(count < 2) {
        return;
      } else {
        count = 0;
      }

      if(this.range.start > this.range.end) {
        this.rangerr = '结束时间不能在开始时间之前';
        return;
      }

      this.start = this.range.start;
      this.end = this.range.end;

      this.rangerr = '';
      this.visible = false;
    });

    if(this.initValue) {
      let that = this;
      _.forEach(this.datimes, function(datime, i) {
        datime.$emit('kf.datime.change', that.initValue[i]);
      });
      that.start = that.initValue[0];
      that.end = that.initValue[1];
    }
  },
  destroyed: function() {
    this.$off('kf.datime.register');
    this.$off('kf.datime.selected');
    this.$off('kf.datime.answer');
  },
  template:
    '<div :class="cls.dtranger" class="kf-date-ranger" @click.stop="visible = true">' +
      '<input autocomplete="off" type="ranger" :name="name" :required="required" v-model="rangeStr"/>' +
      '<div :class="cls.bg" v-show="visible" @click.stop="hide()"></div>' +
      '<div :class="dropCls">' +
        '<div :class="cls.range">' +
          '<kf-datime kf-datime name="start" :moment="start" :min="range.start" :max="range.end" :has-time="hasTime" :has-sec="hasSec"></kf-datime>' +
          '<kf-datime kf-datime name="end" :moment="end" :min="range.start" :max="range.end" :has-time="hasTime" :has-sec="hasSec"></kf-datime>' +
        '</div>' +
        '<div :class="cls.confirm">' +
          '<span v-show="rangerr" v-text="rangerr"></span>' +
          '<a @click.prevent.stop="chooseRange()">确定</a>' +
        '</div>' +
      '</div>' +
      '<i class="fa fa-times" @click.stop="clear()"></i>' +
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

  if(timeArr.length) {
    return _.map(dateArr, datify).join('-') + ' ' +
          _.map(timeArr, datify).join(':');
  } else {
    return _.map(dateArr, datify).join('-');
  }
}
