<!-- تغییرات ظاهری به درخواست شیراز و با تایید آقای حیدری اعمال شد -->
<template>
  <fit>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-text
          label=" مساحت طبق سند  "
          v-model="results.Base_HouseInfo.DocArea"
          label-width="100px"
          m="r"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="مرجع صدور سند  "
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          label-width="100px"
          v-model="results.Base_CommonEstate.CI_DocRefrence"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع مالکیت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          label-width="100px"
          v-model="results.Base_HouseInfo.CI_OwnerType"
        />
      </form-control>
    </form-row>

    <form-row class="q-mb-sm">
      <form-control>
        <safa-text
          label="مساحت وضع موجود"
          v-model="results.Base_HouseInfo.CurrentArea"
          label-width="100px"
          m="r"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ انتقال سند"
          v-model="results.Base_CommonEstate.DocTransferDate"
          label-width="100px"
        />
      </form-control>
      <form-control>
        <safa-text
          label=" نام خریدار"
          label-width="100px"
          v-model="results.Sh_RequestInfo.BuyerName"
        />
      </form-control>
    </form-row>

    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          label="  نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          label-width="100px"
          v-model="results.Base_CommonEstate.CI_DocType"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ صدور سند"
          v-model="results.Base_CommonEstate.DocExportDate"
          label-width="100px"
        />
      </form-control>
      <form-control>
        <safa-text
          label="دانگ مورد انتقال"
          v-model="results.Sh_RequestInfo.TransferDang"
          label-width="100px"
        />
      </form-control>
    </form-row>

    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          label="وضعیت سند"
          ciName="CI_DocStatus"
          domainName="CI_SaraM1"
          label-width="100px"
          v-model="results.Base_CommonEstate.CI_DocStatus"
        />
      </form-control>
      <safa-text
        label="ملاحظات سند"
        v-model="results.Base_CommonEstate.DocComments"
        class="col-6"
        label-width="100px"
        m="r"
      />
    </form-row>

    <safa-splitter v-model="gridSplitter" vartical>
      <template v-slot:before>
        <safa-grid
          helper="inquiryAnswerRegisterPlak"
          v-model="results.Base_RegisterPlack"
          ref="grid2"
          cdcName="Base_RegisterPlack"
          title="پلاک ثبتی"
          :paginate="false"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
        />
      </template>
      <template v-slot:after>
        <safa-grid
          helper="inquiryAnswerCommitment"
          v-model="results.Base_Commitment"
          ref="grid2"
          cdcName="Base_Commitment"
          title="تعهدات"
          :paginate="false"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
        />
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object
  }
}
</script>
