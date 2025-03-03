<template>
  <!-- این فرم اصلا نیازی به دسترسی نداره زمل هم آیدی ندیدم و به عنوان پاپ آپ داره باز میشه  -->
  <!-- <safa-form
  :caption="title"
    :id="formKey"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  > -->
    <form-wrapper>
      <fit>
        <div class="row q-col-gutter-sm">
          <safa-text
            label="کدملی"
            label-width="80px"
            v-model="estelam.NationalCode"
            cdcName="NationalCode"
            m="e"
            class="col-12"
            required
            :validations="['required', validations.NationalCode]"
          />
          <safa-datepicker
            label="تاریخ تولد"
            label-width="80px"
            v-model="estelam.BirthDate"
            cdcName="BirthDate"
            m="e"
            class="col-12"
            required
          />
          <safa-text
            label="نام خانوادگی"
            label-width="80px"
            v-model="estelam.OwnerName"
            cdcName="OwnerName"
            m="r"
            class="col-12"
          />
        </div>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-save label="استعلام" @click="chechSettingToCallEstelamServ" />
          <btn-default
            label="انتخاب"
            :disable="!isJson && !isWCF"
            @click="selectedHandler"
          />
        </div>
      </template>
    </form-wrapper>
  <!-- </safa-form> -->
</template>

<script>
import customValidation from "src/utils/customValidation"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  name: "UCheckSabteahval",
  props: {
    name: String,
    title: String,
    formKey: String,
    m: String,
    baseNosaziCode: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    settingData: {
      type: Object,
      default: () => ({
        Chk_IsCheckSabt: false,
        Chk_IsCheckSabtJson: false,
        Chk_IsCheckSabtWCF: false
      })
    }
  },
  data () {
    return {
      spModel: 30,
      estelamModel: null,
      getNationalCodeInquiryRes: null,
      getPersonAuthenticationRes: null,
      showCheckSabtModal: false,
      estelam: {
        NationalCode: "",
        BirthDate: "",
        OwnerName: ""
      },
      typeOfServ: null,
      isJson: false,
      isWCF: false,
      validations: {
        NationalCode: customValidation.nationalCode
      }
    }
  },
  methods: {
    showCheckSabtModalHandler (params) {
      if (this.m === "r") {
        return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.")
      }
      this.showCheckSabtModal = true
      this.params = params
    },
    chechSettingToCallEstelamServ () {
      const _set = this.settingData
      if (
        _set.Chk_IsCheckSabtJson === true &&
        _set.Chk_IsCheckSabtWCF === false
      ) {
        // is Json
        this.getNationalCodeInquiry()
      }
      if (
        _set.Chk_IsCheckSabtJson === false &&
        _set.Chk_IsCheckSabtWCF === true
      ) {
        // is WCF
        this.getPersonAuthentication()
      }
    },
    async getNationalCodeInquiry () {
      // is Json
      if (!this.isValidForm()) return
      try {
        const birthDayArray = this.estelam.BirthDate.split("/")
        // console.log("birthDayArray :>> ", birthDayArray)
        if (birthDayArray.length < 3) {
          this.showError("تاریخ تولد به درستی وارد نشده است")
        }
        const payload = {
          pNationalCode: this.estelam.NationalCode,
          pBirthDate_Year: birthDayArray[0],
          pBirthDate_Month: birthDayArray[1],
          pBirthDate_Day: birthDayArray[2]
        }
        this.showLoading()
        const { data } = await this.$services.SC.getNationalCodeInquiry(
          payload,
          { config: { District: this.baseNosaziCode?.District ?? 1 } }
        )
        this.getNationalCodeInquiryRes = this.getResponse(data)
        if (this.getNationalCodeInquiryRes.success) {
          this.estelamModel = this.getNationalCodeInquiryRes.data
          this.estelam.OwnerName =
            this.estelamModel.PersonInfo.name +
            " " +
            this.estelamModel.PersonInfo.family
          this.estelamModel.PersonInfo.nationalCode = this.estelam.NationalCode
          this.estelamModel.PersonInfo.birthDate = this.estelam.BirthDate
          this.isJson = true
          this.isWCF = false
          this.typeOfServ = "isJson"
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getPersonAuthentication () {
      // is WCF
      if (!this.isValidForm()) return
      try {
        const birthDayArray = this.estelam.BirthDate.split("/")
        // console.log("birthDayArray :>> ", birthDayArray)
        if (birthDayArray.length < 3) {
          this.showError("تاریخ تولد به درستی وارد نشده است")
        }
        const payload = {
          pNationalCode: this.estelam.NationalCode,
          BirthDate_Year: birthDayArray[0],
          BirthDate_Month: birthDayArray[1],
          BirthDate_Day: birthDayArray[2]
        }
        this.showLoading()
        const { data } = await this.$services.SC.getPersonAuthentication(
          payload,
          { config: { District: this.baseNosaziCode?.District ?? 1 } }
        )
        this.getPersonAuthenticationRes = this.getResponse(data)
        if (this.getPersonAuthenticationRes.success) {
          this.estelamModel = this.getPersonAuthenticationRes.data
          this.estelam.OwnerName =
            this.estelamModel.PersonInfo.name +
            " " +
            this.estelamModel.PersonInfo.family
          this.estelamModel.PersonInfo.nationalCode = this.estelam.NationalCode
          this.estelamModel.PersonInfo.birthDate = this.estelam.BirthDate
          this.isJson = false
          this.isWCF = true
          this.typeOfServ = "isWCF"
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectedHandler () {
      this.showConfirm("آیا از جایگزین شدن اطلاعات اطمینان دارید؟").onOk(() => {
        this.$emit("changeDataAfterEstelam", {
          estelamModel: this.estelamModel,
          typeOfServ: this.typeOfServ
        })
      })
    }
  }
}
</script>
