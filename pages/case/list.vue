<template>
  <div class="case">
    <topBg src="/images/static/column05cases.jpg"></topBg>
    <localRoute :route="route_data"></localRoute>
    <ul class="case-list">
      <li>
        <ul class="img-all">
          <li v-for="(item,index) in case_list.data" :key="index">
            <nuxt-link :to="'/case/'+item.id">
            <!--<nuxt-link to="">-->
              <!--<img :src="item.organization_small_logo" alt="">-->
              <div class="d-inline-block case-li-img" :style="'background-image: url('+item.organization_small_logo+')'"></div>
              <p>{{item.title}}</p>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
    <paging :page_total="case_list.page_total" url="/case/list?p=" :current="p"></paging>
  </div>
</template>

<script>
  import paging from '@/components/aPaging'
  import topBg from '@/components/topBg'
  import localRoute from '@/components/localRoute'

  export default {
    name: 'case',
    head () {
      return {
        title:'金融行业培训案例_房地产行业培训案例_物业行业培训案例_服装行业培训案例-享学就学',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: '金融行业培训案例,房地产行业培训案例,物业行业培训案例,服装行业培训案例,物流行业培训案例'
          },{
            hid: 'description',
            name: 'description',
            content: '企业案例栏目给广大用户介绍了不同机构的各个行业的培训案例,通过这些案例大家可以了解到机构的培训能力以及导师的交付情况.'
          }
        ],
        link: [
          {
            href: '/css/case.css',
            type:'text/css',
            rel: 'stylesheet',
          }
        ]
      }
    },
    components: {
      paging,
      topBg,
      localRoute
    },
    data() {
      return {
        num: 3,
        route_data: [{name: '享学科技网', path: '/'}, {name: '企业案例', path: ''}],
      }
    },
    async asyncData({store,query}) {
      let p = query.p?Number(query.p):1
      let res = await store.dispatch('httpGet', {
        url: '/home/organization_cases/list',
        data: {
          teacher_id: '',
          psize: 20,
          page: p,
        }
      });
      console.log('案例', res.data.data);
      return {
        p,
        case_list: res.code===0?res.data:{page_total:1},
      }
    },
    methods: {
    }
  }
</script>

