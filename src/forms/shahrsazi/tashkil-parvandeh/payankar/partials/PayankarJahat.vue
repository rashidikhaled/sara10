<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="اطلاعات دبیرخانه"
          v-model="selectedItem"
          cdcName="RequestSec"
          source-type="local"
          :options="requestSecList"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label=" شماره پایانکار"
          v-model="value.Sh_ExportPayankar.CertificateNo"
          cdcName="CertificateNo"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سریال پایانکار "
          v-model="value.Sh_ExportPayankar.SerialNo"
          cdcName="SerialNo"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ پایانکار"
          v-model="value.Sh_ExportPayankar.CertificateDate"
          cdcName="CertificateDate"
          label-width="100px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="spModel" class="fit">
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="payankarJahatLastList"
            title="لیست آخرین مجوزهای اخذ شده"
            v-model="value.Base_ShahrsaziArchive"
            cdcName="Base_ShahrsaziArchive"
            min-height="300px"
            height="100%"
            max-height="100%"
            paginate
            :pageSize="20"
            fit
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="جهات اربعه"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            helper="payankarJahat"
            m="r"
            min-height="300px"
            height="100%"
            max-height="100%"
            paginate
            :pageSize="20"
            fit
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
      spModel: 50,
      selectedItem: 0,
      requestSecList: []
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
