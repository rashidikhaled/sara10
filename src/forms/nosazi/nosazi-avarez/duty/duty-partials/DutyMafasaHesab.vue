<template>
  <fit>
    <safa-status :result="mafasaHesabResult"></safa-status>
    <safa-status :result="saveResult"></safa-status>
    <!-- {{code}}
    {{nosaziCode}} -->
    <div class="row q-mb-sm">
      <div class="col-md-3 col-sm-4 col-xl-12">
        <safa-combo
          v-model="code"
          :options="nosaziCode"
          cdcName="nosaziCode"
          label="کد نوسازی"
          sourceType="local"
        >
        </safa-combo>
      </div>
    </div>

    <safa-datatable
      v-model="mafasaHesabResults.DutyMafasaHesabList"
      v-model-selected-checkbox="true"
      :allowMultipleSelection="true"
      :m="m"
      cdcName="dutyMafasaHesab"
      fit
      height="100%"
      helper="dutyMafasaHesab"
      max-height="100%"
      minHeight="100%"
      title="مفاصا حساب"
      @selectedChange="selectedChange"
    />

    <ShowModal
      v-model="isShowModal"
      title="انتقال مفاصا"
      width="400px"
    >

      <DutyMafasaHesabTransfer
        :formKey="formKey"
        :fromNidNickName="nosaziCode[code] ?   nosaziCode[code].Title : 0"
        :mafasaHesabResults="mafasaHesabResults"
        :name="name"
        :selectedRows="selectedRows"
        :title="title"
        @reloadDutyMafasaHeasab="reloadDutyMafasaHeasab"
      />
    </ShowModal>
  </fit>
</template>
<script>
import DutyMafasaHesabTransfer from './DutyMafasaHesabTransfer.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'DutyMafasaHesab',
  mixins: [baseFormMixin],
  data: function () {
    return {
      mafasaHesabResults: { DutyMafasaHesabList: [] },
      mafasaHesabResult: null,
      nosaziCode: [],
      code: 0,
      showNewComment: false,
      isShowModal: false,
      saveResult: null,
      selectedRows: []
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
    },
    m: String
  },
  components: { DutyMafasaHesabTransfer },
  mounted () {
    if (this.baseNosaziCode.District !== 0) {
      let i = 0
      let nosaziCodeArray = this.results.NickNameNids
      nosaziCodeArray.forEach((item) => {
        this.nosaziCode.push({ ID: i++, Title: item })
      })
      this.load()
    }
  },
  watch: {
    code () {
      this.load()
    }
  },
  methods: {
    load () {
      this.showLoading()
      let data = {
        pNid: this.results.NidList[this.code],
        pSysCiDutyType: 1
      }
      this.$services.SB.getDutyMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.mafasaHesabResult = this.getResponse(data)

          if (this.mafasaHesabResult.success) {
            this.mafasaHesabResults = this.mafasaHesabResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidList[this.code],
              bizCodeTitle: 'NidList'
            })
          }
        })
        .catch((response) => {
          console.error(response)
          this.mafasaHesabResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeDutyMafasaHesabList () {
      return this.mafasaHesabResults.DutyMafasaHesabList.map((m) => {
        return {
          ...m,
          OverPay: m.OverPay || null,
          NidOwner: m.NidOwner || null,
          Jarime: m.Jarime || null,
          NickNameNid: m.NickNameNid || null,
          RestDay: m.RestDay || null
        }
      })
    },
    save () {
      this.showLoading()
      this.mafasaHesabResults.DutyMafasaHesabList =
        this.normalizeDutyMafasaHesabList()
      let data = {
        pMafasaHesab: this.mafasaHesabResults,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      this.$services.SB.saveDutyMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false

            await this.log({
              action: this.logActions.save,
              bizCode: this.mafasaHesabResults.NidFk,
              bizCodeTitle: 'NidFk'
            })

            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
            this.load()
          }
        })
        .catch((response) => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.isEditable = false
      this.load()
    },
    updateMafasaHesab () {
      this.mafasaHesabResults = {}
      this.mafasaHesabResult = null
      this.showLoading()
      let data = {
        pNidFK: this.results.NidList[this.code],
        pSysCiDutyType: 1
      }
      this.$services.SB.updateMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.update,
              bizCode: this.results.NidList[this.code],
              bizCodeTitle: 'Nid'
            })

            this.load()
            this.showSuccess('بروز رسانی با موفقیت انجام پذیرفت.')
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
    closeModal (e) {
      this.isShowModal = false
    },
    reloadDutyMafasaHeasab () {
      this.isShowModal = false
      this.load()
    },
    selectedChange (selectedItems) {
      this.selectedRows = selectedItems.selectedItems
    }
  }
}
</script>
