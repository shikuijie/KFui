import vue from 'vue';
import _ from 'lodash';
import cls from './validate.css.map';
import './validate.css!';

function getErrorMsg(msgs, name, type, def) {
  return msgs[name] && msgs[name][type] || msgs[name] || msgs[type] || def;
}

let formMap = new Map();

vue.directive('kf-validate', {
  bind: function(val) {
    let el = this.el;
    let node = el.nodeName.toLowerCase();
    if(node != 'form') {
      return;
    }

    let that = new vue(), self = that;
    that.el = el;
    formMap.set(el, that);

    that.inputs = [];
    _.forEach(that.el.querySelectorAll('[kf-validate]'), function(el) {
      el.__BUS = that;
      that.inputs.push(el.querySelector('input') || el);

      let node = el.nodeName.toLowerCase();
      if(node == 'input') {
        el.addEventListener('change', function(event) {
          toggleError(el);
        });
      }
    });

    that.$on('kf.validate.change', function(el, noerror) {
      toggleError(el.querySelector('input'), noerror);
    });

    function toggleError(target, noerror) {
      if(noerror) {
        self.errorEls.get(target).innerHTML = '';
        return '';
      }

      let validity = target.validity;
      let msg = '', errorType = '';
      let name = target.getAttribute('name');
      let type = target.getAttribute('type');

      if(!validity.valid) {
        if(validity.valueMissing) {
          errorType = 'required';
        } else if(validity.typeMismatch) {
          errorType = type;
        } else if(validity.patternMismatch) {
          errorType = 'pattern';
        } else if(validity.tooShort) {
          errorType = 'minlength';
        }
        msg = getErrorMsg(self.errorMsg, name, errorType, target.validationMessage);
      }

      if(self.errorMsg[name] && self.errorMsg[name].validation) {
        msg = self.errorMsg[name].validation() || '';
      }

      self.errorEls.get(target).innerHTML = msg;
      return msg;
    };

    that.errorEls = new Map();

    _.forEach(that.inputs, function(input) {
      let span = document.createElement('strong');
      span.className = cls.error;
      input.parentElement.appendChild(span);
      self.errorEls.set(input, span);
    });

    that.submit = that.el.querySelector('input[type=submit]');
    that.submitFunc = function(event) {
      let valid = true;
      _.forEach(self.inputs, function(input) {
        let msg = toggleError(input);

        if(msg) {
          valid = false;
        }
      });

      self.errorMsg.formValid = valid;
    };
    that.submit && that.submit.addEventListener('click', that.submitFunc);

    that.reset = that.el.querySelector('input[type=reset]');
    that.resetFunc = function(event) {
      _.forEach(self.el.querySelectorAll('.' + cls.error), function(error) {
        error.innerHTML = '';
      });
    };
    that.reset && that.reset.addEventListener('click', that.resetFunc);
  },
  update: function(val) {
    let el = this.el;
    if(el.nodeName.toLowerCase() != 'form') {
      return;
    }

    let that = formMap.get(el);
    that.errorMsg = val;
  },
  unbind: function() {
    let el = this.el;
    if(el.nodeName.toLowerCase() != 'form') {
      return;
    }

    let that = formMap.get(el), self = that;
    _.forEach(that.inputs, function(input) {
      let name = input.getAttribute('name');
      input.removeEventListener('blur', self.blurs[name]);
    });
    _.forEach(that.errorEls, function(el) {
      el.remove();
    });

    that.submit && that.submit.removeEventListener('click', that.submitFunc);
    that.reset && that.reset.removeEventListener('click', that.resetFunc);

    formMap.delete(el);
  }
});
