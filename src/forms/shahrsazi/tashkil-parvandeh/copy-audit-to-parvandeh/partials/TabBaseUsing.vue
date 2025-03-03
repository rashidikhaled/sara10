<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
    >
      <template v-slot:before>
        <fit>
          <safa-datatable2
            title="کاربری های تشکیل پرونده"
            :columns="columns"
            v-model="value.data.Base_Using_Revisit"
            :bordered="false"
            fit
        height="100%"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable2
            title="کاربری های ممیزی"
            :columns="columns"
            v-model="value.data.Base_Using_Other"
            :bordered="false"
            fit
            height="100%"
          />
        </fit>
      </template>
    </safa-splitter>

  </fit>
</template>
<script>
export default {
  name: 'TabBaseUsing',
  props: {
    value: Object
  },

  data () {
    return {
      splitterModel: 50,
      columns: [
        { field: 'BuildingNo', title: 'شماره ساختمان' },
        { field: 'FloorNo', title: 'طبقه' },
        { field: 'CI_UsingGroup', title: 'کاربری اصلی', cell: 'grid-combo' },
        { field: 'CI_UsingType', title: 'کاربری فرعی', cell: 'grid-combo' },
        { field: 'CI_RoofType', title: 'نوع سقف', cell: 'grid-combo' },
        { field: 'UnitCount', title: 'تعداد واحد' },
        { field: 'UsingArea', title: 'مساحت کاربری' },
        { field: 'UsefulHeight', title: 'ارتفاع مفید' },
        { field: 'Dahaneh', title: 'دهنه' }
      ]
    }
  }
}
</script>
