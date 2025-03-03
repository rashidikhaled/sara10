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
          v-model="horizontalModel"
          horizontal
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <safa-splitter
              v-model="verticalsplitter"
              vertical
              class="fit"
              margin="0"
            >
              <template v-slot:before>
                <fit>
                  <safa-datatable
                    title="طرح و کاربری مصوب"
                    helper="basePlanMosavab"
                    :m="m"
                    v-model="value.Base_PlanMosavab"
                    fit
                    height="100%"
                    min-height="150px"
                    max-height="100%"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-datatable
                    :m="m"
                    title="طرح و کاربری مجاز"
                    helper="basePlanMojaz"
                    v-model="value.Base_PlanMojaz"
                    fit
                    height="100%"
                    min-height="150px"
                    max-height="100%"
                  />
                </fit>
              </template>
            </safa-splitter>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="ضمائم"
                helper="baseAttachment"
                :m="m"
                v-model="value.Base_Attachment"
                fit
                height="100%"
                min-height="150px"
                max-height="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <fit>
          <text-template
            label="توضیحات پرونده عرصه "
            formKey="dcd0de7f-d8e9-460f-999d-369603cd6db3"
            :m="m"
            v-model="value.Base_CommonEstate.Comments"
          />
        </fit>

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
      splitterModel: 70,
      verticalsplitter: 50,
      horizontalModel: 50
    }
  }
}
</script>
