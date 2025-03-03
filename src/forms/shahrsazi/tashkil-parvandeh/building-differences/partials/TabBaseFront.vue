<template>
  <safa-splitter
    v-model="gridSplitter"
    class="fit"
    horizontal
    margin="0"
  >
    <template v-slot:before>
      <fit>
        <safa-datatable
          helper="firstCategoryFront"
         v-model="value.Base_Front_Revisit"
          title="پیشامدگی های دسته اول"
          class="fit"
          margin="0"
          height="100%"
          min-height="100px"
          :bordered="false"
        />
        <q-separator/>
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <q-separator/>
        <safa-datatable
          helper="secondCategoryFront"
         v-model="value.Base_Front_Other"
          title="پیشامدگی های دسته دوم"
          class="fit"
          margin="0"
          height="100%"
          min-height="100px"
          :bordered="false"
        />
      </fit>
    </template>
  </safa-splitter>
</template>

<script>
export default {
  name: 'TabBaseFront',
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
