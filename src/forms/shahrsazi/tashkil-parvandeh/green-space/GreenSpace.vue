<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper :title="currentTitle" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
          @fetched="fetched"
        />
        <safa-status :result="loadObjRes" />
        <safa-status :result="inquiryShCutTreeOwnRequestRes" />
      </template>
      <template #before-close v-if="placeholder !== 'default'">
        <!-- <btn-back
        class="q-ml-sm"
        label="بازگشت به فرم اصلی فضای سبز"
        @click="changePlaceholder('default')"
      /> -->
        <q-btn
          flat
          dense
          size="12px"
          color="primary"
          icon-right="arrow_back"
          @click="changePlaceholder('default')"
          label="بازگشت به فرم اصلی فضای سبز"
          style="min-width: 200px"
        />
      </template>
      <div class="column q-gutter-sm q-pa-sm" v-if="placeholder === 'default'">
        <btn-save
          label="ثبت درخواست"
          @click="handleRequestSubmission"
          v-if="!isSelectFromResponder"
        />
        <btn-search
          label="پیگیری درخواست"
          @click="handleInquiryRequest"
          :disable="lockBtn"
        />
        <btn-default
          label="وضعیت شماره پرونده"
          @click="handleSpaceStatus"
          :disable="lockBtn"
        />
      </div>
      <fit v-if="placeholder === 'greenSpaceRequest'">
        <!-- "ثبت درخواست"-->
        <GreenSpaceRequest
          v-model="model"
          :selectedRequestModel="selectedRequestModel"
          :name="name"
          :title="title"
          :formKey="formKey"
          :config="config"
          @sendRequestDone="placeholder = 'default'"
          ref="requestSubmission"
        />
      </fit>
      <fit v-if="placeholder === 'greenSpaceInquiry'">
        <!-- "پیگیری درخواست" -->
        <GreenSpaceInquiry v-model="model" />
      </fit>
      <fit v-if="placeholder === 'greenSpaceStatus'">
        <!-- "وضعیت شماره پرونده" -->
        <GreenSpaceStatus v-model="model" />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

import GreenSpaceRequest from "./partials/GreenSpaceRequest"
import GreenSpaceStatus from "./partials/GreenSpaceStatus"
import GreenSpaceInquiry from "./partials/GreenSpaceInquiry"

export default {
  mixins: [baseFormMixin],
  components: { GreenSpaceRequest, GreenSpaceStatus, GreenSpaceInquiry },
  data () {
    return {
      name: "GreenSpace",
      title: "فضای سبز",
      formKey: "31d5ac3b-1cb2-4fd7-8ea4-5a978a29bbc1",
      main: true,
      workflowCompatible: true,

      loadObjRes: null,
      inquiryShCutTreeOwnRequestRes: null,

      placeholder: "default",
      selectedRequestModel: null,
      model: {
        ErrorResult: {},
        Sh_CutTreeOwnRequest: {},
        lstSh_CutTreeOwnRequestDetails: [],
        pNosaziCode: {}
      },
      isView: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    fetched (e) {
      this.selectedRequestModel = e
    },
    loadObj () {
      this.showLoading()
      this.$services.SC.getShCutTreeOwnRequestByNidWorkItem(
        { pNidWorkItem: this.selectedRequest.NidWorkItem },
        this.config
      )
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            if (!this.loadObjRes.data.Sh_CutTreeOwnRequest) {
              this.showError(
                "شماره پرونده مورد نظر در سامانه فضای سبز ثبت درخواست نشده است."
              )
              return
            }
            this.model = this.loadObjRes.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `بارگذاری اطلاعات فرم فضای سبز برای شماره پرونده ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((e) => {
          console.error("getShCutTreeOwnRequestByNidWorkItem error", e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async handleRequestSubmission () {
      // await this.loadObj()
      this.placeholder = "greenSpaceRequest" // "ثبت درخواست فضای سبز"
    },
    async handleInquiryRequest () {
      if (
        !this.model.Sh_CutTreeOwnRequest &&
        !this.model.Sh_CutTreeOwnRequest.CutTreeOwnRequestNo
      ) {
        return
      }
      // await this.loadObj()
      await this.inquiry()
      this.placeholder = "greenSpaceInquiry" // "پیگیری درخواست"
    },
    async handleSpaceStatus () {
      // await this.loadObj()
      this.placeholder = "greenSpaceStatus" // "وضعیت شماره پرونده"
    },

    async inquiry () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.inquiryShCutTreeOwnRequest(
          { pRequestNo: this.model.Sh_CutTreeOwnRequest.CutTreeOwnRequestNo },
          this.config
        )
        this.inquiryShCutTreeOwnRequestRes = this.getResponse(data)
        if (this.inquiryShCutTreeOwnRequestRes.success) {
          this.model = this.inquiryShCutTreeOwnRequestRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بارگذاری لیست پیگیری درخواست در فرم فضای سبز برای شماره پرونده ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch (e) {
        console.error("error", e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    changePlaceholder (state) {
      this.placeholder = state
      this.loadObj()
    }
  },
  computed: {
    currentTitle () {
      switch (this.placeholder) {
        case "greenSpaceRequest":
          return "ثبت درخواست فضای سبز"
        case "greenSpaceStatus":
          return "وضعیت شماره پرونده"
        case "greenSpaceInquiry":
          return "پیگیری درخواست"
        default:
          return "فضای سبز"
      }
    },
    config () {
      return {
        config: {
          District: this.selectedDistrict === 0 ? 1 : this.selectedDistrict
        }
      }
    },
    lockBtn () {
      return !this.loadObjRes?.data?.Sh_CutTreeOwnRequest ?? true
    }
  }
}
</script>
