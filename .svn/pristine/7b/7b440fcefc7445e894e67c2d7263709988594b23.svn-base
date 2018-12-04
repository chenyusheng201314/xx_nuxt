<template>
  <div class="class-detail">
    <localRoute :route="route_data"></localRoute>
    <!--<Buy :info="course"></Buy>-->
    <!--头部播放器-->
    <div class="buy-info">
      <div class="buy-left">
        <img :src="course.cover" alt="" width="534" height="300">
        <!--<div class="prism-player" id="J_prismPlayer"></div>-->
      </div>
      <div class="buy-right">
        <h3 class="buy-tit">{{course.course_name}}</h3>
        <p class="buy-teacher">{{course.organization_teacher.realname}} | {{course.organization_teacher.title}}</p>
        <p class="buy-class-info">
          <img src="/images/class/icon-num.png" alt="" width="16" height="16">
          <span>{{course.section_num}} 课时</span>
          <img src="/images/class/icon-time.png" alt="" width="16" height="16">
          <span>{{course.media_time|s-h|fixed2}} 小时</span>
          <!--收藏的人数-->
          <!--<img src="/images/class/icon-per.png" alt="" width="16" height="16">-->
          <!--<span>{{course.per}}人</span>-->
        </p>
        <p class="buy-price">
          <span class="buy-price-now">价格：{{course.price}} 学币</span>
          <!--<span class="buy-price-old">{{course.old_price}} 学币</span>-->
          <!--<span style="color: #fff;">时间 {{time}}</span>-->
        </p>
        <div class="buy-btn already-buy" v-if="course.is_get">已购买</div>
        <div class="buy-btn now-buy" v-else @click="ewm_change(true)">立即购买</div>



        <!-- 点击购买出现二维码  前期没有登录功能加上-->
        <div class="ewm-cover" v-show="ewm_show">
          <div class="cover-con">
            <span class="close" @click="ewm_change(false)"><img src="/images/class/close.png" alt=""></span>
            <img src="/images/class/ewm.png" alt="" width="150">
            <p>下载APP购买或观看课程</p>
          </div>
        </div>

        <!-- 收藏 分享-->
        <div class="buy-share">
          <!--<span class="share share-icon" @mouseenter="pic_change(true)" @mouseleave="pic_change(false)">-->
            <!--<img :src="share.src" alt="" width="23" height="23">-->
          <!--</span>-->

          <!--<span class="like share-icon" @click="save">-->
            <!--<img :src="course.is_follow?'/images/class/like2.png':'/images/class/like1.png'" alt="" width="23" height="21">-->
          <!--</span>-->

          <!--<div class="share-detail" v-show="share.type" @mouseenter="pic_change(true)" @mouseleave="pic_change(false)">-->
            <!--<div class="share-detail-show">-->
              <!--<span class="share-detail-icon" @mouseenter="qq_change(true)" @mouseleave="qq_change(false)">-->
                <!--<img :src="qq" alt="" width="25" height="25">-->
              <!--</span>-->
              <!--<span class="share-detail-icon" @mouseenter="wx_change(true)" @mouseleave="wx_change(false)">-->
                <!--<img :src="wx" alt="" width="25" height="25">-->
              <!--</span>-->
              <!--<span class="share-detail-icon" @mouseenter="wb_change(true)" @mouseleave="wb_change(false)">-->
                <!--<img :src="wb" alt="" width="25" height="25">-->
              <!--</span>-->
              <!--<p class="xsj"></p>-->
            <!--</div>-->
          <!--</div>-->
        </div>

      </div>
    </div>


    <IntroduceTab :lesson_tab="lesson_tab" :change_tab="change_tab"></IntroduceTab>
    <Introduce
      :info="course"
      :teacher_info="teacher_info"
      :other_lesson="other_lesson"
      :tea_case="tea_case"
      v-show="lesson_tab === 1"
    ></Introduce>
    <Catalogue :lesson_mulu="course.chapters" :is_get="course.is_get" v-show="lesson_tab == 2" :c_index="c_index" :s_index="s_index" @selectErweima="selectErweima" @select="select"></Catalogue>
  </div>
</template>

<script>
  import localRoute from '@/components/localRoute'
  // import Buy from './buy'
  import IntroduceTab from './introduce-tab'
  import Introduce from './introduce'
  import Catalogue from './catalogue'
  export default {
    name: 'detail',
    components: {
      localRoute,
      IntroduceTab,
      Introduce,
      Catalogue
    },
    head() {
      return {
        title:this.course.course_name+'-享学就学 ',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.course.course_name
          },{
            hid: 'description',
            name: 'description',
            content: this.course.seo_description
          }],
        link: [
          // {
          //   href: 'https://g.alicdn.com/de/prismplayer/2.7.2/skins/default/aliplayer-min.css',
          //   rel: 'stylesheet',
          //   type: 'text/css'
          // },
          {
            href: '/css/class.css',
            type:'text/css',
            rel: 'stylesheet',
          }
        ],
        // script: [{src: 'https://g.alicdn.com/de/prismplayer/2.7.2/aliplayer-flash-min.js'}]
        // script: [{src: 'https://g.alicdn.com/de/prismplayer/2.7.2/aliplayer-min.js'}]
      }
    },
    data() {
      return {
        // 头部相关start
        // share: {
        //   src: '/images/class/share1.png',
        //   type: false
        // },
        //
        // qq: '/images/class/icon-qq1.png', // qq图片切换
        // wx: '/images/class/icon-wx1.png',
        // wb: '/images/class/icon-wb1.png',
        //  二维码显示
        ewm_show: false,


        // player :null,
        c_index: 0, //播放的是第几个
        s_index: 0,
        free_index:0,//可试看列表 播放index
        //
        // time:0,
        // timer:0, //定时器 定时时间
        // submit_data: {
        //   numChange: 1, //可修改 购买数量
        //   title: '',
        //   price_type: 2,
        //   price: 0,
        // },
        // pay_data: {
        //   my_money: 0,
        //   my_points: 0,
        //   price_total: 0,
        //   num:1,
        //   type: 0,
        // },
        // 头部相关end

        lesson_tab: 1, // 课程介绍切换  1表示课程概述  2表示课程目录
      }
    },
    async asyncData({store,params}) {
      // 课程详情
      let course = await store.dispatch('httpGet', {
        url: '/app/course/course_detail',
        data: {
          course_id: params.id,
        }
      })
      // 导师信息
      let teacher = await store.dispatch('httpGet', {
        url: '/home/teacher/info',
        data: {
          id: course.data.organization_teacher.id
        }
      });
      //获取老师的其他课程
      let other_course = await store.dispatch('httpGet', {
        url: '/home/teacher/course',
        data: {
          teacher_id: course.data.organization_teacher.id,
          psize: 5,
          page: 1,
        }
      });
      //获取老师案例
      let cases = await store.dispatch('httpGet', {
        url: '/home/organization_cases/list',
        data: {
          teacher_id: course.data.organization_teacher.id,
          psize: 5,
          page: 1
        }
      });

      console.log('课程 ',course,'老师',teacher.data,'其他课程',other_course.data.data,'老师案例', cases)
      console.log('课程章节 ',course.data.chapters[0])

      // 已购买 不存在试看条件 未购买 查找试看视频的index 和 ind
      let app_free = [] //可试看的 第一个

      let c = course.data.chapters, index=0, ind=0;
      let section_num = 0
      for(index in c) {
        for (ind in c[index].course_section){
          if (c[index].course_section[ind].app_free===1) {
            // console.log(index,ind)
            app_free.push({c:Number(index), s:Number(ind)})
          }
          section_num = ind +1
        }
      }


      return {
        route_data: [{name: '享学科技网', path: '/'}, {name: '课程分类', path: '/class/list'},{name:'课程详情',path:''}],
        course: course.data,
        app_free: app_free,
        section_num,
        // course_id: params.id,
        teacher_info:teacher.data,
        other_lesson: other_course.data.data,
        tea_case: cases.data.data
      }
    },

    // updated () {
    //   // document.documentElement.scrollTop = '0'
    //   // console.log('顶部',document.documentElement.scrollTop)
    // },
    watch:{
      ewm_show (t) {
        if(t) {
          document.getElementsByTagName('body')[0].className = 'modal-open'
        }else {
          document.getElementsByTagName('body')[0].className = ''
        }
      },



      // 提交 学习时间 定时器时间 播放结束或 切换到其他页面前 提交
      // 每30秒 提交一次 定时记录 并请求一次 当前学习 总进度
      async time (time) {
        // console.log('time',time)
        // if (this.course.is_get) { //已购买 才发送学习时长
        //   if (time%20===0 && 1){
        //     console.log('状态',this.player.getStatus())
        //     let res = await axios({
        //       method: 'post',
        //       url:this.apiUrl+'/api/v1/app/course/person_course_durationlog_add',
        //       headers:{
        //         token: this.$store.state.userInfo.token
        //       },
        //       data: {
        //         course_id: this.course.id,
        //         chapter_id: this.course.chapters[this.c_index].chapter_id,
        //         section_id: this.course.chapters[this.c_index].course_section[this.s_index].section_id,
        //         duration_log:20
        //       }
        //     })
        //     if (res.data.code===0){
        //       // let time = this.course.chapters[this.c_index].course_section[this.s_index].media_time
        //       // this.progress(this.c_index, this.s_index, 20, time)
        //     }else {
        //       // 进度添加失败
        //       alert(res.data.message)
        //     }
        //     // console.log('time',time,res.data.code)
        //   }
        // }else{
        //   // console.log('视频id',this.course.id,'章',this.course.chapters[this.c_index].chapter_id,'节',this.course.chapters[this.c_index].course_section[this.s_index].section_id,'time',10)
        //   // console.log('totaltime',this.course.chapters[this.c_index].course_section[this.s_index].media_time)
        //   // console.log('未购买 不计时长',time)
        // }
      }
    },
    methods: {
      // 获取播放凭证
      async get_auth(id) {
        let res = await this.$store.dispatch('minePost', {
          url: '/common/video/GetVideoPlayAuth',
          data: {
            'videoid': id
          }
        });
        return res.data
      },
      // 初始化播放器
      async play_init(index,ind,id) {
        let that = this
        let a = await this.get_auth(id)
        // console.log('封面',a.CoverURL,)
        this.player = new Aliplayer({
            id: 'J_prismPlayer',
            //播放方式二：点播用户推荐
            vid : id,
            playauth: a.PlayAuth,
            cover: a.CoverURL,
            // format: "m3u8",
            width: '100%',
            height: '100%',
            autoplay: !(index===0&&ind===0),
            playsinline:true,
            // preload:false,
            // useH5Prism: true,
            useFlashPrism: true,
            isLive:false,

            controlBarVisibility:'click',
            showBarTime: 5000,
          },function(player){
          console.log('播放器创建好了。')
            // 先获取 学习时长
            // play.off('waiting',function() {
            //   clearInterval(that.timer)
            //   // that.timer = setInterval(()=>{
            //   //   that.time += 1
            //   // },1000)
            // })
            // play.on('waiting',function() {
            //   // clearInterval(that.timer)
            //   // console.log('缓冲')
            //   // 提交播放进度 视频总时长
            //   // let time = that.course.chapters[that.c_index].course_section[that.s_index].media_time
            //   // that.progress(that.c_index,that.s_index,play.getCurrentTime(),time)
            // })
            //
            //
            // play.off('ended',that.next)
            // play.on('ended',that.next)

            // play.on('requestFullScreen', that.fullScreenHandle);
            // play.on('cancelFullScreen', that.cancelFullScreenHandel);
          })
        this.player.on('ready',function() {
          // that.player.off('play',function() {
          //   clearInterval(that.timer)
          //   that.time = 0
          // })
          that.player.on('play',function() {
            clearInterval(that.timer)
            that.timer = setInterval(()=>{
              that.time += 1
            },1000)
          })
          // that.player.off('pause',function() {
          //   clearInterval(that.timer)
          // })


          that.player.on('pause',function(e) {
            clearInterval(that.timer)

            // console.log('pause',e.paramData)
            // console.log('暂停，当前，总时长',play.getCurrentTime(),play.getDuration())

            // 提交播放进度 视频总时长

          })

          that.player.on('timeupdate',function(e) {
            console.log('timeupdate',e)
          })

          that.player.on('completeSeek',function(e) {
            console.log('timeupdate',e.paramData)

            let time = that.course.chapters[that.c_index].course_section[that.s_index].media_time
            that.progress(that.c_index,that.s_index,e.paramData,time)
          })
          that.player.on('ended',that.next)
        })

      },


      // 自动播放下一个
      async next () {
        console.log('下一个',this.c_index,this.s_index)
        if (this.course.is_get) { //已购买
          //播放结束 提交播放进度 视频总时长
          let time = this.course.chapters[this.c_index].course_section[this.s_index].media_time
          this.progress(this.c_index,this.s_index,time,time)

          // 准备下一个视频
          let next_id=0;
          let c_index=this.c_index+1;
          let s_index=this.s_index+1;

          let next_chapter_id = this.course.chapters[c_index]&&this.course.chapters[c_index].course_section[0].video_id
          // console.log('长度',s_index,this.course.chapters[this.c_index].course_section.length)
          if (s_index<this.course.chapters[this.c_index].course_section.length) {
            // 当前章 下一节
            next_id = this.course.chapters[this.c_index].course_section[s_index].video_id
            this.player.dispose(); //销毁
            $('#J_prismPlayer').empty();
            this.play_init(this.c_index,s_index,next_id)
            this.s_index= s_index;
            // console.log('切换',this.c_index,s_index)
          }
          else if(next_chapter_id){
            // 下一章 第一节
            this.player.dispose(); //销毁
            $('#J_prismPlayer').empty();
            this.play_init(c_index,0,next_chapter_id)

            this.c_index = c_index
            this.s_index = 0
          }else {
            this.$message({
              message:'没有可播放的视频了~',
              type:'warning'
            })
          }
        }else {  //未购买
          // 查找下一个可试看 的视频
          console.log('free_index',this.free_index,)
          let next_id=0
          let f_index=this.free_index+1; //可播放列表中的  下一个
          let c_index = this.app_free[f_index].c
          let s_index = this.app_free[f_index].s
          console.log('试看index',c_index,s_index)
          if (f_index<this.app_free.length) {
            next_id = this.course.chapters[c_index].course_section[s_index].video_id
            this.player.dispose(); //销毁
            $('#J_prismPlayer').empty();
            this.play_init(c_index,s_index,next_id)

            this.c_index = c_index
            this.s_index = s_index
            this.free_index +=1
          }else {
            this.$message({
              message:'请购买后观看其他视频~',
              type:'warning'
            })
          }
        }
      },

      // 选择播放
      async select (free,index,ind,id) {
        // console.log('选择参数',free,index,ind,id)
        if(this.course.is_get || free) {

          this.c_index = index
          this.s_index = ind

          this.player.dispose(); //销毁
          $('#J_prismPlayer').empty();//id为html里指定的播放器的容器id
          this.play_init(index,ind,id)
        }else{
          this.$message({
            message:'请购买后观看~',
            type:'warning'
          })
        }
      },
      // 提交 视频播放进度 不是学习时长 的定时 暂停或播放完成 提交 始终提交
      async progress (index,ind,time,total_time) {
        // console.log('进度参数',index,ind,time,total_time)
        if (this.course.is_get) { //已购买 才发送学习时长
          let res = await axios({
            method: 'post',
            url: this.apiUrl + '/api/v1/app/course/person_course_playlog_add',
            headers: {
              token: this.$store.state.userInfo.token
            },
            data: {
              course_id: this.course.id,
              chapter_id: this.course.chapters[index].chapter_id,
              section_id: this.course.chapters[index].course_section[ind].section_id,
              play_long: time,
              section_long: total_time,
              type: 1
            }
          })
          console.log('progress进度',res.data)
          if (res.data.code===0) {
            let res = await axios.get(this.$store.state.apiUrl+'/api/v1/app/course/course_detail', {
              headers: {
                token: this.$store.state.userInfo.token
              },
              params: {
                course_id: this.course.id
              }
            })
            // 刷新 学习进度 是 视频进度条进度
            console.log('刷新进度',res.data.data.rate)
            this.course.rate = res.data.data.rate
          }

        }
      },
      // 关注 切换
      async save () {
        // console.log(this.course.is_follow,this.$store.state.userInfo.token)
        // 关注
        if (1) {
          if (this.course.is_follow===0) {
            let res = await this.$store.dispatch('minePost', {
              url: '/app/course/person_course_follow',
              data: {
                course_id: this.course.id
              }
            });
            console.log('关注',res)
            if(res.message==='操作成功' ||res.message==='已关注'){
              this.course.is_follow =1
              this.$message({
                message:'关注成功~',
                type:'success'
              })
            }
          }else {
            // 取消关注
            let res = await this.$store.dispatch('minePost', {
              url: '/app/course/person_course_unfollow',
              data: {
                course_id: this.course.id
              }
            });
            console.log('取消关注',res)
            if(res.message==='操作成功'){
              this.course.is_follow =0
              this.$message({
                message:'取消关注~',
                type:'success'
              })
            }
          }
        }else {
          // 登录

        }

      },



      // 切换目录和 简介
      change_tab(val) {
        this.lesson_tab = val
      },

      // 分享
      pic_change(bool) {
        var that = this
        if (bool) {
          that.share.src = '/images/class/share2.png'
          that.share.type = true
        } else {
          that.share.src = '/images/class/share1.png'
          that.share.type = false
        }
      },

      qq_change(bool) {
        var that = this
        if (bool) {
          that.qq = '/images/class/icon-qq2.png'
        } else {
          that.qq = '/images/class/icon-qq1.png'
        }
      },
      wx_change(bool) {
        var that = this
        if (bool) {
          that.wx = '/images/class/icon-wx2.png'
        } else {
          that.wx = '/images/class/icon-wx1.png'
        }
      },
      wb_change(bool) {
        var that = this
        if (bool) {
          that.wb = '/images/class/icon-wb2.png'
        } else {
          that.wb = '/images/class/icon-wb1.png'
        }
      },

      // 购买 二维码
      ewm_change(bool) {
        this.ewm_show = bool;
      },
      selectErweima () {
        this.ewm_show = true;
      }
    },
    mounted() {
      // this.play_init(0,0,this.course.chapters[0].course_section[0].video_id)
    },
  }
</script>

