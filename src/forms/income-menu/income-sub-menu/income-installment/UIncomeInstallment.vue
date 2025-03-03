<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper vertical title="تقسیط درآمد">
      <template #header>
        <safa-status :result="getInstallmentFicheRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره درخواست"
              v-model="nidWorkItem"
              cdcName="nidWorkItem"
              :validations="['required', 'number']"
              @keypress.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="loadObj"
                  color="primary"
                  name="search"
                  class="cursor-pointer"
                  title="جستجو"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>
        <safa-datatable
          title="تقسیط درآمد"
          v-model="installmentFicheResult.Income_Fiche"
          cdcName="Income_Fiche"
          helper="incomeInstallmentGird"
          fit
          max-height="100%"
          height="100%"
          minHeight="100%"
          @dbclick="dbclick"
        />
      </fit>
    </form-wrapper>

    <safa-popup v-model="showInstallmentModal" title="تقسیط" vertical width="1000px" height="800px">
      <form-wrapper>
        <Installment
          :selectedRow="selectedRow"
          :title="title"
          :formKey="formKey"
          :main="main"
          ref="installment"
          :loadFromMenu="isSelectFromMenu"
          :m="mode"
        />
        <template v-slot:footer>
          <form-actions
            :m="mode"
            class="col-12 q-mt-md"
            @edit="isEditable = true"
            @save="save"
            @cancel="cancelInstallment"
          >
            <template #after>
              <btn-default
                label="خرید دین"
                @click="createShahrBankIncomeGuaranteeInstallment"
              ></btn-default>
            </template>
          </form-actions>
        </template>
      </form-wrapper>
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Installment from "./partials/Installment.vue"

export default {
  mixins: [baseFormMixin],
  components: { Installment },
  data () {
    return {
      name: "UIncomeInstallment",
      title: "درآمد- تقسیط",
      formKey: "2427e109-7ea9-4c34-888c-3848992280d1",
      main: true,
      sidebarCompatible: true,

      nidWorkItem: "",
      getInstallmentFicheRes: null,
      installmentFicheResult: { Income_Fiche: [] },
      showInstallmentModal: false,
      selectedRow: null,
      isView: false
    }
  },
  methods: {
    loadObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.$services.SD.getInstallmentFiche(
        { NidWorkItem: parseInt(this.nidWorkItem) },
        { config: { District: this.selectedDistrict } }
      )
        .then(async ({ data }) => {
          this.getInstallmentFicheRes = this.getResponse(data)
          if (this.getInstallmentFicheRes.success) {
            this.resetValidation()
            this.installmentFicheResult = this.getInstallmentFicheRes.data
            if (
              this.installmentFicheResult.Income_Fiche &&
              this.installmentFicheResult.Income_Fiche.length > 0
            ) {
              this.installmentFicheResult.Income_Fiche =
                this.installmentFicheResult.Income_Fiche.map((m) => {
                  let tmpClass =
                    m.EumFicheStatus === 3 // تایید
                      ? "bg-blue-2"
                      : m.EumFicheStatus === 4 // ابطال
                        ? "bg-red-2"
                        : ""
                  return {
                    ...m,
                    class: tmpClass
                  }
                })
            } else {
              return this.showError(
                "متاسفانه با شماره درخواست وارد شده موردی یافت نشد."
              )
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidWorkItem,
              bizCodeTitle: "nidWorkItem"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },

    save () {
      this.$refs.installment.save()
      this.isEditable = false
    },
    createShahrBankIncomeGuaranteeInstallment () {
      this.$refs.installment.createShahrBankIncomeGuaranteeInstallment()
    },
    cancelInstallment () {
      this.$refs.installment.cancelInstallment()
      this.isEditable = false
    },
    dbclick (e) {
      this.selectedRow = e.row
      this.showInstallmentModal = true
    }
  }
}
</script>
