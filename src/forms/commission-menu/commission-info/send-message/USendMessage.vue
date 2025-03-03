<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" :padding="false">
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="messageInfo" label="اطلاعات پیامک" />
          <tab-menu name="owners" label="متقاضی و مالکین" />
        </template>

        <tab-content name="messageInfo" padding>
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  label="گروه پیامها"
                  label-width="80px"
                  v-model="CI_SMSSendGroup"
                  domainName="CI_SaraM1"
                  ciName="CI_SMSSendGroup"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ مراجعه"
                  label-width="80px"
                  v-model="VisitDate"
                />
              </FormControl>
              <FormControl>
                <safa-timepicker
                  label="ساعت مراجعه"
                  label-width="80px"
                  v-model="VisitTime"
                />
              </FormControl>
            </FormRow>
            <safa-datatable
              title="لیست پیامها"
              fit
              :columns="messagesColumns"
              m="r"
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </fit>
        </tab-content>
        <tab-content name="owners" :padding="false">
          <safa-datatable
            fit
            :columns="requesterColumns"
            m="r"
            height="100%"
            max-height="100%"
            min-height="200px"
            :show-selected-checkbox="true"
            :allowMultipleSelection="true"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            paginate
            v-model="model.NumbersList"
          />
        </tab-content>
      </safa-tabs>
    </fit>

    <template #footer>
      <form-actions :m="mode" :showEditButton="false">
        <btn-default label="ارسال" @click="sendMessage" />
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "ارسال پیامک بر اساس درخواست",
      name: "USendMessage",
      formKey: "5e9b5bb1-7abe-41cd-9026-d923d6318df6",
      sidebarCompatible: true,
      workflowCompatible: true,

      main: true,
      model: {
        NumbersList: []
      },
      activeTab: "messageInfo",
      CI_SMSSendGroup: null,
      messagesList: [],
      messagesColumns: [
        { field: "Title", title: "عنوان پیام", width: "300px" }
      ],
      requesterColumns: [
        { field: "SMSPhoneType", title: "نوع", width: "150px" },
        { field: "PhoneOwnerName", title: "نام", width: "150px" },
        { field: "PhoneOwnerFamily", title: "نام خانوادگی", width: "150px" },
        { field: "PhoneNumber", title: "شماره تلفن", width: "150px" }
      ],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      VisitDate: "",
      VisitTime: ""
    }
  },

  mounted () {
    if (this.selectedCommission !== null) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedCommission.BizCode
      )
      this.loadData(this.selectedCommission.NidProc)
    } else {
      return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  },

  methods: {
    loadData (NidProc) {
      this.isEditable = false
      this.showLoading()
      const payload = {
        pNidProc: NidProc,
        pDistrict: this.baseNosaziCode.District
      }
      this.$services.commissions
        .getSMSNumber(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.data.GetSMSNumberResult.NumbersList.length !== 0) {
            this.model = res.data.GetSMSNumberResult
            await this.log({
              action: this.logActions.view,
              bizCode: NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          } else {
            return this.showError("شماره ای برای ارسال پیامک موجود نمی باشد")
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    sendMessage () {
      return this.showError("هیچ پیامی انتخاب نشده است.")
    },

    getCI_SMSSendTxt () {
      this.isEditable = false
      this.showLoading()
      const payload = {
        pCI_SMSSendGroup: this.CI_SMSSendGroup
      }
      this.$services.commissions
        .getCISMSSendTxt(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.messagesList = res.data.GetCI_SMSSendTxtResult.CI_SMSSendTxt
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  watch: {
    CI_SMSSendGroup () {
      this.getCI_SMSSendTxt()
    }
  }
}
</script>
