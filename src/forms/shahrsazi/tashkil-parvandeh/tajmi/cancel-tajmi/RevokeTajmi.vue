<template>
  <fit>
    <safa-status :result="getTajmiHistoryListRes" />
    <safa-status :result="cancelTajmiRes" />
    <div class="q-pa-sm">
      <nosazi-code-input
        label="کد مقصد"
        label-width="60px"
        v-model="baseNosaziCode"
        actions
        @enter="loadObj"
      />
    </div>
    <safa-grid
      v-model="tajmiHistoryList"
      helper="tajmi"
      title="کد مبدا"
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
    <div class="q-pa-sm">
      <btn-default label="انصراف از تجمیع" @click="revoke" />
    </div>
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
      cancelTajmiRes: null,
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
          { NosaziCodeTo: strNosaziCode },
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
    },
    revoke () {
      if (this.baseNosaziCode.District === 0) return this.showError("لطفا کدنوسازی وارد نمایید.")
      this.showConfirm("آیا از انصراف ار تجمیع اطمینان دارید؟").onOk(() => {
        const payload = {
          pNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 0,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pNidUser: this.currentUser.NidUser,
          pUserName: this.getUserDisplayName()
        }
        this.showLoading()
        this.$services.SC.CancelTajmi(payload)
          .then(async ({ data }) => {
            this.cancelTajmiRes = this.getResponse(data)
            if (this.cancelTajmiRes.success) {
              // this.cancelResults = this.cancelTajmiRes.data
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.cancel,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode
              })
              this.$$emit("hide")
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
