<template>
  <fit>

    <safa-splitter
      v-model="splitterModel"
      vertical
    >
      <template v-slot:before>
        <safa-datatable
          title="مالکین"
          v-model="results.Base_Owner"
          ref="grid"
          name="grid"
          helper="owners"
          hide-toolbar
          fit
          margin="0"
          height="100%"
          min-height="50px"
          :m="m"
        ></safa-datatable>
      </template>
      <template v-slot:after>
        <safa-datatable
          title="سایر امکانات"
          v-model="results.Base_OtherEquipment"
          ref="other-grid"
          name="grid"
          helper="shahrsazi.other"
          :m="m"
          :loadingAnimation="false"
          fit
          height="100%"
        ></safa-datatable>
      </template>
    </safa-splitter>

  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'مالکین و سایر امکانات و پخ ها',
  data () {
    return {
      gridSplitter: 50,
      gridSplitter2: 50,
      ownerItems: [],
      others: [],
      pakhha: [],
      splitterModel: 50
    }
  },
  props: {
    results: Object,
    m: String
  },
  methods: {
    checkBoxChanged (e) {
      this.results.Base_Bezel.map(obj => {
        if (obj.NidBezel === e.dataItem.NidBezel) {
          obj.IsObserve = e.results
        }
        return obj
      })
    }
  }
}
</script>
