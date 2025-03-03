<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <fit>
      <form-wrapper :title="title" vertical>
        <safa-status :result="result" />

        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="کد نوسازی"
              v-model="model.FilInfo.Fil_Info.CodeString"
              label-width="60px"
              m="r"
            ></safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره مجوز"
              v-model="model.FilInfo.Fil_Info.ExportLicenseNo"
              label-width="60px"
              m="r"
            ></safa-text>
          </FormControl>
        </FormRow>
        <safa-datatable
          helper="Owners_Eng"
          height="100%"
          max-height="100%"
          fit
          paginate
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          class="q-mb-sm"
          title="مالکین"
          v-model="model.FilInfo.Fil_Owner"
          m="r"
        />
        <safa-splitter v-model="gridsplitter" horizontal>
          <template #before>
            <safa-datatable
              helper="References"
              height="200px"
              max-height="100%"
              fit
              paginate
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              title="ارجاعات"
              v-model="model.RefInfo_List"
              m="r"
            />
          </template>
          <template #after>
            <safa-datatable
              helper="RevisitResult"
              height="200px"
              max-height="100%"
              fit
              paginate
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              title="نتیجه بازدید"
              v-model="model.Fil_RevisitDetails"
              :m="mode"
            />
          </template>
        </safa-splitter>
        <div class="q-mt-sm">
          <text-template
            label="توضیحات و نظر کارشناس"
            label-width="100px"
            :rows="3"
            class="col-12"
            v-model="model.Fil_Revisit.Comments"
            :m="mode"
          />
        </div>

        <template v-slot:footer>
          <FormActions
            :m="mode"
            @edit="isEditable = true"
            @cancel="isEditable = false"
            @save="saveObj"
          >
            <template>
              <btn-default label="گزارش" />
            </template>
          </FormActions>
        </template>
      </form-wrapper>
    </fit>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "امور مهندسین ناظر - بازدید",
      formKey: "7387E4B4-3BED-4857-914A-D714E24234A5",
      name: "URevisitMohandesin",
      main: true,
      gridsplitter: 50,
      model: {
        FilInfo: {
          Fil_Info: {
            CodeString: "",
            ExportLicenseNo: 0
          },
          Fil_Owner: []
        },
        RefInfo_List: [],
        Fil_RevisitDetails: [],
        Fil_Revisit: {
          Comments: ""
        }
      },
      result: null
    }
  },
  created () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.")
      this.hideSidebar("URevisitMohandesin")
    }
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc
        }
        const { data } = await this.$services.engineers.loadFilRevisit(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model = this.result.data.LoadFil_RevisitResult
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const payload = {
          pObj: { ...this.model }
        }
        const { data } = await this.$services.engineers.saveFilRevisit(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.showError("ذخیره با موفقیت انجام شد.")
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
    // print() {
    //   const reportPath =
    //     "/Sara8Reports/RptShahrsaziIncomeFactor";
    //   const queryParams = {
    //     NidIncome: this.selectedRow.NidIncome,
    //     District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
    //       .District,
    //     RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@99@80",
    //     NIdUser: this.getNidUser(),
    //   };
    //   this.showReport(reportPath, queryParams);
    // },
  }
}
</script>
