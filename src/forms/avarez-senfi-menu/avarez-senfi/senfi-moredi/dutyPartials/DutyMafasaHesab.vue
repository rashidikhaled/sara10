<template>
  <fit>
    <safa-status :result="mafasaHesabResult"></safa-status>
    <safa-status :result="saveResult"></safa-status>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          label="عنوان شغلی"
          sourceType="local"
          :options="nosaziCode"
          v-model="code"
          class="col-12 col-sm-4"
        />
      </form-control>
    </form-row>
    <safa-datatable
      helper="dutyMafasaHesab"
      v-model="mafasaHesabResults.DutyMafasaHesabList"
      :m="mode"
      @click="click"
      @selectedChange="selectedChange"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
    />
    <ShowModal
      :show="isShowModal"
      @hide="isShowModal = false"
      title="انتقال مفاصا"
      @onCloseModal="isShowModal = false"
    >
      <DutyMafasaHesabTransfer
        :mafasaHesabResults="mafasaHesabResults"
        @reloadDutyMafasaHeasab="reloadDutyMafasaHeasab"
        :selectedRows="selectedRows"
      />
      <!-- :fromNidNickName=" this.nosaziCode[this.code].Title" -->
    </ShowModal>
  </fit>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
import DutyMafasaHesabTransfer from "./DutyMafasaHesabTransfer"
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
    formKey: String,
    title: String,
    name: String,
    results: Object,
    baseNosaziCode: Object,
    onShowMafasaTab: Boolean
  },
  components: { DutyMafasaHesabTransfer },
  mounted () {
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach((item) => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
  },

  watch: {
    onShowMafasaTab () {
      this.load()
    },
    baseNosaziCode () {
      this.load()
    },
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
        pSysCiDutyType: 2
      }
      this.$services.SB.getDutyMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.mafasaHesabResult = this.getResponse(data)

          if (this.mafasaHesabResult.success) {
            this.mafasaHesabResults = this.mafasaHesabResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
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
      this.$services.SB.saveDutyMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("ذخیره اطلاعات  با موفقیت انجام شد.")

            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.load()
          }
        })
        .catch((response) => {
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
      this.$services.SB.updateMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.load()
            this.showSuccess("بروز رسانی با موفقیت انجام پذیرفت.")
            await this.log({
              action: this.logActions.update,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بروزرسانی اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
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
