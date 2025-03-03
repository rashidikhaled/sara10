<template>
  <fit>
    <safa-datatable
      v-model="items"
      ref="grid"
      name="grid"
      helper="deeps"
      :hideHeader="true"
      :allowNewRow="false"
      :allowRemoveRow="false"
      :allowCopy="false"
      height="100%"
      maxHeight="100%"
      class="fit"
      margin="0"
      title='اطلاعات عمق'
      :bordered="false"
      fit
    />
  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
    return {
      items: []
    }
  }
}
</script>
