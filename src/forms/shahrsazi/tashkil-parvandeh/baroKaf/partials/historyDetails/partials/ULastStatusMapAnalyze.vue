<template>
  <fit style="min-height:500px">
    <safa-splitter horizontal v-model="splitterModel">
      <template v-slot:before>
        <fit>
        <safa-datatable
          :data-items="items"
          cdcName="items"
          ref="grid"
          name="grid"
          helper="analyze"
          :hideHeader="true"
          :allowNewRow="false"
          :allowRemoveRow="false"
          :allowCopy="false"
          title= 'اطلاعات برو کف'
          min-height="100px"
        />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-checkbox
            label="نمایش اضلاع"
            v-model="isShow"
          cdcName="isShow"
            class="q-py-sm"
          />
          <UAnalyzeTabs />
        </fit>
      </template>
    </safa-splitter>
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
      isShow: false,
      splitterModel: 50
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
