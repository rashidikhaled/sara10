<template>
  <fit>
    <safa-status :result="saveResponse" />
    <FormRow class="q-mb-sm">
      <div class="col-auto">
        <safa-checkbox
          label="پیوست به "
          v-model="checkIsAttach"
          :m="m"
          class="q-pr-sm"
        >
        </safa-checkbox>
      </div>
      <div class="col-auto">
        <btn-default
          label="..."
          size="xs"
          :disable="isAttach"
          @click="getRequestListCanAttach"
        ></btn-default>
      </div>
      <FormContrl>
        <safa-text
          label="نوع درخواست پیوست شده"
          m="r"
          v-model="attachInfo.WorkflowTitel"
          label-width="150px"
          class="col-12 col-sm-5 col-lg-3"
        >
        </safa-text>
      </FormContrl>
      <FormContrl>
        <safa-text
          label="شماره درخواست پیوست شده"
          m="r"
          v-model="attachInfo.NidWorkItem"
          label-width="150px"
          class="col-12 col-sm col-lg-3"
        >
        </safa-text>
      </FormContrl>
    </FormRow>
    <q-separator class="q-my-sm" />
    <!-- <safa-group
      :m="m"
      label-width="110px"
    > -->
    <FormRow class="q-mb-sm q-mr-sm">
      <FormControl>
        <safa-combo
          label=" نوع درخواست "
          label-width="100px"
          v-model="selectedWorkFlow"
          sourceType="local"
          :options="workFlowItemArray"
        >
        </safa-combo>
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع متقاضی"
          label-width="100px"
          ciName="CI_Requester"
          domainName="CI_SaraM1"
          v-model="requesterType"
        >
        </safa-combo>
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="100px"
          v-model="results.Info.RequesterName"
          :m="m"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ملی متقاضی "
          label-width="100px"
          v-model="results.Info.RequesterNationalCode"
          mask="##########"
          :maxlength="10"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تلفن"
          label-width="100px"
          v-model="results.Info.TelephoneNo"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره همراه"
          label-width="100px"
          v-model="results.Info.Cellphone"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی "
          label-width="100px"
          v-model="results.Info.PostCode"
          mask="##########"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="  نام خریدار"
          label-width="100px"
          v-model="results.Info.BuyerName"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="کدملی خریدار"
          label-width="100px"
          v-model="results.Info.BuyerNationalCode"
          mask="##########"
          :maxlength="10"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره همراه خریدار"
          label-width="100px"
          v-model="results.Info.BuyerCellphone"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه"
          label-width="100px"
          v-model="results.Info.MainRequesterNo"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه"
          label-width="100px"
          v-model="results.Info.MainRequesterDate"
          :m="m"
        >
        </safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-text
          label="مرجع صدور نامه"
          label-width="100px"
          v-model="results.Info.MainRequesterName"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره وکالت نامه"
          label-width="100px"
          v-model="results.Info.MandateNo"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ وکالت نامه"
          label-width="100px"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          v-model="results.Info.MandateDate"
          :m="m"
        >
        </safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-text
          label="دانگ مورد انتقال "
          label-width="100px"
          v-model="results.Info.TransferDang"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label=" شماره دبیرخانه"
          label-width="100px"
          v-model="results.Info.SecretariatNo"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دبیرخانه"
          label-width="100px"
          v-model="results.Info.SecretariatDate"
          :m="m"
        >
        </safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-text
          label="پست الکترونیکی"
          label-width="100px"
          v-model="results.Info.EMail"
          :m="m"
        >
        </safa-text>
      </FormControl>
    </FormRow>
    <!-- </safa-group> -->
    <safa-text
      label="آدرس"
      v-model="results.Info.RequesterAddress"
      :m="m"
      label-width="100px"
      class="q-mb-sm"
    ></safa-text>

    <text-template
      label="توضیحات"
      v-model="results.Info.Comment"
      formKey="243B3099-F29E-4F8E-84EA-A5DCC79D2C94"
      :m="m"
      label-width="100px"
      class="q-mb-sm"
    />

    <!-- <div class="row q-gutter-md q-my-md">
      <btn-default
        @click="showConfirmCode"
        label="دریافت کد تأیید"
      />
    </div> -->
    <ShowModal
      v-model="isShowConfirmcode"
      title="دریافت کد تأیید"
      width="400px"
      height="200px"
      vertical
    >
      <RequestSubmissionGetConfirmForm
        :cellPhone="results.Info.Cellphone"
        :baseNosaziCode="baseNosaziCode"
        @reloadForm="closeConfirmCode"
        @completeSubmission="isShowConfirmcode = false"
      />
    </ShowModal>
  </fit>
</template>
<script>
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"
// import RequestSubmissionGetConfirmForm from './RequestSubmissionGetConfirmForm'

export default {
  name: "request-submission-new",
  mixins: [baseFormMixin],
  // components: { RequestSubmissionGetConfirmForm },
  data: function () {
    return {
      requesterType: 0,
      workItemResult: {},
      updateLastRequestResult: {},
      selectedWorkFlow: null,
      saveResults: { InBlackList_InAlarm: [] },
      nationalCodeResults: { UserBlackList: [] },
      titleForPartial: null,
      isAttach: true,
      checkIsAttach: null,
      attachResults: { RequestListCanAttach: [] },
      showAttachList: false,
      saveResponse: null,
      getConfirmCodeBtn: false,
      isShowConfirmcode: false,
      disableConfirmCode: false
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
    requesterType () {
      if (this.requesterType === 1) {
        if (this.baseLibResults.Base_Owner.length !== 0) {
          this.results.Info.RequesterName =
            this.baseLibResults.Base_Owner[0].OwnerName +
            " " +
            this.baseLibResults.Base_Owner[0].OwnerLastName
          this.results.Info.RequesterNationalCode =
            this.baseLibResults.Base_Owner[0].NationalCode
          this.results.Info.Cellphone =
            this.baseLibResults.Base_Owner[0].CellPhone
        }
        this.results.Info.RequesterAddress =
          this.baseLibResults.Base_AddressInfo.MainAddress
      }
    }
  },
  props: {
    results: {},
    nosaziCode: String,
    baseNosaziCode: Object,
    workFlowItemArray: Array,
    attachInfo: Object,
    baseLibResults: Object,

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
    },
    m: {
      type: String,
      default: "r"
    }
  },
  methods: {
    async accept () {
      try {
        this.showLoading()
        let self = this
        if (this.selectedWorkFlow === null) {
          this.showError("لطفا نوع درخواست را انتخاب نمایید.")
        }
        if (this.results.Info.RequesterName === null) {
          this.showError("لطفا نام متقاضی را وارد نمایید.")
        }
        // chckNationalCode method
        let nationalData = {
          pUserName: this.getUserDisplayName(),
          pNationalCode: this.results.Info.RequesterNationalCode
        }
        // get national code
        let response = await this.$services.SA.getNationalCodeAndUserBlackList(
          nationalData
        )
        self.nationalCodeResult = this.getResponse(response.data)
        self.nationalCodeResults = self.nationalCodeResult.data
        if (
          self.nationalCodeResults.UserBlackList.some(
            (item) => item.EumBlackListStatus === 0
          )
        ) {
          this.showError(
            "شما در لیست سیاه ثبت درخواست قرار دارید و نمی توانید درخواست ثبت کنید."
          )
        }
        if (self.nationalCodeResults.ErrorResult.BizErrors.length === 0) {
          if (
            self.nationalCodeResults.NationalCodeBlackList.NidBlackOwner !==
            "00000000-0000-0000-0000-000000000000"
          ) {
            if (
              self.nationalCodeResults.NationalCodeBlackList
                .EumBlackListControl === 0
            ) {
              this.showError(
                "این کد ملی در لیست سیاه است. آیا می خواهید درخواست ثبت شود؟"
              )
            } else {
              this.showError(
                "این کد ملی در لیست سیاه است. شما نمی توانید برای آن درخواستی ثبت کنید"
              )
            }
          } else {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.nosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode
            })

            await this.addWorkItem()
          }
        } else {
          await this.addWorkItem()
        }

        //
      } catch (error) {
        console.debug("error", error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async update () {
      // updateLastRequestState method
      let updateLastRequestData = {
        pNidProc: this.workItemResult.data.data.ProcInfo.NidProc,
        pLastRequestState: ".درخواست ثبت شد"
      }

      const data = await this.$services.SC.updateLastRequestState(
        updateLastRequestData
      )
      this.updateLastRequestResult = this.getResponse(data.data)

      const strNosaziCode = convertNosaziCodeObjectToString(this.nosaziCode)

      // update on air
      await this.log({
        action: this.logActions.save,
        bizCode: strNosaziCode,
        bizCodeTitle: "کد نوسازی",
        nosaziCode: strNosaziCode
      })
    },
    async addWorkItem () {
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
          PropTitle: "نام و نام خانوادگی متقاضی",
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
          PropTitle: "دانگ مورد انتقال",
          PropValue: this.results.Info.TransferDang
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
      let workItemData = {
        BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
        EumOwnerType: 1,
        NidWorkflowDeff: this.selectedWorkFlow,
        ProcInitiator: this.getNidUser(),
        ProcInitiatorName: this.getUserDisplayName(),
        ProcArea: "شهرداری منطقه یک11",
        GroupName: "test",
        GroupTitel: "test",
        ProcRequester: `${this.results.Info.RequesterName}`
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

      if (this.workItemResult.success) {
        if (
          this.workItemResult.data.status === 200 &&
          this.workItemResult.data.success
        ) {
          await this.saveRequest()

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.nosaziCode
          )

          // add work item on air
          await this.log({
            action: this.logActions.save,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        }
      }
    },
    async getInBlackList () {
      let self = this
      // getInBlackListInAlarm method
      let inBlackListData = {
        pNidNosaziCode: this.nosaziCode
      }

      const data = await this.$services.SA.getInBlackListInAlarm(
        inBlackListData
      )
      self.saveResult = this.getResponse(data.data)
      if (self.saveResult.success) {
        self.saveResults = this.saveResult.data

        const strNosaziCode = convertNosaziCodeObjectToString(this.nosaziCode)

        await this.log({
          action: this.logActions.view,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: strNosaziCode
        })
        if (self.saveResults.InBlackList_InAlarm.length > 0) {
          this.showError(
            "کد نوسازی مورد نظر در لیست سیاه و در وضعیت هشدار قرار دارد."
          )
        }
      }
    },
    async saveRequest () {
      this.showLoading()
      this.results.Info.CI_Requester = this.requesterType
      let data = {
        PInfo: {
          ActiveNidRevisit: "00000000-0000-0000-0000-000000000000",
          HasNidProc: false,
          Info: this.results.Info
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        PFormName: "Request"
      }
      data.PInfo.Info.NidNosaziCode = this.nosaziCode
      data.PInfo.Info.NidProc = this.workItemResult.data.data.ProcInfo.NidProc
      data.PInfo.Info.NidWorkItem =
        this.workItemResult.data.data.ProcInfo.NidWorkItem
      data.PInfo.Info.NidWorkflowDeff = this.selectedWorkFlow
      data.PInfo.Info.EumRequestStatus = 0
      data.PInfo.Info.NidProc_Attached = this.attachInfo.NidProc

      const response = await this.$services.SC.saveRequestInfo(data)
      this.saveResponse = this.getResponse(response.data)
      if (this.saveResponse.success) {
        this.getInBlackList()
        this.update()
        this.results.Info = {}
        this.selectedWorkFlow = null
        this.attachInfo.NidWorkItem = ""
        this.attachInfo.WorkflowTitel = ""
        const strNosaziCode = convertNosaziCodeObjectToString(this.nosaziCode)

        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: strNosaziCode
        })

        if (this.workItemResult.data.data.ProcInfo.NidWorkItem === 0) {
          this.showError("عملیات موفقیت آمیز نبود.")
        } else {
          this.showSuccess(
            " درخواست با شماره" +
              this.workItemResult.data.data.ProcInfo.NidWorkItem +
              "ثبت گردید ."
          )
        }
        this.$store.dispatch("kartable/clearKartableState")
        this.redirectToKartable()
        // this.$emit('reload', true)
      }
    },
    getRequestListCanAttach () {
      this.showLoading()
      let self = this
      let data = {
        pNidNosaziCode: this.nosaziCode
      }
      this.$services.SC.getRequestListCanAttach(data)
        .then(async ({ data }) => {
          self.attachResult = this.getResponse(data)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.nosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })

          if (self.attachResult.success) {
            self.attachResults = self.attachResult.data
            self.showAttachList = true
            self.$emit("showMainForm", {
              isAttach: self.showAttachList,
              attachList: self.attachResults
            })
          }
        })
        .catch((response) => {
          this.serverError()
          console.debug("erro3r", response)
        })
        .finally(() => {
          this.hideLoading()
        })
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
    }
  },
  mounted () {
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
      EMail: "",
      RequesterAddress: "",
      Comment: ""
    }
    this.requesterType = 0
  }
}
</script>
