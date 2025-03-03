<template>
  <fit>
    <safa-checkbox
      label="عدم نمایش فیش های باطله"
      v-model="loadCancelFiches"
      @click="reloadFichesList"
      cdcName="loadCancelFiches"
      class="q-mb-sm"
    ></safa-checkbox>
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
    <template>
      <div class="q-gutter-sm q-mt-sm">
        <btn-default label="تأیید" />
        <btn-default label=" تأیید با پوز" />
        <btn-default label="تاریخچه ی پوز" />
        <btn-default label="تأیید لحظه ای بانک شهر" />
        <btn-default label="تأیید لحظه ای بانک شهر 2" />
        <btn-default label="تأیید لحظه ای بانک" />
        <btn-default label="قطعیت صدور" />
        <btn-cancel label="ابطال" />
        <btn-cancel label="استرداد" />
      </div>
    </template>
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
    selectedNosaziCode: String,
    codeInfoResults: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
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
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کد نوسازی"
            })
          } else {
            this.showError("خطایی رخ داده است")
          }
        })
        .catch((response) => {
          this.fichesResult = this.getResponse(response)
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
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کد نوسازی"
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
