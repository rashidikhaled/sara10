<template>
  <fit>
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
      style="min-height:250px"
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
            fit
            margin="0"
            height="100%"
            min-height="50px"
            :bordered="false"
          ></safa-datatable>
          <q-separator />
        </fit>
      </template>

      <safa-splitter
        v-model="gridSplitter2"
        class="fit"
        horizontal
        margin="0"
        style="min-height:250px"
      >
        <template v-slot:before>
          <fit>
            <q-separator />
            <safa-datatable
              title="سایر امکانات"
              v-model="results.Base_OtherEquipment"
              cdcName="Base_OtherEquipment"
              ref="other-grid"
              name="grid"
              helper="other"
              :m="m"
              :loadingAnimation="false"
              fit
              margin="0"
              height="100%"
              min-height="50px"
              :bordered="false"
            ></safa-datatable>
            <q-separator />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <q-separator />
            <safa-datatable
              v-model="results.Base_Bezel"
              cdcName="Base_Bezel"
              title="پخ ها"
              ref="pakh-grid"
              name="grid"
              helper="pakhha"
              :m="m"
              @checkBoxSelectedChanged="checkBoxChanged"
              fit
              margin="0"
              height="100%"
              min-height="50px"
              :bordered="false"
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
  title: 'مالکین و سایر امکانات و پخ ها',
  data () {
    return {
      gridSplitter: 50,
      gridSplitter2: 50,
      ownerItems: [],
      others: [],
      pakhha: []
    }
  },
  props: {
    results: Object,
    m: {
      type: String,
      default: 'e'
    }
  },
  methods: {
    checkBoxChanged (e) {
      this.results.Base_Bezel.map(obj => {
        if (obj.NidBezel === e.dataItem.NidBezel) {
          obj.IsObserve = e.value
        }
        return obj
      })
    }
  }
}
</script>
