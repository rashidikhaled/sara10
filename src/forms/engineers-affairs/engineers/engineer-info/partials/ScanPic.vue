<template>
  <FormRow>
    <FormControl>
      <ImageUploader
        title=" نمونه عکس"
        v-model="model.ClsEngineer.Eng_Picture.Picture"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="کارت ملی"
        v-model="model.ClsEngineer.Eng_Picture.PicNationalCode"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="شناسنامه"
        v-model="model.ClsEngineer.Eng_Picture.PicShenasname"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="نمونه مهر"
        v-model="model.ClsEngineer.Eng_Picture.PicMohr"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="آخرین مدرک تحصیلی"
        v-model="model.ClsEngineer.Eng_Picture.PicVoucher"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="نمونه امضاء"
        v-model="model.ClsEngineer.Eng_Picture.PicSignature"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="پروانه اشتغال"
        v-model="model.ClsEngineer.Eng_Picture.PicJobAgreement"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="پشت پروانه اشتغال"
        v-model="model.ClsEngineer.Eng_Picture.PicJobAgreementBack"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
    <FormControl>
      <ImageUploader
        title="نمونه مهر طراحی"
        v-model="model.ClsEngineer.Eng_Picture.PicMohr2"
        :m="m"
        :allowEditImage="true"
      />
    </FormControl>
  </FormRow>
</template>

<script>
export default {
  props: {
    model: Object,
    m: String
  },
  data () {
    return {
      name: "ScanPic"
    }
  }
}
</script>
