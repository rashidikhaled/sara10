<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="انتقال فیش نوسازی">
      <template #header>
        <safa-status :result="getFicheByNosaziCodeResult" />
        <safa-status :result="transferDutyFichesResult" />
        <safa-status :result="getDutyFichesResult" />
        <safa-status :result="fichNoRequestResult" />
        <safa-status :result="getDutyFicheByBillIdResult" />
        <safa-status :result="getToBNidNosaziCodeResult" />
      </template>
      <fit>
        <!-- دسته اطلاعاتی در مشهد وجود ندارد -->
        <form-row class="q-mb-md" v-if="isShowBaseInfoGroupCombo">
          <form-control>
            <safa-combo
              input-debounce="0"
              label="دسته اطلاعاتی:"
              sourceType="local"
              :options="infoGroupOptions"
              v-model="selectedCategoryInfo"
              label-width="90px"
              @input="cmb_groupType_SelectionChanged"
            />
          </form-control>
        </form-row>
        <FormRow class="q-mb-md">
          <FormControl>
            <safa-radio
              v-model="transferType"
              val="address"
              @input="radioChanged"
              :labelShrink="false"
              label="انتقال فیش نوسازی از طریق مشخصات آدرس مالک و کد نوسازی"
              cdcName="transferType"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نام مالک:"
              m="r"
              v-model="fromOwnerName"
              cdcName="fromOwnerName"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد فیش:"
              m="r"
              v-model="fichsCount"
              dir="ltr"
              cdcName="fichsCount"
              label-width="90px"
            />
          </FormControl>
          <div>
            <nosazi-code-input
              v-model="fromBaseNosaziCode"
              @enter="getFicheByNosaziCode"
              cdcName="fromBaseNosaziCode"
              label-width="90px"
              :m="addressMode"
            />
          </div>
        </FormRow>
        <div class="row q-mb-md">
          <safa-text
            m="r"
            label="آدرس:"
            v-model="fromOwnerAddress"
            label-width="90px"
            type="textarea"
            class="col-12"
            :rows="1"
          />
        </div>
        <internal-section class="q-my-sm" title="انتقال فیش نوسازی از طریق اطلاعات فیش">
          <FormRow :lg="2" :md="2" :sm="2" :xs="2" class="q-mb-md">
          <FormControl>
            <safa-radio
              v-model="transferType"
              val="exportFishBaseOnFichNo"
              @input="radioChanged"
              :labelShrink="false"
              checked="true"
              label="براساس شماره فیش"
              cdcName="transferFish"
            />
          </FormControl>
          <FormControl>
            <safa-radio
              v-model="transferType"
              val="exportFishBaseOnBill"
              @input="radioChanged"
              :labelShrink="false"
              label="بر اساس شناسه قبض و پرداخت"
              cdcName="transferFish"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-md">
          <FormControl>
            <safa-text
              label="شماره فیش:"
              v-model="dataContext.FicheNo"
              @keypress.enter="getFicheByFicheNo"
              :m="fishMode"
              dir="ltr"
              cdcName="ficheNo"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              source-type="local"
              :options="districts"
              label="منطقه:"
              :use-input="false"
              v-model="selectedRegion"
              cdcName="selectedRegion"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شناسه قبض:"
              v-model="dataContext.BillID"
              @keypress.enter="getDutyFicheByBillId"
              cdcName="billID"
              :m="transferType==='exportFishBaseOnFichNo'?'r':'e'"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شناسه پرداخت:"
              v-model="dataContext.PaymentID"
              @keypress.enter="getDutyFicheByBillId"
              :m="transferType==='exportFishBaseOnFichNo'?'r':'e'"
              cdcName="paymentID"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تاریخ صدور فیش:"
              m="r"
              v-model="dataContext.ExportDate"
              cdcName="exportDate"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-custom-text
              label="مبلغ فیش:"
              m="r"
              type="money"
              v-model="dataContext.PayablePrice"
              label-width="90px"
              cdcName="payablePrice"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد بانک:"
              m="r"
              v-model="dataContext.ConfirmBankCode"
              cdcName="confirmBankCode"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره فیش بانکی:"
              m="r"
              v-model="dataContext.BankFicheNo"
              cdcName="bankFicheNo"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              locale="fa"
              placeholder="تاریخ پرداخت"
              format="jYYYY/jMM/jDD"
              display-format="dddd jDD jMMMM jYYYY"
              label="تاریخ پرداخت:"
              v-model="dataContext.PaymentDate"
              cdcName="paymentDate"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تاریخ تایید:"
              m="r"
              v-model="dataContext.UserConfirmationDate"
              cdcName="userConfirmationDate"
              label-width="90px"
            />
          </FormControl>
        </FormRow>
         <expantion-section
          v-model="expantionState"
          default-open
          title="کد نوسازی جدید"
        >
          <form-row class="q-mb-sm">
            <form-control>
              <safa-text
                label="نام مالک:"
                m="r"
                v-model="toOwnerName"
                cdcName="toOwnerName"
                label-width="90px"
              />
            </form-control>
            <div>
              <nosazi-code-input
                v-model="toBaseNosaziCode"
                @enter="getToBNidNosaziCode"
                cdcName="toBaseNosaziCode"
                label-width="90px"
              />
            </div>
          </form-row>
          <div class="col-12">
            <safa-text
              m="r"
              label="آدرس:"
              v-model="toOwnerAddress"
              label-width="90px"
              type="textarea"
              :rows="1"
            />
          </div>
        </expantion-section>
        </internal-section>
      </fit>

      <template v-slot:footer>
        <form-actions :showEditButton="false">
          <template v-slot:after>
            <btn-default
              label="انتقال فیش"
              @click="transferDutyFiches"
              spId="4c4e3318-aa03-4d48-9959-91ad3950d365"
              spCaption="انتقال فیش"
            />
            <btn-cancel label="خروج" @click="closeForm" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
  <!-- </section> -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  route: "/nosazi-avarez/nosazi-transform-fish",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "انتقال فیش نوسازی",
      formKey: "f7fd1ffe-e68d-4c6f-bef5-67e39c7b6a6e",
      name: "UNosaziTransferFish",
      main: true,

      loaded: false,

      // Nosazi Settings
      nosaziSettings: {
        AvarezSettings: {
          startYear: '',
          leastPrice: '',
          isBreakInDay: false,
          breakDay: '',
          breakDate: '',
          doFinal: false,
          isCanceldFiches: false,
          setPayOffForConfirmYearly: false,
          setPayOffForConfirmCollective: false,
          setPayOffForConfirmTaghsit: false,
          isCanceldFichesInConfirm: false,
          includeShop: false,
          includeHouse: false,
          toCurrentObject: false,
          exportFicheOnHouse: false,
          groupType: 0,
          isShowAccountingSystemError: false,
          isCancelBankConfirmFiches: false,
          isShowRevisitByLastRevisitDate: false
        },
        UserProfile: {
          showPopupDuty: false,
          showPopupCollectiveDuty: false
        }
      },
      tmpCodeGroup: 0,

      expantionState: false,
      selectedCategoryInfo: 0,
      eumInfoGroup: 100,
      infoGroup: [
        {
          ID: "0",
          Title: "اطلاعات پرونده"
        },
        {
          ID: "100",
          Title: "نوسازی"
        }
      ],

      // Data Context
      dataContext: {
        BankFicheNo: null,
        BillID: null,
        ConfirmBankCode: null,
        ExportDate: null,
        FicheNo: null,
        PayablePrice: null,
        PaymentID: null,
        PaymentDate: null,
        UserConfirmationDate: null
      },

      // From
      fromOwnerName: "",
      fromOwnerAddress: "",

      // To
      toOwnerName: "",
      toOwnerAddress: "",

      targetNidNosaziCode: "00000000-0000-0000-0000-000000000000",

      fichsCount: null,
      ficheNumber: {
        Duty_FicheByFicheNo: {}
      },

      isShowBaseInfoGroupCombo: false,

      // Nosazi Codes Model
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      fromBaseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      toBaseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // Results
      getFicheByNosaziCodeResult: null,
      transferDutyFichesResult: null,
      getDutyFichesResult: null,
      fichNoRequestResult: null,
      getDutyFicheByBillIdResult: null,
      getToBNidNosaziCodeResult: null,

      // Transfer Type
      transferType: "exportFishBaseOnFichNo",

      // Modes
      addressMode: "r",
      fishMode: "e",
      thisDutyFiches: [],

      // Tabs
      tab: "fish",
      activeTab: "baroKafInfo",

      // Region
      selectedRegion: 1
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").infoGroupOptions
    }
  },
  created () {
    this.getSettingData()
  },
  async mounted () {
    this.loadObj()
  },

  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.tmpCodeGroup = 1 // Momayezi
        } else {
          this.tmpCodeGroup = 0 // Parvande
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadObj () {
      await this.loadSetting()
      await this.baseForm_Loaded()
    },

    async loadSetting () {
      try {
        this.loading = true
        const settings = await this.loadFormSetting("nosaziSettings", {
          nidProc: GLOBAL_SETTINGS_GUID,
          useCache: false,
          defaultValue: this.nosaziSettings
        })
        this.nosaziSettings = require("src/utils/mergeSettings").default(
          this.nosaziSettings,
          settings
        )
      } catch (ex) {
        console.error(ex)
      } finally {
        this.loading = false
      }
    },

    async baseForm_Loaded () {
      // eslint-disable-next-line no-undef
      if (
        window.getConfigValue("infoGroupCombo")?.isShowBaseInfoGroupCombo ===
        true
      ) {
        this.isShowBaseInfoGroupCombo = true
        this.selectedCategoryInfo = 0
      } else {
        this.isShowBaseInfoGroupCombo = false
      }
    },

    async getFicheByNosaziCode () {
      this.loaded++
      if (this.loaded === 1) return
      this.showLoading()

      let payLoad = {
        pDistrict: this.fromBaseNosaziCode.District,
        pRegion: this.fromBaseNosaziCode.Region,
        pBlock: this.fromBaseNosaziCode.Block,
        pHouse: this.fromBaseNosaziCode.House,
        pBuilding: this.fromBaseNosaziCode.Building,
        pApartment: this.fromBaseNosaziCode.Apartment,
        pShop: this.fromBaseNosaziCode.Shop,
        pDutyType: 1,
        pEumNosaziCodeGroup: this.tmpCodeGroup,
        pEumBaseInfoGroup: 0,
        pIncludeHouse: this.nosaziSettings.AvarezSettings.includeHouse,
        pIncludeShop: this.nosaziSettings.AvarezSettings.includeShop,
        pToCurrentObject: this.nosaziSettings.AvarezSettings.toCurrentObject,
        pNidRevisit: "00000000-0000-0000-0000-000000000000"
      }
      await this.$services.SB.getCodeInfo(payLoad, {
        config: {
          District: this.fromBaseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.getFicheByNosaziCodeResult = this.getResponse(data)
          if (this.getFicheByNosaziCodeResult.success) {
            if (this.getFicheByNosaziCodeResult.data.NidList) {
              const payload = {
                pNidList: this.getFicheByNosaziCodeResult.data.NidList,
                pSysCiDutyType: 1,
                pUnLoadCancelFiches: false
              }

              await this.$services.SB.getDutyFiches(payload)
                .then(async ({ data }) => {
                  this.getDutyFichesResult = this.getResponse(data)

                  if (this.getDutyFichesResult.success) {
                    if (
                      this.getDutyFichesResult.data.DutyFiches &&
                      this.getDutyFichesResult.data.DutyFiches.length > 0
                    ) {
                      this.thisDutyFiches =
                        this.getDutyFichesResult.data.DutyFiches || []

                      // Set Owner
                      this.setOwner(
                        this.getFicheByNosaziCodeResult.data.Base_Owner,
                        "fromOwnerName"
                      )

                      // Set Address
                      this.setAddress(
                        this.getFicheByNosaziCodeResult.data.Base_AddressInfo,
                        this.getFicheByNosaziCodeResult.data.Base_CommonEstate,
                        "fromOwnerAddress"
                      )
                    }

                    await this.log({
                      action: this.logActions.view,
                      bizCode: convertNosaziCodeObjectToString(
                        this.baseNosaziCode
                      ),
                      bizCodeTitle: "کد نوسازی",
                      saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
                    })
                  }
                })
                .catch((res) => {
                  console.error(res)
                  this.serverError()
                })
            }
          }
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyFicheByBillId () {
      if (!this.dataContext.BillID || !this.dataContext.PaymentID) {
        this.showError("شناسه قبض  یا شناسه پرداخت را وارد نشده است.")
        return false
      }

      this.showLoading()
      if (this.selectedCategoryInfo === 0) {
        this.eumInfoGroup = 0
      } else if (this.selectedCategoryInfo === 100) {
        this.eumInfoGroup = 100
      }
      this.$services.SB.getDutyFicheByBillId(
        {
          PDutyType: 1,
          pEumBaseInfoGroup: this.eumInfoGroup,
          pPaymentID: this.dataContext.PaymentID,
          pBillID: this.dataContext.BillID
        },
        {
          config: {
            District: this.selectedRegion
          }
        }
      )
        .then(async (response) => {
          this.getDutyFicheByBillIdResult = this.getResponse(response.data)

          if (this.getDutyFicheByBillIdResult.success) {
            if (this.getDutyFicheByBillIdResult.data.Duty_FicheByBillID) {
              this.dataContext =
                this.getDutyFicheByBillIdResult.data.Duty_FicheByBillID
              this.thisDutyFiches = []
              this.thisDutyFiches.push(this.dataContext)

              // Set Owner
              this.setOwner(
                this.getDutyFicheByBillIdResult.data.Base_Owner,
                "fromOwnerName"
              )

              // Set Address
              this.setAddress(
                this.getDutyFicheByBillIdResult.data.Base_AddressInfo,
                this.getDutyFicheByBillIdResult.data.Base_CommonEstate,
                "fromOwnerAddress"
              )

              // Set Headers
              if (this.getDutyFicheByBillIdResult.data.StrCode) {
                this.setStrCode(this.getDutyFicheByBillIdResult.data.StrCode)
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.getDutyFicheByBillIdResult.data.StrCode,
                bizCodeTitle: "کد نوسازی",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            } else {
              this.showError("فیشی با این مشخطات یافت نشد.")
            }
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    // public enum EumDutyType
    //     {
    //         [Description("نوسازی")]
    //         Renovation = 1,
    //         [Description("صنفی")]
    //         Job = 2,
    //         [Description("زباله")]
    //         Garbage = 3
    //     };

    // public enum EumNosaziCodeGroup
    //     {
    //         [Description("تشکیل پرونده")]
    //         Parvande = 0,
    //         [Description("ممیزی")]
    //         Momayezi = 1
    //     };

    // public enum EumBaseInfoGroup
    //     {
    //         [Description("پرونده")]
    //         Parvandeh = 0,
    //         [Description("بازدید")]
    //         Revisit = 1,
    //         [Description("مجاز پروانه")]
    //         MojazParvaneh = 2,
    //         [Description("مجاز پایانکار")]
    //         MojazPayankar = 3,
    //         [Description("آخرین بروکف")]
    //         LastBarokaf = 4,
    //         [Description("مجاز موافقت اصولی")]
    //         MojazMovafeghatOsooli = 5,
    //         [Description("اطلاعات مالک")]
    //         OwnerDoc = 6,
    //         [Description("نوسازی اصفهان")]
    //         IsfahanNosazi = 100
    //     };

    getFicheByFicheNo () {
      if (!this.dataContext.FicheNo) {
        this.showError("شماره فیش وارد نشده است.")
        return false
      }

      this.showLoading()
      if (this.selectedCategoryInfo === 0) {
        this.eumInfoGroup = 0
      } else if (this.selectedCategoryInfo === 100) {
        this.eumInfoGroup = 100
      }
      this.$services.SB.getDutyFicheByFicheNo(
        {
          pFicheNo: this.dataContext.FicheNo,
          PDutyType: 1,
          pEumBaseInfoGroup: this.eumInfoGroup
        },
        {
          config: {
            District: this.selectedRegion
          }
        }
      )
        .then(async ({ data }) => {
          this.fichNoRequestResult = this.getResponse(data)

          if (this.fichNoRequestResult.success) {
            if (this.fichNoRequestResult.data.Duty_FicheByFicheNo) {
              this.dataContext =
                this.fichNoRequestResult.data.Duty_FicheByFicheNo
              this.thisDutyFiches = []
              this.thisDutyFiches.push(this.dataContext)

              // Set Owner
              this.setOwner(
                this.fichNoRequestResult.data.Base_Owner,
                "fromOwnerName"
              )

              // Set Address
              this.setAddress(
                this.fichNoRequestResult.data.Base_AddressInfo,
                this.fichNoRequestResult.data.Base_CommonEstate,
                "fromOwnerAddress"
              )

              // Set Headers
              if (this.fichNoRequestResult.data.StrCode) {
                this.setStrCode(this.fichNoRequestResult.data.StrCode)
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.fichNoRequestResult.data.StrCode,
                bizCodeTitle: "کد نوسازی",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            } else {
              this.showError("فیشی با این مشخصات یافت نشد.")
            }
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    setOwner (pBaseOwner, pTextBox) {
      this[pTextBox] = ""
      if (pBaseOwner && pBaseOwner.length > 0) {
        pBaseOwner.forEach((item) => {
          if (item?.OwnerName && item?.OwnerLastName) {
            if (this[pTextBox]) this[pTextBox] += ", "

            this[pTextBox] += `${item.OwnerName} ${item.OwnerLastName}`
          }
        })
      }
    },

    setAddress (pBaseAddressInfo, pBaseCommonEstate, pTextBox) {
      this[pTextBox] = ""
      this[pTextBox] =
        pBaseAddressInfo?.MainAddress == null
          ? ""
          : pBaseAddressInfo.MainAddress
    },

    setStrCode (pStrCode) {
      this.fromBaseNosaziCode = convertStringToNosaziCodeObject(pStrCode)
    },

    getToBNidNosaziCode () {
      this.showLoading()
      let payLoad = {
        pDistrict: this.toBaseNosaziCode.District,
        pRegion: this.toBaseNosaziCode.Region,
        pBlock: this.toBaseNosaziCode.Block,
        pHouse: this.toBaseNosaziCode.House,
        pBuilding: this.toBaseNosaziCode.Building,
        pApartment: this.toBaseNosaziCode.Apartment,
        pShop: this.toBaseNosaziCode.Shop,
        pDutyType: 1,
        pEumNosaziCodeGroup: 0,
        // pEumBaseInfoGroup: this.eumInfoGroup,
        pEumBaseInfoGroup: 0,
        pIsHouseFiche: false
      }

      this.$services.SB.getNidNosaziCode(payLoad, {
        config: {
          District: this.toBaseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.getToBNidNosaziCodeResult = this.getResponse(data)
          if (this.getToBNidNosaziCodeResult.success) {
            if (this.getToBNidNosaziCodeResult.data.NidNosaziCode) {
              this.targetNidNosaziCode =
                this.getToBNidNosaziCodeResult.data.NidNosaziCode.find(
                  (e) => e
                )

              // Set Owner
              this.setOwner(
                this.getToBNidNosaziCodeResult.data.Base_Owner,
                "toOwnerName"
              )

              // Set Address
              this.setAddress(
                this.getToBNidNosaziCodeResult.data.Base_AddressInfo,
                this.getToBNidNosaziCodeResult.data.Base_CommonEstate,
                "toOwnerAddress"
              )

              await this.log({
                action: this.logActions.view,
                bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
                bizCodeTitle: "کد نوسازی",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            }
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    transferDutyFiches () {
      if (!this.thisDutyFiches || this.thisDutyFiches.length <= 0) {
        this.showError("هیچ فیشی انتخاب نشده است.")
        return false
      } else if (
        this.targetNidNosaziCode === "00000000-0000-0000-0000-000000000000"
      ) {
        this.showError("لطفا کد مقصد را وارد نمایید.")
        return false
      }

      this.showLoading()
      let tmpNidFiches = this.thisDutyFiches.map((f) => f.NidFiche)

      let payLoad = {
        pNidFiches: tmpNidFiches,
        pTargetNidNosaziCode: this.targetNidNosaziCode,
        pFromNickNameNid: convertNosaziCodeObjectToString(
          this.fromBaseNosaziCode
        ),
        pToNickNameNid: convertNosaziCodeObjectToString(this.toBaseNosaziCode),
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pDutyFiches: this.thisDutyFiches
      }

      this.$services.SB.transferDutyFiches(payLoad, {
        config: {
          District: this.fromBaseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.transferDutyFichesResult = this.getResponse(data)
          if (this.transferDutyFichesResult.success) {
            await this.log({
              action: this.logActions.transfer,
              bizCode: this.fromBaseNosaziCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `عملیات انتقال در فرم ${this.title} انجام گردید.`
            })
            this.showSuccess("انتقال فیش با موفقیت انجام شد.")
            this.loadObj()
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cmb_groupType_SelectionChanged () {
      switch (this.selectedCategoryInfo) {
        case 0:
          this.eumInfoGroup = 0
          break
        case 100:
          this.eumInfoGroup = 100
          break
      }
    },
    radioChanged ($event) {
      this.addressMode = $event === "address" ? "e" : "r"
      this.fishMode = $event === "exportFishBaseOnFichNo" ? "e" : "r"
    },
    closeForm () {
      this.hideSidebar("UNosaziTransferFish")
    }
  }
}
</script>
