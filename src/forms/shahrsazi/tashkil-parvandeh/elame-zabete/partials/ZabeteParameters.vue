<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.ZabetehParameters"
            cdcName="ZabetehParameters"
            helper="zavabetParamter"
            title="پارامترها"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            m="e"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Zabeteh_LogMethod"
            cdcName="Zabeteh_LogMethod"
            helper="zavabetEvent"
            title="وقایع نگار"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      splitterModel: 50
    }
  },
  props: { value: Object, m: String }
}
</script>
