<template>
  <fit>
    <safa-datatable
      helper="notAuthorizedStatusFront"
      title="فاقد وضعیت مجاز"
      v-model="value.Contrast_BuildingFront_Revisit"
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
          <q-separator/>
          <safa-datatable
            helper="unusedLicenseFront"
            v-model="value.Contrast_BuildingFront_Other"
            title="مجازهای استفاده نشده"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            :bordered="false"
          />
          <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator/>
          <safa-datatable

            helper="constractFront"
            v-model="value.Contrast_BuildingFront_Contrast"
            title="مغایرت"
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
    value: Object, m: String
  }
}
</script>
