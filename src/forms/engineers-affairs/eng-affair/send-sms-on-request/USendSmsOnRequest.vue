
<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20c96248-c0c2-4da0-bb07-9480b0c95dce"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadResult" />
        <safa-status :result="smsResult" />
        <safa-status :result="CI_SMSSendTxtResult" />

        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          :actions="false"
          m="r"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="messageInfo" label="اطلاعات پیامک" />
            <tab-menu name="numbersList" label="مهندسین" />
            <tab-menu name="numbersListConfirm" label="مهندسین تایید کننده" />
            <tab-menu name="numbersListOwners" label="مالکین" />
          </template>

          <tab-content name="messageInfo" padding>
            <fit>
              <div class="row q-gutter-sm q-mb-sm">
                <safa-combo
                  label="گروه پیامها"
                  label-width="110px"
                  v-model="smsGroup"
                  domainName="engineer"
                  ciName="CI_SMSSendGroup"
                  class="col-3"
                />
                <safa-text
                  label="ورود دستی متن پیامک"
                  label-width="110px"
                  v-model="model.SMSBody"
                  class="col-12 q-pr-sm"
                />
              </div>
              <safa-datatable
                helper="messagesList"
                v-model="messagesList"
                title="لیست پیامها"
                fit
                m="r"
                height="100%"
                max-height="100%"
                min-height="200px"
                :show-selected-checkbox="true"
                :allowMultipleSelection="true"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                selectable
                @selectedChange="selectedMessage"
                :take="20"
                paginate
              />
            </fit>
          </tab-content>
          <tab-content name="numbersList" :padding="false">
            <safa-datatable
              v-model="model.NumbersList"
              :columns="numbersListColumns"
              fit
              m="r"
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="true"
              selectable
              @selectedChange="selectedNumber"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </tab-content>
          <tab-content name="numbersListConfirm" :padding="false">
            <safa-datatable
              fit
              v-model="model.NumbersListConfirm"
              :columns="numbersListConfirm"
              m="r"
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </tab-content>
          <tab-content name="numbersListOwners" :padding="false">
            <safa-datatable
              v-model="model.NumbersListOwners"
              :columns="ownersColumns"
              fit
              m="r"
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </tab-content>
        </safa-tabs>
      </fit>

      <template #footer>
        <form-actions :m="mode" :showEditButton="false">
          <btn-default label="ارسال" @click="sendSMS" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "USendSmsOnRequest",
      title: "ارسال پیامک بر اساس درخواست",
      formKey: "ce774ada-9e62-493d-bea3-789a3c8a2308",
      main: true,

      loadResult: null,
      selectMessage: null,
      CI_SMSSendTxtResult: null,
      smsResult: null,
      selectNumber: null,
      smsGroup: 0,
      messagesList: [],
      model: {
        CI_SMSSendTxt: null,
        NumbersList: [],
        NumbersListConfirm: [],
        NumbersListOwners: [],
        SMSBody: null
      },
      activeTab: "messageInfo",

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      numbersListColumns: [
        { field: "IdentityCode", title: "کد عضویت", width: "200px" },
        { field: "PhoneOwnerName", title: "نام", width: "200px" },
        { field: "PhoneOwnerFamily", title: "نام خانوادگی", width: "200px" },
        { field: "PhoneNumber", title: "شماره موبایل", width: "150px" },
        {
          field: "CI_Ability",
          title: "نوع",
          width: "300px",
          editor: "combo",
          domain: "engineer"
        }
      ],
      numbersListConfirm: [
        { field: "IdentityCode", title: "کد عضویت", width: "200px" },
        { field: "PhoneOwnerName", title: "نام", width: "200px" },
        { field: "PhoneOwnerFamily", title: "نام خانوادگی", width: "200px" },
        { field: "PhoneNumber", title: "شماره موبایل", width: "150px" }
      ],
      ownersColumns: [
        { field: "IdentityCode", title: "کد ملی", width: "200px" },
        { field: "PhoneOwnerName", title: "نام", width: "200px" },
        { field: "PhoneOwnerFamily", title: "نام خانوادگی", width: "200px" },
        { field: "PhoneNumber", title: "شماره موبایل", width: "150px" }
      ]
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadData()
      this.getCI_SMSSendTxt()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("USendSmsOnRequest")
    }
  },

  methods: {
    loadData () {
      this.isEditable = false
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pDistrict: this.selectedDistrict
      }
      this.$services.commissions
        .getSMSNumber(payload)
        .then(async ({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.model = this.loadResult.data.GetSMSNumberResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "BizCode"
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedMessage (row) {
      this.selectMessage = row.dataItem.Title
    },
    selectedNumber (row) {
      this.selectNumber = row.dataItem.PhoneNumber
    },

    async sendSMS () {
      if (!this.selectMessage && !this.model.SMSBody) { return this.showError("هیچ پیامی انتخاب نشده است.") }
      if (!this.selectNumber) { return this.showError("هیچ شماره تلفنی انتخاب نشده است.") }
      try {
        const { data } = await this.$services.sendSMS.SendSMS({
          pParameter: {
            AppName: "Engineering",
            BizCode: this.selectedRequest.BizCode,
            Text: this.selectMessage || this.model.SMSBody,
            Number: this.selectNumber,
            SMSType: "ارسال پیامک از منو",
            ScheduleSendDate: currentDate(),
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        })
        this.smsResult = this.getResponse(data)
        if (this.smsResult.success) { this.showSuccess("پیامک با موفقیت ارسال شد.") }
      } catch (error) {
        this.serverError()
        console.log("error ...", error)
      }
    },

    getCI_SMSSendTxt () {
      this.isEditable = false
      this.showLoading()
      this.$services.engineers
        .getCISMSSendTxt({ pCI_SMSSendGroup: this.smsGroup })
        .then(({ data }) => {
          this.CI_SMSSendTxtResult = this.getResponse(data)
          if (this.CI_SMSSendTxtResult.success) {
            this.messagesList =
              this.CI_SMSSendTxtResult.data.GetCI_SMSSendTxtResult.CI_SMSSendTxt
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  watch: {
    smsGroup () {
      this.getCI_SMSSendTxt()
    }
  }
}
</script>
