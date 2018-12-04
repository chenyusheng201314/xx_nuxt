
export default async function ({store, error, redirect}) {
  
 console.log(store.state.company.token)
  if (!store.state.company.token) {
    redirect('/')
  }
  else {
    console.log('admin',store.state.admin.token)
    console.log('company',store.state.company.token)
  	let params = {url: "/company/training/training_buy_list",data:{page:1,psize:10,role:1}}
    let res  = await store.dispatch("companyHttpGet",params);
    console.log(res)
    if(res.code==2001) {
    	redirect('/')
    }
  }
  


}
