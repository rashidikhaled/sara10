<template>
  <fit>
    <q-splitter v-model="verticalSplitter" vertical class="fit" margin="0">
      <template v-slot:before>
        <fit className="q-pr-sm">
          <safa-datatable
            title="طرح و کاربری مصوب"
            helper="basePlanMosavab"
            :m="m"
            v-model="value.Base_PlanMosavab"
            cdcName="Base_PlanMosavab"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit className="q-pl-sm">
          <safa-datatable
            title="طرح و کاربری مجاز"
            helper="basePlanMojaz"
            :m="m"
            v-model="value.Base_PlanMojaz"
            cdcName="Base_PlanMojaz"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </q-splitter>
    <div class="fit q-mt-sm">
      <div class="row q-col-gutter-x-md full-height">
        <div class="col-12 col-md-6">
          <fit>
            <safa-datatable
              title="ضمائم"
              helper="baseAttachment"
              :m="m"
              v-model="value.Base_Attachment"
              cdcName="Base_Attachment"
              fit
              height="100%"
              max-height="100%"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6">
          <fit>
            <text-template
              label="توضیحات پرونده عرصه "
              formKey="dcd0de7f-d8e9-460f-999d-369603cd6db3"
              :m="m"
              v-model="value.Base_CommonEstate.Comments"
              cdcName="Comments"
              class="fit"
              height="100%"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: "TabPlans",
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitter: 50
    }
  }
}
</script>
