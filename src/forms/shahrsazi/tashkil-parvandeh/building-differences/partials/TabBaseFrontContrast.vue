<template>
  <fit>
    <safa-datatable
      helper="frontRevisitColumns"
      v-model="value.Contrast_BuildingFront_Revisit"
      title="فاقد وضعیت مجاز"
      margin="0"
      height="150px"
      :bordered="false"
    />
    <q-separator class="q-mb-sm" />
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="frontOtherColumns"
            v-model="value.Contrast_BuildingFront_Other"
            title="مجازهای استفاده نشده"
            class="fit"
            margin="0"
            height="100%"
            min-height="100%"
            :bordered="false"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable
            helper="frontContColumns"
            v-model="value.Contrast_BuildingFront_Contrast"
            title="مغایرت"
            class="fit"
            margin="0"
            height="100%"
            min-height="100%"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseFrontContrast',
  props: {
    value: Object
  },

  data () {
    return {
      gridSplitter: 50,
      eFrontRevisit: true,
      eFrontOther: true,
      eFrontCont: true
    }
  }
}
</script>
