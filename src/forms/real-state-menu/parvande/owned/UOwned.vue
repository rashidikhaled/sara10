<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <safa-status :result="deleteObjRes" />
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="OwnedInfo" label="اطلاعات ملک" />
            <tab-menu name="BaseOwner" label="مالکین و سوابق" />
            <tab-menu name="OwnedEvaluation" label="قیمت گذاری" />
            <tab-menu name="OwnedCompensation" label="نحوه جبران خسارت" />
            <tab-menu name="OwnedSubScription" label="اشتراکات" />
          </template>

          <tab-content name="OwnedInfo">
            <OwnedInfo
              v-model="model"
              :baseNosaziCode="baseNosaziCode"
              :m="mode"
            />
          </tab-content>
          <tab-content name="BaseOwner" :padding="false">
            <BaseOwner v-model="model" :m="mode" />
          </tab-content>
          <tab-content name="OwnedEvaluation" :padding="false">
            <OwnedEvaluation v-model="model" :m="mode" />
          </tab-content>
          <tab-content name="OwnedCompensation" :padding="false">
            <OwnedCompensation v-model="model" :m="mode" />
          </tab-content>
          <tab-content name="OwnedSubScription" :padding="false">
            <OwnedSubScription v-model="model" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <btn-default label="حذف" @click="deleteObj" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import BaseOwner from "./partials/BaseOwner.vue"
import OwnedEvaluation from "./partials/OwnedEvaluation.vue"
import OwnedCompensation from "./partials/OwnedCompensation.vue"
import OwnedSubScription from "./partials/OwnedSubScription.vue"
import OwnedInfo from "./partials/OwnedInfo.vue"
import { uid } from "quasar"

const defaultModel = {
  IsConfirmContractBuy: false,
  Owned_Compensation: [],
  Owned_Evaluation: [],
  Owned_InfoList: [],
  Owned_SubScription: [],
  Base_Owner: [],
  Owned_Info: {
    Address: "",
    ContractDate: "",
    BudgetTitle: "",
    CI_SpecialAssistance: "",
    CI_Year: "",
    ContractNo: "",
    Description: ""
  }
}
const baseNosaziCodeDefault = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0,
  Building: 0,
  Apartment: 0,
  Shop: 0
}

export default {
  mixins: [baseFormMixin],
  components: {
    BaseOwner,
    OwnedInfo,
    OwnedEvaluation,
    OwnedCompensation,
    OwnedSubScription
  },

  data () {
    return {
      title: "اطلاعات تملک",
      name: "UOwned",
      formKey: "D9E8F6D8-FE40-4058-96BB-B38EF712DE22",
      main: true,

      // variables
      activeTab: "OwnedInfo",

      baseNosaziCode: { ...baseNosaziCodeDefault },
      model: { ...defaultModel },

      // Responsive services
      loadObjRes: null,
      saveObjRes: null,
      deleteObjRes: null
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    normalizeModel (e) {
      return {
        ...e,
        Owned_Compensation: e.Owned_Compensation ?? [],
        Owned_Evaluation: e.Owned_Evaluation ?? [],
        Owned_InfoList: e.Owned_InfoList ?? [],
        Owned_SubScription: e.Owned_SubScription ?? [],
        Base_Owner: e.Base_Owner ?? []
      }
    },
    async loadObj () {
      this.showLoading()
      const payload = {
        PNIdProc: this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
      }
      try {
        const { data } = await this.$services.ES.getOwnedInfo(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model = this.normalizeModel(
            this.loadObjRes.data.GetOwned_InfoResult
          )
          this.baseNosaziCode = this.selectedNosaziCode ?? {
            ...baseNosaziCodeDefault
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest?.NidWorkItem ?? "",
            bizCodeTitle: "NidWorkItem",
            saveDec: `نمایش اطلاعات تملک  درخواست : ${
              this.selectedRequest?.NidWorkItem ?? ""
            } انجام شد`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      if (this.model.IsConfirmContractBuy) {
        this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
        return
      }
      this.showLoading()
      try {
        const { data } = await this.$services.ES.saveOwnedInfo({
          PObj: this.model
        })
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد")
          this.loadObj()
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "NidWorkItem",
            saveDec: `ذخیره اطلاعات تملک  درخواست : ${this.selectedRequest.NidWorkItem} انجام شد`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    preDel () {
      this.confirm("آیا اطلاعات موردنظر حذف شود؟").onOk(this.deleteObj())
    },
    async deleteObj () {
      this.showLoading()
      const payload = {
        PNIdProc: this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
      }
      try {
        const { data } = await this.$services.ES.delOwnedInfo(payload)
        this.deleteObjRes = this.getResponse(data)
        if (this.deleteObjRes.success) {
          if (this.deleteObjRes.data.DelOwned_InfoResult) {
            this.showSuccess("حذف اطلاعات باموفقیت انجام شد")
            this.model = { ...defaultModel, _NIdOwned: uid() }
          }
          this.log({
            action: this.logActions.delete,
            bizCode: this.selectedRequest?.NidWorkItem ?? "",
            bizCodeTitle: "NidWorkItem",
            saveDec: `حذف اطلاعات تملک  درخواست : ${this.selectedRequest?.NidWorkItem ?? ""} انجام شد`
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
