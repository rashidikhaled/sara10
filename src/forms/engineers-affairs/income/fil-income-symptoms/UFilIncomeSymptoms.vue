<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
      <safa-status :result="result" />
      <fit>
        <div class="row q-mb-sm q-pl-sm q-gutter-sm">
          <div class="col-12 col-md-4 col-sm-3 col-lg-4">
            <safa-text label="کد ارجاع" v-model="NidWorkItem"></safa-text>
          </div>
          <div class="col-auto">
            <btn-default label="نمایش" class="q-mr-sm" @click="loadObj" />
            <btn-default label="محاسبه" @click="calculate" />
          </div>
        </div>
        <safa-tabs v-model="activeTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="Calculation" label="محاسبات نظارت" />
            <tab-menu name="DesignCalculation" label="محاسبات طراحی" />
            <tab-menu name="FichList" label="لیست فیشها" />
          </template>
          <tab-content name="Calculation">
            <fit>
            <safa-datatable
              helper="CalculationControl"
              height="100%"
              max-height="100%"
              fit
              paginate
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :bordered="false"
              v-model="model.CalculationControl"
            />

            </fit>
          </tab-content>
          <tab-content name="DesignCalculation">
            <fit>
            <safa-datatable
              helper="designCalculation"
              height="100%"
              max-height="100%"
              fit
              paginate
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :bordered="false"
              v-model="model.DesignCalculation"
            />
            </fit>
          </tab-content>
          <tab-content name="FichList">
            <fit>
            <FormRow class="q-my-sm">
              <FormControl>
                <safa-combo
                  ciName="CI_IncomeAbility"
                  domainName="engineer"
                  v-model="CI_IncomeAbility"
                />
              </FormControl>
            </FormRow>
            <safa-datatable
              helper="fichList"
              height="100%"
              max-height="100%"
              fit
              paginate
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              v-model="model.FichList"
              :bordered="false"
            />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <btn-default v-if="activeTab === 'Calculation'" label="صدور فیش" @click="exportFich" />
        <btn-default
          v-else-if="activeTab === 'DesignCalculation'"
          label="صدور فیش"
          :disable="true"
          @click="exportFich"
        />
        <div v-else-if="activeTab === 'FichList'">
          <btn-default label="چاپ فیش" class="q-mr-sm" @click="printFich" />
          <btn-default label="پرداخت فیش" />
        </div>
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
      title: "امور مهندسین ناظر- عوارض پرونده",
      formKey: "9ebfc956-4bd0-4403-95d1-08609a457111",
      name: "UFilIncomeSymptoms",
      main: true,
      model: {
        CalculationControl: [],
        DesignCalculation: [],
        FichList: []
      },
      EngineerRequestQta: [],
      result: null,
      activeTab: "Calculation",
      NidWorkItem: null,
      CI_IncomeAbility: 0
    }
  },
  mounted () {
    // this.loadObj();
  },

  methods: {
    async getEngDutyFiche () {
      try {
        this.showLoading()
        const payload = {
          pCI_Years: 0,
          pNidWorkItem: this.NidWorkItem
        }
        const { data } = await this.$services.engineers.getEngDutyFiche(
          payload
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model = this.result.data.GetEngDutyFicheResult
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getFicheListInNidWorkItem () {
      try {
        this.showLoading()
        const payload = {
          pNidWorkItem: this.NidWorkItem
        }
        const { data } =
          await this.$services.engineers.getFicheListInNidWorkItem(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model = this.result.data.GetFicheList_InNidWorkItemResult
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      if (this.NidWorkItem === null) {
        this.showError("لطفا کد ارجاع را وارد نمایید")
        return
      }
      await this.getEngDutyFiche()
      await this.getFicheListInNidWorkItem()
    },
    async calculate () {
      if (this.NidWorkItem === null) {
        this.showError("لطفا کد ارجاع را وارد نمایید")
        return
      }
      try {
        this.showLoading()
        const payload = {
          pCI_Years: 0,
          pNidWorkItem: this.NidWorkItem
        }
        const { data } = await this.$services.engineers.doCalcuteEngDutyFiche(
          payload
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model = this.result.data.DoCalcuteEngDutyFicheResult
          this.getEngDutyFiche()
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    exportFich () {
      this.showError("لطفا یک ردیف را انتخاب نمایید")
    },
    printFich () {
      this.showError("لطفا یک ردیف را انتخاب نمایید")
    }
  }
}
</script>
