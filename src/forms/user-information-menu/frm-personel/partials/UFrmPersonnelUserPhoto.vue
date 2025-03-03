<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-4">
        <ImageUploader
          title="عکس کاربر"
          type=".png"
          v-model="value.userPic"
          @getFile="getFile"
          :maxFileSize="1"
        />
      </div>
      <div class="col-sm-4">
        <ImageUploader
          title="نمونه امضا"
          type=".png"
          v-model="value.signPic"
          :maxFileSize="1"
        />
      </div>
      <div class="col-sm-4">
        <ImageUploader
          title="اثر انگشت"
          type=".png"
          v-model="value.fingerPic"
          :maxFileSize="1"
        />
      </div>
    </div>
    <safa-notice>
      کاربر گرامی، ابتدا نام کاربری را مشخص کرده ، سپس عکس ها را بارگذاری کرده و
      در پایان دکمه ثبت را کلیک نمایید.
    </safa-notice>
  </fit>
</template>

<script>
import fileHelper from "src/mixins/fileHelper"
import ImageUploader from "src/components/ImageUploader.vue"

export default {
  mixins: [fileHelper],
  components: { ImageUploader },
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "UFrmPersonnelUserPhoto"
    }
  },
  methods: {
    getFile (file) {
      this.$emit("UUserPhoto", file)
    }
  }
}
</script>
