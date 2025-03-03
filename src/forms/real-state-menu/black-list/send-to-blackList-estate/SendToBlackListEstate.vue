<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper title="ارسال به لیست سیاه" vertical>
      <template #header>
        <div class="flex wrap justify-between items-center">
          <span
            :title="`کد قدیم: ${PreCodes || '---'}`"
            class="ellipsis"
            style="max-width: 200px; margin-left: 5px"
          >
            کد قدیم: {{ ` ${PreCodes}  ` || "---" }}
          </span>
          <form-header-by-nosazi-code
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            @fetched="fetched"
            class="col"
          />
        </div>
        <safa-status :result="loadWorkflowListRes" />
        <safa-status :result="requestResult" />
        <safa-status :result="getaNosaziCodeInBlackListRes" />
        <safa-status :result="sendToBlackListRes" />
        <safa-status :result="smsResult" />
        <safa-status :result="baseLibResults" />
        <safa-status :result="sendResults" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="model.CI_BlackListCause"
              cdcName="CI_BlackListCause"
              ciName="CI_BlackListCause"
              domainName="CI_SaraM1"
              label="علت ورود به لیست سیاه"
              label-width="95px"
              :m="baseNosaziCode.District === 0 ? 'r' : 'e'"
            />
          </FormControl>
          <FormControl>
            <safa-combo-enum
              v-model="model.BlackListControl"
              cdcName="BlackListControl"
              enum-name="EumBlackListControl"
              label="نوع کنترل"
              label-width="95px"
              :m="baseNosaziCode.District === 0 ? 'r' : 'e'"
              required
              validations="required"
            />
          </FormControl>
          <!-- <FormControl>
            <safa-text
              v-model="model.PreCode"
              cdcName=" PreCode"
              label="کد قدیم"
              label-width="95px"
              :m="baseNosaziCode.District === 0 ? 'r' : 'e'"
            />
          </FormControl> -->
        </FormRow>
        <safa-grid
          v-model="model.allowedReq"
          :addRow="false"
          :allowCopy="false"
          :allowMultipleSelection="true"
          :allowReload="false"
          :deleteRow="false"
          cdcName="shWorkflowList"
          fit
          height="100%"
          :columns="allowedReqColumn"
          max-height="100%"
          min-height="100px"
          paginate
          title=" درخواست های مجاز"
          :m="baseNosaziCode.District === 0 ? 'r' : 'e'"
        />
      </fit>
      <div class="q-my-sm">
        <text-template
          v-model="model.EnterComments"
          :rows="3"
          cdcName="EnterComments"
          formKey="f0f5e97c-bb30-474f-88d1-7d20915527fe"
          label="توضیحات ورود به لیست سیاه"
          label-width="95px"
          :m="baseNosaziCode.District === 0 ? 'r' : 'e'"
        />
      </div>
      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-default label="ارسال به لیست سیاه" @click="saveObj" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
// import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ارسال به لیست سیاه",
      formKey: "30A1A7A5-D5A5-40B3-9202-986EA4E463FF",
      name: "SendToBlackListEstate",
      main: true,
      sidebarCompatible: true,

      requestResult: null,
      loadWorkflowListRes: null,
      getaNosaziCodeInBlackListRes: null,
      sendToBlackListRes: null,
      sendResults: null,
      smsResult: null,
      baseLibResults: null,
      nosaziCodesInBlackList: { NosaziCodeInBlackList: [] },
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
        EnterComments: "",
        allowedReq: [],
        BlackListControl: 0,
        CI_BlackListCause: 0,
        PreCode: 0
      },
      allowedReqColumn: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          title: "عنوان درخواست",
          field: "WorkflowTitel",
          width: "auto"
        }
      ]
    }
  },
  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District === 0 ? 1 : this.baseNosaziCode.District
        }
      }
    },
    PreCodes () {
      const tmp = this.baseLibResults ?? {}
      if (tmp && tmp.Base_PreCodeInfo) {
        return tmp.Base_PreCodeInfo.map((m) => m.PreCode).toString() || "---"
      } else return "---"
    }
  },
  mounted () {
    this.loadWorkFlow()
  },
  methods: {
    fetched (e) {
      this.baseLibResults = e
      this.nosaziCode = this.baseLibResults._NidNosaziCode
      this.loadWorkFlow()
    },
    loadWorkFlow () {
      const payload = {}
      this.showLoading()
      this.$services.SA.loadWorkflowList(payload, this.config)
        .then(async ({ data }) => {
          this.loadWorkflowListRes = this.getResponse(data)
          if (this.loadWorkflowListRes.success) {
            this.model.allowedReq =
              this.loadWorkflowListRes?.data?.Sh_WorkflowList ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "بارگذاری لیست درخواست های مجاز انجام گردید."
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    SendToBlackList () {
      if (!this.isValidForm()) return
      if (!this.baseLibResults) return this.showError("لطفا کد نوسازی را وارد نمایید.")
      const payload = {
        pBlack: {
          CI_BlackListCause: this.model.CI_BlackListCause,
          Domain: "Sara8", // تو زمل سرا8 ست شده
          EnterComments: this.model.EnterComments,
          EnterDate: "",
          EnterTime: "",
          EumBlackListControl: this.model.BlackListControl,
          EumBlackListStatus: 0,
          ExitComments: "",
          ExitDate: "",
          ExitTime: "",
          NidBlack: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: this.nosaziCode,
          NidUserEnter: this.getNidUser(),
          NidUserExit: "00000000-0000-0000-0000-000000000000",
          UserEnter: this.getUserDisplayName(),
          UserExit: ""
        },
        pBlackWorkflow: this.selectedRows
      }
      this.$services.SA.sendToBlackList(payload, this.config)
        .then(async ({ data }) => {
          this.sendToBlackListRes = this.getResponse(data)
          if (this.sendToBlackListRes.success) {
            this.sendResults = this.sendToBlackListRes.data
            this.showSuccess("کد نوسازی با موفقیت به لیست سیاه افزوده شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: "کد نوسازی",
              saveDesc: "ارسال به لیست سیاه"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      const payload = { pNidNosaziCode: this.nosaziCode }
      this.$services.SA.getaNosaziCodeInBlackList(payload, this.config)
        .then(async ({ data }) => {
          this.getaNosaziCodeInBlackListRes = this.getResponse(data)
          if (this.getaNosaziCodeInBlackListRes.success) {
            this.nosaziCodesInBlackList =
              this.getaNosaziCodeInBlackListRes.data
            this.SendToBlackList()
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `  ${this.nosaziCode}گرفتن کد نوسازی`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }

    // ارسال اس ام اس در زمل این فرم کامنت شده ولیییی در سرا8 میییزنهههه:/
    // async sendSMS () {
    //   if (!this.selectMessage && !this.model.SMSBody) {
    //     return this.showError("هیچ پیامی انتخاب نشده است.")
    //   }
    //   if (!this.selectNumber) {
    //     return this.showError("هیچ شماره تلفنی انتخاب نشده است.")
    //   }
    //   try {
    //     const { data } = await this.$services.sendSMS.SendSMS({
    //       pParameter: {
    //         AppName: "Estate",
    //         BizCode: this.selectedRequest.BizCode,
    //         Number: this.selectNumber,
    //         SMSType: "ارسال به لیست سیاه",
    //         ScheduleSendDate: currentDate(),
    //         UserID: this.getNidUser(),
    //         UserName: this.getUserDisplayName(),
    //         Text: "پرونده شما به دلیل نامشخص به لیست سیاه ارسال شد.&#xD;"
    //       }
    //     })
    //     this.smsResult = this.getResponse(data)
    //     if (this.smsResult.success) {
    //       this.showSuccess("پیامک با موفقیت ارسال شد.")
    //     }
    //   } catch (error) {
    //     this.serverError()
    //     console.log("error ...", error)
    //   }
    // }
  }
}
</script>
