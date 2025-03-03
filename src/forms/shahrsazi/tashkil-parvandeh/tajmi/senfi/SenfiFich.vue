<template>
  <fit>
    <safa-checkbox
      label="عدم نمایش فیش های باطله"
      v-model="loadCancelFiches"
      cdcName="loadCancelFiches"
      class="q-mb-sm"
    />
    <safa-splitter v-model="splitterModel">
      <template v-slot:before>
        <safa-datatable
          helper="senfiFich1"
          v-model="results"
          title="لیست فیش ها"
          cdcName="dutyFicheList"
        />
      </template>
      <template v-slot:after>
        <safa-datatable
          helper="senfiFich2"
          v-model="results"
          title="جزئیات فیش ها"
          cdcName="dutyFicheDetail"
        />
      </template>
    </safa-splitter>
    <div class="q-gutter-sm q-mt-sm">
      <btn-default label="تأیید" />
      <btn-default label=" تأیید با پوز" />
      <btn-default label="تاریخچه ی پوز" />
      <btn-default label="تأیید لحظه ای بانک شهر" />
      <btn-default label="تأیید لحظه ای بانک شهر 2" />
      <btn-default label="تأیید لحظه ای بانک"  />
      <btn-default label="قطعیت صدور" />
      <btn-cancel label="ابطال" />
      <btn-cancel label="استرداد" />
    </div>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      loadCancelFiches: true,
      splitterModel: 50
    }
  },
  props: {
    results: Array,
    default: () => []
  }
}
</script>
