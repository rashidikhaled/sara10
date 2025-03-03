<template>
  <safa-form :id="formKey" :caption="title" app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB">
    <form-wrapper :padding="true" :title="title">
      <template #header>
        <safa-status :result="getNidBaseRes" />
        <safa-status :result="savePricesRes" />
        <safa-status :result="confirmRes" />
        <formHeaderByNosaziCode
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="getNidBase"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-if="hasInfoGroup"
              v-model="selectedBaseInfoGroup"
              :options="infoGroupOptions"
              label="دسته اطلاعاتی"
              labelWidth="80px"
              source-type="local"
            />
          </FormControl>
        </FormRow>
        <safa-datatable
          ref="grid"
          v-model="model.Sh_EconomicPriceInEdge"
          :bordered="false"
          :m="mode"
          cdcName="regionPriceArrow"
          helper="regionPriceArrow"
          name="grid"
          title="قیمت منطقه ای بر اساس جهت"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "قیمت منطقه ای بر اساس جهت",
      formKey: "b0f0f7dd-efdd-4457-a0d6-ad4a35ec0df8",
      name: "URegionPiceArrow",
      main: true,

      selectedBaseInfoGroup: 0,
      getNidBaseRes: null,
      savePricesRes: null,
      model: {
        Sh_EconomicPriceInEdge: []
      },
      nidBase: null,
      confirmRes: null,
      selectedPrice: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  computed: {
    config () {
      return {
        config: { District: this.baseNosaziCode.District }
      }
    },
    hasInfoGroup () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").infoGroupOptions || []
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.getNidBase()
    }
  },
  methods: {
    infoGroupChange (e) {
      this.loadData()
    },
    async getNidBase () {
      try {
        const payload = {
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop,
          pDutyType: 1,
          pEumNosaziCodeGroup: 0,
          pEumBaseInfoGroup: this.selectedBaseInfoGroup
        }

        this.showLoading()
        const { data } = await this.$services.SB.getNidBase(
          payload,
          this.config
        )
        this.getNidBaseRes = this.getResponse(data)
        if (this.getNidBaseRes.success) {
          this.nidBase =
            (this.getNidBaseRes.data && this.getNidBaseRes.data.NidBase) ||
            null
          await this.loadObj()
          await this.log({
            action: this.logActions.view,
            bizCode: this.nidBase,
            bizCodeTitle: "NidBase"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SB.getEconomicPriceInEdge(
          { pNidBase: this.nidBase },
          this.config
        )
        this.getEconomicPriceInNosaziCodeRes = this.getResponse(data)
        const res = this.getEconomicPriceInNosaziCodeRes
        if (res.success) {
          this.model = res.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.nidBase,
            bizCodeTitle: "nidBase"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeShEconomicPriceInEdge () {
      return this.model.Sh_EconomicPriceInEdge.map((m) => {
        return {
          ...m,
          CI_DutyYear: m.CI_DutyYear || 0,
          CI_EconomicPriceDegree: m.CI_EconomicPriceDegree || 0,
          CI_EconomicPriceOccurrence: m.CI_EconomicPriceOccurrence || 0,
          CI_PathType: m.CI_PathType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          EconomicPriceA1: m.EconomicPriceA1 || 0,
          EconomicPriceA2: m.EconomicPriceA2 || 0,
          EconomicPriceA3: m.EconomicPriceA3 || 0,
          EconomicPriceB1: m.EconomicPriceB1 || 0,
          EconomicPriceB2: m.EconomicPriceB2 || 0,
          EconomicPriceB3: m.EconomicPriceB3 || 0,
          CI_UsingType: m.CI_UsingType || 0,
          EfectDate: m.EfectDate || 0,
          IsConfirm: m.IsConfirm || 0
        }
      })
    },

    async saveObj () {
      if (!this.nidBase) {
        return this.showError("لطفا کدنوسازی را وارد نمایید.")
      }
      try {
        const payload = {
          pClsDutyPrice: {
            Sh_EconomicPriceInEdge: this.normalizeShEconomicPriceInEdge() || [],
            pUserCode: this.getNidUser(),
            _NidBase: this.nidBase
          },
          pUserCode: this.getNidUser(),
          pFullUserName: this.getUserDisplayName(),
          pUserName: this.getUserDisplayName(),
          isAdmin: this.currentUser.isSysAdmin || false
        }
        this.showLoading()
        const { data } = await this.$services.SB.savePrices(
          payload,
          this.config
        )
        this.savePricesRes = this.getResponse(data)
        if (this.savePricesRes.success) {
          this.loadObj()
          this.showSuccess("عملیات ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.nidBase,
            bizCodeTitle: "nidBase"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  watch: {
    selectedBaseInfoGroup () {
      this.loadObj()
    }
  }
}
</script>
