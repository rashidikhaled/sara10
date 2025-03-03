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
          <safa-datatable2
            helper="firstCategoryUser"
            title="کاربری های دسته اول"
            v-model="value.Base_Using_Revisit"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            :bordered="false"

          />  <!-- تاریخ ندارد  -->
          <!-- <q-separator /> -->
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <!-- <q-separator /> -->
          <safa-datatable2
            helper="secondCategoryUser"
            title="کاربری های دسته دوم"
            v-model="value.Base_Using_Other"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            :bordered="false"
          /> <!-- تاریخ ندارد  -->

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
