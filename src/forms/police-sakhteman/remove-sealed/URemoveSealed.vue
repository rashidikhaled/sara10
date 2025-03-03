<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="پلیس ساختمان- رفع پلمب"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSealedOperationListRes" />
        <safa-status :result="getSealedRemoveRes" />
        <safa-status :result="saveSealedRemoveRes" />
        <safa-status :result="confirmLicenseRes" />
      </template>

      <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
        <template v-slot:before>
          <fit>
            <safa-datatable2
              v-model="gvList"
              fit
              class="fit q-mb-sm"
              title="رفع پلمپ"
              min-height="150px"
              m="r"
              ref="removeSealed"
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
                  v-if="row[col.field] && row.EumSealedOperationType === 4"
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
            <safa-tabs v-model="activeTab">
              <template v-slot:tabs>
                <tab-menu name="plumb" label="پلمب" />
                <tab-menu name="communicated" label="ابلاغ" />
              </template>

              <tab-content name="plumb">
                <fit>
                  <FormRow class="q-mb-sm" :xl="4" :lg="4" :md="4" :sm="4">
                    <FormControl>
                      <safa-text
                        v-model="dataContext.SealedOperation.OperationNo"
                        label="شماره "
                        label-width="55px"
                        m="r"
                      />
                    </FormControl>
                    <FormControl>
                      <safa-datepicker
                        v-model="dataContext.SealedOperation.OperationDate"
                        label="تاریخ"
                        label-width="55px"
                        :m="mode"
                      />
                    </FormControl>
                    <FormControl>
                      <safa-timepicker
                        v-model="dataContext.SealedOperation.OperationTime"
                        label="ساعت"
                        label-width="55px"
                        :m="mode"
                      />
                    </FormControl>
                  </FormRow>
                  <div class="row">
                    <text-template
                      v-model="dataContext.SealedOperation.Comments"
                      label="توضیحات"
                      label-width="55px"
                      :m="mode"
                      formKey="5e90e77e-b455-45ba-a0d6-9c6d7f7f4baa"
                    />
                  </div>
                </fit>
              </tab-content>
              <tab-content name="communicated">
                <safa-label
                  style="color: blue; font-weight: 500"
                  class="block q-mb-sm"
                >
                  شرایط ابلاغ قانونی
                </safa-label>
                <FormRow :xl="2" :lg="2" :md="2" :sm="2">
                  <FormControl>
                    <safa-combo
                      v-model="dataContext.ClsProphecy.Prophecy.CI_Article"
                      label="عنوان ماده ابلاغ:"
                      label-width="155px"
                      :m="mode"
                      domainName="BuildingPolice"
                      ciName="CI_Article"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      v-model="dataContext.ClsProphecy.Prophecy.RecipientName"
                      label="نام و نام خانوادگی تحویل گیرنده:"
                      label-width="155px"
                      :m="mode"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      v-model="dataContext.ClsProphecy.Prophecy.Post"
                      label="سمت:"
                      label-width="155px"
                      :m="mode"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      v-model="
                        dataContext.ClsProphecy.Prophecy.NotificationOfficer
                      "
                      label="مامور ابلاغ:"
                      label-width="155px"
                    />
                  </FormControl>
                </FormRow>
              </tab-content>
            </safa-tabs>
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
          <btn-default label="صدور گواهی" @click="btnReportClick" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import PersianDate from "persian-date"

export default {
  name: "URemoveSealed",

  mixins: [baseFormMixin],

  data () {
    return {
      title: "رفع پلمب",
      formKey: "47602f89-37bc-4cfc-8e87-27f8facd576b",
      name: "URemoveSealed",
      main: true,

      // Models
      gvList: [],
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
      getSealedRemoveRes: null,
      saveSealedRemoveRes: null,
      confirmLicenseRes: null,

      // Tabs
      activeTab: "plumb"
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
            this.gvList =
              this.getSealedOperationListRes.data.SealedOperationList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش لیست رفع پلمب روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
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

    loadDetails (pNidOper) {
      this.showLoading()
      this.nidOper = pNidOper
      const payload = {
        pNidProc: this.selectedNidProc,
        pNidOper
      }

      this.$services.SH.getSealedRemove(payload)
        .then(({ data }) => {
          this.getSealedRemoveRes = this.getResponse(data)

          if (this.getSealedRemoveRes.success) {
            this.dataContext = this.getSealedRemoveRes.data
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

    setMode (readMode) {
      this.isEditable = !readMode
    },

    save () {
      this.showLoading()

      let tmpObj = { ...this.dataContext }
      tmpObj.SealedOperation.UserName = this.getUserDisplayName()
      tmpObj.SealedOperation.NidUser = this.getNidUser()
      tmpObj.SealedOperation.NidOper = tmpObj.NidOper
      tmpObj.SealedOperation.NidProc = tmpObj.NidProc
      tmpObj.SealedOperation.EumSealedOperationType = 4

      const payload = {
        pDistrict: this.selectedDistrict,
        pObj: tmpObj
      }

      this.$services.SH.saveSealedRemove(payload)
        .then(async ({ data }) => {
          this.saveSealedRemoveRes = this.getResponse(data)

          if (this.saveSealedRemoveRes.success) {
            this.setMode(true)
            this.loadObj()
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره دستور رفع پلمب روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
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

    btnClick (tag) {
      switch (tag) {
        // New
        case 1:
          this.setMode(false)
          this.loadDetails("00000000-0000-0000-0000-000000000000")
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
      if (tmpContext != null && tmpContext.EumSealedOperationType === 4) {
        this.loadDetails(tmpContext.NidOper)
        this.setMode(false)
      }
    },

    btnReportClick () {
      let tmpSel = null,
        engTitle = "Output_SMRafePolomp",
        licenseDate = "",
        licenseNo = "",
        domain = "BuildingPolice",
        reportName = "/BuildingPolice/SMRafePolomp"

      if (this.$refs.removeSealed.currentSelectedRow !== null) {
        tmpSel = { ...this.$refs.removeSealed.currentSelectedRow }
        licenseNo = tmpSel.OperationNo
        licenseDate = new PersianDate().toLocale("en").format("L")
      } else {
        this.showError("ردیف موردنظر انتخاب نشده")
        return false
      }
      this.showLoading()

      let tmpOutput = {
        OutputEngTitle: `${engTitle}${licenseNo}`,
        OutputPerTitle: "گواهی پلیس ساختمان",
        NidProc: this.selectedNidProc,
        ExportNidUser: this.getNidUser(),
        ExportUserName: this.getUserDisplayName(),
        ReportName: reportName,
        LicenseDate: licenseDate,
        LicenseNo: licenseNo
      }

      const payload = {
        pDtoOut: tmpOutput,
        pReportPath: reportName,
        pReportDomain: this.selectedDistrict,
        pArchiveDomain: domain,
        pNidOper: tmpSel.NidOper
      }

      this.$services.SH.confirmLicense(payload)
        .then(async ({ data }) => {
          this.confirmLicenseRes = this.getResponse(data)

          if (this.confirmLicenseRes.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `صدور گواهی روی شماره ${licenseNo} انجام گردید.`
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
    }
  }
}
</script>
