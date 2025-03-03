<template>
  <fit>
    <safa-splitter
      v-model="gridSplitter"
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
      min-height="200px"
    ></safa-datatable>
        </fit>
      </template>

      <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
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
              min-height="200px"
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
              min-height="200px"
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
      gridSplitter: 50,
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
  // mounted () {
  //   this.ownerItems = this.results.Base_Owner

  //   this.others = this.results.Base_OtherEquipment

  //   this.pakhha = this.results.Base_Bezel

  //   if (this.m === 'e') {
  //     this.$refs['other-grid'].addRow(this.results.Base_OtherEquipment)

  //     this.$refs['pakh-grid'].addRow(this.results.Base_Bezel)

  //     this.results.Base_Bezel = this.$refs['pakh-grid'].gridItems
  //   } else if (this.m === 'r') {
  //     if (
  //       this.$refs['other-grid'].gridItems[0].isNew &&
  //       !this.$refs['other-grid'].gridItems[0].inEdit
  //     ) {
  //       this.$refs['other-grid'].gridItems.shift()

  //       this.results.Base_OtherEquipment = this.$refs['other-grid'].gridItems
  //     }

  //     if (
  //       this.$refs['pakh-grid'].gridItems[0].isNew &&
  //       !this.$refs['pakh-grid'].gridItems[0].inEdit
  //     ) {
  //       this.$refs['pakh-grid'].gridItems.shift()

  //       this.results.Base_Bezel = this.$refs['pakh-grid'].gridItems
  //     }
  //   }
  // },
  // watch: {
  //   m () {
  //     if (this.m === 'e') {
  //       this.$refs['other-grid'].addRow(this.results.Base_OtherEquipment)

  //       this.$refs['pakh-grid'].addRow(this.results.Base_Bezel)

  //       this.results.Base_Bezel = this.$refs['pakh-grid'].gridItems
  //     } else if (this.m === 'r') {
  //       if (
  //         this.$refs['other-grid'].gridItems[0].isNew &&
  //         !this.$refs['other-grid'].gridItems[0].inEdit
  //       ) {
  //         this.$refs['other-grid'].gridItems.shift()

  //         this.results.Base_OtherEquipment = this.$refs['other-grid'].gridItems
  //       }

  //       if (
  //         this.$refs['pakh-grid'].gridItems[0].isNew &&
  //         !this.$refs['pakh-grid'].gridItems[0].inEdit
  //       ) {
  //         this.$refs['pakh-grid'].gridItems.shift()

  //         this.results.Base_Bezel = this.$refs['pakh-grid'].gridItems
  //       }
  //     }
  //   }
  // },
  // methods: {
  //   otherRowUpdated (e) {
  //     this.results.data.Base_OtherEquipment = e.gridItems
  //   },
  //   pakhRowUpdated (e) {
  //     this.results.data.Base_Bezel = e.gridItems
  //   },
  //   comboChanged (combo) {
  //     combo.dataItem.CI_OtherEquipmentGroup = combo.value

  //     combo.dataItem.CI_OtherEquipmentType = combo.value
  //   },
  //   checkBoxSelectedChanged (e) {
  //     this.results.data.Base_Bezel.map(obj => {
  //       if (obj.NidBezel === e.dataItem.NidBezel) {
  //         obj.IsObserve = e.value
  //       }
  //       return obj
  //     })
  //   }
  // }
}
</script>
