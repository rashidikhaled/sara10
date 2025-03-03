<template>
  <safa-form :id="formKey" :caption="title + '-صنفی'" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper title="تایید فیش" vertical @load="$emit('load')">
      <fit>
      <template #header>
        <safa-status :result="requestResult" />
        </template>
        <div class="row q-col-gutter-md">
          <nosazi-code-input
            class="col-auto"
            from-request
            v-model="baseNosaziCode"
            label="کد نوسازی"
            m="r"
          />
          <safa-text
            class="col-12 col-sm-4 col-md-3"
            v-model="ownerName"
            m="r"
            label="نام مالک"
          />
          <safa-text
            type="textarea"
            label="آدرس"
            class="col-12 q-pr-sm"
            v-model="address"
            label-width="53px"
            m="r"
          />
        </div>
        <internal-section class="q-my-md" title="تایید فیش از طریق شماره فیش">
          <form-row>
            <safa-radio
              v-model="paymentType"
              val="fishNo"
              @input="radioChanged"
            />

            <form-control>
              <safa-text
                :m="fishNoMode"
                @keyup.enter="getDutyFicheByFicheNo"
                v-model="ficheNumber"
                label="شماره فیش"
              />
            </form-control>

            <form-control>
              <safa-combo
                source-type="local"
                :options="districts"
                label="منطقه"
                :use-input="false"
                class="col col-sm-4 col-md-3"
                v-model="selectedRegion"
                label-width="75px"
              />
            </form-control>
          </form-row>
        </internal-section>
        <internal-section class="q-my-md" title="تایید فیش از طریق شناسه فیش">
          <form-row>
              <safa-radio
                v-model="paymentType"
                val="catchId"
                @input="radioChanged"
              />
            <form-control>
              <safa-text
                :m="catchIdMode"
                v-model="billId"
                label="شناسه قبض"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شناسه پرداخت"
                :m="catchIdMode"
                v-model="paymentId"
                @keyup.enter="getDutyFicheByBillId"
              />
            </form-control>
          </form-row>
        </internal-section>
        <internal-section class="q-mt-sm" title="تایید فیش از طریق بارکد">
          <form-row>
            <safa-radio
              v-model="paymentType"
              val="barcode"
              @input="radioChanged"
            />
           <form-control>
            <safa-text
              label-width="60px"
              label="بارکد"
              :m="barcodeMode"
              class="col col-sm-4 col-md-3 col-xl-3"
              v-model="barcode"
              @keyup.enter="getDutyFicheByBarcode"
            />
           </form-control>
          </form-row>
        </internal-section>
        <internal-section>
          <FormRow :xl="4" :lg="4" :md="3">
            <form-control>
              <safa-text
                label="تاریخ صدور فیش"
                m="r"
                v-model="exportFicheDate"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-custom-text
                label="مبلغ فیش"
                m="r"
                :type="'money'"
                v-model="ficheAmount"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="کد بانک"
                m="r"
                v-model="bankCode"
                label-width="92px"
              />
            </form-control>
            <FormControl>
              <safa-combo
                label="نام بانک"
                v-model="paymentBank"
                cdcName="CI_Bank"
                ciName="CI_Bank"
                m="e"
                label-width="92px"
              />
            </FormControl>
            <form-control>
              <safa-text
                label="کد رهگیری پرداخت"
                v-model="rahgiriPayment"
                m="r"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ پرداخت"
                m="e"
                v-model="paymentDate"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شماره ارجاع پرداخت"
                m="r"
                v-model="recievedPaymentDate"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-custom-text
                label="مبلغ تایید بانک"
                v-model="bankConfirmedAmount"
                m="r"
                type="money"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="تاریخ تایید"
                m="r"
                v-model="confirmDate"
                label-width="92px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شناسه واریز"
                m="r"
                v-model="serial"
                label-width="92px"
              />
            </form-control>
          </FormRow>
        </internal-section>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-save
            label="تایید"
            @click="confirm"
            :disable="disableConfirmBtn"
          />
          <btn-cancel
            label="ابطال"
            :disable="disableRevokeBtn"
            @click="revoke"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  route: "avareze-senfi/fish-confirmation",
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  data () {
    return {
      title: "تایید فیش",
      formKey: "34f008f0-c708-4cdc-b343-97a5065c2650",
      name: "UFishConfirmationSenfi",
      main: true,
      sidebarCompatible: true,
      address: "",
      ownerName: "",
      ficheNumber: "",
      results: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Duty_FicheByFicheNo: {}
      },
      result: null,
      requestResult: null,
      resultByBillIds: { Duty_FicheByBillID: {} },
      resultByBarcode: { Duty_FicheByBarcode: {} },
      resultByBillId: null,
      disableConfirmBtn: true,
      disableRevokeBtn: true,
      changeStatusResult: null,
      changeStatusResults: {},
      isConfirm: false,
      isRevoked: false,
      barcode: "",
      billId: "",
      paymentId: "",
      code: "",
      exportFicheDate: "",
      ficheAmount: "",
      bankCode: "",
      paymentBank: "",
      rahgiriPayment: "",
      paymentDate: "",
      bankConfirmedAmount: "",
      recievedPaymentDate: "",
      confirmDate: "",
      serial: "",
      items: [],
      isEditable: false,
      loadPrequest: {
        pNidProc: "c647eefb-6872-4b7e-99e7-8e6a0396aeb7"
      },
      loadResult: null,
      // baseNosaziCode: {
      //   District: 0,
      //   Region: 0,
      //   Block: 0,
      //   House: 0,
      //   Building: 0,
      //   Apartment: 0,
      //   Shop: 0
      // },
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      selectedRegion: 1,
      paymentType: "fishNo",
      fishNoMode: "e",
      catchIdMode: "r",
      barcodeMode: "r",
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
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    }
  },
  methods: {
    radioChanged (e) {
      if (e === "fishNo") {
        this.fishNoMode = "e"

        this.catchIdMode = "r"

        this.barcodeMode = "r"
      } else if (e === "catchId") {
        this.fishNoMode = "r"

        this.catchIdMode = "e"

        this.barcodeMode = "r"
      } else if (e === "barcode") {
        this.fishNoMode = "r"

        this.catchIdMode = "r"

        this.barcodeMode = "e"
      }
    },
    edit () {
      this.mode = "e"

      this.isEditable = true
    },
    getDutyFicheByFicheNo () {
      this.showLoading()
      let data = {
        pFicheNo: this.ficheNumber,
        PDutyType: 2,
        pEumBaseInfoGroup: 0
      }
      this.$services.SB.getDutyFicheByFicheNo(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.ficheNumber.toString(),
              bizCodeTitle: "شماره فیش",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })

            // // console.log('aaaaaaaaa', convertStringToNosaziCodeObject(
            //   this.results.StrCode.District))
            if (this.results.StrCode !== "") {
              if (
                this.selectedRegion ===
                convertStringToNosaziCodeObject(this.results.StrCode).District
              ) {
                // if (this.results.Duty_FicheByFicheNo !== null) {
                this.billId = this.results.Duty_FicheByFicheNo.BillID
                this.paymentId = this.results.Duty_FicheByFicheNo.PaymentID
                this.exportFicheDate =
                  this.results.Duty_FicheByFicheNo.ExportDate
                this.ficheAmount =
                  this.results.Duty_FicheByFicheNo.PayablePrice
                this.bankCode =
                  this.results.Duty_FicheByFicheNo.ConfirmBankCode
                this.rahgiriPayment =
                  this.results.Duty_FicheByFicheNo.PaymentRahgiriCode
                this.paymentDate = this.results.Duty_FicheByFicheNo.PaymentDate
                this.recievedPaymentDate =
                  this.results.Duty_FicheByFicheNo.PaymentReferenceNo
                this.bankConfirmedAmount =
                  this.results.Duty_FicheByFicheNo.BankConfirmPrice
                this.showConfirmDate =
                  this.results.Duty_FicheByFicheNo.UserConfirmationDate
                this.serial = this.results.Duty_FicheByFicheNo.DepositID
                this.baseNosaziCode = convertStringToNosaziCodeObject(
                  this.results.StrCode
                )
                this.address = this.results.Base_AddressInfo.MainAddress
                if (this.results.Duty_FicheByFicheNo.EumDutyFicheStatus === 1) {
                  this.disableRevokeBtn = false
                  this.disableConfirmBtn = true
                } else {
                  this.disableConfirmBtn = false
                  this.disableRevokeBtn = true
                }
              }
            } else if (this.results.StrCode === "") {
              this.showError("فیشی با این مشخصات یافت نشد.")
            } else {
              this.showError(
                "اطلاعات فیش وارد شده مربوط به منطقه کاربر نمی باشد."
              )
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    getDutyFicheByBillId () {
      this.showLoading()
      let data = {
        pBillID: this.billId,
        pPaymentID: this.paymentId,
        PDutyType: 2,
        pEumBaseInfoGroup: 0
      }
      this.$services.SB.getDutyFicheByBillID(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.resultByBillId = this.getResponse(data)
          if (this.resultByBillId.success) {
            this.resultByBillIds = this.resultByBillId.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.billId.toString(),
              bizCodeTitle: "شناسه قبض",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })

            this.ficheNumber = this.resultByBillIds.Duty_FicheByBillID.FicheNo
            this.billId = this.resultByBillIds.Duty_FicheByBillID.BillID
            this.paymentId = this.resultByBillIds.Duty_FicheByBillID.PaymentID
            this.exportFicheDate =
              this.resultByBillIds.Duty_FicheByBillID.ExportDate
            this.ficheAmount =
              this.resultByBillIds.Duty_FicheByBillID.PayablePrice
            this.bankCode =
              this.resultByBillIds.Duty_FicheByBillID.ConfirmBankCode
            this.rahgiriPayment =
              this.resultByBillIds.Duty_FicheByBillID.PaymentRahgiriCode
            this.paymentDate =
              this.resultByBillIds.Duty_FicheByBillID.PaymentDate
            this.recievedPaymentDate =
              this.resultByBillIds.Duty_FicheByBillID.PaymentReferenceNo
            this.bankConfirmedAmount =
              this.resultByBillIds.Duty_FicheByBillID.BankConfirmPrice
            this.showConfirmDate =
              this.resultByBillIds.Duty_FicheByBillID.UserConfirmationDate
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.results.StrCode
            )
            this.address = this.results.Base_AddressInfo.MainAddress
            this.serial = this.resultByBillIds.Duty_FicheByBillID.DepositID
            if (
              this.resultByBillIds.Duty_FicheByBillID.EumDutyFicheStatus === 1
            ) {
              this.disableRevokeBtn = false
              this.disableConfirmBtn = true
            }
            if (
              this.resultByBillIds.Duty_FicheByBillID.EumDutyFicheStatus ===
                2 ||
              this.resultByBillIds.Duty_FicheByBillID.EumDutyFicheStatus === 5
            ) {
              this.disableConfirmBtn = false
              this.disableRevokeBtn = true
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    getDutyFicheByBarcode () {
      this.showLoading()
      let data = {
        pBarcode: this.barcode,
        pPaymentID: this.paymentId,
        PDutyType: 2,
        pEumBaseInfoGroup: 0
      }
      this.$services.SB.getDutyFicheByBarcode(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.resultByBarcode = this.getResponse(data)
          if (this.resultByBarcode.success) {
            this.resultByBarcodes = this.resultByBarcode.data
            this.ficheNumber =
              this.resultByBarcodes.Duty_FicheByBarcode.FicheNo
            this.billId = this.resultByBarcodes.Duty_FicheByBarcode.BillID
            this.paymentId =
              this.resultByBarcodes.Duty_FicheByBarcode.PaymentID
            this.exportFicheDate =
              this.resultByBarcodes.Duty_FicheByBarcode.ExportDate
            this.ficheAmount =
              this.resultByBarcodes.Duty_FicheByBarcode.PayablePrice
            this.bankCode =
              this.resultByBarcodes.Duty_FicheByBarcode.ConfirmBankCode
            this.rahgiriPayment =
              this.resultByBarcodes.Duty_FicheByBarcode.PaymentRahgiriCode
            this.paymentDate =
              this.resultByBarcodes.Duty_FicheByBarcode.PaymentDate
            this.recievedPaymentDate =
              this.resultByBarcodes.Duty_FicheByBarcode.PaymentReferenceNo
            this.bankConfirmedAmount =
              this.resultByBarcodes.Duty_FicheByBarcode.BankConfirmPrice
            this.showConfirmDate =
              this.resultByBarcodes.Duty_FicheByBarcode.UserConfirmationDate
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.results.StrCode
            )
            this.address = this.results.Base_AddressInfo.MainAddress
            this.serial = this.resultByBarcodes.Duty_FicheByBarcode.DepositID
            if (
              this.resultByBarcodes.Duty_FicheByBarcode.EumDutyFicheStatus === 1
            ) {
              this.disableRevokeBtn = false
              this.disableConfirmBtn = true
            }
            if (
              this.resultByBarcodes.Duty_FicheByBarcode.EumDutyFicheStatus ===
                2 ||
              this.resultByBarcodes.Duty_FicheByBarcode.EumDutyFicheStatus === 5
            ) {
              this.disableConfirmBtn = false
              this.disableRevokeBtn = true
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    confirm () {
      debugger
      // this.showConfirm('فیش در وضعیت تأیید قرار دارد. آیا از ابطال آن اطمینان دارید؟').onOk(() => {
      this.showLoading()
      let data = {
        pNidProc: "00000000-0000-0000-0000-000000000000",
        pDutyFiche: this.results.Duty_FicheByFicheNo,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 2,
        pConfirmBankCode: this.showConfirmBankCode,
        pPaymentBank: this.paymentBank,
        pPaymentRahgiriCode: parseInt(this.paymentRahgiriCode) || 0,
        pPaymentReferenceNo: parseInt(this.paymentReferenceNo) || 0,
        pPaymentDate: this.paymentDate,
        pBankConfirmPrice: parseInt(this.bankConfirmPrice) || 0,
        pEumDutyPaymentType: 1,
        pEumFicheConfirmMethode: 1,
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: false,
        pSetPayOffForConfirmTaghsit: false,
        pIsCancelOtherFiche: false,
        pIsShowAccountingError: false
      }

      this.$services.SB.confirmFiche(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          debugger
          if (this.saveResult.success) {
            try {
              // 9950109001558
              // console.log(this.title)
              // console.log(this.formKey)
              // console.log(this.name)
              // log change sheikhi
              let logStr =
                "BillID:" +
                this.results.Duty_FicheByFicheNo.BillID +
                " PaymentID :" +
                this.results.Duty_FicheByFicheNo.PaymentID
              await this.log({
                action: this.logActions.save,
                bizCode: logStr, // data.pDutyFiche.toString(),
                bizCodeTitle: "شماره فیش",
                saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
              })
            } catch (e) {
              // console.log(e)
            }

            this.showSuccess("فیش انتخاب شده با موفقیت تأیید شد.")
            this.disableConfirmBtn = true
            this.disableRevokeBtn = false
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      // })
    },
    revoke () {
      // this.showConfirm('فیش در وضعیت ابطال قرار دارد. آیا از تأیید آن اطمینان دارید؟').onOk(() => {
      this.showLoading()
      let data = {
        pNidFiche: this.results.Duty_FicheByFicheNo.NidFiche,
        pUserCode: this.getNidUser(),
        PDutyType: 2,
        pUserName: this.getUserDisplayName(),
        IsRefund: false
      }
      this.$services.SB.cancelFiche(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.changeStatusResult = this.getResponse(data)
          if (this.changeStatusResult.success) {
            this.changeStatusResults = this.changeStatusResult.data
            this.showSuccess("فیش انتخاب شده با موفقیت باطل شد.")
            this.disableConfirmBtn = false
            this.disableRevokeBtn = true
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.results?.Duty_FicheByFicheNo?.NidFiche.toString(),
              bizCodeTitle: "شماره فیش",
              saveDesc: `ابطال فیش ${this.results?.Duty_FicheByFicheNo?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
      // })
    },
    isRefund (refund) {
      this.showLoading()
      let data = {
        pNidFiche: this.results.Duty_FicheByFicheNo.NidFiche,
        pUserCode: this.getNidUser(),
        PDutyType: 2,
        pUserName: this.getUserDisplayName(),
        IsRefund: refund
      }
      this.$services.SB.cancelFiche(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.changeStatusResult = this.getResponse(data)
          if (this.changeStatusResult.success) {
            this.changeStatusResults = this.changeStatusResult.data
            if (this.isConfirm) {
              await this.log({
                action: this.logActions.cancel,
                bizCode: this.results?.Duty_FicheByFicheNo?.NidFiche.toString(),
                bizCodeTitle: "شماره فیش",
                saveDesc: `ابطال فیش ${this.results?.Duty_FicheByFicheNo?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
              })
              this.showSuccess("فیش انتخاب شده با موفقیت باطل شد.")
            } else {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.results?.Duty_FicheByFicheNo?.NidFiche.toString(),
                bizCodeTitle: "شماره فیش",
                saveDesc: `تأیید فیش ${this.results?.Duty_FicheByFicheNo?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
              })
              this.showSuccess("فیش انتخاب شده با موفقیت تأیید شد.")
              this.disableConfirmBtn = true
              this.disableRevokeBtn = false
            }
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
