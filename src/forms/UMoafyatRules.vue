<template>
  <section class="UWaitListSendToReviewer">
    <form-wrapper :title="title">
        <div class="row q-col-gutter-md">
          <h1 class="form-title text-h6 q-mb-lg">
            <span>عملیات قوانین تخفیف یا معافیت  </span>
          </h1>
          <div class="col-2">
            <safa-text label="کد معافیت"
            v-model="DutyExemptionBaseSelected.CI_ExemptionType" m="r"
            />

          </div>

          <div class="col-1">
            <q-btn
              label="جستجو"
              color="primary"
              v-on:click="getDutyExemptionBase"
            />
          </div>

          <div class="col-6">
            <!-- {{DutyExemptionBaseSelected.Title}} -->
            <safa-text  v-model="DutyExemptionBaseSelected.Title" m="r" />
          </div>

          <div class="col-3">
            <q-btn
              label=" جستجو"
              color="primary"
              :disable="DutyExemptionBaseSelected.CI_ExemptionType==null"
              v-on:click="searchDutyExemptionRole"
            /> |
            <q-btn
              label="بازیابی"
              color="blue"
              v-on:click="getDutyExemptionRole"

            />
          </div>

          <div class="col-12">
            <!-- :data-items="items" -->
                 <!-- <safa-datagrid
              v-model="formModel.Duty_ExemptionRole"
              ref="grid"
              name="grid"
              :m="mode"
              helper="dutyExemptionRole"
            ></safa-datagrid> -->
            <safa-datatable
              v-model="formModel.Duty_ExemptionRole"
              ref="grid"
              name="grid"
              :m="mode"
              helper="dutyExemptionRole"
              title="قوانین تخفیف یا معافیت"
            ></safa-datatable>
          </div>
        </div>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true,mode='e'"
          @cancel="goToReadonlyMode,mode='r'"
          @save="saveDutyExemptionRole"
        />
      </template>
      <div class="col-1">
        <ShowModal
          :show="isShowModal"
          @hide="isShowModal = false"
          title="عملیات معافیت / تخفیف"
          @onCloseModal="closeModal"
        >
          <!-- {{DutyExemptionBaseSelected}} -->

          <safa-datatable
            v-model="formModel.DutyExemptionBase"
            ref="grid"
            name="grid"
            :m="mode"
            @selectedChange="handleAnalysisBuildingSelected"
            helper="dutyExemptionBase"
          ></safa-datatable>

          <q-btn
          :disabled="DutyExemptionBaseSelected.Title==''"
            label="انتخاب"
            color="amber-8"
            @click="closeModal"
          />
        </ShowModal>
      </div>
    </form-wrapper>
  </section>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions.vue'
import ShowModal from 'src/components/ShowModal'

export default {
  title: 'عملیات قوانین تخفیف یا معافیت',
  formKey: 'D0C3CDCE-3819-4EEF-A604-263F86408641',
  name: 'UMoafyatRules',
  route: 'nosazi-avarez/moafiyat-rules2',

  mixins: [baseFormMixin],
  data () {
    return {
      DutyExemptionBaseSelected: { Title: '', CI_ExemptionType: null },
      isShowModal: false,
      mode: 'r',
      formActionEditMode: 'r',
      isEditMode: 'r',
      formModel: { DutyExemptionRole: [], DutyExemptionBase: [] },
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
    this.getDutyExemptionRole()
  },
  methods: {
    handleAnalysisBuildingSelected (e) {
      this.DutyExemptionBaseSelected = e.dataItem
    },
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },
    searchDutyExemptionRole () {
      try {
        this.showLoading()
        this.$services.SB.searchDutyExemptionRole({
          pExemptionType: this.DutyExemptionBaseSelected.CI_ExemptionType
        }).then(response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel.Duty_ExemptionRole = this.requestResult.data.Duty_ExemptionRole
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    getDutyExemptionBase () {
      this.DutyExemptionBaseSelected = { Title: '', CI_ExemptionType: null }

      try {
        this.showLoading()
        this.$services.SB.getDutyExemptionBase(this.loadDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)
          if (!this.requestResult.hasError) {
            this.formModel.DutyExemptionBase = this.requestResult.data.Duty_ExemptionBase
            this.showModal()
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    getDutyExemptionRole   () {
      try {
        this.showLoading()
        this.$services.SB.getDutyExemptionRole().then(response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
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
    saveDutyExemptionRole () {
      try {
        if (!this.formModel.Duty_ExemptionRole) {
          this.showError('موردی برای ذخیره وجود ندارد')
          return
        }
        this.showLoading()
        this.$services.SB.saveDutyExemptionRole({
          pDutyExemption: {
            Duty_ExemptionRole: this.formModel.Duty_ExemptionRole.cleanRows(),
            pUser: this.currentUser

          }
        }).then(response => {
          this.hideLoading()
          this.requestResult = this.getResponse(response.data)
          if (!this.requestResult.hasError) {
            this.showSuccess('با موفقیت انجام شد')
            this.goToReadonlyMode = false; this.mode = 'r'
            this.getDutyExemptionRole()
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    }
  },
  components: {
    FormActions,
    ShowModal
  }
}
</script>

<style lang="stylus" scoped>
.splitter {
  color: green;
}
</style>
