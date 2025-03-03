<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :padding="false" :title="title">
      <fit>
        <safa-datatable
          v-model="dutyExemptionBase"
          :bordered="false"
          :m="mode"
          cdcName="dutyExemptionBase"
          filterable
          fit
          height="100%"
          helper="nosazi.dutyExemptionBase"
          max-height="100%"
          paginate
          title="عملیات معافیت/تخفیف"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveData"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import PersianDate from 'persian-date'

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: 'عملیات معافیت/تخفیف',
      formKey: 'fedb9130-a846-49aa-8358-a51d49aec718',
      name: 'UMoafyatDiscount',
      main: true,

      dutyExemptionBase: []
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.showLoading()
      this.$services.SB.getDutyExemptionBase(null, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.dutyExemptionBase = res.data.Duty_ExemptionBase
          }
        })
        .catch((error) => {
          console.log('getDutyExemptionBase error :>> ', error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getTime () {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      let time = h + ':' + m + ':' + s
      return time
    },

    normalizeDutyExemptionBase () {
      return this.dutyExemptionBase.map((m) => {
        return {
          ...m,
          CreateDate:
            m.CreateDate ||
            new PersianDate().toLocale('en').toCalendar('persian').format('L'),
          CreateTime: m.CreateTime || this.getTime(),
          MeterEfect: m.MeterEfect || false,
          Title: m.Title || null,
          Nid: m.Nid || '00000000-0000-0000-0000-000000000000',
          UserName: m.UserName || this.getUserDisplayName(),
          NidUser: m.NidUser || this.currentUser.NidUser
        }
      })
    },

    checkDuplicate (arr, item) {
      const uniqueValues = new Set(arr.map((v) => v[item]))
      return uniqueValues.size < arr.length
    },

    saveData () {
      if (this.checkDuplicate(this.dutyExemptionBase, 'CI_ExemptionType')) {
        return this.showError(
          'در جدول عملیات معافیت/تخفیف مقدار نوع معافیت نمی تواند تکراری باشد.'
        )
      }
      const payload = {
        pDutyExemption: {
          // Base_AddressInfo: null,
          // Base_CommonEstate: null,
          // Base_DutyExemption: null,
          // Base_Owner: null,
          Duty_ExemptionBase: this.normalizeDutyExemptionBase(),
          // Duty_ExemptionBase_DeletedItems: null,
          // Duty_ExemptionRole: null,
          // Duty_ExemptionRole_DeletedItems: null,
          // EumBaseInfoGroup: 0, // "Parvandeh"
          // NosaziCode: null,
          pUser: this.currentUser
        }
      }
      this.showLoading()
      this.$services.SB.saveDutyExemptionBase(payload, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.isEditable = false
            this.showSuccess('ذخیره با موفقیت انجام شد.')
            this.loadData()
          }
        })
        .catch((error) => {
          console.log('saveDutyExemptionBase error :>> ', error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  computed: {
    config () {
      if (this.selectedRequest) {
        return { config: { District: this.selectedDistrict } }
      }
      return undefined
    }
  }
}
</script>
