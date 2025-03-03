<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadResult" />
      </template>
      <fit>
        <safa-grid
          title="اسناد مزایده"
          v-model="Auction_Request"
          fit
          height="100%"
          max-height="100%"
          min-height="100%"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :suppressRowClickSelection="false"
          paginate
          helper="AuctionRequestColumn"
             :m="mode"
        />
      </fit>
      <template v-slot:footer>
          <FormActions
            v-show="!currentObj"
            :m="mode"
            @edit="isEditable = true"
            @cancel="isEditable = false"
            @save="saveObj"
          />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: "UAuctionRequest",
      title: "درخواست مزایده - سوابق",
      formKey: "DFA4409C-FA9A-4D33-9AAE-7B7CE87D0906",
      main: true,

      // #services
      loadResult: null,
      saveRes: null,

      // #variabels
      Auction_Request: []
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.ES.getAuctionRequest({
        PNIdProc: this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000"

      })
        .then(({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.Auction_Request =
              this.loadResult.data.GetAuction_RequestResult.Auction_Request
            this.log({
              action: this.logActions.view,
              bizCode: this.NIdProc,
              bizCodeTitle: "NIdProc"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async saveObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.saveAuctionRequest({
          PObj: {
            Auction_Request: this.Auction_Request,
            IsRequestContractBuy: false,
            _NIdRequest: this.currentObj?.NidRequest || "00000000-0000-0000-0000-000000000000"

          }
        })
        this.saveRes = this.getResponse(data)
        if (this.saveRes.success) {
          // eslint-disable-next-line no-unused-expressions
          this.modeAuction_Requestl = this.saveRes.data.SaveAuction_RequestResult
          this.showSuccess("ذخیره اطلاعات باموفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selelectedItemTree?.NidRequest,
            bizCodeTitle: "NidRequest",
            saveDesc: `ذخیره اطلاعات فرم درخواست مزایده - سوابق با موفقیت NidRequest ${
              this.selelectedItemTree?.NidRequest ?? ""
            } انجام شد`
          })
          await this.loadObj()
          this.isEditable = false
          this.$emit('afterSave')
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
