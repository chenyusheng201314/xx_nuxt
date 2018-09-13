<template>
  <div>
    <div class="inline-block upload" :style="my_style">
      <a href="javascript:;" class=" up" data-toggle="modal" data-target="#cropper">
        <input type="file" class="cus" name="img" id="file" :style="son_style"/>
      </a>
    </div>

    <!-- Modal 图片裁剪  -->
    <div class="modal fade bs-example-modal-lg" id="cropper" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">图片裁剪</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="iconfont cus">&#xe6e9;</i></span>
            </button>
          </div>
          <div class="text-left modal-body-cropper">
            <div class="img-container">
              <img id="image" src="/admin/images/medal/header.jpg" crossorigin="anonymous" class="img-responsive"
                   alt="Picture"></div>
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
            <button type="button" class="btn waves-effect waves-light btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn waves-effect waves-light btn-success" data-dismiss="modal"
                    data-method="getCroppedCanvas">
              <span class="docs-tooltip" data-toggle="tooltip"
                    title="$().cropper(&quot;getCroppedCanvas&quot;)"> 提交 </span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "crop",
    layout: 'admin',
    props: ['submit_avatar', 'my_style', 'son_style'],
    data() {
      return {}
    },
    methods: {
      get_img_url(url) {
        this.$emit('return_img', url)
      },
      cropper_init: function () {

        var _this = this

        var console = window.console || {
          log: function () {
          }
        };
        let $image = $('#image');
        let $dataX = $('#dataX');
        let $dataY = $('#dataY');
        let $dataHeight = $('#dataHeight');
        let $dataWidth = $('#dataWidth');
        let options = {
          aspectRatio: 1500 / 852,
          preview: '.img-preview',
          crop: function (e) {
            $dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
          }
        };
        // Tooltip
        $('[data-toggle="tooltip"]').tooltip();
        // Cropper
        $image.on({
          'crop.cropper': function (e) {
            // console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
          },
        }).cropper(options);
        // Buttons
        if (!$.isFunction(document.createElement('canvas').getContext)) {
          $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
        }
        // Options
        $('.docs-toggles').on('change', 'input', function () {
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
        $('.docs-buttons').on('click', '[data-method]', function () {
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
                  _this.submit_avatar.pic_head_url = result.toDataURL('image/jpeg');
                  axios({
                    method: 'post',
                    url: 'https://platform.vpx.com.cn/api/v1/common/file/add',
                    headers: {
                      token: _this.$store.state.admin.token
                    }, data: {
                      file_base64: result.toDataURL('image/jpeg'),
                    },
                  }).then((res) => {
                    _this.get_img_url(res.data.file_url);
                  }).catch((res) => {

                  });
                  // $.ajax({
                  //   type: 'POST',
                  //   url: 'https://platform.vpx.com.cn/api/v1/common/file/add',
                  //   headers: {
                  //     token: _this.$store.state.admin.token
                  //   },
                  //   data: {
                  //     file_base64: result.toDataURL('image/jpeg'),
                  //   },
                  //   success: function (res) {
                  //     _this.get_img_url(res.data.file_url);
                  //   },
                  //   async: false,
                  //   // dataType: dataType
                  // });
                }

                // _this.submit_avatar.pic_head_url =
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
        // Import image
        var $inputImage = $('#inputImage');
        var URL = window.URL || window.webkitURL;
        var blobURL;
        if (URL) {
          $inputImage.change(function () {
            var files = this.files;
            var file;

            if (!$image.data('cropper')) {
              return;
            }
            if (files && files.length) {
              file = files[0];

              if (/^image\/\w+$/.test(file.type)) {
                blobURL = URL.createObjectURL(file);
                $image.one('built.cropper', function () {
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
      }
    },
    mounted() {
      this.cropper_init()
    },
    head() {
      return {
        script: [
          {src: '/admin/js/bootstrap.min.js'},
          {src: '/admin/js/cropper.min.js'},
        ],
        link: [
          {
            href: '/admin/css/common.css',
            type: 'text/css',
            rel: 'stylesheet',
          },
          {
            href: '/admin/css/cropper.min.css',
            type: 'text/css',
            rel: 'stylesheet',
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .modal.fade.bs-example-modal-lg {
    background: rgba(0, 0, 0, 0.4);
  }

  .modal-dialog {
    width: 946px;
    max-width: 946px;
  }

  .modal-header {
    padding: 0 20px;
  }

  .modal-footer {
    justify-content: space-between;
    padding: 7px 16px;
  }

  .modal-footer > button {
    margin: 0 !important;
  }

  .modal-body {
    padding: 20px 40px;
    display: flex;
  }

  .modal-body-cropper {
    padding: 40px 40px 20px;
  }

  .img-container {
    max-height: 1000px;
  }

  @media (min-width: 768px) {
    .img-container {
      width: 864px;
      height: 626px;
    }
  }

  .select-img {
    margin-top: 36px;
    margin-bottom: 0 !important;
  }

  .modal-content {
    margin-bottom: 100px;
    margin-top: -100px;
  }
</style>
