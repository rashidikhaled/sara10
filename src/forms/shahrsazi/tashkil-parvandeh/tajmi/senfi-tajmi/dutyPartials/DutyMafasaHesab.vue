<template>
  <fit>
    <!-- <fit> -->
    <safa-status :result="mafasaHesabResult"></safa-status>
    <safa-status :result="saveResult"></safa-status>
    <!-- <fit> -->
    <div class="row q-mb-sm">
      <!-- <div class="col-md-3"> -->
      <!-- <safa-combo
          label="کد نوسازی"
          sourceType="local"
          :options="nosaziCode"
          v-model="code"
        >
        </safa-combo> -->
      <safa-combo
        label="عنوان شغلی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
        class="col-12 col-sm-4"
      >
      </safa-combo>
      <!-- </div> -->
    </div>
    <!-- <div class="form-row"> -->
    <!-- <fit> -->
    <safa-datatable
      helper="dutyMafasaHesab"
      v-model="mafasaHesabResults.DutyMafasaHesabList"
      :m="mode"
      @click="click"
      @selectedChange="selectedChange "
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
    />
    <!-- </div> -->
    <!-- </fit> -->
    <div class="row q-mt-xs">
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="save"
        @cancel="isEditable = false"
      >
        <!-- <template #after>
        <q-btn
          @click="updateMafasaHesab"
          label="محاسبه ی مجدد مفاصا"
          icon="done"
          color="primary"
        ></q-btn>
        <q-btn
          icon="add"
          color="primary"
          @click="isShowModal=true"
          label=" انتقال مفاصا"
        ></q-btn>
      </template> -->
      </form-actions>
    </div>
    <!-- </fit> -->
    <ShowModal
      :show="isShowModal"
      @hide="isShowModal = false"
      title="انتقال مفاصا"
      @onCloseModal="isShowModal=false"
    >
      <DutyMafasaHesabTransfer
        :mafasaHesabResults="mafasaHesabResults"
        @reloadDutyMafasaHeasab="reloadDutyMafasaHeasab"
        :selectedRows="selectedRows"
      />
      <!-- :fromNidNickName=" this.nosaziCode[this.code].Title" -->
    </ShowModal>
    <!-- </div> -->
  </fit>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import DutyMafasaHesabTransfer from './DutyMafasaHesabTransfer'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
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
    results: Object
  },
  components: { DutyMafasaHesabTransfer },
  mounted () {
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.load()
  },
  watch: {
    code () {
      this.load()
    }
  },
  methods: {
    click () {},
    load () {
      this.showLoading()
      let data = {
        pNid: this.results.NidJobList[this.code],
        pSysCiDutyType: 1
      }
      this.$services.SB.getDutyMafasaHesab(data)
        .then(({ data }) => {
          this.mafasaHesabResult = this.getResponse(data)

          if (this.mafasaHesabResult.success) {
            this.mafasaHesabResults = this.mafasaHesabResult.data
          }
        })
        .catch(response => {
          this.mafasaHesabResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.showLoading()
      let data = {
        pMafasaHesab: this.mafasaHesabResults,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      this.$services.SB.saveDutyMafasaHesab(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess('ذخیره اطلاعات  با موفقیت انجام شد.')
            this.load()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    updateMafasaHesab () {
      this.mafasaHesabResults = {}
      this.mafasaHesabResult = null
      this.showLoading()
      let data = {
        pNidFK: this.results.NidList[this.code],
        pSysCiDutyType: 1
      }
      this.$services.SB.updateMafasaHesab(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.load()
            this.showSuccess('بروز رسانی با موفقیت انجام پذیرفت.')
          }
        })
        .catch(response => {
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
