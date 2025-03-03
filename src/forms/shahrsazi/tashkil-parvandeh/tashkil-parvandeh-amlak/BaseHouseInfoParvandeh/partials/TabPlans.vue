<template>
  <fit>

    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="verticalSplitter"
          vertical
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="طرح و کاربری مصوب"
                fit
                height="100%"
                max-height="100%"
                min-height="150px"
                helper="basePlanMosavab"
                :m="m"
                v-model="value.Base_PlanMosavab"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="طرح و کاربری مجاز"
                fit
                height="100%"
                max-height="100%"
                min-height="150px"
                helper="basePlanMojaz"
                :m="m"
                v-model="value.Base_PlanMojaz"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitter"
          vertical
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="ضمائم"
                fit
                height="100%"
                max-height="100%"
                min-height="150px"
                helper="baseAttachment"
                :m="m"
                v-model="value.Base_Attachment"
              />
            </fit>
          </template>
          <template v-slot:after>
            <text-template
              label="توضیحات پرونده عرصه "
              identifier="dcd0de7f-d8e9-460f-999d-369603cd6db3"
              :m="m"
              v-model="value.Base_CommonEstate.Comments"
              formKey="c7666263-6203-46f9-b99f-691e4ecb462d"
            />
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
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
  },
  data () {
    return {
      splitterModel: 50,
      verticalSplitter: 50
    }
  }
}
</script>
