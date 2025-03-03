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
        <safa-datatable
          helper="firstCategoryFront"
          v-model="value.Base_Front_Revisit"
          cdcName="Base_Front_Revisit"
          title="پیشامدگی های دسته اول"
          class="fit"
          margin="0"
          height="100%"
          max-height="100%"
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
          cdcName="Base_Front_Other"
          title="پیشامدگی های دسته دوم"
          class="fit"
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
  name: 'TabBaseFront',
  props: {
    value: Object
  },

  data () {
    return {
      gridSplitter: 50
      // columns: [
      //   { field: 'BuildingNo', title: 'شماره ساختمان', width: 98 },
      //   { field: 'FloorNo', title: 'طبقه', width: 70 },
      //   {
      //     field: 'CI_UsingGroup',
      //     title: 'کاربری اصلی',
      //     cell: 'grid-combo',
      //     width: 81
      //   },
      //   {
      //     field: 'CI_UsingType',
      //     title: 'کاربری فرعی',
      //     cell: 'grid-combo',
      //     width: 81
      //   },
      //   {
      //     field: 'CI_FrontType',
      //     title: 'نوع پیش آمدگی',
      //     cell: 'grid-combo',
      //     width: 96
      //   },
      //   { field: 'FrontArea', title: 'مساحت پیش آمدگی', width: 118 },
      //   { field: 'FrontWidth', title: 'عمق/عرض', width: 70 },
      //   { field: 'FrontHeight', title: 'ارتفاع/ طول', width: 'auto' }
      // ]
    }
  }
}
</script>
