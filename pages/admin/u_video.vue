<template>
  <div><input type="file" :style="m_style" id="upload" value="多文件上传" multiple :accept="mime" v-on:click="getUpload()"/>

    <div class="up-lists-cover" v-show="cover_show">
      <div class="cover-con">
        <h3>上传列表</h3>
        <ul>
          <li v-for="(item,index) in upload_item" :key="index">
            <div class="icon">
              <img src="/admin/images/class/icon-video.png" alt="">
            </div>
            <!--名称、大小-->
            <div class="upload_name">
              <p>{{item.name}}</p>
              <p>{{item.pro_size | b_to_mb}}MB/{{item.size | b_to_mb}}MB</p>
            </div>
            <!--进度条-->
            <div class="upload_process">
              <div class="upload_process_in" :style="{width: item.process}"></div>
            </div>
            <!--百分比-->
            <div class="upload_percent">{{item.process}}</div>
            <div class="upload_status">
    <span class="badge"
          :class="{badge_info_b:item.state=== 0,badge_primary_b:item.state===1,badge_warning_b:item.state===2,badge_success_b:item.state===3}">{{item.state===0?"等待中":item.state===1?"上传中":item.state===2?"已暂停":"已完成"}}</span>
              <!--+ //0等待上传，1上传中，2暂停中，3已完成-->
            </div>

            <div class="upload_control">
              <i class="iconfont" data-toggle="tooltip" data-placement="top" data-original-title="暂停"
                 v-show="item.state=== 1" @click=upload_stop(item.uploader,index)>&#xe650;</i>
              <i class="iconfont" data-toggle="tooltip" data-placement="top" data-original-title="恢复上传"
                 v-show="item.state===2" @click=upload_start(item.uploader,index)>&#xe61d;</i>
            </div>
          </li>
        </ul>
        <div class="remove-list" @click="close_cover(false)">收起上传列表</div>
      </div>
    </div>
    <!--// '<video id="vidi" style="display: none" :src="vsrc" @canplaythrough="myFunction($event,0)"></video>'+-->

  </div>
</template>

<script>
  import '~/static/admin/css/up_video.css'
  import Vue from 'vue'
  //b转换成MB 1048576 B => 1 MB
  Vue.filter('b_to_mb', function (m) {
    let mb = m / 1024 / 1024;
    return mb.toFixed(2);
  });
  export default {
    name: "u_video",
    layout: 'admin',
    props: ['mime', 'm_style', 'cover_show'],
    data: function () {
      return {
        vsrc: '',
        vsrc1: '',
        vsrc_t: '',
        vsrc_t1: '',
        upload_item: [], //上传列表
        upload_control_item: [], //上传控制列表 实质和上传列表一模一样，只是一个用于显示，一个用于删除清空操作
        upload_vedio_nums: 0, //正在上传视频的个数，用于暂停和上传结束的后续操作判断
        upload_index: 0,
        upload_index_a: 0,
      }
    },
    methods: {
      myFunction: function (ele, t) {
        console.log('myFunction', ele)
        // this.vsrc_t = ele.target.duration
        // if(t==0){
        //     this.vsrc_t = ele.target.duration
        // }else {
        //     this.vsrc_t1 = ele.target.duration
        // }

        console.log('565656', this.vsrc_t)
      },

      //获取上传凭证
      get_voucher: function (title, filename, filesize, cateid) {
        const _this = this;
        var key_info;
        jQuery.ajax({
          url: 'https://platform.vpx.com.cn/api/v1/common/video/create_upload',
          type: 'POST',
          dataType: 'json',
          headers: {
            token: _this.$store.state.admin.token,
          },
          async: false,
          data: {
            title: title, //YES     视频标题
            filename: filename, //YES  视频文件名，带扩展名
            filesize: filesize, //NO   视频大小单位：字节
            description: '', //NO    视频描述，长度不超过1024个字节，UTF8编码
            coverurl: '', //NO   自定义视频封面URL地址
            cateid: cateid, //YES    视频分类ID，固定值公司视频 (ID:958997537)
            tags: '' //NO    视频标签，单个标签不超过32字节，最多不超过16个标签。多个用逗号分隔
          },
          success: function (data) {
            key_info = data;
          }
        });
        return key_info;
      },
      //刷新上传凭证
      update_voucher: function (videoId) {
        const _this = this;
        jQuery.ajax({
          url: 'https://platform.vpx.com.cn/api/v1/common/video/refresh_upload',
          type: 'POST',
          dataType: 'json',
          headers: {
            token: _this.$store.state.admin.token,
          },
          data: {
            videoid: videoId
          },
          success: function (data) {
          },
        });
      },
      //创建AliyunUpload.Vod实例,并设置回调
      create_uploader: function (uploadAuth, uploadAddress, videoId, index, size, t) {
        var _this = this;
        var uploader = new AliyunUpload.Vod({
          //分片大小默认1M，不能小于100K
          partSize: 1048576,
          //并行上传分片个数，默认5
          parallel: 5,
          //网络原因失败时，重新上传次数，默认为3
          retryCount: 3,
          //网络原因失败时，重新上传间隔时间，默认为2秒
          retryDuration: 2,
          // 开始上传
          'onUploadstarted': function (uploadInfo) {
            _this.upload_item[index].state = 1;
            _this.upload_vedio_nums++;
            console.log('开始上传了......');
            _this.close_cover(true);
            // console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            //上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
            //上传方式2
            // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret,secretToken);
          },
          // 文件上传成功
          'onUploadSucceed': function (uploadInfo) {
            _this.upload_item[index].state = 3;
            _this.upload_vedio_nums--;
            var name = uploadInfo.file.name;
            let type = uploadInfo.file.type.split('/')[1];
            //刷新列表看是否有等待中上传文件，若有就开始自动上传(总是保持上传队列最多只有三个文件同时在上传)
            _this.update_upload_item();

            // alert(videoId)
            // console.log('000000时长', t)
            console.log('完成',uploadInfo);

            jQuery.ajax({
              url: 'https://platform.vpx.com.cn/api/v1/manage/manage_video/video_add',
              type: 'POST',
              dataType: 'json',
              headers: {
                token: _this.$store.state.admin.token,
              },
              data: {
                upload_name: name,
                video_id: videoId,
                size: size,
                duration: 0,
                video_type: type,
              },
              success: function (data) {
                console.log(name + '已经保存成功');
                _this.$emit('get_list_again', true)
              }
            });

            // console.log('上传成功......')
            // console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
          },
          // 文件上传失败
          'onUploadFailed': function (uploadInfo, code, message) {
            console.log('你倒霉了，上传失败了......');
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
          },
          // 文件上传进度，单位：字节
          'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
            _this.upload_item[index].process = Math.ceil(loadedPercent * 100) + '%';
            _this.upload_item[index].pro_size = Math.ceil(loadedPercent * 100) / 100 * _this.upload_item[index].size;
            console.log('上传进度', Math.ceil(loadedPercent * 100) + '%')
            // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(loadedPercent * 100) + "%");
          },
          // 上传凭证超时
          'onUploadTokenExpired': function (uploadInfo) {
            var _this = this;
            console.log('上传凭证超时了......');
            console.log("onUploadTokenExpired");
            //凭证超时时，刷新凭证
            _this.update_voucher(videoId);
            //上传方式1  实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
            // uploader.resumeUploadWithAuth(uploadAuth);
            // 上传方式2 实现时，从新获取STS临时账号用于恢复上传
            // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expireTime);
          },
          //当前文件上传结束
          'onUploadEnd': function (uploadInfo) {
            console.log('上传已经全部结束了......')
            // console.log("onUploadEnd: uploaded all the files" + uploadInfo);
          }
        });
        return uploader;
      },

      //获取到用户选择的文件后，添加到上传列表中
      add_file: function (uploader, file) {
        uploader.addFile(file, null, null, null, null);
      },
      //删除单个上传文件
      delete_file: function (uploader, index) {
        uploader.deleteFile(index);
      },
      //取消单个文件上传
      cancle_file: function (uploader, index) {
        uploader.cancelFile(0);
      },
      //恢复单个文件上传
      resume_file: function (uploader, index) {
        uploader.resumeFile(0);
      },
      //获取上传文件列表
      get_file_lists: function (uploader) {
        uploader.listFiles();
        var list = uploader.listFiles();
        for (var i = 0; i < list.length; i++) {
          log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
        }
      },
      //清理上传文件列表
      clear_file_lists: function (uploader) {
        uploader.cleanList();
      },
      //开始上传
      upload_start: function (uploader, index) {
        var _this = this;
        if (_this.upload_vedio_nums < 2) {
          uploader.startUpload();
          _this.upload_item[index].state = 1;
        } else {
          _this.result({
            type: 'r',
            content: '已有文件在上传，请稍候再开始吧',
            timer: 1500
          });
        }
      },
      //停止上传
      upload_stop: function (uploader, index) {
        var _this = this;
        _this.upload_item[index].state = 2;
        uploader.stopUpload();
        _this.upload_vedio_nums--;
        _this.update_upload_item();
      },
      //上传凭证失效后恢复上传
      resumeUploadWithAuth: function (uploader) {
        uploader.resumeUploadWithAuth(uploadAuth);
      },
      //设置上传凭证
      setUploadAuthAndAddress: function (uploader) {
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
      },
      //刷新列表等待中的上传文件自动开始上传
      update_upload_item: function () {
        var _this = this;
        if (_this.upload_vedio_nums < 2) {
          var l = 3 - _this.upload_vedio_nums;
          for (var i = 0; i < _this.upload_control_item.length; i++) {
            if (_this.upload_control_item[i].state == 0) {
              if (l > 0) {
                _this.upload_start(_this.upload_control_item[i].uploader, i);
                l--;
              }
            }
          }
        }
      },
      //  关闭弹窗
      close_cover(bool) {
        this.$emit('close_cover', bool)
      },
      getUpload(){
        var _this = this;
        var jq = $;
        var key_info = '';
        var upload_array;
          document.getElementById("upload").addEventListener('change', function (event) {
            var l = 0;
            for (var i = 0; i < event.target.files.length; i++) {
              var fr = new FileReader();
              fr.onloadend = function (e) {
                // if(i==0){
                //     _this.vsrc = e.target.result;
                // }else {
                //     _this.vsrc1 = e.target.result;
                // }
                _this.vsrc = e.target.result;
              };
              console.log('文件属性', event.target.files[i]);
              fr.readAsDataURL(event.target.files[i]);
              //获取上传凭证
              key_info = _this.get_voucher(event.target.files[i].name, event.target.files[i].name, event.target.files[i].size, 536768796);
              //创建uploader对象
              var uploader = _this.create_uploader(key_info.data.UploadAuth, key_info.data.UploadAddress, key_info.data.VideoId, _this.upload_index_a, event.target.files[i].size, _this.vsrc_t);
              //添加当前文件对象
              _this.add_file(uploader, event.target.files[i]);
              upload_array = {
                uploader: uploader, //上传对象
                name: event.target.files[i].name, //上传的文件名
                pro_size: '', //当前文件上传的大小
                size: event.target.files[i].size, //获取文件的大小
                process: 0, //文件的上传百分比
                state: 0, //文件的上传状态，0等待上传，1上传中，2暂停中，3已完成

              };
              _this.upload_item.push(upload_array);
              _this.upload_control_item.push(upload_array);
              l++;
              _this.upload_index_a++;
            }
            //打开模态框
            jq('#file_prosess').modal('toggle');
            //如果上传队列大于等于1个，就自动开始第1个视频的上传，我们默认支持1个视频的同时上传，若有业务改动，请酌情修改
            if (l > 1) {
              //0位置的视频开始上传
              _this.upload_start(_this.upload_control_item[_this.upload_index].uploader, _this.upload_index);
              _this.upload_index++;
            } else {
              //如果上传队列小于1个，就全部开始上传
              for (let i = 0; i < l; i++) {
                //i位置的视频开始上传
                _this.upload_start(_this.upload_control_item[_this.upload_index].uploader, _this.upload_index);
                _this.upload_index++;
              }
            }
          });
      }
    },
    watch: {

      vsrc(newSong, oldSong) {
        // console.log(newSong,oldSong)

        this.myFunction()
      }
    },
    mounted: function () {


    },
    head() {
      return {
        script: [
          {src: '/admin/js/es6-promise.min.js'},
          {src: '/admin/js/aliyun-oss-sdk4.13.2.min.js'},
          {src: '/admin/js/aliyun-upload-sdk1.3.1.min.js'},
          {src: '/admin/js/bootstrap.min.js'},
        ]
      }
    },
  }
</script>

<style scoped>

</style>
