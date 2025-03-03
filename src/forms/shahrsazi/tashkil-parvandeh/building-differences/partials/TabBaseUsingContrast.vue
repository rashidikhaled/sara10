<template>
  <fit>
    <safa-datatable
      helper="eUsingRevisitColumns"
      v-model="value.Contrast_BuildingUsing_Revisit"
      title="فاقد وضعیت مجاز"
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
            helper="eUsingOtherColumns"
            v-model="value.Contrast_BuildingUsing_Other"
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
            helper="eUsingContColumns"
            v-model="value.Contrast_BuildingUsing_Contrast"
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
  name: 'TabBaseUsingContrast',
  props: {
    value: Object
  },

  data () {
    return {
      gridSplitter: 50,
      eUsingRevisit: true,
      eUsingOther: true,
      eUsingCont: true

    }
  }
}
</script>
