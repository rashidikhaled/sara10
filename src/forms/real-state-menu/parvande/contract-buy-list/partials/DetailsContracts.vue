<template>
  <fit>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره قرارداد"
          v-model="value.ContractBuy_Info.ContractBuyNo"
          cdcName="ContractBuyNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ قرارداد"
          v-model="value.ContractBuy_Info.ContractBuyDate"
          cdcName="ContractBuyDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <template>
          <safa-checkbox
            label="تایید نهایی شده"
            v-model="isConfirm"
            cdcName="IsConfirm"
            label-width="100px"
            class="q-ma-sm"
            m="r"
          />
        </template>
        <template class="q-ml-sm">
          <safa-checkbox
            label="درج در آرشیو شده"
            v-model="value.ContractBuy_Info.IsArchived"
            cdcName="rbIsArchived"
            label-width="100px"
            class="q-ma-sm"
            m="r"
          />
        </template>
      </FormControl>
      <FormControl class="col-12">
        <safa-combo
          label="موضوع قرارداد"
          v-model="value.ContractBuy_Info.CI_ContractBuySubject"
          ciName="CI_ContractBuySubject"
          domainName="Estate"
          cdcName="CI_ContractBuySubject"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره دستور شهردار"
          v-model="value.ContractBuy_Info.MayorOrderNo"
          cdcName="MayorOrderNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دستور شهردار"
          v-model="value.ContractBuy_Info.MayorOrderDate"
          cdcName="MayorOrderDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مبلغ کل(ریال)"
          v-model="value.Total_Price"
          cdcName="Total_Price"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره مصوبه شورا"
          v-model="value.ContractBuy_Info.CouncilApprovedNo"
          cdcName="CouncilApprovedNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ مصوبه شورا"
          v-model="value.ContractBuy_Info.CouncilApprovedDate"
          cdcName="CouncilApprovedDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره اعمال ماده45"
          v-model="value.ContractBuy_Info.ApplyingArticle45No"
          cdcName="ApplyingArticle45No"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره ابلاغ قرارداد"
          v-model="value.ContractBuy_Info.NoticeNo"
          cdcName="NoticeNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ابلاغ قرارداد"
          v-model="value.ContractBuy_Info.NoticeDate"
          cdcName="NoticeDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اعمال ماده45"
          v-model="value.ContractBuy_Info.ApplyingArticle45Date"
          cdcName="ApplyingArticle45Date"
          label-width="100px"
          m="r"
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
        <Description
          v-model="value"
          :m="m"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="CancleDetailsPeaceAgreement">
        <CancleDetailsPeaceAgreement
          v-model="value"
          :m="m"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import Description from "./Description.vue"
import CancleDetailsPeaceAgreement from "./CancleDetailsPeaceAgreement.vue"

export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  components: {
    Description,
    CancleDetailsPeaceAgreement
  },
  data () {
    return {
      activeTab: "Description"
    }
  },
  computed: {
    isConfirm () {
      return !(this.value.ContractBuy_Info.ConfirmDate === "" || this.value.ContractBuy_Info.ConfirmDate === null)
    }
  }
}
</script>
