<template>
  <fit>
      <safa-datatable
        v-model="items"
      cdcName="items"
        ref="grid"
        name="grid"
        helper="deeps"
        :hideToolbar="true"
        :allowNewRow="false"
        :allowRemoveRow="false"
        :allowCopy="false"
        height="100%"
        maxHeight="100%"
        minHeight="200px"
        class="fit"
        margin="0"
         title='اطلاعات عمق'
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
