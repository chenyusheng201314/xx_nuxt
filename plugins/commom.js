import Vue from 'vue'
var comsys= {
    install(Vue){
        Vue.prototype.comsys = {
            val:function(val){
                return val
            },
            adminGetMeau:function(arr,val) {
                var task = []
                if(!arr) {
                  return task
                }
            	task = arr.filter(function(p){
			            return p.action === val;
			    });
			    return task
            },
            adminCheckRole:function(arr,one,two) {
                if(!arr) {
                  return false
                }
                var task = arr.filter(function(p){
                        return p.action === one;
                });
                var task2 = []
                if(task.length>0) {
                    if(!task[0].son) {
                      return false
                    }
                    task2 = task[0].son.filter(function(p){
                        return p.action === two;
                    });
                }
                if(task2.length>0) {
                   return true
                }
                else {
                   return false  
                }
                
            }
            
        };
        
    }
}
Vue.use(comsys);
 