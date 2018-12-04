
export default async function ({store, error, redirect}) {
  if (store.state.isLogin!=1) {
    redirect('/')
  }
  else if (!store.state.userInfo.token) {
    redirect('/')
  }
  else {
  	let params = {url: "/app/personal/medal",data:{page:1,psize:10}}
    let res  = await store.dispatch("mineGet",params);
    if(res.code==2001) {
    	redirect('/')
    }
  }
}
