<template>
<div>
 
  <div class="" role="document">
        <div class="">
 
          <div class="text-left modal-body-cropper">
            <div class="img-container-bak">
              <img id="image" src="/admin/images/medal/header.jpg" crossorigin="anonymous" class="img-responsive" alt="Picture"></div>
            <div class="docs-buttons">
              <div class="btn-group center-block select-img">
                <label class="btn btn-secondary btn-outline btn-upload" for="inputImage" title="Upload image file">
                  <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
                  <span class="docs-tooltip" data-toggle="tooltip">上传图片</span>
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer docs-buttons">
            <button type="button" class="btn waves-effect waves-light btn-default" data-dismiss="modal" style="display:none">取消</button>

 

            <button type="button" class="btn waves-effect waves-light btn-success" data-dismiss="modal" data-method="getCroppedCanvas">
              <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;getCroppedCanvas&quot;)"> 提交 </span></button>
          </div>
        </div>
   </div>
     
 </div>    

</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
	name: "cropper",
  props: ['cutPicDic','aspectRatio','cutPicInfo'],
	data() {
		return {
			search:"最新敏捷力课程",
			banners: [],
			nav:[ ],
	 
		}
	},
  methods: {
    cropper_init() {
 



     
 
        
        var _this = this;
        var console = window.console || {
          log: function() {}
        };
        var $image = $('#image');
        var $dataX = $('#dataX');
        var $dataY = $('#dataY');
        var $dataHeight = $('#dataHeight');
        var $dataWidth = $('#dataWidth');
        var options = {
          aspectRatio: this.cutPicInfo.aspectRatio,
          minContainerWidth:500,
          minContainerHeight:600,
          //minCropBoxWidth: minCropBoxWidth,
          //minCropBoxHeight: minCropBoxHeight,
          preview: '.img-preview',
          crop: function(e) {
            $dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
          }
        };
        // Tooltip
         //$('[data-toggle="tooltip"]').tooltip();
        // Cropper
        $image.on({
          'crop.cropper': function(e) {
            // console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
          },
        }).cropper(options);
        // Buttons
        if (!$.isFunction(document.createElement('canvas').getContext)) {
          $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
        }
        // Options
        $('.docs-toggles').on('change', 'input', function() {
          var $this = $(this);
          var name = $this.attr('name');
          var type = $this.prop('type');
          var cropBoxData;
          var canvasData;
          if (!$image.data('cropper')) {
            return;
          }
        });
        // Methods
        $('.docs-buttons').on('click', '[data-method]', function() {
          var $this = $(this);
          var data = $this.data();
          var $target;
          var result;
          if ($this.prop('disabled') || $this.hasClass('disabled')) {
            return;
          }
          if ($image.data('cropper') && data.method) {
            data = $.extend({}, data); // Clone a new one
            if (typeof data.target !== 'undefined') {
              $target = $(data.target);
              if (typeof data.option === 'undefined') {
                try {
                  data.option = JSON.parse($target.val());
                } catch (e) {
                  console.log(e.message);
                }
              }
            }
            result = $image.cropper(data.method, data.option, data.secondOption);
            switch (data.method) {
              case 'getCroppedCanvas':
                if (result) {
                  var res = {}
                  res.visible = false;
                  res.data = result.toDataURL('image/jpeg')
                  console.log(res)
                  _this.$emit('cutPicSuccess', res);

                  // _this.submit_avatar.pic_head_url = result.toDataURL('image/jpeg');
                  // console.log()
                  // jQuery.ajax({
                  //   url: 'https://platform.vpx.com.cn/api/v1/common/file/add',
                  //   type: 'POST',
                  //   dataType: 'json',
                  //   headers: {
                  //     token: _this.$store.state.admin.token
                  //   },
                  //   data: {
                  //     file_base64: result.toDataURL('image/jpeg'),
                  //   },
                  //   success: function (data) {
                  //     console.log('成功', data);
                  //     _this.return_img(data.data.file_url)
                  //   }
                  // });
                }
                break;
            }
            if ($.isPlainObject(result) && $target) {
              try {
                $target.val(JSON.stringify(result));
              } catch (e) {
                console.log(e.message);
              }
            }
          }
        });
        var $inputImage = $('#inputImage');
        var URL = window.URL || window.webkitURL;
        var blobURL;
        if (URL) {
          $inputImage.change(function() {
            var files = this.files;
            var file;

            if (!$image.data('cropper')) {
              return;
            }
            if (files && files.length) {
              file = files[0];

              if (/^image\/\w+$/.test(file.type)) {
                blobURL = URL.createObjectURL(file);
                $image.one('built.cropper', function() {
                  URL.revokeObjectURL(blobURL);
                }).cropper('reset').cropper('replace', blobURL);
                $inputImage.val('');
              } else {
                window.alert('请选择图片文件');
              }
            }
          });
        } else {
          $inputImage.prop('disabled', true).parent().addClass('disabled');
        }
      },
  },
  mounted() {
       this.cropper_init()  
       console.log(this.cutPicInfo.aspectRatio)
  },
	watch: {
    'cutPicInfo.aspectRatio'(val) {
      console.log(this.cutPicInfo.aspectRatio)
      this.cropper_init() 
    }
  },
  head () {
    return {
      title: "导师",
      meta: [{
        hid: 'description',
        name: 'description',
        content: "123"
      }],
      link: [
          {
            href: '/admin/css/cropper.min.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
        ],
        script: [
          {src: '/admin/js/cropper.min.js'},
        ]
    }
  }



}
</script>

 