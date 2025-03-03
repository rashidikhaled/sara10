<template>
  <fit>
    <safa-datatable
      ref="grid"
      :data-items="items"
      cdcName="regionPriceMap"
      fit
      height="100%"
      helper="nosazi.regionPriceMap"
      max-height="100%"
      name="grid"
      title="لیست کد نوسازی"
    />
    <!-- v-model="regionPriceMap" -->
  </fit>
</template>

<script>
export default {
  data () {
    return {
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      items: [],
      // regionPriceMap: [],
      savePrequest: {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: '00000000-0000-0000-0000-000000000000',
          Sh_EngineerInfo: {
            CI_Ability: '6',
            CI_EngStudyField: '2',
            CommitmentNo: '11',
            CommitmentSupervisionDate: '1399/01/07',
            CommitmentSupervisionNo: '12',
            ControllerCode: '456',
            ControllerFamily: 'سمیعی',
            ControllerName: 'مجید',
            EngBase: 'پایه',
            JobAgreement: '789',
            MembershipNo: '10',
            NidEng: '00000000-0000-0000-0000-000000000000',
            UrbanityCode: '123'
          }
        }
      },
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1
    }
  },
  props: {
    value: Object,
    editMode: {
      type: String,
      default: 'e'
    },
    engineerInfo: {
      type: Object,
      default: () => ({
        CI_Ability: 0,
        CI_EngStudyField: 0,
        CommitmentNo: null,
        CommitmentSupervisionDate: null,
        CommitmentSupervisionNo: null,
        ControllerCode: null,
        ControllerFamily: null,
        ControllerName: null,
        EngBase: null,
        JobAgreement: null,
        MembershipNo: null,
        NidEng: '',
        TotalCount: 0,
        UrbanityCode: null
      })
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isNew) {
      this.engineerInfo.CI_Ability = 0
      this.engineerInfo.CI_EngStudyField = 0
      this.engineerInfo.CommitmentNo = null
      this.engineerInfo.CommitmentSupervisionDate = null
      this.engineerInfo.CommitmentSupervisionNo = null
      this.engineerInfo.ControllerCode = null
      this.engineerInfo.ControllerFamily = null
      this.engineerInfo.ControllerName = null
      this.engineerInfo.EngBase = null
      this.engineerInfo.JobAgreement = null
      this.engineerInfo.MembershipNo = null
      this.engineerInfo.NidEng = ''
      this.engineerInfo.TotalCount = 0
      this.engineerInfo.UrbanityCode = null
    }
  },
  methods: {
    goToEditMode () {
      this.isGoToEdit = true

      this.editMode = 'e'

      // console.log('/////this.mode', this.mode)
    },
    goToReadonlyMode () {
      this.isGoToEdit = false

      this.editMode = 'r'
    },
    saveEngineerInfo () {
      // console.log('/////this.isNew', this.isNew)

      if (!this.isNew) {
        this.savePrequest.pEng.NidEng = this.engineerInfo.NidEng

        this.savePrequest.pEng.Sh_EngineerInfo = this.engineerInfo
      }

      this.$q.loading.show()
      this.$services.SC.saveEngineerInfo(this.savePrequest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            this.goToReadonlyMode()
          }
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            message: ex.message
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter
  color green
</style>
