<template>
  <fit>
    <div class="row q-mb-md q-col-gutter-sm">
      <safa-combo class="col-12 col-sm-4 col-md-3" label="اطلاعات دبیرخانه " :m="m" label-width="100px"
        :value="selectedSec" source-type="local" :options="cboSecOptions"></safa-combo>

      <safa-datepicker locale="fa" label="تاریخ اعتبار پروانه" class="col-12 col-sm-4 col-md-3"
        v-model="results.Sh_ExportParvaneh.CreditDate" :m="m" label-width="100px"></safa-datepicker>

      <safa-combo ciName="CI_Criterion" domainName="CI_SaraM1" label=" موقعیت زمین"
        v-model="results.Base_HouseInfo.CI_GeoStatus" class="col-12 col-sm-4 col-md-3" m="r"
        label-width="100px"></safa-combo>

      <safa-text label=" شماره پروانه " v-model="results.Sh_ExportParvaneh.CertificateNo"
        class="col-12 col-sm-4 col-md-3" :m="m" label-width="100px"></safa-text>

      <safa-custom-text type="decimal" class="col-12 col-sm-4 col-md-3" label="مساحت طبق سند"
        v-model="results.Base_HouseInfo.DocArea" m="r" label-width="100px"></safa-custom-text>

      <safa-text class="col-12 col-sm-4 col-md-3" label=" شماره بیمه نامه"
        v-model="results.Sh_ExportParvaneh.BimeNamehNo" :m="m" label-width="100px"></safa-text>

      <safa-text label="شماره سریال پروانه " v-model="results.Sh_ExportParvaneh.SerialNo"
        class="col-12 col-sm-4 col-md-3" :m="m" label-width="100px"></safa-text>

      <safa-custom-text type="decimal" class="col-12 col-sm-4 col-md-3" label=" مساحت وضع موجود"
        v-model="results.Base_HouseInfo.CurrentArea" m="r" label-width="100px"></safa-custom-text>

      <safa-datepicker locale="fa" label="تاریخ اعتبار بیمه نامه" class="col-12 col-sm-4 col-md-3"
        v-model="results.Sh_ExportParvaneh.BimeNamehDate" :m="m" label-width="100px"></safa-datepicker>

      <safa-datepicker locale="fa" label="تاریخ پروانه" class="col-12 col-sm-4 col-md-3"
        v-model="results.Sh_ExportParvaneh.CertificateDate" :m="m" label-width="100px"></safa-datepicker>

      <safa-custom-text type="decimal" class="col-12 col-sm-4 col-md-3" label="مساحت پس از رعایت بر اصلاحی"
        v-model="results.Base_HouseInfo.AreaAfterEdit" m="r" label-width="100px"></safa-custom-text>

      <safa-text class="col-12 col-sm-4 col-md-3" label=" تعهد نما" v-model="results.Base_CommonEstate.ViewCommitment"
        :m="m" label-width="100px"></safa-text>

      <safa-datepicker locale="fa" label="تاریخ تعهد نما" class="col-12 col-sm-4 col-md-3"
        v-model="results.Base_CommonEstate.ViewCommitmentDate" :m="m" label-width="100px"></safa-datepicker>

    </div>
    <fit>
      <!-- <internal-section> -->
      <safa-grid fit height="100%" max-height="100%" min-height="100%" title=" جهات اربعه" v-model="results.Base_Edge"
        ref="grid2" helper="parvanehSpecification" m="r" :addRow="false" :allowCopy="false" :deleteRow="false" />
      <!-- </internal-section> -->
    </fit>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      selectedSec: 0
    }
  },
  props: {
    value: Object,
    cboSecOptions: Array,
    results: Object,
    requestSecObj: Object,
    m: String
  }
}
</script>
