<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
    :padding="true"
  >
    <form-wrapper
      :title="title"
      :padding="false"
      fullscreen
      hide-title
      hide-close
    >
      <template #header>
        <safa-status :result="getFilForDayanmicRefRes" />
        <safa-status :result="selectDynamicRefRes" />
        <safa-status :result="confirmEngSelectDynamicRefRes" />
        <safa-status :result="cancelDynamicRefRes" />
      </template>

      <fit>
        <div
          :class="['q-pa-sm', { 'bg-grey-2': !$q.dark.isActive }]"
          style="border-radius: 4px"
        >
          <div class="row items-center q-gutter-x-md">
            <div class="col-auto">
              <safa-checkbox
                label="نمایش تایید شده ها"
                label-width="110px"
                m="r"
                v-model="chbConfirmed"
                @input="chbConfirmedInput"
              />
            </div>

            <div class="col-2">
              <safa-combo
                domainName="engineer"
                ciName="CI_Years"
                label=" سال"
                label-width="30px"
                v-model="cmbYear"
              />
            </div>

            <div class="col-auto">
              <btn-search label="بازآوری" @click="getInfo" />
            </div>

            <div class="col-auto">
              <q-separator vertical style="height: 12px" />
            </div>

            <div class="col-2">
              <safa-combo
                domainName="engineer"
                ciName="CI_Priority"
                label="اولویت"
                label-width="40px"
                v-model="cmbPriority"
              />
            </div>

            <div class="col-auto">
              <btn-default label="انتخاب درخواست" @click="btnSelect_Click" />
            </div>

            <div class="col-auto">
              <btn-default label="تایید درخواست" @click="btnConfirm_Click" />
            </div>

            <div class="col-auto">
              <btn-default label="انصراف درخواست" @click="btnCancel_Click" />
            </div>
          </div>
        </div>
        <fit>
          <safa-grid
            title="کارتابل ارجاع پویا"
            m="r"
            height="100%"
            maxHeight="100%"
            minHeight="300px"
            ref="kartableDynamicRef"
            sortable
            paginate
            :showRowNumber="true"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            :paginationPageSize="50"
            :allowMultipleSelection="false"
            :value="gvKartabl"
            helper="kartableDynamicRefColumns"
            @row:click="gvKartabl_SelectionChanged"
          >
          </safa-grid>
        </fit>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      title: "کارتابل ارجاع پویا",
      formKey: "1D7F3421-7BB4-4492-91D1-EFFFD2B4BB51",
      name: "UKartableDynamicRef",
      main: true,

      // Response
      getFilForDayanmicRefRes: null,
      selectDynamicRefRes: null,
      confirmEngSelectDynamicRefRes: null,
      cancelDynamicRefRes: null,

      // Models
      gvKartabl: [],
      context: {},
      chbConfirmed: false,
      cmbYear: 0,
      cmbPriority: 0,
      isShowConfirmed: false,

      // Buttons
      isBtnCancelDisabled: false,
      isBtnSelectDisabled: false,
      isBtnConfirmDisabled: false
    }
  },

  methods: {
    getInfo () {
      this.showLoading()

      let tmpYear = this.cmbYear || 0

      const payload = {
        pFlag: 0,
        pCI_Years: tmpYear,
        pNidEng: this.getNidUser()
      }

      this.$services.engineers
        .getFilForDayanmicRef(payload)

        .then(({ data }) => {
          this.getFilForDayanmicRefRes = this.getResponse(data)

          if (this.getFilForDayanmicRefRes.success) {
            this.gvKartabl =
              this.getFilForDayanmicRefRes.dataGetFilForDayanmicRefResult || []
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

    gvKartabl_SelectionChanged (e) {
      const { selectedRow = e.data } = e

      this.isBtnCancelDisabled = true
      this.isBtnSelectDisabled = true
      this.isBtnConfirmDisabled = true

      this.context.NIdFil = "00000000-0000-0000-0000-000000000000"
      this.context.NidRef = "00000000-0000-0000-0000-000000000000"
      this.context.NIdWorkItem = 0
      this.context.IdentityCode = ""
      this.context.CodeString = ""

      let tmpSel = { ...selectedRow }
      if (tmpSel !== null) {
        this.context.NIdFil = tmpSel.NIdFil
        this.context.CodeString = tmpSel.CodeString
        this.context.NIdWorkItem = tmpSel.NidWorkItem
        this.context.IdentityCode = this.getUserDisplayName()

        switch (tmpSel.CI_SelectDynamicRefStatus) {
          case 0:
            this.isBtnSelectDisabled = false
            break

          case 1:
            this.isBtnCancelDisabled = false
            break

          case 2:
            this.isBtnConfirmDisabled = false
            break
        }
      }
    },

    chbConfirmedInput () {
      this.isShowConfirmed = !this.chbConfirmed
      this.getInfo()
    },

    btnSelect_Click () {
      let tmpSel = this.$refs.kartableDynamicRef.gridApi.getSelectedRows()

      if (tmpSel !== null && tmpSel.NidEng !== null) {
        this.showLoading()

        const payload = {
          Eng_SelectDynamicRef: {
            NIdEng: tmpSel.NidEng,
            NIdFil: tmpSel.NIdFil,
            CI_Priority: this.cmbPriority
          }
        }

        this.$services.engineers
          .selectDynamicRef(payload)
          .then(({ data }) => {
            this.selectDynamicRefRes = this.getResponse(data)

            if (this.selectDynamicRefRes.success) {
              this.isBtnSelectDisabled = true
              this.getInfo()
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
    },

    btnConfirm_Click () {
      let tmpSel = this.$refs.kartableDynamicRef.gridApi.getSelectedRows()

      if (
        tmpSel !== null &&
        tmpSel.NidEng !== null &&
        tmpSel.NIdSelectDynamicRef !== null
      ) {
        this.showLoading()

        const payload = {
          Eng_SelectDynamicRef: {
            NIdEng: tmpSel.NidEng,
            NIdFil: tmpSel.NIdFil,
            NIdSelectDynamicRef: tmpSel.NIdSelectDynamicRef
          }
        }

        this.$services.engineers
          .confirmEngSelectDynamicRef(payload)
          .then(({ data }) => {
            this.confirmEngSelectDynamicRefRes = this.getResponse(data)

            if (this.confirmEngSelectDynamicRefRes.success) {
              this.isBtnConfirmDisabled = true
              this.getInfo()
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
    },

    btnCancel_Click () {
      let tmpSel = this.$refs.kartableDynamicRef.gridApi.getSelectedRows()

      if (
        tmpSel !== null &&
        tmpSel.NidEng !== null &&
        tmpSel.NIdSelectDynamicRef !== null
      ) {
        this.showLoading()

        const payload = {
          Eng_SelectDynamicRef: {
            NIdEng: tmpSel.NidEng,
            NIdFil: tmpSel.NIdFil,
            NIdSelectDynamicRef: tmpSel.NIdSelectDynamicRef
          }
        }

        this.$services.engineers
          .cancelDynamicRef(payload)
          .then(({ data }) => {
            this.cancelDynamicRefRes = this.getResponse(data)

            if (this.cancelDynamicRefRes.success) {
              this.isBtnCancelDisabled = true
              this.getInfo()
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
    },

    btnOkClick () {
      this.showLoading()

      const payload = {
        pRequest: {
          ClsFil_Confirm: this.context.ClsFil_Confirm,
          NidFil: this.context.NidFil,
          NidEng: this.context.NidEng
        }
      }

      this.$services.engineers
        .saveFilConfirm(payload)
        .then(({ data: args }) => {
          this.saveFilConfirmRes = this.getResponse(args)

          if (
            this.saveFilConfirmRes.data.SaveFil_ConfirmResult?.ClsFil_Confirm
              ?.ErrorResult?.BizErrors !== null &&
            !this.saveFilConfirmRes.data.SaveFil_ConfirmResult.ClsFil_Confirm.ErrorResult.BizErrors.some(
              (p) => p.ErrorAction === 0
            )
          ) {
            this.stOpShow = false
            this.btnOkShow = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })

      this.context.ClsFil_Confirm.NIdFil = this.context.NidFil
      this.context.ClsFil_Confirm.NIdEng = this.context.NidEng
      this.context.ClsFil_Confirm.Fil_Confirm.NIdFil = this.context.NidFil
      this.context.ClsFil_Confirm.Fil_Confirm.NIdEng = this.context.NidEng
    }
  },

  async created () {
    if (await this.canOpenWindow()) this.getInfo()
  }
}
</script>
