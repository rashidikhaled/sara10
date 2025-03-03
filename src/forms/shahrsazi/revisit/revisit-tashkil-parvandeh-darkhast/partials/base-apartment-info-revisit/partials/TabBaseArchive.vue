<template>
  <fit>
    <internal-section
      class="q-mt-sm"
      title="صورتجلسه تفکیک"
    >
      <div class="row q-col-gutter-md">

        <safa-text
          v-model="value.Base_CommonEstate.TafkikNo"
          :m="m"
          class="col-12 col-sm-6"
          label="شماره صورتجلسه تفکیک"
          labelWidth="150px"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.TafkikDate"
          :m="m"
          class="col-12 col-sm-6"
          label="تاریخ صورتجلسه تفکیک"
          labelWidth="150px"
        />
      </div>
    </internal-section>
    <safa-datatable
      v-model="value.Base_ShahrsaziArchive"
      :m="m"
      helper="bazdidApartmentArchive"
      max-height="200px"
      min-height="130px"
      title="سوابق شهرسازی"
    />

    <safa-datatable
      v-model="value.Base_ShahrsaziArchiveHouse"
      :m="m"
      class="q-my-sm"
      helper="baseShahrsaziArchiveHouse"
      max-height="200px"
      min-height="130px"
      title="سوابق شهرسازی ملک"
    />

    <safa-datatable
      v-model="value.Base_CommissionHistory"
      :m="m"
      class="q-mb-sm"
      helper="baseCommissionHistory"
      max-height="200px"
      min-height="130px"
      title="سوابق کمیسیونها"
    />
    <text-template
      v-model="value.Base_CommonEstate.TafkikComments"
      :m="m"
      formKey="60121967-793b-4977-98f5-d6adf9f6d92a"
      identifier="78e2a76e-e3bc-46f5-8044-6a132e57c2a6"
      label="توضیحات صورتجلسه تفکیک"
    />

  </fit>
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
