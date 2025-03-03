<template>
<section>
  <form-wrapper
    :title="title"
    >
<safa-datatable
  helper="amlakControlHistory"
  v-model="loadDataResult.Sh_RequestInfoList"
  :m="mode"
  @copyEstateClick="copyEstate"
  @selection-change="selectMaster"
  />

    <safa-datatable
      helper="amlakControlHistoryDetails"
      v-model="items"
      :m="mode"
      @copyEstateClick="copyEstate"
      v-if="isSelectedMasterRow"
    />

    <text-template
      label="توضیحات فنی"
      v-if="isSelectedMasterRow"
    />

    <template v-slot:footer>
      <FormActions
        :m="mode"
        @edit="isEditable=true"
        @cancel="isEditable=false"
      >
      </FormActions>
    </template>
  </form-wrapper>
</section>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/work-flow/amlak-control-history',
  mixins: [baseFormMixin],
  data () {
    return {
      isSelectedMasterRow: false,
      copyEstatePrequest: {
        pNidProcHistory: '00000000-0000-0000-0000-000000000000',
        pNidProcCurrent: ''
      },
      name: 'UAmlakControlHistory',
      title: 'سوابق کنترل املاک',
      items: [],
      loadDataPRequest: {
        pNidNosaziCode: ''
      },
      loadDataResult: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    selectMaster (e) {
      this.isSelectedMasterRow = true
    },
    copyEstate () {
      this.showSending()

      this.copyEstatePrequest.pNidProcCurrent = this.selectedRequest.NidProc

      this.$services.SC.copyEstateControlHistoryToCurrentRequest(this.copyEstatePrequest)
        .then(({ data }) => {
          if (data.ErrorResult.BizErrors.length === 0) {
            this.showSuccess('اطلاعات با موفقیت کپی شد')
          }
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideSending()
        })
    },
    loadData () {
      this.showLoading()

      this.loadDataPRequest.pNidNosaziCode = this.selectedRequest.NidProc

      this.$services.SC.getEstateControlHistory(this.loadDataPRequest)
        .then(({ data }) => {
          this.loadDataResult = data
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>

<style scoped>

</style>
