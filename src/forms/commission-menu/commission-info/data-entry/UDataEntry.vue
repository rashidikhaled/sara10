<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="getEntryRes" />
      <safa-status :result="saveObjRes" />
    </template>
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="commissionInfo" label="اطلاعات کمیسیون" />
          <tab-menu name="infractions" label="تخلفات" />
          <tab-menu name="complainantInfo" label="اطلاعات شاکی" />
        </template>

        <tab-content name="commissionInfo">
          <CommissionInfo
            v-model="model.dataEntry.Commission_Info"
            @changedNosaziCode="changedNosaziCode"
            @nosaziCode="baseNosaziCodeHandler"
            :m="mode"
          />
        </tab-content>
        <tab-content name="infractions" :padding="false">
          <Infractions
            v-model="model.dataEntry.CommissionTrepasses"
            :m="mode"
          />
        </tab-content>
        <tab-content name="complainantInfo" :padding="false">
          <ComplainantInfo
            v-model="model.dataEntry.Commission_Complainant"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>
    </fit>

    <template #footer>
      <form-actions
        showNewButton
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @newInfo="clearData"
        @cancel="isEditable = false"
      />
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import CommissionInfo from "./partials/CommissionInfo.vue"
import Infractions from "./partials/Infractions.vue"
import ComplainantInfo from "./partials/ComplainantInfo.vue"

const defaultModel = {
  Commission_Info: {
    Address: "",
    Apartment: 0,
    Block: 0,
    Building: 0,
    CI_Commission: "0",
    CI_CommissionType: "0",
    CI_Region: "0",
    Comments: "",
    CurrentArea: "",
    DateLicence: "",
    Density: "",
    District: 0,
    DocArea: "",
    House: 0,
    NidCommission: "00000000-0000-0000-0000-000000000000",
    NoLicence: "",
    OwnerName: "",
    PostCode: "",
    PreCode: "",
    Region: 0,
    Regplaque: "",
    Remark: "",
    Shop: 0,
    CodeString: "",
    UrbanNidKartablItem: ""
  },
  CommissionTrepasses: [],
  Commission_Complainant: [],
  NidCommission: "00000000-0000-0000-0000-000000000000"
}

export default {
  components: { CommissionInfo, Infractions, ComplainantInfo },
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "ورود اطلاعات",
      name: "UDataEntry",
      formKey: "0d968b6e-f77e-4074-8a68-f6f7658a3542",
      main: true,

      isView: false,
      loadObjRes: null,
      getEntryRes: null,
      saveObjRes: null,
      activeTab: "commissionInfo",
      strNosaziCode: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      model: {
        dataEntry: { ...defaultModel }
      }
    }
  },

  mounted () {
    if (this.selectedNidCommission !== null) {
      this.loadData(this.selectedNidCommission)
    }
  },

  methods: {
    baseNosaziCodeHandler (value) {
      this.baseNosaziCode = value
    },
    loadData (NidCommission) {
      this.isEditable = false
      this.showLoading()
      this.$services.commissions
        .getEntryCommissionInfo({ NidCommission: NidCommission })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const res = this.loadObjRes.data.GetEntryCommissionInfoResult
            if (res.CommissionTrepasses) {
              this.model.dataEntry.CommissionTrepasses =
                res.CommissionTrepasses
            }
            if (res.Commission_Complainant) {
              this.model.dataEntry.Commission_Complainant =
                res.Commission_Complainant
            }
            if (res.Commission_Info) {
              this.model.dataEntry.Commission_Info = res.Commission_Info
              if (!this.isView) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.model.dataEntry.Commission_Info.NidCommission,
                  bizCodeTitle: "NidCommission",
                  saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
                })
              }
              this.isView = true
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

    getEntryCommissionInfoInNosaziCode () {
      this.showLoading()
      const payload = { pNosaziCode: this.strNosaziCode }
      this.$services.commissions
        .getEntryCommissionInfoInNosaziCode(payload)
        .then(async ({ data }) => {
          this.getEntryRes = this.getResponse(data)
          if (this.getEntryRes.success) {
            this.isEditable = true
            this.model.dataEntry =
              this.getEntryRes.data.GetEntryCommissionInfoInNosaziCodeResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.dataEntry.NidCommission,
              bizCodeTitle: "NidCommission",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveData () {
      if (!this.isValidForm()) return
      if (this.baseNosaziCode.Region === 0) {
        return this.showError("لطفا کد نوسازی را وارد نمایید.")
      }
      this.showLoading()
      let payLoad = { ClsEntryCommissionInfo: this.model.dataEntry }

      this.$services.commissions
        .saveEntryCommissionInfo(payLoad)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode:
                this.saveObjRes.data.SaveEntryCommissionInfoResult
                  .NidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.strNosaziCode,
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.loadData(
              this.saveObjRes.data.SaveEntryCommissionInfoResult.NidCommission
            )
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    clearData () {
      this.isEditable = true
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.strNosaziCode = ""
      this.model.dataEntry = { ...defaultModel }
    },

    changedNosaziCode (baseNosaziCode) {
      this.baseNosaziCode = baseNosaziCode
      this.strNosaziCode = convertNosaziCodeObjectToString(baseNosaziCode)
      this.getEntryCommissionInfoInNosaziCode()
      // if (
      //   this.model.dataEntry.NidCommission ===
      //   "00000000-0000-0000-0000-000000000000"
      // ) {
      //   this.getEntryCommissionInfoInNosaziCode();
      // } else {
      //   this.baseNosaziCode = baseNosaziCode;
      //   this.getEntryCommissionInfoInNosaziCode();
      // }
    }
  }
}
</script>
