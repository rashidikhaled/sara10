<template>
  <safa-form
    :id="formKey"
    :caption="title + '-صنفی' "
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <form-wrapper
      title="عملیات معافیت/تخفیف-موارد حذف شده"
      :padding="false"
    >
      <fit>
        <safa-datatable
          :data-items="items"
          :allowNewRow='false'
          :allowRemoveRow='false'
          :allowCopy='false'
          ref="grid"
          name="grid"
          helper="dutyExemptionBaseDeletedItems"
          :hide-toolbar="true"
          height="100%"
          max-height="100%"
          fit
          :bordered="false"
          title="معافیت/تخفیف-موارد حذف شده"
          :filterable="true"
          cdcName="dutyExemptionBaseDeletedItems"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: 'nosazi-avarez/deleted-moafiyat',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'عملیات معافیت/تخفیف-موارد حذف شده',
      formKey: 'db143c30-1009-47b3-b7d5-65f5355b11ef',
      name: 'UDeletedMoafiyatSenfi',
      main: true,
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: false,
      items: [],
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
    this.getDutyExemptionBaseDeletedItems()
  },
  methods: {
    getDutyExemptionBaseDeletedItems () {
      this.$q.loading.show()
      this.$services.SB.getDutyExemptionBaseDeletedItems()
        .then(async (response) => {
          this.$q.loading.hide()
          if (response.data.ErrorResult.BizErrors.length === 0) {
            this.items = response.data.Duty_ExemptionBase_DeletedItems

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })

            // this.showSuccess('عملیات با موفقیت انجام شد')
            // this.goToReadonlyMode()
          }
        })
        .catch(ex => {
          this.$q.loading.hide()
          this.$q.dialog({
            title: 'خطا در سرور',
            message: ex.message
          })
        })
    },
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
        .then(async (response) => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.goToReadonlyMode()
          }
        })
        .catch(ex => {
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
.splitter {
  color: green;
}
</style>
