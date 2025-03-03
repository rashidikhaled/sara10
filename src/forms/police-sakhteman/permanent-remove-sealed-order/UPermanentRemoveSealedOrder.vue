<template>
  <safa-form
    :id="formKey"
    caption="دستور رفع پلمب دائم"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="result" />
        <safa-status :result="confirmOutputResult" />
      </template>
      <safa-datatable
        helper="SealedOperationList"
        fit
        height="100%"
        max-height="100%"
        v-model="model.SealedOperationList"
        cdcName="SealedOperationList"
        m="r"
        @row-click="selectedRow"
      />
      <FormRow class="q-my-sm" :lg="3" :xl="3" :md="3" :sm="2">
        <FormControl>
          <safa-text
            label="شماره"
            label-width="100px"
            m="r"
            v-model="model.SealedOperation.OperationNo"
            cdcName="OperationNo"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ دستور رفع پلمب"
            label-width="100px"
            :m="mode"
            v-model="model.SealedOperation.OperationDate"
            cdcName="OperationDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label=" ساعت دستور رفع پلمب"
            label-width="100px"
            :m="mode"
            v-model="model.SealedOperation.OperationTime"
            cdcName="OperationTime"
          />
        </FormControl>
      </FormRow>
      <div class="col-12">
        <text-template
          label="توضیحات"
          label-width="100px"
          :m="mode"
          :rows="5"
          v-model="model.SealedOperation.Comments"
          cdcName="Comments"
          formKey="c2917194-1969-4ec8-8caa-1a9ac3df18d8"
        />
      </div>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="editData"
          @save="saveObj"
          @cancel="reset"
        >
          <template v-slot:after>
            <btn-default label="جدید" @click="newData" />
            <btn-delete label=" صدور گواهی" @click="confirmLicense" />
          </template>
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
      title: "دستور رفع پلمب دائم",
      name: "UPermanentRemoveSealedOrder",
      formKey: "3cc5de40-4e32-4c34-a076-ef13719ae852",
      main: true,
      workflowCompatible: true,

      model: {
        SealedOperation: {
          OperationNo: "",
          OperationDate: "",
          OperationTime: "",
          Comments: ""
        },
        SealedOperationList: []
      },
      result: null,
      district: 1,
      getSealedRemoveOrderPermResult: null,
      nidOper: "00000000-0000-0000-0000-000000000000",
      licenseNo: "",
      confirmOutputResult: null
    }
  },
  created () {
    this.district = convertStringToNosaziCodeObject(
      this.selectedRequest.BizCode
    ).District
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc
        // pNidProc: "036eb933-963b-45a1-865e-e4c1e452cbb4"
      }
      this.$services.SH.getSealedOperationList(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model.SealedOperationList =
              this.result.data.SealedOperationList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش لیست دستور رفع پلمب دائم روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          this.showError(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newData () {
      this.getSealedRemoveOrderPerm("00000000-0000-0000-0000-000000000000")
    },
    editData () {
      this.getSealedRemoveOrderPerm(this.nidOper)
    },
    getSealedRemoveOrderPerm (nidOper) {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pNidOper: nidOper
      }
      this.$services.SH.getSealedRemoveOrderPerm(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.isEditable = true
            this.model.SealedOperation = this.result.data.SealedOperation
            this.getSealedRemoveOrderPermResult = this.result.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش لیست رفع پلمب شده ها روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.getSealedRemoveOrderPermResult.SealedOperation.NidProc =
        this.selectedRequest.NidProc
      this.getSealedRemoveOrderPermResult.SealedOperation.NidUser =
        this.getNidUser()
      this.getSealedRemoveOrderPermResult.SealedOperation.EumSealedOperationType = 6
      const payload = {
        pDistrict: this.district,
        pObj: {
          ...this.getSealedRemoveOrderPermResult
        }
      }
      this.$services.SH.saveSealedRemoveOrderPerm(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره دستور رفع پلمب دائم روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.loadObj()
            this.isEditable = false
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
    selectedRow (row) {
      this.model.SealedOperation = row
      this.nidOper = row.NidOper
      this.licenseNo = row.OperationNo
    },
    reset () {
      this.isEditable = false
      this.model.SealedOperation = {}
    },
    confirmLicense () {
      this.showLoading()
      const nosaziObj = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      const payload = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          LicenseDate: currentDate(),
          LicenseNo: this.licenseNo,
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_SMRafePolomp333422/05",
          OutputPerTitle: "گواهی پلیس ساختمان",
          ReportName: "/BuildingPolice/RptDastoorRafePolomp"
        },
        pReportPath: "/Sara8Reports/RptLicence" + `${this.licenseNo}`,
        pArchiveDomain: nosaziObj.District,
        pReportDomain: nosaziObj.District,
        pNidOper: this.nidOper
      }
      this.$services.SH.confirmLicense(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.confirmOutputResult = this.getResponse(data)
          if (this.confirmOutputResult.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `صدور گواهی روی شماره ${this.licenseNo} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          console.log(" error ...", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
