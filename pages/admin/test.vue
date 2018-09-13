<template>
 
   <div class="app_index_setting">

   <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
      </SortableList>
      <ul class="list">
        <li class="list-item" v-for="(item, index) in items" :index="index" :key="index" :item="item">{{item}}</li>
      </ul>
    </div>

   </div>


 
</template>
<script>
import Vue from 'vue';
import { ContainerMixin, ElementMixin } from 'vue-slicksort';
const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}}</li>
  `
};
export default {
  name: 'ExampleVue',
  layout: 'admin',
  components: {
    SortableItem,
    SortableList
  },
  data () {
  return {
     items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8'
      ]
  }
  },
  methods: {
 
   
  

 
  },
  computed:{
     
  },
  mounted () {
    
      
  }
}
</script>
