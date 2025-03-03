<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption=" پلیس ساختمان- پلمب"
  >
    <form-wrapper :title="title">
      <safa-status :result="result" />
      <safa-status :result="getSealedRes" />
      <safa-status :result="saveSealedRes" />
      <fit>
        <safa-datatable
          fit
          height="100%"
          max-height="100%"
          helper="PlompOperationList"
          :allowMultipleSelection="false"
          :paginate="true"
          v-model="model.SealedOperationList"
          cdcName="SealedOperationList"
          class="q-mb-sm"
          m="r"
          @EditClick="editObj"
          @row-click="selectedRow"
        />
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="plumb" label="پلمب" />
            <tab-menu name="Communicated" label="ابلاغ" />
          </template>

          <tab-content name="plumb">
            <fit>
              <FormRow class="q-mb-sm" :xl="4" :lg="4" :md="3" :sm="3">
                <FormControl>
                  <safa-text
                    label="شماره "
                    m="r"
                    label-width="70px"
                    v-model="model.SealedOperation.OperationNo"
                    cdcName="OperationNo"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ"
                    label-width="70px"
                    :m="mode"
                    v-model="model.SealedOperation.OperationDate"
                    cdcName="OperationDate"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="ساعت پلمب "
                    label-width="70px"
                    :m="mode"
                    v-model="model.SealedOperation.OperationTime"
                    cdcName="OperationTime"
                  />
                </FormControl>
              </FormRow>
              <div class="row">
                <text-template
                  label="توضیحات"
                  label-width="70px"
                  v-model="model.SealedOperation.Comments"
                  cdcName="Comments"
                  formKey="b2917194-1969-4ec8-8caa-1a9ac3df18d6"
                  :m="mode"
                  :rows="3"
                />
              </div>
              <safa-grid
                fit
                height="100%"
                max-height="100%"
                helper="sealedOperationDetails"
                :allowMultipleSelection="false"
                :paginate="true"
                v-model="model.SealedOperationCIList"
                cdcName="SealedOperationCIList"
                :m="mode"
                class="q-mt-sm"
                title="جزئیات"
              />
            </fit>
          </tab-content>
          <tab-content name="Communicated">
            <FormRow class="q-mb-sm" :xl="2" :lg="2" :md="2" :sm="2">
              <FormControl>
                <safa-combo
                  label="عنوان ماده ابلاغ"
                  label-width="120px"
                  :m="mode"
                  v-model="model.ClsProphecy.Prophecy.CI_Article"
                  cdcName="CI_Article"
                  domainName="BuildingPolice"
                  ciName="CI_Article"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="نام و نام خانوادگی تحویل گیرنده"
                  label-width="120px"
                  v-model="model.ClsProphecy.Prophecy.RecipientName"
                  cdcName="RecipientName"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="سمت"
                  label-width="120px"
                  v-model="model.ClsProphecy.Prophecy.Post"
                  cdcName="Post"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="مامور ابلاغ"
                  label-width="120px"
                  v-model="model.ClsProphecy.Prophecy.NotificationOfficer"
                  cdcName="NotificationOfficer"
                />
              </FormControl>
            </FormRow>
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :showNewButton="true"
          :showEditButton="false"
          :m="mode"
          @newInfo="newObj"
          @save="saveObj"
          @cancel="reset"
        >
          <btn-default  label="گزارش" @click="Report" />
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
      title: "پلمب",
      formKey: "31f32389-f457-435a-9f4b-fc21d36b1e6f",
      name: "USeal",
      main: true,

      activeTab: "plumb",
      model: {
        SealedOperation: {
          OperationNo: "",
          OperationDate: "",
          OperationTime: "",
          Comments: "",
          EumSealedOperationType: 0
        },
        SealedOperationCIList: [],
        SealedOperationList: [],
        ClsProphecy: {
          Prophecy: {
            CI_Article: 0,
            RecipientName: "",
            Post: "",
            NotificationOfficer: ""
          }
        }
      },
      result: null,
      nidOper: "00000000-0000-0000-0000-000000000000",
      getSealedRes: null,
      saveSealedRes: null,
      dataContext: {},
      nidProc: "00000000-0000-0000-0000-000000000000"
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    async Report () {
      if (this.nidOper === "00000000-0000-0000-0000-000000000000") {
        this.showError("لطفا یک مورد را انتخاب نمایید.")
      }
      const reportPath =
        "/BuildingPolice/SMPolomp"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidOper: this.nidOper
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.confirmOutput,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `نمایش گزارش روی شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
      })
    },
    selectedRow (row) {
      this.nidOper = row.NidOper
    },
    editObj ({ dataItem }) {
      this.model.SealedOperation = dataItem
      this.nidOper = dataItem.NidOper
      this.newObj(this.nidOper)
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc
        // pNidProc: "52d0ffe0-69cc-43ce-9ce9-0097d54e2379"
      }
      this.$services.SH.getSealedOperationList(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش لیست پلمب روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            if (this.result.data.SealedOperation != null) {
              this.model.SealedOperation = this.result.data.SealedOperation
            }
            this.model.SealedOperationList =
              this.result.data.SealedOperationList
            this.nidOper = this.result.data.NidOper
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
    newObj (nidOper) {
      this.isEditable = true
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        // pNidProc: "52d0ffe0-69cc-43ce-9ce9-0097d54e2379",
        pNidOper: nidOper
      }
      this.$services.SH.getSealed(payload).then(({ data }) => {
        this.getSealedRes = this.getResponse(data)
        if (this.getSealedRes.success) {
          this.dataContext = this.getSealedRes.data
          this.model.SealedOperation = this.getSealedRes.data.SealedOperation
          this.model.SealedOperationCIList =
            this.getSealedRes.data.SealedOperationCIList
          this.model.ClsProphecy.Prophecy =
            this.getSealedRes.data.ClsProphecy.Prophecy
        }
      })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let tmpObj = { ...this.dataContext }
      tmpObj.SealedOperation.UserName = this.getUserDisplayName()
      tmpObj.SealedOperation.NidUser = this.getNidUser()
      tmpObj.SealedOperation.NidOper = this.nidOper
      tmpObj.SealedOperation.NidProc = this.selectedRequest.NidProc
      tmpObj.SealedOperation.EumSealedOperationType = 2
      tmpObj.SealedOperationCIList = this.model.SealedOperationCIList
      const payload = {
        pDistrict: this.selectedDistrict,
        pObj: tmpObj
      }
      this.$services.SH.saveSealed(payload)
        .then(async ({ data }) => {
          this.saveSealedRes = this.getResponse(data)
          if (this.saveSealedRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره پلمب روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.loadObj()
            this.isEditable = false
            this.reset()
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
    reset () {
      this.isEditable = false
      this.model.SealedOperation = {}
    }
  }
}
</script>
