<template>
  <safa-form
    :id="formKey"
    caption="ابلاغیه کمیسیون"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper title="ثبت تحویل">
      <template #header>
        <!-- <safa-status :result="result" /> -->
        <safa-status :result="saveDeliveryRes" />
      </template>
      <fit>
        <safa-grid
          height="100%"
          max-height="100%"
          helper="DeliveryRequestList"
          m="r"
          title="لیست درخواست های انتخاب شده"
          :allowMultipleSelection="false"
          cdcName="RequestList"
          v-model="requestList"
        >
        </safa-grid>
        <form-row class="q-mt-sm">
          <form-control>
            <safa-datepicker
              label="تاریخ تحویل پیش آگاهی"
              label-width="120px"
              :m="mode"
              v-model="model.ClsDelivery.DataDeliveryNotice"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ تحویل ابلاغیه"
              label-width="120px"
              :m="mode"
              v-model="model.ClsDelivery.DateDeliveryProclamation"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ ابلاغ رای"
              label-width="120px"
              :m="mode"
              v-model="model.ClsDelivery.DateDeliveryVote"
            />
          </form-control>
        </form-row>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"
// import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin, commission77Mixin],
  data () {
    return {
      title: "ثبت تحویل",
      formKey: "2AF10414-CD37-48F5-8E09-E55021697D6D",
      name: "UDelivery",
      main: true,
      model: {
        ClsDelivery: {
          DataDeliveryNotice: "",
          DateDeliveryProclamation: "",
          DateDeliveryVote: ""
        }
      },
      saveDeliveryRes: null,
      requestList: [],
      nidRequest: "00000000-0000-0000-0000-000000000000"
    }
  },
  mounted () {
    if (this.isSelectedCommission77()) {
      this.nidRequest = this.selectedCommission77.NidRequest
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      const obj = this.selectedCommission77
      let tmp = {}
      tmp.CI_RequestType = obj.CI_RequestType
      tmp.NidWorkItem = obj.NidWorkItem
      tmp.Distrcit = obj.Distrcit
      tmp.NosaziCode = obj.NosaziCode
      tmp.FromDate = obj.FromDate
      tmp.ToDate = obj.ToDate
      tmp.CI_Commission = obj.CI_Commission
      tmp.CreateDate = obj.CreateDate
      tmp.HoldingDate = obj.HoldingDate
      tmp.SecretariatNo = obj.SecretariatNo
      tmp.OwnerName = obj.OwnerName
      tmp.NidRequest = this.nidRequest
      this.requestList.push(tmp)
    },
    async saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payload = {
        pRequest: {
          ClsDelivery: {
            DataDeliveryNotice: this.model.ClsDelivery.DataDeliveryNotice,
            DateDeliveryProclamation:
              this.model.ClsDelivery.DateDeliveryProclamation,
            DateDeliveryVote: this.model.ClsDelivery.DateDeliveryVote,
            NidRequest: [this.nidRequest]
          }
        }
      }
      await this.$services.commission77
        .saveDelivery(payload)
        .then(async ({ data }) => {
          this.saveDeliveryRes = this.getResponse(data)
          if (this.saveDeliveryRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidRequest,
              bizCodeTitle: "NidRequest",
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
