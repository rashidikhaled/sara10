<template>
  <safa-form
    id="0e42cd08-69c7-4c6f-8735-2c572fbb035d"
    caption="شهرسازی- ثبت درخواست"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <!--    <safa-status :result="saveResponse"/>-->
    <safa-status :result="deleteResult" />
    <safa-status :result="getCIRequestInquiryResult" />
    <fit>
      <FormRow>
        <FormControl class="flex items-center no-wrap">
          <safa-checkbox
            label="پیوست به "
            label-width="92px"
            v-model="checkIsAttach"
            cdcName="checkIsAttach"
            :m="m"
            style="min-width: 92px"
          />
          <div>
            <btn-default
              label=""
              title="لیست پیوست درخواست"
              size="xs"
              :disable="isAttach"
              @click="getRequestListCanAttach"
            >
              <q-icon name="more_horiz" />
            </btn-default>
          </div>
        </FormControl>
        <FormControl>
          <safa-text
            label="نوع درخواست پیوست شده"
            label-width="92px"
            m="r"
            v-model="attachInfo.WorkflowTitel"
            cdcName="WorkflowTitel"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره درخواست پیوست شده"
            label-width="92px"
            m="r"
            v-model="attachInfo.NidWorkItem"
            cdcName="NidWorkItem"
          />
        </FormControl>
      </FormRow>
      <q-separator class="q-my-sm" />
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label=" نوع درخواست "
            v-model="selectedWorkFlow"
            cdcName="selectedWorkFlow"
            sourceType="local"
            :options="workFlowItemArray"
            :m="m"
            label-width="92px"
            required
            validations="required"
            ref="refWorkFlow"
            @input="onSelectWorkFlow"
          />
        </FormControl>
        <FormControl>
          <!-- :options="cIRequestInquiryKindOptions"
          source-type="local" -->
          <!-- domainName="CI_SaraM1" -->
          <!-- ciName="CI_RequestInquiryKind" -->
          <safa-combo
            label="نوع درخواست دفترخانه"
            domainName="CI_SaraM1"
            ciName="CI_RequestInquiryKind"
            v-model="CI_RequestInquiryKind"
            cdcName="CI_RequestInquiryKind"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع متقاضی"
            ciName="CI_Requester"
            domainName="CI_SaraM1"
            v-model="requesterType"
            cdcName="requesterType"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl v-if="requesterType === 1" class="flex wrap">
          <safa-combo
            label="نام متقاضی"
            label-width="92px"
            v-model="reqName"
            :useInput="false"
            cdcName="requesterName"
            sourceType="local"
            :options="requesterNames"
            :m="m"
            ref="requesterName"
            required
            validations="required"
            style="flex: 1"
          />
        </FormControl>
        <FormControl v-if="requesterType !== 1" class="flex no-wrap">
          <safa-text
            label="نام متقاضی"
            v-model="requesterName"
            cdcName="requesterName"
            :m="m"
            label-width="92px"
            required
            validations="required"
            style="flex: 1"
          />
          <q-btn
            v-if="getShahrsaziSettings.Chk_IsCheckSabt"
            dense
            color="primary"
            title="استعلام ثبت احوال"
            icon="how_to_reg"
            size="sm"
            outline
            class="q-ml-sm"
            padding="0 8px"
            :disabled="m === 'r'"
            @click="showCheckSabtModalHandler"
          />
        </FormControl>
        <FormControl v-if="this.requesterType !== 1">
          <safa-text
            label="نام خانوادگی متقاضی"
            v-model="requesterLastName"
            cdcName="requesterLastName"
            :m="m"
            label-width="92px"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ملی متقاضی "
            v-model="results.Info.RequesterNationalCode"
            cdcName="RequesterNationalCode"
            :m="m"
            label-width="92px"
            mask="##########"
            :maxlength="10"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره تلفن"
            v-model="results.Info.TelephoneNo"
            cdcName="TelephoneNo"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره همراه"
            :m="m"
            label-width="92px"
            v-model="results.Info.Cellphone"
            cdcName="Cellphone"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد پستی "
            :m="m"
            label-width="92px"
            v-model="results.Info.PostCode"
            cdcName="PostCode"
            mask="##########"
          />
        </FormControl>
        <!-- <FormControl>
          <safa-text
            label="  نام خریدار"
            v-model="results.Info.BuyerName"
            cdcName="BuyerName"
            :m="m"
            label-width="92px"
          />
        </FormControl> -->
        <!-- <FormControl>
          <safa-text
            label="کدملی خریدار"
            v-model="results.Info.BuyerNationalCode"
            cdcName="BuyerNationalCode"
            :m="m"
            label-width="92px"
            mask="##########"
            :maxlength="10"
          />
        </FormControl> -->
        <!-- <FormControl>
          <safa-text
            label="شماره همراه خریدار"
            :m="m"
            label-width="92px"
            v-model="results.Info.BuyerCellphone"
            cdcName="BuyerCellphone"
          />
        </FormControl> -->
        <FormControl>
          <safa-text
            label="شماره نامه"
            v-model="results.Info.MainRequesterNo"
            cdcName="MainRequesterNo"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ نامه"
            v-model="results.Info.MainRequesterDate"
            cdcName="MainRequesterDate"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مرجع صدور نامه"
            :m="m"
            label-width="92px"
            v-model="results.Info.MainRequesterName"
            cdcName="MainRequesterName"
          />
        </FormControl>
        <FormControl v-if="hasMandate">
          <safa-text
            label="شماره وکالت نامه"
            v-model="results.Info.MandateNo"
            cdcName="MandateNo"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl v-if="hasMandate">
          <safa-datepicker
            label="تاریخ وکالت نامه"
            format="jYYYY/jMM/jDD"
            display-format="dddd jDD jMMMM jYYYY"
            v-model="results.Info.MandateDate"
            cdcName="MandateDate"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <!-- <FormControl>
          <safa-text
            label="مقدار مورد انتقال"
            :m="m"
            label-width="92px"
            v-model="results.Info.TransferDang"
            cdcName="TransferDang"
          />
        </FormControl> -->
        <!-- <FormControl>
          <safa-combo
            label="میزان مورد انتقال بر اساس"
            :m="m"
            label-width="92px"
            sourceType="local"
            :options="transferTypeOptions"
            v-model="results.Info.TransferType"
            cdcName="TransferType"
          />
        </FormControl> -->
        <FormControl>
          <safa-text
            label=" شماره دبیرخانه"
            v-model="results.Info.SecretariatNo"
            cdcName="SecretariatNo"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ دبیرخانه"
            v-model="results.Info.SecretariatDate"
            cdcName="SecretariatDate"
            :m="m"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="پست الکترونیکی"
            :m="m"
            label-width="92px"
            v-model="results.Info.EMail"
            cdcName="EMail"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="دانگ مورد انتقال"
            :m="m"
            label-width="92px"
            v-model="results.Info.TransferDang"
            cdcName="TransferDang"
          />
        </FormControl>

        <safa-text
          label="آدرس"
          v-model="results.Info.RequesterAddress"
          cdcName="RequesterAddress"
          :m="m"
          label-width="92px"
          class="col-12"
        />
        <text-template
          label="توضیحات"
          v-model="results.Info.Comment"
          cdcName="Comment"
          formKey="243B3099-F29E-4F8E-84EA-A5DCC79D2C94"
          :m="m"
          class="col-12"
          label-width="92px"
          :rows="2"
        />
      </FormRow>
      <safa-grid
        title="خریداران"
        v-model="results.Sh_TransferRequestBuyers"
        cdcName="Sh_TransferRequestBuyers"
        helper="agShTransferRequestBuyersColumns"
        :suppressRowClickSelection="false"
        :show-selected-checkbox="true"
        :allowMultipleSelection="true"
        :defaultNewRow="defaultNewRow"
        min-height="200px"
        height="100%"
        max-height="100%"
        fit
        :m="m"
        ref="buyers"
      />
    </fit>

    <safa-popup
      v-model="isShowConfirmcode"
      cdcName="isShowConfirmcode"
      title="دریافت کد تأیید"
      width="300px"
      height="200px"
    >
      <RequestSubmissionGetConfirmForm
        :cellPhone="results.Info.Cellphone"
        :baseNosaziCode="baseNosaziCode"
        @reloadForm="closeConfirmCode"
        @completeSubmission="isShowConfirmcode = false"
      />
    </safa-popup>

    <safa-popup
      title="استعلام ثبت احوال"
      v-model="showCheckSabtModal"
      width="300px"
      height="300px"
    >
      <UCheckSabteahval
        :baseNosaziCode="baseNosaziCode"
        :settingData="getShahrsaziSettings"
        @changeDataAfterEstelam="changeDataAfterEstelam"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import RequestSubmissionGetConfirmForm from "./RequestSubmissionGetConfirmForm"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
// import axios from "axios"
// import { appendUrls } from "src/utils"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import UCheckSabteahval from "../../check-sabteahval/UCheckSabteahval.vue"

export default {
  name: "request-submission-new",
  mixins: [baseFormMixin],
  components: { RequestSubmissionGetConfirmForm, UCheckSabteahval },

  data: function () {
    return {
      // #region CheckSabt,
      buildingSettings: {
        ShahrsaziSettings: {
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtJson: false
        }
      },
      showCheckSabtModal: false,
      grdParams: null,
      // #endregion
      reqName: "",
      requesterNames: [],
      requesterType: 0,
      CI_RequestInquiryKind: 0,
      cIRequestInquiryKindOptions: [],
      workItemResult: {},
      requesterName: "",
      requesterLastName: "",
      updateLastRequestResult: {},
      selectedWorkFlow: null,
      saveResults: { InBlackList_InAlarm: [] },
      nationalCodeResults: { UserBlackList: [] },
      titleForPartial: null,
      getCIRequestInquiryResult: null,
      isAttach: true,
      checkIsAttach: null,
      attachResults: { RequestListCanAttach: [] },
      showAttachList: false,
      saveResponse: null,
      getConfirmCodeBtn: false,
      isShowConfirmcode: false,
      disableConfirmCode: false,
      hasMandate: true,
      deleteResult: null,
      transferTypeOptions: [
        {
          ID: 0,
          Title: "دانگ"
        },
        {
          ID: 1,
          Title: "سهم"
        },
        {
          ID: 2,
          Title: "حبه"
        },
        {
          ID: 3,
          Title: "شهیر"
        }
      ]
    }
  },

  props: {
    results: {},
    nosaziCode: String,
    baseNosaziCode: Object,
    workFlowItemArray: Array,
    attachInfo: Object,
    baseLibResults: Object,
    m: {
      type: String,
      default: "r"
    },
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },

  async mounted () {
    this.results.Info = {
      RequesterNationalCode: "",
      BuyerName: "",
      MainRequesterNo: "",
      MandateNo: "",
      SecretariatNo: "",
      CI_Requester: 0,
      TelephoneNo: "",
      BuyerNationalCode: "",
      MainRequesterDate: "",
      SecretariatDate: "",
      RequesterName: "",
      Cellphone: "",
      PostCode: "",
      BuyerCellphone: "",
      MainRequesterName: "",
      TransferDang: "",
      TransferType: 0,
      EMail: "",
      RequesterAddress: "",
      Comment: ""
    }
    this.requesterType = 0
    if (this.results && Array.isArray(this.results.Sh_TransferRequestBuyers)) {
      for (let i = 0; i < this.results.Sh_TransferRequestBuyers.length; i++) {
        this.results.Sh_TransferRequestBuyers[i].uniqueId = this.newGuid()
      }
    } else this.results.Sh_TransferRequestBuyers = []
  },

  methods: {
    reset () {
      this.reqName = ""
      this.requesterNames = []
      this.requesterType = 0
      this.requesterName = ""
      this.requesterLastName = ""
      this.CI_RequestInquiryKind = 0
      this.selectedWorkFlow = ""
    },
    onSelectWorkFlow () {
      this.$nextTick(async () => {
        let nidWorkFlowDeff = this.$refs.refWorkFlow.selectedItem.ID
        await this.getCIRequestInquiryKindFromNidWorkflowDeff(nidWorkFlowDeff)
      })
    },
    change (value) {
      this.$emit("change", this.$refs.gcombo, value)
    },
    async accept () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        let self = this
        // if (this.selectedWorkFlow === null) {
        //   this.showError("لطفا نوع درخواست را انتخاب نمایید.");
        //   return;
        // }
        // if (this.requesterName === "" || this.requesterLastName === "") {
        //   this.showError("لطفا نام و نام خانوادگی متقاضی را وارد نمایید.");
        //   return;
        // }

        // chckNationalCode method
        let nationalData = {
          pUserName: this.getUserDisplayName(),
          pNationalCode: this.results.Info.RequesterNationalCode
        }
        // get national code
        let response = await this.$services.SA.getNationalCodeAndUserBlackList(
          nationalData,
          {
            config: { District: this.baseLibResults.MainObj.District }
          }
        )
        self.nationalCodeResult = this.getResponse(response.data)
        self.nationalCodeResults = self.nationalCodeResult.data

        // if (
        //   self.nationalCodeResults.UserBlackList.some(
        //     item => item.EumBlackListStatus === 0
        //   )
        // ) {
        //   this.showError(
        //     'شما در لیست سیاه ثبت درخواست قرار دارید و نمی توانید درخواست ثبت کنید.'
        //   )
        //   return
        // }
        // if (self.nationalCodeResults.ErrorResult.BizErrors.length === 0) {
        //   if (
        //     self.nationalCodeResults.NationalCodeBlackList.NidBlackOwner !==
        //     '00000000-0000-0000-0000-000000000000'
        //   ) {
        //     if (
        //       self.nationalCodeResults.NationalCodeBlackList
        //         .EumBlackListControl === 0
        //     ) {
        //       this.showConfirm(
        //         'این کد ملی در لیست سیاه است. آیا می خواهید درخواست ثبت شود؟'
        //       ).onOk(() => {
        //         this.addWorkItem()
        //       }).onCancel(() => {
        //         // eslint-disable-next-line no-useless-return
        //         return
        //       })
        //     } else {
        //       this.showError(
        //         'این کد ملی در لیست سیاه است. شما نمی توانید برای آن درخواستی ثبت کنید'
        //       )
        //       return
        //     }
        //   } else {
        //     const strNosaziCode = convertNosaziCodeObjectToString(
        //       this.nosaziCode
        //     )

        //     await this.log({
        //       action: this.logActions.view,
        //       bizCode: strNosaziCode,
        //       bizCodeTitle: 'کد نوسازی'
        //     })

        console.log("addWorkItem")
        await this.addWorkItem()
        console.log("getInBlackList")
        const blacklist = await this.getInBlackList()
        console.log("getInBlackList::response", blacklist)
        console.log("saveRequest")
        const request = await this.saveRequest()
        console.log("saveRequest::response", request)

        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )

        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: strNosaziCode,
          saveDesc: `ثبت درخواست شهرسازی با شماره درخواست ${this.workItemResult.data.data.ProcInfo.NidWorkItem} و کد نوسازی ${strNosaziCode} انجام گردید.`
        })

        this.showSuccess(request.msg).onDismiss(() => {
          if (blacklist.msg) {
            this.showError(blacklist.msg)
          }
          this.redirectToKartable()
        })
      } catch (error) {
        console.log("catch error", error)
        await this.deleteProc()
        await this.deleteWorkItem()
        this.showError(error.message || error || "")
      } finally {
        console.log("finally")
        this.hideLoading()
      }
    },
    async getCIRequestInquiryKindFromNidWorkflowDeff (currentNidWorkflowDeff) {
      let payload = {
        pNidWorkflowDeff: currentNidWorkflowDeff
      }
      const data =
        await this.$services.SC.getCIRequestInquiryKindFromNidWorkflowDeff(
          payload,
          {
            config: { District: this.baseLibResults.MainObj.District }
          }
        )
      this.getCIRequestInquiryResult = this.getResponse(data.data)
      this.cIRequestInquiryKindOptions =
        this.getCIRequestInquiryResult.data.CI_RequestInquiryKind_FromNidWorkflowDeff
    },
    async update () {
      let updateLastRequestData = {
        pNidProc: this.workItemResult.data.data.ProcInfo.NidProc,
        pLastRequestState: ".درخواست ثبت شد"
      }

      const data = await this.$services.SC.updateLastRequestState(
        updateLastRequestData,
        {
          config: { District: this.baseLibResults.MainObj.District }
        }
      )
      this.updateLastRequestResult = this.getResponse(data.data)
    },
    async addWorkItem () {
      return new Promise(async (resolve, reject) => {
        // addWorkItem method
        this.titleForPartial = this.workFlowItemArray.find(
          (x) => x.ID === this.selectedWorkFlow
        )

        let ClsPropInfo = [
          {
            PropName: "NidNosaziCode",
            PropTitle: "کد",
            PropValue: this.nosaziCode,
            PropType: "Hidden"
          },
          {
            PropName: "ReqesterName",
            PropTitle: "نام متقاضی",
            PropValue: this.results.Info.RequesterName
          },
          {
            PropName: "Cellphone",
            PropTitle: "تلفن همراه متقاضی",
            PropValue: this.results.Info.Cellphone
          },
          {
            PropName: "TelephoneNo",
            PropTitle: "تلفن ثابت متقاضی",
            PropValue: this.results.Info.TelephoneNo
          },
          {
            PropName: "PostCode",
            PropTitle: "کد پستی متقاضی",
            PropValue: this.results.Info.PostCode
          },
          {
            PropName: "RequesterAddress",
            PropTitle: "آدرس متقاضی",
            PropValue: this.results.Info.RequesterAddress
          },
          {
            PropName: "Region",
            PropTitle: "منطقه",
            PropValue: this.baseNosaziCode.District
          },
          {
            PropName: "EumNosaziCodeObjType",
            PropTitle: "نوع ملک یا ساختمان یا ...",
            PropValue: 3,
            PropType: "Hidden"
          },
          {
            PropName: "TransferDang",
            PropTitle: "مقدار مورد انتقال",
            PropValue: this.results.Info.TransferDang
          },
          {
            PropName: "TransferType",
            PropTitle: "میزان مورد انتقال بر اساس",
            PropValue: this.results.Info.TransferType
          },
          {
            PropName: "RequesterNationalCode",
            PropTitle: "شماره ملی متقاضی",
            PropValue: this.results.Info.RequesterNationalCode,
            PropType: "Hidden"
          }
        ]
        if (
          this.attachInfo !== null &&
          this.attachInfo.NidProc !== "00000000-0000-0000-0000-000000000000"
        ) {
          ClsPropInfo.push(
            {
              PropName: "NidRevisit",
              PropTitle: "شماره بازدید",
              PropValue: this.attachInfo.NidRevisit,
              PropType: "Hidden"
            },
            {
              PropName: "IsAttachedRequest",
              PropTitle: "آیا درخواست پیوستی است؟",
              PropValue: "True",
              PropType: "Hidden"
            }
          )
        } else {
          ClsPropInfo.push({
            PropName: "NidRevisit",
            PropTitle: "شماره بازدید",
            PropValue: "",
            PropType: "Hidden"
          })
        }
        const WKT = await this.getWKT()
        let workItemData = {
          BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          EumOwnerType: 1,
          NidWorkflowDeff: this.selectedWorkFlow,
          ProcInitiator: this.getNidUser(),
          ProcRequester: `${this.requesterName} ${this.requesterLastName}`,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "سرا10",
          GroupName: "شهرسازی",
          GroupTitel: "شهرسازی",
          Domain: this.baseNosaziCode.District,
          IsSara10Request: true,
          WKT
          // ExtandedProp: { PropList: ClsPropInfo },
          // IconUrl: 'Images/Building.png',
          // IsSuspend: false,
          // NidProc: '00000000-0000-0000-0000-000000000000',
          // NidWorkItem: 0,

          // ProcRequester: this.results.Info.RequesterName,
          // TaskArea: 'شهرداری منطقه یک11',
          // TaskTitel: this.titleForPartial.Title
        }
        const response = await this.$srvWorkflow.createInstance(workItemData)
        this.workItemResult = this.getResponse(response.data)
        // console.log("this.workItemResult", this.workItemResult);

        if (this.workItemResult.success) {
          if (
            this.workItemResult.data.status === 200 &&
            this.workItemResult.data.success
          ) {
            return resolve()
          } else {
            return reject(this.workItemResult.errors[0].text)
          }
        }
      })
    },
    async getInBlackList () {
      return new Promise(async (resolve, reject) => {
        let self = this
        // getInBlackListInAlarm method
        let inBlackListData = {
          pNidNosaziCode: this.nosaziCode
        }

        const data = await this.$services.SA.getInBlackListInAlarm(
          inBlackListData,
          {
            config: { District: this.baseLibResults.MainObj.District }
          }
        )
        self.saveResult = this.getResponse(data.data)
        if (self.saveResult.success) {
          self.saveResults = this.saveResult.data
          if (self.saveResults.InBlackList_InAlarm.length > 0) {
            return resolve({
              msg: "کد نوسازی مورد نظر در لیست سیاه و در وضعیت هشدار قرار دارد."
            })
            // this.showError(
            //   'کد نوسازی مورد نظر در لیست سیاه و در وضعیت هشدار قرار دارد.'
            // )
          }
          return resolve({ msg: "" })
        } else {
          return reject(self.saveResult.errors[0].text)
        }
      })
    },
    async getWKT () {
      if (!this.baseNosaziCode) return ""
      try {
        const code = convertNosaziCodeObjectToString(this.baseNosaziCode)
          .split("-")
          .slice(0, 4)
          .join("-")
        // eslint-disable-next-line no-undef
        // const url = appendUrls([
        //   window.getConfigValue("srvMapUrl"),
        //   "MapFind2"
        // ])
        const { data } = this.$services.srvMap.MapFind2({
          PWKt: "",
          PBuffer: 1,
          // eslint-disable-next-line no-undef
          NidLayer: window.getConfigValue("mapConfig").DefaultSelectLayer,
          // eslint-disable-next-line no-useless-escape
          PWhere: ` and Code=\'${code}-0-0-0\'`,
          Pfrom: 1,
          Pto: 2
        })

        console.log("@@@@@@@@@@@ WKT", data)
        const res = Array.isArray(data) ? data : data.data
        if (res && res.length > 0) return res[0].WKT || ""
      } catch (e) {
        return ""
      }
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        this.results.Info.CI_Requester = this.requesterType
        this.results.Info.RequesterName =
          `${this.requesterName}` + " " + `${this.requesterLastName}`
        // const WKT = await this.getWKT()

        let data = {
          PInfo: {
            ActiveNidRevisit: "00000000-0000-0000-0000-000000000000",
            HasNidProc: false,
            Info: this.results.Info,
            Sh_TransferRequestBuyers: this.results.Sh_TransferRequestBuyers
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          PFormName: "Request",
          GroupName: "ACE63A06-E835-457D-A1EA-3B477DD9E69B",
          GroupTitel: "شهرسازی",
          ProcArea: "سرا 10"
        }
        data.PInfo.Info.NidNosaziCode = this.nosaziCode
        data.PInfo.Info.NidProc =
          this.workItemResult.data.data.ProcInfo.NidProc
        data.PInfo.Info.NidWorkItem =
          this.workItemResult.data.data.ProcInfo.NidWorkItem
        data.PInfo.Info.NidWorkflowDeff = this.selectedWorkFlow
        data.PInfo.Info.EumRequestStatus = 0
        data.PInfo.Info.NidProc_Attached = this.attachInfo.NidProc
        data.PInfo.Info.CI_RequestInquiryKind = this.CI_RequestInquiryKind
        data.PInfo.Info.IsSara10Request = true

        const response = await this.$services.SC.saveRequestInfo(data, {
          config: { District: this.baseLibResults.MainObj.District }
        })
        this.saveResponse = this.getResponse(response.data)
        if (this.saveResponse.success) {
          // this.getInBlackList();
          await this.update()
          this.results.Info = {}
          this.selectedWorkFlow = null
          this.attachInfo.NidWorkItem = ""
          this.attachInfo.WorkflowTitel = ""
          if (!this.workItemResult.data.data.ProcInfo.NidWorkItem) {
            return reject("عملیات موفقیت آمیز نبود.")
          } else {
            /* this.showSuccess(
               ' درخواست با شماره ' +
               this.workItemResult.data.data.ProcInfo.NidWorkItem +
               ' ثبت گردید. '
             ) */

            return resolve({
              msg: `درخواست با شماره "<b>${this.workItemResult.data.data.ProcInfo.NidWorkItem}</b>" ثبت گردید.`
            })
            // resolve(' درخواست با شماره ' +
            //   this.workItemResult.data.data.ProcInfo.NidWorkItem +
            //   ' ثبت گردید. ')
          }
        } else {
          return reject(this.saveResponse.errors[0].text)
        }
      })
    },
    getRequestListCanAttach () {
      this.showLoading()
      let self = this
      let data = {
        pNidNosaziCode: this.nosaziCode
      }
      this.$services.SC.getRequestListCanAttach(data, {
        config: { District: this.baseLibResults.MainObj.District }
      })
        .then(async ({ data }) => {
          self.attachResult = this.getResponse(data)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (self.attachResult.success) {
            self.attachResults = self.attachResult.data
            self.showAttachList = true
            self.$emit("showMainForm", {
              isAttach: self.showAttachList,
              attachList: self.attachResults
            })
          }
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode,
            saveDesc: `بارگذاری لیست پیوست درخواست برای کد نوسازی ${strNosaziCode} انجام گردید.`
          })
        })
        .catch((response) => {
          this.serverError()
          console.log("erro3r", response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // async deleteProc() {
    //   try {
    //     let payLoad = {
    //       NidProc: this.workItemResult.data.data.ProcInfo.NidProc,
    //     };

    //     const { data } = await this.$services.SC.deleteProc(payLoad, {
    //   config: { District: this.baseLibResults.MainObj.District },
    // });
    //     this.deleteResult = this.getResponse(data);
    //   } catch (e) {
    //     this.serverError();
    //     console.error("delete method", e);
    //   }
    // },
    async deleteWorkItem () {
      try {
        let payLoad = {
          NidProc: this.workItemResult.data.data.ProcInfo.NidProc
        }
        const { data } = await this.$srvWorkflow.deleteProc(payLoad, {
          config: { District: this.baseLibResults.MainObj.District }
        })
        console.log("workflow delete proc", data)
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        this.serverError()
        console.error("delete method", e)
      }
    },
    // TODO: not implemented
    async deleteProc () {
      try {
        let payLoad = {
          pNidProc: this.workItemResult.data.data.ProcInfo.NidProc
        }
        const { data } = await this.$services.SC.deleteRequest(payLoad, {
          config: { District: this.baseLibResults.MainObj.District }
        })
        this.deleteResult = this.getResponse(data)
      } catch (e) {
        this.serverError()
        console.error("delete workitem method", e)
      }
    },
    showConfirmCode () {
      if (this.results.Info.Cellphone !== "") {
        this.isShowConfirmcode = true
      } else {
        this.showError("ابتدا شماره همراه باید وارد شده باشد.")
      }
    },
    closeConfirmCode () {
      this.isShowConfirmcode = false
      this.showWarning("شماره همراه شما تایید نشد.")
    },
    showCheckSabtModalHandler () {
      if (!this.isEditable) this.showCheckSabtModal = true
    },
    showCheckSabtModalOnGridHandler (params) {
      if (this.m === "r") {
        return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.")
      }
      this.showCheckSabtModal = true
      this.grdParams = params
    },
    changeDataAfterEstelam ({ estelamModel }) {
      if (this.grdParams) {
        // وقتی استعلام از جدول خریداران باشد
        for (let i = 0; i < this.results.Sh_TransferRequestBuyers.length; i++) {
          if (
            this.results.Sh_TransferRequestBuyers[i].uniqueId ===
            this.grdParams.uniqueId
          ) {
            this.results.Sh_TransferRequestBuyers[i].Name =
              estelamModel.PersonInfo.name +
              " " +
              estelamModel.PersonInfo.family
            this.results.Sh_TransferRequestBuyers[i].NationalCode =
              estelamModel.PersonInfo.nationalCode
          }
          this.$nextTick(() => {
            this.$refs.buyers.gridApi.refreshCells()
          })
          this.$forceUpdate()
        }
      } else {
        // وقتی استعلام از نام متقاضی خریداران باشد
        this.requesterName = estelamModel.PersonInfo.name
        this.requesterLastName = estelamModel.PersonInfo.family
        this.results.Info.RequesterNationalCode =
          estelamModel.PersonInfo.nationalCode
      }
      this.grdParams = null
      this.showCheckSabtModal = false
    },
    async loadSettings () {
      this.buildingSettings = await this.loadFormSetting("BuildingSettings", {
        defaultValue: this.buildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    },
    addNewColToColumns (arr = [], newObj = {}, position = 4) {
      let insertIndex = Math.min(position, arr.length)
      arr.splice(insertIndex, 0, newObj)
    },
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    }
  },
  async created () {
    await this.loadSettings()
  },
  computed: {
    defaultNewRow () {
      return {
        isSelectedNode: false,
        Name: "",
        NationalCode: "",
        MobilePhoneNumber: "",
        CI_BuyerOwnershipType: 0,
        BuyerOwnershipAmount: 0,
        uniqueId: this.newGuid()
      }
    },
    columnGenerateCheckSabt () {
      return {
        field: "",
        title: "استعلام ثبت احوال",
        editor: "action",
        width: "131px",
        btnTitle: "استعلام ثبت احوال",
        btnColor: "primary",
        btnIcon: "how_to_reg",
        cellRenderer: "agCallbackBtn",
        callback: (params) => this.showCheckSabtModalOnGridHandler(params)
      }
    },
    getShahrsaziSettings () {
      return (
        this.buildingSettings?.ShahrsaziSettings ?? {
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtJson: false,
          Chk_IsCheckSabtWCF: false
        }
      )
    }
  },
  watch: {
    checkIsAttach () {
      if (this.checkIsAttach) {
        this.isAttach = false
      } else {
        this.isAttach = true
      }
    },
    reqName () {
      if (this.requesterType === 1) {
        let tmp =
          this.baseLibResults.Base_Owner.find(
            (f) => f.NidOwner === this.reqName
          ) ?? {}
        if (Object.keys(tmp).length === 0) return
        // if (tmp === {}) return
        this.requesterName = tmp.OwnerName
        this.requesterLastName = tmp.OwnerLastName
        this.results.Info.TelephoneNo = tmp.Telephone
        this.results.Info.RequesterNationalCode = tmp.NationalCode
        this.results.Info.Cellphone = tmp.CellPhone
      } else {
        this.requesterName = ""
        this.requesterLastName = ""
        this.results.Info.TelephoneNo = ""
        this.results.Info.RequesterNationalCode = ""
        this.results.Info.Cellphone = ""
      }
    },
    buildingSettings: {
      handler () {
        if (this.buildingSettings?.ShahrsaziSettings.Chk_IsCheckSabt === true) {
          this.addNewColToColumns(
            this.shTransferRequestBuyersColumns,
            this.columnGenerateCheckSabt,
            0
          )
        }
      },
      immediate: true
    },
    showCheckSabtModal () {
      if (this.showCheckSabtModal === false) {
        this.grdParams = null
      }
    },
    requesterType () {
      if (this.requesterType === 1) {
        this.requesterName = ""
        this.requesterLastName = ""
        this.results.Info.RequesterNationalCode = ""

        this.hasMandate = false
        if (this.baseLibResults.Base_Owner.length !== 0) {
          this.requesterNames = this.baseLibResults.Base_Owner.map((m) => {
            return {
              ID: m.NidOwner || "",
              Title: `${m.OwnerName ?? ""} ${m.OwnerLastName ?? ""}` || ""
            }
          })
        }
        this.results.Info.RequesterAddress =
          this.baseLibResults.Base_AddressInfo.MainAddress
        this.results.Info.PostCode =
          this.baseLibResults.Base_AddressPostCode.length > 0
            ? this.baseLibResults.Base_AddressPostCode[0].PostCode
            : null
      } else {
        this.hasMandate = true
      }
    }
  }
}
</script>
