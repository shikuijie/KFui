import vue from 'vue';
import cls from './slide.css.map';
import './slide.css!';

vue.component('kf-hcircle-slide', {
  data: function() {
    return {
      cls: cls,
      flipped: false
    };
  },
  computed: {
    flipCls: function() {
      return this.flipped ? cls.flipped : '';
    }
  },
  methods: {
    flip: function() {
      this.flipped = !this.flipped;
    }
  },
  template:
    '<div :class="cls.hcircle" @click.prevent="flip()">' +
      '<div :class="[cls.card, flipCls]">' +
        '<div :class="cls.front">1</div>' +
        '<div :class="cls.back">2</div>' +
        '<div :class="cls.left">3</div>' +
        '<div :class="cls.right">4</div>' +
        '<div :class="cls.top">5</div>' +
        '<div :class="cls.bottom">6</div>' +
      '</div>' +
    '</div>'
});

vue.component('kf-xslide', {
  props: {
    direction: {
      type: String,
      validator: function(val) {
        return val == 'vertical' || val == 'horizontal';
      },
      default: 'horizontal'
    },
    duration: {
      type: String,
      default: '.5s',
      validator: function(val) {
        return /^\d+(\.\d+)?s$/.test(val);
      }
    },
    threshold: {
      type: String,
      default: '20%',
      validator: function(val) {
        return /^(\d+%|\d+px)$/.test(val);
      }
    }
  },
  methods: {
    mouseDown: function(event) {
      //只考虑左键滑动
      if(event.which != 1) return;
      this.wrapperPos.startX = event.clientX;
    },
    mouseMove: function(event) {
      if(event.which != 1) return;
      this.wrapperStyle.left = (this.wrapperPos.origX + event.clientX - this.wrapperPos.startX) + 'px';
    },
    mouseUp: function(event) {
      if(event.which != 1) return;
      let offset = event.clientX - this.wrapperPos.startX;
      this.curItem += Math.floor(-offset / this.thresholdNo);
      if(this.curItem < 0) {
        this.curItem = 0;
      } else if (this.curItem >= this.itemNo) {
        this.curItem = this.itemNo - 1;
      }

      let left = -this.curItem * this.itemSize;
      this.wrapperStyle.left = left + 'px';
      this.wrapperPos.origX = left;
    }
  },
  data: function() {
    return {
      wrapperPos: {
        origX: 0,
        origY: 0,
      },
      wrapperStyle: {
        position: 'relative',
        transition: 'left ' + this.duration + ' linear',
        left: '',
        top: '',
        width: ''
      }
    };
  },
  ready: function() {
    let items = this.$el.children[0].children;
    _.forEach(items, function(item) {
      item.style.width = 1/items.length * 100 + '%';
      item.style.display = 'inline-block';
    });

    this.curItem = 0;
    this.itemNo = items.length;
    this.itemSize = this.$el.offsetWidth;
    this.wrapperStyle.width = items.length * 100 + '%';

    let thresholdMatch = this.threshold.match(/^(\d+)%|(\d+)px$/);
    if(thresholdMatch) {
      if(thresholdMatch[1]) {
        this.thresholdNo = parseFloat(thresholdMatch[1])/100 * this.itemSize;
      } else if(thresholdMatch[2]) {
        this.thresholdNo = parseFloat(thresholdMatch[2]);
      }
    }
  },
  template:
    '<div style="overflow: hidden" ' +
          '@mousedown.stop="mouseDown($event)" ' +
          '@mousemove.stop="mouseMove($event)" ' +
          '@mouseup.stop="mouseUp($event)">' +
      '<div :style="wrapperStyle">' +
        '<slot></slot>' +
      '</div>' +
    '</div>'
});
