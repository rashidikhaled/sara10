
<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getDeliverStuffCouncilListRes" />
        <safa-status :result="saveDeliverRes" />
      </template>
      <safa-tabs v-model="activeTab" :padding="true">
        <template v-slot:tabs>
          <tab-menu name="list" label="لیست" />
          <tab-menu name="newCouncil" label="صورتمجلس جدید" />
        </template>
        <tab-content name="list">
          <fit>
            <safa-datatable
              title="لیست"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="DeliverStuffCouncilList"
              cdcName="DeliverStuffCouncilList"
              :columns="councilColumns"
              paginate
              :take="20"
              :m="mode"
              :addRow="true"
              :allowCopy="true"
              :isEditable="true"
              :isDeleteabl="true"
              class="q-mb-sm"
            />
            <div>
              <btn-new label="صورتمجلس جدید" @click="newConcil" />
            </div>
          </fit>
        </tab-content>
        <tab-content name="newCouncil">
          <fit>
            <form-row class="q-mb-sm">
              <form-control>
                <safa-text
                  label="شماره صورتمجلس"
                  label-width="90px"
                  v-model="model.DeliverStuffCouncilNo"
                />
              </form-control>
              <form-control>
                <safa-datepicker
                  label="تاریخ"
                  label-width="40px"
                  v-model="model.DeliverStuffCouncilDate"
                />
              </form-control>
            </form-row>
            <safa-datatable
              title="جزئیات"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="DeliverStuffCouncil_Details"
              cdcName="DeliverStuffCouncil_Details"
              :columns="detailsColumns"
              paginate
              :take="20"
              :m="mode"
              :addRow="true"
              :allowCopy="true"
              :isEditable="true"
              :isDeleteabl="true"
              class="q-mb-sm"
            />
            <text-template
              label="توضیحات"
              label-width="80px"
              :m="mode"
              v-model="model.Description"
              cdcName="DeliverStuffCouncil_Details"
            />
          </fit>
        </tab-content>
      </safa-tabs>
      <template #footer v-if="activeTab === 'newCouncil'">
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        >
          <btn-default label="گزارش" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "صورتمجلس تحویل لوازم و مصالح ساختمانی",
      formKey: "AF217597-9DBA-4A74-BDBC-A8CD01F12797",
      name: "UDeliverStuffCouncil",
      main: true,
      workflowCompatible: true,
      sidebarCompatible: true,

      activeTab: "list",
      activeTabNewCouncil: "Council",
      getDeliverStuffCouncilListRes: null,
      saveDeliverRes: null,
      model: {
        DeliverStuffCouncilNo: "",
        DeliverStuffCouncilDate: "",
        Description: ""
      },
      DeliverStuffCouncilList: [],
      councilColumns: [
        {
          title: "شماره صورتمجلس",
          field: "DeliverStuffCouncilNo",

          width: "100px"
        },
        {
          title: "تاریخ صورتمجلس",
          field: "DeliverStuffCouncilDate",

          width: "100px"
        },
        { title: "توضیحات", field: "Comments", width: "400px" },
        { title: "کاربر", field: "UserName", width: "150px" },
        { title: "تاریخ ثبت", field: "EnterDate", width: "150px" },
        { title: "ساعت ثبت", field: "EnterTime", width: "150px" }
      ],
      DeliverStuffCouncil_Details: [],
      detailsColumns: [
        {
          title: "نوع ابزار / مصالح",
          field: "CI_Stuff",
          editor: "combo",
          domain: "BuildingPolice",
          cell: "grid-combo"
        },
        {
          title: "تعداد/مقدار",
          field: "StuffValue"
        }
      ]
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.hideSidebar(this.name)
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.getDeliverStuffCouncilList({
        pNidProc: this.selectedRequest.NidProc // "ef68344e-b8fc-45de-95bd-4b5ab68504ae",
      })
        .then(async ({ data }) => {
          this.getDeliverStuffCouncilListRes = this.getResponse(data)
          if (this.getDeliverStuffCouncilListRes.success) {
            this.DeliverStuffCouncilList =
              this.getDeliverStuffCouncilListRes.data.DeliverStuffCouncilList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `نمایش صورتمجلس تحویل لوازم و مصالح ساختمانی برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
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

    newConcilLoad () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc, // "ef68344e-b8fc-45de-95bd-4b5ab68504ae",
        pNidDeliver: "00000000-0000-0000-0000-000000000000",
        EnterDate: this.model.DeliverStuffCouncilDate
      }
      this.showLoading()
      this.$services.SH.getDeliverStuffCouncilList(payload)
        .then(async ({ data }) => {
          this.getDeliverStuffCouncilListRes = this.getResponse(data)
          if (this.getDeliverStuffCouncilListRes.success) {
            this.model =
              this.getDeliverStuffCouncilListRes.data.DeliverStuffCouncilList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `نمایش صورتمجلس جدید برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
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

    newConcil () {
      this.activeTab = "newCouncil"
      this.newConcilLoad()
    },

    saveData () {
      const payload = {
        pDeliverStuffCouncil: {
          model: {
            Comments: this.model.Description,
            DeliverStuffCouncilDate: this.model.DeliverStuffCouncilDate,
            NidUser: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
      }
      this.showLoading()
      this.$services.SH.saveDeliverStuffCouncil(payload)
        .then(async ({ data }) => {
          this.saveDeliverRes = this.getResponse(data)
          console.log(this.saveDeliverRes)
          if (this.saveDeliverRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `ذخیره صورتمجلس تحویل لوازم و مصالح ساختمانی برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
            })
            this.loadObj()
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
  }
}
</script>
