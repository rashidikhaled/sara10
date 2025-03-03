<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id='3C1CAD2C-BC81-4568-B146-501ED62FFA23'
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getBaseLibInNosaziCodeFromRes" />
        <safa-status :result="getBaseLibInNosaziCodeToRes" />
        <safa-status :result="transferDutyFichesRes" />
        <safa-status :result="getFicheByFicheNoRes" />
        <safa-status :result="getDutyFicheByBillIdRes" />
        <safa-status :result="getToBNidNosaziCodeRes" />
      </template>
      <fit>
        <div class="q-gutter-x-lg">
          <safa-radio
            v-model="transferType"
            val="byCode"
            @input="checkBoxHandler"
            label="انتقال فیش نوسازی از طریق کد نوسازی"
            style="min-width: 200px"
            cdcName="transferType"
          />
          <safa-radio
            v-model="transferType"
            val="byCodeFicheNo"
            @input="checkBoxHandler"
            checked="true"
            label="انتقال فیش نوسازی از طریق شماره فیش"
            style="min-width: 200px"
            cdcName="transferFish"
          />
          <safa-radio
            v-model="transferType"
            val="byShenase"
            @input="checkBoxHandler"
            label="انتقال فیش نوسازی از طریق شناسه قبض و شناسه پرداخت"
            style="min-width: 200px"
            cdcName="transferType"
          />
        </div>
        <q-separator class="q-my-sm" />

        <FormRow v-if="transferType === 'byCode'">
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="80px"
              v-model="fromOwnerName"
              cdcName="fromOwnerName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد قدیم"
              label-width="80px"
              v-model="fromCode"
              cdcName="fromCode"
              m="r"
            />
          </FormControl>
          <nosazi-code-input
            v-model="fromBaseNosaziCode"
            @enter="getBaseLibInNosaziCodeFrom"
            cdcName="fromBaseNosaziCode"
            label="کدنوسازی مبدا"
            label-width="80px"
          />
          <safa-text
            label="آدرس"
            label-width="80px"
            v-model="fromOwnerAddress"
            cdcName="fromOwnerAddress"
            m="r"
            class="col-12"
          />
        </FormRow>
        <FormRow v-if="transferType === 'byCodeFicheNo'">
          <FormControl>
            <safa-text
              label="شماره فیش"
              label-width="80px"
              v-model="filter.FicheNo"
              cdcName="FicheNo"
              @keypress.enter="getFicheByFicheNo"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="getFicheByFicheNo"
                  color="primary"
                  name="search"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>
        <FormRow v-if="transferType === 'byShenase'">
          <FormControl>
            <safa-text
              label="شناسه قبض"
              label-width="80px"
              v-model="filter.BillID"
              cdcName="BillID"
              @keypress.enter="getDutyFicheByBillId"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="getDutyFicheByBillId"
                  color="primary"
                  name="search"
                  class="cursor-pointer"
                  size="xs"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label="شناسه پرداخت"
              label-width="80px"
              v-model="filter.PaymentID"
              cdcName="PaymentID"
              @keypress.enter="getDutyFicheByBillId"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="getDutyFicheByBillId"
                  color="primary"
                  name="search"
                  class="cursor-pointer"
                  size="xs"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>

        <internal-section title="اطلاعات فیش مبدا">
          <FormRow>
            <FormControl>
              <safa-text
                label="تعداد فیش"
                label-width="80px"
                v-model="fichsCount"
                cdcName="fichsCount"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره فیش"
                label-width="80px"
                v-model="model.FicheNo"
                cdcName="FicheNo"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="منطقه"
                label-width="80px"
                v-model="selectedRegion"
                :options="districts"
                cdcName="selectedRegion"
                source-type="local"
                :use-input="false"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شناسه قبض"
                label-width="80px"
                v-model="model.BillID"
                cdcName="BillID"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شناسه پرداخت"
                label-width="80px"
                v-model="model.PaymentID"
                cdcName="PaymentID"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تاریخ صدور فیش"
                label-width="80px"
                v-model="model.ExportDate"
                cdcName="ExportDate"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مبلغ فیش"
                label-width="80px"
                v-model="model.PayablePrice"
                cdcName="PayablePrice"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد بانک"
                label-width="80px"
                v-model="model.ConfirmBankCode"
                cdcName="ConfirmBankCode"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره فیش بانکی"
                label-width="80px"
                v-model="model.BankFicheNo"
                cdcName="BankFicheNo"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ پرداخت"
                label-width="80px"
                v-model="model.PaymentDate"
                cdcName="PaymentDate"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تاریخ تایید"
                label-width="80px"
                v-model="model.UserConfirmationDate"
                cdcName="UserConfirmationDate"
                m="r"
              />
            </FormControl>
          </FormRow>
        </internal-section>

        <internal-section title="اطلاعات فیش مقصد">
          <FormRow>
            <FormControl>
              <safa-text
                label="نام مالک"
                label-width="80px"
                v-model="toOwnerName"
                cdcName="toOwnerName"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد قدیم"
                label-width="80px"
                v-model="toCode"
                cdcName="toCode"
                m="r"
              />
            </FormControl>
            <nosazi-code-input
              label="کدنوسازی مقصد"
              label-width="80px"
              v-model="toBaseNosaziCode"
              @enter="getBaseLibInNosaziCodeTo"
              cdcName="toBaseNosaziCode"
            />
            <safa-text
              label="آدرس"
              label-width="80px"
              v-model="toOwnerAddress"
              cdcName="toOwnerAddress"
              m="r"
              class="col-12"
            />
          </FormRow>
        </internal-section>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-default label="انتقال" @click="transferClick" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  route: "garbage/Pasmand-help",
  mixins: [baseFormMixin],
  data: function () {
    return {
      visible: true,
      title: "انتقال فیش پسماند",
      formKey: "ef9770d9-be30-484e-924b-c8dbb4687828",
      name: "UTransferJobGarbageFiche",
      main: true,

      // Nosazi Codes Model
      toBaseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      filter: {
        FicheNo: null, // "شماره فیش"
        BillID: null, // "شناسه قبض"
        PaymentID: null, // "شناسه پرداخت"
        fromBaseNosaziCode: { // "کدنوسازی مبدا"
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      },

      // nosaziCde's data
      fromOwnerName: "",
      fromCode: "",
      fromOwnerAddress: "",
      toOwnerName: "",
      toCode: "",
      toOwnerAddress: "",

      model: {
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

      // pasmandSettings
      pasmandSettings: {
        StartYear: "",
        LeastPrice: "",
        IsBreakInDay: false,
        BreakDay: "",
        BreakDate: "",
        DoFinal: false,
        IsCanceldFiches: false,
        SetPayOffForConfirmYearly: false,
        SetPayOffForConfirmCollective: false,
        SetPayOffForConfirmTaghsit: false,
        IsCanceldFichesInConfirm: false,
        IncludeShop: false,
        IncludeHouse: false,
        CalcInRevisit: false,
        IsShowAccountingSystemError: false,
        ShowPopupGarbage: false
      },

      // shahrsaziSetting
      tmpCodeGroup: 0,

      // Region
      selectedRegion: 1,

      // Transfer Type
      transferType: "byCode",

      // #services
      getBaseLibInNosaziCodeFromRes: null,
      getBaseLibInNosaziCodeToRes: null,
      transferDutyFichesRes: null,
      getFicheByFicheNoRes: null,
      getDutyFicheByBillIdRes: null,
      getToBNidNosaziCodeRes: null,

      thisDutyFiches: [],
      fichsCount: 0,
      targetNidNosaziCode: "00000000-0000-0000-0000-000000000000",
      loading: false
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  async created () {
    await this.loadSetting()
    await this.getSettingData()
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
    async loadSetting () {
      try {
        this.loading = true
        const settings = await this.loadFormSetting("pasmandSettings", {
          nidProc: GLOBAL_SETTINGS_GUID,
          defaultValue: this.pasmandSettings
        })
        this.pasmandSettings = require("src/utils/mergeSettings").default(
          this.pasmandSettings,
          settings
        )
      } catch (res) {
        console.error(res)
      } finally {
        this.loading = false
      }
    },
    getBaseLibInNosaziCodeFrom () {
      this.showLoading()
      const payLoad = {
        pNosaziCode: {
          Apartment: this.fromBaseNosaziCode.Apartment,
          Block: this.fromBaseNosaziCode.Block,
          Building: this.fromBaseNosaziCode.Building,
          District: this.fromBaseNosaziCode.District,
          House: this.fromBaseNosaziCode.House,
          Region: this.fromBaseNosaziCode.Region,
          Shop: this.fromBaseNosaziCode.Shop,
          CI_City: 0,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          Id: "",
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          ParentId: "",
          UserName: ""
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(async ({ data }) => {
          this.getBaseLibInNosaziCodeFromRes = this.getResponse(data)
          if (this.getBaseLibInNosaziCodeFromRes.success) {
            let data = this.getBaseLibInNosaziCodeFromRes.data

            // Set fromOwnerAddress
            this.fromOwnerAddress = data?.Base_AddressInfo?.MainAddress

            // Set Owner
            this.fromOwnerName =
              data.Base_Owner.length !== 0
                ? data.Base_Owner[0].OwnerName +
                  " " +
                  data.Base_Owner[0].OwnerLastName
                : ""

            // set code
            this.fromCode = []
            data.Base_PreCodeInfo.map((e) => {
              this.fromCode.push(e.PreCode)
            })
            this.fromCode.toString()

            this.getCodeInfo()

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.toBaseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              nidWorkItem: "",
              saveDesc: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getCodeInfo () {
      const payLoad = {
        pDistrict: this.fromBaseNosaziCode.District,
        pRegion: this.fromBaseNosaziCode.Region,
        pBlock: this.fromBaseNosaziCode.Block,
        pHouse: this.fromBaseNosaziCode.House,
        pBuilding: this.fromBaseNosaziCode.Building,
        pApartment: this.fromBaseNosaziCode.Apartment,
        pShop: this.fromBaseNosaziCode.Shop,
        pDutyType: 3,
        pEumBaseInfoGroup: 0,
        pEumNosaziCodeGroup: this.tmpCodeGroup,
        pIncludeHouse: this.pasmandSettings.includeHouse,
        pIncludeShop: this.pasmandSettings.includeShop,
        pToCurrentObject: false
      }
      this.showLoading()
      this.$services.SB.getCodeInfo(payLoad, {
        config: {
          District: this.fromBaseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.getCodeInfoResult = this.getResponse(data)
          if (this.getCodeInfoResult.success) {
            if (this.getCodeInfoResult.data.NidList) {
              const payload = {
                pNidList: this.getCodeInfoResult.data.NidList,
                pSysCiDutyType: 3,
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

                      // set fichsCount
                      this.fichsCount =
                        this.getDutyFichesResult.data.DutyFiches.length
                    }

                    const strNosaziCode = convertNosaziCodeObjectToString(
                      this.toBaseNosaziCode
                    )
                    await this.log({
                      action: this.logActions.view,
                      bizCode: strNosaziCode,
                      bizCodeTitle: "کد نوسازی",
                      nosaziCode: strNosaziCode,
                      nidWorkItem: "",
                      saveDesc: ""
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
        .catch((res) => {
          console.error(res)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyFicheByBillId () {
      if (!this.filter.BillID || !this.filter.PaymentID) {
        this.showError("شناسه قبض  یا شناسه پرداخت را وارد نشده است.")
        return false
      }
      this.showLoading()
      this.$services.SB.getDutyFicheByBillId(
        {
          PDutyType: 3,
          pEumBaseInfoGroup: 0,
          pPaymentID: this.filter.PaymentID,
          pBillID: this.filter.BillID
        },
        {
          config: {
            District: this.selectedRegion
          }
        }
      )
        .then(async (response) => {
          this.getDutyFicheByBillIdRes = this.getResponse(response.data)
          if (this.getDutyFicheByBillIdRes.success) {
            if (this.getDutyFicheByBillIdRes.data.Duty_FicheByBillID) {
              this.model = this.getDutyFicheByBillIdRes.data.Duty_FicheByBillID
              this.thisDutyFiches = []
              this.thisDutyFiches.push(this.model)

              // Set Headers
              if (this.getDutyFicheByBillIdRes.data.StrCode) {
                this.setStrCode(this.getDutyFicheByBillIdRes.data.StrCode)
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.getDutyFicheByBillIdRes.data.StrCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: this.getDutyFicheByBillIdRes.data.StrCode,
                nidWorkItem: "",
                saveDesc: ""
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
    getFicheByFicheNo () {
      if (!this.filter.FicheNo) {
        this.showError("شماره فیش وارد نشده است.")
        return false
      }

      this.showLoading()
      this.$services.SB.getDutyFicheByFicheNo(
        {
          pFicheNo: this.filter.FicheNo,
          PDutyType: 3,
          pEumBaseInfoGroup: 0
        },
        {
          config: {
            District: this.selectedRegion
          }
        }
      )
        .then(async ({ data }) => {
          this.getFicheByFicheNoRes = this.getResponse(data)
          if (this.getFicheByFicheNoRes.success) {
            if (this.getFicheByFicheNoRes.data.Duty_FicheByFicheNo) {
              this.model = this.getFicheByFicheNoRes.data.Duty_FicheByFicheNo
              this.thisDutyFiches = []
              this.thisDutyFiches.push(this.model)

              // Set Headers
              if (this.getFicheByFicheNoRes.data.StrCode) {
                this.setStrCode(this.getFicheByFicheNoRes.data.StrCode)
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.getFicheByFicheNoRes.data.StrCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: this.getFicheByFicheNoRes.data.StrCode,
                nidWorkItem: "",
                saveDesc: ""
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

    setStrCode (pStrCode) {
      this.fromBaseNosaziCode = convertStringToNosaziCodeObject(pStrCode)
    },
    getBaseLibInNosaziCodeTo () {
      this.showLoading()
      const payLoad = {
        pNosaziCode: {
          Apartment: this.toBaseNosaziCode.Apartment,
          Block: this.toBaseNosaziCode.Block,
          Building: this.toBaseNosaziCode.Building,
          District: this.toBaseNosaziCode.District,
          House: this.toBaseNosaziCode.House,
          Region: this.toBaseNosaziCode.Region,
          Shop: this.toBaseNosaziCode.Shop,
          CI_City: 0,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          Id: "",
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          ParentId: "",
          UserName: ""
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(async ({ data }) => {
          this.getBaseLibInNosaziCodeToRes = this.getResponse(data)
          if (this.getBaseLibInNosaziCodeToRes.success) {
            let data = this.getBaseLibInNosaziCodeToRes.data

            // Set fromOwnerAddress
            this.toOwnerAddress = data?.Base_AddressInfo?.MainAddress

            // Set Owner
            this.toOwnerName =
              data.Base_Owner.length !== 0
                ? data.Base_Owner[0].OwnerName +
                  " " +
                  data.Base_Owner[0].OwnerLastName
                : ""

            // set code
            this.toCode = []
            data.Base_PreCodeInfo.map((e) => {
              this.toCode.push(e.PreCode)
            })
            this.toCode.toString()

            this.getToBNidNosaziCode()
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.toBaseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              nidWorkItem: "",
              saveDesc: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
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
        // pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: 0
        // pIsHouseFiche: false
      }

      this.$services.SB.getNidNosaziCode(payLoad, {
        config: {
          District: this.toBaseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.getToBNidNosaziCodeRes = this.getResponse(data)
          if (this.getToBNidNosaziCodeRes.success) {
            if (this.getToBNidNosaziCodeRes.data.NidNosaziCode) {
              this.targetNidNosaziCode =
                this.getToBNidNosaziCodeRes.data.NidNosaziCode.find((e) => e)

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.toBaseNosaziCode
              )
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode,
                nidWorkItem: "",
                saveDesc: ""
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
    transferClick () {
      if (!this.thisDutyFiches || this.thisDutyFiches.length <= 0) {
        this.showError("هیچ فیشی انتخاب نشده است.")
        return false
      } else if (
        this.targetNidNosaziCode === "00000000-0000-0000-0000-000000000000"
      ) {
        this.showError("لطفا کد مقصد را وارد نمایید.")
        return false
      }
      let tmpNidFiches = this.thisDutyFiches.map((f) => f.NidFiche).toString()
      let payLoad = {
        pNidFiches: { guid: tmpNidFiches },
        pTargetNidNosaziCode: this.targetNidNosaziCode,
        pFromNickNameNid: convertNosaziCodeObjectToString(
          this.fromBaseNosaziCode
        ),
        pToNickNameNid: convertNosaziCodeObjectToString(this.toBaseNosaziCode),
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pDutyFiches: { Duty_Fiche: this.thisDutyFiches[0] }
      }
      this.showLoading()
      this.$services.SB.transferDutyFiches(payLoad)
        .then(async ({ data }) => {
          this.transferDutyFichesRes = this.getResponse(data)
          if (this.transferDutyFichesRes.success) {
            this.baseLibResults = this.transferDutyFichesRes.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.toBaseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              nidWorkItem: "",
              saveDesc: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    checkBoxHandler ($event) {
      this.filter = {
        FicheNo: null, // "شماره فیش"
        BillID: null, // "شناسه قبض"
        PaymentID: null, // "شناسه پرداخت"
        fromBaseNosaziCode: { // "کدنوسازی مبدا"
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      }
      this.model = {
        BankFicheNo: null,
        BillID: null,
        ConfirmBankCode: null,
        ExportDate: null,
        FicheNo: null,
        PayablePrice: null,
        PaymentID: null,
        PaymentDate: null,
        UserConfirmationDate: null
      }
    }
  }
}
</script>
