<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSealedRes" />
        <safa-status :result="getSealedOperationListRes" />
        <safa-status :result="saveSealedRes" />
        <safa-status :result="confirmOutputResult" />
      </template>
      <fit>
        <safa-datatable
          title="لیست عملیات"
          v-model="model.SealedOperationList"
          cdcName="SealedOperationList"
          helper="sealedOperationListColumns"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="true"
          :checkboxSelection="true"
          :showDeletingConfirm="true"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          fit
          m="r"
          @selectedChange="selectedChange"
        />
        <FormRow class="q-mt-sm">
          <FormControl>
            <safa-text
              label="شماره"
              label-width="60px"
              v-model="model.SealedOperation.OperationNo"
              cdcName="OperationNo"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="60px"
              v-model="model.SealedOperation.OperationDate"
              cdcName="OperationDate"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="ساعت"
              label-width="60px"
              v-model="model.SealedOperation.OperationTime"
              cdcName="OperationTime"
              :m="mode"
            />
          </FormControl>
          <div class="col-12 q-mb-sm">
            <text-template
              label="توضیحات"
              label-width="60px"
              v-model="model.SealedOperation.Comments"
              cdcName="Comments"
              :m="mode"
              :rows="2"
            />
          </div>
        </FormRow>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          :showNewButton="!isEditable"
          @edit="editObj"
          @newInfo="handelNew"
          @save="saveObj"
          @cancel="cancel"
        >
          <template #after>
            <btn-default label="صدور گواهی" @click="confirmLicense" />
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
      name: "RequestRemoveSealed",
      title: "تقاضای رفع پلمپ",
      formKey: "1743F529-564C-45A6-BE22-F7C43B0E6026",
      main: true,
      workflowCompatible: true,

      // #services
      getSealedRes: null,
      getSealedOperationListRes: null,
      saveSealedRes: null,

      // #variables
      isView: true,
      model: {
        SealedOperationList: [],
        SealedOperation: {
          OperationNo: "",
          OperationDate: "",
          OperationTime: "",
          Comments: ""
        }
      },
      result: null,
      nidOper: "00000000-0000-0000-0000-000000000000",
      getSealedResult: null,
      licenseNo: "",
      confirmOutputResult: null,
      selectedOper: null
    }
  },
  created () {
    if (this.selectedRequest) {
      this.loadObj()
    }
  },
  methods: {
    async getSealed (nidOper) {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          // pNidProc: "ef68344e-b8fc-45de-95bd-4b5ab68504ae",
          pNidOper: nidOper
        }
        const { data } = await this.$services.SH.getSealed(payload)
        this.getSealedRes = this.getResponse(data)
        if (this.getSealedRes.success) {
          this.model.SealedOperation = this.getSealedRes.data.SealedOperation
          this.getSealedResult = this.getSealedRes.data
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc
          // pNidProc: "ef68344e-b8fc-45de-95bd-4b5ab68504ae"
        }
        const { data } = await this.$services.SH.getSealedOperationList(
          payload
        )
        this.getSealedOperationListRes = this.getResponse(data)
        if (this.getSealedOperationListRes.success) {
          this.model.SealedOperationList =
            this.getSealedOperationListRes.data.SealedOperationList
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش لیست پلمب روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        this.showLoading()
        this.getSealedResult.SealedOperation.NidProc =
          this.selectedRequest.NidProc
        this.getSealedResult.SealedOperation.NidUser = this.getNidUser()
        this.getSealedResult.SealedOperation.EumSealedOperationType = 12
        const payload = {
          pDistrict: this.selectedDistrict,
          pObj: { ...this.model }
        }
        const { data } = await this.$services.SH.saveSealed(payload)
        this.saveSealedRes = this.getResponse(data)
        if (this.saveSealedRes.success) {
          this.showSuccess("ذخیره ی اطلاعات با موفقیت انجام شد.")
          this.isEditable = false
          await this.loadObj()
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.taskInfo.NidWorkItem,
            saveDesc: `ذخیره تقاضای رفع پلمپ روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async handelNew () {
      this.getSealed("00000000-0000-0000-0000-000000000000")
      this.isEditable = true
    },

    cancel () {
      this.selectedOper = null
      this.nidOper = null
      this.licenseNo = null
      this.model.SealedOperation = {}
      this.isEditable = false
    },

    editObj () {
      if (!this.selectedOper) {
        return this.showError("لطفا یک سطر از لیست عملیات را انتخاب نمایید.")
      } else this.isEditable = true
    },
    async selectedChange ({ dataItem, selectedItems }) {
      const tmp = selectedItems.length > 0 ? dataItem : null
      this.selectedOper = tmp
      this.model.SealedOperation = tmp
      this.nidOper = tmp.NidOper
      this.licenseNo = tmp.OperationNo

      await this.getSealed(this.nidOper)
      this.isEditable = true
    },
    confirmLicense () {
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
          OutputEngTitle: "Output_RequestRemoveSealed",
          OutputPerTitle: "گواهی پلیس ساختمان",
          ReportName:
            "/BuildingPolice/RequestRemoveSealed" + `${this.licenseNo}`
        },
        pReportPath: "/BuildingPolice/RequestRemoveSealed",
        pArchiveDomain: "BuildingPolice",
        pReportDomain: nosaziObj.District,
        pNidOper: this.nidOper
      }
      this.showLoading()
      this.$services.SH.confirmLicense(payload)
        .then(async ({ data }) => {
          this.confirmOutputResult = this.getResponse(data)
          if (this.confirmOutputResult.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.taskInfo.NidWorkItem,
              saveDesc: `صدور گواهی روی شماره ${this.licenseNo} انجام گردید.`
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
  }
}
</script>
