<template>
  <fit style="min-height:500px">
    <safa-splitter
      v-model="gridSplitter1"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="مالکین"
            v-model="results.Base_Owner"
            cdcName="Base_Owner"
            ref="grid"
            name="grid"
            helper="owners"
            hide-toolbar
            class="q-pb-sm"
            fit
            margin="0"
            height="100%"
            min-height="100px"
            max-height="100%"
          ></safa-datatable>
        </fit>
      </template>

      <safa-splitter
        v-model="gridSplitter2"
        vertical
        margin="0"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              title="سایر امکانات"
              v-model="results.Base_OtherEquipment"
              cdcName="Base_OtherEquipment"
              ref="other-grid"
              name="grid"
              helper="shahrsazi.other"
              :m="m"
              :loadingAnimation="false"
              class="q-pb-sm q-pt-sm"
              fit
              margin="0"
              height="100%"
              min-height="100px"
            ></safa-datatable>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              v-model="results.Base_Bezel"
              cdcName="Base_Bezel"
              title="پخ ها"
              ref="pakh-grid"
              name="grid"
              helper="shahrsazi.pakhha"
              :m="m"
              @checkBoxSelectedChanged="checkBoxChanged"
              class="q-pt-sm"
              fit
              margin="0"
              height="100%"
              min-height="100px"
            ></safa-datatable>
          </fit>
        </template>
      </safa-splitter>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
    return {
      gridSplitter1: 50,
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
      this.results.Base_Bezel.map((obj) => {
        if (obj.NidBezel === e.dataItem.NidBezel) {
          obj.IsObserve = e.value
        }
        return obj
      })
    }
  },
  mounted () {}
}
</script>
