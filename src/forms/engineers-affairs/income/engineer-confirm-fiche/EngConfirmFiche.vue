<template>
  <form-wrapper title="تایید فیش">
    <safa-status :result="requestResult"/>

    <div class="q-my-sm">
      <div class="row q-col-gutter-md items-center">
        <safa-radio
          v-model="paymentType"
          val="fishNo"
          @input="radioChanged"
          cdcName="fishNo"
          class="col-auto"
        />
        <safa-text
          :m="fishNoMode"
          v-model="loadDataPrequest.pFicheNo"
          v-on:keyup="ficheNoKeyUp"
          @blur="fishNoBlur"
          cdcName="pFicheNo"
          class="col"
          label="شماره فیش"
          label-width="75px"
        />
      </div>
      <div class="q-my-sm">
        <div class="row q-col-gutter-md items-center">
          <safa-radio
            v-model="paymentType"
            val="catchId"
            @input="radioChanged"
            cdcName="catchId"
            class="col-auto"
          />
          <safa-text
            :m="catchIdMode"
            v-model="billId"
            cdcName="billId"
            class="col"
            label="شناسه قبض"
            label-width="75px"
          />
          <safa-text
            label="شناسه پرداخت"
            :m="catchIdMode"
            v-model="paymentId"
            @keyup.enter="getDutyFicheByBillId"
            cdcName="paymentId"
            class="col"
            label-width="75px"
          />
        </div>
      </div>
    </div>
    <hr/>
    <FormRow label-width="100px" :lg="2" :md="2" :sm="2">
      <FormControl>
        <safa-text
          label="شماره فیش"
          m="r"
          v-model="exportDate"
          cdcName="ExportDate"
          label-width="108px"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="تاریخ چاپ"
          v-model="payablePrice"
          m="r"
          :type="'money'"
          label-width="94px"
          cdcName="PayablePrice"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شناسه قبض"
          :m="m"
          v-model="confirmBankCode"
          cdcName="ConfirmBankCode"
          label-width="108px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شناسه پرداخت"
          :m="m"
          v-model="paymentRahgiriCode"
          cdcName="PaymentRahgiriCode"
          label-width="94px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="شماره حساب"
          :m="m"
          v-model="paymentDate"
          cdcName="PaymentDate"
          label-width="108px"
        ></safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-text
          label="مبلغ"
          :m="m"
          v-model="paymentReferenceNo"
          cdcName="PaymentReferenceNo"
          label-width="94px"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="بدهی قبلی"
          :m="m"
          :type="'money'"
          label-width="108px"
          v-model="bankConfirmPrice"
          cdcName="BankConfirmPrice"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="بدهی جاری "
          m="r"
          v-model="userConfirmationDate"
          cdcName="UserConfirmationDate"
          label-width="94px"
        />
      </FormControl>
    </FormRow>
    <hr/>
    <FormRow label-width="100px" :lg="2" :md="2" :sm="2">
      <FormControl>
        <safa-text
          label="شماره فیش"
          m="r"
          v-model="exportDate"
          cdcName="ExportDate"
          label-width="108px"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="تاریخ"
          v-model="payablePrice"
          m="r"
          :type="'money'"
          label-width="94px"
          cdcName="PayablePrice"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شعبه"
          :m="m"
          v-model="confirmBankCode"
          cdcName="ConfirmBankCode"
          label-width="108px"
        />
      </FormControl>
    </FormRow>

    <template v-slot:footer>
      <div class="q-mt-sm">
        <div class="row q-gutter-sm">
          <btn-save
            label="تایید"
            @click="confirmFiche"
            ref="confirmBtn"
            :disable="disableConfirmBtn"
          />

          <!-- <safa-securityPanel
            id="40469a8a-c7c3-46e3-ab82-ac14d036fb60"
            caption="ابطال"
          >-->
          <btn-cancel label="ابطال" @click="cancelFiche" :disable="disableCancelBtn"/>
          <!-- </safa-securityPanel> -->
        </div>
      </div>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
// import confirmPrequest from "./models/confirmPrequest.js";
import PersianDate from 'persian-date'

export default {
  route: 'nosazi-avarez/nosazi-confirmation-fish',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تایید فیش',
      formKey: 'B6A629A4-5F0C-4277-B558-BC15CEB4B084',
      name: 'EngConfirmFiche',
      main: true,
      sidebarCompatible: true,

      confirmPrequest: {
        pFileLines: {},
        pFileFormat: 0,
        pUserCode: '',
        pUserName: '',
        pObjOnPrice: 2,
        PDutyType: 1,
        pFilePath: '',
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: true
      },

      loadByBarcodePrequest: {
        pBarcode: '',
        PDutyType: '0',
        pEumBaseInfoGroup: '0'
      },
      loadByShenasePrequest: {
        pBillID: '',
        pPaymentID: '',
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
      paymentType: 'fishNo',
      fishNoMode: 'e',
      catchIdMode: 'r',
      barcodeMode: 'r',
      infoGroupItems: [
        { ID: 1, Title: 'اطلاعات پرونده' },
        { ID: 2, Title: 'نوسازی' }
      ],
      loadDataPrequest: {
        pFicheNo: '',
        PDutyType: '1',
        pEumBaseInfoGroup: '0'
      },
      formModel: {
        Duty_FicheByFicheNo: { EumDutyFicheStatus: null },
        Duty_FicheByBillID: { EumDutyFicheStatus: null }
      },
      requestResult: {},
      cancelfichePrequest: {
        pNidFiche: '',
        pUserCode: '',
        PDutyType: '1',
        pUserName: '',
        IsRefund: 'false',
        pRefundLetterNo: null,
        pRefundLetterDate: null
      },
      editModeForConfirmAndCancel: 'e',
      owner: '',
      billId: '',
      paymentId: '',
      nosizicode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      exportDate: '',
      payablePrice: '',
      confirmBankCode: '',
      paymentRahgiriCode: '',
      paymentReferenceNo: '',
      bankConfirmPrice: '',
      userConfirmationDate: '',
      disableCancelBtn: false,
      disableConfirmBtn: false
    }
  },
  computed: {
    ownersFullName () {
      if (!this.formModel.Base_Owner) {
        return ''
      }

      return this.formModel.Base_Owner.map(
        m => m.OwnerLastName + ' ' + m.OwnerName
      ).join(' , ')
    },
    fullAddress () {
      if (
        !this.formModel.Base_AddressInfo ||
        !this.formModel.Base_CommonEstate
      ) {
        return ''
      }

      return (
        this.formModel.Base_AddressInfo.MainAddress +
        '' +
        this.formModel.Base_CommonEstate.Plack
      )
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  methods: {
    radioChanged (e) {
      if (e === 'fishNo') {
        this.fishNoMode = 'e'

        this.catchIdMode = 'r'

        this.barcodeMode = 'r'
      } else if (e === 'catchId') {
        this.fishNoMode = 'r'

        this.catchIdMode = 'e'

        this.barcodeMode = 'r'
      } else if (e === 'barcode') {
        this.fishNoMode = 'r'

        this.catchIdMode = 'r'

        this.barcodeMode = 'e'
      }
    },
    ficheNoKeyUp (e) {
      if (e.key === 'Enter') {
        this.loadData()

        this.$refs.confirmBtn.$el.focus()
      }
    },
    loadData () {
      try {
        if (this.loadDataPrequest.pFicheNo === '') {
          this.showError('شماره فیش وارد نشده است')

          return
        }

        if (this.loadDataPrequest.selectedRegion === '0') {
          this.showError('منطقه وارد نشده است')

          return
        }

        this.showLoading()

        this.$services.SB.getDutyFicheByFicheNo(this.loadDataPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          await this.log({
            action: this.logActions.view,
            bizCode: this.loadDataPrequest.pFicheNo,
            bizCodeTitle: 'شماره فیش'
          })

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
            if (!this.formModel.Duty_FicheByFicheNo) {
              this.showError('فیشی با این مشخطات یافت نشد')
              return
            }
            this.owner = ''
            if (this.formModel.Base_Owner.length !== 0) {
              for (var i = 0; i < this.formModel.Base_Owner.length; i++) {
                if (this.formModel.Base_Owner[i].OwnerName !== null) {
                  this.owner += this.formModel.Base_Owner[i].OwnerName + ' '
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
              this.payablePrice = this.formModel.Duty_FicheByFicheNo.PayablePrice
              this.confirmBankCode = this.formModel.Duty_FicheByFicheNo.ConfirmBankCode
              this.paymentRahgiriCode = this.formModel.Duty_FicheByFicheNo.PaymentRahgiriCode
              this.paymentDate = this.formModel.Duty_FicheByFicheNo.PaymentDate
              this.paymentReferenceNo = this.formModel.Duty_FicheByFicheNo.PaymentReferenceNo
              this.bankConfirmPrice = this.formModel.Duty_FicheByFicheNo.BankConfirmPrice
              this.userConfirmationDate = this.formModel.Duty_FicheByFicheNo.UserConfirmationDate
              if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 1) {
                this.editModeForConfirmAndCancel = 'r'
                this.disableConfirmBtn = true
              } else if (
                this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 2
              ) {
                this.editModeForConfirmAndCancel = 'e'
                this.disableCancelBtn = true
              }
            }

            // eslint-disable-next-line no-debugger
            // debugger
            let tmpDistrict = Number(
              this.requestResult.data.StrCode.split('-')[0]
            )
            if (tmpDistrict !== this.selectedRegion) {
              this.showError(
                'اطلاعات فیش وارد شده مربوط به منطقه کاربر نمی باشد'
              )
            }
            this.nosizicode = this.convertToNosaziCodeObject(
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
      if (!this.isFicheNoEntered()) {
        return
      }

      if (this.formModel.Duty_FicheByFicheNo.EumDutyFicheStatus === 2) {
        this.showConfirm(
          'فیش در وضعیتت ابطال قرار دارد آیا از تایید آن اطمینان دارید؟'
        ).onOk(() => {
          this.confirmComplete()
        })

        return
      }

      this.confirmComplete()
    },
    confirmComplete () {
      try {
        this.confirmPrequest.pDutyFiche = this.formModel.Duty_FicheByFicheNo

        this.confirmPrequest.pUserCode = this.getNidUser()

        this.confirmPrequest.pUserName = this.getUserDisplayName()

        if (this.formModel.Duty_FicheByFicheNo.PaymentDate === '') {
          this.showError('لطفا تاریخ تایید را وارد کنید')

          return
        }

        if (
          this.formModel.Duty_FicheByFicheNo.PaymentDate <
          this.formModel.Duty_FicheByFicheNo.ExportDate
        ) {
          this.showError('تاریخ پرداخت نباید قبل از تاریخ صدور فیش باشد')

          return
        }

        var now = new PersianDate(now)
          .toLocale('en')
          .toCalendar('persian')
          .format('L')

        if (this.formModel.Duty_FicheByFicheNo.PaymentDate > now) {
          this.showError('تاریخ پرداخت نباید بزرگتر از امروز باشد')

          return
        }

        this.showSending()
        this.$services.SB.confirmFiche(this.confirmPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async response => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.loadDataPrequest.pFicheNo,
              bizCodeTitle: 'شماره فیش',
              saveDesc: `فیش ${this.loadDataPrequest.pFicheNo} با موفقیت تایید شد`
            })

            this.showSuccess('فیش انتخاب شده با موفقیت تایید شد')

            this.loadData()

            this.editModeForConfirmAndCancel = 'r'
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
          'فیش در وضعیتت تایید قرار دارد آیا از ابطال آن اطمینان دارید؟'
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

        this.cancelfichePrequest.pNidFiche = this.formModel.Duty_FicheByFicheNo.NidFiche

        this.cancelfichePrequest.pUserCode = this.getNidUser()

        this.cancelfichePrequest.pUserName = this.getUserDisplayName()

        this.showSending()
        this.$services.SB.cancelFiche(this.cancelfichePrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(response => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.showSuccess('فیش انتخاب شده با موفقیت باطل شد')

            this.loadData()

            this.editModeForConfirmAndCancel = 'e'
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      }
    },
    isFicheNoEntered () {
      if (this.formModel.Base_Owner.length === 0) {
        this.showError('لطفا شماره فیش را وارد کنید')

        return false
      }

      return true
    },
    fishNoBlur (e) {
      this.loadData()
    },

    async getDutyFicheByBillId () {
      try {
        if (this.loadByShenasePrequest.BillID === '') {
          this.showError('شناسه پرداخت وارد نشده است')

          return
        }

        if (this.loadByShenasePrequest.PaymentID === '0') {
          this.showError('شناسه قبض وارد نشده است')

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
            bizCodeTitle: 'شناسه پرداخت'
          })
          this.formModel = this.requestResult.data
          if (this.formModel.Duty_FicheByBillID) {
            if (this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 1) {
              this.editModeForConfirmAndCancel = 'r'
              this.disableConfirmBtn = true
            } else if (
              this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 2
            ) {
              this.editModeForConfirmAndCancel = 'e'
              this.disableCancelBtn = true
            }
            this.loadDataPrequest.pFicheNo = this.formModel.Duty_FicheByBillID.FicheNo

            this.exportDate = this.formModel.Duty_FicheByBillID.ExportDate
            this.payablePrice = this.formModel.Duty_FicheByBillID.PayablePrice
            this.confirmBankCode = this.formModel.Duty_FicheByBillID.ConfirmBankCode
            this.paymentRahgiriCode = this.formModel.Duty_FicheByBillID.PaymentRahgiriCode
            this.paymentDate = this.formModel.Duty_FicheByBillID.PaymentDate
            this.paymentReferenceNo = this.formModel.Duty_FicheByBillID.PaymentReferenceNo
            this.bankConfirmPrice = this.formModel.Duty_FicheByBillID.BankConfirmPrice
            this.userConfirmationDate = this.formModel.Duty_FicheByBillID.UserConfirmationDate
          } else if (!this.formModel.Duty_FicheByBillID) {
            this.showError('فیشی با این مشخطات یافت نشد')
          }
          this.nosizicode = this.convertToNosaziCodeObject(
            this.formModel.StrCode
          )
        }
      } catch (error) {
        console.log('error', error)
        this.showError()
      } finally {
        this.hideLoading()
      }
    },
    barCodeKeyUp () {
      try {
        if (this.loadByBarcodePrequest.pBarcode === '') {
          this.showError('بارکد وارد نشده است')

          return
        }

        this.showLoading()
        this.$services.SB.getDutyFicheByBarcode(this.loadByBarcodePrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          await this.log({
            action: this.logActions.view,
            bizCode: this.loadByBarcodePrequest.pBarcode,
            bizCodeTitle: 'بار کد'
          })

          // console.log('////////this.requestResult', this.requestResult)

          if (!this.requestResult.hasError) {
            if (this.formModel.Duty_FicheByBillID) {
              this.formModel = this.requestResult.data

              if (this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 1) {
                this.editModeForConfirmAndCancel = 'r'
              } else if (
                this.formModel.Duty_FicheByBillID.EumDutyFicheStatus === 2
              ) {
                this.editModeForConfirmAndCancel = 'e'
              }
            } else if (!this.formModel.Duty_FicheByBarcode) {
              this.showError('فیشی با این مشخطات یافت نشد')
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
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
.splitter {
  color: green;
}
</style>
