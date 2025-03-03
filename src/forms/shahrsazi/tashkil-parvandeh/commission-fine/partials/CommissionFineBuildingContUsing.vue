<template>
  <fit>
    <safa-datatable
      helper="notAuthorizedStatus"
      title="فاقد وضعیت مجاز"
      v-model="value.Contrast_BuildingUsing_Revisit"
      height="140px"
      :bordered="false"
    />
    <q-separator class="q-mb-sm" />
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <q-separator />
          <safa-datatable
            helper="unusedLicense"
            title="مجازهای استفاده نشده"
            v-model="value.Contrast_BuildingUsing_Other"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            :bordered="false"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable
            helper="constract"
            title="مغایرت"
            v-model="value.Contrast_BuildingUsing_Contrast"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            :bordered="false"
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
      splitterModel: 50
    }
  },

  props: {
    value: Object,
    m: String
  }
}
</script>
