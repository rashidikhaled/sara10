<template>

  <fit>
        <safa-status :result="getBuySignFingerPrintRes" />
        <safa-status :result="saveSignFingerPrintRes" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نام مالک"
          v-model="modelSign.SecretariatNo"
          label-width="100px"
          source-type="local"
          :options="value.Base_Owner"
          validations="required"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm">
      <FormControl>
        <ImageUploader
          title="اثر انگشت"
          type=".png, .jpg"
          v-model="imgFinger"
          :maxFileSize="0.1"
          @getFile="getFileImg2"
        />
          <!-- validations="required" -->
        <safa-text
          label="تاریخ و زمان ایجاد"
          v-model="modelSign.DateImgFinger"
          label-width="110px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="امضا"
          type=".png, .jpg"
          v-model="imgSign"
          :maxFileSize="0.1"
          @getFile="getFileImg1"
        />
          <!-- validations="required" -->
        <safa-text
          label="تاریخ و زمان ایجاد"
          v-model="modelSign.DateImgSign"
          label-width="110px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <div class="fit"></div>
    <div v-if="showErr">
      <safa-notice  type="warning"> لطفا تصویر قبلی را پاک کنید. </safa-notice>
    </div>
    <div>
      <safa-notice>
        پس از هر بار گرفتن امضا یا اثرانگشت برای هریک به طور جداگانه کلید ذخیره
        زده شود.
      </safa-notice>
    </div>
    <div>
      <btn-default label="ذخیره" @click="saveObj" />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: { type: Object, default: () => {} },
    PNIdRequest: { type: String },
    m: { type: String }
  },
  data () {
    return {
      imgSign: null,
      imgFinger: null,
      showErr: false,
      modelSign: {
        SecretariatNo: "",
        pType: null,
        DateImgSign: null,
        DateImgFinger: null,
        pPic: null
      },
      getBuySignFingerPrintRes: null,
      saveSignFingerPrintRes: null
    }
  },
  watch: {
    "modelSign.SecretariatNo" () {
      this.getBuySignFingerPrint()
    },
    imgSign () {
      if (this.imgFinger) {
        // this.imgSign = null
        this.showErr = true
      }
      if (!this.imgFinger && !this.imgSign) {
        this.showErr = false
      }
    },
    imgFinger () {
      if (this.imgSign) {
        // this.imgFinger = null
        this.showErr = true
      }
      if (!this.imgFinger && !this.imgSign) {
        this.showErr = false
      }
    }
  },
  methods: {
    async getBuySignFingerPrint () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getBuySignFingerPrint({ // این متد به دلیل کار نکردن در سرا 8 پیلود بر اساس شباهت با پیلود سرویس های دیگر گذاشته میشود امکان دارد اشتباه باشد
          PNIdRequest: this.PNIdRequest
        })
        this.getBuySignFingerPrintRes = this.getResponse(data)
        if (this.getBuySignFingerPrintRes.success) {
          this.resultModel = this.getBuySignFingerPrintRes.data.GetBuySignFingerPrintResult.RequestOwnerSignFingerPrint
          const imgSignData = this.resultModel.filter(b => b.Type === 1 && b.NidOwner === this.modelSign.SecretariatNo && (b.IsDeleted == null || b?.IsDeleted === false))[0]?.Source ?? []
          const imgFingerData = this.resultModel.filter(b => b.Type === 2 && b.NidOwner === this.modelSign.SecretariatNo && (b.IsDeleted == null || b?.IsDeleted === false))[0]?.Source ?? []
          this.imgSign = imgSignData.Source
          this.modelSign.DateImgSign = imgSignData.CreationTime + " " + imgSignData.CreationDate
          this.imgFinger = imgFingerData.Source
          this.modelSign.DateImgFinger = imgFingerData.CreationTime + " " + imgSignData.CreationDate

          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `آپلود عکس های مالک با موفقیت انجام شد`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj (e) {
      if (!this.isValidForm()) return
      if (!this.modelSign.pPic) {
        this.showError("تصویر مورد نظر وارد نشده است")
        return
      }

      this.showLoading()
      try {
        const { data } = await this.$services.ES.saveSignFingerPrint({ // پیلود این مورد هم کامل نیست به دلیل کار نکردندر سرا 8
          _NIdRequest: this.PNIdRequest,
          SecretariatNo: this.modelSign.SecretariatNo,
          pType: this.modelSign.pType,
          pPic: this.modelSign.pPic
          // 1 در زمل هست که نمیدونم key چی میشه
        })
        this.saveSignFingerPrintRes = this.getResponse(data)
        // eslint-disable-next-line eqeqeq
        let figerOrSign = this.modelSign.pType == 1 ? "امضا" : "اثرانگشت"

        if (this.saveSignFingerPrintRes.success) {
          this.showContractSaleConfirm = false
          this.showSuccess(`ذخیره ${figerOrSign} با موفقیت انجام شد`)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getFileImg1 (file) {
      this.modelSign.pType = 1
      this.modelSign.pPic = file
    },
    getFileImg2 (file) {
      this.modelSign.pType = 2
      this.modelSign.pPic = file
    }
  }
}
</script>
