<template>
  <safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-tabs v-model="activeTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu
              name="barokafInfo"
              label="اطلاعات بروکف"
              @click.once="getBarokaf"
            />
            <tab-menu
              name="tavafoghnameh"
              label="توافقنامه"
              @click.once="getAgreement"
            />
            <tab-menu name="solhnameh" label="صلحنامه" @click.once="getPeace" />
          </template>
          <tab-content name="barokafInfo">
            <BarokafInfo :model="barokafResult" />
          </tab-content>
          <tab-content name="tavafoghnameh">
            <Tavafoghnameh :model="agreementResult" />
          </tab-content>
          <tab-content name="solhnameh">
            <Solhnameh :model="peaceResult" />
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import BarokafInfo from "./partials/BarokafInfo.vue"
import Tavafoghnameh from "./partials/Tavafoghnameh.vue"
import Solhnameh from "./partials/Solhnameh.vue"

export default {
  components: { BarokafInfo, Tavafoghnameh, Solhnameh },
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "اطلاعات شهرسازی",
      name: "UUrbanPlanningInfo",
      formKey: "a04ebd0e-5913-40cc-bf9f-5d741a08491e",
      main: true,

      activeTab: "barokafInfo",
      isView: false,
      barokafResult: {
        Base_Edge: [],
        Base_CommonEstate: ""
      },
      agreementResult: {
        Sh_Agreement: {
          CI_UsingConfirmRefrence: 0,
          Comments: ""
        }
      },
      peaceResult: {
        Sh_Peace: {
          CI_UsingConfirmRefrence: 0,
          Comments: ""
        }
      },
      hasBarokafResult: false,
      hasAgreementResult: false,
      hasPeaceResult: false
    }
  },

  mounted () {
    if (this.selectedNidCommission !== null) {
      this.getBarokaf()
    }
  },

  methods: {
    getBarokaf () {
      if (this.selectedNidCommission === null) return
      if (this.hasBarokafResult) return
      this.showLoading()
      const payload = {
        pCodeString: this.selectedCommission.BizCode,
        pNIdProc: this.selectedCommission.NidProc
      }
      this.$services.commissionsSrv
        .getBarokaf(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          const requestResult =
            res.data.GetBarokafResult && res.data.GetBarokafResult.Barokaf
          if (res.success) {
            if (requestResult) {
              this.hasBarokafResult = true
              this.barokafResult = requestResult

              if (!this.isView) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.selectedNidCommission,
                  bizCodeTitle: "NidCommission",
                  nosaziCode: this.selectedCommission.BizCode,
                  saveDesc: `بارگذاری اطلاعات بروکف فرم ${this.title} انجام گردید.`
                })
              }
              this.isView = true
            }
          } else {
            const err = requestResult.ErrorResult.BizErrors
            for (let i = 0; i < err.length; i++) {
              this.showError(err[i].ErrorTitel)
            }
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getAgreement () {
      if (this.selectedNidCommission === null) return
      if (this.hasAgreementResult) return
      this.showLoading()
      const payload = {
        pCodeString: this.selectedCommission.BizCode,
        pNIdProc: this.selectedCommission.NidProc
      }
      this.$services.commissionsSrv
        .getAgreement(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          const requestResult =
            res.data.GetAgreementResult && res.data.GetAgreementResult.Accept
          if (res.success) {
            if (requestResult) {
              this.hasAgreementResult = true
              this.agreementResult = requestResult
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                nosaziCode: this.selectedCommission.BizCode,
                saveDesc: `بارگذاری اطلاعات توافقنامه فرم ${this.title} انجام گردید.`
              })
            }
          } else {
            const err = requestResult.ErrorResult.BizErrors
            for (let i = 0; i < err.length; i++) {
              this.showError(err[i].ErrorTitel)
            }
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getPeace () {
      if (this.selectedNidCommission === null) return
      if (this.hasPeaceResult) return
      this.showLoading()
      const payload = {
        pCodeString: this.selectedCommission.BizCode,
        pNIdProc: this.selectedCommission.NidProc
      }
      this.$services.commissionsSrv
        .getPeace(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          const requestResult =
            res.data.GetPeaceResult && res.data.GetPeaceResult.Peace
          if (res.success) {
            if (requestResult) {
              this.hasPeaceResult = true
              this.peaceResult = requestResult
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                nosaziCode: this.selectedCommission.BizCode,
                saveDesc: `بارگذاری اطلاعات صلحنامه فرم ${this.title} انجام گردید.`
              })
            }
          } else {
            const err = requestResult.ErrorResult.BizErrors
            for (let i = 0; i < err.length; i++) {
              this.showError(err[i].ErrorTitel)
            }
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
