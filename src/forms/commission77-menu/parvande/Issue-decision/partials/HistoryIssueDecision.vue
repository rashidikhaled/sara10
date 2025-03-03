<template>
  <fit>
    <div class="fit">
      <safa-grid
        title="لیست تصمیم"
        v-model="value.ClsDecision.Decision"
        helper="decisionHistoryColums"
        cdcName="grdDecisionList"
        height="70%"
        max-height="100%"
        min-height="150px"
        fit
        @row:click="grdDecisionListSelectionChanged"
        m="r"
      />
      <internal-section class="q-my-sm" title="توضیحات تصمیم">
        <div class="row">
          <safa-text
            cdcName="Description"
            v-model="txtHistory"
            style="min-width: 100px"
            :rows="1"
            type="textarea"
            :m="m"
            label-width="90px"
            class="col-12 col-sm-12 col-md-12 q-mt-sm"
          />
        </div>
      </internal-section>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "UHistoryDecision",
      title: "تاریخچه صدور تصمیم",
      txtHistory: ""
    }
  },

  methods: {
    grdDecisionListSelectionChanged (row) {
      // this.textModel.dec = row.data.Description
      this.$emit("grdDecisionListSelectionChanged", row.data)
    }
  }
}
</script>
