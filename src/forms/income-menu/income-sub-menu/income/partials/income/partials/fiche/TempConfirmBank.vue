<template>
  <form-wrapper>
    <safa-status :result="result" />
    <div class="q-mt-sm">
      <safa-combo
        label="کد بانک"
        ciName="CI_Bank"
        domainName="CI_SaraM1"
        v-model="selectedBank"
        cdcName="selectedBank"
      />
    </div>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save
          label="تأیید"
          @click="confirm"
        />
        <btn-cancel
          label="انصراف"
          @click="cancel"
        />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      selectedBank: null,
      result: null
    }
  },
  props: {
    selectedRow: Object,
    config: Object,
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
    confirm () {
      if (this.selectedRow) {
        let data = {
          pDto: {
            CI_IncomeFicheConfirmType: 0,
            EumFicheConfirmMethode: 0,
            EumIncomePaymentType: this.selectedRow.EumIncomePaymentType,
            NidFiche: this.selectedRow.NidFiche,
            NidUser: "00000000-0000-0000-0000-000000000000"
          },
          pCI_Bank: this.selectedBank
        }
        this.$services.SD.ficheConfirmEstelamBank(data, this.config)
          .then(async ({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              this.cancelPermanentExportResults = this.cancelPermanentExportResult.data
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `تایید موقت بانک در فیش با شماره ${this.selectedRow.FicheNo} انجام گردید.`
              })

              this.$emit("exitTempConfirmBank")
            }
          })
          .catch(response => {
            this.serverError()
          })
          .finally(() => {
            this.hideSending()
          })
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    cancel () {
      this.$emit("exitTempConfirmBank")
    }
  }
}
</script>
