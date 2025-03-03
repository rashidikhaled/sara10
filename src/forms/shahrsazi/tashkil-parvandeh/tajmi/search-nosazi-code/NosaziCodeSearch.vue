<template>
  <fit>
    <safa-status :result="getTajmiHistoryListRes" />
    <div class="q-pa-sm">
      <nosazi-code-input
        label="کد مبدا"
        label-width="60px"
        v-model="baseNosaziCode"
        actions
        @enter="loadObj"
      />
    </div>
    <safa-grid
      v-model="tajmiHistoryList"
      helper="tajmi"
      title="کد مقصد"
      fit
      m="r"
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],
  props: {
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getTajmiHistoryListRes: null,
      tajmiHistoryList: []
    }
  },
  methods: {
    async loadObj () {
      try {
        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
        this.showLoading()
        const { data } = await this.$services.SC.getTajmiHistoryList(
          { NosaziCodeFrom: strNosaziCode },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getTajmiHistoryListRes = this.getResponse(data)
        if (this.getTajmiHistoryListRes.success) {
          this.tajmiHistoryList =
            (this.getTajmiHistoryListRes.data &&
              this.getTajmiHistoryListRes.data.TajmiHistoryList) ||
            []
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
