import Vue from 'vue'
import moment from 'moment'

// import PullTo from 'vue-pull-to'
// Vue.use(PullTo)
// 号码 隐藏中4位
Vue.filter('tel-hide',(t)=> {
  return t.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
})
////////////////////
// 时长 转换start
// 秒转小时
Vue.filter('s-h',(t)=> {
  // console.log(Number(t)/3600)
  return Number.parseFloat(Number(t)/3600)
})
// 秒转分钟
Vue.filter('s-m',(t)=> {
  // console.log(Number(t)/3600)
  return Number.parseFloat(Number(t)/60)
})
// 秒转 时 分 秒 格式化
Vue.filter('s-h-format',(t)=> {
  // console.log(Number(t)/3600)
  let h =Number.parseInt(Number(t)/3600)
  let m =Number.parseInt(Number(t)%3600 /60)
  let s =Number.parseInt(Number(t)%3600 %60)
  let hh = h>9?h:'0'+h
  let mm = m>9?m:'0'+m
  let ss = s>9?s:'0'+s
  return hh+':'+mm+':'+ss
})

// 时长 转换end
////////////////////////
// 时间格式化 转换start
Vue.prototype.get_date= () => {
  // return myDate.getFullYear()+"年 "+myDate.getMonth()+"月 "+myDate.getDate()+"日 "+myDate.getDay()
  return moment(new Date()).format('YYYY-MM-DD')
}
// new Date() 格式化字符串
Vue.prototype.date= () => {
  let myDate = new Date();
  return myDate.getFullYear()+"年 "+myDate.getMonth()+"月 "+myDate.getDate()+"日 "+myDate.getDay()
}
//时间字符串 转xxxx年 xx月 2018-09 =>2018年9月
Vue.filter('date-y-m',(t)=> {
  return moment(t).format('YYYY年MM月')
})

// 时间格式 保留时分  10：00：00=》10：00
Vue.filter('h-m',(t)=> {
  // console.log(t.split(':').splice(0,2).join(':'))
  return t.split(':').splice(0,2).join(':')
})
// 时间格式 保留年月日 2018-09-11 10：00：00=》2018-09-11
Vue.filter('y-m-d',(t)=> {
  // console.log(t.split(':').splice(0,2).join(':'))
  return t.substr(0,10)
})
// 时间格式化 转换end
//////////////////////
// 数值保留位数 start
Vue.filter('fixed0',(t)=> {
  return Number.parseInt(t)
})
Vue.filter('fixed1',(t)=> {
  return t.toFixed(1);
})
Vue.filter('fixed2',(t)=> {
  return t.toFixed(2);
})
// 数值保留位数 end

/////////////////
// 校验类 start
// 11 手机号 校验
Vue.prototype.iphone = (t)=>{
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(t)
}

// 包含数字 字母 特殊符 的 6--16位 密码 类型校验
//密码须包含 数字 字母 和 下划线 中的至少两种，6--16位
//密码之校验长度 6--16位
Vue.prototype.checkPwd = (t)=>{
  // return (new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}')).test(t)
  // return (new RegExp('(?!^\\\\d+$)(?!^[a-zA-Z]+$)(?!^[_]+$).{6,16}')).test(t)
  return (new RegExp('^.{6,16}')).test(t)
  
}

// 校验类 end
