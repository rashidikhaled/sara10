<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="loadObjRes" />
      <safa-status :result="sendMessageRes" />
      <safa-status :result="sendTextRes" />
      <safa-status :result="getSMSBodyRes" />
      <fit>
        <safa-tabs v-model="activeTab" fit>
          <template v-slot:tabs>
            <tab-menu name="messageInfo" label="اطلاعات پیامک" />
            <tab-menu name="owners" label="متقاضی و مالکین" />
          </template>

          <tab-content name="messageInfo">
            <fit>
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-combo
                    label="گروه پیامها"
                    label-width="80px"
                    v-model="ciSMSSendGroup"
                    domainName="CI_SaraM1"
                    ciName="CI_SMSSendGroup"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ مراجعه"
                    label-width="80px"
                    v-model="txtDate"
                  />
                </FormControl>
                <FormControl>
                  <safa-timepicker
                    label="ساعت مراجعه"
                    label-width="80px"
                    v-model="txtTime"
                  />
                </FormControl>
              </FormRow>
              <safa-grid
                title="لیست پیامها"
                fit
                :columns="messagesColumns"
                m="r"
                height="100%"
                max-height="100%"
                min-height="100px"
                :show-selected-checkbox="true"
                :allowMultipleSelection="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                paginate
                v-model="gvList"
                :pageSize="20"
                ref="msgRef"
              />
            </fit>
          </tab-content>
          <tab-content name="owners" :padding="false">
            <safa-grid
              title="لیست متقاضیان"
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
              :pageSize="20"
              ref="reqRef"
            />
            <!-- ID="GRID_2191638e-77e9-4b18-b3de-a251091974af" -->
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <btn-default label="ارسال" @click="saveObj" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ارسال پیامک بر اساس درخواست",
      name: "USendMessage",
      formKey: "0952dfff-0714-447d-b66a-a36ed80cd4bd",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // model
      model: {
        NumbersList: []
      },

      // tab
      activeTab: "messageInfo",

      // var
      loadObjRes: null,
      sendMessageRes: null,
      sendTextRes: null,
      getSMSBodyRes: null,
      ciSMSSendGroup: 0,
      txtDate: "",
      txtTime: "",
      gvList: [],
      gvOwners: [],

      messagesColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "45px",
          filterable: false,
          headerCheckboxSelection: true,
          lockPosition: true,
          resizable: false,
          pinned: "right",
          editor: "selection"
        },
        { field: "Title", title: "عنوان پیام", width: "auto" }
      ],
      requesterColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "45px",
          filterable: false,
          headerCheckboxSelection: true,
          lockPosition: true,
          resizable: false,
          pinned: "right",
          editor: "selection"
        },
        { field: "SMSPhoneType", title: "نوع", width: "150px" },
        { field: "PhoneOwnerName", title: "نام", width: "150px" },
        // { field: "PhoneOwnerFamily", title: "نام خانوادگی", width: "150px" },
        { field: "PhoneNumber", title: "شماره تلفن", width: "auto" }
      ]
    }
  },

  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
      this.getCISMSSendTxt()
    } else this.hideSidebar(this.name)
  },
  methods: {
    async loadObj () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: "00000000-0000-0000-0000-000000000000"
      }
      try {
        const { data } = await this.$services.SC.getSMSNumber(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data ?? { NumbersList: [] }
          const list =
            res.NumbersList.map((m) => {
              return { ...m, isSelectedNode: false }
            }) ?? []
          this.model = {
            ...res,
            NumbersList: list
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
          })
        } else {
          this.showError("شماره ای برای ارسال پیامک موجود نمی باشد")
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async getCISMSSendTxt () {
      this.showLoading()
      try {
        const { data } = await this.$services.SC.getCISMSSendTxt({
          pCI_SMSSendGroup: this.ciSMSSendGroup
        })
        this.sendTextRes = this.getResponse(data)
        if (this.sendTextRes.success) {
          this.gvList =
            this.sendTextRes?.data?.CI_SMSSendTxt?.map((m) => {
              return { ...m, isSelectedNode: false }
            }) ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      const msgList = this.$refs.msgRef?.gridApi.getSelectedRows() || []
      const reqNombers = this.$refs.reqRef?.gridApi.getSelectedRows() || []
      if (msgList.length === 0)
      { return this.showError("لطفا پیام مورد نظر را انتخاب کنید") }
      if (reqNombers.length === 0)
      { return this.showError("شماره ای جهت دریافت پیامک انتخاب نشده است.") }
      const pSendTexts = msgList.map(m => m.Title)

      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        },
        pSendTexts,
        pReferDate: this.txtDate === '' ? null : this.txtDate,
        pReferTime: this.txtTime === '' ? null : this.txtTime,
        pSMSNumber: reqNombers
      }
      // console.log(payload, 'payload')
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getSMSBody(payload)
        this.getSMSBodyRes = this.getResponse(data)
        if (this.getSMSBodyRes.success) {
          const SMSBody = this.getSMSBodyRes?.data?.SMSBody ?? ''
          const numbers = reqNombers.map((m) => m.PhoneNumber).toString()
          await this.sendMessage(numbers, SMSBody)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async sendMessage (Number, Text) {
      try {
        this.showLoading()
        const payload = {
          pParameter: {
            AppName: "Sara10",
            BizCode: this.selectedRequest.BizCode,
            Number,
            SMSType: "ارسال پیامک از گردش کار",
            ScheduleSendDate: currentDate(),
            Text,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        // console.log("===================>", payload)
        const { data } = await this.$services.sendSMS.SendSMS(payload)
        this.sendMessageRes = this.getResponse(data)
        if (this.sendMessageRes.success) {
          this.showError(
            `ارسال پیامک به ${Number} با موفقیت انجام گردید.`
          )
          await this.log({
            action: this.logActions.send,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "NidProc",
            saveDesc: `پیامک به ${Number} ارسال گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.showError(
          `عملیات ارسال پیامک به ${Number} با خطا مواجه شد.`
        )
      } finally {
        this.hideLoading()
      }
    }
  },
  watch: {
    ciSMSSendGroup () {
      this.getCISMSSendTxt()
    }
  }
}
</script>
