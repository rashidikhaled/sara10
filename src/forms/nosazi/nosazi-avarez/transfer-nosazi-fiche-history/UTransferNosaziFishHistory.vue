<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :hasFooter="false" title="تاریخچه انتقال فیش نوسازی">
      <safa-status :result="requestResult"/>
      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              v-model="loadDataPrequest.NumFiche"
              cdcName="NumFiche"
              dir="ltr"
              label="شماره فیش"
              v-on:keyup="ficheNoKeyUp"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="selectedRegion"
              :options="districts"
              :use-input="false"
              cdcName="selectedRegion"
              label="منطقه"
              label-width="50px"
              source-type="local"
            >
            </safa-combo>
          </FormControl>
        </FormRow>
        <safa-datatable
          ref="grid"
          v-model="formModel.Duty_TransferFicheLogList"
          :allowCopy="false"
          :allowNewRow="false"
          :allowRemoveRow="false"
          :hideToolbar="true"
          cdcName="transferNosaziFicheHistory"
          class="q-mt-sm"
          fit
          height="100%"
          helper="transferNosaziFicheHistory"
          m="r"
          max-height="100%"
          name="grid"
          title="تاریخچه انتقال فیش نوسازی"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import loadModel from './models/loadDataResponse.js'

export default {
  route: '/nosazi-avarez/transfer-nosazi-fish-history',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تاریخچه انتقال فیش نوسازی',
      formKey: 'cf18fc91-5c52-4bc0-8144-ce1dbc03ebed',
      name: 'UTransferNosaziFishHistory',
      main: true,
      sidebarCompatible: true,

      selectedRegion: 1,
      loadDataPrequest: {
        NumFiche: '',
        PDutyType: '1'
      },
      requestResult: {},
      formModel: loadModel
    }
  },

  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },

  methods: {
    ficheNoKeyUp (e) {
      if (e.key === 'Enter') {
        if (this.loadDataPrequest.NumFiche === '') {
          this.showError('لطفا شماره فیش را وارد نمایید')

          return
        }

        this.getTransferFicheLogList()
      }
    },
    loadData () {
      try {
        this.showLoading()
        this.$services.SB.getTransferFicheLogList(this.loadDataPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.loadDataPrequest.NumFiche.toString(),
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    getTransferFicheLogList () {
      try {
        this.requestResult = {}
        this.showLoading()
        this.$services.SB.getTransferFicheLogList(this.loadDataPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.loadDataPrequest.NumFiche.toString(),
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    }
  }
}
</script>
