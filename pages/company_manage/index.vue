<template>
  <div class="admin_body_right">
    <nuxt-child/>
  </div>
</template>

<script>

  export default {
    layout: 'companyManage',
    name: 'companyManage',
    data() {
      return {
        title: '广告',
      }
    },
    methods: {},
    mounted() {
      console.log(this.$store.state.company.token);
    },
    head() {
      return {
        title: "企业信息",
        meta: [{
          hid: 'description',
          name: 'description',
          content: "123",
        }],
        script: [{
          //src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
        }, {
          //src: '/js/index.js'
        }, {
          //src: 'http://rubaxa.github.io/Sortable/Sortable.js'
        }
        ]
      }

    }
  }
</script>

