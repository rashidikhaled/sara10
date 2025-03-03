<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="getAllSealedListRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              label-width="50px"
              v-model="fromDate"
              cdcName="fromDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ"
              label-width="50px"
              v-model="toDate"
              cdcName="toDate"
            />
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="70px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            @enter="loadObj"
          />
          <div>
            <btn-default label="بازآوری" @click="loadObj" />
          </div>
        </FormRow>
        <safa-grid
          title="لیست ملک های پلمب شده"
          v-model="AllSealedList"
          cdcName="AllSealedList"
          helper="allSealedListColumns"
          fit
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          min-height="100px"
          height="100%"
          max-height="100%"
          paginate
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ملک های پلمپ شده",
      formKey: "C70FC253-832D-4E3B-BB36-490F6E3704AF",
      name: "UBuildingPoliceAllSealed",
      main: true,
      sidebarCompatible: true,

      // #variables
      fromDate: "",
      toDate: "",
      AllSealedList: [],
      settingModel: {
        PersonalSetting: {
          DefaultDistrict: 0,
          DefaultRegion: 0
        }
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      // #services
      getAllSealedListRes: null
    }
  },

  async created () {
    await this.getSettingData()
    await this.loadObj()
  },

  methods: {
    async getSettingData () {
      const result = await this.loadFormSetting("Sharsazi-PersonalSetting")
      if (result && result.PersonalSettingNosazi) {
        this.baseNosaziCode = {
          ...this.baseNosaziCode,
          District: parseInt(result.PersonalSettingNosazi.DefaultDistrict) || 0,
          Region: parseInt(result.PersonalSettingNosazi.DefaultRegion) || 0
        }
      }
    },

    async loadObj () {
      if (this.baseNosaziCode.District === 0) {
        this.showError("کد نوسازی وارد شده معتبر نمی باشد.")
        return
      }
      try {
        const payload = {
          pFromDate: this.fromDate,
          pToDate: this.toDate,
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop
        }
        this.showLoading()
        const { data } = await this.$services.SH.GetAllSealedList(payload)
        this.getAllSealedListRes = this.getResponse(data)
        if (this.getAllSealedListRes.success) {
          this.AllSealedList = this.getAllSealedListRes.data.AllSealedList
          const strNosazi = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosazi,
            bizCodeTitle: "کد نوسازی",
            saveDesc: `نمایش لیست ملک های پلمپ شده با شماره ${strNosazi} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
