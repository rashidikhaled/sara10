<template>
  <fit>
    <safa-checkbox
      label="عدم نمایش فیش های باطله"
      v-model="loadCancelFiches"
      @click="reloadFichesList"
      cdcName="loadCancelFiches"
      class="q-mb-sm"
    />
    <safa-splitter v-model="splitterModel">
      <template v-slot:before>
        <safa-datatable
          helper="nosaziFich1"
          v-model="fichesResults.DutyFichesPayCount"
          @click="click"
          title="لیست فیش ها"
          cdcName="DutyFichesPayCount"
        />
      </template>
      <template v-slot:after>
        <safa-datatable
          helper="nosaziFich2"
          v-model="dutyFicheSubResults.DutyFicheSub"
          title="جزئیات فیش ها"
          cdcName="dutyFicheDetail"
        />
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  data: function () {
    return {
      fichesResults: { DutyFichesPayCount: [], DutyFicheSub: [] },
      selectedFiche: null,
      dutyFicheSubResults: { DutyFicheSub: [] },
      splitterModel: 50
    }
  },
  mixins: [baseFormMixin],
  props: {
    results: Array,
    loadCancelFiches: Boolean,
    selectedNosaziCode: Object,
    codeInfoResults: Object,
    name: {
      type: String,
      default: "NosaziFich"
    },
    title: { type: String, default: "" },
    formKey: { type: String, default: "" }
  },
  methods: {
    reloadFichesList () {
      this.showLoading()
      let data = {
        pNidList: this.codeInfoResults.NidList,
        pSysCiDutyType: 1,
        pUnLoadCancelFiches: this.loadCancelFiches
      }

      this.$services.SB.getDutyFichesPayCount(data)
        .then(({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
          }
        })
        .catch((response) => {
          console.debug("fich error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    click (event, dataItem, target) {
      this.selectedFiche = dataItem
      this.getDutyFicheSubs()
    },
    getDutyFicheSubs () {
      this.showLoading()
      let data = { pNidFiche: this.selectedFiche.NidFiche }
      this.$services.SB.getDutyFicheSubs(data)
        .then(async ({ data }) => {
          this.dutyFicheSubResult = this.getResponse(data)

          if (this.dutyFicheSubResult.success) {
            this.dutyFicheSubResults = this.dutyFicheSubResult.data

            await this.log({
              action: this.logActions.view
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  watch: {
    loadCancelFiches () {
      this.reloadFichesList()
    }
  },
  mounted () {
    if (this.codeInfoResults.NidList.length !== 0) {
      this.reloadFichesList()
    }
  }
}
</script>
