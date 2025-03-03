<template>
  <td
    :class="className"
    class="text-center"
  >
    <div class="row q-col-gutter-sm">
      <safa-checkbox
        name="notification_important"
        label="بدون تغییر"
        v-model="datas.data1"
        size="sm"
        class="col-auto"
      />
      <safa-text
        v-model="text"
        v-if="datas.data1==false"
        class="col"
      />
    </div>
  </td>
</template>

<script>
export default {
  name: 'CheckboxTextbox',
  data () {
    return {
      datas: {
        data1: false
      }
    }
  },
  props: {
    column: Object,
    className: String
  }
}
</script>

<style scoped>
</style>
