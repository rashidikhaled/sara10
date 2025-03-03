<template>
  <fit>
    <safa-status :result="loadBarokafHistoryRes" />
    <safa-datatable
      v-model="items"
      ref="grid"
      cdcName="items"
      name="grid"
      helper="baroKafHistory"
      @CopyClick="copy"
      @HistoryShowClick="historyShow"
      :allowNewRow="false"
      :allowCopy="false"
      :allowDelete="false"
      title="تاریخچه برو کف"
      class="fit"
      height="100%"
      max-height="100%"
      min-height="100%"
      margin="0"
    />
    <safa-popup
      v-model="isShowModal"
      title="بروکف"
    >
    <!-- طبق زمل باید فرم اصلی با همان دیتا باز شود -->
      <UBaroKafTabs
      :isShowBtn="false"
      :formKey="formKey"
      :name="name"
      :title="title"
      :results="selectedHistoryDataRow" />
    </safa-popup>
  </fit>
</template>

<script>
// import UShowHistory from './UShowHistory.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  title: 'اطلاعات برو کف',
  data () {
    return {
      items: [],
      loadBarokafHistoryRes: null,
      loadBarokafHistoryPrequset: {
        pNidNosaziCode: 'a2e0adf0-5b50-43dd-b2b6-bc064b2bed41'
      },
      historyResults: {},
      selectedHistoryDataRow: null,
      isShowModal: false,
      copyPRequest: {
        pNidProc: 'abf90724-85a5-495b-b809-0a875b5ea5e0',
        pNidBaseFrom: '1140f064-c2dc-46de-aabe-8202c65bb0ef'
      }
    }
  },
  // components: {
  //   UShowHistory
  // },
  props: {
    results: Object,
    nidNosaziCode: String,
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
  mounted () {
    // this.items = this.results.Base_Edge

    this.loadBarokafHistory()
  },
  methods: {
    async loadBarokafHistory () {
      try {
        this.showLoading()
        this.loadBarokafHistoryPrequset.pNidNosaziCode = this.nidNosaziCode
        const { data } = await this.$services.SC.loadBarokafHistory(this.loadBarokafHistoryPrequset)
        this.loadBarokafHistoryRes = this.getResponse(data)
        if (this.loadBarokafHistoryRes.success) {
          this.items = this.loadBarokafHistoryRes?.data?.BaroKaf_History || []
        }
        await this.log({
          action: this.logActions.view,
          bizCode: this.nidNosaziCode,
          bizCodeTitle: 'NidNosaziCode'
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    copy () {
      this.showConfirm('آیا از کپی اطلاعات به برو کف اطمینان دارید؟').onOk(() => {
        this.showLoading()

        this.$services.SC.copyHistoryToBarokaf(this.copyPRequest, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async response => {
            this.$q.loading.hide()

            this.showSuccess('عملیات با موفقیت انجام شد.')

            // copy on air
            await this.log({
              action: this.logActions.copy,
              bizCode: this.copyPRequest.pNidProc,
              bizCodeTitle: 'NidProc'
            })
          })
          .catch(ex => {
            this.serverError()
          }).finally(() => {
            this.hideLoading()
          })
      })
    },
    historyShow ({ e, field, dataItem, expanded }) {
      this.isShowModal = true
      this.selectedHistoryDataRow = dataItem
    }
  }
}
</script>
