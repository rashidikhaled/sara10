<template>
  <fit>
    <div class="fit">
      <div class="row col-12 q-col-gutter-x-sm full-height">
        <div
          class="col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_Attachment"
              :m="m"
              fit
              height="100%"
              helper="baseAttachment"
              max-height="100%"
              min-height="150px"
              title="ضمائم"
            />
          </fit>
        </div>
        <div
          class="col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_ResourceInfo"
              :m="m"
              fit
              height="100%"
              helper="baseResourceInfo"
              max-height="100%"
              min-height="150px"
              title="منبع برداشت اطلاعات"
            />
          </fit>
        </div>
      </div>
    </div>
    <text-template
      v-model="value.Base_CommonEstate.Comments"
      :fit="false"
      :m="m"
      class="q-mt-sm"
      formKey="f2a0b472-046f-4f40-a6f3-2d7ce66edd52"
      identifier="c5d38bf1-cf9c-4de6-abeb-e059c6d7c3a3"
      label="توضیحات پرونده آپارتمان"
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
  }
}
</script>
