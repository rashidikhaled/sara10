<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
        margin="0"
      >
        <safa-custom-text
          v-model="DocArea"
          :m="m"
          cdcName="DocArea"
          label="مساحت طبق سند"
          label-width="130px"
          type="decimal"
        />
        <safa-custom-text
          v-model="CurrentArea"
          :m="m"
          cdcName="CurrentArea"
          label="مساحت وضع موجود"
          label-width="130px"
          type="decimal"
        />
        <safa-custom-text
          v-model="areaAfterEdit"
          :m="m"
          cdcName="areaAfterEdit"
          label="مساحت پس از رعایت بر اصلاحی"
          label-width="170px"
          type="decimal"
        />
        <safa-custom-text
          v-model="remainArea"
          :m="m"
          cdcName="remainArea"
          label="مساحت باقیمانده"
          label-width="130px"
          type="decimal"
        />
        <safa-text
          v-model="mizan"
          cdcName="mizan"
          label="میزان در مسیر"
          label-width="130px"
        />
      </safa-group>
    </internal-section>
    <text-template
      v-model="comments"
      :formKey="formKey"
      :m="m"
      cdcName="comments"
      class="fit"
      label="نظرات برو کف"
      label-width="130px"
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
