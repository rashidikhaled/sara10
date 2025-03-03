<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="changeNosaziCodeRes" />
      </template>
      <fit>
        <form-row>
          <nosazi-code-input
            label="کد نوسازی قدیم"
            label-width="95px"
            actions
            cdcName="nosaziCodeBase"
            v-model="nosaziCodeBase"
          />
        </form-row>
        <form-row>
          <nosazi-code-input
            label="کد نوسازی جدید"
            label-width="95px"
            actions
            cdcName="nosaziCodeDest"
            v-model="nosaziCodeDest"
          />
        </form-row>
      </fit>
      <template #footer>
        <btn-save label="تایید" @click="saveObj" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تغییر کد نوسازی",
      formKey: "582E5E26-C072-480D-9AB2-55C1B3E3F7DA",
      name: "UChangeCode",
      main: true,
      changeNosaziCodeRes: null,
      nosaziCodeBase: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeDest: {
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

  mounted () {
    if (this.selectedRequest) {
      this.nosaziCodeBase = convertStringToNosaziCodeObject(
        this.selectedRequest.bizCode
      )
    }
  },
  methods: {
    async saveObj () {
      if (
        this.nosaziCodeBase.District === 0 ||
        this.nosaziCodeDest.District === 0
      ) {
        return this.showError("کد نوسازی وارد شده صحیح نمی باشد.")
      }
      try {
        const payload = {
          DistrictOld: this.nosaziCodeBase.District,
          RegionOld: this.nosaziCodeBase.Region,
          BlockOld: this.nosaziCodeBase.Block,
          HouseOld: this.nosaziCodeBase.House,
          BuildingOld: this.nosaziCodeBase.Building,
          ApartmentOld: this.nosaziCodeBase.Apartment,
          ShopOld: this.nosaziCodeBase.Shop,
          DistrictNew: this.nosaziCodeDest.District,
          RegionNew: this.nosaziCodeDest.Region,
          BlockNew: this.nosaziCodeDest.Block,
          HouseNew: this.nosaziCodeDest.House,
          BuildingNew: this.nosaziCodeDest.Building,
          ApartmentNew: this.nosaziCodeDest.Apartment,
          ShopNew: this.nosaziCodeDest.Shop
        }
        this.showLoading()
        const { data } = await this.$services.ES.getChangeCodeString(payload)
        this.changeNosaziCodeRes = this.getResponse(data)
        if (this.changeNosaziCodeRes.success) {
          debugger
          await this.log({
            action: this.logActions.update,
            bizCode: convertNosaziCodeObjectToString(this.nosaziCodeDest),
            bizCodeTitle: "NosaziCode"
          })
          if (this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult) {
            if (
              this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult
                .CountNew > 0
            ) {
              this.showSuccess("کد نوسازی با موفقیت تغییر یافت")
            } else if (
              this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult
                .CountNew === -1
            ) {
              this.showError("کد نوسازی جدید در سیستم موجود می باشد")
            } else if (
              this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult
                .CountNew === -11
            ) {
              this.showError("کد نوسازی در لیست کنترلی می باشد")
            } else if (
              this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult
                .CountNew === -22
            ) {
              this.showError("کد نوسازی در لیست سیاه می باشد")
            } else if (
              this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult
                .CountNew === -3
            ) {
              this.showError("کد نوسازی دارای صلح نامه خرید می باشد")
            } else if (
              this.changeNosaziCodeRes.data.GetChangeCodeString_ResultResult
                .CountNew === -4
            ) {
              this.showError("کد نوسازی دارای صلح نامه فروش می باشد")
            } else {
              this.showError("کد نوسازی قدیم در سیستم موجود نمی باشد")
            }
          } else {
            this.showError("خطا در تغییر کد")
          }
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
