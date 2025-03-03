<template>
  <fit>
    <FormRow :lg="1" :md="1" :sm="1" :xl="1" class="q-mb-sm">
      <FormControl>
        <safa-checkbox
          v-model="value.showPopupDuty"
          :m="m"
          cdcName="showPopupDuty"
          label="نشان دادن عوارض نوسازی موردی در پنجره جدید"
        ></safa-checkbox>
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.showPopupCollectiveDuty"
          :m="m"
          cdcName="showPopupCollectiveDuty"
          label="نشان دادن عوارض نوسازی جمعی در پنجره جدید"
        >
        </safa-checkbox>
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  name: 'UUserProfile',

  props: {
    value: Object,
    isEditable: Boolean,
    m: String
  }
}
</script>
