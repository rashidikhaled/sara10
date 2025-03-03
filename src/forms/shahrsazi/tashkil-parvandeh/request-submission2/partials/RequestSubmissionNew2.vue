<template>
  <safa-form
    id="0e42cd08-69c7-4c6f-8735-2c572fbb035d"
    caption="شهرسازی- ثبت درخواست"
  >
    <safa-status :result="saveResponse" />
    <fit>
      <!-- <div class="row">
        <div class="col-12 col-sm-2 col-lg-3 col-md-4">
          <safa-checkbox
            label="پیوست به "
            v-model="checkIsAttach"
            :m="m"
            class="q-pr-sm"
          >
          </safa-checkbox>
          <btn-default
            label="..."
            :disable="isAttach"
            @click="getRequestListCanAttach"
          ></btn-default>
        </div>
      </div> -->

      <div class="row q-col-gutter-sm items-center">
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

        <div class="col-12 col-sm-5 col-lg-3">
          <safa-text
            label="نوع درخواست پیوست شده"
            m="r"
            v-model="attachInfo.WorkflowTitel"
            label-width="150px"
          >
          </safa-text>
        </div>
        <div class="col-12 col-sm col-lg-3">
          <safa-text
            label="شماره درخواست پیوست شده"
            m="r"
            v-model="attachInfo.NidWorkItem"
            label-width="150px"
          >
          </safa-text>
        </div>
      </div>
      <q-separator class="q-my-sm" />
      <safa-group>
        <safa-combo
          label=" نوع درخواست "
          v-model="selectedWorkFlow"
          sourceType="local"
          :options="workFlowItemArray"
          :m="m"
          label-width="110px"
        >
        </safa-combo>

        <safa-combo
          label="نوع متقاضی"
          ciName="CI_Requester"
          domainName="CI_SaraM1"
          v-model="requesterType"
          :m="m"
          label-width="110px"
        >
        </safa-combo>

        <safa-text
          label="نام متقاضی"
          v-model="results.Info.RequesterName"
          :m="m"
          label-width="110px"
        ></safa-text>

        <safa-text
          label="شماره ملی متقاضی "
          v-model="results.Info.RequesterNationalCode"
          :m="m"
          label-width="110px"
          mask="##########"
          :maxlength="10"
        >
        </safa-text>

        <safa-text
          label="شماره تلفن"
          v-model="results.Info.TelephoneNo"
          :m="m"
          label-width="110px"
        >
        </safa-text>

        <safa-text
          label="شماره همراه"
          :m="m"
          label-width="110px"
          v-model="results.Info.Cellphone"
        >
        </safa-text>

        <safa-text
          label="کد پستی "
          :m="m"
          label-width="110px"
          v-model="results.Info.PostCode"
          mask="##########"
        >
        </safa-text>

        <safa-text
          label="  نام خریدار"
          v-model="results.Info.BuyerName"
          :m="m"
          label-width="110px"
        >
        </safa-text>

        <safa-text
          label="کدملی خریدار"
          v-model="results.Info.BuyerNationalCode"
          :m="m"
          label-width="110px"
          mask="##########"
          :maxlength="10"
        >
        </safa-text>

        <safa-text
          label="شماره همراه خریدار"
          :m="m"
          label-width="110px"
          v-model="results.Info.BuyerCellphone"
        >
        </safa-text>

        <safa-text
          label="شماره نامه"
          v-model="results.Info.MainRequesterNo"
          :m="m"
          label-width="110px"
        >
        </safa-text>

        <safa-datepicker
          label="تاریخ نامه"
          v-model="results.Info.MainRequesterDate"
          :m="m"
          label-width="110px"
        >
        </safa-datepicker>

        <safa-text
          label="مرجع صدور نامه"
          :m="m"
          label-width="110px"
          v-model="results.Info.MainRequesterName"
        >
        </safa-text>

        <safa-text
          label="شماره وکالت نامه"
          v-model="results.Info.MandateNo"
          :m="m"
          label-width="110px"
          v-if="hasMandate"
        >
        </safa-text>

        <safa-datepicker
          label="تاریخ وکالت نامه"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          v-model="results.Info.MandateDate"
          :m="m"
          label-width="110px"
          v-if="hasMandate"
        >
        </safa-datepicker>

        <safa-text
          label="دانگ مورد انتقال "
          :m="m"
          label-width="110px"
          v-model="results.Info.TransferDang"
        >
        </safa-text>

        <safa-text
          label=" شماره دبیرخانه"
          v-model="results.Info.SecretariatNo"
          :m="m"
          label-width="110px"
        >
        </safa-text>

        <safa-datepicker
          label="تاریخ دبیرخانه"
          v-model="results.Info.SecretariatDate"
          :m="m"
          label-width="110px"
        >
        </safa-datepicker>

        <safa-text
          label="پست الکترونیکی"
          :m="m"
          label-width="110px"
          v-model="results.Info.EMail"
        >
        </safa-text>
      </safa-group>

      <safa-text
        label="آدرس"
        v-model="results.Info.RequesterAddress"
        :m="m"
        label-width="110px"
        class="q-mb-sm"
      ></safa-text>

      <text-template
        label="توضیحات"
        v-model="results.Info.Comment"
        formKey="243B3099-F29E-4F8E-84EA-A5DCC79D2C94"
        :m="m"
        label-width="110px"
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
  </safa-form>
</template>
<script>
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import loaderMixin from 'src/mixins/loaderMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import messageMixin from 'src/mixins/messageMixin'
import RequestSubmissionGetConfirmForm from './RequestSubmissionGetConfirmForm'

export default {
  name: 'request-submission-new',
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  components: { RequestSubmissionGetConfirmForm },
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
      disableConfirmCode: false,
      hasMandate: true
    }
  },
  computed: {
    // mode: function () {
    //   return this.isEditable ? 'e' : 'r'
    // }
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
        this.hasMandate = false
        if (this.baseLibResults.Base_Owner.length !== 0) {
          this.results.Info.RequesterName =
            this.baseLibResults.Base_Owner[0].OwnerName +
            ' ' +
            this.baseLibResults.Base_Owner[0].OwnerLastName
          this.results.Info.RequesterNationalCode = this.baseLibResults.Base_Owner[0].NationalCode
          this.results.Info.Cellphone = this.baseLibResults.Base_Owner[0].CellPhone
        }
        this.results.Info.RequesterAddress = this.baseLibResults.Base_AddressInfo.MainAddress
      } else {
        this.hasMandate = true
      }
    }
  },
  props: {
    results: {},
    isSearch: Boolean,
    isEditable: {
      type: Boolean,
      default: false
    },
    nosaziCode: String,
    baseNosaziCode: Object,
    workFlowItemArray: Array,
    attachInfo: Object,
    baseLibResults: Object,
    m: {
      type: String,
      default: 'r'
    },
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    async accept () {
      try {
        this.showLoading()
        let self = this
        if (this.selectedWorkFlow === null) {
          this.showError('لطفا نوع درخواست را انتخاب نمایید.')
        }
        if (this.results.Info.RequesterName === null) {
          this.showError('لطفا نام متقاضی را وارد نمایید.')
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
        // if (
        //   self.nationalCodeResults.UserBlackList.some(
        //     item => item.EumBlackListStatus === 0
        //   )
        // ) {
        //   this.showError(
        //     'شما در لیست سیاه ثبت درخواست قرار دارید و نمی توانید درخواست ثبت کنید.'
        //   )
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
        //       this.showError(
        //         'این کد ملی در لیست سیاه است. آیا می خواهید درخواست ثبت شود؟'
        //       )
        //     } else {
        //       this.showError(
        //         'این کد ملی در لیست سیاه است. شما نمی توانید برای آن درخواستی ثبت کنید'
        //       )
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

        //     await this.addWorkItem()
        //   }
        // } else {
        await this.addWorkItem()
        // }

        //
      } catch (error) {
        console.log('error', error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    cancle () {
      this.isEditable = false
      this.isSearch = false
    },
    async update () {
      // updateLastRequestState method
      let updateLastRequestData = {
        pNidProc: this.workItemResult.data.NidProc,
        pLastRequestState: '.درخواست ثبت شد'
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
        bizCodeTitle: 'کد نوسازی'
      })
    },
    async addWorkItem () {
      // addWorkItem method
      this.titleForPartial = this.workFlowItemArray.find(
        x => x.ID === this.selectedWorkFlow
      )

      let ClsPropInfo = [
        {
          PropName: 'NidNosaziCode',
          PropTitle: 'کد',
          PropValue: this.nosaziCode,
          PropType: 'Hidden'
        },
        {
          PropName: 'ReqesterName',
          PropTitle: 'نام متقاضی',
          PropValue: this.results.Info.RequesterName
        },
        {
          PropName: 'Cellphone',
          PropTitle: 'تلفن همراه متقاضی',
          PropValue: this.results.Info.Cellphone
        },
        {
          PropName: 'TelephoneNo',
          PropTitle: 'تلفن ثابت متقاضی',
          PropValue: this.results.Info.TelephoneNo
        },
        {
          PropName: 'PostCode',
          PropTitle: 'کد پستی متقاضی',
          PropValue: this.results.Info.PostCode
        },
        {
          PropName: 'RequesterAddress',
          PropTitle: 'آدرس متقاضی',
          PropValue: this.results.Info.RequesterAddress
        },
        {
          PropName: 'Region',
          PropTitle: 'منطقه',
          PropValue: this.baseNosaziCode.District
        },
        {
          PropName: 'EumNosaziCodeObjType',
          PropTitle: 'نوع ملک یا ساختمان یا ...',
          PropValue: 3,
          PropType: 'Hidden'
        },
        {
          PropName: 'TransferDang',
          PropTitle: 'دانگ مورد انتقال',
          PropValue: this.results.Info.TransferDang
        },
        {
          PropName: 'RequesterNationalCode',
          PropTitle: 'شماره ملی متقاضی',
          PropValue: this.results.Info.RequesterNationalCode,
          PropType: 'Hidden'
        }
      ]
      if (
        this.attachInfo !== null &&
        this.attachInfo.NidProc !== '00000000-0000-0000-0000-000000000000'
      ) {
        ClsPropInfo.push(
          {
            PropName: 'NidRevisit',
            PropTitle: 'شماره بازدید',
            PropValue: this.attachInfo.NidRevisit,
            PropType: 'Hidden'
          },
          {
            PropName: 'IsAttachedRequest',
            PropTitle: 'آیا درخواست پیوستی است؟',
            PropValue: 'True',
            PropType: 'Hidden'
          }
        )
      } else {
        ClsPropInfo.push({
          PropName: 'NidRevisit',
          PropTitle: 'شماره بازدید',
          PropValue: '',
          PropType: 'Hidden'
        })
      }
      let workItemData = {
        PTaskInfo: {
          BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          ExtandedProp: { PropList: ClsPropInfo },
          IconUrl: 'Images/Building.png',
          IsSuspend: false,
          NidProc: '00000000-0000-0000-0000-000000000000',
          NidWorkItem: 0,
          NidWorkflowDeff: this.selectedWorkFlow,
          ProcInitiator: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
          ProcInitiatorUserName: 'مدير سيستم (sa)',
          ProcRequester: this.results.Info.RequesterName,
          TaskArea: 'شهرداری منطقه یک11',
          TaskTitel: this.titleForPartial.Title
        }
      }

      const response = await this.$services.task.addWorkItem(workItemData)
      console.log('nidw', response)
      this.workItemResult = this.getResponse(response.data)
      if (this.workItemResult.success) {
        await this.saveRequest()

        const strNosaziCode = convertNosaziCodeObjectToString(this.nosaziCode)

        // add work item on air
        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: 'کد نوسازی'
        })
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
          bizCodeTitle: 'کد نوسازی'
        })
        if (self.saveResults.InBlackList_InAlarm.length > 0) {
          this.showError(
            'کد نوسازی مورد نظر در لیست سیاه و در وضعیت هشدار قرار دارد.'
          )
        }
      }
    },
    async saveRequest () {
      this.showLoading()
      this.results.Info.CI_Requester = this.requesterType
      let data = {
        PInfo: {
          ActiveNidRevisit: '00000000-0000-0000-0000-000000000000',
          HasNidProc: false,
          Info: this.results.Info
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        },
        PFormName: 'Request'
      }
      data.PInfo.Info.NidNosaziCode = this.nosaziCode
      data.PInfo.Info.NidProc = this.workItemResult.data.NidProc
      data.PInfo.Info.NidWorkItem = this.workItemResult.data.NidWorkItem
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
        this.attachInfo.NidWorkItem = ''
        this.attachInfo.WorkflowTitel = ''
        this.isEditable = false
        this.m = 'r'
        this.isSearch = false

        const strNosaziCode = convertNosaziCodeObjectToString(this.nosaziCode)

        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: 'کد نوسازی'
        })

        if (this.workItemResult.data.NidWorkItem === 0) {
          this.showError('عملیات موفقیت آمیز نبود.')
        } else {
          this.showSuccess(
            '  \t درخواست با شماره ' +
              this.workItemResult.data.NidWorkItem +
              '  ثبت گردید \t   .'
          )
        }
        this.isSearch = false
        // this.$store.dispatch('kartable/clearKartableState')
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
            bizCodeTitle: 'کد نوسازی'
          })

          if (self.attachResult.success) {
            self.attachResults = self.attachResult.data
            self.showAttachList = true
            self.$emit('showMainForm', {
              isAttach: self.showAttachList,
              attachList: self.attachResults
            })
          }
        })
        .catch(response => {
          this.serverError()
          console.log('erro3r', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showConfirmCode () {
      if (this.results.Info.Cellphone !== '') {
        this.isShowConfirmcode = true
      } else {
        this.showError('ابتدا شماره همراه باید وارد شده باشد.')
      }
    },
    closeConfirmCode () {
      this.isShowConfirmcode = false
      this.showWarning('شماره همراه شما تایید نشد.')
    }
  },
  mounted () {
    alert('2')
    this.results.Info = {
      RequesterNationalCode: '',
      BuyerName: '',
      MainRequesterNo: '',
      MandateNo: '',
      SecretariatNo: '',
      CI_Requester: 0,
      TelephoneNo: '',
      BuyerNationalCode: '',
      MainRequesterDate: '',
      SecretariatDate: '',
      RequesterName: '',
      Cellphone: '',
      PostCode: '',
      BuyerCellphone: '',
      MainRequesterName: '',
      TransferDang: '',
      EMail: '',
      RequesterAddress: '',
      Comment: ''
    }
    this.requesterType = 0
  }
}
</script>
