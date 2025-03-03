<template>
  <div>

    <safa-datatable
      v-model="acceptedBankArray"
      cdcName="dutyFicheAccepted"
      class="q-mb-sm"
      height="400px"
      helper="dutyFicheAccepted"
      title="فیش ها"
      @click="click"
    />

    <div class="row q-gutter-sm">
      <btn-default
        label="استرداد"
        @click="refund"
      />
      <btn-default
        label="ابطال"
        @click="revoke"
      />
    </div>
    <ShowModal
      :show="isShowRefundSpecModal"
      :title="modalTitle"
      @hide="isShowRefundSpecModal = false"
      @onCloseModal="isShowRefundSpecModal=false"
    >
      <DutyFicheRefundSpec2
        :formKey="formKey"
        :isRefund="isRefund"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </ShowModal>
  </div>
</template>
<script>
import DutyFicheRefundSpec2 from './DutyFicheRefundSpec2.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'DutyFicheAccepted',
  mixins: [baseFormMixin],
  data: function () {
    return {
      fichesResult: null,
      fichesResults: { DutyConfirmFichesFromView: [] },
      acceptedBankArray: [],
      selectedRow: null,
      isShowRefundSpecModal: false,
      modalTitle: ''
    }
  },
  props: {
    results: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
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
        pNidList: this.results.NidList,
        pSysCiDutyType: 1,
        pUnLoadCancelFiches: false
      }

      this.$services.SB.getDutyConfirmFichesFromView(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.fichesResults.DutyConfirmFichesFromView.forEach((item) => {
              if (item.EumDutyFicheStatus === 4) {
                this.acceptedBankArray.push(item)
              }
            })
          }
        })
        .catch(err => {
          console.error(err)
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
        this.showError('هیچ فیشی انتخاب نشده است.')
      } else {
        this.showConfirm('آیا از استرداد فیش انتخاب شده اطمینان دارید؟').onOk(
          () => {
            this.isRefund = true
            this.modalTitle = 'مشخصات فیش استرداد'
            this.isShowRefundSpecModal = true
          }
        )
      }
    },
    revoke () {
      if (this.selectedRow === null) {
        this.showError('هیچ فیشی انتخاب نشده است.')
      } else {
        this.showConfirm('آیا از ابطال فیش انتخاب شده اطمینان دارید؟').onOk(
          () => {
            this.isRefund = false
            this.modalTitle = 'مشخصات فیش ابطال'
            this.isShowRefundSpecModal = true
          }
        )
      }
    },
    reloadDutyFiche () {
      this.isShowRefundSpecModal = false
      this.load()
    }
  }
}
</script>
