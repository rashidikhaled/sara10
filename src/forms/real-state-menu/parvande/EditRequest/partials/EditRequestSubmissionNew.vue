<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label=" نوع درخواست "
          v-model="selectedWorkFlow"
          cdcName="selectedWorkFlow"
          sourceType="local"
          :options="workFlowItemArray"
          label-width="92px"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع متقاضی"
          v-model="requesterType"
          ciName="CI_Requester"
          domainName="Estate"
          label-width="92px"
          @input="requesterTypeInfo"
        />
      </FormControl>
      <FormControl v-if="showHaghighi">
        <safa-combo
          label="نام متقاضی"
          v-model="requesterName"
          required
          validations="required"
          label-width="92px"
          :options="ReqesterName"
          sourceType="local"
        />
      </FormControl>
      <FormControl v-else>
        <safa-text
          label="نام متقاضی"
          v-model="requesterNameText"
          label-width="92px"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی متقاضی "
          v-model="results.Info.RequesterNationalCode"
          cdcName="RequesterNationalCode"
          label-width="92px"
          mask="##########"
          :maxlength="10"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ارجاع شهرسازی "
          v-model="results.Info.SaraNidWorkItem"
          cdcName="RequesterNationalCode"
          label-width="92px"
          mask="##########"
          :maxlength="10"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی "
          label-width="92px"
          v-model="results.Info.PostCode"
          cdcName="PostCode"
          mask="##########"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تلفن"
          v-model="results.Info.TelephoneNo"
          cdcName="TelephoneNo"
          label-width="92px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره همراه"
          label-width="92px"
          v-model="results.Info.Cellphone"
          cdcName="Cellphone"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="شماره نامه"
          v-model="results.Info.MainRequesterNo"
          cdcName="MainRequesterNo"
          label-width="92px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه"
          v-model="results.Info.MainRequesterDate"
          cdcName="MainRequesterDate"
          label-width="92px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="دانگ مورد توافق"
          label-width="92px"
          v-model="results.Info.TransferDang"
          cdcName="MainRequesterName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label=" شماره دبیرخانه"
          v-model="results.Info.SecretariatNo"
          cdcName="SecretariatNo"
          label-width="92px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دبیرخانه"
          v-model="results.Info.SecretariatDate"
          cdcName="SecretariatDate"
          label-width="92px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع توافق"
          ciName="CI_ContractBuySubject"
          domainName="Estate"
          v-model="results.Info.SecretariatDate"
          label-width="92px"
        />
      </FormControl>
    </FormRow>
    <safa-text
      label="آدرس"
      v-model="results.Info.RequesterAddress"
      cdcName="RequesterAddress"
      label-width="92px"
      class="q-mb-sm"
    />
    <text-template
      label="توضیحات"
      v-model="results.Info.Comment"
      cdcName="Comment"
      formKey="243B3099-F29E-4F8E-84EA-A5DCC79D2C94"
      label-width="92px"
    />
    <safa-grid
      title="مشخصات وکیل/وکلا"
      min-height="100px"
      height="100%"
      max-height="100%"
      class="fit q-mt-sm"
      fit
      :columns="shTransferRequestBuyersColumns"
      v-model="results.Sh_TransferRequestBuyers"
      cdcName="Sh_TransferRequestBuyers"
      m="e"
    />
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
// import axios from 'axios'
// import { appendUrls } from 'src/utils'

export default {
  name: 'request-submission-new',
  mixins: [baseFormMixin],

  data: function () {
    return {
      requesterType: 0,
      CI_RequestInquiryKind: 0,
      workItemResult: {},
      requesterName: '',
      requesterLastName: '',
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
      showHaghighi: true,
      deleteResult: null,
      transferTypeOptions: [
        {
          ID: 0,
          Title: 'دانگ'
        },
        {
          ID: 1,
          Title: 'سهم'
        },
        {
          ID: 2,
          Title: 'حبه'
        },
        {
          ID: 3,
          Title: 'شهیر'
        }
      ],
      shTransferRequestBuyersColumns: [
        {
          field: 'AttorneyLetterNo',
          title: 'شماره وکالت',
          width: '150px',
          editor: 'numeric'
        },
        {
          field: 'AttorneyLetterDate',
          title: 'تاریخ وکالت',
          width: '150px',
          editor: 'date'
        },
        {
          field: 'OwnerName',
          title: 'نام مالک',
          width: '150px'
        },
        {
          field: 'AttorneyBureauNo',
          title: 'شماره دفترخانه تنظیم وکالت',
          width: '100px'
        },
        {
          field: 'AttorneyName',
          title: 'نام و نام خانوادگی',
          width: '150px'
        },
        {
          field: 'NationalCode',
          title: 'کد ملی',
          width: '100px'
        },
        {
          field: 'IDCardNo',
          title: 'شماره شناسنامه',
          width: '100px'
        },
        {
          field: 'AttorneyFatherName',
          title: 'نام پدر',
          width: '100px'
        },
        {
          field: 'Telephone',
          title: 'تلفن',
          width: '100px'
        },
        {
          field: 'Address',
          title: 'آدرس',
          width: '150px'
        },
        {
          field: 'Description',
          title: 'توضیحات',
          width: '200px'
        }
      ],
      ReqesterName: [],
      requesterNameText: ''
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

  mounted () {
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
      TransferType: 0,
      EMail: '',
      RequesterAddress: '',
      Comment: ''
    }
    this.requesterType = 0
  },

  methods: {
    async accept () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        let self = this
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
        console.log('addWorkItem')
        await this.addWorkItem()
        console.log('getInBlackList')
        const blacklist = await this.getInBlackList()
        console.log('getInBlackList::response', blacklist)
        console.log('saveRequest')
        const request = await this.saveRequest()
        console.log('saveRequest::response', request)

        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )

        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: 'کد نوسازی',
          nosaziCode: strNosaziCode
        })

        this.showSuccess(request.msg).onDismiss(() => {
          this.redirectToKartable()
          if (blacklist.msg) {
            this.showError(blacklist.msg)
          }
        })
      } catch (error) {
        console.log('catch error', error)
        await this.deleteProc()
        await this.deleteWorkItem()
        this.showError(error.message || error || '')
      } finally {
        console.log('finally')
        this.hideLoading()
      }
    },
    async update () {
      let updateLastRequestData = {
        pNidProc: this.workItemResult.data.data.ProcInfo.NidProc,
        pLastRequestState: '.درخواست ثبت شد'
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
            PropTitle: 'مقدار مورد انتقال',
            PropValue: this.results.Info.TransferDang
          },
          {
            PropName: 'TransferType',
            PropTitle: 'میزان مورد انتقال بر اساس',
            PropValue: this.results.Info.TransferType
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
        const WKT = await this.getWKT()
        let workItemData = {
          BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          EumOwnerType: 1,
          NidWorkflowDeff: this.selectedWorkFlow,
          ProcInitiator: this.getNidUser(),
          ProcRequester: `${this.requesterName} ${this.requesterLastName}`,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: 'سرا10',
          GroupName: 'شهرسازی',
          GroupTitel: 'شهرسازی',
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
              msg: 'کد نوسازی مورد نظر در لیست سیاه و در وضعیت هشدار قرار دارد.'
            })
            // this.showError(
            //   'کد نوسازی مورد نظر در لیست سیاه و در وضعیت هشدار قرار دارد.'
            // )
          }
          return resolve({ msg: '' })
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
        // const url = appendUrls([window.getConfigValue("srvMapUrl"), "MapFind2"])
        const { data } = await this.$services.srvMap.MapFind2({
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
          `${this.requesterName}` + ' ' + `${this.requesterLastName}`
        // const WKT = await this.getWKT()

        let data = {
          PInfo: {
            ActiveNidRevisit: '00000000-0000-0000-0000-000000000000',
            HasNidProc: false,
            Info: this.results.Info,
            Sh_TransferRequestBuyers: this.results.Sh_TransferRequestBuyers
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          },
          PFormName: 'Request',
          GroupName: 'ACE63A06-E835-457D-A1EA-3B477DD9E69B',
          GroupTitel: 'شهرسازی',
          ProcArea: 'سرا 10'
        }
        data.PInfo.Info.NidNosaziCode = this.nosaziCode
        data.PInfo.Info.NidProc =
          this.workItemResult.data.data.ProcInfo.NidProc
        data.PInfo.Info.NidWorkItem =
          this.workItemResult.data.data.ProcInfo.NidWorkItem
        data.PInfo.Info.NidWorkflowDeff = this.selectedWorkFlow
        data.PInfo.Info.EumRequestStatus = 0
        data.PInfo.Info.NidProc_Attached = this.attachInfo.NidProc
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
          this.attachInfo.NidWorkItem = ''
          this.attachInfo.WorkflowTitel = ''
          if (!this.workItemResult.data.data.ProcInfo.NidWorkItem) {
            return reject('عملیات موفقیت آمیز نبود.')
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
        console.log('workflow delete proc', data)
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        this.serverError()
        console.error('delete method', e)
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
        console.error('delete workitem method', e)
      }
    },
    requesterTypeInfo () {
      debugger
      if (this.requesterType === 1) {
        this.showHaghighi = true
        if (this.baseLibResults.Base_Owner.length !== 0) {
          // this.ReqesterName = this.baseLibResults.Base_Owner[0].OwnerName

          this.ReqesterName = this.baseLibResults.Base_Owner.map((x) => {
            const r = {}
            r.ID = x.NidOwner
            r.Title = `${x.OwnerName} ${x.OwnerLastName}`
            return r
          })
        }
        this.results.Info.RequesterAddress =
          this.baseLibResults.Base_AddressInfo.MainAddress
        this.results.Info.PostCode =
          this.baseLibResults.Base_AddressPostCode.length > 0
            ? this.baseLibResults.Base_AddressPostCode[0].PostCode
            : null
      } else {
        this.showHaghighi = false
      }
    }
  }
}
</script>
