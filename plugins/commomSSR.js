import Vue from 'vue'

var comssr = {
  install(Vue) {
    Vue.prototype.comssr = {
      validatorLenBase: function (value, callback, maxlen) {
        if (!value) {
          value = ""
        }
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
        let mat = value.match(cnReg);
        let chLen = mat ? mat.length : 0
        let len = chLen + (value.length - chLen) * 0.5;
        if (len > maxlen) {
          callback(new Error("限制最多输入" + maxlen * 2 + "个字符（" + maxlen + "汉字）"));
        } else {
          callback();
        }
      },
      validatorLenBaseExt: function (value, maxlen) {
        if (!value) {
          value = ""
        }
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
        let mat = value.match(cnReg);
        let chLen = mat ? mat.length : 0
        let len = chLen + (value.length - chLen) * 0.5;
        let res = {}
        if (len > maxlen) {
          res.code = 1
          res.msg = "限制最多输入" + maxlen * 2 + "个字符（" + maxlen + "汉字）";
        } else {
          res.code = 0
        }
        return res
      },
      validatorLen5: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 5)
      },
      validatorLen8: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 8)
      },
      validatorLen10: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 10)
      },
      validatorLen15: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 15)
      },
      validatorLen20: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 20)
      },
      validatorLen25: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 25)
      },
      validatorLen30: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 30)
      },
      validatorLen50: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 50)
      },
      validatorLen100: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 100)
      },
      validatorLen150: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 150)
      },
      validatorLen500: function (rule, value, callback) {
        Vue.prototype.comssr.validatorLenBase(value, callback, 500)
      },

      validatorLen: function (val, maxLen) {
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
        let mat = val.match(cnReg);
        let chLen = mat ? mat.length : 0;
        let len = chLen + (val.length - chLen) * 0.5;
        if (len > maxLen) {
          return false
        } else {
          return true
        }
      },
      adminGetMeau: function (arr, val) {
        var task = []
        if(!arr) {
          return task
        }
        task = arr.filter(function (p) {
          return p.action === val;
        });
        return task
      },
      adminCheckRole: function (arr, one, two) {
        console.log('1233',arr);
        if(!Array.isArray(arr)) {
          return false
        }
        var task = arr.filter(function (p) {
          return p.action === one;
        });
        var task2 = []
        if (task.length > 0) {
          if(!task[0].son) {
            return false
          }
          task2 = task[0].son.filter(function (p) {
            return p.action === two;
          });
        }
        if (task2.length > 0) {
          return true
        }
        else {
          return false
        }

      }


    };

  }
}
Vue.use(comssr);
