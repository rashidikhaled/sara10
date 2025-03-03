<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper
      title=" چاپ جمعی فیش"
      vertical
    >
      <safa-status :result="requestResult"/>
      <!-- <fit> -->
      <div class="row q-col-gutter-lg">
        <nosazi-code-input
          v-model="fromNosaziCode"
          cdcName="fromNosaziCode"
          label="از"
          label-width="30px"
          @enter="fromNosaziCodeInput"
        >
        </nosazi-code-input>
        <nosazi-code-input
          ref="toNosazi"
          v-model="toNosaziCode"
          cdcName="toNosaziCode"
          label="تا"
          label-width="30px"
          @enter="toNosaziCodeInput"
        >
        </nosazi-code-input>
      </div>
      <internal-section class="q-mt-sm">
        <div class="row q-col-gutter-x-lg q-col-gutter-y-sm q-mb-sm">
          <div class="col-12 col-sm-6  col-md-4">
            <safa-datepicker
              v-model="transferPrequest.pFromDate"

              cdcName="pFromDate"
              display-format="dddd jDD jMMMM jYYYY"
              format="jYYYY/jMM/jDD"
              label="از تاریخ"
              label-width="80px"
              locale="fa"
              placeholder="از تاریخ"
            ></safa-datepicker>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <safa-datepicker
              v-model="transferPrequest.pToDate"

              cdcName="pToDate"
              display-format="dddd jDD jMMMM jYYYY"
              format="jYYYY/jMM/jDD"
              label="تا تاریخ"
              label-width="70px"
              locale="fa"
              placeholder="تا تاریخ"
            ></safa-datepicker>
          </div>
        </div>
        <div class="row q-col-gutter-x-lg ">
          <div class="col-12 col-sm-6 col-md-4">
            <safa-combo
              v-model="transferPrequest.pCI_DutyFicheExportType"

              cdcName="pCI_DutyFicheExportType"
              ciName="CI_DutyFicheExportType"
              domainName="CI_SaraM1"
              input-debounce="0"
              label="نوع صدور فیش"
              label-width="80px"
            ></safa-combo>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <safa-text
              cdcName="fichCount"
              label="تعداد فیش"
              label-width="70px"
            />
          </div>
        </div>

      </internal-section>

      <template v-slot:footer>
        <div class="col-12 q-gutter-md">
          <btn-default
            label="انتقال فیش"
            @click="transferFish"
          />
          <btn-default
            label="چاپ فیش"
            @click="printFish"
          />
        </div>
      </template>
      <!-- </fit> -->
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import BtnDefault from '../../../../components/common/buttons/BtnDefault.vue'

export default {
  components: { BtnDefault },
  route: '/nosazi-avarez/fish-aggregate-print',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'چاپ جمعی فیش',
      formKey: '6a5506c3-b76a-4934-a38b-a7b37d12f845',
      name: 'UFishAggregatePrint',
      main: true,
      fromNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      toNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      transferPrequest: {
        pFromCode: '',
        pToCode: '',
        pDutyType: '0',
        pFromDate: '',
        pToDate: '',
        pCI_DutyFicheExportType: 0
      },
      requestResult: {},
      printFishPrequest: {
        pFromCode: '0-0-0-0-0-0-0',
        pToCode: '0-0-0-0-0-0-0',
        pDutyType: '0',
        pFromDate: '',
        pToDate: '',
        pCI_DutyFicheExportType: '0'
      }
    }
  },
  methods: {
    transferFish () {
      try {
        // this.decodeAndConfirmPrequest.pRegion = this.selectedRegion
        // this.decodeAndConfirmPrequest.pStartDate = this.formModel.fromDate
        // this.decodeAndConfirmPrequest.pEndDate = this.formModel.toDate
        // this.decodeAndConfirmPrequest.pUserCode = this.getNidUser()
        // this.decodeAndConfirmPrequest.pUserName = this.getUserDisplayName()

        if (this.transferPrequest.pFromDate === '') {
          this.showError('لطفا فیلد از تاریخ را وارد کنید')

          return
        }

        if (this.transferPrequest.pToDate === '') {
          this.showError('لطفا تا تاریخ را وارد کنید')

          return
        }

        this.transferPrequest.pFromCode = convertNosaziCodeObjectToString(
          this.fromNosaziCode
        )
        // debugger
        if (this.transferPrequest.pFromCode === '0-0-0-0-0-0-0') {
          this.showError(
            'لطفا فیلد از کد نوسازی را وارد کنید   ' +
            this.transferPrequest.pFromCode
          )

          return
        }

        this.transferPrequest.pToCode = convertNosaziCodeObjectToString(
          this.toNosaziCode
        )

        if (this.transferPrequest.pToCode === '0-0-0-0-0-0-0') {
          this.showError(
            'لطفا فیلد تا کد نوسازی را وارد کنید    ' +
            this.transferPrequest.pToCode
          )

          return
        }

        this.showSending()
        this.$services.SB.transferDutyFicheForPrint(this.transferPrequest, {
          config: {
            District: this.fromNosaziCode.District
          }
        }).then(async (response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.IsTransferOK) {
            this.showError('فیشی یافت نشد')

            return
          }

          if (!this.requestResult.hasError) {
            await this.log({
              action: this.logActions.viexportFicheew,
              bizCode: this.transferPrequest.pCI_DutyFicheExportType,
              bizCodeTitle: 'نوع صدور فیش'
            })

            this.showSuccess('انتقال فیش ها با موفقیت انجام شد')
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      }
    },
    fromNosaziCodeInput () {
      this.$refs.toNosazi.setFocus()
    },
    toNosaziCodeInput () {
    },
    printFish () {
      if (this.fromNosaziCode.District === 0) {
        this.showError('لطفا فیلد از کد نوسازی را وارد کنید')

        return
      }

      if (this.toNosaziCode.District === 0) {
        this.showError('لطفا فیلدتا کد نوسازی را وارد کنید')

        return
      }

      if (this.transferPrequest.pFromDate === '') {
        this.showError('لطفا فیلد از تاریخ را وارد کنید')

        return
      }

      if (this.transferPrequest.pToDate === '') {
        this.showError('لطفا فیلد تا تاریخ را وارد کنید')

        return
      }

      this.showSending()

      this.printFishPrequest.pFromCode = convertNosaziCodeObjectToString(
        this.fromNosaziCode
      )
      this.printFishPrequest.pToCode = convertNosaziCodeObjectToString(
        this.toNosaziCode
      )
      this.printFishPrequest.pFromDate = this.transferPrequest.pFromDate
      this.printFishPrequest.pToDate = this.transferPrequest.pToDate
      this.printFishPrequest.pCI_DutyFicheExportType =
        this.transferPrequest.pCI_DutyFicheExportType

      this.$services.SB.collectiveFichesPrint(this.printFishPrequest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            // console.log('////this.requestResult', this.requestResult)

            if (this.requestResult.data.NidFicheList === '') {
              this.showError('فیشی یافت نشد')
            }
          }
        })
        .catch((error) => {
          this.hideSending()

          this.showError(error.message)
        })
    }
  }
}
</script>
