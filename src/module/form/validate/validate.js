import vue from 'vue';
import _ from 'lodash';
import cls from './validate.css.map';
import './validate.css!';

function getErrorMsg(msgs, name, type, def) {
  return msgs[name] && msgs[name][type] || msgs[name] || msgs[type] || def;
}

vue.directive('kf-validate', {
  bind: function(val) {
    let self = this, node = self.el.nodeName.toLowerCase();
    if(node != 'form') {
      return;
    }

    this.toggleError = function(target, name, type) {
      let validity = target.validity;
      let msg = '', errorType = '';

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

      self.errorEls[name].innerHTML = msg;
      return msg;
    };

    this.inputs = this.el.querySelectorAll('input[name]');
    this.errorEls = {};
    this.blurs = {};
    this.focus = {};

    _.forEach(this.inputs, function(input) {
      let name = input.getAttribute('name'),
          type = input.getAttribute('type');

      let span = document.createElement('strong');
      span.className = cls.error;
      input.parentElement.appendChild(span);
      self.errorEls[name] = self.errorEls[name] || span;
      self.blurs[name] = self.blurs[name] || function(event) {
        self.toggleError(event.target, name, type);
      };

      input.addEventListener('blur', self.blurs[name]);
    });

    this.submit = this.el.querySelector('input[type=submit]');
    this.submitFunc = function(event) {
      let valid = true;
      _.forEach(self.inputs, function(input) {
        let msg = self.toggleError(input, input.getAttribute('name'), input.getAttribute('type'));

        if(msg) {
          valid = false;
        }
      });

      self.errorMsg.formValid = valid;
    };
    this.submit && this.submit.addEventListener('click', this.submitFunc);

    this.reset = this.el.querySelector('input[type=reset]');
    this.resetFunc = function(event) {
      _.forEach(self.el.querySelectorAll('.' + cls.error), function(error) {
        error.innerHTML = '';
      });
    };
    this.reset && this.reset.addEventListener('click', this.resetFunc);
  },
  update: function(val) {
    this.errorMsg = val;
  },
  unbind: function() {
    let self = this;
    _.forEach(this.inputs, function(input) {
      let name = input.getAttribute('name');
      input.removeEventListener('blur', self.blurs[name]);
    });
    _.forEach(this.errorEls, function(el) {
      el.remove();
    });

    this.submit && this.submit.removeEventListener('click', this.submitFunc);
    this.reset && this.reset.removeEventListener('click', this.resetFunc);
  }
});
