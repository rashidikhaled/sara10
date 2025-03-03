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
      identifier="c986d816-4e4e-46fb-a183-6303352c1341"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      :rows="5"
      type="textarea"
      formKey="89afdf7f-acec-46a7-b306-6775fc7b991e"
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
