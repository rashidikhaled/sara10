<template>
  <fit>
    <FormRow :lg="6" :md="4">
      <FormControl>
        <ImageUploader
          title=" نمونه عکس"
          v-model="value.Picture"
          cdcName="Picture"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="کارت ملی"
          v-model="value.PicNationalCode"
          cdcName="PicNationalCode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="شناسنامه"
          v-model="value.PicShenasname"
          cdcName="PicShenasname"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="مهر"
          v-model="value.PicMohr"
          cdcName="PicMohr"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="امضاء"
          v-model="value.PicSignature"
          cdcName="PicSignature"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="پروانه اشتغال"
          v-model="value.PicJobAgreement"
          cdcName="PicJobAgreement"
          :m="m"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
