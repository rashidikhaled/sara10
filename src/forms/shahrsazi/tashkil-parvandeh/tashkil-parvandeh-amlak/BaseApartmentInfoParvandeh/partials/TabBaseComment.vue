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
              title="ضمائم"
              helper="baseAttachment"
              :m="m"
              v-model="value.Base_Attachment"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div
          class="col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="منبع برداشت اطلاعات"
              helper="baseResourceInfo"
              :m="m"
              v-model="value.Base_ResourceInfo"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
      </div>
    </div>
    <text-template
      class="q-mt-sm"
      label="توضیحات پرونده آپارتمان"
      identifier="c5d38bf1-cf9c-4de6-abeb-e059c6d7c3a3"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      :fit="false"
      formKey="f2a0b472-046f-4f40-a6f3-2d7ce66edd52"
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
