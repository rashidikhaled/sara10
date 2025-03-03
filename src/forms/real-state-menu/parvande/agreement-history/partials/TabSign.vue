<template>
  <form-wrapper hideTitle>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="نام مالک"
            v-model="modelSign.SecretariatNo"
            label-width="100px"
            validarions="required"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <FormControl>
          <ImageUploader
            title="اثر انگشت"
            type=".png, .jpg"
            v-model="modelSign.SImageFingerPrint"
            :maxFileSize="0.1"
            @getFile="getFileSImageFingerPrint"
          />
          <safa-datepicker
            label="تاریخ و زمان ایجاد"
            v-model="modelSign.DateFingerPrint"
            label-width="110px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <ImageUploader
            title="امضا"
            type=".png, .jpg"
            v-model="modelSign.SImageSignPrint"
            :maxFileSize="0.1"
            @getFile="getFileSImageSignPrint"
          />
          <safa-datepicker
            label="تاریخ و زمان ایجاد"
            v-model="modelSign.DateImageSign"
            label-width="110px"
            m="r"
          />
        </FormControl>
      </FormRow>
    </fit>

    <template #footer>
      <div>
        <div>
          <safa-notice>
            پس از هر بار گرفتن امضا یا اثرانگشت برای هریک به طور جداگانه کلید
            ذخیره زده شود.
          </safa-notice>
        </div>
        <div class="q-mb-sm">
          <btn-default label="ذخیره" @click="saveSignObj" />
        </div>
      </div>
    </template>
  </form-wrapper>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "TabSign",
      modelSign: {
        SecretariatNo: "",
        SImageSignPrint: null,
        DateImageSign: null,
        SImageFingerPrint: null,
        DateFingerPrint: null
      }
    }
  },
  methods: {
    saveSignObj () {
      if (!this.isValidForm()) return

      if (
        !this.modelSign.SImageSignPrint &&
        !this.modelSign.SImageFingerPrint
      ) {
        this.showError("تصویر مورد نظر وارد نشده است")
      }
      this.modelSign.SImageSignPrint
        ? this.$emit("SaveSignFingerPrint", this.modelSign)
        : this.$emit("SaveSignFingerPrint", this.modelSign)
      // this.$emit("SaveSignFingerPrint", this.modelSign)
    },
    // saveFingerObj () {
    //   if (!this.isValidForm()) return

    //   if (!this.modelSign.SImageFingerPrint) {
    //     this.showError("تصویر مورد نظر وارد نشده است")
    //   }
    //   this.$emit("SaveSignFingerPrint", this.modelSign)
    // },
    getFileSImageSignPrint (file) {
      this.SImageSignPrint = file
    },
    getFileSImageFingerPrint (file) {
      this.SImageFingerPrint = file
    }
  }
}
</script>
