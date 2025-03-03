<template>
  <fit>
    <!-- <safa-datatble
      minHeight="300px"
      title="ضمائم"
      helper="baseAttachment"
      v-model="value.Base_Attachment"
      class="q-my-lg"
    /> -->
    <text-template
      label="توضیحات مجاز پایانکار "
      formKey="89d78065-2dc9-4e0a-bb4b-63fce2cd757f"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      :rows="5"
      type="textarea"
    />
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseParkingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
