<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="تایید فیش">
      <safa-status :result="requestResult" />
      <nosazi-code-input
        v-model="baseNosaziCode"
        :actions="false"
        label="کد نوسازی"
        label-width="70px"
        m="r"
      />
      <safa-text
        :value="ownersFullName"
        class="q-my-sm"
        label="نام مالک"
        label-width="108px"
        m="r"
      />
      <safa-text :value="fullAddress" label="آدرس" label-width="108px" m="r" />
      <hr />
      <div class="q-my-sm">
        <div class="row q-col-gutter-md items-center">
          <safa-radio
            v-model="paymentType"
            cdcName="fishNo"
            class="col-auto"
            val="fishNo"
            @input="radioChanged"
          />
          <safa-text
            v-model="loadDataPrequest.pFicheNo"
            :m="fishNoMode"
            cdcName="pFicheNo"
            class="col"
            label="شماره فیش"
            label-width="75px"
            @blur="fishNoBlur"
            v-on:keyup="ficheNoKeyUp"
          />
          <safa-combo
            v-model="selectedRegion"
            :m="fishNoMode"
            :options="districts"
            :use-input="false"
            cdcName="selectedRegion"
            class="col"
            label="منطقه"
            label-width="75px"
            source-type="local"
          ></safa-combo>
        </div>
        <div class="q-my-sm">
          <div class="row q-col-gutter-md items-center">
            <safa-radio
              v-model="paymentType"
              cdcName="catchId"
              class="col-auto"
              val="catchId"
              @input="radioChanged"
            />
            <safa-text
              v-model="billId"
              :m="catchIdMode"
              cdcName="billId"
              class="col"
              label="شناسه قبض"
              label-width="75px"
            />
            <safa-text
              v-model="paymentId"
              :m="catchIdMode"
              cdcName="paymentId"
              class="col"
              label="شناسه پرداخت"
              label-width="75px"
              @keyup.enter="getDutyFicheByBillId"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md items-center">
          <safa-radio
            v-model="paymentType"
            cdcName="barcode"
            class="col-auto"
            val="barcode"
            @input="radioChanged"
          />
          <safa-text
            v-model="loadByBarcodePrequest.pBarcode"
            :m="barcodeMode"
            cdcName="pBarcode"
            class="col"
            label="بارکد"
            label-width="75px"
            @keyup.enter="barCodeKeyUp"
          />
        </div>
      </div>
      <hr />
      <FormRow :lg="2" :md="2" :sm="2" label-width="100px">
        <FormControl>
          <safa-text
            v-model="exportDate"
            cdcName="ExportDate"
            label="تاریخ صدور فیش"
            label-width="108px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="payablePrice"
            :type="'money'"
            cdcName="PayablePrice"
            label="مبلغ فیش"
            label-width="94px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="confirmBankCode"
            cdcName="ConfirmBankCode"
            label="کد بانک"
            label-width="108px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نام بانک"
            v-model="paymentBank"
            cdcName="CI_Bank"
            ciName="CI_Bank"
            m="e"
            label-width="108px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="paymentRahgiriCode"
            cdcName="PaymentRahgiriCode"
            label="کد رهگیری پرداخت"
            label-width="94px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="paymentDate"
            cdcName="PaymentDate"
            label="تاریخ پرداخت"
            label-width="108px"
          ></safa-datepicker>
        </FormControl>
        <FormControl>
          <safa-text
            v-model="paymentReferenceNo"
            cdcName="PaymentReferenceNo"
            label="شماره ارجاع پرداخت"
            label-width="94px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="bankConfirmPrice"
            :type="'money'"
            cdcName="BankConfirmPrice"
            label="مبلغ تایید بانک"
            label-width="108px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="userConfirmationDate"
            cdcName="UserConfirmationDate"
            label="تاریخ تایید"
            label-width="94px"
            m="r"
          />
        </FormControl>
      </FormRow>

      <template v-slot:footer>
        <div class="q-mt-sm">
          <div class="row q-gutter-sm">
            <btn-save
              ref="confirmBtn"
              :disable="disableConfirmBtn"
              label="تایید"
              @click="confirmFiche"
            />

            <!-- <safa-securityPanel
            id="40469a8a-c7c3-46e3-ab82-ac14d036fb60"
            caption="ابطال"
          >-->
            <btn-cancel
              :disable="disableCancelBtn"
              label="ابطال"
              @click="cancelFiche"
            />
            <!-- </safa-securityPanel> -->
          </div>
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import confirmPrequest from "./models/confirmPrequest.js"
import PersianDate from "persian-date"

export default {
  route: "nosazi-avarez/nosazi-confirmation-fish",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "تایید فیش",
      formKey: "d21ddd84-41b1-4e28-8d60-947594be8a1a",
      name: "UNosaziConfirmationFish",
      main: true,
      sidebarCompatible: true,
      loadByBarcodePrequest: {
        pBarcode: "",
        PDutyType: "0",
        pEumBaseInfoGroup: "0"
      },
      loadByShenasePrequest: {
        pBillID: "",
        pPaymentID: "",
        PDutyType: 1,
        pEumBaseInfoGroup: 0
      },
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 }
      ],
      selectedRegion: 1,
      selectedInfoGroup: 1,
      paymentType: "fishNo",
      fishNoMode: "e",
      catchIdMode: "r",
      barcodeMode: "r",
      infoGroupItems: [
        { ID: 1, Title: "اطلاعات پرونده" },
        { ID: 2, Title: "نوسازی" }
      ],
      loadDataPrequest: {
        pFicheNo: "",
        PDutyType: "1",
        pEumBaseInfoGroup: "0"
      },
      formModel: {
        Duty_FicheByFicheNo: { EumDutyFicheStatus: null },
        Duty_FicheByBillID: { EumDutyFicheStatus: null }
      },
      requestResult: {},
      cancelfichePrequest: {
        pNidFiche: "",
        pUserCode: "",
        PDutyType: "1",
        pUserName: "",
        IsRefund: "false",
        pRefundLetterNo: null,
        pRefundLetterDate: null
      },
      editModeForConfirmAndCancel: "e",
      owner: "",
      billId: "",
      paymentId: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      exportDate: "",
      payablePrice: "",
      confirmBankCode: "",
      paymentRahgiriCode: "",
      paymentBank: "",
      paymentReferenceNo: "",
      bankConfirmPrice: "",
      userConfirmationDate: "",
      disableCancelBtn: false,
      disableConfirmBtn: false,
      paymentDate: ""
    }
  },
  computed: {
    ownersFullName () {
      if (!this.formModel.Base_Owner) {
        return ""
      }

      return this.formModel.Base_Owner.map(
        (m) => m.OwnerLastName + " " + m.OwnerName
      ).join(" , ")
    },
    fullAddress () {
      if (
        !this.formModel.Base_AddressInfo ||
        !this.formModel.Base_CommonEstate
      ) {
        return ""
      }

      return (
        this.formModel.Base_AddressInfo.MainAddress +
        "" +
        this.formModel.Base_CommonEstate.Plack
      )
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
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
    ficheNoKeyUp (e) {
      if (e.key === "Enter") {
        this.loadData()

        this.$refs.confirmBtn.$el.focus()
      }
    },
    loadData () {
      try {
        if (this.loadDataPrequest.pFicheNo === "") {
          this.showError("شماره فیش وارد نشده است")

          return
        }

        if (this.loadDataPrequest.selectedRegion === "0") {
          this.showError("منطقه وارد نشده است")

          return
        }

        this.showLoading()

        this.$services.SB.getDutyFicheByFicheNo(this.loadDataPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          await this.log({
            action: this.logActions.view,
            bizCode: this.loadDataPrequest.pFicheNo,
            bizCodeTitle: "شماره فیش"
          })

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
            if (!this.formModel.Duty_FicheByFicheNo) {
              this.showError("فیشی با این مشخصات یافت نشد")
              return
            }
            this.owner = ""
            if (this.formModel.Base_Owner.length !== 0) {
              for (var i = 0; i < this.formModel.Base_Owner.length; i++) {
                if (this.formModel.Base_Owner[i].OwnerName !== null) {
                  this.owner += this.formModel.Base_Owner[i].OwnerName + " "
                }
                if (this.formModel.Base_Owner[i].OwnerLastName !== null) {
                  this.owner += this.formModel.Base_Owner[i].OwnerLastName
                }
              }
            }
            if (this.formModel.Duty_FicheByFicheNo) {
              this.billId = this.formModel.Duty_FicheByFicheNo.BillID
              this.paymentId = this.formModel.Duty_FicheByFicheNo.PaymentID

              this.exportDate = this.formModel.Duty_FicheByFicheNo.ExportDate
              this.payablePrice =
                this.formModel.Duty_FicheByFicheNo.PayablePrice
              this.confirmBankCode =
                this.formModel.Duty_FicheByFicheNo.ConfirmBankCode
              this.paymentRahgiriCode =
                this.formModel.Duty_FicheByFicheNo.PaymentRahgiriCode
              this.paymentDate = this.paymentDate
              this.paymentReferenceNo =
                this.formModel.Duty_FicheByFicheNo.PaymentReferenceNo
              this.bankConfirmPrice =
                this.formModel.Duty_FicheByFicheNo.BankConfirmPrice
              this.userConfirmationDate =
                this.formModel.Duty_FicheByFicheNo.UserConfirmationDate
              if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 1) {
                this.editModeForConfirmAndCancel = "r"
                this.disableConfirmBtn = true
              } else if (
                this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 2
              ) {
                this.editModeForConfirmAndCancel = "e"
                this.disableCancelBtn = true
              }
            }

            // eslint-disable-next-line no-debugger
            // debugger
            let tmpDistrict = Number(
              this.requestResult.data.StrCode.split("-")[0]
            )
            if (tmpDistrict !== this.selectedRegion) {
              this.showError(
                "اطلاعات فیش وارد شده مربوط به منطقه کاربر نمی باشد"
              )
            }
            this.baseNosaziCode = this.convertToNosaziCodeObject(
              this.formModel.StrCode
            )

            // else if (!this.formModel.Duty_FicheByFicheNo) {
            //   this.showError('فیشی با این مشخطات یافت نشد')
            // }
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },

    confirmFiche () {
      debugger
      // if (!this.isFicheNoEntered()) {
      //   return
      // }

      if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 2) {
        this.showConfirm(
          "فیش در وضعیت ابطال قرار دارد آیا از تایید آن اطمینان دارید؟"
        ).onOk(() => {
          this.confirmComplete()
        })

        return
      }

      this.confirmComplete()
    },
    confirmComplete () {
      debugger
      try {
        confirmPrequest.pDutyFiche = this.formModel.Duty_FicheByFicheNo

        confirmPrequest.pUserCode = this.getNidUser()

        confirmPrequest.pUserName = this.getUserDisplayName()

        confirmPrequest.pPaymentBank = this.paymentBank

        if (this.paymentDate === "") {
          this.showError("لطفا تاریخ پرداخت را وارد نمایید")

          return
        }

        if (
          this.paymentDate <
          this.formModel.Duty_FicheByFicheNo.ExportDate
        ) {
          this.showError("تاریخ پرداخت نباید قبل از تاریخ صدور فیش باشد")

          return
        }

        var now = new PersianDate(now)
          .toLocale("en")
          .toCalendar("persian")
          .format("L")

        if (this.paymentDate > now) {
          this.showError("تاریخ پرداخت نباید بزرگتر از امروز باشد")

          return
        }

        this.showSending()
        this.$services.SB.confirmFiche(confirmPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async (response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            debugger
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.loadDataPrequest.pFicheNo,
              bizCodeTitle: "شماره فیش",
              saveDesc: `فیش ${this.loadDataPrequest.pFicheNo} با موفقیت تایید شد`
            })

            this.showSuccess("فیش انتخاب شده با موفقیت تایید شد")

            this.loadData()

            this.editModeForConfirmAndCancel = "r"
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      }
    },
    cancelFiche () {
      if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 1) {
        this.showConfirm(
          "فیش در وضعیت تایید قرار دارد آیا از ابطال آن اطمینان دارید؟"
        ).onOk(() => {
          this.cancelComplete()
        })

        return
      }

      this.cancelComplete()
    },
    cancelComplete () {
      try {
        if (!this.isFicheNoEntered()) {
          return
        }

        this.cancelfichePrequest.pNidFiche =
          this.formModel.Duty_FicheByFicheNo.NidFiche

        this.cancelfichePrequest.pUserCode = this.getNidUser()

        this.cancelfichePrequest.pUserName = this.getUserDisplayName()

        this.showSending()
        this.$services.SB.cancelFiche(this.cancelfichePrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then((response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.showSuccess("فیش انتخاب شده با موفقیت باطل شد")

            this.loadData()

            this.editModeForConfirmAndCancel = "e"
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      }
    },
    isFicheNoEntered () {
      if (this.formModel.Base_Owner.length === 0) {
        this.showError("لطفا شماره فیش را وارد کنید")

        return false
      }

      return true
    },
    fishNoBlur (e) {
      this.loadData()
    },

    async getDutyFicheByBillId () {
      try {
        if (this.loadByShenasePrequest.BillID === "") {
          this.showError("شناسه پرداخت وارد نشده است")

          return
        }

        if (this.loadByShenasePrequest.PaymentID === "0") {
          this.showError("شناسه قبض وارد نشده است")

          return
        }

        this.showLoading()
        this.loadByShenasePrequest.pBillID = this.billId
        this.loadByShenasePrequest.pPaymentID = this.paymentId
        const response = await this.$services.SB.getDutyFicheByBillId(
          this.loadByShenasePrequest,
          {
            config: {
              District: this.selectedRegion
            }
          }
        )

        this.requestResult = this.getResponse(response.data)
        if (!this.requestResult.hasError) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.paymentId,
            bizCodeTitle: "شناسه پرداخت"
          })
          this.formModel = this.requestResult.data
          if (this.formModel.Duty_FicheByBillID) {
            if (this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 1) {
              this.editModeForConfirmAndCancel = "r"
              this.disableConfirmBtn = true
            } else if (
              this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 2
            ) {
              this.editModeForConfirmAndCancel = "e"
              this.disableCancelBtn = true
            }
            this.loadDataPrequest.pFicheNo =
              this.formModel.Duty_FicheByBillID.FicheNo

            this.exportDate = this.formModel.Duty_FicheByBillID.ExportDate
            this.payablePrice = this.formModel.Duty_FicheByBillID.PayablePrice
            this.confirmBankCode =
              this.formModel.Duty_FicheByBillID.ConfirmBankCode
            this.paymentRahgiriCode =
              this.formModel.Duty_FicheByBillID.PaymentRahgiriCode
            this.paymentDate = this.paymentDate
            this.paymentReferenceNo =
              this.formModel.Duty_FicheByBillID.PaymentReferenceNo
            this.bankConfirmPrice =
              this.formModel.Duty_FicheByBillID.BankConfirmPrice
            this.userConfirmationDate =
              this.formModel.Duty_FicheByBillID.UserConfirmationDate
          } else if (!this.formModel.Duty_FicheByBillID) {
            this.showError("فیشی با این مشخصات یافت نشد")
          }
          this.baseNosaziCode = this.convertToNosaziCodeObject(
            this.formModel.StrCode
          )
        }
      } catch (error) {
        console.log("error", error)
        this.showError()
      } finally {
        this.hideLoading()
      }
    },
    barCodeKeyUp () {
      try {
        if (this.loadByBarcodePrequest.pBarcode === "") {
          this.showError("بارکد وارد نشده است")

          return
        }

        this.showLoading()
        this.$services.SB.getDutyFicheByBarcode(this.loadByBarcodePrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          await this.log({
            action: this.logActions.view,
            bizCode: this.loadByBarcodePrequest.pBarcode,
            bizCodeTitle: "بار کد"
          })

          // console.log('////////this.requestResult', this.requestResult)

          if (!this.requestResult.hasError) {
            if (this.formModel.Duty_FicheByBillID) {
              this.formModel = this.requestResult.data

              if (this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 1) {
                this.editModeForConfirmAndCancel = "r"
              } else if (
                this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 2
              ) {
                this.editModeForConfirmAndCancel = "e"
              }
            } else if (!this.formModel.Duty_FicheByBarcode) {
              this.showError("فیشی با این مشخصات یافت نشد")
            }
          }

          // if (!this.requestResult.hasError) {
          //   if (this.formModel.Duty_FicheByFicheNo) {
          //     this.formModel = this.requestResult.data

          //     if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 1) {
          //       this.editModeForConfirmAndCancel = 'r'
          //     } else if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 2) {
          //       this.editModeForConfirmAndCancel = 'e'
          //     }
          //   } else if (!this.formModel.Duty_FicheByBillID) {
          //     this.showError('فیشی با این مشخطات یافت نشد')
          //   }
          // }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    }
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.splitter {
  color: green;
}
</style>
