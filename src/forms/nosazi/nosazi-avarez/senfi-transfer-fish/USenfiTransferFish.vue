<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="fromModelRes" />
        <safa-status :result="getDutyFichesRes" />
        <safa-status :result="getDutyFicheByFicheNoRes" />
        <safa-status :result="getDutyFicheByBillIdRes" />
        <safa-status :result="toModelRes" />
        <safa-status :result="transferDutyFichesRes" />
      </template>
      <fit>
        <FormRow>
          <FormControl>
            <safa-combo
              v-if="isShowBaseInfoGroupCombo"
              label="دسته اطلاعاتی"
              label-width="100px"
              sourceType="local"
              :options="infoGroupOptions"
              v-model="baseInfoGroup"
            />
          </FormControl>
          <div class="flex items-center q-gutter-x-lg">
            <safa-radio
              label="انتقال فیش از طریق شماره فیش"
              v-model="transferType"
              size="xs"
              val="byFiche"
            />
            <safa-radio
              label="انتقال فیش از طریق مشخصات و آدرس"
              v-model="transferType"
              size="xs"
              val="byInfo"
            />
          </div>
        </FormRow>
        <q-separator class="q-my-sm" />
        <FormRow class="q-mb-sm" v-if="transferType === 'byInfo'">
          <safa-label required class="col-12">مشخصات مبدا</safa-label>
          <nosazi-code-input
            label="کدنوسازی مبدا"
            label-width="100px"
            class="col-12"
            v-model="baseNosaziCode"
            :m="transferType === 'byInfo' ? 'e' : 'r'"
            cdcName="baseNosaziCode"
            @enter="getShopCodeInfoFrom"
          />
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="100px"
              v-model="fromModelOwners"
              cdcName="owner"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد فیش"
              label-width="100px"
              v-model="fromFichsCount"
              cdcName="FichsCount"
              m="r"
            />
          </FormControl>
          <safa-text
            label="آدرس"
            label-width="100px"
            v-model="fromAddModel.Base_AddressInfo.MainAddress"
            cdcName="MainAddress"
            class="col-12"
            m="r"
            :rows="2"
            type="textarea"
          />
        </FormRow>
        <FormRow v-else>
          <safa-label required class="col-12">مشخصات مبدا</safa-label>
          <FormControl>
            <safa-text
              label="شماره فیش"
              label-width="100px"
              v-model="ficheInfo.FicheNo"
              :m="lockFishObj"
              cdcName="FicheNo"
              @keypress.enter="getFicheByFicheNo"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label=" شناسه قبض"
              label-width="100px"
              v-model="ficheInfo.BillID"
              cdcName="BillID"
              :m="lockFishObj"
              @keypress.enter="getDutyFicheByBillId"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label=" شناسه پرداخت"
              label-width="100px"
              v-model="ficheInfo.PaymentID"
              cdcName="PaymentID"
              :m="lockFishObj"
              @keypress.enter="getDutyFicheByBillId"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="100px"
              v-model="selectedRegion"
              cdcName="selectedRegion"
              :options="districts"
              source-type="local"
              :m="lockFishObj"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ پرداخت"
              label-width="100px"
              v-model="ficheInfo.PaymentDate"
              cdcName="PaymentDate"
              :m="lockFishObj"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تاریخ صدور فیش"
              label-width="100px"
              v-model="ficheInfo.ExportDate"
              cdcName="ExportDate"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-custom-text
              label="مبلغ فیش"
              label-width="100px"
              v-model="ficheInfo.PayablePrice"
              type="money"
              cdcName="PayablePrice"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد بانک"
              label-width="100px"
              v-model="ficheInfo.ConfirmBankCode"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره فیش بانکی"
              label-width="100px"
              v-model="ficheInfo.BankFicheNo"
              cdcName="BankFicheNo"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تاریخ تایید"
              label-width="100px"
              v-model="ficheInfo.UserConfirmationDate"
              cdcName="UserConfirmationDate"
              m="r"
            />
          </FormControl>
          <div class="q-gutter-sm">
            <btn-default
              label="جستجو براساس شماره فیش"
              @click="getFicheByFicheNo"
            />
            <btn-default
              label="جستجو براساس شناسه"
              @click="getDutyFicheByBillId"
            />
          </div>
        </FormRow>
        <q-separator class="q-my-sm" />
        <FormRow class="q-mb-sm">
          <safa-label required class="col-12">مشخصات مقصد</safa-label>
          <nosazi-code-input
            label="کدنوسازی مقصد"
            label-width="100px"
            class="col-12"
            v-model="baseNosaziCodeNew"
            cdcName="baseNosaziCodeNew"
            @enter="getShopCodeInfoTo"
          />
          <FormControl>
            <safa-combo
              label="شغل های کد مربوطه"
              label-width="100px"
              v-model="jobCodeSelectedItem"
              cdcName="jobCodeSelectedItem"
              sourceType="local"
              :options="jobCodeOptions"
              :validations="['required', validations.jobCode]"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="100px"
              v-model="toModelOwners"
              cdcName="owner"
              m="r"
            />
          </FormControl>
        </FormRow>
        <div class="fit q-mb-sm">
          <text-template
            label="آدرس"
            label-width="100px"
            v-model="toModel.Base_AddressInfo.MainAddress"
            cdcName="MainAddress"
            m="r"
          />
        </div>
      </fit>

      <template v-slot:footer>
        <btn-save
          label="انتقال فیش"
          spId="30e0f9b2-5990-4847-844f-ed952ebb5c7a"
          spCaption="انتقال فیش"
          @click="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
const defaultModel = {
  FicheNo: "",
  BillID: "",
  PaymentID: "",
  ExportDate: "",
  PayablePrice: "",
  ConfirmBankCode: "",
  PaymentDate: ""
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "انتقال فیش صنفی",
      formKey: "8fefa382-90f7-4f9a-89a3-25943f722cb4",
      name: "senfi-transform-fish",
      main: true,
      sidebarCompatible: true,

      fromModelRes: null,
      toModelRes: null,
      getDutyFicheByFicheNoRes: null,
      getDutyFichesRes: null,
      getDutyFicheByBillIdRes: null,
      transferDutyFichesRes: null,
      baseInfoGroup: 0,
      selectedRegion: 1,
      transferType: "byFiche",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCodeNew: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      ficheInfo: {
        FicheNo: "",
        BillID: "",
        PaymentID: "",
        ExportDate: "",
        PayablePrice: "",
        ConfirmBankCode: "",
        PaymentDate: ""
      },

      fromAddModel: {
        Base_AddressInfo: { MainAddress: "" },
        Base_Owner: [],
        NickNameNids: [],
        NidJobList: [],
        NidList: null,
        NidNosaziCode: null
      },
      fromModelOwners: "",
      fromFichsCount: 0,

      fromFishModel: {
        Base_AddressInfo: { MainAddress: "" },
        Base_Owner: [],
        DutyFiches: null,
        Duty_FicheByBillID: defaultModel,
        Duty_FicheByFicheNo: defaultModel,
        Duty_TransferFicheLogList: null,
        NidFicheList: null,
        StrCode: null
      },
      toModel: {
        Base_AddressInfo: { MainAddress: "" },
        Base_Owner: [],
        NickNameNids: [],
        NidJobList: [],
        NidList: null,
        NidNosaziCode: null
      },
      toModelOwners: "",
      jobCodeOptions: [],
      dutyFichesList: null,
      jobCodeSelectedItem: null,
      validations: {
        jobCode: Joi.custom(
          function (value, helper) {
            if (this.jobCodeSelectedItem === null) {
              return helper.message("لطفا کد مقصد را وارد نمایید.")
            }
            return true
          }.bind(this)
        )
      }
    }
  },

  methods: {
    async getShopCodeInfoFrom () {
      try {
        const payload = {
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop,
          pDutyType: 2,
          pEumNosaziCodeGroup: 0,
          pEumBaseInfoGroup: this.baseInfoGroup,
          pLoadAllJobs: true,
          pIsLoadDeletedNosaziCode: false
        }
        if (payload.pDistrict === 0) return
        this.showLoading()
        const { data } = await this.$services.SB.getShopCodeInfo(
          payload,
          this.config
        )
        this.fromModelRes = this.getResponse(data)
        if (this.fromModelRes.success) {
          this.fromAddModel = this.fromModelRes.data
          if (Array.isArray(this.fromAddModel.NidJobList)) {
            await this.getDutyFiches(this.fromAddModel.NidJobList)
          }
          this.fromModelOwners = this.fromAddModel.Base_Owner
            ? this.normalizeOwners(this.fromAddModel.Base_Owner)
            : ""
          this.fromFichsCount = this.fromAddModel.Base_Owner
            ? this.fromAddModel.Base_Owner.length
            : 0
          await this.log({
            action: this.logActions.view,
            bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            bizCodeTitle: "کدنوسازی",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getDutyFiches (nidJobList) {
      try {
        const payload = {
          pNidList: nidJobList,
          pSysCiDutyType: 2,
          pUnLoadCancelFiches: false
        }
        this.showLoading()
        const { data } = await this.$services.SB.getDutyFiches(
          payload,
          this.config
        )
        this.getDutyFichesRes = this.getResponse(data)
        if (this.getDutyFichesRes.success) {
          this.dutyFichesList = this.getDutyFichesRes.data.DutyFiches || []
        } else this.dutyFichesList = null
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getFicheByFicheNo () {
      if (this.ficheInfo.FicheNo === "") {
        return this.showError("لطفا شماره فیش را وارد نمایید.")
      }
      try {
        const payload = {
          pFicheNo: this.ficheInfo.FicheNo,
          PDutyType: 2,
          pEumBaseInfoGroup: this.baseInfoGroup
        }
        this.showLoading()
        const { data } = await this.$services.SB.getDutyFicheByFicheNo(
          payload,
          this.configByRegion
        )
        this.getDutyFicheByFicheNoRes = this.getResponse(data)
        if (this.getDutyFicheByFicheNoRes.success) {
          this.fromFishModel = this.getDutyFicheByFicheNoRes.data
          this.ficheInfo = this.fromFishModel.Duty_FicheByFicheNo
          if (this.fromFishModel.Duty_FicheByFicheNo === null) {
            this.clearFromAddModel()
            return this.showError("متاسفانه فیشی با این مشخصات یافت نشد.")
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.fromFishModel.StrCode,
            bizCodeTitle: "کد نوسازی"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getDutyFicheByBillId () {
      try {
        if (this.ficheInfo.BillID === "") {
          return this.showError("لطفا شناسه قبض را وارد نمایید.")
        }
        if (this.ficheInfo.PaymentID === "") {
          return this.showError("لطفا شناسه پرداخت را وارد نمایید.")
        }
        this.showLoading()
        const payload = {
          PDutyType: 2,
          pBillID: this.ficheInfo.BillID,
          pPaymentID: this.ficheInfo.PaymentID,
          pEumBaseInfoGroup: this.baseInfoGroup
        }
        const { data } = await this.$services.SB.getDutyFicheByBillId(
          payload,
          this.configByRegion
        )
        this.getDutyFicheByBillIdRes = this.getResponse(data)
        if (this.getDutyFicheByBillIdRes.success) {
          this.fromFishModel = this.getDutyFicheByBillIdRes.data
          if (this.fromFishModel.Duty_FicheByBillID) {
            this.ficheInfo = this.fromFishModel.Duty_FicheByBillID
            await this.log({
              action: this.logActions.view,
              bizCode: this.ficheInfo.FicheNo,
              bizCodeTitle: "FicheNo",
              nosaziCode: this.fromFishModel.StrCode ?? ""
            })
          } else {
            this.clearFromFishModel()
            return this.showError("فیشی با این مشخصات یافت نشد.")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getShopCodeInfoTo () {
      try {
        const payload = {
          pDistrict: this.baseNosaziCodeNew.District,
          pRegion: this.baseNosaziCodeNew.Region,
          pBlock: this.baseNosaziCodeNew.Block,
          pHouse: this.baseNosaziCodeNew.House,
          pBuilding: this.baseNosaziCodeNew.Building,
          pApartment: this.baseNosaziCodeNew.Apartment,
          pShop: this.baseNosaziCodeNew.Shop,
          pDutyType: 2,
          pEumNosaziCodeGroup: 0,
          pEumBaseInfoGroup: this.baseInfoGroup,
          pLoadAllJobs: true,
          pIsLoadDeletedNosaziCode: false
        }
        if (payload.pDistrict === 0) return
        this.showLoading()
        const { data } = await this.$services.SB.getShopCodeInfo(
          payload,
          this.config
        )
        this.toModelRes = this.getResponse(data)
        if (this.toModelRes.success) {
          this.toModel = this.toModelRes.data
          this.toModelOwners = this.toModel.Base_Owner
            ? this.normalizeOwners(this.toModel.Base_Owner)
            : ""
          if (this.toModel.NickNameNids) {
            this.jobCodeOptions = this.toModel.NickNameNids.map((m) => {
              return {
                ID: m.substring(0, 1),
                Title: m
              }
            })
            this.jobCodeSelectedItem = this.jobCodeOptions[0].ID ?? null
          }
          await this.log({
            action: this.logActions.view,
            bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            bizCodeTitle: "کدنوسازی",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        let tmpDutyFiches = []
        let tmpNids = []
        let fromCode = ""

        if (this.transferType === "byInfo") {
          fromCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
          tmpDutyFiches = this.dutyFichesList
          if (!tmpDutyFiches || tmpDutyFiches.length === 0) {
            return this.showError("هیچ فیشی برای انتقال، انتخاب نشده است.")
          }
          if (tmpDutyFiches.length > 0) {
            for (let i = 0; i < tmpDutyFiches.length; i++) {
              tmpNids.push(tmpDutyFiches[0].NidFiche)
            }
          }
        } else {
          fromCode = this.fromFishModel.StrCode
          tmpDutyFiches = this.fromFishModel.Duty_FicheByFicheNo
            ? this.fromFishModel.Duty_FicheByFicheNo
            : this.fromFishModel.Duty_FicheByBillID
          if (tmpDutyFiches && tmpDutyFiches.NidFiche) {
            tmpNids.push(tmpDutyFiches.NidFiche)
          } else {
            return this.showError("هیچ فیشی برای انتقال انتخاب نشده است.")
          }
        }

        const payload = {
          pDutyFiches: tmpDutyFiches,
          pNidFiches: tmpNids,
          pTargetNidNosaziCode: this.toModel.NidJobList
            ? this.toModel.NidJobList[0]
            : null,
          pFromNickNameNid: fromCode,
          pToNickNameNid: convertNosaziCodeObjectToString(
            this.baseNosaziCodeNew
          ),
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        const config =
          this.transferType === "byInfo" ? this.config : this.configByRegion
        this.showLoading()
        const { data } = await this.$services.SB.transferDutyFiches(
          payload,
          config
        )
        this.transferDutyFichesRes = this.getResponse(data)
        if (this.transferDutyFichesRes.success) {
          this.showSuccess("انتقال فیش با موفقیت انجام شد.")
          this.resetValidation()
          await this.log({
            action: this.logActions.transfer,
            bizCode: convertNosaziCodeObjectToString(this.baseNosaziCodeNew),
            bizCodeTitle: "کدنوسازی",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCodeNew)
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeOwners (baseOwner) {
      if (Array.isArray(baseOwner)) {
        return (
          baseOwner.map((m) => m.OwnerName || m.OwnerLastName).toString() ?? ""
        )
      } else return ""
    },
    clearFromAddModel () {
      this.fromFishModel = {
        Base_AddressInfo: {
          MainAddress: "",
          NickNameNids: null,
          Base_Owner: null
        },
        Duty_FicheByFicheNo: defaultModel,
        DutyFiches: null
      }
      this.ficheInfo = {
        FicheNo: "",
        BillID: "",
        PaymentID: "",
        ExportDate: "",
        PayablePrice: "",
        ConfirmBankCode: "",
        PaymentDate: ""
      }
    },
    clearFromFishModel () {
      this.fromFishModel = {
        Base_AddressInfo: {
          MainAddress: "",
          NickNameNids: null,
          Base_Owner: null
        },
        Duty_FicheByFicheNo: defaultModel,
        DutyFiches: null
      }
      this.ficheInfo = {
        FicheNo: "",
        BillID: "",
        PaymentID: "",
        ExportDate: "",
        PayablePrice: "",
        ConfirmBankCode: "",
        PaymentDate: ""
      }
    }
  },
  computed: {
    lockFishObj () {
      return this.transferType === "byFiche" ? "e" : "r"
    },
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").infoGroupOptions
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    config () {
      return {
        config: {
          District:
            this.baseNosaziCode.District === 0
              ? 1
              : this.baseNosaziCode.District
        }
      }
    },
    configByRegion () {
      return { config: { District: this.selectedRegion } }
    }
  },
  watch: {
    transferType () {
      if (this.transferType === "byFiche") {
        this.baseNosaziCode = {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
        this.fromAddModel = {
          Base_AddressInfo: {
            MainAddress: "",
            NickNameNids: null,
            Base_Owner: null
          }
        }
        this.fromModelOwners = ""
        this.fromFichsCount = 0
      }
      if (this.transferType === "byInfo") {
        this.clearFromFishModel()
      }
    }
  }
}
</script>
