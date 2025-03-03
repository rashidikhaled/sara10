<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="پلیس ساختمان- اجرائیات"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSealedOperationListRes" />
        <safa-status :result="getSealedRes" />
        <safa-status :result="saveSealedRes" />
      </template>

      <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
        <template v-slot:before>
          <fit>
            <safa-datatable2
              v-model="gvPolomp"
              cdcName="gvPolomp"
              fit
              class="fit q-mb-sm"
              title="اجرائیات"
              min-height="150px"
              m="r"
              ref="frmExecution"
              helper="removeSealed"
              :showRowNumber="false"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
            > <!-- تاریخ قابل ویرایش نیست -->
              <template #cell-EumSealedOperationType="{ row, col }">
                <btn-default
                  v-if="row[col.field] && row.EumSealedOperationType === 11"
                  label="ویرایش"
                  class="full-width"
                  @click="btnEditClick(row)"
                />
                <safa-label v-else></safa-label>
              </template>
            </safa-datatable2>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <FormRow class="q-mb-sm" :xl="4" :lg="4" :md="4" :sm="4">
              <FormControl>
                <safa-text
                  v-model="dataContext.SealedOperation.OperationNo"
                  cdcName="OperationNo"
                  label="شماره "
                  label-width="55px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  v-model="dataContext.SealedOperation.OperationDate"
                  cdcName="OperationDate"
                  label="تاریخ"
                  label-width="55px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-timepicker
                  v-model="dataContext.SealedOperation.OperationTime"
                  cdcName="OperationTime"
                  label="ساعت"
                  label-width="55px"
                  :m="mode"
                />
              </FormControl>
              <FormComtrol
                v-if="dataContext.SealedOperation.SealedOperationCIList"
              >
                <safa-combo
                  v-model="dataContext.SealedOperation.SealedOperationCIList"
                  cdcName="SealedOperationCIList"
                  label="جزئیات"
                  label-width="55px"
                  domainName="BuildingPolice"
                  ciName="CI_PolombLack"
                  :m="mode"
                />
              </FormComtrol>
            </FormRow>
            <div class="row">
              <text-template
                v-model="dataContext.SealedOperation.Comments"
                cdcName="Comments"
                label="توضیحات"
                label-width="55px"
                :m="mode"
                formKey="e333f5dc-0a66-4200-ae0d-a2ac3d97d041"
              />
            </div>
          </fit>
        </template>
      </safa-splitter>
      <template #footer>
        <form-actions
          :showNewButton="true"
          :showEditButton="false"
          :m="mode"
          @newInfo="btnClick(1)"
          @save="btnClick(2)"
          @cancel="btnClick(3)"
        >
          <btn-default
            v-if="!isEditable"
            label="گزارش"
            @click="btnReportClick"
          />
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
      title: "اجرائیات",
      formKey: "1743F529-564C-45A6-BE22-F7C43B0E6026",
      name: "UFrmExecution",
      main: true,

      // Models
      gvPolomp: [],
      isView: false,
      dataContext: {
        SealedOperation: {},
        ClsProphecy: {
          Prophecy: {}
        }
      },
      nidProc: "00000000-0000-0000-0000-000000000000",
      splitterModel: 70,

      // Responses
      getSealedOperationListRes: null,
      getSealedRes: null,
      saveSealedRes: null
    }
  },

  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.getSealedOperationList({
        pNidProc: this.selectedNidProc
      })
        .then(async ({ data }) => {
          this.getSealedOperationListRes = this.getResponse(data)
          if (this.getSealedOperationListRes.success) {
            this.gvPolomp =
              this.getSealedOperationListRes?.data?.SealedOperationList ?? []
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode ?? "",
                bizCodeTitle: "کدنوسازی",
                nosaziCode: this.selectedRequest.BizCode ?? "",
                nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
                saveDesc: `نمایش لیست اجرائیات برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
              })
            }
            this.isView = true
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

    loadDetails (pNidOper) {
      this.showLoading()
      this.nidOper = pNidOper
      const payload = {
        pNidProc: this.selectedNidProc,
        pNidOper
      }
      this.$services.SH.getSealed(payload)
        .then(async ({ data }) => {
          this.getSealedRes = this.getResponse(data)
          if (this.getSealedRes.success) {
            this.dataContext = this.getSealedRes.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode ?? "",
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode ?? "",
              nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
              saveDesc: `نمایش جزئیات اجرائیات برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
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

    setMode (readMode) {
      this.isEditable = !readMode
      if (!readMode) this.clearValues()
    },

    clearValues () {
      this.dataContext.SealedOperation.OperationNo = ""
      this.dataContext.SealedOperation.OperationDate = ""
      this.dataContext.SealedOperation.OperationTime = ""
      this.dataContext.SealedOperation.SealedOperationCIList = null
      this.dataContext.SealedOperation.Comments = ""
    },

    save () {
      let tmpObj = { ...this.dataContext }
      tmpObj.SealedOperation.UserName = this.getUserDisplayName()
      tmpObj.SealedOperation.NidUser = this.getNidUser()
      tmpObj.SealedOperation.NidOper = tmpObj.NidOper
      tmpObj.SealedOperation.NidProc = tmpObj.NidProc
      tmpObj.SealedOperation.EumSealedOperationType = 11
      this.showLoading()
      this.$services.SH.saveSealed({
        pDistrict: this.selectedDistrict,
        pObj: tmpObj
      })
        .then(async ({ data }) => {
          this.saveSealedRes = this.getResponse(data)

          if (this.saveSealedRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.BizCode ?? "",
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode ?? "",
              nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
              saveDesc: `ذخیره اجرائیات برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
            })
            this.setMode(true)
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
    },

    btnClick (tag) {
      switch (tag) {
        // New
        case 1:
          this.loadDetails("00000000-0000-0000-0000-000000000000")
          this.setMode(false)
          break

        // Save
        case 2:
          this.save()
          break

        // Cancel
        case 3:
          this.setMode(true)
          this.loadObj()
          break
      }
    },

    btnEditClick (row) {
      let tmpContext = { ...row }
      if (tmpContext != null && tmpContext.EumSealedOperationType === 11) {
        this.loadDetails(tmpContext.NidOper)
        this.setMode(false)
      }
    },

    async btnReportClick () {
      const reportPath =
        "/BuildingPolice/Execution"
      const queryParams = {
        NidProc: this.selectedNidProc
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.BizCode ?? "",
        bizCodeTitle: "کدنوسازی",
        nosaziCode: this.selectedRequest.BizCode ?? "",
        nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
        saveDesc: `نمایش گزارش برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
      })
    }
  }
}
</script>
