<template>
  <form-wrapper :title="title" :padding="false" vertical>
    <safa-status :result="requestResult"/>
    <safa-status :result="sendResult"/>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="generalInfo" label="مشخصات کلی" vertical />
        <tab-menu name="otherInfo" label="سایر مشخصات" />
        <tab-menu name="parameters" label="پاارمترها" />
        <tab-menu name="analysis" label="تحلیل مدها" />
      </template>
      <tab-content name="generalInfo">
        <GeneralInformation :model="model" :m="mode" />
      </tab-content>
      <tab-content name="otherInfo" :padding="false">
        <OtherInformation :model="model" :m="mode" />
      </tab-content>
      <tab-content name="parameters" :padding="false">
        <Parameters :model="model" :m="mode" />
      </tab-content>
      <tab-content name="analysis">
        <Analysis :model="model" :m="mode" />
      </tab-content>
    </safa-tabs>
    <template v-slot:footer>
      <form-actions @edit="isEditable=true" :m="mode" @save="saveData">
        <template #after>
          <btn-default label="ارسال به لیست انتظار" @click="send" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import GeneralInformation from "./partials/GeneralInformation"
import OtherInformation from "./partials/OtherInformation"
import Parameters from "./partials/Parameters"
import Analysis from "./partials/Analysis"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"
export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  components: {
    GeneralInformation,
    OtherInformation,
    Parameters,
    Analysis
  },
  data () {
    return {
      name: "UCheckingInfoCalculator",
      title: "اطلاعات بازبین محاسب",
      formKey: "F6FFAF42-D7D1-4008-A472-7A1AC7EA376C",
      main: true,
      sidebarCompatible: true,
      activeTab: "generalInfo",
      requestResult: null,
      model: {
        AllReferToEngineer: [],
        Fil_Info: {},
        Fil_Owner: {},
        Ref_CheckingInfo: {},
        Ref_CheckingInfo_Calculator: {},
        Ref_CheckingInfo_CalculatorBriefLoad: [],
        Ref_Info_Main: {}
      },
      sendResult: null
    }
  },
  props: {
    selectedRow: Object
  },
  methods: {
    async loadData () {
      try {
        this.showLoading()
        let payLoad = {
          pNidRef: this.selectedRow ? this.selectedRow.NIdRef : this.selectedExecRep.NidRef
        }
        const {
          data
        } = await this.$services.eng.loadCheckingInfoCalculator(payLoad)
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.model = this.requestResult.data.LoadCheckingInfo_CalculatorResult
          // await this.log({
          //   action: this.logActions.view,
          //   bizCode:
          //     this.selectedExecRep.NidRef ||
          //     "00000000-0000-0000-0000-000000000000",
          //   bizCodeTitle: "NidRef"
          // })
        }
      } catch (error) {
        console.error("load error", error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveData () {
      try {
        this.showLoading()
        let payLoad = {
          pObj: {
            ...this.model
          }
        }
        const {
          data
        } = await this.$services.engineers.saveCheckingInfoCalculator(payLoad)
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.showSuccess("ذخیره ی اطلاعات با موفقیت انجام شد.")
          await this.loadData()
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode:
              this.selectedExecRep.NidRef ||
              "00000000-0000-0000-0000-000000000000"
          })
        }
      } catch (error) {
        console.error("save error", error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async send () {
      try {
        this.showLoading()
        let payLoad = {
          pNidRef: this.selectedExecRep.NidRef,
          pNidUser: this.getNidUser(),
          pUserName: this.currentUser.UserName
        }
        const { data } = await this.$services.engineers.sendToStayForRefChecker(
          payLoad
        )
        this.sendResult = this.getResponse(data)
        if (this.sendResult.success) {
          this.showSuccess("ارسال به لیست انتظار بازبین با موفقیت انجام شد.")
        }
      } catch (error) {
        console.error("send error", error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    if (!this.selectedExecRep) {
      this.showError("لطفا ابتدا یک مورد از کارتابل ارجاعات انتخاب کنید")
      this.hideSidebar(this.name)
    }
    else {
      this.loadData()
    }
  }
}
</script>
