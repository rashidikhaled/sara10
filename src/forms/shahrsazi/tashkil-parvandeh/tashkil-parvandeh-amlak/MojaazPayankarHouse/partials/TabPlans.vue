<template>
  <fit>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <safa-datatable
            title="طرح و کاربری مصوب"
            helper="basePlanMosavab"
            v-model="value.Base_PlanMosavab"
            min-height="200px"
            :m="m"
          />
        </div>
        <div class="col-12 col-md-6">
          <safa-datatable
            title="طرح و کاربری مجاز"
            helper="basePlanMojaz"
            :m="m"
            v-model="value.Base_PlanMojaz"
            min-height="200px"
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
        :m="m"
        v-model="value.Base_CommonEstate.Comments"
        formKey="653252f2-d9f4-420b-9b4b-0657d45767a0"
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
