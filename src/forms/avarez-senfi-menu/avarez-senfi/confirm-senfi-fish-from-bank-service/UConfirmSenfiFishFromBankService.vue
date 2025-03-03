<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper title="تایید فیش بانکی از وب سرویس بانک">
      <fit>
      <template #header>
        <safa-status :result="result"/>
      </template>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              source-type="local"
              :options="districts"
              label="منطقه"
              :use-input="false"
              v-model="selectedRegion"
              cdcName="selectedRegion"
            />
          </form-control>
          <form-control>
            <safa-combo
              sourceType="local"
              :options="ficheType"
              label="نوع فیش"
              v-model="selectedFiche"
              cdcName="selectedFiche"
            />
          </form-control>
          <form-control>
            <safa-datepicker label="از تاریخ"  v-model="startDate"/>
          </form-control>
          <form-control>
            <safa-datepicker
              label="تا تاریخ"
              v-model="endDate"
              cdcName="endDate"
              title="تایید فیش بانکی از وب سرویس بانک"
            />
          </form-control>
        </form-row>
        <safa-datatable
          v-model="results.BankFileContract"
          cdcName="BankFileContract"
          ref="grid"
          name="grid"
          helper="confirmSenfiFicheFromBankService"
          class="fit q-mb-sm"
          min-height="140px"
          height="100%"
          max-height="100%"
        />
        <form-row class="q-mt-sm">
          <form-control>
            <safa-text
              label="کل"
              m="r"
              v-model="results.TotalFiche"
              cdcName="TotalFiche"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تأیید شده"
              m="r"
              v-model="results.ConfirmedFiche"
              cdcName="ConfirmedFiche"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تأیید شده از قبل"
              m="r"
              v-model="results.PreviousConfirmedFiche"
              cdcName="PreviousConfirmedFiche"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تأیید نشده"
              m="r"
              v-model="results.NotConfirmedFiche"
              cdcName="NotConfirmedFiche"
            />
          </form-control>
        </form-row>
      </fit>
      <template v-slot:footer>
        <btn-default
          label="تایید"
          class="btn-confirm"
          @click="confirmByWebService"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'

export default {
  route: 'avareze-senfi/confirm-senfi-fish-from-bank-service',
  mixins: [baseFormMixin, loaderMixin],
  data () {
    return {
      title: 'تایید فیش بانکی از وب سرویس بانک',
      formKey: '5a280109-cf92-4b82-b68f-3ee6912178f8',
      name: 'UConfirmSenfiFishFromBankService',
      main: true,
      sidebarCompatible: true,
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      ficheType: [
        { ID: 0, Title: 'صنفی' },
        { ID: 1, Title: 'سازمان فاوا' }
      ],
      selectedFiche: 0,
      selectedRegion: 1,
      startDate: '',
      endDate: '',
      result: null,
      results: { BankFileContract: [] }
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
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
          pObjOnPrice: 3,
          PDutyType: 2,
          pSetPayOffForConfirmYearly: false,
          pEumIncomeFicheType: 0,
          pSetPayOffForConfirmCollective: false,
          pDutyFicheType: this.selectedFiche
        }
        this.$services.SB.decodeAndConfirmViaWebService(data, {
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
                bizCodeTitle: 'منطقه انتخاب شده',
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
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
