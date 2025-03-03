<template>
  <div>
    <div class="row q-col-gutter-lg">
      <div class=" col-12 col-md-3  col-sm-4">
        <safa-text
          label="مساحت طبق سند"
          m="r"
        />
      </div>
      <!-- <div class=" col-12 col-md-3  col-sm-4">
        <safa-text label="مساحت وضع موجود" m="r" />
      </div>
      <div class=" col-12 col-md-3  col-sm-4">
        <safa-text label="مساحت پس از رعایت بر اصلاحی" :m="m" v-model="areaAfterEdit"/>
      </div>
      <div class=" col-12 col-md-3  col-sm-4">
        <safa-text label="مساحت باقیمانده" :m="m" v-model="remainArea"/>
      </div> -->
      <div class=" col-12 col-md-3  col-sm-4">
        <safa-text
          v-model="mizan"
          :m="m"
          label="میزان در مسیر"
        />
      </div>
      <div class="col-12">
        <text-template
          v-model="comments"
          :form-key="formKey"
          :m="m"
          label="نظرات برو کف"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    },
    formKey: String
  },
  data: function () {
    return {
      areaAfterEdit: '',
      remainArea: '',
      mizan: '',
      comments: ''
    }
  }
}
</script>//test2
