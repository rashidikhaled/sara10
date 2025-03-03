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
        title="ضمائم"
        helper="baseAttachment"
        :m="m"
        v-model="value.Base_Attachment"
        fit
        height="100%"
        max-height="100%"
      />
    </fit>
    <div class="q-mt-sm">
      <text-template
        label="توضیحات پایانکار "
        identifier="dcd0de7f-d8e9-460f-999d-369603cd6db3"
        formKey="d2895e99-1e31-42bc-b7c1-39d4a8e7e6f4"
        :m="m"
        v-model="value.Base_CommonEstate.Comments"
      />
    </div>
  </fit>
</template>
<script>
export default {
  name: 'TabPlans',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
