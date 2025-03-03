<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="عملیات قوانین تخفیف یا معافیت">
      <safa-status :result="requestResult"/>
      <fit>
        <div class="row items-end q-col-gutter-md">
          <div class="col-auto-sm">
            <safa-text
              v-model="moafiyat.moafiyatCode"
              cdcName="moafiyatCode"
              label="کد معافیت"
              m="r"
            >
              <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                color="primary"
                name="search"
                size="xs"
                style="position: relative; right: 5px"
                @click="showModal"
              />
            </template>
            </safa-text>
          </div>
          <div class="col-3">
            <safa-text
              v-model="moafiyat.moafiyatTitle"
              cdcName="moafiyatTitle"
              m="r"
            />
          </div>
          <div class="col-3 ">
            <btn-search
              class="q-mr-sm"
              @click="searchData"
            />
            <btn-default
              label="بازآوری"
              @click="loadData"
            >
            </btn-default>
          </div>
        </div>
        <safa-datatable
          v-model="formModel.Duty_ExemptionRole"
          :filterable="true"
          :loadingAnimation='false'
          :m="mode"
          cdcName="Duty_ExemptionRole"
          class="q-mt-sm"
          fit
          height="100%"
          helper="nosazi.moafiyatRules"
          max-height="100%"
          title="عملیات قوانین تخفیف یا معافیت"
          :allowMultipleSelection="false"
        ></safa-datatable>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveData"
        />
      </template>
        <safa-popup
          v-model="isShowModal"
          title="عملیات معافیت/تخفیف"
        >
          <UMoafiyatRulesBase
            :formKey="formKey"
            :name="name"
            :title="title"
            @dbclick="dbclick"
          />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import FormActions from 'src/components/FormActions.vue'
import loadDataResponse from './models/loadDataResponse.js'
import savePrequest from './models/savePrequest.js'
import UMoafiyatRulesBase from './partials/UMoafiyatRulesBase.vue'

export default {
  route: '/nosazi-avarez/moafiyat-rules',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'عملیات قوانین تخفیف یا معافیت',
      formKey: '29393232-bf65-42f4-ba19-fb9a2e7d5268',
      name: 'UMoafyatRulesNosazi',
      main: true,
      requestResult: {},
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
              bizCodeTitle: ''
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

            await this.log({
              action: this.logActions.view,
              bizCode: this.searchPrequest.pExemptionType,
              bizCodeTitle: 'pExemptionType'
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    normalizeSave (data) {
      return data.map((row) => {
        return {
          ...row,
          Nid: row.Nid || '00000000-0000-0000-0000-000000000000',
          NidUser: row.NidUser || '00000000-0000-0000-0000-000000000000',
          uniqueID: row.uniqueID || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    saveData () {
      try {
        savePrequest.pDutyExemption.Duty_ExemptionRole = this.normalizeSave(
          this.formModel.Duty_ExemptionRole)

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
              bizCodeTitle: 'Duty_ExemptionRole'
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
    dbclick (val) {
      debugger
      this.isShowModal = false

      this.moafiyat.moafiyatCode = val.row.CI_ExemptionType

      this.moafiyat.moafiyatTitle = val.row.Title

      this.searchPrequest.pExemptionType = val.row.CI_ExemptionType
    }
  }
}
</script>
