<template>
  <fit>
    <safa-datatable
      helper="baseAttachment"
      title="ضمائم"
      :m="m"
      v-model="value.Base_Attachment"
      height="200px"
      class="q-mb-sm"
    />

    <text-template
      label="توضیحات مجاز پروانه"
      identifier="88527ca1-05d9-482a-a35d-2a0c96193207"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      formKey="114af9ef-aad2-4ad6-8123-abaf457452c2"
    />

  </fit>
</template>

<script>
export default {
  name: 'TabComment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
