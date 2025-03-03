<template>
  <fit>
    <internal-section>
      <safa-group
        :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
        :m="m"
        margin="0"
      >
        <safa-custom-text
          type="decimal"
          label="مساحت طبق سند"
          m="r"
          label-width="130px"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت وضع موجود"
          m="r"
          label-width="130px"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="areaAfterEdit"
          cdcName="areaAfterEdit"
          label-width="170px"
          :m="m"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت باقیمانده"
          v-model="remainArea"
          cdcName="remainArea"
          label-width="130px"
          :m="m"
        />
        <safa-text
          label="میزان در مسیر"
          v-model="mizan"
          cdcName="mizan"
          label-width="130px"
        />
      </safa-group>
    </internal-section>
    <text-template
      label="نظرات برو کف"
      v-model="comments"
      cdcName="comments"
      :m="m"
      :form-key="formKey"
      label-width="130px"
      class="fit"
      margin="0"
    />

  </fit>
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
