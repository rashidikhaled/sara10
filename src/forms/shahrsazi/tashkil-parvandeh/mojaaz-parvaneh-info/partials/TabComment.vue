<template>
  <fit>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-x-sm">
        <div class="col-12 col-md-6">
          <safa-datatable
            title="طرح و کاربری مصوب"
            helper="basePlanMosavab"
            v-model="value.Base_PlanMosavab"
            max-height="200px"
            :m="m"
            paginate
          />
        </div>
        <div class="col-12 col-md-6">
          <safa-datatable
            title="طرح و کاربری مجاز"
            helper="basePlanMojaz"
            :m="m"
            v-model="value.Base_PlanMojaz"
            max-height="200px"
            paginate
          />
        </div>
      </div>
    </div>
    <fit>
    <safa-datatable
      helper="baseAttachment"
      title="ضمائم"
      :m="m"
      v-model="value.Base_Attachment"
      height="100%"
      max-height="100%"
      class="q-mb-sm"
    />
</fit>
<div class="q-mt-sm">
    <text-template
      label="توضیحات مجاز پروانه"
      identifier="88527ca1-05d9-482a-a35d-2a0c96193207"
      formKey="8d644cb7-aa55-4dff-9003-0fd08276746e"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
    />
  </div>
  </fit>
</template>

<script>
export default {
  name: "TabComment",

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
