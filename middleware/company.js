
export default async function ({store, error, redirect}) {
  
 
  if (!store.state.company.token) {
    redirect('/company_manage/login')
  }
  // else {
  //   console.log('admin',store.state.admin.token)
  //   console.log('company',store.state.company.token)
  // 	let params = {url: "/manage/training/training_list",data:{page:1,psize:10}}
  //   let res  = await store.dispatch("adminHttpGet",params);
  //   console.log(res)
  //   if(res.code==2001) {
  //   	redirect('/admin/login')
  //   }
  // }
  


}
