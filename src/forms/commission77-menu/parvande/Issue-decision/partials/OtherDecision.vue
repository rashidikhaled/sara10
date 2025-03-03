<template>
  <fit>
    <div>
      <safa-grid
        title=" لیست سایر"
        m="r"
        v-model="model.ClsDecision.OtherDecisions"
        helper="OtherDecisionsList"
        height="100%"
        max-height="100%"
        min-height="300px"
        fit
        @row:click="grdOtherDecisionSelectionChanged"
      />
      </div>
      <internal-section class="q-my-sm" title="مشخصات سایر">
        <FormRow :sm="1" :md="4" :lg="4" :xl="4" class="q-mt-sm" :title="title">
          <FormControl>
            <safa-text
              label="رأس ساعت"
              cdcName="exactHour"
              :m="m"
              v-model="model.otherdecision.exactHour"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="پرونده"
              cdcName="file"
              :m="m"
              v-model="model.otherdecision.file"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="از سوی "
              cdcName="from"
              :m="m"
              v-model="model.otherdecision.from"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="خواسته"
              cdcName="applyingFor"
              :m="m"
              v-model="model.otherdecision.applyingFor"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="مشارالیه نسبت به "
              cdcName="messageTo"
              :m="m"
              v-model="model.otherdecision.messageTo"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="مبلغ مورد مطالبه "
              cdcName="amountDemanded"
              :m="m"
              v-model="model.otherdecision.amountDemanded"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="علیه "
              cdcName="against"
              :m="m"
              v-model="model.otherdecision.against"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="سایر "
              cdcName="other"
              :m="m"
              v-model="model.otherdecision.other"
              label-width="90px"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mt-sm">
          <safa-text
            class="col-12"
            label="توضیحات "
            cdcName="tozihatOther"
            :m="m"
            v-model="model.otherdecision.tozihatOther"
            :rows="1"
            type="textarea"
            label-width="90px"
          />
        </FormRow>
      </internal-section>
    <!-- </div> -->
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  props: {
    model: Object,
    m: String
  },
  data () {
    return {
      name: "Other",
      title: " سایر "
    }
  },
  methods: {
    grdOtherDecisionSelectionChanged (row) {
      this.$emit("grdOtherDecisionSelectionChanged", row.data)
    }
  }
}
</script>
