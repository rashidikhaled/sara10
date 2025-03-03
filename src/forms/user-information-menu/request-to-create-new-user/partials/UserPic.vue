<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <ImageUploader
          title="عکس کاربر"
          type=".png"
          v-model="value.userPic"
          cdcName="userPic"
          :maxFileSize="0.5"
          :m="m"
          :allowDownload="false"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="نمونه امضا"
          type=".png, .jpg"
          v-model="value.signatureImage"
          cdcName="signatureImage"
          :maxFileSize="0.5"
          :m="m"
          :allowDownload="false"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="اثر انگشت"
          type=".png, .jpg"
          v-model="value.fingerprintImage"
          cdcName="fingerprintImage"
          :maxFileSize="0.5"
          :m="m"
          :allowDownload="false"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "UserPic"
    }
  }
}
</script>
