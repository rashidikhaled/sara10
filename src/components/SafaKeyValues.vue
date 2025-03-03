<template>
  <div class="safa-key-values">
    <div class="sf-kv-list">
      <div class="sf--keys" v-for="(item,index) in list" :key="index">
        <div class="sf--key-item">
          {{item.key}}
        </div>
      </div>
      <div class="sf--values" v-for="(item,index) in list" :key="index">
        <div class="sf--value-item">
          {{item.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafaKeyValues',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">

</style>
