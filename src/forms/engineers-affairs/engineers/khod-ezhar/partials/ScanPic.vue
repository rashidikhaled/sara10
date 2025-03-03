<template>
  <fit>
    <FormRow :lg="3" :md="3">
      <FormControl>
        <ImageUploader
          title="نمونه عکس"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.Picture"
          :m="mode"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :background="isModifyField('Picture')"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="کارت ملی"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicNationalCode"
          :m="mode"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :background="isModifyField('PicSignature')"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="شناسنامه"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicShenasname"
          :m="mode"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :background="isModifyField('PicShenasname')"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="نمونه مهر نظارت"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicMohr"
          :m="mode"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :background="isModifyField('PicNationalCode')"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="امضاء"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicSignature"
          :m="mode"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :background="isModifyField('PicMohr')"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="پروانه اشتغال"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicJobAgreement"
          :m="mode"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :background="isModifyField('PicJobAgreement')"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="پشت پروانه اشتغال"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicJobAgreementBack"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="آخرین مدرک تحصیلی"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicVoucher"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="نمونه مهر طراحی"
          v-model="model.ClsEngineerTemp.Eng_Picture_Temp.PicMohr2"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
        />
      </FormControl>
    </FormRow>
    <div class="fit" />
    <div>
      <ul class="listAttention">
        <li>
          <q-icon name="done" class="icon" />
          حجم عکس شخص باید کمتر از 200 کیلوبایت باشد.
        </li>
        <li>
          <q-icon name="done" class="icon" />
          عکس دارای ضمینه سفید و بدون کلاه و عینک و کراوات باشد.
        </li>
        <li>
          <q-icon name="done" class="icon" />
          دقت تصاویر 150 Dimensions و فرمت آن JPG یا PNG باشد.
        </li>
        <li>
          <q-icon name="done" class="icon" />
          نمونه مهر و اسکن مهر به شهرداری آورده شود.
        </li>
      </ul>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    m: String,
    formKey: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    engCompareFields () {
      return this.model &&
      this.model.ClsEngCompare &&
      this.model.ClsEngCompare.map(x => x.Name)
    }
  },
  methods: {
    isModifyField (field) {
      if (!this.engCompareFields.includes(field)) {
        return 'rgba(140, 250, 255, .3) !important'
      } else {
        return 'rgba(230, 230, 230, 0.93) !important'
      }
    }
  },
  data () {
    return {
      name: "ScanPic"
    }
  }
}
</script>
