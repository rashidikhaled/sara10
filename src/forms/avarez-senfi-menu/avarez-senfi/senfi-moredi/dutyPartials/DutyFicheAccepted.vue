<template>
  <!-- <div class="q-pa-md"> -->
  <fit>
    <!-- <div class="form-row"> -->
    <safa-datatable
      helper="dutyFicheAccepted"
      v-model="acceptedBankArray"
      @row-click="click"
      title="فیش ها"
      cdcName="acceptedBankArray"
    />
    <!-- </div> -->
    <div class="row q-gutter-sm q-mt-sm">
      <btn-default label="استرداد" @click="refund" />
      <btn-cancel label="ابطال" @click="revoke" />
    </div>
    <ShowModal
      :show="isShowRefundSpecModal"
      @hide="isShowRefundSpecModal = false"
      :title="modalTitle"
      @onCloseModal="isShowRefundSpecModal = false"
    >
      <DutyFicheRefundSpec2
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :isRefund="isRefund"
          :formKey="formKey"
          :title="title"
          :name="name"
      />
    </ShowModal>
    <!-- </div> -->
  </fit>
</template>
<script>
import DutyFicheRefundSpec2 from "./DutyFicheRefundSpec2"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      fichesResult: null,
      fichesResults: { DutyConfirmFichesFromView: [] },
      acceptedBankArray: [],
      selectedRow: null,
      isShowRefundSpecModal: false,
      modalTitle: "",
      isRefund: false
    }
  },
  props: {
    results: Object,
    baseNosaziCode: Object,
    name: {
      type: String,
      default: 'DutyFicheAccepted'
    },
    title: {
      type: String,
      default: ''
    },
    formKey: {
      type: String,
      default: ''
    }
  },
  components: {
    DutyFicheRefundSpec2
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.acceptedBankArray = []
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2,
        pUnLoadCancelFiches: false
      }

      this.$services.SB.getDutyConfirmFichesFromView(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            this.fichesResults.DutyConfirmFichesFromView.forEach((item) => {
              if (item.EumDutyFicheStatus === 4) {
                this.acceptedBankArray.push(item)
              }
            })
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
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
    click (event, dataItem, target) {
      this.selectedRow = dataItem
    },
    refund () {
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
        this.isRefund = true
        this.modalTitle = "مشخصات فیش استرداد"
        this.isShowRefundSpecModal = true
      }
    },
    revoke () {
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
        this.isRefund = false
        this.modalTitle = "مشخصات فیش ابطال"
        this.isShowRefundSpecModal = true
      }
    },
    reloadDutyFiche () {
      this.isShowRefundSpecModal = false
      this.load()
    }
  }
}
</script>
