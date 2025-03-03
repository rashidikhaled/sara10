<template>
  <fit>
    <safa-group label-width="100px">
      <safa-combo
        label="اطلاعات دبیرخانه"
        :m="m"
        v-model="selectedItem"
        source-type="local"
        :options="requestSecList"
      ></safa-combo>
      <safa-text
        label="شماره سریال استعلام"
        v-model="results.Sh_InquiryResponse.SerialNo"
        :m="m"
      ></safa-text>
      <safa-text
        label="شماره پاسخ استعلام"
        v-model="results.Sh_InquiryResponse.CertificateNo"
        :m="m"
      ></safa-text>
      <safa-datepicker
        label="تاریخ پاسخ استعلام"
        v-model="results.Sh_InquiryResponse.CertificateDate"
        :m="m"
      >
      </safa-datepicker>
    </safa-group>
    <safa-datatable
      v-model="results.Base_ShahrsaziArchive"
      ref="grid2"
      helper="inquiryAnswerLicense"
      title="لیست آخرین مجوزهای اخذ شده"
      height="100%"
      max-height="100%"
      fit
      min-height="100%"
    ></safa-datatable>
  </fit>
</template>
<script>
export default {
  title: 'پاسخ استعلام',
  formKey: '5C94C341-61FC-4674-AF03-13C74E959E8D',

  data: function () {
    return {
      selectedItem: 0,
      requestSecList: []
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
