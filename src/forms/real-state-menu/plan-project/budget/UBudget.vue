<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title">
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              ciName="CI_Year"
              domainName="Estate"
              label="سال"
              ref="CI_YearUBudget"
              v-model="CI_Year"
              :m="mode === 'r' ? 'e' : 'r'"
              label-width="70px"
              cdcName="CI_Year"
            />
          </form-control>
          <form-control>
            <safa-combo
              ciName="CI_Region"
              domainName="Estate"
              label="منطقه"
              v-model="CI_Region"
              m="e"
              label-width="70px"
              cdcName="CI_Region"
            />
          </form-control>
          <div><btn-search @click="loadObj" /></div>
        </form-row>
        <safa-grid
          v-model="budgetInfoList"
          cdcName="budgetInfoList"
          title="اطلاعات بودجه"
          helper="budgetInfoColumns"
          :deleteRow="false"
          height="100%"
          fit
          :m="mode"
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveObj"
        >
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
      title: "اطلاعات بودجه",
      formKey: "FED4FA31-911E-49CB-9AE2-C66D89BCB628",
      name: "UBudget",
      main: true,

      // Var
      CI_Year: 1397,
      CI_Region: 1,
      budgetInfoList: [],

      // Res
      loadObjRes: null,
      saveObjRes: null
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.CI_YearUBudget.$data.datasource) {
        this.CI_Year = this.$refs.CI_YearUBudget.$data.datasource[0].ID
      }
      setTimeout(() => {
        this.loadObj()
      }, 200)
    }, 300)
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payLoad = {
        PCI_Year: this.CI_Year,
        pCI_Region: this.CI_Region
      }
      this.$services.ES.getBudgetInfo(payLoad)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.budgetInfoList =
              this.loadObjRes.data.GetBudget_InfoResult.Budget_Info
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      this.showLoading()
      const payLoad = {
        PObj: {
          Budget_Info: this.budgetInfoList,
          CI_BudgetRow: "",
          _CI_Region: this.CI_Region,
          _CI_Year: this.CI_Year
        }
      }
      this.$services.ES.saveBudgetInfo(payLoad)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.loadObj()
            this.isEditable = false

            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDec: "ذخیره لیست اطلاعات بودجه با موفقیت انجام شد"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
