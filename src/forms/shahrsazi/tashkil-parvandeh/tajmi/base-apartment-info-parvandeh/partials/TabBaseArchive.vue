<template>
  <section>
    <safa-datatable
      helper="baseShahrsaziArchive"
      :m="m"
      v-model="value.Base_ShahrsaziArchive"
      :allowCopy="true"
      :copyWithCount="true"
      :selectable="true"
      :allowMultipleSelection="false"
      title="سوابق شهرسازی"
      max-height="200px"
    />

    <safa-datatable
      helper="baseShahrsaziArchiveHouse"
      :m="m"
      v-model="value.Base_ShahrsaziArchiveHouse"
      :allowCopy="true"
      :copyWithCount="true"
      :selectable="true"
      :allowMultipleSelection="false"
      title="سوابق شهرسازی ملک"
      class="q-my-sm"
      max-height="200px"
    />

    <safa-datatable
      helper="baseCommissionHistory"
      :m="m"
      v-model="value.Base_CommissionHistory"
      title="سوابق کمیسیون ها"
      max-height="200px"
    />

    <safa-datatable
      helper="baseCommission77History"
      :m="m"
      v-model="value.Base_Commission77History"
      title="سوابق کمیسیون 77"
      class="q-my-sm"
      :margin="null"
      max-height="200px"
    />

    <safa-datatable
      helper="baseDig"
      :m="m"
      v-model="value.Base_Dig"
      title="سوابق حفاری"
      max-height="200px"
      class="q-mb-sm"
    />
  </section>
</template>

<script>
export default {
  name: 'TabBaseArchive',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
