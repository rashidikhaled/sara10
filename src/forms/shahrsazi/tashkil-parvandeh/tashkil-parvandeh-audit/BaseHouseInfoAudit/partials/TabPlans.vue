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
                    title="طرح و کاربری مجاز "
                    helper="basePlanMojaz"
                    :m="m"
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
            identifier="3dd82f4f-f3b7-4f3a-bee2-f52f175ebea6"
            label="توضیحات ممیزی عرصه"
            :m="m"
            v-model="value.Base_CommonEstate.Comments"
            formKey="76aaa267-ea32-4623-b52a-655dc1a99ed4"
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
