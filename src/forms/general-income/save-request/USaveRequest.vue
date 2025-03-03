<template>
  <safa-form
    appId="c254f209-304e-41f0-a95a-174cf1279618"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getBaseLibInNosaziCodeRes" />
        <safa-status :result="saveGeneralIncomeRes" />
      </template>
      <fit>
        <FormRow>
          <FormControl class="flex items-center">
            <div class="q-gutter-x-lg">
              <safa-radio
                label="کد ملی یا کد اقتصادی"
                v-model="eumGeneralIncomeType"
                cdcName="eumGeneralIncomeType"
                :val="1"
              />
              <safa-radio
                label="کد نوسازی"
                v-model="eumGeneralIncomeType"
                cdcName="eumGeneralIncomeType"
                :val="2"
              />
            </div>
          </FormControl>
          <FormControl v-show="eumGeneralIncomeType === 1">
            <safa-text
            label="کد ملی یا کد اقتصادی"
              label-width="80px"
              v-model="model.IdentificationNo"
              cdcName="IdentificationNo"
              type="number"
              dir="ltr"

              :m="eumGeneralIncomeType === 1 ? 'e' : 'r'"
            />
            <!-- :required="eumGeneralIncomeType === 1 ? true : false"
              :validations="
                eumGeneralIncomeType === 1
                  ? ['required', 'number', validations.NationalCode]
                  : ''
              " -->
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="80px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            :m="eumGeneralIncomeType === 2 ? 'e' : 'r'"
            @enter="enteredNosaziCode"
            v-show="eumGeneralIncomeType === 2"
          />
        </FormRow>
        <q-separator class="q-my-sm" />
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نام متقاضی"
              label-width="80px"
              v-model="model.RequesterName"
              cdcName="RequesterName"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ تولد"
              label-width="80px"
              v-model="model.BirthDate"
              cdcName="BirthDate"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره تلفن"
              v-model="model.TelNumber"
              cdcName="TelNumber"
              label-width="80px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره همراه"
              v-model="model.CellPhone"
              cdcName="CellPhone"
              label-width="80px"
            />
          </FormControl>
          <FormControl v-show="eumGeneralIncomeType === 1">
            <safa-combo
              label="منطقه"
              label-width="80px"
              v-model="model.District"
              cdcName="District"
              source-type="local"
              :options="districts"
              :required="eumGeneralIncomeType === 1 ? true : false"
              :validations="eumGeneralIncomeType === 1 ? 'required' : ''"
            />
          </FormControl>
          <safa-text
            label="آدرس"
            label-width="80px"
            v-model="model.Address"
            cdcName="Address"
            type="textarea"
            class="col-12"
          />
          <safa-text
            label="توضیحات"
            label-width="80px"
            v-model="model.Comments"
            cdcName="Comments"
            type="textarea"
            class="col-12"
          />
        </FormRow>
      </fit>
      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-save @click="saveObj" label="ذخیره" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import customValidation from "src/utils/customValidation"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "USaveRequest",
      title: "ثبت درخواست",
      formKey: "6EE476C1-1D23-4D42-9D9F-D3019D51C907",
      main: true,

      saveGeneralIncomeRes: null,
      nidNosaziCode: null,

      eumGeneralIncomeType: 1,
      // eumGeneralIncomeType: {
      //   Person: 1, // شخص
      //   Estate: 2 // ملک}
      // },

      model: {
        IdentificationNo: null,
        EnumGeneralIncomeType: null,
        RequesterName: "",
        BirthDate: "",
        TelNumber: "",
        CellPhone: "",
        Address: "",
        Comments: "",
        District: 1
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
      validations: {
        NationalCode: customValidation.nationalCode
      },
      getBaseLibInNosaziCodeRes: null,
      nosaziInfo: null
    }
  },
  methods: {
    checkNationalCodeIsValid () {
      const result = customValidation.nationalCode.validate(
        this.model.IdentificationNo
      )
      return !result.error
    },

    enteredNosaziCode (e) {
      this.baseNosaziCode = e
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          {
            pNosaziCode: {
              Apartment: this.baseNosaziCode.Apartment,
              Block: this.baseNosaziCode.Block,
              Building: this.baseNosaziCode.Building,
              CI_City: 0,
              District: this.baseNosaziCode.District,
              EumBaseInfoGroup: 0,
              EumNosaziCodeGroup: 0,
              EumNosaziCodeObjType: 0,
              EumRevisitGroup: 0,
              House: this.baseNosaziCode.House,
              NidBase: "00000000-0000-0000-0000-000000000000",
              NidNosaziCode: "00000000-0000-0000-0000-000000000000",
              Region: this.baseNosaziCode.Region,
              Shop: this.baseNosaziCode.Shop
            },
            pLoadFunc:
              "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
            pIsLoadDeletedNosaziCode: false
          },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getBaseLibInNosaziCodeRes = this.getResponse(data)
        if (this.getBaseLibInNosaziCodeRes.success) {
          this.nosaziInfo = this.getBaseLibInNosaziCodeRes.data.MainObj
          await this.log({
            action: this.logActions.view,
            bizCode: this.nosaziInfo.NidNosaziCode,
            bizCodeTitle: "NidNosaziCode",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        }
      } catch (e) {
        console.error(e)
        // this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      // در این فیلد فقط کد ملی قرار نمیگیرد بلکه کد اقتصادی هم قرار میگیرد.به همین خاطر ولیدیشن کاربردی نیست
      // if (this.eumGeneralIncomeType === 1 && !this.checkNationalCodeIsValid()) {
      //   this.showError("کد ملی وارد شده معتبر نمیباشد.")
      //   return
      // }
      if (this.eumGeneralIncomeType === 2) {
        if (this.baseNosaziCode.District === 0) {
          return this.showError(
            "منطقه ی وارد شده در کدنوسازی، مقدار مجاز نمی باشد."
          )
        }
        await this.loadObj()
      }
      if (!this.isValidForm()) return
      if (this.eumGeneralIncomeType === 2 && this.nosaziInfo === null) return
      this.showLoading()
      const strNosaziCode = convertNosaziCodeObjectToString(
        this.baseNosaziCode
      )
      try {
        const payload = {
          pGeneralIncome: {
            Address: this.model.Address,
            BirthDate: this.model.BirthDate,
            CellPhone: this.model.CellPhone,
            Comments: this.model.Comments,
            IdentificationNo:
              this.eumGeneralIncomeType === 1
                ? this.model.IdentificationNo
                : strNosaziCode,
            NidNosaziCode:
              this.eumGeneralIncomeType === 1
                ? null
                : this.nosaziInfo.NidNosaziCode,
            NidUser: this.currentUser.NidUser,
            RequesterName: this.model.RequesterName,
            TelNumber: this.model.TelNumber,
            District:
              this.eumGeneralIncomeType === 1
                ? this.model.District
                : this.baseNosaziCode.District,
            EnumGeneralIncomeType: this.eumGeneralIncomeType,
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.generalIncome.saveGeneralIncome(payload, { config: { District: this.model.District } })
        this.saveGeneralIncomeRes = this.getResponse(data)
        if (this.saveGeneralIncomeRes.success) {
          debugger
          await this.log({
            action: this.logActions.save,
            bizCode:
              this.eumGeneralIncomeType === 1
                ? this.model.IdentificationNo
                : strNosaziCode,
            bizCodeTitle:
              this.eumGeneralIncomeType === 1 ? "کد ملی" : "کد نوسازی",
            nosaziCode: this.eumGeneralIncomeType === 2 ? "" : strNosaziCode
          })
          this.resetValidation()
          this.nosaziInfo = null
          this.showSuccess("ثبت درخواست با موفقیت انجام شد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  watch: {
    eumGeneralIncomeType: {
      handler () {
        this.baseNosaziCode = {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
        this.model.IdentificationNo = null
        this.nosaziInfo = null
      },
      immediate: true
    }
  }
}
</script>
