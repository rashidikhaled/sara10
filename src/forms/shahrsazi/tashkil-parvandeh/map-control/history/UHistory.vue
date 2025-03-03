<template>
  <fit>
    <safa-datatable
      v-model="mapHistoryResult.MapControl_History"
      ref="grid"
      name="grid"
      helper="mapControlHistoryHistory"
      @CopyClick="copy"
      @HistoryShowClick="historyShow"
      title="تاریخچه"
    ></safa-datatable>

    <ShowModal
      v-model="isShowModal"
      title="تاریخچه"
    >
      <UShowHistory
        :results="selectedHistoryDataRow"
        :m="mode"
      />
    </ShowModal>
  </fit>
</template>

<script>
import UShowHistory from './show-history/UShowHistory'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      copyResult: null,
      requestResult: null,
      mapHistoryResult: { MapControl_History: [] },
      items: [],
      loadMapControlHistoryPrequset: {
        pNidNosaziCode: 'a2e0adf0-5b50-43dd-b2b6-bc064b2bed41'
      },
      historyResults: {},
      selectedHistoryDataRow: null,
      isShowModal: false,
      copyPRequest: {
        pNidProc: 'abf90724-85a5-495b-b809-0a875b5ea5e0',
        pNidBaseFrom: '1140f064-c2dc-46de-aabe-8202c65bb0ef'
      },
      confirm: false
    }
  },
  components: {
    UShowHistory
  },
  props: {
    nidNosaziCode: String
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // load data
    loadData () {
      this.showLoading()
      let payLoad = {
        pNidNosaziCode: this.nidNosaziCode
      }
      this.$services.SC.loadMapControlHistory(payLoad)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.mapHistoryResult = this.requestResult.data
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // copy
    copy () {
      this.showConfirm('آیا از کپی اطلاعات به برو کف اطمینان دارید؟').onOk(
        () => {
          this.showLoading()

          this.$services.SC.copyHistoryToBarokaf(this.copyPRequest, {
            config: {
              District: this.selectedDistrict
            }
          })
            .then(({ data }) => {
              this.copyResult = this.getResponse(data)
              if (this.copyResult.success) {
                this.showSuccess('کپی اطلاعات با موفقیت انجام شد.')
              }
            })
            .catch((response) => {
              console.error('copyHistoryToBarokaf', response)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    historyShow (e) {
      this.isShowModal = true
      this.selectedHistoryDataRow = e.dataItem
    },
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    }
  }
}
</script>
