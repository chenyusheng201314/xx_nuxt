const {Nuxt, Builder} = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const axios = require('axios')


// Body parser，用来封装 req.body
app.use(bodyParser.json())

// Sessions 来创建 req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1800000}
}))

// 发起 POST /api/login 请求完成用户登录，并添加该用户到 req.session.userInfo
app.post('/api/login', async function (req, res) {
  // if (req.body.username === 'demo' && req.body.password === 'demo') {
  //const userInfo = await axios.post('http://www.tests.com/web/',req.body);
  console.log(req.body)

})
// 发起 POST /api/logout 请求注销当前用户，并从 req.session 中移除
app.post('/api/logout', function (req, res) {
  delete req.session.userInfo
  res.json({ok: true})
})

 


app.post('/api/logins', async function (req, res) {
  return res.json(await axios({
    method: 'POST',
    url: "https://platform.vpx.com.cn/api/v1/manage/auth/login",
    data: req.body
  }).then(function (res) {
    req.session.token = res.data.token
    req.session.adminUsername = req.body.username
    return res.data
  }).catch(function (res) {
    return res
  }))
});

app.post('/api/admin_logout', function (req, res) {
  delete req.session.token
  res.json({ok: true})
})



app.post('/api/company_login', async function (req, res) {
  return res.json(await axios({
    method: 'POST',
    url: "https://platform.vpx.com.cn/api/v1/company/auth/login",
    data: req.body
  }).then(function (res) {
    req.session.companyToken = res.data.token
    req.session.companyUsername = req.body.mobile
    return res.data
  }).catch(function (res) {
    return res
  }))
});

app.post('/api/company_logout', function (req, res) {
  delete req.session.companyToken
  res.json({ok: true})
})


//初始化 Nuxt.js：
const config = require('./nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)
app.use(nuxt.render)

const isProd = process.env.NODE_ENV === 'production'
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}

// 运营后台 发起 POST /api/logins 请求完成用户登录，并添加该用户到 req.session.userInfo


app.use(nuxt.render)
app.listen(3030)
console.log('Server is listening on http://localhost:3000')
