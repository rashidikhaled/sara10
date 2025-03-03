<template>
  <fit>
    <div class="q-pa-sm">
      <btn-default label="نمایش ملک" />
    </div>
    <safa-datatable
      :data-items="items"
      ref="grid"
      name="grid"
      helper="analyze"
      :hideHeader="true"
      :allowNewRow="false"
      :allowRemoveRow="false"
      :allowCopy="false"
      class="q-px-sm"
      title='اطلاعات برو کف'
      fit
    />
    <safa-checkbox
      label="نمایش اضلاع"
      v-model="isShow"
      class="q-pa-sm"
    />

    <UAnalyzeTabs />
  </fit>
</template>

<script>
import UAnalyzeTabs from './ULastStatusMapAnalyze/UAnalyzeTabs'

export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
    return {
      items: [],
      isShow: false
    }
  },
  props: {
    results: Object
  },
  mounted () {},
  components: {
    UAnalyzeTabs
  }
}
</script>
