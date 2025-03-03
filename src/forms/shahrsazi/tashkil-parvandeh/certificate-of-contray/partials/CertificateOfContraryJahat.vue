<template>
  <fit>
    <FormRow class="q-mb-sm">
        <FormControl>
        <safa-combo
        label="اطلاعات دبیرخانه"
          label-width="100px"
          :label-shrink="false"
          source-type="local"
          :options="cboSecOptions"
          :value="selectedSec"
          @input="$emit('selectedSecChange', selectedSec)"
          cdcName="selectedSec"
          :m="m"
        />
        </FormControl>
        <FormControl>
        <safa-text
          label=" شماره عدم خلاف"
          label-width="100px"
          v-model="results.Sh_MissFoul.CertificateNo"
          :m="m"

        />
        </FormControl>
        <FormControl>
        <safa-text
          label-width="100px"
          label="شماره سریال عدم خلاف "
          v-model="results.Sh_MissFoul.SerialNo"
          :m="m"

        />
      </FormControl>
    <FormControl>
        <safa-datepicker
          locale="fa"
          label="تاریخ عدم خلاف"
          label-width="100px"
          v-model="results.Sh_MissFoul.CertificateDate"
          :m="m"

        />
        </FormControl>
        </FormRow>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      horizontal
      margin="0"
      style="min-height:180px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="results.Base_ShahrsaziArchive"
            ref="grid2"
            helper="CertificateOfContraryJahat"
            title="لیست آخرین مجوزهای اخذ شده"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            v-model="results.Base_Edge"
            ref="grid2"
            helper="CertificateOfContraryJahat2"
            title="جهات اربعه"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      splitterValue: 50,
      selectedSec: 0
    }
  },
  props: {
    value: Object,
    cboSecOptions: Array,
    results: Object,
    m: String
  }
}
</script>
