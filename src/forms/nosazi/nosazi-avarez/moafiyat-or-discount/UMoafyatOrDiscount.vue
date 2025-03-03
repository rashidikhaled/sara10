<template>
  <safa-form
    :id="formKey"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
    caption="عملیات قوانین تخفیف یا معافیت-موارد حذف شده"
  >
    <form-wrapper
      :padding="false"
      title="عملیات قوانین تخفیف یا معافیت"
      vertical
    >
      <fit>
        <safa-datatable
          ref="grid"
          v-model="items"
          :allowCopy="false"
          :allowNewRow="false"
          :allowRemoveRow="false"
          :bordered="false"
          :filterable="true"
          cdcName="dutyExemptionRoleDeletedItemsMoafyatOrDiscount"
          fit
          height="100%"
          helper="dutyExemptionRoleDeletedItemsMoafyatOrDiscount"
          hide-toolbar="false"
          max-height="100%"
          name="grid"
          title="قوانین تخفیف یا معافیت"
          :allowMultipleSelection="false"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'عملیات قوانین تخفیف یا معافیت',
      formKey: '24a8f489-6977-4464-9b40-f0bee244d7c3',
      name: 'UMoafyatOrDiscount',
      main: true,
      items: []
    }
  },
  // props: {
  //   value: Object,
  //   editMode: {
  //     type: String,
  //     default: 'e'
  //   },
  //   engineerInfo: {
  //     type: Object,
  //     default: () => ({
  //       CI_Ability: 0,
  //       CI_EngStudyField: 0,
  //       CommitmentNo: null,
  //       CommitmentSupervisionDate: null,
  //       CommitmentSupervisionNo: null,
  //       ControllerCode: null,
  //       ControllerFamily: null,
  //       ControllerName: null,
  //       EngBase: null,
  //       JobAgreement: null,
  //       MembershipNo: null,
  //       NidEng: '',
  //       TotalCount: 0,
  //       UrbanityCode: null
  //     })
  //   },
  //   isNew: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  mounted () {
    // if (this.isNew) {
    //   this.engineerInfo.CI_Ability = 0
    //   this.engineerInfo.CI_EngStudyField = 0
    //   this.engineerInfo.CommitmentNo = null
    //   this.engineerInfo.CommitmentSupervisionDate = null
    //   this.engineerInfo.CommitmentSupervisionNo = null
    //   this.engineerInfo.ControllerCode = null
    //   this.engineerInfo.ControllerFamily = null
    //   this.engineerInfo.ControllerName = null
    //   this.engineerInfo.EngBase = null
    //   this.engineerInfo.JobAgreement = null
    //   this.engineerInfo.MembershipNo = null
    //   this.engineerInfo.NidEng = ''
    //   this.engineerInfo.TotalCount = 0
    //   this.engineerInfo.UrbanityCode = null
    // }
    this.getDutyExemptionRoleDeletedItems()
  },
  methods: {
    getDutyExemptionRoleDeletedItems () {
      this.showLoading()
      this.$services.SB.getDutyExemptionRoleDeletedItems(null, this.config)
        .then(async (response) => {
          if (response.data.ErrorResult.BizErrors.length === 0) {
            this.items = response.data.Duty_ExemptionRole_DeletedItems
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
          }
        })
        .catch((ex) => {
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
