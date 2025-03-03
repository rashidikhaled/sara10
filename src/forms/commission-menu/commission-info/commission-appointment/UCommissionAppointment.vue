<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getCommissionGharar" />
        <safa-status :result="saveCommissionGhararRes" />
        <safa-status :result="getArchivesRes" />
      </template>

      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره دبیرخانه"
              label-width="80px"
              :m="mode"
              v-model="model.SecNo"
              cdcName="SecNo"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ دبیرخانه"
              label-width="80px"
              :m="mode"
              v-model="model.SecDate"
              cdcName="SecDate"
            />
          </FormControl>
        </FormRow>
        <safa-text
          label="توضیحات"
          label-width="80px"
          type="textarea"
          v-model="model.Description"
          cdcName="Description"
          :m="mode"
          fit
          :rows="10"
        />
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template v-slot:after>
            <btn-default label="پیش نمایش پاسخ قرار" @click="print" />
            <btn-default
              label="تاییدیه"
              @click="confirmation"
              spId="ac7f5594-fca4-43ce-94c7-5541ca19af25"
              spCaption="دکمه تاییدیه قرار"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
// import { uid } from "quasar"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "قرار کمیسیون",
      name: "UCommissionAppointment",
      formKey: "badbf938-ee27-414f-8df4-6fa440f8fa70", // "fd6c3e97-04cf-4f34-ae14-6ec12f1de04b"
      main: true,

      getCommissionGharar: null,
      saveCommissionGhararRes: null,
      getArchivesRes: null,
      isView: false,

      model: {
        Description: "",
        IsAccept: false,
        NidCommission: "00000000-0000-0000-0000-000000000000",
        SecDate: "",
        SecNo: "",
        StrDate: "",
        StrTime: "",
        UserNameRegister: ""
      }
    }
  },
  created () {
    if (this.selectedNidCommission) {
      debugger
      this.loadObj()
    } else {
      this.hideSidebar("UCommissionAppointment")
      this.showError(
        "لطفا یک پرونده کمیسیون از کارتابل کمیسیون انتخاب نمایید."
      )
    }
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.getCommissionGharar({
          pNidCommission: this.selectedNidCommission
        })
        this.getCommissionGharar = this.getResponse(data)
        if (this.getCommissionGharar.success) {
          this.model = this.getCommissionGharar.data.GetCommission_GhararResult
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission.BizCode,
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} با شماره ارجاع ${this.selectedCommission?.UrbanNidRequest ?? ''} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.saveCommissionGharar({
          pCommission_Gharar: {
            ...this.model,
            UserNameRegister: this.getUserDisplayName()
          }
        })
        this.saveCommissionGhararRes = this.getResponse(data)
        if (this.saveCommissionGhararRes.success) {
          this.isEditable = false
          if (
            this.saveCommissionGhararRes.data.SaveCommission_GhararResult
              .IsAccept
          ) {
            await this.getArchives()
          }
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            nosaziCode: this.selectedCommission.BizCode,
            saveDesc: `ذخیره اطلاعات فرم ${this.title} با شماره ارجاع ${this.selectedCommission?.UrbanNidRequest ?? ''} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
    },
    async getArchives () {
      try {
        const { data } = await this.$services.commissions.getArchives({
          pRequest: { NIDCommission: this.selectedNidCommission }
        })
        this.getArchivesRes = this.getResponse(data)
        if (this.getArchivesRes.success) {
          await this.print()
          // const TmpParameters = { NidCommission: this.selectedNidCommission }
          // const payload = {
          //   ClsArchive: {
          //     ReportName: `/CommissionReports/ComReport/RptResponseGharar`,
          //     DomainName: "Commission",
          //     BizCode: this.getArchivesRes.data.GetArchivesResult.length > 0
          //       ? this.getArchivesRes.data.GetArchivesResult.find(
          //         (a) => a.CI_ArchiveGroup === 4
          //       ).RootSubject || ""
          //       : "",
          //     FileName: "RptResponseGharar_" + uid(),
          //     Parameters: TmpParameters
          //   }
          // }
          // console.log('payload :>> ', payload)
          // await this.$service.post(
          //   "systemReportUrl",
          //   "ExportToArchive",
          //   payload
          // )
        }
      } catch (e) {
        console.error(e)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      const reportPath =
        "/ComReport/RptResponseGharar"
      const queryParams = {
        NidUser: this.getNidUser(),
        NidCommission: this.selectedNidCommission
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidCommission,
        bizCodeTitle: "NidCommission",
        nosaziCode: this.selectedCommission.BizCode,
        saveDesc: `پیش نمایش پاسخ قرار در فرم  ${this.title} با شماره ارجاع ${this.selectedCommission?.UrbanNidRequest ?? ''} انجام گردید.`
      })
    },
    confirmation () {
      this.showConfirm("آیا برای تایید اطمینان دارید؟").onOk(() => {
        this.model.IsAccept = true
        this.saveObj()
      })
    }
  }
}
</script>
