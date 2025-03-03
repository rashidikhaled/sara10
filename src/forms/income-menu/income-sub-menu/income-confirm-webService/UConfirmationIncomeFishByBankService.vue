<template>
  <!-- No form key -->
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="result"/>
      </template>
      <fit>
        <div class="row q-col-gutter-sm">
          <safa-combo
            class="col-12 col-sm-3"
            source-type="local"
            :options="districts"
            label="منطقه"
            :use-input="false"
            v-model="selectedRegion"
            cdcName="selectedRegion"
            label-width="50px"
          />
          <safa-combo-enum
            class="col-12 col-sm-3"
            enum-name="EumIncomeFicheType"
            label="نوع فیش"
            v-model="selectedAvarez"
            cdcName="selectedAvarez"
            label-width="50px"
          ></safa-combo-enum>
          <safa-datepicker
            class="col-12 col-sm-3"
            label="از تاریخ"
            v-model="startDate"
            label-width="50px"
          />
          <safa-datepicker
            class="col-12 col-sm-3"
            label="تا تاریخ"
            v-model="endDate"
            cdcName="endDate"
            label-width="50px"
          />
        </div>
        <safa-datatable
          v-model="results.BankFileContract"
          cdcName="BankFileContract"
          helper="confirmFicheByWebService"
          fit
          height="100%"
          max-height="100%"
          class="q-mt-sm"
        />
      </fit>
      <template v-slot:footer>
        <btn-default
          label="تایید"
          @click="confirmByWebService"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/income/confirmation-income-fish-by-bank-service',

  mixins: [baseFormMixin],
  data () {
    return {
      formKey: 'f72b5902-d603-4bb9-8724-60653506926c',
      name: 'UConfirmationIncomeFishByBankService',
      title: 'تایید فیش درآمد از طریق وب سرویس بانک',
      main: true,
      sidebarCompatible: true,
      result: null,
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1,
      startDate: '',
      endDate: '',
      selectedAvarez: 0,
      results: { BankFileContract: [] }
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  props: {},
  mounted () {
  },
  methods: {
    confirmByWebService () {
      if (this.startDate !== '' && this.endDate === '') {
        this.showError('لطفا تاریخ پایان را وارد نمایید.')
      } else {
        this.showLoading()
        let data = {
          pRegion: this.selectedRegion,
          pStartDate: this.startDate,
          pEndDate: this.endDate,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          pObjOnPrice: 1,
          pEumIncomeFicheType: 0
        }
        this.$services.SD.decodeAndConfirmIncomeViaWebService(data, {
          config: {
            District: this.selectedRegion
          }
        })
          .then(async ({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              this.results = this.result.data
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRegion.toString(),
                bizCodeTitle: 'selectedRegion'
              })
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideSending()
          })
      }
    }
  }
}
</script>
