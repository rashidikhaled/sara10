<template>
  <safa-splitter
    v-model="splitterModel"
    horizontal
  >
    <template v-slot:before>
      <fit>
        <safa-datatable
          title="پیشامدگی های تشکیل پرونده"
          :columns="columns"
          v-model="value.data.Base_Front_Revisit"
          fit
          height="100%"
          :bordered="false"
        />
        <q-separator />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <q-separator />
        <safa-datatable
          title="پیشامدگی های ممیزی"
          :columns="columns"
          v-model="value.data.Base_Front_Other"
          fit
          height="100%"
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
    value: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCodeAudit: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      splitterModel: 50,
      columns: [
        { field: 'BuildingNo', title: 'شماره ساختمان' },
        { field: 'FloorNo', title: 'طبقه' },
        { field: 'CI_UsingGroup', title: 'کاربری اصلی', cell: 'grid-combo' },
        { field: 'CI_UsingType', title: 'کاربری فرعی', cell: 'grid-combo' },
        { field: 'CI_FrontType', title: 'نوع پیش آمدگی', cell: 'grid-combo' },
        { field: 'FrontArea', title: 'مساحت پیش آمدگی' },
        { field: 'FrontWidth', title: 'عمق/عرض' },
        { field: 'FrontHeight', title: 'ارتفاع/ طول' }
      ]
    }
  }
}
</script>
