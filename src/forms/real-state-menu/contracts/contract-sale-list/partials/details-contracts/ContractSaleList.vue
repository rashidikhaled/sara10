<template>
  <fit>
    <FormRow class="q-mb-sm" xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره صلح نامه فروش"
          v-model="value.ContractSale_Info.ContractSaleNo"
          cdcName="ContractSaleNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صلح نامه فروش"
          v-model="value.ContractSale_Info.ContractSaleDate"
          cdcName="ContractSaleDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center q-gutter-sm">
        <safa-checkbox
          label="تایید نهایی شده"
          v-model="rbIsConfirm"
          cdcName="rbIsConfirm"
          label-width="110px"
          m="r"
        />
        <safa-checkbox
          label="درج در آرشیو شده"
          v-model="value.ContractSale_Info.IsArchived"
          cdcName="rbIsArchived"
          label-width="110px"
          m="r"
        />
      </FormControl>
      <FormControl class="col-12">
        <safa-combo
          label="موضوع صلح نامه فروش"
          v-model="value.ContractSale_Info.CI_ContractSaleSubject"
          ciName="CI_ContractSaleSubject"
          domainName="Estate"
          cdcName="CI_ContractSaleSubject"
          label-width="110px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره دستور شهردار"
          v-model="value.ContractSale_Info.MayorOrderNo"
          cdcName="MayorOrderNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دستور شهردار"
          v-model="value.ContractSale_Info.MayorOrderDate"
          cdcName="MayorOrderDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مبلغ کل(ریال)"
          v-model="value.Total_Price"
          cdcName="Total_Price"
          label-width="110px"
          :m="'r'"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره مصوبه شورا"
          v-model="value.ContractSale_Info.CouncilApprovedNo"
          cdcName="CouncilApprovedNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ مصوبه شورا"
          v-model="value.ContractSale_Info.CouncilApprovedDate"
          cdcName="CouncilApprovedDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع مالکیت فروش"
          v-model="value.ContractSale_Info.CI_OwnerSaleType"
          ciName="CI_OwnerSaleType"
          domainName="Estate"
          cdcName="CI_OwnerSaleType"
          label-width="110px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره ابلاغ قرارداد"
          v-model="value.ContractSale_Info.NoticeNo"
          cdcName="NoticeNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ابلاغ قرارداد"
          v-model="value.ContractSale_Info.NoticeDate"
          cdcName="NoticeDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نحوه فروش"
          v-model="value.ContractSale_Info.CI_SaleKind"
          ciName="CI_SaleKind"
          domainName="Estate"
          cdcName="CI_SaleKind"
          label-width="110px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="Description" label="توضیحات" />
        <tab-menu
          name="CancleDetailsPeaceAgreement"
          label="اطلاعات فسخ صلح نامه"
        />
      </template>
      <tab-content name="Description">
        <Description v-model="value" :m="m" />
      </tab-content>
      <tab-content name="CancleDetailsPeaceAgreement">
        <CancleDetailsPeaceAgreement v-model="value" :m="m" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import Description from "./partials/Description.vue"
import CancleDetailsPeaceAgreement from "./partials/CancleDetailsPeaceAgreement.vue"

export default {
  props: {
    value: { type: Object, default: () => {} },
    rbIsConfirm: { type: Boolean },
    m: { type: String }
  },
  components: {
    Description,
    CancleDetailsPeaceAgreement
  },

  data () {
    return {
      name: "ContractSaleList",
      activeTab: "Description",
      CancleDetailsPeaceAgreementModel: {},
      Description: {}
    }
  }
}
</script>
