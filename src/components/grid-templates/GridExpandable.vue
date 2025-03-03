<template>
<div class="rtl text-right">
    <ul>
        <li style="border-bottom: 1px solid #ccc;line-height: 34px;" v-for="(item,index) in dataItem.details" :key="index">{{item.title}}</li>
    </ul>
</div>
</template>
<script>
export default {
  props: {
    dataItem: Object
  },
  mounted () {
    // console.log('component &********', this)
  }
}
</script>
