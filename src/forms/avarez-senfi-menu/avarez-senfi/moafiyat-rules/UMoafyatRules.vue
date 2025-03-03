<template>
  <safa-form
    :id="formKey"
    :caption="title +  '-گردشکار صنفی '"
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <form-wrapper title="عملیات قوانین تخفیف یا معافیت">
    <template #header>
      <safa-status :result="requestResult" />
    </template>
      <fit>
        <div class="row items-end q-col-gutter-md">
          <div class="col-auto-sm">
            <safa-text
              label="کد معافیت"
              m="r"
              v-model="moafiyat.moafiyatCode"
              cdcName="moafiyatCode"
            >
              <template v-slot:append>
                <span>
                  <btn-search
                    @click="showModal"
                    title="جستجو"
                    round
                    icon="search"
                    dense
                    size="8px"
                  />
                </span>
              </template>
            </safa-text>
          </div>
          <div class="col-3">
            <safa-text
              m="r"
              v-model="moafiyat.moafiyatTitle"
               cdcName="moafiyatTitle"
            />
          </div>
          <div class="col-3 ">
            <btn-search
              @click="searchData"
              class="q-mr-sm"
            />
            <btn-default
              label="بازآوری"
              @click="loadData"
            />
          </div>
        </div>
        <safa-datatable
          v-model="formModel.Duty_ExemptionRole"
          helper="nosazi.moafiyatRules"
          :m="mode"
          :loadingAnimation='false'
          fit
          height="100%"
          max-height="100%"
          class="q-mt-sm"
          title="عملیات قوانین تخفیف یا معافیت"
          :filterable="true"
          cdcName="Duty_ExemptionRole"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="formActionEditMode"
          @edit="goToEditMode"
          @cancel="goToReadonlyMode"
          @save="saveData"
        />
      </template>

      <div class="col-1">
        <ShowModal
          :show="isShowModal"
          @hide="isShowModal = false"
          title="عملیات معافیت/تخفیف"
          @onCloseModal="closeModal"
        >
          <UMoafiyatRulesBase
            @dbclick="dbclick"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </ShowModal>
      </div>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import FormActions from 'src/components/FormActions.vue'
import loadDataResponse from './models/loadDataResponse.js'
import ShowModal from 'src/components/ShowModal.vue'
import UMoafiyatRulesBase from './partials/UMoafiyatRulesBase.vue'
import savePrequest from './models/savePrequest.js'

export default {
  route: '/nosazi-avarez/moafiyat-rules',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'عملیات قوانین تخفیف یا معافیت',
      formKey: '29393232-bf65-42f4-ba19-fb9a2e7d5267',
      name: 'UMoafyatRulesSenfi',
      main: true,
      requestResult: null,
      formActionEditMode: 'r',
      formModel: loadDataResponse,
      isShowModal: false,
      moafiyat: {
        moafiyatCode: '',
        moafiyatTitle: ''
      },
      searchPrequest: {
        pExemptionType: ''
      }
    }
  },
  components: {
    FormActions,
    ShowModal,
    UMoafiyatRulesBase
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      try {
        this.showLoading()

        this.$services.SB.getDutyExemptionRole(null, {
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
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    searchData () {
      try {
        this.showLoading()

        this.$services.SB.searchDutyExemptionRole(this.searchPrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async (response) => {
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
    saveData () {
      try {
        savePrequest.pDutyExemption.Duty_ExemptionRole =
          this.formModel.Duty_ExemptionRole

        savePrequest.pDutyExemption.pUser = this.currentUser
        /* savePrequest.pDutyExemption.pUser.JobLocationGuid =
          this.currentUser.JobLocationGuid

        savePrequest.pDutyExemption.pUser.JobLocationName =
          this.currentUser.JobLocationName

        savePrequest.pDutyExemption.pUser.JobLocationOfficeTel =
          this.currentUser.JobLocationOfficeTel

        savePrequest.pDutyExemption.pUser.UserGuid = this.getNidUser()

        savePrequest.pDutyExemption.pUser.UserName = this.getUserDisplayName() */

        this.showSending()

        this.$services.SB.saveDutyExemptionRole(savePrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async (response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.formModel.Duty_ExemptionRole.toString(),
              bizCodeTitle: 'Duty_ExemptionRole',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })

            this.showSuccess('ذخیره با موفقیت انجام شد')

            this.loadData()

            this.goToReadonlyMode()
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      }
    },
    goToEditMode () {
      this.formActionEditMode = 'e'

      this.isEditable = true
    },
    goToReadonlyMode () {
      this.formActionEditMode = 'r'

      this.isEditable = false
    },
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },
    dbclick (dataItem) {
      this.isShowModal = false

      this.moafiyat.moafiyatCode = dataItem.CI_ExemptionType

      this.moafiyat.moafiyatTitle = dataItem.Title

      this.searchPrequest.pExemptionType = dataItem.CI_ExemptionType
    }
  }
}
</script>
