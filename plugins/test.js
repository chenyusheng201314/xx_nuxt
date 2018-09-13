import Vue from 'vue'
var comsys= {
    install(Vue){
        Vue.prototype.comsys = {
        	val:function(val){
        		return val
        	}
        };
        
    }
}
Vue.use(comsys);