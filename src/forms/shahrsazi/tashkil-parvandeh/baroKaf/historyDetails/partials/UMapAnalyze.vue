<template>
  <section id="partial-form">
    <div class="row q-col-gutter-lg">
      <div>
        <q-btn label="نمایش ملک" color="primary" />
      </div>
      <safa-datatable
        v-model="items"
        cdcName="items"
        ref="grid"
        name="grid"
        helper="analyze"
        :hideHeader="true"
        :allowNewRow="false"
        :allowRemoveRow="false"
        :allowCopy="false"
        title="اطلاعات برو کف"
      ></safa-datatable>

      <safa-checkbox label="نمایش اضلاع" v-model="isShow" cdcName="isShow" />

      <UAnalyzeTabs />
    </div>
  </section>
</template>

<script>
import UAnalyzeTabs from "./ULastStatusMapAnalyze/UAnalyzeTabs"

export default {
  name: "baro-kaf-info",
  title: "اطلاعات برو کف",
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
