<template>
  <fit>
    <safa-datatable
      ref="grid"
      :allowCopy="false"
      :bordered="false"
      :padding="false"
      cdcName="checkUnconfirmationFishes"
      fit
      height="100%"
      helper="nosazi.checkUnconfirmationFishes"
      hideHeader
      max-height="100%"
      min-height="100%"
      name="grid"
      title="اطلاعات فیش"
    />
  </fit>
</template>

<script>
import loadDataResponse from '../models/loadDataResponse'
import baseFormMixin from 'src/mixins/baseFormMixin.js'

export default {
  data () {
    return {
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
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
      selectedRegion: 1,
      loadDataPrequest: {
        pEumObjOnPrice: '2'
      },
      formModel: loadDataResponse
    }
  },
  mixins: [baseFormMixin],
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
    },
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
    this.loadData()
  },
  methods: {
    loadData () {
      try {
        this.showLoading()

        this.$services.SB.getBankFileError(this.loadDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.loadDataPrequest.pEumObjOnPrice.toString(),
              bizCodeTitle: 'pEumObjOnPrice'
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
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
.splitter {
  color: green;
}
</style>
