<template>
<section>
  <form-wrapper :title="title">
    <section>
<!--      <safa-status-->
<!--        :result="requestResult"-->
<!--      />-->

      <safa-tabs
        v-model="activeTab"
        height="calc(100vh - 240px)"
      >
        <template v-slot:tabs>
          <tab-menu name="address" label="آدرس" />
         <tab-menu name="registerdPelak" label="مشخصات سند و پلاک ثبتی" />
         <tab-menu name="arbae" label="مالکین و جهات اربعه" />
         <tab-menu name="technicalSpecific" label="مشخصات فنی" />
         <tab-menu name="otherSpecific" label="سایر مشخصات" />
         <tab-menu name="other" label="سایر" />
         <tab-menu name="savabeghVaEshterakat" label="سوابق و اشتراکات" />
         <tab-menu name="kroki" label="کروکی" />
         <tab-menu name="tafsil" label="طرح تفصیلی و توضیحات" />
        </template>

          <tab-content name="address" title="آدرس">
            <UAddressTab/>
          </tab-content>

          <tab-content name="registerdPelak" title="مشخصات سند و پلاک ثبتی">
            <URegisterdPelakTab/>
          </tab-content>

          <tab-content name="arbae" title="مالکین و جهات اربعه">
            <UArbaeTab/>
          </tab-content>

          <tab-content name="technicalSpecific" title="مشخصات فنی">
            <UTechnicalSpecificTab/>
          </tab-content>

          <tab-content name="otherSpecific" title="سایر مشخصات">
            <UOtherSpecificTab/>
          </tab-content>

          <tab-content name="other" title="سایر">
            <UOtherTab/>
          </tab-content>

          <tab-content name="savabeghVaEshterakat" title="سوابق و اشتراکات">
            <USavabeghVaEshterakatTab/>
          </tab-content>

          <tab-content name="kroki" title="کروکی">
            <UKrokiTab/>
          </tab-content>

          <tab-content name="tafsil" title="طرح تفصیلی و توضیحات">
            <UTafsilTab/>
          </tab-content>
      </safa-tabs>
    </section>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <q-btn
            class="btn-default"
            label="گزارش"
          />
        </template>
      </FormActions>
    </template>
  </form-wrapper>
</section>
</template>

<script>
import UAddressTab from './partials/UAddressTab'
import URegisterdPelakTab from './partials/URegisterdPelakTab'
import UArbaeTab from './partials/UArbaeTab'
import UTechnicalSpecificTab from './partials/UTechnicalSpecificTab'
import UOtherSpecificTab from './partials/UOtherSpecificTab'
import UOtherTab from './partials/UOtherTab'
import USavabeghVaEshterakatTab from './partials/USavabeghVaEshterakatTab'
import UKrokiTab from './partials/UKrokiTab'
import UTafsilTab from './partials/UTafsilTab'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  components: { UTafsilTab, UKrokiTab, USavabeghVaEshterakatTab, UOtherTab, UOtherSpecificTab, UTechnicalSpecificTab, UArbaeTab, URegisterdPelakTab, UAddressTab },
  mixins: [baseFormMixin],
  route: '/work-flow/parvandeh-amlak',
  data () {
    return {
      activeTab: '',
      name: 'UParvandehAmlak',
      title: 'پرونده املاک'
    }
  }
}
</script>

<style scoped>

</style>
