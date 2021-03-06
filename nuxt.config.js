module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '享学就学',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: { allChunks: true },
  },
  plugins: [{
    src: '~plugins/ElementUI',
    ssr: true,
  },{
    src: '~plugins/quill',
    ssr: false,
  },{
    src: '~plugins/commomSSR',
    ssr: true,
  },{
    src: '~plugins/commom',
    ssr: false,
  },{
    src: '~plugins/index',
    ssr: true,
  }],
  // css: [
  //   'element-ui/lib/theme-chalk/index.css'
  // ]
  env: {
    NODE_ENV: process.env.NODE_ENV
  }
  
}

