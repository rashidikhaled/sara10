<template>
  <section>
    <!-- <form-header /> -->
    <form-wrapper :title="title">
      <section class="shadow bg-white">
        <div class="form-title">برو کف</div>
        <safa-status :result="saveBarokafResult" class="col-12" />

        <div class="row q-col-gutter-md">
          <q-tabs
            v-model="activeTab"
            dense
            class="text-grey col-12"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="baroKafInfo" label="اطلاعات برو کف" />

            <q-tab
              name="ownersAndOther"
              label="مالکین و سایر امکانات و پخ ها"
            />

            <q-tab name="kroki" label="کروکی" />

            <q-tab name="tafsil" label="طرح تفصیلی و نظرات برو کف" />

            <q-tab name="analyze" label="آنالیز وضعیت قبلی نقشه" />
          </q-tabs>

          <q-tab-panels class="col-12" v-model="activeTab">
            <q-tab-panel name="baroKafInfo">
              <UBaroKafInfo :results="results" :editMode="editMode" />
            </q-tab-panel>

            <q-tab-panel name="ownersAndOther">
              <UOwnersAndOther :results="results" :editMode="editMode" />
            </q-tab-panel>

            <q-tab-panel name="kroki">
              <UKroki :results="results" />
            </q-tab-panel>

            <q-tab-panel name="tafsil">
              <UTafsil :results="results" :editMode="editMode" />
            </q-tab-panel>

            <q-tab-panel name="analyze">
              <ULastStatusMapAnalyze :results="results" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </section>
      <template v-slot:footer>
        <FormActions
          :m="formActionEditMode"
          @edit="goToEditMode"
          @cancel="goToReadonlyMode"
          @save="saveBarokaf"
        >
          <template v-slot:after>
            <q-btn
              label="تاریخچه برو کف"
              class="btn-default"
              @click="showModal"
            />
          </template>
        </FormActions>
      </template>
      <div class="col-1">
        <ShowModal
          :show="isShowModal"
          @hide="isShowModal = false"
          title="تاریخچه بروکف"
          @onCloseModal="closeModal"
        >
          <UHistory />
        </ShowModal>
      </div>
    </form-wrapper>
  </section>
</template>

<script>
import UBaroKafInfo from '../partials/UBaroKafInfo'
import UOwnersAndOther from '../partials/UOwnersAndOther'
import UKroki from '../partials/UKroki'
import UTafsil from '../partials/UTafsil'
import ULastStatusMapAnalyze from '../partials/ULastStatusMapAnalyze'
import ShowModal from 'src/components/ShowModal'
import loadbaroKafLoadPrequestModel from 'src/models/loadbaroKafLoadPrequestModel.js'
import UHistory from '../../history/UHistory'
import saveBarokafPrequest from 'src/models/saveBarokafPrequest.js'
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions'

export default {
  name: 'baro-kaf',
  mixins: [baseFormMixin],
  title: 'برو کف',
  components: {
    UBaroKafInfo,
    UOwnersAndOther,
    UKroki,
    UTafsil,
    ULastStatusMapAnalyze,
    ShowModal,
    UHistory,
    FormActions
  },
  data () {
    return {
      activeTab: 'baroKafInfo',
      items: [],
      isShowModal: false,
      results: loadbaroKafLoadPrequestModel,
      loadPrequest: {
        pNidProc: '1fe00ca0-22a8-4cf1-a0b2-bc31a51ae92f',
        pIsLoadDeletedNosaziCode: 'false'
      },
      isGoToEdit: false,
      editMode: 'r',
      saveBarokafResult: {},
      formActionEditMode: 'r'
    }
  },
  props: {
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
    this.loadBarokaf()
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },
    loadBarokaf () {
      const checkResult = this.isSelectedRequest()

      if (checkResult) {
        this.loadPrequest.pNidProc = this.selectedRequest.NidProc
      }

      this.$q.loading.show()
      this.$services.SC.loadBarokaf(this.loadPrequest, {
        config: {
          District: this.selectedDistrict
        }
      }).then(async response => {
        this.results = this.getResponse(response.data).data

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.BizCode,
          bizCodeTitle: 'کد نوسازی'
        })
      })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    goToEditMode () {
      this.formActionEditMode = 'e'

      this.editMode = 'e'
    },
    goToReadonlyMode () {
      this.formActionEditMode = 'r'

      this.editMode = 'r'
    },
    saveBarokaf () {
      this.goToReadonlyMode()

      saveBarokafPrequest.pBarokaf.Base_Edge = this.results.Base_Edge

      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ToGangwayLen = this.results.Sh_BaroKaf.ToGangwayLen
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.BarKafComments = this.results.Sh_BaroKaf.BarKafComments
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.CI_AreaType = this.results.Sh_BaroKaf.CI_AreaType
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.CI_Criterion = this.results.Sh_BaroKaf.CI_Criterion
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.CI_Frontage = this.results.Sh_BaroKaf.CI_Frontage
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.CI_QuotaDuty = this.results.Sh_BaroKaf.CI_QuotaDuty
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.CI_Train = this.results.Sh_BaroKaf.CI_Train
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.CI_VergeType = this.results.Sh_BaroKaf.CI_VergeType
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.GreenArea = this.results.Sh_BaroKaf.GreenArea
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.IsTransferToUrban = this.results.Sh_BaroKaf.IsTransferToUrban
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.KorokiDate = this.results.Sh_BaroKaf.KorokiDate
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.KorokiNumber = this.results.Sh_BaroKaf.KorokiNumber
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.NidBase = this.results.Sh_BaroKaf.NidBase
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.PathValue = this.results.Sh_BaroKaf.PathValue
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.PathValueBaseonDeed = this.results.Sh_BaroKaf.PathValueBaseonDeed
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ToAdjusentArea = this.results.Sh_BaroKaf.ToAdjusentArea
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ToAdjusentLen = this.results.Sh_BaroKaf.ToAdjusentLen
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ToGangwayArea = this.results.Sh_BaroKaf.ToGangwayArea
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ValueAddedChangeUsing = this.results.Sh_BaroKaf.ValueAddedChangeUsing
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ValueAddedChangeWith = this.results.Sh_BaroKaf.ValueAddedChangeWith
      saveBarokafPrequest.pBarokaf.Sh_BaroKaf.ValueAddedPriorityUsing = this.results.Sh_BaroKaf.ValueAddedPriorityUsing
      saveBarokafPrequest.pBarokaf.Base_OtherEquipment = this.results.data.Base_OtherEquipment
      saveBarokafPrequest.pBarokaf.Base_Bezel = this.results.data.Base_Bezel

      saveBarokafPrequest.pBarokaf.Base_OtherEquipment = saveBarokafPrequest.pBarokaf.Base_OtherEquipment.cleanRows()

      this.$q.loading.show()
      this.$services.SC.saveBarokaf({ pBarokaf: this.results,
        pNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(response => {
          // console.log('/////////////////response', response)

          this.saveBarokafResult = this.getResponse(response.data)

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            this.loadBarokaf()
          }

          // // console.log('this.results', JSON.stringify(this.results))
        })
        .catch(ex => {
          this.$q
            .dialog({
              title: 'خطا در سرور',
              // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
              message: ex.message
            })
            .finaly(this.$q.loading.hide())
        })
    }
  }
}
</script>

<style scoped>
#history-btn {
  margin-top: 10px;
}
</style>
