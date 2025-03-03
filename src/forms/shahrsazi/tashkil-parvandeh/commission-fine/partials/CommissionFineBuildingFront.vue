<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="firstCategoryFront"
            title="پیش آمدگی های دسته اول"
            v-model="value.Base_Front_Revisit"
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
            helper="secondCategoryFront"
            title="پیش آمدگی های دسته دوم"
            v-model="value.Base_Front_Other"
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
      items: [],
      splitterModel: 50
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
