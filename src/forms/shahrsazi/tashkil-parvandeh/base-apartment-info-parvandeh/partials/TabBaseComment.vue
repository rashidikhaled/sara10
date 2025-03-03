<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitterModel"
      vertical
      class="fit"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseAttachment"
            :m="m"
            v-model="value.Base_Attachment"
            cdcName="Base_Attachment"
            title="ضمائم"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseResourceInfo"
            :m="m"
            v-model="value.Base_ResourceInfo"
            cdcName="Base_ResourceInfo"
            title="منبع برداشت اطلاعات"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
    <text-template
      label="توضیحات پرونده آپارتمان"
      formKey="c5d38bf1-cf9c-4de6-abeb-e059c6d7c3a3"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Comments"
      class="q-mt-sm"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabBaseComment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitterModel: 50
    }
  }
}
</script>
