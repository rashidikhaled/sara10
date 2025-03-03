<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitterModel"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg? '600px' : '200px'"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="verticalSplitterModel"
          :horizontal="$q.screen.lt.lg"
          margin="0"
          class="fit"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="توافقات واگذاری خدمات"
                v-model="formModel.Sh_AgreementLetter"
                cdcName="Sh_AgreementLetter"
                helper="shahrsazi.tavafoghatInAgreement"
                :m="m"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="طرح و کاربری ملاک عمل"
                v-model="formModel.Base_PlanForWork"
                cdcName="Base_PlanForWork"
                helper="shahrsazi.melakeAmalInAgreement"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
                :m="m"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitterModel"
          :horizontal="$q.screen.lt.lg"
          margin="0"
          class="fit"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="طرح و کاربری مصوب"
                v-model="formModel.Base_PlanMosavab"
                cdcName="Base_PlanMosavab"
                helper="shahrsazi.tarhVaKarbariInAgreement"
                :hideHeader="true"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="طرح و کاربری مجاز"
                v-model="formModel.Base_PlanMojaz"
                cdcName="Base_PlanMojaz"
                helper="shahrsazi.mojazInAgreement"
                :hideHeader="true"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>

</template>

<script>
export default {
  data () {
    return {
      horizontalSplitterModel: 50,
      verticalSplitterModel: 50
    }
  },
  props: {
    formModel: {
      type: Object,
      default () {
        return {}
      }
    },
    m: {
      type: String,
      default: 'e'
    }
  }
}
</script>

<style lang="scss" scoped></style>
