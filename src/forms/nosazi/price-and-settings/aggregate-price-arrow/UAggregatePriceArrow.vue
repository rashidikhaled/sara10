<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="قیمت جمعی منطقه ای بر اساس جهات">
    <template #header>
      <safa-status :result="requestResult"/>
    </template>
      <internal-section>
        <div class="row q-gutter-lg flex items-center">
          <div class="col-12 col-sm-auto col-md-auto ">
            <nosazi-code-input
              ref="fromNosaziCodeRef"
              v-model="fromNosaziCode"
              cdcName="fromNosaziCode"
              label="از"
              label-width="20px"
            />
          </div>
          <div class="col-12 col-sm-auto col-md-auto">
            <nosazi-code-input
              v-model="toNosaziCode"
              cdcName="toNosaziCode"
              label="تا"
              label-width="20px"
            />
          </div>
        </div>
      </internal-section>

      <internal-section
        class="q-my-md"
        title="شرط"
      >
        <div class="row  q-col-gutter-lg">
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.arzAzMabar"
              cdcName="arzAzMabar"
              label="عرض معبر از"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.arzeMabarTa"
              cdcName="arzeMabarTa"
              label="عرض معبر تا"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-combo
              v-model="formModel.pCI_SideCode"
              cdcName="SideCode"
              ciName="CI_SideCode"
              domainName="CI_SaraM1"
              input-debounce="0"
              label="جهت معبر"
              label-width="110px"
            />
          </div>
        </div>
      </internal-section>

      <internal-section title="مقدار">
        <!-- <safa-group label-width="120px" margin="0" > -->
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.firstDeep"
              cdcName="firstDeep"
              label="ارزش عمق اول"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.firstJebhe"
              cdcName="firstJebhe"
              label="ارزش پشت جبهه اول"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.secondDeep"
              cdcName="secondDeep"
              label="ارزش عمق دوم"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.secondJebhe"
              cdcName="secondJebhe"
              label="ارزش پشت جبهه دوم"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              v-model="formModel.thirdDeep"
              cdcName="thirdDeep"
              label="ارزش عمق سوم"
              label-width="110px"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <safa-combo
              v-model="formModel.year"
              :sortFunc="sortCombo"
              cdcName="year"
              ciName="CI_DutyYear"
              domainName="CI_SaraM1"
              input-debounce="0"
              label="سال"
              label-width="110px"
            />
          </div>
        </div>
        <!-- </safa-group> -->
      </internal-section>

      <template v-slot:footer>
        <btn-default
          label="تایید"
          @click="confirm"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation.js'

export default {
  route: '/price-settings/aggregate-price-arrow',

  mixins: [baseFormMixin],
  data () {
    return {
      formModel: {
        arzAzMabar: '',
        arzeMabarTa: '',
        firstDeep: '',
        secondDeep: '',
        thirdDeep: '',
        firstJebhe: '',
        secondJebhe: '',
        year: null
      },
      title: 'قیمت جمعی منطقه ای بر اساس جهات',
      formKey: '661ab666-3487-46e9-8206-dbc1e6db1fe8',
      name: 'UAggregatePriceArrow',
      main: true,
      sidebarCompatible: true,
      selectedArrow: 0,
      selectedYear: 6,
      confirmPrequest: {
        pFromCode: '',
        pToCode: '',
        pFromPathWidth: '0',
        pToPathWidth: '0',
        pYear: '0',
        pCI_SideCode: '0',
        pA1Price: '0',
        pA2Price: '0',
        pA3Price: '0',
        pB1Price: '0',
        pB2Price: '0'
      },
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
      requestResult: {}
    }
  },
  methods: {
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    confirm () {
      try {
        const fromCode = convertNosaziCodeObjectToString(
          this.fromNosaziCode
        )

        const toCode = convertNosaziCodeObjectToString(
          this.toNosaziCode
        )

        if (fromCode === '0-0-0-0-0-0-0' || toCode === '0-0-0-0-0-0-0') {
          this.showError('لطفا کد نوسازی را صحیح وارد نمایید')

          return
        }

        let payLoad = {
          pFromCode: fromCode,
          pToCode: toCode,
          pFromPathWidth: this.formModel.arzAzMabar || 0,
          pToPathWidth: this.formModel.arzeMabarTa || 0,
          pYear: this.formModel.year || 1,
          pCI_SideCode: this.formModel.pCI_SideCode || 0,
          pA1Price: this.formModel.firstDeep || 0,
          pA2Price: this.formModel.secondDeep || 0,
          pA3Price: this.formModel.thirdDeep || 0,
          pB1Price: this.formModel.firstJebhe || 0,
          pB2Price: this.formModel.secondJebhe || 0
        }
        this.showLoading()
        this.$services.SB.saveGroupEconomicPriceInEdge(
          payLoad,
          {
            config: {
              District: 1
            }
          }
        ).then(async response => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.confirmPrequest.pFromCode,
              bizCodeTitle: 'کد نوسازی از'
            })

            this.showSuccess('ذخیره با موفقیت انجام شد')
          }
        })
      } catch (error) {
        this.serverError()
        this.hideLoading()
      }
    }

  }
}
</script>
