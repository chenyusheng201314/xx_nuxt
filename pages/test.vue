<template>
  <div class="container">

    <headBase/>
   
     <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
          {{banner}}
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
     </div>
      
<input v-model="message" placeholder=" ">
<p>Message is: {{ message }}</p>

    <div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>

<br />
<br />

<select v-model="selected">
  <option v-for="(option,index) in options" v-bind:value="option.value" :key="index">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
<br /><br />
</div>
<br /><br />
 <nuxt-link :to="{name: 'user-id',params:{ id:1 }}">关于</nuxt-link>
  </div>
</template>
<script src="~/assets/index.js"></script>




