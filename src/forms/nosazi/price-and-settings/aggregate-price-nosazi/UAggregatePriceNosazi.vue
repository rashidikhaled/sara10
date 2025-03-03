<template>
  <safa-form :id="formKey" :caption="title" app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB">
    <form-wrapper :title="title">
        <safa-status :result="requestResult" />
      <fit>
        <form-row>
            <nosazi-code-input
              v-model="baseNosaziCodeFrom"
              label-width="100px"
              cdcName="baseNosaziCodeFrom"
              label="از"
            />
            <nosazi-code-input
              v-model="baseNosaziCodeTo"
              label-width="100px"
              cdcName="baseNosaziCodeTo"
              label="تا"
            />
        </form-row>
        <internal-section class="q-mt-md" title="مقدار">
          <form-row>
            <form-control>
              <safa-combo
                v-model="formModel.CI_Years"
                cdcName="Years"
                ciName="CI_DutyYear"
                domainName="CI_SaraM1"
                input-debounce="0"
                label="سال"
                :sortFunc="sortCombo"
                label-width="50px"
              />
            </form-control>
            <form-control>
              <safa-combo
                v-model="formModel.CI_PriceGroup"
                cdcName="PriceGroup"
                ciName="CI_PriceGroup"
                domainName="CI_SaraM1"
                input-debounce="0"
                label="کد گروه مبلغ"
                label-width="70px"
              />
            </form-control>
            <form-control>
              <safa-custom-text
                v-model="formModel.Price"
                cdcName="Price"
                label="قیمت"
                label-width="50px"
                type="money"
              />
            </form-control>
          </form-row>
        </internal-section>
      </fit>
      <template v-slot:footer>
        <btn-default
          label="تایید"
          @click="saveGroupEconomicPriceInNosaziCode"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  route: "/price-settings/aggregate-price-nosazi",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "قیمت جمعی منطقه ای بر اساس کد نوسازی",
      formKey: "a2b5c43a-fa1c-42a1-8426-b68661592050",
      name: "UAggregatePriceNosazi",
      main: true,
      sidebarCompatible: true,
      saveDataPrequest: {
        pFromCode: "",
        pToCode: "",
        pYear: "",
        pCI_PriceGroup: "",
        pPrice: ""
      },
      formModel: {
        Price: 0,
        CI_PriceGroup: 0,
        CI_Years: 1403,
        CI_DutyYear: null,
        BlockNo: "",
        Sh_FinancePrice: []
      },
      baseNosaziCodeFrom: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCodeTo: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      requestResult: null,
      items: []
    }
  },
  props: {
    value: Object
  },
  methods: {
    sortCombo (a, b) {
      return b.Title - a.Title
    },
    async saveGroupEconomicPriceInNosaziCode () {
      try {
        if (!this.isValidForm()) return
        if (this.baseNosaziCodeFrom.Region === 0 || this.baseNosaziCodeTo.Region === 0) {
          return this.showError("لطفا کد نوسازی را صحیح وارد نمایید.")
        }
        this.saveDataPrequest.pFromCode = convertNosaziCodeObjectToString(
          this.baseNosaziCodeFrom
        )
        this.saveDataPrequest.pToCode = convertNosaziCodeObjectToString(
          this.baseNosaziCodeTo
        )
        this.saveDataPrequest.pYear = this.formModel.CI_Years
        this.saveDataPrequest.pCI_PriceGroup = this.formModel.CI_PriceGroup
        this.saveDataPrequest.pPrice = this.formModel.Price

        const { data } = await this.$services.SB.saveGroupEconomicPriceInNosaziCode(
          this.saveDataPrequest
        )
        this.requestResult = this.getResponse(data)

        if (this.requestResult.success) {
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.saveDataPrequest.pFromCode
          )

          await this.log({
            action: this.logActions.save,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: "strNosaziCode"
          })

          this.showSuccess("ذخیره با موفقیت انجام شد.")
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
