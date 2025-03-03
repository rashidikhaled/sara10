<template>
  <safa-splitter
    v-model="gridSplitter"
    class="fit"
    horizontal
    margin="0"
    style="min-height:250px"
  >
    <template v-slot:before>
      <fit>
        <safa-datatable2
          helper="firstCategoryUserAnalysis"
          v-model="value.Base_Using_Revisit"
          cdcName="Base_Using_Revisit"
          title="کاربری های دسته اول"
          fit
          margin="0"
          height="100%"
          max-height="100%"
          :bordered="false"
        />
        <q-separator />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <q-separator />
        <safa-datatable2
           helper="secondCategoryUser"
          v-model="value.Base_Using_Other"
          cdcName="Base_Using_Other"
          title="کاربری های دسته دوم"
          fit
          margin="0"
          height="100%"
          max-height="100%"
          :bordered="false"
        />
      </fit>
    </template>
  </safa-splitter>
</template>

<script>
export default {
  name: 'TabBaseUsing',
  props: {
    value: Object
  },

  data () {
    return {
      gridSplitter: 50
    }
  }
}
</script>
